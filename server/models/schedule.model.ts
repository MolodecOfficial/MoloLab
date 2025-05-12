import mongoose from "mongoose";
import {ScheduleSchema} from "~/types/Schedule";


const scheduleSchema = new mongoose.Schema<ScheduleSchema>({
    date: { type: String, required: true },
    groups: [
        {
            groupName: { type: String, required: true },
            lessons: [
                {
                    time: { type: String, required: true },
                    subject: { type: String, required: true },
                    teacher: { type: String, required: true },
                    cabinet: { type: String, required: true },
                    typeOfLesson: { type: String, required: true },
                    conditionOfLesson: {
                        common: { type: String, default: null },
                        subgroup1: {
                            cabinet: { type: String, default: null },
                            teacher: { type: String, default: null },
                        },
                        subgroup2: {
                            cabinet: { type: String, default: null },
                            teacher: { type: String, default: null },
                        },
                    },
                },
            ],
        },
    ],
});

// Экспорт модели
export const Schedule = mongoose.models.Schedule || mongoose.model<ScheduleSchema>('Schedule', scheduleSchema);

export default mongoose.model<ScheduleSchema>('Schedule', scheduleSchema);

