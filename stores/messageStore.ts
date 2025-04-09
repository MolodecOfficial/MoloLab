import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from '~/stores/userStore';

export const useMessageStore = defineStore('message', () => {
    const messages = ref<any[]>([]);

    async function fetchMessages(userId: string) {
        const userStore = useUserStore(); // Вызываем внутри функции
        try {
            const response = await $fetch('/api/messages', {
                method: 'GET',
                params: {
                    senderId: userStore.userId, // Используем локальную переменную
                    receiverId: userId,
                },
            });
            if (response.messages) {
                messages.value = response.messages;
            }
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    }

    async function sendMessage(receiverId: string, text: string) {
        const userStore = useUserStore(); // Вызываем внутри функции
        try {
            const response = await $fetch('/api/messages', {
                method: 'POST',
                body: {
                    senderId: userStore.currentUser._id,
                    receiverId,
                    text,
                },
            });

            if (response && response.success) {
                // ...
            } else {
                throw new Error('Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            throw error;
        }
    }

    return { messages, fetchMessages, sendMessage };
});