import { $rtkApi, API_ROUTES } from 'shared/api';
import { type LoginDto } from '../../model/types/login.dto';
import { type User } from 'entities/User';

export const authByUsernameApi = $rtkApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<User, LoginDto>({
      query: (dto) => ({
        url: API_ROUTES.login(),
        method: 'POST',
        body: dto,
      }),
    }),
  }),
});
