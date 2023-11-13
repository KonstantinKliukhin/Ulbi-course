import { type Profile } from 'entities/Profile';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'shared/lib';
import {
  getProfileValidationSchema
} from 'features/ProfileForm/model/validation/getProfileValidationSchema/getProfileValidationSchema';
import { useEffect } from 'react';

export interface UseProfileFormOptions {
  initialState?: Profile | null
  readonly?: boolean
}

export const useProfileForm = (initialState?: Profile | null) => {
  const resolver = useYupValidationResolver<Profile>(getProfileValidationSchema);
  const profileForm = useForm<Profile>({
    defaultValues: initialState || undefined,
    mode: 'onChange',
    resolver,
    delayError: 150,
  });

  const { reset, } = profileForm;

  useEffect(() => {
    if (initialState) {
      reset(initialState);
    }
  }, [reset, initialState,]);

  return profileForm;
};
