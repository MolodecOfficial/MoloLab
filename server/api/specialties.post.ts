import Specialty from "~/server/models/specialty.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        const requiredFields = ["name", "direction", "code", "faculty"];
        for (const field of requiredFields) {
            if (!body[field]) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `Поле ${field} обязательно`,
                });
            }
        }

        const existingSpecialty = await Specialty.findOne({
            name: body.name,
            code: body.code,
        });

        if (existingSpecialty) {
            return {
                success: false,
                message: "Специальность уже существует",
                specialty: existingSpecialty,
            };
        }

        const newSpecialty = await Specialty.create(body);

        return {
            success: true,
            message: "Специальность успешно добавлена",
            specialty: newSpecialty,
        };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error?.statusMessage || "Ошибка при добавлении специальности",
        };
    }
});