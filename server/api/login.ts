import {SignInRequestBody} from "~/types/User";
import userModel from "~/server/models/user.model";

import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
 try {
  const body = await readBody<SignInRequestBody | null>(event);

  if (!body) {
   return createError({ statusCode: 400, message: 'Ошибка: тело запроса не может быть пустым.' });
  }

  const user = await userModel.findOne({ email: body.email }).select('+password');

  if (!user) {
   return createError({ statusCode: 401, message: 'Неверный email или пароль.' });
  }

  // Сравнение паролей
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

  if (!isPasswordCorrect) {
   return createError({ statusCode: 401, message: 'Неверный email или пароль.' });
  }

  // Если все проверки пройдены, можно вернуть успешный ответ
  return { message: 'Успешный вход', user: { email: user.email } };
 } catch (error) {
  console.error('Ошибка при обработке входа:', error);
  return createError({ statusCode: 500, message: 'Что-то пошло не так.' });
 }
});