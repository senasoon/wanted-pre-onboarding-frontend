import axios from 'axios';
import { Auth } from '../types/auth';

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const signIn = ({ email, password }: Auth) => {
  return api.post('/auth/signin', { email, password });
};
export const signUp = ({ email, password }: Auth) => {
  api.post('/auth/signup', { email, password });
};
