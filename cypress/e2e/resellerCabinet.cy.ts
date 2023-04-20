describe('test registration existed user as Manufacturer or Reseller', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  const { email, password } = { email: 'res@email.com', password: 'secret' };

  it('manufacturer status selector', () => {
    cy.login({ email, password });
    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Кабинет').click();

    cy.get('div[class^="CheckBoxSquare_container"]').should('have.length', 5);
    cy.get('[data-test-id="all"]').children('div[class^="CheckBoxSquare_checkedBox"]');
    cy.get('[data-test-id="normal"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="attention"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="noPublication"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="blocked"]').children('div[class^="CheckBoxSquare_box"]');

    cy.get('[data-test-id="normal"]').click();
    cy.get('[data-test-id="all"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="normal"]').children('div[class^="CheckBoxSquare_checkedBox"]');
    cy.get('[data-test-id="attention"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="noPublication"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="blocked"]').children('div[class^="CheckBoxSquare_box"]');

    cy.get('[data-test-id="attention"]').click();
    cy.get('[data-test-id="all"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="normal"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="attention"]').children('div[class^="CheckBoxSquare_checkedBox"]');
    cy.get('[data-test-id="noPublication"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="blocked"]').children('div[class^="CheckBoxSquare_box"]');

    cy.get('[data-test-id="noPublication"]').click();
    cy.get('[data-test-id="all"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="normal"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="attention"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="noPublication"]').children('div[class^="CheckBoxSquare_checkedBox"]');
    cy.get('[data-test-id="blocked"]').children('div[class^="CheckBoxSquare_box"]');

    cy.get('[data-test-id="blocked"]').click();
    cy.get('[data-test-id="all"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="normal"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="attention"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="noPublication"]').children('div[class^="CheckBoxSquare_box"]');
    cy.get('[data-test-id="blocked"]').children('div[class^="CheckBoxSquare_checkedBox"]');
  });

  it('reseller select different manufacturers statuses', () => {
    cy.login({ email, password });
    cy.fixture('../fixtures/resellerManufacturersList.json')
      .its('data')
      .then((list) => {
        cy.log(list);
        cy.intercept('GET', '**/reseller-manufacturers-list', list).as('resellerManufacturersList');
      });

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Кабинет').click();

    cy.wait('@resellerManufacturersList');
    cy.get('div[class^="CheckBoxSquare_container"]').should('have.length', 5);
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 6);

    cy.get('div[class^="ResellerManufacturerListItem_container"]').should((items) => {
      expect(items[0]).to.contain.text('ООО Лесопилка');
      expect(items[0]).to.contain.text('149');
      expect(items[0]).to.contain.text('В порядке');
    });
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should((items) => {
      expect(items[2]).to.contain.text('ООО Рога и Копыта');
      expect(items[2]).to.contain.text('6');
      expect(items[2]).to.contain.text('Внимание');
    });
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should((items) => {
      expect(items[4]).to.contain.text('ООО ПилимПерепилим');
      expect(items[4]).to.contain.text('-');
      expect(items[4]).to.contain.text('Без публикаций');
    });
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should((items) => {
      expect(items[5]).to.contain.text('OAO СпилимВсе');
      expect(items[5]).to.contain.text('499');
      expect(items[5]).to.contain.text('Заблокирован');
    });

    cy.get('[data-test-id="normal"]').click();
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 3);
    cy.get('div[class^="ResellerManufacturerListItem_container"]').eq(0).contains('В порядке');

    cy.get('[data-test-id="attention"]').click();
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 1);
    cy.get('div[class^="ResellerManufacturerListItem_container"]').eq(0).contains('Внимание');

    cy.get('[data-test-id="noPublication"]').click();
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 1);
    cy.get('div[class^="ResellerManufacturerListItem_container"]').eq(0).contains('Без публикаций');

    cy.get('[data-test-id="blocked"]').click();
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 1);
    cy.get('div[class^="ResellerManufacturerListItem_container"]').eq(0).contains('Заблокирован');
  });

  it('reseller make actions for manufacturer', () => {
    cy.login({ email, password });
    cy.fixture('../fixtures/resellerManufacturersList.json')
      .its('data')
      .then((list) => {
        cy.log(list);
        cy.intercept('GET', '**/reseller-manufacturers-list', list).as('resellerManufacturersList');
      });

    cy.get('button[class^="MenuButton_container"]').click();
    cy.get('button[class^="MenuContent_menuButton"]').contains('Кабинет').click();

    cy.wait('@resellerManufacturersList');
    cy.get('img[class^="UnsubscribeManufacturerBtn_ico"]').eq(3).click();
    cy.get('div[class^="PortalPopUp_content"]').contains('открпеление производителя').should('be.visible');

    cy.fixture('../fixtures/resellerManufacturersListShort.json')
      .its('data')
      .then((list) => {
        cy.log(list);
        cy.intercept('POST', '**/unregister-reseller-manufacturer', list).as('resellerManufacturersListShort');
      });

    cy.get('div[class^="PortalPopUp_content"]').contains('Открепить').click();

    cy.wait('@resellerManufacturersListShort');
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');
    cy.get('div[class^="ResellerManufacturerListItem_container"]').should('have.length', 5);

    cy.get('img[class^="ViewManufacturerBtn_ico"]').eq(0).click();
    cy.get('div[class^="PortalPopUp_content"]').contains('Данные организации поставщика').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('ООО Лесопилка').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('231233332345').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('alexeyk500777@yandex.ru').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('+79818842701').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('996159').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('Санкт-Петербург').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('г.Гатчина').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('Шуваловский проспект').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('41').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('750').should('be.visible');
    cy.get('div[class^="PortalPopUp_content"]').contains('Понятно').click();
    cy.get('div[class^="PortalPopUp_content"]').should('not.exist');
  });
});
