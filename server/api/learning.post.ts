import { User } from "~/server/models/user.model"; // Импортируем модель User

export default defineEventHandler(async (event) => {
    // Получаем данные из тела запроса
    const { userId, learning, formOfLearning, course } = await readBody(event);

    // Проверяем, что все необходимые данные переданы
    if (!userId || !learning || !formOfLearning || !course) {
        throw createError({
            statusCode: 400,
            message: "Не переданы все необходимые данные: userId, learning, formOfLearning или course",
        });
    }

    // Находим пользователя по ID
    const user = await User.findById(userId);

    if (!user) {
        throw createError({
            statusCode: 404,
            message: "Пользователь не найден",
        });
    }

    // Обновляем данные пользователя
    user.learning = learning;
    user.form_of_learning = formOfLearning;
    user.course = course;

    // Сохраняем обновленные данные пользователя
    await user.save();

    return { message: "Данные обучения успешно обновлены", user };
});