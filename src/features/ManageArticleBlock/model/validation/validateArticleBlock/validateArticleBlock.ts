import * as Yup from 'yup';
import { COMMON_VALIDATION_ERRORS } from '@/shared/constants';
import { type ArticleBlock, ArticleBlockType } from '@/entities/Article';
import { type ArticleBlockFormType } from '../../types/articleBlockForm';

export const validateArticleBlock = (existingBlocks: ArticleBlock[]) => () =>
  Yup.object<ArticleBlock>().shape({
    id: Yup.string(),
    name: Yup.string().test({
      name: 'uniqueName',
      message: 'Name must be unique for each block',
      test: function (value) {
        return !existingBlocks.some((block) => block.name === value);
      },
    }),
    type: Yup.mixed<ArticleBlockType>()
      .oneOf(Object.values(ArticleBlockType))
      .required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
    title: Yup.string().when('type', {
      is: (type: ArticleBlockType) =>
        ArticleBlockType.IMAGE === type || ArticleBlockType.TEXT === type,
      then: (schema) =>
        schema.required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    code: Yup.string().when('type', {
      is: ArticleBlockType.CODE,
      then: (schema) =>
        schema.required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    paragraphs: Yup.array().when('type', {
      is: ArticleBlockType.TEXT,
      then: (schema) =>
        schema
          .of(
            Yup.object()
              .shape({
                id: Yup.string().required(),
                text: Yup.string().required(
                  COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED
                ),
              })
              .required()
          )
          .min(1)
          .required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    src: Yup.string().when('type', {
      is: ArticleBlockType.IMAGE,
      then: (schema) =>
        schema.required(COMMON_VALIDATION_ERRORS.FIELD_IS_REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
  }) as Yup.ObjectSchema<ArticleBlockFormType>;
