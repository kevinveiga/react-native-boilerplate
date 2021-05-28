import { AxiosResponse } from 'axios';

import { api } from './Api';
import { apiUrlLogin } from '../Config';

export interface LoginProps {
    email: string;
    password: string;
}

export const login = async (data: LoginProps): Promise<AxiosResponse> => {
    const response = await api.post(apiUrlLogin, data, {});

    return response;
};
