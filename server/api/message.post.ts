import Message from "~/server/models/message.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { date, text, senderId, receiverId } = body;

        if (!date || !text || !senderId || !receiverId) {
            throw new Error("Missing required fields");
        }

        // Упорядочиваем участников для уникальности группы
        const participants: any = [senderId, receiverId].sort();

        const newMessage = {
            text,
            senderId,
            receiverId,
            timestamp: new Date()
        };

        let doc = await Message.findOne({ date });

        if (!doc) {
            // Если документа нет, создаем новый
            doc = new Message({
                date,
                groups: [{
                    participants,
                    messages: [newMessage]
                }]
            });
        } else {
            // Ищем группу по строго совпадающим участникам (отсортированным)
            const groupIndex = doc.groups.findIndex(group =>
                group.participants.sort().join(',') === participants.join(',')
            );

            if (groupIndex !== -1) {
                doc.groups[groupIndex].messages.push(newMessage);
            } else {
                doc.groups.push({
                    participants,
                    messages: [newMessage]
                });
            }
        }

        const saved = await doc.save();

        // Получаем последнюю группу по sorted participants
        const latestGroup = saved.groups.find(group =>
            group.participants.slice().sort().join(',') === participants.join(',')
        );

        return { success: true, message: latestGroup?.messages.at(-1) };
    } catch (error) {
        console.error("Ошибка при добавлении сообщения:", error);
        return { success: false, error: "Не удалось добавить сообщение" };
    }
});