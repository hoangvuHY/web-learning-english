import { sendPostAPI } from './axios';

interface ILoginPayload {
  username: string;
  password: string;
}

export const sendPostLogin = (payload: ILoginPayload) => sendPostAPI('/api/auth/login', payload);
