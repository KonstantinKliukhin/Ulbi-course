import { useMemo } from 'react';
import { AppRoutes, RoutePath } from 'shared/config';
import HomeSVG from '../../../../public/assets/icons/main-20-20.svg';
import InfoSVG from '../../../../public/assets/icons/about-20-20.svg';
import ProfileSVG from '../../../../public/assets/icons/profile-20-20.svg';
import ArticlesSVG from '../../../../public/assets/icons/article-20-20.svg';
import { addOptionallyToArray, useAppSelector } from 'shared/lib';
import { getUserAuthData } from 'entities/User';
import { type SidebarItemType } from './types/sidebarItem';

interface GetLinkItemsArg {
  profileId?: string
  isAuthorized: boolean
}

const getLinkItems = (arg: GetLinkItemsArg): SidebarItemType[] => [
  {
    path: RoutePath[AppRoutes.MAIN],
    text: 'nav_home',
    icon: <HomeSVG/>,
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    text: 'nav_about',
    icon: <InfoSVG/>,
  },
  ...addOptionallyToArray([arg.isAuthorized, Boolean(arg.profileId),], {
    path: RoutePath[AppRoutes.PROFILE](arg.profileId!),
    text: 'nav_profile',
    icon: <ProfileSVG/>,
  }),
  ...addOptionallyToArray(arg.isAuthorized, {
    path: RoutePath[AppRoutes.ARTICLES],
    text: 'nav_articles',
    icon: <ArticlesSVG/>,
  }),
];

export const useLinkItems = () => {
  const user = useAppSelector(getUserAuthData);
  const isAuthorized = Boolean(user);

  return useMemo(() => (
    getLinkItems({
      isAuthorized,
      profileId: user?.id,
    })
  ), [user?.id, isAuthorized,]);
};
