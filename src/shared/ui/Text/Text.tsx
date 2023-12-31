import { memo, type MouseEventHandler, type ReactNode } from 'react';
import cls from './Text.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';

type TextTheme = 'primary' | 'error';

type TextAlign = 'right' | 'left' | 'center';

type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  title?: ReactNode;
  text?: ReactNode;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  onClick?: MouseEventHandler<HTMLDivElement>;
  keepTextHeight?: boolean;
  keepTitleHeight?: boolean;
  'data-testid'?: string;
}

type HeaderTag = 'h1' | 'h2' | 'h3';

const mapTextAlignClasses: Record<TextAlign, keyof typeof cls> = {
  left: 'left',
  right: 'right',
  center: 'center',
};

const mapTextThemeClasses: Record<TextTheme, keyof typeof cls> = {
  primary: 'primary',
  error: 'error',
};

const mapTextSizeClasses: Record<TextSize, keyof typeof cls> = {
  s: 'sizeS',
  m: 'sizeM',
  l: 'sizeL',
};

const mapSizeToHeadingTag: Record<TextSize, HeaderTag> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo<TextProps>(function Text (props) {
  const { theme = 'primary', align = 'left', size = 'm', 'data-testid': dataTestId, } = props;
  const HeaderTag = mapSizeToHeadingTag[size];

  return (
    <div
      onClick={props.onClick}
      className={classNames(
        cls.wrapper,
        {
          [cls.clickable]: props.onClick,
          [cls.keepTextHeight]: props.keepTextHeight,
          [cls.keepTitleHeight]: props.keepTextHeight,
        },
        [
          cls[mapTextThemeClasses[theme]],
          cls[mapTextAlignClasses[align]],
          cls[mapTextSizeClasses[size]],
          props.className,
        ]
      )}
    >
      {props.title
        ? (
          <HeaderTag
            data-testid={`${dataTestId}.Header`}
            className={classNames(cls.title, {}, [props.titleClassName,])}
          >
            {props.title}
          </HeaderTag>
          )
        : null}
      {props.text
        ? (
          <p
            data-testid={`${dataTestId}.Paragraph`}
            className={classNames(cls.text, {}, [props.textClassName,])}
          >
            {props.text}
          </p>
          )
        : null}
    </div>
  );
});
