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
 },

 app: {
  router: {
   middleware: ['track-activity']
  }
 },
 modules: ['@pinia/nuxt']
})
