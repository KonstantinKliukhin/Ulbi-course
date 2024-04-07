let profileId: string;

describe('User goes on profile page', () => {
  beforeEach(() => {
    cy.login().then(data => {
      profileId = data.id;
      cy.visit(`/profile/${data.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Profile successfully loaded', () => {
    cy.getByTestId('ProfileCard.Firstname.Input.Value').should('have.value', 'Anthony');
  });

  it('Editing Profile', () => {
    const newName = 'newName';
    const newLastname = 'newLastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestId('ProfileCard.Firstname.Input.Value').should('have.value', newName);
    cy.getByTestId('ProfileCard.Lastname.Input.Value').should('have.value', newLastname);
  });
});
