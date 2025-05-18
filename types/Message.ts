export interface Message {
    _id?: string;
    text: string;
    senderId: string;
    receiverId: string;
    timestamp: Date;
}

export interface MessageGroup {
    participants: [string, string]; // [senderId, receiverId]
    messages: Message[];
}

export interface MessageSchema {
    date: string;
    groups: MessageGroup[];
}