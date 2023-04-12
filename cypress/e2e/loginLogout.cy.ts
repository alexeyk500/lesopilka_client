describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // it('test.user@email.com = login->logout', () => {
  //   cy.login({ email: 'test.user@email.com', password: 'secret' });
  //   cy.logout();
  // });
  //
  // it('test.user@email.com = login->close logout PopUp', () => {
  //   cy.login({ email: 'test.user@email.com', password: 'secret' });
  //
  //   cy.get('div[class^="LoginButton_container"]').click();
  //   cy.get('form[class^="PortalPopUp_container"]').should('be.visible');
  //   cy.get('div[class^="LoginButton_containerLogout"]').should('be.visible');
  //
  //   cy.get('button[class^="PortalPopUp_topCloseBtn"]').click();
  //   cy.get('div[class^="LoginForm_container"]').should('not.exist');
  //   cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
  //   cy.get('div[class^="LoginButton_container"]').contains('test.user');
  // });
  //
  // it('test.user@email.com = login->cancel logout', () => {
  //   cy.login({ email: 'test.user@email.com', password: 'secret' });
  //
  //   cy.get('div[class^="LoginButton_container"]').click();
  //   cy.get('form[class^="PortalPopUp_container"]').should('be.visible');
  //   cy.get('div[class^="LoginButton_containerLogout"]').should('be.visible');
  //
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Отмена').click();
  //   cy.get('div[class^="LoginForm_container"]').should('not.exist');
  //   cy.get('form[class^="PortalPopUp_container"]').should('not.exist');
  //   cy.get('div[class^="LoginButton_container"]').contains('test.user');
  // });

  it('loginForm show/hide -> password', () => {
    cy.get('div[class^="LoginButton_container"]').contains('Войти').click();
    cy.get('input[name="password"]').type('Пароль-123');
    cy.get('input[name="password"]').should('have.value', 'Пароль-123');
    cy.get('input[name="password"]')
      .should('have.attr', 'type')
      .and('match', /password/);
    cy.get('img[class^="LoginForm_eyeIco"]').click();
    cy.get('input[name="password"]').should('have.attr', 'type').and('match', /text/);
  });
});
