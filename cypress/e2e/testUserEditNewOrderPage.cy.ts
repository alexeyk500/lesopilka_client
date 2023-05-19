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
    cy.get('div[class^="CheckIndicator_title"]').contains('Способ доставки').should('be.visible');

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

  it('fill delivery method data for new order', () => {
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
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Самовывоз');

    cy.get('[data-test-id="Доставка"]').click();
    cy.get('[data-test-id="Доставка"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Самовывоз"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Доставка');


    cy.get('div[class^="PlaceSelector_container"]').should('be.visible');
    cy.get('div[class^="DeliverySection_contentContainer"]').should('be.visible');
    cy.get('input[class^="DeliverySection_customSizeInput"]').should('have.value', '');
    cy.get('[data-test-id="Способ доставки"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('not.exist');

    cy.intercept('GET', '**/address/locations/*').as('getLocations');
    cy.get('div[class^="PlaceSelector_row"]').click();
    cy.get('[data-test-id="placeSelectorRegionSelector"]').select('Крым');
    cy.wait('@getLocations');
    cy.get('[data-test-id="placeSelectorRegionSelector"]').should('have.value', 3);
    cy.get('select').find('option').contains('Крым');

    cy.get('[data-test-id="placeSelectorLocationSelector"]').should('have.value', 0);
    cy.get('[data-test-id="placeSelectorLocationSelector"]').find('option').contains('Выберите населенный пункт');
    cy.get('[data-test-id="placeSelectorLocationSelector"]').select('г.Севастополь');
    cy.get('div[class^="PlaceSelector_title"]').contains('г.Севастополь');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('г.Севастополь');
    cy.get('input[class^="DeliverySection_customSizeInput"]').type('Богданова д.18');
    cy.get('input[class^="DeliverySection_customSizeInput"]').should('have.value', 'Богданова д.18');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Богданова д.18');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();

    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('fill contact person info', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Способ оплаты').should('be.visible');
    cy.get('[data-test-id="Контактное лицо"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .children()
      .should('have.length', 0);

    cy.get('input[class^="ContactPersonSection_customPhoneInput"]').type('+79811893245');
    cy.get('input[class^="ContactPersonSection_customPhoneInput"]').should('have.value', '+79811893245');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('+79811893245');
    cy.get('[data-test-id="Контактное лицо"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_round"]')
      .children()
      .should('have.length', 0);

    cy.get('input[class^="ContactPersonSection_customNameInput"]').type('Иванов Петр Николаевич');
    cy.get('input[class^="ContactPersonSection_customNameInput"]').should('have.value', 'Иванов Петр Николаевич');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Иванов Петр Николаевич');

    cy.get('[data-test-id="Контактное лицо"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('select payment method', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Способ оплаты').should('be.visible');

    cy.get('[data-test-id="Банковский перевод"]')
      .invoke('attr', 'class')
      .should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Перевод на карту"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Картой"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Наличными"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Банковский перевод');

    cy.get('[data-test-id="Перевод на карту"]').click();
    cy.get('[data-test-id="Банковский перевод"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Перевод на карту"]')
      .invoke('attr', 'class')
      .should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Картой"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Наличными"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Перевод на карту');

    cy.get('[data-test-id="Картой"]').click();
    cy.get('[data-test-id="Банковский перевод"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Перевод на карту"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Картой"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Наличными"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Картой');

    cy.get('[data-test-id="Наличными"]').click();
    cy.get('[data-test-id="Банковский перевод"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Перевод на карту"]')
      .invoke('attr', 'class')
      .should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Картой"]').invoke('attr', 'class').should('not.contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('[data-test-id="Наличными"]').invoke('attr', 'class').should('contain', 'CheckBoxBlueSquare_checkedBox');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('Наличными');

    cy.get('[data-test-id="Способ оплаты"]')
      .children('div[class^="CheckIndicator_topLine"]')
      .children('div[class^="CheckIndicator_checkedRound"]')
      .should('be.visible');

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('show order products list', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(1).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Заказ поставщику').should('be.visible');

    cy.get('div[class^="OrderProductsList_priceContentContainer"]').children().should('have.length',3);

    cy.get('button[class^="ButtonComponent_container"]').contains('В корзину').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
    cy.get('[data-test-id="deleteFromOrder"]').eq(0).click();
    cy.get('button[class^="ButtonComponent_container"]').contains('Подтвердить').click();
  });

  it('fill all new order sections and send order', () => {
    cy.get('div[class^="SearchLocationSelector_row"]').click();
    cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
    cy.get('div[class^="ProductList_scrollContainer"]').click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(0).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(1).click();
    cy.get('img[class^="ProductCardLayout_cartIco"]').eq(2).click();

    cy.get('button[class^="BasketButton_container"]').click();

    cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
    cy.get('div[class^="CheckIndicator_title"]').contains('Заказ поставщику').should('be.visible');

    cy.get('img[class^="DatePickerComponent_calendarIco"]').click();
    const shiftedDate = dateDayShift(new Date(), 2).toISOString();
    const shiftedFormatDate = formatUTCtoDDMMMMYYYY(shiftedDate);
    const shiftedDay = shiftedFormatDate.split(' ', 1)?.[0];
    cy.get('div[class^="react-datepicker__day"]').contains(shiftedDay).click();

    cy.get('[data-test-id="Доставка"]').click();
    cy.intercept('GET', '**/address/locations/*').as('getLocations');
    cy.get('div[class^="PlaceSelector_row"]').click();
    cy.get('[data-test-id="placeSelectorRegionSelector"]').select('Крым');
    cy.wait('@getLocations');
    cy.get('[data-test-id="placeSelectorLocationSelector"]').select('г.Севастополь');
    cy.get('div[class^="PlaceSelector_title"]').contains('г.Севастополь');
    cy.get('div[class^="OrderInfoSection_infoRow"]').contains('г.Севастополь');
    cy.get('input[class^="DeliverySection_customSizeInput"]').type('Богданова д.18');

    cy.get('input[class^="ContactPersonSection_customPhoneInput"]').type('+79811893245');
    cy.get('input[class^="ContactPersonSection_customNameInput"]').type('Иванов Петр Николаевич');

    cy.get('[data-test-id="Наличными"]').click();

    cy.get('div[class^="OrderProductsList_priceContentContainer"]').children().should('have.length',3);

    cy.get('div[class^="NewOrderPageControl_btnCreateContainer"]').contains('Отправить').click();
    cy.get('div[class^="PortalPopUp_content"]').contains('Отправить заказ поставщику');
    cy.get('button[class^="ButtonComponent_container"]').contains('Отмена').click();
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');

    cy.get('button[class^="ButtonComponent_container"]').contains('Отправить').click();
    cy.get('div[class^="PortalPopUp_content"]').contains('Отправить заказ поставщику');
    cy.intercept('POST', '**/orders/new_order').as('newOrder');
    cy.get('div[class^="PortalPopUp_btnGroups"]')
      .children('button[class^="ButtonComponent_container"]')
      .contains('Отправить')
      .click();

    cy.wait('@newOrder');
    cy.get('div[class^="PortalPopUp_content"]').contains('Заказ создан и отправлен');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.url().should('contain', 'basket-page');

    cy.get('button[class^="OrdersButton_container"]').click();
    cy.get('div[class^="UserOrdersList_scrollContainer"]').children().should('have.length', 1);

    cy.deleteTestUserOrdersAll({ email });
  });

});
