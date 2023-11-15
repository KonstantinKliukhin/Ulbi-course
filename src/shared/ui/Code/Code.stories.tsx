import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
} as Meta<ComponentProps<typeof Code>>;

type CodeStory = StoryObj<typeof Code>;

export const Primary: CodeStory = {
  args: {
    text: `
export default {
  title: 'shared/Code',
  component: Code,
} as Meta<ComponentProps<typeof Code>>;

type CodeStory = StoryObj<typeof Code>;
    `,
  },
};
