/// <reference types="cypress" />
import { Database, LocalContext } from '@graasp/apps-query-client';
import { Member } from '@graasp/sdk';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to setup the mock API.
       * @example cy.setUpApi({database: {appData: ..., appSettings: ...}, currentMember: ..., appContext: ...})
       */
      setUpApi({
        database,
        currentMember,
        appContext,
      }: {
        database?: Partial<Database>;
        currentMember?: Member;
        appContext?: Partial<LocalContext>;
      }): Chainable<Element>;
    }
  }
}

export {};
