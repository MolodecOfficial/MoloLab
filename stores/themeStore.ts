import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        currentTheme: 'rusoil', // 'mololab', 'rusoil', 'rusml'
        availableThemes: [
            {
                id: 1,
                name: 'Rusoil',
                code: 'rusoil',
                img: '/account/choice/Rusoil.png' // Изменён путь
            },
            {
                id: 2,
                name: 'RusML',
                code: 'rusml',
                img: '/account/choice/RusML.png' // Изменён путь
            },
            {
                id: 3,
                name: 'MoloLab',
                code: 'mololab',
                img: '/account/choice/MoloLab.png' // Изменён путь
            }
        ]
    }),
    getters: {
        selectedTheme: (state) => {
            return state.availableThemes.find(t => t.code === state.currentTheme)?.id || null
        },
        selectedThemeName: (state) => {
            return state.availableThemes.find(t => t.code === state.currentTheme)?.name || ''
        },
        selectedThemePic: (state) => {
            return state.availableThemes.find(t => t.code === state.currentTheme)?.img || ''
        }
    },
    actions: {
        setTheme(themeCode: string) {
            if (!this.availableThemes.some(t => t.code === themeCode)) return;

            this.currentTheme = themeCode;
            if (process.client) {
                localStorage.setItem('theme', themeCode);
                document.documentElement.setAttribute('data-theme', themeCode);
            }
        },
        initTheme() {
            if (process.client) {
                const savedTheme = localStorage.getItem('theme');
                this.setTheme(savedTheme || 'rusoil');
            }
        }
    }
});