import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Flyout } from './Flyout';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Flyout',
  component: Flyout,
} as Meta<ComponentProps<typeof Flyout>>;

type FlyoutStory = StoryObj<typeof Flyout>;

export const Default: FlyoutStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};

export const Nested: FlyoutStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    children: (
      <>
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        Lorem Lorem Lorem Lorem Lorem Lorem
        <Flyout open={true} onClose={action('nested: Onclose')}>
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
          Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
        </Flyout>
      </>
    ),
  },
};
