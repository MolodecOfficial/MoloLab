export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { date, group, time, subject, teacher, typeOfLesson, conditionOfLesson } = body
})