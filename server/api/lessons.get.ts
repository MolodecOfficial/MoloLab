import Lesson from "~/server/models/lesson.model"

export default defineEventHandler(async (event) => {
    const lessons = await Lesson.find();
    return {
        lessons,
    }
});
