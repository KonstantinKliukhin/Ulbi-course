import { type ReactNode } from 'react';
import { AppRoutes, RoutePath } from 'shared/config';
import HomeSVG from '../../../../public/assets/icons/main-20-20.svg';
import InfoSVG from '../../../../public/assets/icons/about-20-20.svg';
import ProfileSVG from '../../../../public/assets/icons/profile-20-20.svg';
import ArticlesSVG from '../../../../public/assets/icons/article-20-20.svg';

export interface SidebarItemType {
  path: string
  text: string
  icon: ReactNode
  onlyAuthorized: boolean
}

export const linkItems: SidebarItemType[] = [
  {
    path: RoutePath[AppRoutes.MAIN],
    text: 'nav_home',
    icon: <HomeSVG/>,
    onlyAuthorized: false,
  },
  {
    path: RoutePath[AppRoutes.ABOUT],
    text: 'nav_about',
    icon: <InfoSVG/>,
    onlyAuthorized: false,
  },
  {
    path: RoutePath[AppRoutes.PROFILE],
    text: 'nav_profile',
    icon: <ProfileSVG/>,
    onlyAuthorized: true,
  },
  {
    path: RoutePath[AppRoutes.ARTICLES],
    text: 'nav_articles',
    icon: <ArticlesSVG/>,
    onlyAuthorized: true,
  },
];
