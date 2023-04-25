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

Cypress.Commands.add('createTestProduct', () => {
  cy.intercept('PUT', '**/product').as('updateProduct');

  cy.get('[data-test-id="categorySelector"]').select('Брус');
  cy.get('[data-test-id="subCategorySelector"]').select('Калиброваннный Брус');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="materialSelector"]').select('Сосна');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="height"]').select('100 мм');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="width"]').select('180 мм');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="length"]').select('4000 мм');
  cy.wait('@updateProduct');

  cy.get('[data-test-id="Сорт"]').select('2-й и 3-й сорт');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="Сорт"]').contains('2-й и 3-й сорт');

  cy.get('[data-test-id="Влажность"]').select('Камерная сушка');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="Влажность"]').contains('Камерная сушка');

  cy.get('[data-test-id="Обработка антисептиком"]').select('Септирован');
  cy.wait('@updateProduct');
  cy.get('[data-test-id="Обработка антисептиком"]').contains('Септирован');

  cy.intercept('POST', '**/picture/product').as('uploadPicture');

  cy.get('div[class^="ImagesList_container"]').children().should('have.length', 1);
  cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

  cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_1.jpg');
  cy.wait('@uploadPicture');
  cy.get('div[class^="ImagesList_container"]').children().should('have.length', 2);
  cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 2);
  cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 1);
  cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

  cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_2.jpg');
  cy.wait('@uploadPicture');
  cy.get('div[class^="ImagesList_container"]').children().should('have.length', 3);
  cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 3);
  cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 2);
  cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

  cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_3.jpg');
  cy.wait('@uploadPicture');
  cy.get('div[class^="ImagesList_container"]').children().should('have.length', 3);
  cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 3);
  cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 3);
  cy.get('label[class^="ImageCard_addImageButton"]').should('not.exist');

  cy.intercept('PUT', '**/description').as('updateDescription');
  cy.get('textarea[class^="ProductDescription"]').type('Самое описание, описание из описаний.');
  cy.wait('@updateDescription');
  cy.get('textarea[class^="ProductDescription"]').should('have.value', 'Самое описание, описание из описаний.');

  cy.get('input[class^="ProductCodeSection_customSizeInput"]').type('Артикул - 123/4567 Vk');
  cy.wait('@updateProduct');
  cy.get('input[class^="ProductCodeSection_customSizeInput"]').should('have.value', 'Артикул - 123/4567 Vk');

  cy.get('input[class^="ProductPriceSection_customSizeInput"]').type('123.50');
  cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '123.50');
  cy.wait('@updateProduct');
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
