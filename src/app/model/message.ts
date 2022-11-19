import { Timestamp } from "firebase/firestore";

export class Message{
    id: string;
    createdAt: Timestamp;
    chat?: ChatMessage[];
    usersId: string[];
    lastMsg?: ChatMessage;
    usersName: string[];
}
export class IdChatMsg{
    id: string;
}

export class OnlineSystemMessage extends Message{
    responseUser: string;
    responseId: string;
    requestUser:string;
    requestId:string;
}

export class ChatMessage{
    userName:string;
    userId:string;
    content:string;
    timestamp: Timestamp;
}