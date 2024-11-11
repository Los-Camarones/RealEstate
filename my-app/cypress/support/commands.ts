// Custom command to log in a user
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: { username, password },
      failOnStatusCode: false,
    }).then((resp) => {
      cy.log(`Response status: ${resp.status}`);
      cy.log(`Response status text: ${resp.statusText}`);
      cy.log(`Response body: ${JSON.stringify(resp.body)}`);
      cy.log(`Response headers: ${JSON.stringify(resp.headers)}`);
      if (resp.status === 200) {
        window.localStorage.setItem('authToken', resp.body.token); // Adjust based on your auth mechanism
      } else {
        throw new Error(`Login failed with status: ${resp.status}`);
      }
    });
  });
  
  
  
  // Extend Cypress namespace to include the custom command
  declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to log in a user with username and password.
         * @example cy.login('user', 'password')
         */
        login(username: string, password: string): Chainable<void>;
      }
    }
  }
  
  export {};