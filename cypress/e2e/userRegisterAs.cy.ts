describe('test registration existed user as Manufacturer or Reseller', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const testUserEmail = 'test-user@email.com';
  const userName = testUserEmail.split('@')[0];

  it('user try register as manufacturer', () => {
    cy.login({ email: testUserEmail, password: 'secret' });
    cy.get('button[class^="MenuButton_container"]').click();

    cy.get('button[class^="MenuContent_menuButton"]').contains('Личный кабинет').click();
    cy.get('button[data-test-id="registerAsManufacturer"]').click();
    cy.get('div[class^="RulesInformForm_titleBold"]').contains('поставщик').should('be.visible');
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
    cy.get('div[class^="LoginButton_container"]').contains(userName);

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Лицензии').click();
    cy.get('span[class^="LicensesMonitor_amount"]').contains('500');

    cy.deleteTestUserManufacturerAddress({ email: testUserEmail });
    cy.deleteTestUserManufacturer({ email: testUserEmail });
  });
});
