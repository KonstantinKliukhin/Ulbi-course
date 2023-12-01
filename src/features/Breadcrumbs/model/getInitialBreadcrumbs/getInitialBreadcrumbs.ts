import {
  BREADCRUMBS,
  MAX_BREADCRUMBS_LENGTH
} from '../../constants/breadcrumbs';
import { matchPath } from 'react-router-dom';
import { type Breadcrumb } from '../types/breadcrumbs';

export const getInitialBreadcrumbs = (): Breadcrumb[] => {
  const breadcrumbsWithMatchedPath = BREADCRUMBS.find((breadcrumb) =>
    matchPath(breadcrumb.path, location.pathname)
  );
  if (!breadcrumbsWithMatchedPath) return [];

  const breadcrumbs = BREADCRUMBS.filter(
    (breadcrumb) =>
      matchPath(`${breadcrumb.path}/*`, location.pathname) &&
      breadcrumbsWithMatchedPath.path.includes(breadcrumb.path)
  );

  const removeCount =
    breadcrumbs.length > MAX_BREADCRUMBS_LENGTH
      ? breadcrumbs.length - MAX_BREADCRUMBS_LENGTH
      : 0;
  breadcrumbs.splice(1, removeCount);

  return breadcrumbs;
};
