import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Modal',
  component: Modal,
} as Meta<ComponentProps<typeof Modal>>;

type ModalStory = StoryObj<typeof Modal>;

export const Primary: ModalStory = {
  args: {
    open: true,
    onClose: action('onClose'),
    children:
      'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};
