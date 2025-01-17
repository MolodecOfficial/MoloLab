// https://nuxt.com/docs/api/configuration/nuxt-config
import {execSync} from "node:child_process";

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
  mongodb: process.env.MONGODB_URI,
  jwt: process.env.JWT_SECRET,
  public: {
   commitCount: (() => {
    try {
     return execSync('git rev-list --count HEAD').toString().trim();
    } catch (error) {
     console.error('Ошибка при получении количества коммитов:', error);
     return '0';
    }
   })(),
  },
 },

 modules: ['@pinia/nuxt']
})