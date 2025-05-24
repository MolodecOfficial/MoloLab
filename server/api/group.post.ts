import User from '~/server/models/user.model';
import Group from '~/server/models/group.model';  // добавляем импорт модели группы

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { userId, groupId } = body;

        if (!userId || !groupId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'userId и groupId обязательны',
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            throw createError({ statusCode: 404, statusMessage: 'Пользователь не найден' });
        }

        // Находим группу по id
        const group = await Group.findById(groupId);
        if (!group) {
            throw createError({ statusCode: 404, statusMessage: 'Группа не найдена' });
        }

        // Записываем в user.group название группы
        user.group = group.name;

        await user.save();

        return {
            success: true,
            message: 'Данные обучения успешно обновлены',
            user,
        };
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error?.statusMessage || 'Ошибка при обновлении данных обучения',
        };
    }
});