export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login({ email, password }: { email: string; password: string }): Chainable<void>;
      logout(): Chainable<void>;
      goToRegisterForm(): Chainable<void>;
      deleteTestUser({ email, isUnconfirmed }: { email: string; isUnconfirmed?: boolean });
      deleteTestUserAddress({ email }: { email: string });
      deleteTestUserBasket({ email }: { email: string });
      deleteTestUserSearchRegionAndLocation({ email }: { email: string });
      deleteTestUserManufacturer({ email }: { email: string });
      deleteTestUserManufacturerAddress({ email }: { email: string });
    }
  }
}
