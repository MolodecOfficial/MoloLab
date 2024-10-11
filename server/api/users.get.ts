import mongoose, {model} from "mongoose";
import {UserSchema} from "~/types/user";

const UserSchema = new mongoose.Schema<UserSchema>({
 firstName: {
  type: String
 },
 lastName: {
  type: String
 },
 email: {
  type: String
 },
 password: {
  type: String
 },
})

export const User = model<any>('User', UserSchema)

export default defineEventHandler(async (event) => {

 const users = await User.find()

 return {
  users,
 }
})

