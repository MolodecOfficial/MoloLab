import bcrypt from 'bcrypt';
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
 const body = await readBody(event);
 const { firstName, lastName, email, password } = body;

 const existingUser = await User.findOne({ email });

 if (existingUser) {
  throw createError({ statusCode: 400, message: "Данный пользователь уже зарегистрирован" });
 }

 // Хешируем пароль перед сохранением
 const hashedPassword = await bcrypt.hash(password, 10);

 const newUser = new User({ firstName, lastName, email, password: hashedPassword });

 await newUser.save();

 return { message: "Пользователь успешно зарегистрирован" };
});