import { type ChangeEvent, type FC, useCallback, useState } from 'react';
import cls from './AddCommentForm.module.scss';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme, Input, Text, TextTheme } from 'shared/ui';
import { useTranslation } from 'react-i18next';

interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
  isLoading: boolean
  error: string | null
}

const AddCommentForm: FC<AddCommentFormProps> = props => {
  const { t, } = useTranslation('comment');
  const { onSendComment, } = props;
  const [commentText, setCommentText,] = useState('');
  const mods = { [cls.loading]: props.isLoading, };
  const isTextEmpty = commentText.length === 0;

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    onSendComment(commentText);
    setCommentText('');
  }, [onSendComment, commentText,]);

  return (
    <div className={classNames(cls.AddCommentForm, mods, [props.className,])}>
      <div className={cls.body}>
        <Input
          disabled={props.isLoading}
          className={cls.input}
          placeholder={t('add_comment_label')}
          onChange={onChangeText}
          value={commentText}
        />
        <Button disabled={props.isLoading || isTextEmpty} theme={ButtonTheme.OUTLINE} onClick={onSubmit}>
          {t('add_comment_button')}
        </Button>
      </div>
      <Text className={cls.error} theme={TextTheme.ERROR} text={props.error}/>
    </div>
  );
};

export default AddCommentForm;
