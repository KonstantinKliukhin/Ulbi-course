import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from 'shared/lib';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

interface TextProps {
  className?: string
  title?: string | null
  text?: string | null
  theme?: TextTheme
  align?: TextAlign
}

export const Text = memo<TextProps>(function Text (props) {
  const theme = props.theme ?? TextTheme.PRIMARY;
  const textAlign = props.align ?? TextAlign.LEFT;
  return (
    <div className={classNames(cls.Text, {}, [cls[theme], cls[textAlign], props.className,])}>
      {props.title ? <p className={cls.title}>{props.title}</p> : null}
      {props.text ? <p className={cls.text}>{props.text}</p> : null}
    </div>
  );
});
