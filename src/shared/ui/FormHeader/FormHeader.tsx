import { type FC, type ReactNode } from 'react';
import cls from './FormHeader.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Text, TextSize } from '../Text/Text';

interface FormHeaderProps {
  className?: string
  title: string
  actions?: ReactNode
}

export const FormHeader: FC<FormHeaderProps> = (props) => {
  return (
    <div className={classNames(cls.FormHeader, {}, [props.className,])}>
      <Text title={props.title} size={TextSize.L} />
      <div className={cls.actions}>{props.actions}</div>
    </div>
  );
};
