import mongoose from "mongoose";
import {UserSchema} from "~/types/User";

const userSchema = new mongoose.Schema<UserSchema>({
 firstName: {
  type: String,
  required: [true, 'First name is required.'],
  trim: true,
 },
 lastName: {
  type: String,
  required: [true, 'First name is required.'],
 },
 email: {
  type: String,
  required: [true, 'First name is required.'],
 },
 password: {
  type: String,
  required: [true, 'First name is required.'],
 },
})


export const User = mongoose.models.User || mongoose.model<UserSchema>('User', userSchema);

export default mongoose.model<UserSchema>('User', userSchema)