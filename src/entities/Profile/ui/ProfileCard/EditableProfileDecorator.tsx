import { type ComponentProps, type FC } from 'react';
import { type ProfileCard } from './ProfileCard';
import { FormProvider } from 'react-hook-form';
import { useProfileForm } from '@/features/EditableProfile/model/hooks/useProfileForm/useProfileForm';
import { type Profile } from '../../model/types/profile';

export const EditableProfileDecorator = (initialState?: Profile) =>
  function EditableProfileDecorator (Story: FC<ComponentProps<typeof ProfileCard>>) {
    const profileForm = useProfileForm(initialState);

    return (
      <FormProvider {...profileForm}>
        <form>
          <Story/>
        </form>
      </FormProvider>
    );
  };
