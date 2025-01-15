import { Schedule } from "~/server/models/schedule.model"

export default defineEventHandler(async (event) => {
    const schedules = await Schedule.find();
    return {
        schedules,
    }
<<<<<<< HEAD
})
=======
})
>>>>>>> fe738c3e8acd9af89f00ef05e57a1853552a5ab9
