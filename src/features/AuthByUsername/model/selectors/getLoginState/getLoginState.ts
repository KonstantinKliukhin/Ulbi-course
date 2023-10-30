import { initialState } from '../../slice/loginSlice';
import { type LoginSchema } from '../../types/loginSchema';

export const getLoginState = (state: StateSchema): LoginSchema => state?.loginForm ?? initialState;
