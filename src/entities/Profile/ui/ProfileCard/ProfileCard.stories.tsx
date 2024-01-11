import { type ComponentProps, type FC } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { mockedProfile } from '@/shared/mocks';
import { type Profile } from '../../model/types/profile';
import { FormProvider, useForm } from 'react-hook-form';

export default {
  title: 'entities/Profile/ProfileCard',
  component: ProfileCard,
} as Meta<ComponentProps<typeof ProfileCard>>;

type ProfileCardStory = StoryObj<typeof ProfileCard>;

const EditableProfileDecorator = (initialState?: Profile) =>
  function EditableProfileDecorator (Story: FC<ComponentProps<typeof ProfileCard>>) {
    const profileForm = useForm({ defaultValues: initialState, });

    return (
      <FormProvider {...profileForm}>
        <form>
          <Story/>
        </form>
      </FormProvider>
    );
  };

export const Static: ProfileCardStory = {
  args: {
    readonly: true,
    data: mockedProfile,
    avatar: 'https://media.discordapp.net/attachments/1039145378630598728/1069585335203405824/photo_5386435348135003852_y.jpg?ex=655b47f7&is=6548d2f7&hm=12b993b0834968acede9bbeb893da87949caf353b74b8ada9867ef793799070c&=&width=1116&height=1116',
  },
};

export const Loading: ProfileCardStory = {
  args: { isLoading: true, },
};

export const Editable: ProfileCardStory = {
  args: {
    avatar: 'https://media.discordapp.net/attachments/1039145378630598728/1069585335203405824/photo_5386435348135003852_y.jpg?ex=655b47f7&is=6548d2f7&hm=12b993b0834968acede9bbeb893da87949caf353b74b8ada9867ef793799070c&=&width=1116&height=1116',
  },
  decorators: [EditableProfileDecorator(mockedProfile),],
};

export const ApiError: ProfileCardStory = {
  args: {
    error: 'Some Api Error',
    data: mockedProfile,
    avatar: 'https://media.discordapp.net/attachments/1039145378630598728/1069585335203405824/photo_5386435348135003852_y.jpg?ex=655b47f7&is=6548d2f7&hm=12b993b0834968acede9bbeb893da87949caf353b74b8ada9867ef793799070c&=&width=1116&height=1116',
  },
  decorators: [EditableProfileDecorator(mockedProfile),],
};
