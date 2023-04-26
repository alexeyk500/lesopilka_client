describe('test for main page with no login user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('render main page with section with catalog and products', () => {
    cy.get('div[class^="LoginButton_container"]').contains('Войти').should('be.visible');

    cy.get('div[class^="Catalog_container"]').should('be.visible');
    cy.get('div[class^="Catalog_container"]').children('div[class^="CatalogItem_container"]').should('have.length', 7);

    cy.get('div[class^="ProductList_scrollContainer"]').should('be.visible');
    cy.get('div[class^="Catalog_container"]').children().its('length').should('be.gte', 3);
  });

  it('test searchRegionAndLocationSelector', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').should('be.visible');
    cy.get('div[class^="SearchLocationSelector_title"]').should('have.value', '');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('div[class^="SearchLocationSelector_expandPart"]').should('be.visible');

    cy.get('[data-test-id="searchRegionSelector"]').select('Санкт-Петербург');
    cy.get('div[class^="Selector_container"]').contains('Санкт-Петербург');
    cy.get('div[class^="UnitedPageMainPart_container"]').click();
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Санкт-Петербург');
    cy.get('button[class^="ButtonComponent_container"]')
      .contains('Санкт-Петербург')
      .children('div[class^="ButtonComponent_closeFilter"]')
      .click();
    cy.get('div[class^="FiltersRow_container"]').should('not.exist');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Санкт-Петербург');
    cy.get('[data-test-id="searchLocationSelector"]').select('г.Гатчина');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('г.Гатчина');
    cy.get('button[class^="ButtonComponent_container"]')
      .contains('г.Гатчина')
      .children('div[class^="ButtonComponent_closeFilter"]')
      .click();
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Санкт-Петербург');
    cy.get('button[class^="ButtonComponent_container"]')
      .contains('Санкт-Петербург')
      .children('div[class^="ButtonComponent_closeFilter"]')
      .click();
    cy.get('div[class^="FiltersRow_container"]').should('not.exist');
  });

  it('test click Header MenuButton', () => {
    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('div[class^="MenuContent_container"]').should('be.visible');
    cy.get('div[class^="MenuContent_container"]')
      .children('div[class^="MenuContent_section"]')
      .should('have.length', 2);
    cy.get('div[class^="MenuContent_section"]').contains('Покупки').should('be.visible');
    cy.get('div[class^="MenuContent_section"]').contains('Справочная').should('be.visible');
    cy.get('div[class^="UnitedPageMainPart_container"]').click();
    cy.get('div[class^="MenuContent_container"]').should('not.exist');
  });

  it('test click Header Logo_container', () => {
    cy.get('div[class^="Logo_container"]').click();
    cy.url().should('be.equal', 'http://localhost:3000/?srid=&slid=');
  });

  it('test click Header CatalogButton', () => {
    cy.get('button[class^="CatalogButton_container"]').click();
    cy.url().should('be.equal', 'http://localhost:3000/?srid=&slid=');
  });

  it('test click Header BasketButton', () => {
    cy.get('button[class^="BasketButton_container"]').click();
    cy.get('div[class^="LoginForm_title"]').contains('введите адрес электронной почты и пароль');
    cy.get('button[class^="PortalPopUp_topCloseBtn__hQtSd"]').click();
  });

  it('test click Header OrdersButton', () => {
    cy.get('button[class^="OrdersButton_container"]').click();
    cy.get('div[class^="LoginForm_title"]').contains('введите адрес электронной почты и пароль');
    cy.get('button[class^="PortalPopUp_topCloseBtn__hQtSd"]').click();
  });

  it('test click Header FavoriteButton', () => {
    cy.get('button[class^="FavoriteButton_container"]').click();
    cy.get('div[class^="LoginForm_title"]').contains('введите адрес электронной почты и пароль');
    cy.get('button[class^="PortalPopUp_topCloseBtn__hQtSd"]').click();
  });

  it('test click CatalogItem', () => {
    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'cid=1');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Брус').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Брус').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Доска').click();
    cy.url().should('contain', 'cid=2');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Доска').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Доска').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Вагонка').click();
    cy.url().should('contain', 'cid=3');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Вагонка').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Вагонка').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Погонаж').click();
    cy.url().should('contain', 'cid=4');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Погонаж').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Погонаж').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Блокxаус и Лендxаус').click();
    cy.url().should('contain', 'cid=5');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Блокxаус и Лендxаус').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Блокxаус и Лендxаус').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Бревно').click();
    cy.url().should('contain', 'cid=6');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Бревно').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('not.be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Бревно').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Опилки и Пеллеты').click();
    cy.url().should('contain', 'cid=7');
    cy.get('div[class^="FiltersRow_container"]').should('be.visible');
    cy.get('div[class^="FilterSelector_expandPart"]').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Опилки и Пеллеты').should('be.visible');
    cy.get('div[class^="LeftColumn_title"]').contains('Фильтры поиска').should('be.visible');
    cy.get('[data-test-id="Раздел каталога-Брус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Доска"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Вагонка"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Погонаж"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Блокxаус и Лендxаус"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Бревно"]').should('not.be.checked');
    cy.get('[data-test-id="Раздел каталога-Опилки и Пеллеты"]').should('be.checked');
    cy.get('button[class^="ButtonComponent_container"]').contains('Раздел: Опилки и Пеллеты').click();
  });
});
