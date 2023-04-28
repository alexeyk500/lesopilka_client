describe('test for main page with no login user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('test filter by Regions and Locations', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('[data-test-id="searchLocationSelector"]').select('г.Севастополь');
    cy.url().should('contain', 'srid=3').and('contain', 'slid=4');
    cy.get('button[class^="ButtonComponent_container"]').contains('г.Севастополь');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchLocationSelector"]').select('г.Симферополь');
    cy.url().should('contain', 'srid=3').and('contain', 'slid=5');
    cy.get('button[class^="ButtonComponent_container"]').contains('г.Симферополь');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchLocationSelector"]').select('г.Ялта');
    cy.url().should('contain', 'srid=3').and('contain', 'slid=12');
    cy.get('button[class^="ButtonComponent_container"]').contains('г.Ялта');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 6);
  });

  it('test filter main page by CatalogCategory', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('button[class^="ButtonComponent_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Доска').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('button[class^="ButtonComponent_container"]').contains('Доска').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Вагонка').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]')
      .children('div[class^="ProductList_noProductsContainer"]')
      .should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Вагонка').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Погонаж').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=4');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]')
      .children('div[class^="ProductList_noProductsContainer"]')
      .should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Погонаж').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Блокxаус и Лендxаус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=5');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]')
      .children('div[class^="ProductList_noProductsContainer"]')
      .should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Блокxаус и Лендxаус').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Бревно').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=6');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 6);
    cy.get('button[class^="ButtonComponent_container"]').contains('Бревно').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);

    cy.get('div[class^="CatalogItem_container"]').contains('Опилки и Пеллеты').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=7');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]')
      .children('div[class^="ProductList_noProductsContainer"]')
      .should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Опилки и Пеллеты').click();
    cy.url().should('contain', 'srid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
  });

  it('test filter filter page by CatalogCategory', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Раздел каталога-Доска"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=2');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Раздел каталога-Вагонка"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=3');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');

    cy.get('[data-test-id="Раздел каталога-Погонаж"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=4');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');

    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=5');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');

    cy.get('[data-test-id="Раздел каталога-Бревно"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=6');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 6);

    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=7');
    cy.wait('@getProducts');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('be.checked');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
  });

  it('test filter by CatalogSubCategory', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('[data-test-id="Пиломатериал-Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Пиломатериал-Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Калиброваннный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Пиломатериал-Калиброваннный Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Профилированный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Пиломатериал-Профилированный Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Оцилиндрованный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=4');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Пиломатериал-Оцилиндрованный Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Строганный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=5');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Пиломатериал-Строганный Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Клееный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=6');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Пиломатериал-Клееный Брус"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Пиломатериал-Имитация Бруса"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=7');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Пиломатериал-Имитация Бруса"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Пиломатериал').click();
    cy.get('[data-test-id="Пиломатериал-Имитация Бруса"]').should('not.exist');
  });

  it('test filter by SizeHeight', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Толщина').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Толщина-100 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Толщина-100 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Толщина-120 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=120');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');

    cy.get('[data-test-id="Толщина-150 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=150');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);

    cy.get('[data-test-id="Толщина-180 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=180');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Толщина-180 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Толщина-200 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=200');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Толщина-220 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sh=220');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Толщина-220 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Толщина').click();
    cy.get('[data-test-id="Толщина-220 мм"]').should('not.exist');
  });

  it('test filter by SizeWidth', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Ширина').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Ширина-100 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Ширина-100 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Ширина-120 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=120');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Ширина-120 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Ширина-150 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=150');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Ширина-150 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Ширина-180 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=180');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Ширина-180 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Ширина-200 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=200');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Ширина-200 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Ширина-220 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sw=220');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Ширина-220 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Ширина').click();
    cy.get('[data-test-id="Ширина-220 мм"]').should('not.exist');
  });

  it('test filter by SizeLength', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Длинна').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Длинна-3000 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sl=3000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Длинна-3000 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Длинна-4000 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sl=4000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Длинна-6000 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sl=6000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Длинна-6000 мм"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Длинна').click();
    cy.get('[data-test-id="Длинна-6000 мм"]').should('not.exist');
  });

  it('test filter by SizeSort', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Сорт').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Сорт-Экстра сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Сорт-Экстра сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-1-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);

    cy.get('[data-test-id="Сорт-1-й и 2-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Сорт-1-й и 2-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-2-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=4');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Сорт-2-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-2-й и 3-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=5');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Сорт-2-й и 3-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-3-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=6');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Сорт-3-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-3-й и 4-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=7');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Сорт-3-й и 4-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Сорт-4-й сорт"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'psid=8');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('[data-test-id="Сорт-4-й сорт"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Сорт').click();
    cy.get('[data-test-id="Сорт-4-й сорт"]').should('not.exist');
  });

  it('test filter by Humidity', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Влажность').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Влажность-Естественная влажность"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'dri=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 3);
    cy.get('[data-test-id="Влажность-Естественная влажность"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Влажность-Камерная сушка"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'dri=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('[data-test-id="Влажность-Камерная сушка"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Влажность').click();
    cy.get('[data-test-id="Влажность-Камерная сушка"]').should('not.exist');
  });

  it('test filter by Septic', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('div[class^="FilterSelector_row"]').contains('Антисептик').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Антисептик-Не септирован"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sep=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 4);
    cy.get('[data-test-id="Антисептик-Не септирован"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Антисептик-Септирован"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'sep=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('[data-test-id="Антисептик-Септирован"]').click();
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="FilterSelector_row"]').contains('Антисептик').click();
    cy.get('[data-test-id="Антисептик-Септирован"]').should('not.exist');
  });

  it('test filter by many filters', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');

    cy.get('[data-test-id="Пиломатериал-Профилированный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('contain', 'scid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);

    cy.get('div[class^="FilterSelector_row"]').contains('Толщина').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');
    cy.get('[data-test-id="Толщина-100 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'scid=3').and('contain', 'cid=1').and('contain', 'sh=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('div[class^="FilterSelector_row"]').contains('Влажность').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');
    cy.get('[data-test-id="Влажность-Камерная сушка"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('div[class^="FilterSelector_row"]').contains('Антисептик').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');
    cy.get('[data-test-id="Антисептик-Не септирован"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('div[class^="FilterSelector_row"]').contains('Ширина').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');
    cy.get('[data-test-id="Ширина-100 мм"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('contain', 'sw=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('div[class^="FilterSelector_row"]').contains('Длинна').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Длинна-6000 мм"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('contain', 'sw=100')
      .and('contain', 'sl=6000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('div[class^="FilterSelector_row"]').contains('Сорт').click();
    cy.get('div[class^="FilterSelector_container"]')
      .children('div[class^="FilterSelector_expandPart"]')
      .should('be.visible');

    cy.get('[data-test-id="Сорт-Экстра сорт"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('contain', 'sw=100')
      .and('contain', 'sl=6000')
      .and('contain', 'psid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Сорт-Экстра сорт"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('contain', 'sw=100')
      .and('contain', 'sl=6000')
      .and('not.contain', 'psid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Длинна-6000 мм"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('contain', 'sw=100')
      .and('not.contain', 'sl=6000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Ширина-100 мм"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('contain', 'sep=1')
      .and('not.contain', 'sw=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Антисептик-Не септирован"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('contain', 'dri=2')
      .and('not.contain', 'sep=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Влажность-Камерная сушка"]').click();
    cy.url()
      .should('contain', 'srid=3')
      .and('contain', 'scid=3')
      .and('contain', 'cid=1')
      .and('contain', 'sh=100')
      .and('not.contain', 'dri=2');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);

    cy.get('[data-test-id="Толщина-100 мм"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'scid=3').and('contain', 'cid=1').and('not.contain', 'sh=100');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);

    cy.get('[data-test-id="Пиломатериал-Профилированный Брус"]').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1').and('not.contain', 'scid=3');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('[data-test-id="Раздел каталога-Брус"]').click();
    cy.url().should('contain', 'srid=3').and('not.contain', 'cid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 16);
  });
});
