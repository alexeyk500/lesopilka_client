describe('test sorting products by Price', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/product/products/*').as('getProducts');

    cy.visit('/');
    cy.wait('@getProducts');

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
    cy.wait('@getProducts');
  });

  it('default value for sorting products', () => {
    cy.url().should('contain', 'sd=pa');
    cy.get('select[class^="SelectSortDirection_select"]').should('have.value', 'PriceASC');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(0).contains('550.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(1).contains('750.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(2).contains('1 005.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(3).contains('2 000.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(4).contains('2 500.00');
  });

  it('check selecting SortingSelector', () => {
    cy.get('select[class^="SelectSortDirection_select"]').select('Цена по убыванию');
    cy.get('select[class^="SelectSortDirection_select"]').should('have.value', 'PriceDESC');
    cy.url().should('contain', 'sd=pd');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('select[class^="SelectSortDirection_select"]').select('Цена по возрастанию');
    cy.get('select[class^="SelectSortDirection_select"]').should('have.value', 'PriceASC');
    cy.url().should('contain', 'sd=pa');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('check direction of Sorting', () => {
    cy.get('select[class^="SelectSortDirection_select"]').select('Цена по убыванию');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(0).contains('2 500.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(1).contains('2 000.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(2).contains('1 005.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(3).contains('750.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(4).contains('550.00');

    cy.get('select[class^="SelectSortDirection_select"]').select('Цена по возрастанию');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(0).contains('550.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(1).contains('750.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(2).contains('1 005.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(3).contains('2 000.00');
    cy.get('div[class^="ProductList_scrollContainer"]').children().eq(4).contains('2 500.00');
  });
});
