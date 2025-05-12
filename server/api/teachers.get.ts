import Teacher from '~/server/models/teacher.model'

export default defineEventHandler(async (event) => {
    const teachers = await Teacher.find();
    return {
        teachers,
    };
});

