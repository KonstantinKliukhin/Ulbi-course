import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Text, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
} as Meta<ComponentProps<typeof Text>>;

type TextStory = StoryObj<typeof Text>;

export const OnlyText: TextStory = {
  args: { text: 'View with text prop passed', },
};

export const OnlyTitle: TextStory = {
  args: { title: 'View with title prop passed', },
};

export const TitleAndTextPrimary: TextStory = {
  args: {
    title: 'View with title prop passed',
    text: 'View with text prop passed',
  },
};

export const TitleAndTextError: TextStory = {
  args: {
    theme: TextTheme.ERROR,
    title: 'View with title prop passed',
    text: 'View with text prop passed',
  },
};
