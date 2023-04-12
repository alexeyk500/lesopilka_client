export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login({ email, password }: { email: string; password: string }): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}
