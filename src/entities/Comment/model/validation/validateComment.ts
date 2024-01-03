import * as Yup from 'yup';
import { COMMON_VALIDATION_ERRORS } from 'shared/constants';

export const validateComment = () =>
  Yup.object().shape({
    text: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  });
