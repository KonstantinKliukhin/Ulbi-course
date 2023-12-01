import { memo, type MouseEventHandler } from 'react';
import cls from './Text.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  M = 'sizeM',
  L = 'sizeL',
}

interface TextProps {
  className?: string
  titleClassName?: string
  textClassName?: string
  title?: string | null
  text?: string | null
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const Text = memo<TextProps>(function Text (props) {
  const theme = props.theme ?? TextTheme.PRIMARY;
  const textAlign = props.align ?? TextAlign.LEFT;
  const textSize = props.size ?? TextSize.M;

  return (
    <div
      onClick={props.onClick}
      className={classNames(
        cls.wrapper,
        {
          [cls.clickable]: props.onClick,
        },
        [cls[theme], cls[textAlign], cls[textSize], props.className,]
      )}
    >
      {props.title
        ? (
          <p className={classNames(cls.title, {}, [props.titleClassName,])}>
            {props.title}
          </p>
          )
        : null}
      {props.text
        ? (
          <p className={classNames(cls.text, {}, [props.textClassName,])}>
            {props.text}
          </p>
          )
        : null}
    </div>
  );
});
