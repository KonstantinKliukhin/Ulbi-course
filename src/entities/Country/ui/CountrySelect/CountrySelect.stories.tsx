import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
} as Meta<ComponentProps<typeof CountrySelect>>;

type CountrySelectStory = StoryObj<typeof CountrySelect>;

export const Primary: CountrySelectStory = {
  args: {},
};
