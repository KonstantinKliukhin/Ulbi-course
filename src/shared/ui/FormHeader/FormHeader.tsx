import { type FC, type ReactNode } from 'react';
import cls from './FormHeader.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Text } from '../Text/Text';
import { HStack } from '../Stack/HStack/HStack';

interface FormHeaderProps {
  className?: string;
  title: string;
  actions?: ReactNode;
}

export const FormHeader: FC<FormHeaderProps> = (props) => {
  return (
    <HStack
      align="center"
      justify="between"
      className={classNames(cls.FormHeader, {}, [props.className,])}
    >
      <Text title={props.title} size="l" />
      <HStack align="center" xGap={16} className={cls.actions}>
        {props.actions}
      </HStack>
    </HStack>
  );
};
