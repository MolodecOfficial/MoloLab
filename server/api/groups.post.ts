import Group from "~/server/models/group.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.name) {
            throw createError({
                statusCode: 400,
                statusMessage: "Название группы обязательно",
            });
        }

        const existingGroup = await Group.findOne({ name: body.name });
        if (existingGroup) {
            return {
                success: false,
                message: "Группа уже существует",
                group: existingGroup,
            };
        }

        const newGroup = await Group.create({ name: body.name });

        return {
            success: true,
            message: "Группа успешно добавлена",
            group: newGroup,
        };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error?.statusMessage || "Ошибка при добавлении группы",
        };
    }
});
