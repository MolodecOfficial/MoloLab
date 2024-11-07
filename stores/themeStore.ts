import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const darkTheme = ref(false);

    function toggleTheme() {
        darkTheme.value = !darkTheme.value;
        document.body.classList.toggle('dark-theme', darkTheme.value);
    }

    return { darkTheme, toggleTheme };
});