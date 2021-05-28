import { ActionType } from '../Action/ActionType';
import { MessageProps } from '../../Entity/PushNotification';

export interface PushNotificationAction {
    error?: string | null;
    payload?: MessageProps[] | null;
    type: ActionType;
}

export interface PushNotificationProps {
    data?: MessageProps[] | null;
}

export const initialState: PushNotificationProps = {
    data: undefined
};

export function pushNotificationReducer(state: PushNotificationProps, action: PushNotificationAction): PushNotificationProps {
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
