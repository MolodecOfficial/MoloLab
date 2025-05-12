import { LessonSchema } from "~/types/Lesson";
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema<LessonSchema>({
    name: {
        type: String,
        required: true,
    }
})

export const Lesson = mongoose.models.Lesson || mongoose.model<LessonSchema>('Lesson', lessonSchema);

export default mongoose.model<LessonSchema>('Lesson', lessonSchema);