import * as mongoose from "mongoose";
import { Nitro } from 'nitropack'

export default async (_nitroApp: Nitro)=> {
 const config = useRuntimeConfig();
 try {
  await mongoose.connect(config.mongodb)
  console.log('Successfully connected to MongoDB!')
 } catch (e) {
  console.error(e)
 }
}
