// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03', devtools: {enabled: true},

    css: ['~/assets/css/styles.scss', '~/assets/css/font/stylesheet.css',],

    plugins: [
        '~/plugins/theme.client.ts'
    ],

    nitro: {
        plugins: ['~/server/index.ts'],
        experimental: {
            websocket: true
        },
        storage: {
            'ws:clients': { driver: 'memory' }
        },
    },

    runtimeConfig: {
        mongodb: process.env.MONGODB_URI, jwt: process.env.JWT_SECRET,
    },

    app: {
        router: {
            middleware: ['track-activity']
        }
    }, modules: ['@pinia/nuxt']
})
