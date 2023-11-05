import { type Country, type Currency } from 'shared/constants';

export interface Profile {
  firstname: string
  lastname: string
  age: number
  currency: Currency
  country: Country
  city: string
  username: string
  avatar: Url
}

export interface ProfileSchema {
  profile: Profile | null
  isLoading: boolean
  error: string | null
  readonly: boolean
}
