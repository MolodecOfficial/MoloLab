import Message from "~/server/models/message.model";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { userId }: any = query;

    if (!userId) {
        return { success: false, error: "Missing userId" };
    }

    // Получаем все документы, где участвует пользователь
    const docs = await Message.find({ 'groups.participants': userId });

    const unreadMap: Record<string, number> = {}; // partnerId: count

    for (const doc of docs) {
        for (const group of doc.groups) {
            if (!group.participants.includes(userId)) continue;

            const partnerId = group.participants.find(id => id !== userId);
            if (!partnerId) continue;

            const unreadCount = group.messages.filter(
                (msg: any) => msg.senderId !== userId && !msg.read
            ).length;

            if (unreadCount > 0) {
                unreadMap[partnerId] = (unreadMap[partnerId] || 0) + unreadCount;
            }
        }
    }

    return {
        success: true,
        unread: unreadMap
    };
});