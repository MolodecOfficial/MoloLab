import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('messageStore', () => {
    const messages = ref<any[]>([]);
    const isLoading = ref(false);
    const fetchMessages = async (partnerId: string) => {
        const userStore = useUserStore();
        const today = new Date().toISOString().split('T')[0];
        isLoading.value = true; // <-- началась загрузка
        try {
            await userStore.initUserStore()
            const res: any = await $fetch('/api/messages', {
                method: 'GET',
                query: {
                    // date: today, // убираем ограничение по дате
                    userId: userStore.userId,
                    partnerId
                }
            });

            if (res.success) {
                // Преобразуем сообщения, добавляя имя отправителя
                messages.value = res.messages.map((msg: any) => {
                    const sender = userStore.users.find(u => u._id === msg.senderId);
                    return {
                        ...msg,
                        senderName: sender ? `${sender.firstName} ${sender.lastName}` : 'Неизвестный'
                    };
                });
            } else {
                messages.value = [];
                console.error('Ошибка при получении сообщений:', res.error);
            }
        } catch (err) {
            console.error('Ошибка при получении сообщений:', err);
            messages.value = [];
        } finally {
            isLoading.value = false; // <-- завершили загрузку
        }
    };

    const sendMessage = async (receiverId: string, text: string) => {
        const userStore = useUserStore();
        const today = new Date().toISOString().split('T')[0];

        try {
            const res: any = await $fetch('/api/messages', {
                method: 'POST',
                body: {
                    date: today,
                    text,
                    senderId: userStore.userId,
                    receiverId
                }
            });

            if (res.success && res.message) {
                const sender = userStore.currentUser;
                messages.value.push({
                    ...res.message,
                    senderName: `${sender.firstName} ${sender.lastName}`
                });
            }

            return res;
        } catch (err) {
            console.error('Ошибка при отправке сообщения:', err);
            return { success: false };
        }
    };

    return {
        messages,
        isLoading,
        fetchMessages,
        sendMessage
    };
});