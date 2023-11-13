import { type Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export const mockedProfile: Profile = {
  username: 'Kostya',
  firstname: 'Kostya',
  lastname: 'Kostya',
  age: 21,
  city: 'Kharkiv',
  avatar: 'https://media.discordapp.net/attachments/1039145378630598728/1069585335203405824/photo_5386435348135003852_y.jpg?ex=655b47f7&is=6548d2f7&hm=12b993b0834968acede9bbeb893da87949caf353b74b8ada9867ef793799070c&=&width=1116&height=1116',
  currency: Currency.EUR,
  country: Country.UKRAINE,
};
