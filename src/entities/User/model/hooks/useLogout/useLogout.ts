import { USER_LOCALSTORAGE_KEY } from 'shared/constants';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { userActions } from 'entities/User';

export const useLogout = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    removeUserFromStorage();
    dispatch(userActions.removeAuthData());
  }, [dispatch,]);
};

function removeUserFromStorage () {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
