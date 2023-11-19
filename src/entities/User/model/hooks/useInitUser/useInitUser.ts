import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LOCAL_STORAGE_USER_KEY } from 'shared/constants';
import { userActions } from '../../slice/userSlice';
import { type User } from '../../types/user';

export const useInitUser = () => {
  const dispatch = useDispatch();

  useEffect(function initUser () {
    const user = getUserFromLocalStorage();

    if (user) {
      dispatch(userActions.setAuthData(user));
    }
  }, [dispatch,]);
};

function getUserFromLocalStorage (): User | null {
  const storageValue = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (!storageValue) return null;

  const user = JSON.parse(storageValue) as User | undefined;
  if (!user) return null;

  return user;
}
