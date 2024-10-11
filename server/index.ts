import * as mongoose from "mongoose";
import { Nitro } from 'nitropack'

export default async (_nitroApp: Nitro)=> {
 try {
  await mongoose.connect('mongodb://localhost:27017/molo-users')
  console.log('Successfully connected to MongoDB!')
 } catch (e) {
  console.error(e)
 }
}
