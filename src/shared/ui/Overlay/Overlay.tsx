import cls from './Overlay.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { memo } from 'react';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
  open?: boolean;
}

export const Overlay = memo<OverlayProps>(function Overlay (props) {
  return (
    <div
      onClick={props.onClick}
      className={classNames(cls.Overlay, { [cls.open]: props.open, }, [props.className,])}
    />
  );
});
