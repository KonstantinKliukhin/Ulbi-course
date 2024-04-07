describe('empty spec', () => {
  describe('User is Unauthorized', () => {
    it('Go to main page', () => {
      cy.visit('/');
      cy.getByTestId('Main.Page').should('exist');
    });

    it('Go to profile page', () => {
      cy.visit('/profile/1');
      cy.getByTestId('Forbidden.Page').should('exist');
    });

    it('Go to non-existent page', () => {
      cy.visit('/some-non-existent-page-1233213213123');
      cy.getByTestId('NotFound.Page').should('exist');
    });
  });

  describe('User is Authorized', () => {
    beforeEach(() => {
      cy.login('cypress-user', '123');
    });

    it('Go to profile page', () => {
      cy.visit('/profile/1');
      cy.getByTestId('Profile.Page').should('exist');
    });

    it('Go to articles page', () => {
      cy.visit('/articles');
      cy.getByTestId('Articles.Page').should('exist');
    });

    it('Go to article details page', () => {
      cy.visit('/articles/1');
      cy.getByTestId('ArticleDetails.Page').should('exist');
    });
  });
});
