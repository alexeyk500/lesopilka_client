import { dateDayShift, formatUTCtoDDMMMMYYYY } from '../../src/utils/dateTimeFunctions';

describe('test user edit newOrder Page', () => {
  const { email, password } = { email: 'test-user@email.com', password: 'secret' };

  beforeEach(() => {
    cy.visit('/');
    cy.login({ email, password });
    cy.get('div[class^="LoginButton_container"]').contains('test-user').should('be.visible');
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
    cy.get('input[class^="AmountInput_input"]').eq(1).type('30');
    cy.get('input[class^="AmountInput_input"]').eq(1).should('have.value', 30);

    cy.get('input[class^="AmountInput_input"]').eq(2).clear();
    cy.get('input[class^="AmountInput_input"]').eq(2).type('45');
    cy.get('input[class^="AmountInput_input"]').eq(2).should('have.value', 45);

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('change date for new order', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Дата доставки').should('be.visible');
    const newOrderDate = dateDayShift(new Date(), 1).toISOString();
    const newOrderFormatDate = formatUTCtoDDMMMMYYYY(newOrderDate).slice(0, -3);
    cy.get('div[class^="react-datepicker"]').children('input').should('have.value', newOrderFormatDate);
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains(newOrderFormatDate);

    cy.get('[data-test-id="Дата доставки"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');

    cy.get('img[class^="DatePickerComponent_calendarIco"]').click();
    const shiftedDate = dateDayShift(new Date(), 2).toISOString();
    const shiftedFormatDate = formatUTCtoDDMMMMYYYY(shiftedDate);
    const shiftedDay = shiftedFormatDate.split(' ', 1)?.[0];

    cy.get('div[class^="react-datepicker__day"]').contains(shiftedDay).click();
    const newDate = shiftedFormatDate.slice(0, -3);
    cy.get('div[class^="react-datepicker"]').children('input').should('have.value', newDate);
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains(shiftedFormatDate);

    cy.get('[data-test-id="Дата доставки"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('change delivery method for new order', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Дата доставки').should('be.visible');

    cy.get('[data-test-id="Способ доставки"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');
    cy.get('[data-test-id="Самовывоз"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');

    cy.get('[data-test-id="Доставка"]').click();
    cy.get('[data-test-id="Доставка"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Самовывоз"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');

    cy.get('[data-test-id="Самовывоз"]').click();
    cy.get('[data-test-id="Самовывоз"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Доставка"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');

    cy.get('[data-test-id="Способ доставки"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });
});
