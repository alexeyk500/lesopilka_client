describe(
  '1 - test-user@email.com put 3 products to Order and send Order to testManufacturer' +
    '2 - test-sev-manufacturer@email.com cancel Order',
  () => {
    it('test-user@email.com put 3 products to Order and send Order to testManufacturer', () => {
      const { userEmail, userPassword } = { userEmail: 'test-user@email.com', userPassword: 'secret' };
      cy.deleteTestUserOrdersAll({ email: userEmail });

      cy.visit('/');
      cy.login({ email: userEmail, password: userPassword });
      cy.get('div[class^="LoginButton_container"]').contains('test-user').should('be.visible');

      cy.get('button[class^="MenuButton_container"]').click();
      cy.get('button[class^="MenuContent_menuButton"]').contains('Заказы').click();
      cy.get('div[class^="UserOrdersList_emptyList"]')
        .contains('список заказов со статусом "Активные" пуст ...')
        .should('be.visible');

      cy.get('button[class^="MenuButton_container"]').click();
      cy.get('button[class^="MenuContent_menuButton"]').contains('Каталог').click();

      cy.get('div[class^="SearchLocationSelector_row"]').click();
      cy.get('[data-test-id="searchRegionSelector"]').select('Крым');
      cy.get('div[class^="ProductList_scrollContainer"]').click();
      cy.get('img[class^="ProductCardLayout_cartIco"]').eq(1).click();
      cy.get('img[class^="ProductCardLayout_cartIco"]').eq(3).click();
      cy.get('img[class^="ProductCardLayout_cartIco"]').eq(4).click();
      cy.get('button[class^="BasketButton_container"]').click();

      cy.get('div[class^="OrderProductsList_priceContentContainer"]')
        .children('div[class^="OrderToManufacturerItem_container"]')
        .should('have.length', 3);

      cy.get('button[class^="ButtonComponent_container"]').contains('Оформить').eq(0).click();
      cy.get('div[class^="CheckIndicator_title"]').contains('Дата доставки').should('be.visible');

      cy.get('input[class^="ContactPersonSection_customPhoneInput"]').type('+79818842701');
      cy.get('input[class^="ContactPersonSection_customNameInput"]').type('Иван Иванов');

      cy.get('button[class^="ButtonComponent_container"]').contains('Отправить').click();
      cy.get('button[class^="ButtonComponent_container"]').contains('Отмена').click();

      cy.get('button[class^="ButtonComponent_container"]').contains('Отправить').click();
      cy.get('div[class^="PortalPopUp_btnGroups"]').children().eq(0).contains('Отправить').click();

      cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
      cy.get('div[class^="BasketList_emptyBasket"]').contains('В вашей корзине пусто').should('be.visible');

      cy.get('button[class^="MenuButton_container"]').click();
      cy.get('button[class^="MenuContent_menuButton"]').contains('Заказы').click();

      cy.get('div[class^="UserOrdersList_scrollContainer"]').children().should('have.length', 1);
      cy.get('div[class^="OrderStatus_title"]').contains('На подтверждении').should('be.visible');

      cy.logout();
    });

    it('test-sev-manufacturer@email.com cancel Order', () => {
      const { manufacturerEmail, manufacturerPassword } = {
        manufacturerEmail: 'test-sev-manufacturer@email.com',
        manufacturerPassword: 'secret',
      };

      cy.visit('/');
      cy.login({ email: manufacturerEmail, password: manufacturerPassword, isManufacturer: true });
      cy.get('div[class^="LoginButton_container"]').contains('sev-manufacturer').should('be.visible');

      cy.get('button[class^="MenuButton_container"]').click();
      cy.get('button[class^="MenuContent_menuButton"]').contains('Заказы мне').click();
      cy.get('div[class^="ManOrdersList_scrollContainer"]').children().should('have.length', 1);
      cy.get('div[class^="OrderStatus_title"]').contains('На подтверждении').should('be.visible');
      cy.get('div[class^="OrderStatus_title"]').contains('На подтверждении').click();
      cy.get('button[class^="ButtonComponent_container"]').contains('Отказаться').click();
      cy.get('div[class^="PortalPopUp_btnGroups"]').children().eq(0).contains('Отказаться').click();
      cy.get('div[class^="OrderStatus_title"]').contains('Отказ поставщика').should('be.visible');
      cy.get('div[class^="OrderMessagesListItem_messageContainer"]')
        .contains('Поставщик отказался поставлять заказ')
        .should('be.visible');
      cy.get('button[class^="MenuButton_container"]').click();
      cy.get('button[class^="MenuContent_menuButton"]').contains('Заказы мне').click();
      cy.get('div[class^="ManOrdersList_scrollContainer"]').children().should('have.length', 1);
      cy.get('div[class^="OrderStatus_title"]').contains('Отказ поставщика').should('be.visible');
      cy.deleteTestManufacturerOrdersAll({ email: manufacturerEmail });
      cy.logout();
    });
  }
);
