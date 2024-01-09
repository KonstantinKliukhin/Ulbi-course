import { Country } from './country';
import { type SelectOption } from '@/shared/ui';

export const COUNTRY_OPTIONS: Array<SelectOption<Country>> = [
  { value: Country.UKRAINE, content: Country.UKRAINE, },
  { value: Country.USA, content: Country.USA, },
  { value: Country.ENGLAND, content: Country.ENGLAND, },
];
