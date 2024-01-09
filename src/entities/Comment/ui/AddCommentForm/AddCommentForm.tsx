import { type FC } from 'react';
import cls from './AddCommentForm.module.scss';
import { classNames } from '@/shared/lib';
import { Button, Card, FormTextArea, HStack, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

interface AddCommentFormProps {
  className?: string;
  isLoading: boolean;
  error?: string | null;
  isValid: boolean;
}

export const AddCommentForm: FC<AddCommentFormProps> = (props) => {
  const { t, } = useTranslation('comment');
  const mods = { [cls.loading]: props.isLoading, };

  return (
    <div className={classNames(cls.AddCommentForm, mods, [props.className,])}>
      <Card theme="outlined" className={cls.body}>
        <HStack
          justify="between"
          align="end"
          xGap={16}
        >
          <FormTextArea
            name="text"
            resize="vertical"
            disabled={props.isLoading}
            className={cls.textarea}
            label={t('add_comment_label')}
            withError={false}
          />
          <Button
            disabled={props.isLoading || !props.isValid}
            theme="outline"
            type="submit"
          >
            {t('add_comment_button')}
          </Button>
        </HStack>
      </Card>
      <Text keepTextHeight theme="error" text={props.error} />
    </div>
  );
};
