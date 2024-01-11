import cls from './DropDown.module.scss';
import popupCls from '../../styles/Popup.module.scss';
import { classNames } from '../../../../lib/ui/classNames/classNames';
import { memo, type ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating
} from '@floating-ui/react-dom';
import { useNavigate } from 'react-router-dom';

export interface DropdownItem {
  content?: ReactNode;
  disable?: boolean;
  onClick?: () => void;
  link?: string;
}

interface DropDownProps {
  className?: string;
  buttonContent?: ReactNode;
  items: DropdownItem[];
}

export const DropDown = memo<DropDownProps>(function DropDown (props) {
  const { refs, floatingStyles, } = useFloating<HTMLButtonElement>({
    middleware: [flip(), shift(), offset(5),],
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });
  const navigate = useNavigate();

  return (
    <Menu as="div" className={classNames(cls.DropDown, {}, [props.className,])}>
      <Menu.Button ref={refs.setReference} className={popupCls.btn}>
        {props.buttonContent}
      </Menu.Button>
      <Menu.Items
        as="ul"
        ref={refs.setFloating}
        style={floatingStyles}
        className={popupCls.menu}
      >
        {props.items.map((item, index) => (
          <Menu.Item as="li" disabled={item.disable} key={index}>
            {({ active, }) => (
              <button
                role="link"
                data-href={item.link}
                className={classNames(
                  cls.item,
                  { [popupCls.itemActive]: active, [popupCls.itemDisabled]: item.disable, },
                  [popupCls.item,]
                )}
                onClick={item.link ? () => { navigate(item.link!); } : item.onClick}
              >
                {item.content}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
});
