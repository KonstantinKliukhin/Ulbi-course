import * as Yup from 'yup';
import { COMMON_VALIDATION_ERRORS } from 'shared/constants';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { type Profile } from 'entities/Profile';

export const validateProfile = () => Yup.object<Profile>().shape({
  firstname: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  lastname: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  age: Yup.number().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED).min(3).max(120),
  country: Yup.mixed<Country>()
    .oneOf(Object.values(Country), COMMON_VALIDATION_ERRORS.INVALID_COUNTRY)
    .required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  currency: Yup.mixed<Currency>()
    .oneOf(Object.values(Currency), COMMON_VALIDATION_ERRORS.INVALID_CURRENCY)
    .required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  city: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  username: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
  avatar: Yup.string()
    .url(COMMON_VALIDATION_ERRORS.INVALID_URL),
});
