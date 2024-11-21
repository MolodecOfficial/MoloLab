import { SignInRequestBody } from "~/types/User";
import userModel from "~/server/models/user.model";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<SignInRequestBody | null>(event);

        if (!body) {
            return createError({ statusCode: 400, message: 'Ошибка: тело запроса не может быть пустым.' });
        }

        // Найти пользователя по email и выбрать пароль
        const user = await userModel.findOne({ email: body.email }).select('+password');

        if (!user) {
            return createError({ statusCode: 401, message: 'Неверный email или пароль.' });
        }

        // Проверка пароля
        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

        if (!isPasswordCorrect) {
            return createError({ statusCode: 401, message: 'Неверный email или пароль.' });
        }

        // Возвращаем приветственное сообщение и данные пользователя
        return {
            message: `Добро пожаловать, ${user.firstName} ${user.lastName}`,
            user: {
                _id: user._id,  // Добавляем _id в ответ
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    } catch (error) {
        console.error('Ошибка при обработке входа:', error);
        return createError({ statusCode: 500, message: 'Что-то пошло не так.' });
    }
});