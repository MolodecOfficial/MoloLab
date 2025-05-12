import { TeacherSchema } from "~/types/Teacher";
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema<TeacherSchema>({
    name: {
        type: String,
        required: true,
    },
    lessonTypes: {
        type: [String],
        required: true,
    }
})

export const Teacher = mongoose.models.Teacher || mongoose.model<TeacherSchema>('Teacher', teacherSchema);

export default mongoose.model<TeacherSchema>('Teacher', teacherSchema);