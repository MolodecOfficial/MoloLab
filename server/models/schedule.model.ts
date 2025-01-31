import mongoose from "mongoose";
import {ScheduleSchema} from "~/types/Schedule";

// Схема для занятия
const scheduleSchema = new mongoose.Schema<ScheduleSchema>({
   date: {
       type: String,
       required: true,
       group: [{
           type: String,
           required: true,
           time: {
               type: String,
               required: true
           },
           subject: {
               type: String,
               required: true
           },
           teacher: {
               type: String,
               required: true
           },
           typeOfLesson: {
               type: String,
               required: true
           },
           conditionOfLesson: {
               required: true,
               common: {
                   required: false,
                   type: String
               },
               subgroup1: {
                   required: false,
                   cabinet: {
                       type: String,
                       required: true
                   },
                   teacher: {
                       type: String,
                       required: true
                   }
               },
               subgroup2: {
                   required: false,
                   cabinet: {
                       type: String,
                       required: true
                   },
                   teacher: {
                       type: String,
                       required: true
                   }
               }
           }
       }]
   }
});


// Экспорт модели
export const Schedule = mongoose.models.Schedule || mongoose.model<ScheduleSchema>('Schedule', scheduleSchema);

export default mongoose.model<ScheduleSchema>('Schedule', scheduleSchema);

