import { type FC } from 'react';
import cls from './Text.module.scss';
import { classNames } from 'shared/lib';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

export const Text: FC<TextProps> = props => {
  const theme = props.theme ?? TextTheme.PRIMARY;
  return (
    <div className={classNames(cls.Text, {}, [cls[theme], props.className,])}>
      {props.title ? <p className={cls.title}>{props.title}</p> : null}
      {props.text ? <p className={cls.text}>{props.text}</p> : null}
    </div>
  );
};
