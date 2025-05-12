import Teacher from "~/server/models/teacher.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name || !body.lessonTypes || !Array.isArray(body.lessonTypes)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Неверные данные преподавателя",
            });
        }

        const existingTeacher = await Teacher.findOne({ name: body.name });
        if (existingTeacher) {
            return {
                success: false,
                message: "Преподаватель уже существует",
                teacher: existingTeacher,
            };
        }

        const newTeacher = await Teacher.create({
            name: body.name,
            lessonTypes: body.lessonTypes,
        });

        return {
            success: true,
            message: "Преподаватель успешно добавлен",
            teacher: newTeacher,
        };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error?.statusMessage || "Ошибка при добавлении преподавателя",
        };
    }
});