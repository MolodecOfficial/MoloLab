import { Schedule } from "~/server/models/schedule.model"

export default defineEventHandler(async (event) => {
    const schedules = await Schedule.find();
    return {
        schedules,
    }
});
