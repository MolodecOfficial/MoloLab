// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 compatibilityDate: '2024-04-03',
 devtools: {enabled: true},

 css: [
  '~/assets/css/styles.scss',
  '~/assets/css/font/stylesheet.css'
 ],

 nitro: {
  plugins: ['~/server/index.ts']
 },

 runtimeConfig: {
  mongodb: process.env.MONGODB_URI
 },

 modules: ['@pinia/nuxt']
})