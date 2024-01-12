import { useEffect } from 'react';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/constants';
import { useUserActions } from '../../slice/userSlice';
import { type User } from '../../types/user';
import { parseJSON } from '@/shared/lib';

export const useInitUser = () => {
  const { setAuthData, } = useUserActions();

  useEffect(function initUser () {
    const user = getUserFromLocalStorage();

    if (user) {
      setAuthData(user);
    }
  }, [setAuthData,]);
};

function getUserFromLocalStorage (): User | null {
  const storageValue = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (!storageValue) return null;

  const user = parseJSON<User>(storageValue);
  if (!user) return null;

  return user;
}
