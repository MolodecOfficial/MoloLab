import { Nitro } from 'nitropack'
import mongoose from "mongoose";

const clientOptions: any = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


export default async (_nitroApp: Nitro)=> {
 const config = useRuntimeConfig();
 try {
  await mongoose.connect(config.mongodb, clientOptions)
  console.log('MongoDB: OK!')
 } catch (e) {
  console.error(e)
 }
}

