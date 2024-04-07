import type { Article } from '@/entities/Article/model/types/article';
import { mockedArticle } from '@/shared/mocks';
import { omit } from '@/shared/lib/utils/omit/omit';

export const createArticle = (article: Article = mockedArticle) => (
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: {
      authorization: 'asdasdsa',
    },
    body: omit(article, 'id'),
  }).then(({ body, }) => body)
);

export const deleteArticle = (articleId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      authorization: 'asdasdsa',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      deleteArticle(articleId: string): Chainable<void>;
    }
  }
}
