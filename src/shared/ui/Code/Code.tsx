import { type FC, useCallback } from 'react';
import cls from './Code.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import CopySvg from '../../../../public/assets/icons/copy-20-20.svg';

interface CodeProps {
  className?: string
  text: string
}

export const Code: FC<CodeProps> = (props) => {
  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(props.text);
  }, [props.text,]);

  return (
    <div className={classNames(cls.wrapper, {}, [props.className,])}>
      <Button
        onClick={onCopy}
        className={cls.buttonCopy}
        theme={ButtonTheme.CLEAR}
        square
      >
        <CopySvg className={cls.copyIcon} />
      </Button>
      <div className={cls.codeWrapper}>
        <code className={cls.Code}>{props.text}</code>
      </div>
    </div>
  );
};
