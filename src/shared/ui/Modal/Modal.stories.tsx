import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
} as Meta<ComponentProps<typeof Modal>>;

type ModalStory = StoryObj<typeof Modal>;

export const Primary: ModalStory = {
  args: {
    open: true,
    onClose: () => 'mock',
    children: 'Lorem Lorem Lorem  Lorem Lorem  Lorem  Lorem Lorem  Lorem  Lorem  Lorem Lorem  Lorem Lorem  Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ',
  },
};
