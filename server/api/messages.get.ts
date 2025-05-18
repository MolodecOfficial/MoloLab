import Message from "~/server/models/message.model";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { date, userId, partnerId } = query;

    if (!userId || !partnerId) {
        return { success: false, error: "Missing parameters" };
    }

    // Упорядочиваем участников для поиска
    const participants = [userId, partnerId].sort().join(',');

    let messages: any[] = [];

    if (date) {
        // Если дата указана — ищем строго по дате
        const doc = await Message.findOne({ date });
        if (!doc) return { success: true, messages: [] };

        const group = doc.groups.find(group =>
            group.participants.slice().sort().join(',') === participants
        );

        messages = group?.messages || [];
    } else {
        // Если дата не указана — ищем все сообщения у всех документов
        const docs = await Message.find({ 'groups.participants': { $in: participants.split(',') } });

        // Собираем сообщения из всех документов по группам с нужными участниками
        for (const doc of docs) {
            const group = doc.groups.find(group =>
                group.participants.slice().sort().join(',') === participants
            );
            if (group) {
                messages = messages.concat(group.messages);
            }
        }
    }

    // Отсортируем сообщения по timestamp
    messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return {
        success: true,
        messages
    };
});