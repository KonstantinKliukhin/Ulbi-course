import { memo } from 'react';
import { DropDown } from '@/shared/ui';
import {
  useIsAdminUser, useIsManagerUser,
  useLogout,
  UserInfo,
  useUserAuthData
} from '@/entities/User';
import { addOptionallyToArray } from '@/shared/lib';
import { RoutePath } from '@/shared/config';
import { useTranslation } from 'react-i18next';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo<AvatarDropdownProps>(function AvatarDropdown (props) {
  const isAdmin = useIsAdminUser();
  const isManager = useIsManagerUser();
  const userAuthData = useUserAuthData();
  const { t, } = useTranslation();
  const logout = useLogout();

  if (userAuthData) {
    return (
      <DropDown
        buttonContent={<UserInfo shouldDisplayUsername={false}/>}
        items={[
          ...addOptionallyToArray(isAdmin || isManager, {
            content: t('nav_admin'),
            link: RoutePath.adminPanel,
          }),
          {
            link: RoutePath.profile(userAuthData.id),
            content: t('nav_profile'),
          },
          {
            content: t('logout'),
            onClick: logout,
          },
        ]}
      />
    );
  } else {
    return null;
  }
});
