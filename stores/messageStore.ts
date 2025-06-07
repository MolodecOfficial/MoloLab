import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useUserStore } from '~/stores/userStore';

export const useMessageStore = defineStore('messageStore', () => {
    const messages = ref<any[]>([]);
    const currentChatId = ref<string | null>(null);
    const isLoading = ref(false);
    const unreadCounts = reactive<Record<string, number>>({});

    const fetchMessages = async (partnerId: string) => {
        if (currentChatId.value !== partnerId) return; // Защита от лишнего запроса
        const userStore = useUserStore();
        isLoading.value = true;

        try {
            await userStore.initUserStore();
            const res: any = await $fetch('/api/messages', {
                method: 'GET',
                query: {
                    userId: userStore.userId,
                    partnerId,
                },
            });

            if (res.success) {
                const newMessages = res.messages.map((msg: any) => {
                    const sender = userStore.users.find(u => u._id === msg.senderId);
                    return {
                        ...msg,
                        senderName: sender ? `${sender.firstName} ${sender.lastName}` : 'Неизвестный',
                    };
                });

                const currentIds = messages.value.map(m => m._id).join(',');
                const newIds = newMessages.map((m: any) => m._id).join(',');
                if (currentIds !== newIds) {
                    messages.value = newMessages;
                }

                unreadCounts[partnerId] = 0;
            } else {
                console.error('Ошибка при получении сообщений:', res.error);
            }
        } catch (err) {
            console.error('Ошибка при получении сообщений:', err);
        } finally {
            isLoading.value = false;
        }
    };

    const sendMessage = async (receiverId: string, text: string) => {
        const userStore = useUserStore();
        const today = new Date().toISOString().split('T')[0];

        try {
            const res: any = await $fetch('/api/message', {
                method: 'POST',
                body: {
                    date: today,
                    text,
                    senderId: userStore.userId,
                    receiverId,
                },
            });

            if (res.success && res.message) {
                const sender = userStore.currentUser;
                messages.value.push({
                    ...res.message,
                    senderName: `${sender.firstName} ${sender.lastName}`,
                });
            }

            return res;
        } catch (err) {
            console.error('Ошибка при отправке сообщения:', err);
            return { success: false };
        }
    };

    const incrementUnreadCount = (userId: string) => {
        unreadCounts[userId] = (unreadCounts[userId] || 0) + 1;
    };

    return {
        messages,
        isLoading,
        fetchMessages,
        sendMessage,
        unreadCounts,
        incrementUnreadCount,
        currentChatId,
    };
});