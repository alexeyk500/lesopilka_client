describe('test for main page with no login user', () => {
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

  it('test filter by Price From', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('500');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('600');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 4);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('1000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 3);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('3000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price To', () => {
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('3000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('1005');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 3);
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('760');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);

    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('300');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price From To var 1', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('500');
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('3000');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price From To var 2', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('550');
    cy.get('button[class^="ButtonComponent_container"]').contains('550').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('2500');
    cy.get('button[class^="ButtonComponent_container"]').contains('2500').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price From To var 3', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('600');
    cy.get('button[class^="ButtonComponent_container"]').contains('600').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('1990');
    cy.get('button[class^="ButtonComponent_container"]').contains('1990').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 2);
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 4);
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price From To var 4', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('550');
    cy.get('button[class^="ButtonComponent_container"]').contains('550').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('550');
    cy.get('button[class^="ButtonComponent_container"]').contains('550').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 1);
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });

  it('test filter by Price From To var 5', () => {
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').type('100');
    cy.get('button[class^="ButtonComponent_container"]').contains('100').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').type('500');
    cy.get('button[class^="ButtonComponent_container"]').contains('500').should('be.visible');
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_noProductsContainer"]').should('be.visible');
    cy.get('div[class^="PriceRange_priceTo"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="PriceRange_priceFrom"]').children('input[class^="PriceRange_inputPrice"]').clear();
    cy.wait('@getProducts');
    cy.get('div[class^="ProductList_scrollContainer"]').children().should('have.length', 5);
  });
});
