import { mockedArticle } from '@/shared/mocks/mockedArticle';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import type { Article } from '@/entities/Article/model/types/article';

let currentArticle: Article;

describe('User goes on article details page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle(mockedArticle).then((article) => {
      cy.log(JSON.stringify(article));
      currentArticle = article;
      cy.visit(RoutePath.articleDetails(article.id));
    });
  });

  afterEach(() => {
    cy.deleteArticle(currentArticle.id);
  });

  it('Should see article content', () => {
    cy.getByTestId('ArticleDetails').should('exist');
    cy.getByTestId('ArticleDetails.Heading').should('have.text', currentArticle.title);
    cy.getByTestId('ArticleDetails.Paragraph').should('have.text', currentArticle.subtitle);
    cy.getByTestId('ArticleDetails.Views.Paragraph').should('have.text', currentArticle.views);
    cy.getByTestId('ArticleDetails.Created.Paragraph').should('have.text', currentArticle.createdAt);
  });

  it('Should see article recommendations', () => {
    cy.getByTestId('ArticleRecommendations').should('exist');
  });

  it('Should see article recommendations', () => {
    cy.getByTestId('ArticleRecommendations').should('exist');
  });
});
