import * as Yup from 'yup';
import { COMMON_VALIDATION_ERRORS } from 'shared/constants';
import { type User } from 'entities/User';

export const validateLoginData = () => Yup.object<User>().shape({
  username: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  password: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
});
