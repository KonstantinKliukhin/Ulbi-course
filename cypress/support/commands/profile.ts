import { LOCAL_STORAGE_USER_KEY } from '@/shared/constants/localstorage';

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'PATCH',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      authorization: 'asdasdsa',
    },
    body: {
      id: '4',
      avatar: 'http://media.discordapp.net/attachments/1039145378630598728/1069585335203405824/photo_5386435348135003852_y.jpg?ex=655b47f7&is=6548d2f7&hm=12b993b0834968acede9bbeb893da87949caf353b74b8ada9867ef793799070c&=&width=1116&height=1116',
      username: 'cypress-user',
      city: 'London',
      currency: 'EUR',
      country: 'England',
      age: 28,
      lastname: 'Hollingsworth',
      firstname: 'Anthony',
    },
  }).then(({ body, }) => {
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(body));

    return body;
  });
};

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('ProfilePageHeader.Edit.Button').click();

  cy.getByTestId('ProfileCard.Firstname.Input.Value').clear();
  cy.getByTestId('ProfileCard.Firstname.Input.Value').type(firstname);

  cy.getByTestId('ProfileCard.Lastname.Input.Value').clear();
  cy.getByTestId('ProfileCard.Lastname.Input.Value').type(lastname);

  cy.getByTestId('ProfilePageHeader.Save.Button').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      resetProfile(profileId: string): Chainable<void>;
      updateProfile(firstname: string, lastname: string): Chainable<void>;
    }
  }
}
