import { User } from "~/server/models/user.model"; // Импортируем модель User
import { specialtyList } from "~/stores/specialtyStore"; // Импортируем список специальностей

export default defineEventHandler(async (event) => {
    // Получаем данные из тела запроса
    const { userId, specialtyId } = await readBody(event);

    // Находим пользователя по ID
    const user = await User.findById(userId);

    if (!user) {
        throw createError({
            statusCode: 404,
            message: "Пользователь не найден",
        });
    }

    // Находим выбранную специальность по ID
    const selectedSpecialty = specialtyList.find(
        (specialty) => specialty.id === specialtyId
    );

    if (!selectedSpecialty) {
        throw createError({
            statusCode: 404,
            message: "Специальность не найдена",
        });
    }

    // Обновляем данные пользователя
    user.specialty = selectedSpecialty.specialty_name;
    user.group = selectedSpecialty.group;
    user.code = selectedSpecialty.code;
    user.direction = selectedSpecialty.direction;
    user.faculty = selectedSpecialty.faculty

    // Сохраняем обновленного пользователя в базе данных
    await user.save();

    return { message: "Специальность успешно добавлена", user };
});