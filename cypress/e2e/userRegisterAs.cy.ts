describe('test registration existed user as Manufacturer or Reseller', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const { email, password } = { email: 'test-user@email.com', password: 'secret' };

  it('user try register as manufacturer', () => {
    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[data-test-id="registerAsManufacturer"]').click();
    cy.get('div[class^="ManufacturerRulesInformForm_titleBold"]').contains('поставщик').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="RulesInformForm_titleBold"]').should('not.exist');

    cy.get('input[name="t1tl6"]').type('ООО Распилим Все');
    cy.get('input[name="inn"]').type('111222333444');
    cy.get('input[name="ema1l"]').type('raspilim.vse@email.com');
    cy.get('input[name="ph0n6"]').type('+79818842777');
    cy.get('input[name="p0st1nd6x"]').type('196158');
    cy.get('select[data-test-id="selectorRegion"]').select('Санкт-Петербург');
    cy.get('select[data-test-id="selectorLocation"]').select('г.Петродворец');
    cy.get('input[name="str66t"]').type('ул. Богданова');
    cy.get('input[name="bu1ld1ng"]').type('18-А');
    cy.get('input[name="off1c6"]').type('96');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();

    cy.get('div[class^="SuccessRegistrationManufacturerForm_mainPart"]').contains('Успешная активация');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="SuccessActivateUserForm_container"]').should('not.exist');
    cy.get('div[class^="LoginButton_container"]').contains(email.split('@')[0]);

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Лицензии').click();
    cy.get('span[class^="LicensesMonitor_amount"]').contains('500');

    cy.deleteTestUserManufacturerAddress({ email });
    cy.deleteTestUserManufacturerPickUpAddress({ email });
    cy.deleteTestUserManufacturer({ email });
  });

  it('user try register as reseller', () => {
    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[data-test-id="registerAsReseller"]').click();
    cy.get('div[class^="ResellerInformForm_titleBold"]').contains('реселлер').should('be.visible');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="RulesInformForm_titleBold"]').should('not.exist');

    cy.get('input[name="fam1ly"]').type('Иванов');
    cy.get('input[name="nam6"]').type('Алексей');
    cy.get('input[name="m11dl6nam6"]').type('Сергеевич');
    cy.get('input[name="ph0n6"]').type('+79818842777');
    cy.get('select[data-test-id="selectorRegion"]').select('Санкт-Петербург');
    cy.get('select[data-test-id="selectorLocation"]').select('г.Петродворец');
    cy.get('button[class^="ButtonComponent_container"]').contains('Регистрация').click();

    cy.get('div[class^="SuccessRegistrationResellerForm_mainPart"]').contains('Успешная активация');
    cy.get('button[class^="ButtonComponent_container"]').contains('Понятно').click();
    cy.get('div[class^="SuccessActivateUserForm_container"]').should('not.exist');
    cy.get('div[class^="LoginButton_container"]').contains(email.split('@')[0]);

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Кабинет').click();
    cy.get('div[class^="IconButton_title"]').contains('Новый поставщик');

    cy.deleteTestUserResellerAddress({ email });
    cy.deleteTestUserReseller({ email });
  });
});
