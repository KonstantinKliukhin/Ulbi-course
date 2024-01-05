import { type SelectOption } from 'shared/ui';
import { Currency } from './currency';

export const CURRENCY_OPTIONS: Array<SelectOption<Currency>> = [
  { value: Currency.EUR, content: Currency.EUR, },
  { value: Currency.USD, content: Currency.USD, },
  { value: Currency.UAH, content: Currency.UAH, },
];
