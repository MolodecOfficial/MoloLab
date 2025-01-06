import { User } from "~/server/models/user.model";

const allowedSubjects = [
    'История',
    'Математика',
    'Дискретная Математика',
    'Основы Российской Государственности',
    'Физика',
    'Иностранный Язык',
    'Инженерная Компьютерная Графика',
];

export default defineEventHandler(async (event) => {
    try {
        if (event.req.method === 'GET') {
            return { allowedSubjects };
        }

        const { userId, subject, score } = await readBody(event);

        // Проверка входных данных
        if (!userId || !subject || typeof score !== 'number') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Не переданы корректные данные (userId, subject, score).'
            });
        }

        if (!allowedSubjects.includes(subject)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Недопустимый предмет.'
            });
        }

        if (score < 1 || score > 5) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Оценка должна быть числом от 1 до 5.'
            });
        }

        // Поиск пользователя
        const user = await User.findById(userId);

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Пользователь не найден.'
            });
        }

        if (!user.score) {
            user.score = {};  // Инициализация если нет объекта для оценок
        }

        if (!user.score[subject]) {
            user.score[subject] = [];  // Инициализация массива для оценок по предмету
        }

        // Добавление оценки
        user.score[subject].push(score.toString());

        // Вычисление среднего балла по каждому предмету
        const subjectAverages = Object.entries(user.score).map(([subject, scores]) => {
            const numericScores = scores.map(Number);
            const average = numericScores.reduce((sum, s) => sum + s, 0) / numericScores.length;
            return average;
        });

        // Вычисление общего среднего балла (averageScore)
        const averageScore = subjectAverages.reduce((sum, avg) => sum + avg, 0) / subjectAverages.length;

        // Вычисление общего балла (generalScore)
        const generalScore = averageScore * subjectAverages.length;

        // Обновление пользователя
        user.averageScore = averageScore.toFixed(2);
        user.generalScore = generalScore.toFixed(2);

        // Сохранение изменений
        await user.save();

        return { message: "Оценка успешно добавлена.", user };

    } catch (error: any) {
        console.error('Ошибка при добавлении оценки:', error);
        if (error.statusCode) throw error;
        throw createError({
            statusCode: 500,
            statusMessage: 'Внутренняя ошибка сервера.'
        });
    }
});