import { type Currency } from '@/entities/Currency/@x/profile';
import { type Country } from '@/entities/Country/@x/profile';

export interface Profile {
  firstname?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: Url;
}
