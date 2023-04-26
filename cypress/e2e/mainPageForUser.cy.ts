describe('edit product form inputs testing', () => {
  const { email, password } = { email: 'test-user@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');
    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-user').should('be.visible');
  });

  // it('test click Header BasketButton', () => {
  //   cy.get('button[class^="BasketButton_container"]').click();
  //   cy.url().should('contain', 'basket-page');
  //   cy.get('div[class^="LeftColumn_container"]').contains('Корзина').should('be.visible');
  //   cy.get('div[class^="BasketPageMainPart_container"]').should('be.visible');
  // });
  //
  // it('test click Header FavoriteButton', () => {
  //   cy.get('button[class^="FavoriteButton_container"]').click();
  //   cy.url().should('contain', 'favorite-product');
  //   cy.get('div[class^="LeftColumn_container"]').contains('Избранные Товары').should('be.visible');
  //   cy.get('div[class^="FavoriteProductsPageMainPart_container"]').should('be.visible');
  // });

  it('put products to Favorite', () => {
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoSelected');

    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(1)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(1).click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(1)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoSelected');

    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(2)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(2).click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(2)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoSelected');

    cy.get('button[class^="FavoriteButton_container"]').click();
    cy.get('div[class^="FavoriteProductsList_scrollContainer"]')
      .children('div[class^="ProductCardLayout_wrapper"]')
      .should('have.length', 3);
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="FavoriteProductsList_scrollContainer"]')
      .children('div[class^="ProductCardLayout_wrapper"]')
      .should('have.length', 2);
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="FavoriteProductsList_scrollContainer"]')
      .children('div[class^="ProductCardLayout_wrapper"]')
      .should('have.length', 1);
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="FavoriteProductsList_emptyList"]').should('be.visible');
  });
});
