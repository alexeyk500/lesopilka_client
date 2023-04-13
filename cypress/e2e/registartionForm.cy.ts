describe('test for registration form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('RegistrationForm -> show/close', () => {
    cy.goToRegisterForm();
    cy.get('button[class^="PortalPopUp_topCloseBtn"]').click();
    cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');
  });

  it('RegistrationForm -> show/cancel', () => {
    cy.goToRegisterForm();
    cy.get('button[class^="ButtonComponent_container"]').contains('Отмена').click();
    cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');
  });

  it('RegistrationForm -> show/hide password letters', () => {
    cy.goToRegisterForm();

    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="password"]').should('have.value', 'Пароль-123');
    cy.get('input[name="password"]')
      .should('have.attr', 'type')
      .and('match', /password/);
    cy.get('img[class^="PasswordInputFields_visibilityIco"]').click();
    cy.get('input[name="password"]').should('have.attr', 'type').and('match', /text/);
  });

  it('RegistrationForm -> match/mismatch passwords', () => {
    cy.goToRegisterForm();

    cy.get('input[name="email"]').type('new-user@email.com');
    cy.get('input[name="password"]').type('Пароль-12345');
    cy.get('input[name="passwordRepeated"]').type('Пароль');
    cy.get('div[class^="PasswordInputFields_checkPasswordInfo"]').contains('Пароли не совпадают');

    cy.get('input[name="passwordRepeated"]').type('-12345');
    cy.get('div[class^="PasswordInputFields_checkPasswordInfo"]').contains('Пароли совпадают');
  });

  it('RegistrationForm -> register new unconfirmed user and send confirm letter', () => {
    cy.goToRegisterForm();

    cy.get('input[name="email"]').type('test-unconfirmed-user@email.com');
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="passwordRepeated"]').type('Пароль-123');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();
    cy.get('div[class^="ConfirmEmailForm_bottomTitle"]').contains('Письмо');
    cy.get('div[class^="ConfirmEmailForm_bottomTitle"]').contains('отправлено');
    cy.get('div[class^="ConfirmEmailForm_subTitle"]').contains('зарегестрирован');
  });

  it('RegistrationForm -> register existing unconfirmedUser  ', () => {
    cy.goToRegisterForm();

    cy.get('input[name="email"]').type('test-unconfirmed-user@email.com');
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="passwordRepeated"]').type('Пароль-123');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();

    cy.get('div[class^="PortalPopUp_content"]').contains('Ошибка регистрации');
    cy.get('div[class^="PortalPopUp_content"]').contains('прошел предварительную регистрацию');

    cy.deleteTestUser({ email: 'test-unconfirmed-user@email.com', isUnconfirmed: true });
  });

  it('RegistrationForm -> try to double register confirmed user by email ', () => {
    cy.goToRegisterForm();

    cy.get('input[name="email"]').type('test.user@email.com');
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="passwordRepeated"]').type('Пароль-123');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();

    cy.get('div[class^="PortalPopUp_content"]').contains('Ошибка регистрации');
    cy.get('div[class^="PortalPopUp_content"]').contains('уже прошел предварительную регистрацию');
  });

  it('RegistrationForm -> user full flow from registration and activation by link in email', () => {
    const testUserEmail = 'test-user-registration@email.com';
    const userName = testUserEmail.split('@')[0];
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5500/api/user/create-user-candidate',
    }).as('registrationResult');

    cy.goToRegisterForm();

    cy.get('input[name="email"]').type(testUserEmail);
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="passwordRepeated"]').type('Пароль-123');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();
    cy.get('div[class^="ConfirmEmailForm_bottomTitle"]').contains('Письмо');
    cy.get('div[class^="ConfirmEmailForm_bottomTitle"]').contains('отправлено');
    cy.get('div[class^="ConfirmEmailForm_subTitle"]').contains('зарегестрирован');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно');

    cy.wait('@registrationResult')
      .its('response.body')
      .then((body) => {
        const code = body.message.split('$')[1];
        if (code) {
          cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
          cy.visit(`/user-activation/${code}`);
        }
      });

    cy.get('div[class^="SuccessActivateUserForm_container"]').contains('Успешная активация');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="SuccessActivateUserForm_container"]').should('not.exist');
    cy.get('div[class^="LoginButton_container"]').contains(userName);
    cy.get('div[class^="MainInformation_value"]').contains(userName);

    cy.deleteTestUserAddress({ email: testUserEmail });
    cy.deleteTestUserBasket({ email: testUserEmail });
    cy.deleteTestUserSearchRegionAndLocation({ email: testUserEmail });
    cy.deleteTestUser({ email: testUserEmail });
    cy.deleteTestUser({ email: testUserEmail, isUnconfirmed: true });
  });
});
