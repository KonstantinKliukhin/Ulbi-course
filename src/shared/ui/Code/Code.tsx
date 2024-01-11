import { type FC, useCallback } from 'react';
import cls from './Code.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { Button } from '../Button/Button';
import { CopyIcon } from '../../assets';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code: FC<CodeProps> = (props) => {
  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(props.text);
  }, [props.text,]);

  return (
    <div className={classNames(cls.wrapper, {}, [props.className,])}>
      <Button onClick={onCopy}
        className={cls.buttonCopy}
        theme="clear"
        square
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <div className={cls.codeWrapper}>
        <code className={cls.Code}>{props.text}</code>
      </div>
    </div>
  );
};
