import { useMemo } from 'react';
import { RoutePath } from '@/shared/config';
import { MainIcon, AboutIcon, ProfileIcon, ArticleIcon } from '@/shared/assets';
import { addOptionallyToArray } from '@/shared/lib';
import { useUserAuthData } from '@/entities/User';
import { type SidebarItemType } from './types/sidebarItem';

interface GetLinkItemsArg {
  profileId?: string;
  isAuthorized: boolean;
}

const getLinkItems = (arg: GetLinkItemsArg): SidebarItemType[] => [
  {
    path: RoutePath.main,
    text: 'nav_home',
    icon: <MainIcon/>,
  },
  {
    path: RoutePath.about,
    text: 'nav_about',
    icon: <AboutIcon/>,
  },
  ...addOptionallyToArray(arg.isAuthorized && Boolean(arg.profileId), {
    path: RoutePath.profile(arg.profileId!),
    text: 'nav_profile',
    icon: <ProfileIcon/>,
  }),
  ...addOptionallyToArray(arg.isAuthorized, {
    path: RoutePath.articles,
    text: 'nav_articles',
    icon: <ArticleIcon/>,
  }),
];

export const useLinkItems = () => {
  const user = useUserAuthData();
  const isAuthorized = Boolean(user);

  return useMemo(() => (
    getLinkItems({
      isAuthorized,
      profileId: user?.id,
    })
  ), [user?.id, isAuthorized,]);
};
