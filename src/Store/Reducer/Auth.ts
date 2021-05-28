import { ActionType } from '../Action/ActionType';
import { AuthDataProps } from '../../Entity/Auth';

export interface AuthAction {
    error?: string | null;
    payload?: AuthDataProps | null;
    type: ActionType;
}

export interface AuthProps {
    data?: AuthDataProps | null;
    error?: string | null;
    status?: ActionType;
}

export const initialState: AuthProps = {
    data: undefined,
    error: '',
    status: ActionType.INITIATED
};

export function authReducer(state: AuthProps, action: AuthAction): AuthProps {
    switch (action.type) {
        case ActionType.ATTEMPTING:
            return {
                ...state,
                error: '',
                status: ActionType.ATTEMPTING
            };
        case ActionType.FAILED:
            return {
                ...state,
                error: action.error,
                status: ActionType.FAILED
            };
        case ActionType.INITIATED:
            return {
                ...state,
                error: '',
                status: ActionType.INITIATED
            };
        case ActionType.LOGGED_IN:
            return {
                ...state,
                data: action.payload,
                error: '',
                status: ActionType.LOGGED_IN
            };
        case ActionType.LOGGED_OUT:
            return {
                ...state,
                data: null,
                error: '',
                status: ActionType.LOGGED_OUT
            };
        default:
            return state;
    }
}
