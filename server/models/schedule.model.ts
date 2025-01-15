import mongoose, { Schema, Document } from "mongoose";

// Интерфейс для представления структуры занятия
interface Lesson {
    time: string;
    subject: string;
    teacher: string;
    typeOfLesson: string;
}

// Интерфейс для представления структуры расписания группы
interface GroupSchedule {
    [groupName: string]: Lesson[];
}

// Интерфейс для представления структуры расписания
export interface ScheduleDocument extends Document {
    date: string;
    groups: GroupSchedule;
}

// Схема для занятия
const lessonSchema = new Schema<Lesson>({
    time: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    typeOfLesson: { type: String, required: true },
});

// Схема для расписания
const scheduleSchema = new Schema<ScheduleDocument>({
    date: { type: String, required: true },
    groups: {
        type: Map,
        of: [lessonSchema], // Массив объектов Lesson
        required: true,
    },
});

// Экспорт модели
export const Schedule = mongoose.models.Schedule || mongoose.model<ScheduleDocument>("Schedule", scheduleSchema);

