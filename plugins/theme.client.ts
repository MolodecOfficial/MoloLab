import { defineNuxtPlugin } from '#app';
import { useThemeStore } from '~/stores/themeStore';

export default defineNuxtPlugin((nuxtApp) => {
    // Работаем только на клиенте
    if (process.client) {
        const themeStore = useThemeStore()
        themeStore.initTheme()

        // Для отладки
        console.log('Тема инициализирована:', themeStore.currentTheme)
    }
})