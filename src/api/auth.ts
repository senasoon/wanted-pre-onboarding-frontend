import { Auth } from '../types/auth';
import { api } from './instance';

export const signIn = ({ email, password }: Auth) => {
  return api.post('/auth/signin', { email, password });
};
export const signUp = ({ email, password }: Auth) => {
  return api.post('/auth/signup', { email, password });
};
