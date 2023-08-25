export class Message {
  id: string;
  createdAt: String;
  chat?: ChatMessage[];
  usersId: string[];
  lastMsg?: ChatMessage;
  usersName: string[];
}
export class IdChatMsg {
  id: string;
}

export class UserChatPayload {
  resUserId: string;
  reqUserId: string;
  resUsername: string;
  reqUsername: string;
}

export class OnlineSystemMessage extends Message {
  responseUser: string;
  responseId: string;
  requestUser: string;
  requestId: string;
  hasNewMsg?: boolean;
}

export class ChatMessage {
  userName: string;
  userId: string;
  content: string;
  timestamp: string;
}
