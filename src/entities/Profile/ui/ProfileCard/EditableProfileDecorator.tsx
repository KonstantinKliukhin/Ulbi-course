import { type ComponentProps, type FC } from 'react';
import { type ProfileCard } from './ProfileCard';
import { FormProvider } from 'react-hook-form';
import { useProfileForm } from 'features/ProfileForm';
import { type Profile } from 'entities/Profile';

export const EditableProfileDecorator = (initialState?: Profile) =>
  function EditableProfileDecorator (Story: FC<ComponentProps<typeof ProfileCard>>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const profileForm = useProfileForm(initialState);

    return (
      <FormProvider {...profileForm}>
        <form>
          <Story/>
        </form>
      </FormProvider>
    );
  };
