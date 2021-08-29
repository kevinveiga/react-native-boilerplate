export interface IMessage {
    data: Record<string, unknown>;
    date: string;
    messageId: string;
    notification: { body: string; title: string };
    notReaded: boolean;
}
