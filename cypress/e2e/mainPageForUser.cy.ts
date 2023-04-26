describe('edit product form inputs testing', () => {
  const { email, password } = { email: 'test-user@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');
    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-user').should('be.visible');
  });

  it('test click Header BasketButton', () => {
    cy.get('button[class^="BasketButton_container"]').click();
    cy.url().should('contain', 'basket-page');
    cy.get('div[class^="LeftColumn_container"]').contains('Корзина').should('be.visible');
    cy.get('div[class^="BasketPageMainPart_container"]').should('be.visible');
  });

  it('test click Header FavoriteButton', () => {
    cy.get('button[class^="FavoriteButton_container"]').click();
    cy.url().should('contain', 'favorite-product');
    cy.get('div[class^="LeftColumn_container"]').contains('Избранные Товары').should('be.visible');
    cy.get('div[class^="FavoriteProductsPageMainPart_container"]').should('be.visible');
  });

  it('put one products to Favorite and delete it from product card', () => {
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

    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
  });

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

  it('put one products to Basket and delete it from product card', () => {
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');

    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
  });

  it('put products to Basket', () => {
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');

    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(1)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(1).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(1)
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');

    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(2)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(2)
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');

    cy.get('button[class^="BasketButton_container"]').click();
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 3);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 2);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 1);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="BasketList_emptyBasket"]').should('be.visible');
  });

  it('click DetailProductCard, put one products to Favorite and delete it from small product card', () => {
    cy.get('div[class^="ProductCardLayout_wrapper"]').eq(0).click();
    cy.get('div[class^="DetailProductCard_container"]').should('be.visible');
    cy.get('div[class^="DetailProductCard_container"]')
      .find('img[class^="SectionGeneralInfo_starIco"]')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
    cy.get('div[class^="DetailProductCard_container"]').find('img[class^="SectionGeneralInfo_starIco"]').click();
    cy.get('div[class^="DetailProductCard_container"]')
      .find('img[class^="SectionGeneralInfo_starIco"]')
      .should('have.attr', 'src')
      .and('include', 'starIcoSelected');
    cy.get('button[class^="ImageSlider_btnClose"]').click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoSelected');
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('div[class^="ProductCardLayout_starIcoContainer"]')
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'starIcoBlueStroke');
  });

  it('click DetailProductCard, put one products to Basket and delete it from small product card', () => {
    cy.get('div[class^="ProductCardLayout_wrapper"]').eq(0).click();
    cy.get('div[class^="DetailProductCard_container"]').should('be.visible');
    cy.get('div[class^="DetailProductCard_container"]')
      .find('img[class^="SectionGeneralInfo_cartIco"]')
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');

    cy.get('div[class^="DetailProductCard_container"]').find('img[class^="SectionGeneralInfo_cartIco"]').click();
    cy.get('div[class^="DetailProductCard_container"]')
      .find('img[class^="SectionGeneralInfo_cartIco"]')
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');

    cy.get('button[class^="ImageSlider_btnClose"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoSelected');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]')
      .eq(0)
      .should('have.attr', 'src')
      .and('include', 'cartIcoBlueStroke');
  });
});
