describe('test registration existed user as Manufacturer or Reseller', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const { email, password } = { email: 'test-manufacturer@email.com', password: 'secret' };

  it('manufacturer create product inputs checks', () => {
    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-manufacturer').should('be.visible');

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Мои товары').click();

    cy.get('div[class^="ProductList_scrollContainer"]').should('have.length', 1);
    cy.get('div[class^="ProductCard_addProductCardContainer"]').contains('Добавить карточку').should('be.visible');
    cy.get('div[class^="ProductCard_addProductCardContainer"]').click();

    // upload Picture
    cy.intercept('POST', '**/picture/product').as('uploadPicture');
    cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_1.jpg');
    cy.wait('@uploadPicture');
    cy.get('img[class^="ImageCard_imgProduct"]').should('be.visible');

    // cy.intercept('PUT', '**/description').as('updateDescription');
    // // check 'Описание'
    // cy.get('textarea[class^="ProductDescription"]').type('Самое описание, описание из описаний.');
    // cy.get('textarea[class^="ProductDescription"]').should('have.value', 'Самое описание, описание из описаний.');
    // cy.wait('@updateDescription');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Описание')
    //   .siblings('div[class^="CheckIndicator_checkedRound"]');
    //
    // cy.get('textarea[class^="ProductDescription"]').clear();
    // cy.get('textarea[class^="ProductDescription"]').should('have.value', '');
    // cy.wait('@updateDescription');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Описание')
    //   .siblings('div[class^="CheckIndicator_round"]')
    //
    // cy.intercept('PUT', '**/product').as('updateProduct');
    // // check 'Артикул'
    // cy.get('input[class^="ProductCodeSection_customSizeInput"]').type('Артикул - 123/4567 Vk');
    // cy.get('input[class^="ProductCodeSection_customSizeInput"]').should('have.value', 'Артикул - 123/4567 Vk');
    // cy.wait('@updateProduct');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Артикул')
    //   .siblings('div[class^="CheckIndicator_checkedRound"]');
    //
    // cy.get('input[class^="ProductCodeSection_customSizeInput"]').clear();
    // cy.get('input[class^="ProductCodeSection_customSizeInput"]').should('have.value', '');
    // cy.wait('@updateProduct');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Артикул')
    //   .siblings('div[class^="CheckIndicator_round"]')
    //
    // // check 'Цена'
    // cy.get('input[class^="ProductPriceSection_customSizeInput"]').type('123.50');
    // cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '123.50');
    // cy.wait('@updateProduct');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Цена')
    //   .siblings('div[class^="CheckIndicator_checkedRound"]');
    //
    // cy.get('input[class^="ProductPriceSection_customSizeInput"]').clear();
    // cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '');
    // cy.wait('@updateProduct');
    // cy.get('div[class^="CheckIndicator_container"]')
    //   .children('div[class^="CheckIndicator_topLine"]')
    //   .children('div[class^="CheckIndicator_title"]')
    //   .contains('Цена')
    //   .siblings('div[class^="CheckIndicator_round"]')

    cy.deleteTestUserManufacturerProductsAll({ email });
  });

  // it('manufacturer create product', () => {
  //   cy.login({ email, password });
  //   cy.get('div[class^="LoginButton_container"]').contains('test-manufacturer').should('be.visible');
  //
  //   cy.get('button[class^="MenuButton_container"]').click();
  //   cy.get('button[class^="MenuContent_menuButton"]').contains('Мои товары').click();
  //
  //   cy.get('div[class^="ProductList_scrollContainer"]').should('have.length', 1);
  //   cy.get('div[class^="ProductCard_addProductCardContainer"]').contains('Добавить карточку').should('be.visible');
  //   cy.get('div[class^="ProductCard_addProductCardContainer"]').click();
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Пиломатериал').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Размеры').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Доп. характеристики').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Фото').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Описание').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Артикул').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   cy.get('div[class^="SectionContainer_container"]').contains('Цена').should('exist');
  //   cy.get('div[class^="CheckIndicator_round"]').should('exist');
  //
  //   // Проверка инпута Цена
  //   cy.intercept('PUT', '**/product').as('updateProduct');
  //   cy.get('input[class^="ProductPriceSection_customSizeInput"]').type('123.50');
  //   cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '123.50');
  //   cy.wait('@updateProduct');
  //   cy.get('div[class^="CheckIndicator_container"]')
  //     .children('div[class^="CheckIndicator_topLine"]')
  //     .children('div[class^="CheckIndicator_title"]')
  //     .contains('Цена')
  //     .siblings('div[class^="CheckIndicator_checkedRound"]')
  //
  //   cy.get('div[class^="CheckIndicator_container"]')
  //     .children('div[class^="CheckIndicator_topLine"]')
  //     .children('div[class^="CheckIndicator_title"]')
  //     .contains('Артикул')
  //     .siblings('div[class^="CheckIndicator_round"]')
  //
  //   cy.deleteTestUserManufacturerProductsAll({ email });
  // })
});
