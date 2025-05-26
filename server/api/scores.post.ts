import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { userId, subject, score, course } = body;
        const scoreNum = Number(score);

        const allowedCourses = ['firstCourse', 'secondCourse', 'thirdCourse', 'fourthCourse', 'fifthCourse'];

        if (!userId || !subject || !allowedCourses.includes(course) || isNaN(scoreNum) || scoreNum < 1 || scoreNum > 5) {
            throw createError({ statusCode: 400, message: 'Некорректные данные' });
        }

        const user = await User.findById(userId);
        if (!user) throw createError({ statusCode: 404, message: 'Пользователь не найден' });

        // Инициализация структуры score
        if (!user.score) user.score = {} as any;
        if (!user.score[course]) user.score[course] = {};
        if (!Array.isArray(user.score[course][subject])) user.score[course][subject] = [];

        user.score[course][subject].push(scoreNum);
        user.markModified('score'); // Важно для сохранения вложенных изменений

        // Пересчет оценок
        const allScores = allowedCourses.flatMap(courseKey =>
            Object.values(user.score[courseKey] || {}).flatMap(scores =>
                Array.isArray(scores) ? scores : []
            )
        );

        const average = allScores.length > 0
            ? allScores.reduce((a, b) => a + b, 0) / allScores.length
            : 0;

        user.averageScore = Number(average.toFixed(2));
        user.generalScore = Number((average * allScores.length).toFixed(2));

        await user.save();

        return { message: "Оценка добавлена", user };
    } catch (error) {
        console.error('Ошибка:', error);
        throw createError({ statusCode: 500, message: 'Ошибка сервера' });
    }
});