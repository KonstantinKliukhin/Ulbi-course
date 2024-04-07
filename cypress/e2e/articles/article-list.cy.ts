describe('User goes on Articles page', () => {
  beforeEach(() => {
    cy.login().then(data => {
      cy.visit('/articles/1');
    });
  });

  it('list and items should exist', () => {
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
