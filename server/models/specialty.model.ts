import mongoose from "mongoose";
import { SpecialtySchema } from "~/types/Specialty";

const specialtySchema = new mongoose.Schema<SpecialtySchema>({
    name: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    }
})

export const Specialty = mongoose.models.Specialty || mongoose.model<SpecialtySchema>('Specialty', specialtySchema);

export default mongoose.model<SpecialtySchema>('Specialty', specialtySchema);