import { User } from "~/server/models/user.model";
import { isValidObjectId } from "mongoose";
import achievementsList from "~/stores/achievementsStore";

export default defineEventHandler(async (event) => {
    // Читаем тело запроса
    const { userId, achievementId } = await readBody(event);

    // Проверяем наличие userId и achievementId
    if (!userId || !achievementId) {
        throw createError({ statusCode: 400, message: "Необходимо указать userId и achievementId" });
    }

    // Проверяем, что userId имеет корректный формат
    if (!isValidObjectId(userId)) {
        throw createError({ statusCode: 400, message: "Неверный формат userId" });
    }

    // Проверяем, существует ли пользователь
    const user = await User.findById(userId);
    if (!user) {
        throw createError({ statusCode: 404, message: "Пользователь не найден" });
    }

    // Проверяем, есть ли уже достижение у пользователя
    if (user.achievements.includes(achievementId)) {
        throw createError({ statusCode: 400, message: "У пользователя уже есть это достижение" });
    }

    if (!achievementsList.find(ach => ach.id === achievementId)) {
        throw createError({ statusCode: 400, message: "Достижение не существует" });
    }

    // Добавляем достижение и сохраняем пользователя
    try {
        user.achievements.push(achievementId);
        await user.save();
        return { message: "Достижение успешно выдано" };
    } catch (error) {
        console.error("Ошибка при выдаче достижения:", error);
        throw createError({ statusCode: 500, message: "Произошла ошибка при выдаче достижения" });
    }
});