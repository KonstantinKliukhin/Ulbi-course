import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Drawer',
  component: Drawer,
} as Meta<ComponentProps<typeof Drawer>>;

type DrawerStory = StoryObj<typeof Drawer>;

export const Default: DrawerStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};

export const Nested: DrawerStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    children: (
      <>
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem
        <Drawer open={true} onClose={action('nested: Onclose')}>
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        </Drawer>
      </>
    ),
  },
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
    open: true,
    position: 'right',
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};

export const Bottom: DrawerStory = {
  args: {
    open: true,
    position: 'bottom',
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};

export const Left: DrawerStory = {
  args: {
    open: true,
    position: 'left',
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};
