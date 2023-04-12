describe('example to-do app', () => {
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

  it('RegistrationForm -> try to double register user with existing email ', () => {
    cy.goToRegisterForm();

    cy.get('input[name="email"]').type('test.user@email.com');
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="passwordRepeated"]').type('Пароль-123');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();

    cy.get('div[class^="PortalPopUp_content"]').contains('Ошибка регистрации');
    cy.get('div[class^="PortalPopUp_content"]').contains('уже зарегестрирован на площадке');
  });
});
