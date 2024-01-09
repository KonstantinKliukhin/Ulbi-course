import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { Popover } from '@headlessui/react';
import cls from './CustomPopover.module.scss';
import popupCls from '../../styles/Popup.module.scss';
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { classNames } from '../../../../lib/ui/classNames/classNames';
import { HStack } from '../../../Stack/HStack/HStack';

interface PopoverProps extends PropsWithChildren {
  className?: string;
  trigger?: ReactNode;
  triggerClassName?: string;
}

export const CustomPopover = memo<PopoverProps>(function CustomPopover (props) {
  const { refs, floatingStyles, } = useFloating<HTMLButtonElement>({
    middleware: [flip(), shift(), offset(5),],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  return (
    <Popover as={HStack} align="center" className={classNames(cls.CustomPopover, {}, [props.className,])}>
      <Popover.Button
        as="div"
        className={classNames(popupCls.btn, {}, [props.triggerClassName,])}
        ref={refs.setReference}
      >
        {props.trigger}
      </Popover.Button>

      <Popover.Panel
        ref={refs.setFloating}
        style={floatingStyles}
        className={classNames(cls.panel, {}, [popupCls.menu,])}
      >
        {props.children}
      </Popover.Panel>
    </Popover>
  );
});
