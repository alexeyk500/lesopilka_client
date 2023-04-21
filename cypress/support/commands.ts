const baseApiUrl = 'http://localhost:5500/api';

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

Cypress.Commands.add('goToRegisterForm', () => {
  cy.get('div[class^="LoginButton_container"]').contains('Войти').click();
  cy.get('div[class^="LoginForm_container"]').should('be.visible');

  cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();
  cy.get('div[class^="LoginForm_container"]').should('not.exist');
  cy.get('div[class^="RegistrationForm_container"]').should('be.visible');
});

Cypress.Commands.add('deleteTestUser', ({ email, isUnconfirmed }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user`, { email, isUnconfirmed }).then((response) => {
    if (isUnconfirmed) {
      expect(response.body).to.have.property('message', 'testUserCandidate - deleted');
    } else {
      expect(response.body).to.have.property('message', 'testUser - deleted');
    }
  });
});

Cypress.Commands.add('deleteTestUserAddress', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-address`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserAddress - deleted');
  });
});

Cypress.Commands.add('deleteTestUserBasket', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-basket`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserBasket - deleted');
  });
});

Cypress.Commands.add('deleteTestUserSearchRegionAndLocation', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-search-region-and-location`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserSearchRegionAndLocation - deleted');
  });
});

Cypress.Commands.add('deleteTestUserManufacturer', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-manufacturer`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserManufacturer - deleted');
  });
});

Cypress.Commands.add('deleteTestUserManufacturerAddress', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-manufacturer-address`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserManufacturerAddress - deleted');
  });
});

Cypress.Commands.add('deleteTestUserReseller', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-reseller`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserReseller - deleted');
  });
});

Cypress.Commands.add('deleteTestUserResellerAddress', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-user-reseller-address`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'testUserResellerAddress - deleted');
  });
});

Cypress.Commands.add('deleteTestUserManufacturerProductsAll', ({ email }) => {
  cy.request('POST', `${baseApiUrl}/test/delete-test-manufacturer-products-all`, { email }).then((response) => {
    expect(response.body).to.have.property('message', 'deleteTestManufacturerProductsAll - deleted');
  });
});
