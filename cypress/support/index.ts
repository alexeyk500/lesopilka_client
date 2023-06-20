export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login({
        email,
        password,
        isManufacturer,
      }: {
        email: string;
        password: string;
        isManufacturer?: boolean;
      }): Chainable<void>;
      logout(): Chainable<void>;
      goToRegisterForm(): Chainable<void>;
      createTestProduct(): Chainable<void>;
      deleteTestUser({ email, isUnconfirmed }: { email: string; isUnconfirmed?: boolean });
      deleteTestUserAddress({ email }: { email: string });
      deleteTestUserBasket({ email }: { email: string });
      deleteTestUserSearchRegionAndLocation({ email }: { email: string });
      deleteTestUserManufacturer({ email }: { email: string });
      deleteTestUserManufacturerAddress({ email }: { email: string });
      deleteTestUserManufacturerPickUpAddress({ email }: { email: string });
      deleteTestUserReseller({ email }: { email: string });
      deleteTestUserResellerAddress({ email }: { email: string });
      deleteTestUserManufacturerProductsAll({ email }: { email: string });
      deleteTestUserOrdersAll({ email }: { email: string });
      deleteTestManufacturerOrdersAll({ email }: { email: string });
    }
  }
}
