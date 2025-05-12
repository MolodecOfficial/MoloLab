import Schedule from "~/server/models/schedule.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Проверяем, есть ли расписание на эту дату
        let existingSchedule = await Schedule.findOne({ date: body.date });

        if (existingSchedule) {
            body.groups.forEach((newGroup: any) => {
                const groupIndex = existingSchedule.groups.findIndex(g => g.groupName === newGroup.groupName);
                if (groupIndex !== -1) {
                    // Добавляем уроки в существующую группу
                    existingSchedule.groups[groupIndex].lessons.push(...newGroup.lessons);
                } else {
                    // Добавляем новую группу
                    existingSchedule.groups.push(newGroup);
                }
            });

            const updatedSchedule = await existingSchedule.save();
            return { success: true, schedule: updatedSchedule };
        } else {
            const newSchedule = new Schedule(body);
            const savedSchedule = await newSchedule.save();
            return { success: true, schedule: savedSchedule };
        }
    } catch (error) {
        console.error("Ошибка при добавлении расписания:", error);
        return { success: false, error: "Не удалось добавить расписание" };
    }
});