import mongoose from "mongoose";
import {UserSchema} from "~/types/User";

const userSchema = new mongoose.Schema<UserSchema>({
 firstName: {
  type: String,
  required: [true, 'First name is required.'],
 },
 lastName: {
  type: String,
  required: [true, 'First name is required.'],
 },
 email: {
  type: String,
  required: [true, 'Email is required.'],
 },
 password: {
  type: String,
  required: [true, 'Password is required.'],
  minlength: 10

 },
})


export const User = mongoose.models.User || mongoose.model<UserSchema>('User', userSchema);

export default mongoose.model<UserSchema>('User', userSchema)