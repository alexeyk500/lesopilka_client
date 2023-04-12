/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', ({ email, password }) => {
  const userName = email.split('@')[0];
  cy.get('div[class^="LoginButton_container"]').contains('Войти').click();
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button').contains('Войти').click();
  cy.get('div[class^="LoginForm_container"]').should('not.exist');
  cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
  cy.get('div[class^="LoginButton_container"]').contains(userName);
});

Cypress.Commands.add('logout', () => {
  cy.get('div[class^="LoginButton_container"]').click();
  cy.get('form[class^="PortalPopUp_container"]').should('be.visible');
  cy.get('div[class^="LoginButton_containerLogout"]').should('be.visible');
  cy.get('button[class^="ButtonComponent_container"]').contains('Выйти').click();
  cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
  cy.get('div[class^="LoginButton_containerLogout"]').should('not.exist');
  cy.get('div[class^="LoginButton_container"]').contains('Войти');
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
