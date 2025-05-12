import Lesson from "~/server/models/lesson.model";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name) {
            throw createError({
                statusCode: 400,
                statusMessage: "Название предмета обязательно",
            });
        }

        const existingLesson = await Lesson.findOne({ name: body.name.trim() });

        if (existingLesson) {
            throw createError({
                statusCode: 400,
                statusMessage: "Такой предмет уже существует",
            });
        }

        const newLesson = await Lesson.create({
            name: body.name,
        });

        return {
            success: true,
            message: "Предмет успешно создан",
            lesson: newLesson,
        };
    } catch (error) {
        console.error("Ошибка при добавлении предмета:", error);
        return {
            success: false,
            message: "Ошибка при добавлении предмета",
        };
    }
});
