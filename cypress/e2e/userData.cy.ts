describe('test UserPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const { email, password } = { email: 'test-user@email.com', password: 'secret' };
  const passwordWrong = 'No-Пароль-123';
  const passwordNew = 'secretNew';

  it('user try to change password', () => {
    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Изменить').click();

    cy.get('input[name="curr6ntPa55w0rd"]').type(passwordWrong);
    cy.get('input[name="curr6ntPa55w0rd"]').should('have.value', passwordWrong);
    cy.get('input[name="curr6ntPa55w0rd"]')
      .should('have.attr', 'type')
      .and('match', /password/);
    cy.get('img[class^="ChangePasswordForm_visibilityIco"]').click();
    cy.get('input[name="curr6ntPa55w0rd"]').should('have.attr', 'type').and('match', /text/);
    cy.get('img[class^="ChangePasswordForm_visibilityIco"]').click();
    cy.get('input[name="curr6ntPa55w0rd"]')
      .should('have.attr', 'type')
      .and('match', /password/);

    cy.get('button[class^="ButtonComponent_container"]').contains('Ввести').click();
    cy.get('div[class^="InfoAndErrorMessageForm_container"]').contains('неправильный пароль').should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="InfoAndErrorMessageForm_container"]').should('not.exist');

    cy.get('button[class^="ButtonComponent_container"]').contains('Изменить').click();
    cy.get('input[name="curr6ntPa55w0rd"]').type(password);
    cy.get('button[class^="ButtonComponent_container"]').contains('Ввести').click();
    cy.get('div[class^="NewPasswordForm_container"]').contains('новый пароль').should('be.visible');

    cy.get('input[name="pa55w0rd"]').type(passwordNew);
    cy.get('input[name="pa55w0rdRepeated"]').type(passwordWrong);
    cy.get('div[class^="PasswordInputFields_checkPasswordInfo"]').contains('Пароли не совпадают').should('be.visible');

    cy.get('input[name="pa55w0rdRepeated"]').clear();
    cy.get('input[name="pa55w0rdRepeated"]').type(passwordNew);
    cy.get('div[class^="PasswordInputFields_checkPasswordInfo"]').contains('Пароли совпадают').should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('Установить').click();
    cy.get('div[class^="PortalPopUp_content"]').contains('успешно изменен').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');

    cy.get('button[class^="ButtonComponent_container"]').contains('Изменить').click();
    cy.get('input[name="curr6ntPa55w0rd"]').type(passwordNew);
    cy.get('button[class^="ButtonComponent_container"]').contains('Ввести').click();
    cy.get('input[name="pa55w0rd"]').type(password);
    cy.get('input[name="pa55w0rdRepeated"]').type(password);
    cy.get('button[class^="ButtonComponent_container"]').contains('Установить').click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
  });

  it('user try to change user name', () => {
    const userName = email.split('@')[0];

    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[data-test-id="editName"]').click();
    cy.get('div[class^="ChangeUserNameForm_field"]').contains('Имя пользователя').should('be.visible');
    cy.get('input[name="nam6"]').should('have.value', userName);

    cy.get('input[name="nam6"]').clear();
    cy.get('input[name="nam6"]').type(passwordNew);
    cy.get('button[class^="ButtonComponent_container"]').contains('Сохранить').click();
    cy.get('div[class^="ChangeUserNameForm_field"]').should('not.exist');
    cy.get('div[class^="MainInformation_value"]').contains(passwordNew).should('be.visible');

    cy.get('button[data-test-id="editName"]').click();
    cy.get('input[name="nam6"]').clear();
    cy.get('input[name="nam6"]').type(userName);
    cy.get('button[class^="ButtonComponent_container"]').contains('Сохранить').click();
    cy.get('div[class^="MainInformation_value"]').contains(userName).should('be.visible');
  });

  it('user try to change user phone', () => {
    const userPhone = '+79876543210';
    const userPhoneNew = '+70123456789';

    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[data-test-id="editPhone"]').click();
    cy.get('div[class^="ChangeUserPhoneForm_mainPart"]').contains('Телефон пользователя').should('be.visible');
    cy.get('input[name="ph0n6"]').should('have.value', userPhone);

    cy.get('input[name="ph0n6"]').clear();
    cy.get('input[name="ph0n6"]').type(userPhoneNew);
    cy.get('button[class^="ButtonComponent_container"]').contains('Сохранить').click();
    cy.get('div[class^="ChangeUserPhoneForm_mainPart"]').should('not.exist');
    cy.get('div[class^="MainInformation_value"]').contains(userPhoneNew).should('be.visible');

    cy.get('button[data-test-id="editPhone"]').click();
    cy.get('input[name="ph0n6"]').clear();
    cy.get('input[name="ph0n6"]').type(userPhone);
    cy.get('button[class^="ButtonComponent_container"]').contains('Сохранить').click();
    cy.get('div[class^="MainInformation_value"]').contains(userPhone).should('be.visible');
  });
});
