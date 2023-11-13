import * as Yup from 'yup';
import { COMMON_VALIDATION_ERRORS } from 'shared/constants';

export const getLoginValidationErrors = () => Yup.object().shape({
  username: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  password: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
});
