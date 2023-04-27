describe('test for main page with no login user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // it('test filter by Regions and Locations', () => {
  //   cy.intercept('GET', '**/product/products/*').as('getProducts');
  //
  //   cy.get('div[class^="SearchLocationSelector_row"]').click();
  //   cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
  //   cy.url().should('contain', 'srid=3');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('[data-test-id="searchLocationSelector"]').select('г.Севастополь');
  //   cy.url().should('contain', 'srid=3').and('contain', 'slid=4');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('г.Севастополь');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  //
  //   cy.get('div[class^="SearchLocationSelector_row"]').click();
  //   cy.get('[data-test-id="searchLocationSelector"]').select('г.Симферополь');
  //   cy.url().should('contain', 'srid=3').and('contain', 'slid=5');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('г.Симферополь');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  // });

  // it('test filter by CatalogCategory', () => {
  //   cy.intercept('GET', '**/product/products/*').as('getProducts');
  //
  //   cy.get('div[class^="SearchLocationSelector_row"]').click();
  //   cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
  //   cy.url().should('contain', 'srid=3');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //   cy.get('div[class^="ProductList_scrollContainer"]').click();
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Брус').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Доска').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=2');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Доска').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Вагонка').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]')
  //     .children('div[class^="ProductList_noProductsContainer"]')
  //     .should('be.visible');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Вагонка').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Погонаж').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=4');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]')
  //     .children('div[class^="ProductList_noProductsContainer"]')
  //     .should('be.visible');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Погонаж').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Блокxаус и Лендxаус').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=5');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]')
  //     .children('div[class^="ProductList_noProductsContainer"]')
  //     .should('be.visible');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Блокxаус и Лендxаус').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Бревно').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=6');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]')
  //     .children('div[class^="ProductList_noProductsContainer"]')
  //     .should('be.visible');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Бревно').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  //
  //   cy.get('div[class^="CatalogItem_container"]').contains('Опилки и Пеллеты').click();
  //   cy.url().should('contain', 'srid=3').and('contain', 'cid=7');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]')
  //     .children('div[class^="ProductList_noProductsContainer"]')
  //     .should('be.visible');
  //   cy.get('button[class^="ButtonComponent_container"]').contains('Опилки и Пеллеты').click();
  //   cy.url().should('contain', 'srid=3');
  //   cy.wait('@getProducts');
  //   cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
  // });

  it('test filter by CatalogSubCategory', () => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.url().should('contain', 'srid=3');
    cy.get('button[class^="ButtonComponent_container"]').contains('Крым');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 10);
    cy.get('div[class^="ProductList_scrollContainer"]').click();

    cy.get('div[class^="CatalogItem_container"]').contains('Брус').click();
    cy.url().should('contain', 'srid=3').and('contain', 'cid=1');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });
});
