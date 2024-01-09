import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { action } from '@storybook/addon-actions';
import { useBoolState } from '../../../../lib/utils/useBoolState/useBoolState';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Drawer',
  component: Drawer,
} as Meta<ComponentProps<typeof Drawer>>;

type DrawerStory = StoryObj<typeof Drawer>;

type ExampleProps = Omit<ComponentProps<typeof Drawer>, 'open' | 'onClose'>;
const DrawerExample = (props: ExampleProps) => {
  const drawerState = useBoolState();

  return (
    <div style={{ padding: 40, }}>
      <Button onClick={drawerState.toggle}>{drawerState.boolState ? 'close' : 'open'}</Button>
      <Drawer {...props} open={drawerState.boolState} onClose={drawerState.disable} />
    </div>
  );
};

export const Default: DrawerStory = {
  args: {
    children: 'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
  render: DrawerExample,
};

export const Nested: DrawerStory = {
  args: {
    children: (
      <DrawerExample>
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
      </DrawerExample>
    ),
  },
  render: DrawerExample,
};

export const Top: DrawerStory = {
  args: {
    open: true,
    position: 'top',
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};

export const Right: DrawerStory = {
  args: {
    position: 'right',
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
  render: DrawerExample,
};

export const Bottom: DrawerStory = {
  args: {
    position: 'bottom',
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
  render: DrawerExample,
};

export const Left: DrawerStory = {
  args: {
    position: 'left',
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
  render: DrawerExample,
};
