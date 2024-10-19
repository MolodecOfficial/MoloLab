import bcrypt from 'bcrypt';
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
 const body = await readBody(event);
 console.log('Received body:', body);
 const { firstName, lastName, email, password } = body;

 // Проверяем, существует ли пользователь с таким же email
 const existingUser = await User.findOne({ email });

 if (existingUser) {
  throw createError({ statusCode: 400, message: "Данный пользователь уже зарегистрирован" });
 }

 const hashedPassword = await bcrypt.hash(password, 10);

 const newUser = new User({ firstName, lastName, email, password: hashedPassword });

 try {
  await newUser.save();
  return { message: "Пользователь успешно зарегистрирован" };
 } catch (error) {
  if (error === 11000) {
   throw createError({ statusCode: 400, message: "Данный пользователь уже существует" });
  }
  // Обработка других ошибок
  throw createError({ statusCode: 500, message: "Произошла ошибка при регистрации" });
 }
});