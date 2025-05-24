import mongoose from "mongoose";
import { MessageSchema } from "~/types/Message";

const messageSchema = new mongoose.Schema<MessageSchema>({
    date: { type: String, required: true },
    groups: [
        {
            participants: {
                type: [String],
                required: true,
                validate: {
                    validator: function (val: string[]) {
                        return val.length === 2;
                    },
                    message: 'Participants must be an array of exactly 2 user IDs.'
                }
            },
            messages: [
                {
                    text: { type: String, required: true },
                    senderId: { type: String, required: true },
                    receiverId: { type: String, required: true },
                    timestamp: { type: Date, required: true },
                    read: { type: Boolean, default: false }
                }
            ]
        }
    ]
});

export const Message = mongoose.models.Message || mongoose.model<MessageSchema>("Message", messageSchema);

export default mongoose.model<MessageSchema>('Message', messageSchema);
