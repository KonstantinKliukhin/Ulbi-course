import * as Yup from 'yup';
import { ArticleType } from 'entities/Article';
import { COMMON_VALIDATION_ERRORS } from 'shared/constants';
import { type ArticleFormType } from '../../types/articleForm';

export const validateArticle = () =>
  Yup.object().shape({
    title: Yup.string().required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
    subtitle: Yup.string(),
    img: Yup.string()
      .url(COMMON_VALIDATION_ERRORS.INVALID_URL)
      .required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
    type: Yup.array()
      .of(Yup.mixed<ArticleType>().oneOf(Object.values(ArticleType)).required())
      .min(1)
      .required(),
    blocks: Yup.array(Yup.object()).required(),
  }) as Yup.ObjectSchema<ArticleFormType>;
