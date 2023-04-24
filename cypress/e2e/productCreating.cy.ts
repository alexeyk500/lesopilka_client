describe('edit product form inputs testing', () => {
  const { email, password } = { email: 'test-manufacturer@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');

    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-manufacturer').should('be.visible');

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Мои товары').click();

    cy.get('div[class^="ProductList_scrollContainer"]').should('have.length', 1);
    cy.get('div[class^="ProductCard_addProductCardContainer"]').contains('Добавить карточку').should('be.visible');
    cy.get('div[class^="ProductCard_addProductCardContainer"]').click();
  });

  afterEach(() => {
    cy.deleteTestUserManufacturerProductsAll({ email });
  });

  it('show sections for edit product', () => {
    cy.get('div[class^="SectionContainer_container"]').contains('Пиломатериал').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Размеры').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Доп. характеристики').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Фото').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Описание').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Артикул').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');

    cy.get('div[class^="SectionContainer_container"]').contains('Цена').should('exist');
    cy.get('div[class^="CheckIndicator_round"]').should('exist');
  });

  it('check upload product picture', () => {
    cy.intercept('POST', '**/picture/product').as('uploadPicture');

    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 1);
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

    cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_1.jpg');
    cy.wait('@uploadPicture');
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 2);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 2);
    cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 1);
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

    cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_2.jpg');
    cy.wait('@uploadPicture');
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 3);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 3);
    cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 2);
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

    cy.get('label[class^="ImageCard_addImageButton"]').selectFile('cypress/fixtures/productImg_3.jpg');
    cy.wait('@uploadPicture');
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 3);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 3);
    cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 3);
    cy.get('label[class^="ImageCard_addImageButton"]').should('not.exist');

    cy.get('div[class^="ImagesList_container"]')
      .children('div[class^="ImageCard_container"]')
      .eq(2)
      .children('button[class^="ImageCard_deleteBtn"]')
      .click();
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 3);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 3);
    cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 2);
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

    cy.get('div[class^="ImagesList_container"]')
      .children('div[class^="ImageCard_container"]')
      .eq(1)
      .children('button[class^="ImageCard_deleteBtn"]')
      .click();
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 2);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 2);
    cy.get('img[class^="ImageCard_imgProduct"]').should('have.length', 1);
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');

    cy.get('div[class^="ImagesList_container"]')
      .children('div[class^="ImageCard_container"]')
      .eq(0)
      .children('button[class^="ImageCard_deleteBtn"]')
      .click();
    cy.get('div[class^="ImagesList_container"]').children().should('have.length', 1);
    cy.get('div[class^="ImagesList_container"]').children('div[class^="ImageCard_container"]').should('have.length', 1);
    cy.get('img[class^="ImageCard_imgProduct"]').should('not.exist');
    cy.get('label[class^="ImageCard_addImageButton"]').should('be.visible');
  });

  it('check update product description', () => {
    cy.intercept('PUT', '**/description').as('updateDescription');

    cy.get('textarea[class^="ProductDescription"]').type('Самое описание, описание из описаний.');
    cy.get('textarea[class^="ProductDescription"]').should('have.value', 'Самое описание, описание из описаний.');
    cy.wait('@updateDescription');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Описание')
      .siblings('div[class^="CheckIndicator_checkedRound"]');

    cy.get('textarea[class^="ProductDescription"]').clear();
    cy.get('textarea[class^="ProductDescription"]').should('have.value', '');
    cy.wait('@updateDescription');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Описание')
      .siblings('div[class^="CheckIndicator_round"]');
  });

  it('check update product code', () => {
    cy.intercept('PUT', '**/product').as('updateProduct');

    cy.get('input[class^="ProductCodeSection_customSizeInput"]').type('Артикул - 123/4567 Vk');
    cy.get('input[class^="ProductCodeSection_customSizeInput"]').should('have.value', 'Артикул - 123/4567 Vk');
    cy.wait('@updateProduct');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Артикул')
      .siblings('div[class^="CheckIndicator_checkedRound"]');

    cy.get('input[class^="ProductCodeSection_customSizeInput"]').clear();
    cy.get('input[class^="ProductCodeSection_customSizeInput"]').should('have.value', '');
    cy.wait('@updateProduct');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Артикул')
      .siblings('div[class^="CheckIndicator_round"]');
  });

  it('check update product price', () => {
    cy.intercept('PUT', '**/product').as('updateProduct');

    cy.get('input[class^="ProductPriceSection_customSizeInput"]').type('123.50');
    cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '123.50');
    cy.wait('@updateProduct');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Цена')
      .siblings('div[class^="CheckIndicator_checkedRound"]');

    cy.get('input[class^="ProductPriceSection_customSizeInput"]').clear();
    cy.wait('@updateProduct');
    cy.get('input[class^="ProductPriceSection_customSizeInput"]').should('have.value', '');
    cy.get('div[class^="CheckIndicator_container"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_title"]')
      .contains('Цена')
      .siblings('div[class^="CheckIndicator_round"]');
  });

  it('check update product lumber', () => {
    cy.get('[data-test-id="Пиломатериал"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .should('exist');

    cy.get('[data-test-id="categorySelector"]').select('Брус');
    cy.get('div[class^="Selector_container"]').contains('Брус');

    cy.get('[data-test-id="subCategorySelector"]').select('Калиброваннный Брус');
    cy.get('div[class^="Selector_container"]').contains('Калиброваннный Брус');

    cy.get('[data-test-id="materialSelector"]').select('Сосна');
    cy.get('div[class^="Selector_container"]').contains('Сосна');

    cy.get('[data-test-id="Пиломатериал"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('exist');
  });

  it('check update product sizes for not round', () => {
    cy.get('[data-test-id="Размеры"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .should('exist');

    cy.get('[data-test-id="categorySelector"]').select('Брус');
    cy.get('[data-test-id="subCategorySelector"]').select('Калиброваннный Брус');
    cy.get('[data-test-id="materialSelector"]').select('Сосна');

    cy.get('[data-test-id="height"]').select('100 мм');
    cy.get('[data-test-id="height"]').contains('100 мм');

    cy.get('[data-test-id="width"]').select('180 мм');
    cy.get('[data-test-id="width"]').contains('180 мм');

    cy.get('[data-test-id="length"]').select('4000 мм');
    cy.get('[data-test-id="length"]').contains('4000 мм');

    cy.get('[data-test-id="Размеры"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('exist');
  });

  it('check update product sizes for round', () => {
    cy.get('[data-test-id="Размеры"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .should('exist');

    cy.get('[data-test-id="categorySelector"]').select('Бревно');
    cy.get('[data-test-id="subCategorySelector"]').select('Оцилиндрованное Бревно');
    cy.get('[data-test-id="materialSelector"]').select('Ель');

    cy.get('[data-test-id="caliber"]').select('280 мм');
    cy.get('[data-test-id="caliber"]').contains('280 мм');

    cy.get('[data-test-id="width"]').should('not.exist');

    cy.get('[data-test-id="length"]').select('6000 мм');
    cy.get('[data-test-id="length"]').contains('6000 мм');

    cy.get('[data-test-id="Размеры"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('exist');
  });

  it('check update product sizes for custom sizes', () => {
    cy.intercept('PUT', '**/product').as('updateProduct');

    cy.get('[data-test-id="Размеры"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .should('exist');

    cy.get('[data-test-id="categorySelector"]').select('Брус');
    cy.get('[data-test-id="subCategorySelector"]').select('Калиброваннный Брус');
    cy.wait('@updateProduct');
    cy.get('[data-test-id="materialSelector"]').select('Сосна');
    cy.wait('@updateProduct');

    cy.get('[data-test-id="height"]').select('Другой размер');
    cy.get('[data-test-id="heightCustomSize"]').should('be.visible');
    cy.wait('@updateProduct');
    cy.get('[data-test-id="heightCustomSize"]').type('135');
    cy.get('[data-test-id="heightCustomSize"]').should('have.value', 135);
    cy.wait('@updateProduct');

    cy.get('[data-test-id="width"]').select('Другой размер');
    cy.get('[data-test-id="widthCustomSize"]').should('be.visible');
    cy.wait('@updateProduct');
    cy.get('[data-test-id="widthCustomSize"]').type('500');
    cy.get('[data-test-id="widthCustomSize"]').should('have.value', 500);
    cy.wait('@updateProduct');

    cy.get('[data-test-id="length"]').select('Другой размер');
    cy.get('[data-test-id="lengthCustomSize"]').should('be.visible');
    cy.wait('@updateProduct');
    cy.get('[data-test-id="lengthCustomSize"]').type('3500');
    cy.get('[data-test-id="lengthCustomSize"]').should('have.value', 3500);
    cy.wait('@updateProduct');
  });

  it('check update product SortAndSepticSection', () => {
    cy.intercept('PUT', '**/product').as('updateProduct');

    cy.get('[data-test-id="Доп. характеристики"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .should('exist');

    cy.get('[data-test-id="categorySelector"]').select('Брус');
    cy.get('[data-test-id="subCategorySelector"]').select('Калиброваннный Брус');
    cy.get('[data-test-id="materialSelector"]').select('Сосна');
    cy.get('[data-test-id="height"]').select('100 мм');
    cy.get('[data-test-id="width"]').select('180 мм');
    cy.get('[data-test-id="length"]').select('4000 мм');

    cy.get('[data-test-id="Сорт"]').select('2-й и 3-й сорт');
    cy.get('[data-test-id="Сорт"]').contains('2-й и 3-й сорт');

    cy.get('[data-test-id="Влажность"]').select('Камерная сушка');
    cy.get('[data-test-id="Влажность"]').contains('Камерная сушка');

    cy.get('[data-test-id="Обработка антисептиком"]').select('Септирован');
    cy.get('[data-test-id="Обработка антисептиком"]').contains('Септирован');
    cy.wait('@updateProduct');

    cy.get('[data-test-id="Доп. характеристики"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('exist');
  });
});
