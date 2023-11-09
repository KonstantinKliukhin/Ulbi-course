import { type ComponentProps } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';

export default {
  title: 'entities/CountrySelect',
  component: CurrencySelect,
} as Meta<ComponentProps<typeof CurrencySelect>>;

type CurrencySelectStory = StoryObj<typeof CurrencySelect>;

export const Primary: CurrencySelectStory = {
  args: {},
};
