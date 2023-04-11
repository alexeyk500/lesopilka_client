describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('appStart', () => {
    cy.get('div').contains('Каталог').should('be.visible');
    cy.get('div').contains('Войти').should('be.visible');
  });

  it('showLoginPopUp', () => {
    cy.get('div').contains('Войти').click();
    cy.get('input[name="email"]').should('be.visible');
  });

  it('loginByAdmin', () => {
    cy.get('div[data-test-id="loginButtonId"]').click();
    cy.get('input[name="email"]').type('admin@email.com');
    cy.get('input[name="password"]').type('secret');
    cy.get('button').contains('Войти').click();
  });
});
