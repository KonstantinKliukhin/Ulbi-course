import { LOCAL_STORAGE_USER_KEY } from '@/shared/constants/localstorage';
import { type User } from '@/entities/User';

export const login = (username: string = 'cypress-user', password: string = '123') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password,
    },
  }).then(({ body, }) => {
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(body));

    return body;
  });
};

export const getByTestId = (testId: string) => (
  cy.get(`[data-testid="${testId}"`)
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>;
      getByTestId(testId: string): Chainable<ReturnType<typeof cy.get>>;
    }
  }
}
