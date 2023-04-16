import axios from 'axios';
import { Auth } from '../types/auth';

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const signUp = ({ email, password }: Auth) => {
  api.post('/auth/signup', { email, password });
};
