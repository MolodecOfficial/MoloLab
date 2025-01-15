import {Schedule} from "~/server/models/schedule.model";
import {User} from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
    const { userId, scheduleData } = await readBody(event);

    const user = await User.findById(userId);
    if (!user) {
        throw createError({
            statusCode: 404,
            message: "Пользователь не найден",
        });
    }

    const existingSchedule = await Schedule.findOne({ date: scheduleData.date });

    if (existingSchedule) {
        existingSchedule.groups[user.group] = scheduleData.groups[user.group] || [];
        await existingSchedule.save();
    } else {
        const newSchedule = new Schedule({
            date: scheduleData.date,
            groups: {
                [user.group]: scheduleData.groups[user.group] || [],
            },
        });
        await newSchedule.save();
    }

    return {
        message: "Расписание успешно добавлено или обновлено", // Consistent message
        schedule: await Schedule.findOne({ date: scheduleData.date }),
    };
});