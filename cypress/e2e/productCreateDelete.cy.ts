describe('create and delete product', () => {
  const { email, password } = { email: 'test-manufacturer@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');

    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-manufacturer').should('be.visible');

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Мои товары').click();

    cy.get('div[class^="ProductList_scrollContainer"]').should('have.length', 1);
    cy.get('div[class^="ProductCardLayout_wrapper"]').contains('Добавить карточку').should('be.visible');
    cy.get('div[class^="ProductCardLayout_wrapper"]').contains('Добавить карточку').click();
  });

  afterEach(() => {
    cy.deleteTestUserManufacturerProductsAll({ email });
  });

  it('create three products for empty manufacturer', () => {
    cy.createTestProduct();
    cy.get('button[class^="ButtonComponent_container"]').contains('Мои товары').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);

    cy.get('div[class^="ProductCardLayout_wrapper"]').contains('Добавить карточку').click();
    cy.createTestProduct();
    cy.get('button[class^="ButtonComponent_container"]').contains('Мои товары').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 3);

    cy.get('div[class^="ProductCardLayout_wrapper"]').contains('Добавить карточку').click();
    cy.createTestProduct();
    cy.get('button[class^="ButtonComponent_container"]').contains('Мои товары').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 4);
  });

  it('create One Product and delete it', () => {
    cy.createTestProduct();
    cy.get('button[class^="ButtonComponent_container"]').contains('Мои товары').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(1).click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Удалить').click();
    cy.get('div[class^="DeleteCardForm_container"]').contains('Удалить карточку товара').should('be.visible');

    cy.get('button[class^="PortalPopUp_topCloseBtn"]').click();
    cy.get('div[class^="DeleteCardForm_container"]').should('not.exist');

    cy.get('button[class^="ButtonComponent_container"]').contains('Удалить').click();
    cy.get('div[class^="PortalPopUp_btnGroups"]')
      .children('button[class^="ButtonComponent_container"]')
      .contains('Отмена')
      .click();
    cy.get('div[class^="DeleteCardForm_container"]').should('not.exist');

    cy.get('button[class^="ButtonComponent_container"]').contains('Удалить').click();
    cy.get('div[class^="PortalPopUp_btnGroups"]')
      .children('button[class^="ButtonComponent_container"]')
      .contains('Удалить')
      .click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
  });
});
