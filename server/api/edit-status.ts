import { User } from "~/server/models/user.model"; // импортируем модель пользователя

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event); // получаем тело запроса

        // Проверяем, что в запросе есть необходимые данные
        const { userId, newStatus } = body;

        if (!userId || !newStatus) {
            throw createError({
                statusCode: 400,
                statusMessage: "Не переданы userId или newStatus.",
            });
        }

        // Проверяем, что новый статус валиден
        const validStatuses = ["Студент", "Преподаватель", "Администратор"];
        if (!validStatuses.includes(newStatus)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Неверный статус.",
            });
        }

        // Находим пользователя по ID и обновляем его статус
        const user = await User.findByIdAndUpdate(
            userId,
            { status: newStatus },
            { new: true } // возвращаем обновленного пользователя
        );

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: "Пользователь не найден.",
            });
        }

        // Возвращаем обновленного пользователя
        return {
            message: "Статус пользователя успешно обновлен.",
            user: user, // возвращаем обновленного пользователя
        };
    } catch (error: any) {
        sendError(event, error);
    }
});