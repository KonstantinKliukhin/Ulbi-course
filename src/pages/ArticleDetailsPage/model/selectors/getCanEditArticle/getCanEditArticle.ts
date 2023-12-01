import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';

export const getCanEditArticle = createSelector(
  [
    getArticleDetailsData,
    getUserAuthData,
  ],
  (article, user) => {
    if (!article?.user.id || !user?.id) {
      return false;
    } else {
      return article.user.id === user.id;
    }
  }
);
