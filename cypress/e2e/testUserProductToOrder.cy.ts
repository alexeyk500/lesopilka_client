describe('put products to order and add products to order', () => {
  const { email, password } = { email: 'test-user@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');
    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-user').should('be.visible');
  });

  it('put 6 products to basket for 3 manufacturers', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(4).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(5).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(7).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(11).click();
    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('div[class^="IconButton_container"]').should('have.length', 3);
    cy.get('div[class^="BasketList_scrollContainer"]').children().should('have.length', 3);
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 6);

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Дата доставки').should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('put 3 products to basket and change amounts for products', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(4).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('div[class^="IconButton_container"]').should('have.length', 1);
    cy.get('div[class^="BasketList_scrollContainer"]').children().should('have.length', 1);
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 3);

    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);

    cy.get('input[class^="AmountInput_input"]').eq(0).clear();
    cy.get('input[class^="AmountInput_input"]').eq(0).type('25');
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 25);

    cy.get('input[class^="AmountInput_input"]').eq(1).clear();
    cy.get('input[class^="AmountInput_input"]').eq(1).type('3');
    cy.get('input[class^="AmountInput_input"]').eq(1).should('have.value', 3);

    cy.get('input[class^="AmountInput_input"]').eq(2).clear();
    cy.get('input[class^="AmountInput_input"]').eq(2).type('0');
    cy.get('input[class^="AmountInput_input"]').eq(2).should('have.value', '');

    cy.get('input[class^="AmountInput_input"]').eq(2).clear();
    cy.get('input[class^="AmountInput_input"]').eq(2).type('99');
    cy.get('input[class^="AmountInput_input"]').eq(2).should('have.value', '99');

    cy.get('input[class^="AmountInput_input"]').eq(0).clear();
    cy.get('input[class^="AmountInput_input"]').eq(0).type('1');
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);
    cy.get('[data-test-id="addAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 2);
    cy.get('[data-test-id="addAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 3);
    cy.get('[data-test-id="minesAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 2);
    cy.get('[data-test-id="minesAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);
    cy.get('[data-test-id="minesAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);
    cy.get('[data-test-id="minesAmountBtn"]').eq(0).click();
    cy.get('input[class^="AmountInput_input"]').eq(0).should('have.value', 1);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('put 2 products to basket and add two products to order ', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('div[class^="IconButton_container"]').should('have.length', 1);
    cy.get('div[class^="BasketList_scrollContainer"]').children().should('have.length', 1);
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 2);

    cy.get('img[class^="OrderToManufacturer_addToBasketIco"]').click();
    cy.get('div[class^="LeftColumn_title"]').contains('Добавление').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();

    cy.get('img[class^="OrderToManufacturer_addToBasketIco"]').click();
    cy.get('div[class^="LeftColumn_title"]').contains('Добавление').should('be.visible');
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(1).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 4);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('put 2 products to basket and add two products to order by manufacturerPrice', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('div[class^="IconButton_container"]').should('have.length', 1);
    cy.get('div[class^="BasketList_scrollContainer"]').children().should('have.length', 1);
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 2);

    cy.get('img[class^="OrderToManufacturer_addToBasketIco"]').click();
    cy.get('div[class^="LeftColumn_title"]').contains('Добавление').should('be.visible');

    cy.get('div[class^="IconButton_container"]').contains('Прайс').click();
    cy.get('div[class^="PriceList_pageTitle"]').contains('Прайс').should('be.visible');

    cy.get('img[class^="PriceListProductItem_basketIco"]').eq(1).click();
    cy.get('img[class^="PriceListProductItem_basketIco"]').eq(2).click();
    cy.get('button[class^="BasketButton_container"]').click();
    cy.get('div[class^="OrderProductsList_priceContentContainer"]')
      .children('div[class^="OrderToManufacturerItem_container"]')
      .should('have.length', 4);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });
});
