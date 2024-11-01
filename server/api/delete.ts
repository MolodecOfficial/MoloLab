import { User } from "../models/user.model";
import { isValidObjectId } from 'mongoose'; 

export default defineEventHandler(async (event) => {
    const { userId } = await readBody(event);

    if (!userId) {
        throw createError({ statusCode: 400, message: "Необходимо указать userId" });
    }

    if (!isValidObjectId(userId)) {
        throw createError({ statusCode: 400, message: "Неверный формат userId" });
    }

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
        throw createError({ statusCode: 404, message: "Пользователь не найден" });
    }

    try {
        await User.deleteOne({ _id: userId });
        return { message: "Пользователь успешно удалён" };
    } catch (error) {
        console.error("Ошибка при удалении пользователя:", error); // Логируем ошибку
        throw createError({ statusCode: 500, message: "Произошла ошибка при удалении пользователя" });
    }
});