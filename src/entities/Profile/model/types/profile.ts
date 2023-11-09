import { type Currency } from 'entities/Currency/@x/profile';
import { type Country } from 'entities/Country/@x/profile';

export interface Profile {
  firstname?: string
  lastname?: string
  age?: number
  currency?: Currency
  country?: Country
  city?: string
  username?: string
  avatar?: Url
}

export interface ProfileSchema {
  profile: Profile | null
  isLoading: boolean
  error: string | null
  readonly: boolean
  form: Profile
}
