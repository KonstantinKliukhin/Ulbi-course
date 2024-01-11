import { type ComponentProps, memo } from 'react';
import { ArticleTypesTabs } from './ArticleTypesTabs';
import { Controller } from 'react-hook-form';
import { type ArticleType } from '../../../../entities/Article/model/types/article';

interface FormArticleTypesTabsProps
  extends Omit<
  ComponentProps<typeof ArticleTypesTabs>,
  'onSelectType' | 'value'
  > {
  name: string;
  multiple?: boolean;
}

export const FormArticleTypesTabs = memo<FormArticleTypesTabsProps>(
  function FormArticleTypesTabs (props) {
    const { name, multiple, ...tabsProps } = props;

    const onSelectType = (
      values: ArticleType[] | ArticleType,
      change: (arg: ArticleType[] | ArticleType) => void,
      type: ArticleType
    ) => {
      if (multiple && Array.isArray(values)) {
        if (values.includes(type)) {
          change(values.filter((value: ArticleType) => value !== type));
        } else {
          change([...values, type,]);
        }
      } else {
        change(type);
      }
    };

    return (
      <Controller
        name={name}
        render={({ field, fieldState, }) => (
          <ArticleTypesTabs
            {...tabsProps}
            error={fieldState.error?.message}
            onSelectType={onSelectType.bind(null, field.value, field.onChange)}
            value={field.value}
          />
        )}
      />
    );
  }
);
