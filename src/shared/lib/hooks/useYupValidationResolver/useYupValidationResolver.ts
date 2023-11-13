import { useCallback } from 'react';
import * as Yup from 'yup';

export const useYupValidationResolver =
    <T extends Yup.Maybe<Yup.AnyObject>>(
    validationSchema: Yup.ObjectSchema<T> | ((data: T) => Yup.ObjectSchema<T>)
  ) =>
    useCallback(
      async (data: T) => {
        try {
          const schema = validationSchema instanceof Function
            ? validationSchema(data)
            : validationSchema;
          const values = await schema.validate(data, { abortEarly: false, });

          return {
            values,
            errors: {},
          };
        } catch (errors) {
          if (errors instanceof Yup.ValidationError) {
            return {
              values: {},
              errors: errors.inner.reduce(
                (allErrors, currentError) => ({
                  ...allErrors,
                  [currentError.path as keyof T]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                  },
                }),
                {}
              ),
            };
          } else {
            return { values: {}, errors: {}, };
          }
        }
      },
      [validationSchema,]
    );
