import { RoutePath } from 'shared/config';
import { type Breadcrumb } from '../types/breadcrumbs';

export const MAIN_BREADCRUMB: Breadcrumb = {
  path: RoutePath.main,
  content: 'Main',
  dynamic: false,
  maxLevel: 0,
};

export const ABOUT_BREADCRUMB: Breadcrumb = {
  path: RoutePath.about,
  content: 'About',
  dynamic: false,
  maxLevel: 0,
};

export const PROFILE_BREADCRUMB: Breadcrumb = {
  path: RoutePath.profile(':id'),
  content: 'Profile',
  dynamic: true,
  maxLevel: Infinity,
};

export const ARTICLES_LIST_BREADCRUMB: Breadcrumb = {
  path: RoutePath.articles,
  content: 'Articles',
  dynamic: false,
  maxLevel: 0,
};

export const ARTICLE_DETAILS_BREADCRUMB: Breadcrumb = {
  path: RoutePath.articleDetails(':id'),
  content: 'Article',
  dynamic: true,
  maxLevel: Infinity,
};

export const BREADCRUMBS = [
  MAIN_BREADCRUMB,
  ABOUT_BREADCRUMB,
  PROFILE_BREADCRUMB,
  ARTICLES_LIST_BREADCRUMB,
  ARTICLE_DETAILS_BREADCRUMB,
];

export const MAX_BREADCRUMBS_LENGTH = 4;
