import { ActionType } from '../action/actionType';
import { IMessage } from '../../entities/pushNotification';

interface IPushNotificationAction {
    error?: string | null;
    payload?: IMessage[] | null;
    type: ActionType;
}

interface IPushNotification {
    data?: IMessage[] | null;
}

export const initialState: IPushNotification = {
    data: undefined
};

export function pushNotificationReducer(state: IPushNotification, action: IPushNotificationAction): IPushNotification {
    switch (action.type) {
        case ActionType.FAILED:
            return {
                ...state
            };
        case ActionType.INITIATED:
            return {
                ...state,
                data: action.payload
            };
        case ActionType.READED:
            return {
                ...state,
                data: action.payload
            };
        case ActionType.REMOVED:
            return {
                ...state,
                data: action.payload
            };
        case ActionType.REMOVED_ALL:
            return {
                ...state,
                data: []
            };
        case ActionType.UPDATED:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
