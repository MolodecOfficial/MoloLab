import { MongoClient } from 'mongodb';

const config = useRuntimeConfig()
const client = new MongoClient(config.mongodb);
const dbName = 'myFirstDataBase';
const collectionName = 'messages';


export default defineEventHandler(async (event) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const { method } = event.req;

        // Получение сообщений между пользователями
        if (method === 'GET') {
            const { senderId, receiverId } = getQuery(event);

            if (!senderId || !receiverId) {
                return { error: 'Missing user IDs' };
            }

            const messages = await collection.find({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }).sort({ timestamp: 1 }).toArray();

            return { messages };

        }

        // Отправка нового сообщения
        if (method === 'POST') {
            const { senderId, receiverId, text } = await readBody(event);
            console.log('Received data:', { senderId, receiverId, text }); // Логирование

            if (!senderId || !receiverId || !text) {
                return { error: 'Missing required fields' };
            }

            const message = {
                senderId,
                receiverId,
                text,
                timestamp: new Date()
            };

            const result = await collection.insertOne(message);
            return {
                success: true,
                message: {
                    ...message,
                    _id: result.insertedId
                }
            };

        }

    } catch (error) {
        return { error: 'Database operation failed', details: error };
    } finally {
        await client.close();
    }
});