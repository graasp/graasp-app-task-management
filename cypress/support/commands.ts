/// <reference types="../../src/window" />
import { MOCK_SERVER_API_HOST } from '../fixtures/appData';
import { CURRENT_MEMBER, MEMBERS } from '../fixtures/members';
import { MOCK_SERVER_ITEM } from '../fixtures/mockItem';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  'setUpApi',
  ({ currentMember = CURRENT_MEMBER, database, appContext } = {}) => {
    // mock api and database
    Cypress.on('window:before:load', (win: Window) => {
      // eslint-disable-next-line no-param-reassign
      win.database = {
        appData: [],
        appActions: [],
        appSettings: [],
        members: Object.values(MEMBERS),
        ...database,
      };
      // eslint-disable-next-line no-param-reassign
      win.appContext = {
        memberId: currentMember.id,
        itemId: MOCK_SERVER_ITEM.id,
        apiHost: Cypress.env('REACT_APP_API_HOST') || MOCK_SERVER_API_HOST,
        ...appContext,
      };
    });
  },
);
