import mongoose from "mongoose";
import { GroupSchema } from "~/types/Group";

const groupSchema = new mongoose.Schema<GroupSchema>({
    name: {
        type: String,
        required: true,
    }
})

export const Group = mongoose.models.Group || mongoose.model<GroupSchema>('Group', groupSchema);

export default mongoose.model<GroupSchema>('Group', groupSchema);