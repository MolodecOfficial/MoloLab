import { User } from "~/server/models/user.model";
import Specialty from "~/server/models/specialty.model"; // Импортируем модель Specialty

export default defineEventHandler(async (event) => {
    const { userId, specialtyId } = await readBody(event);

    // Проверка входных данных
    if (!userId || !specialtyId) {
        throw createError({
            statusCode: 400,
            message: "userId и specialtyId обязательны",
        });
    }

    // Находим пользователя
    const user = await User.findById(userId);
    if (!user) {
        throw createError({
            statusCode: 404,
            message: "Пользователь не найден",
        });
    }

    // Находим специальность по ID через БД
    const selectedSpecialty = await Specialty.findById(specialtyId);
    if (!selectedSpecialty) {
        throw createError({
            statusCode: 404,
            message: "Специальность не найдена",
        });
    }

    // Обновляем данные пользователя
    user.specialty = selectedSpecialty.name;
    user.code = selectedSpecialty.code;
    user.direction = selectedSpecialty.direction;
    user.faculty = selectedSpecialty.faculty;

    await user.save();

    return {
        message: "Специальность успешно добавлена",
        user,
    };
});