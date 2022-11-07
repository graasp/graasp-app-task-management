import {
  MAIN_CONTAINER_CY,
  MEMBERS_LIST_CARD_CY,
  buildDataCy,
} from '../../src/config/selectors';

describe('empty spec', () => {
  beforeEach(() => {
    cy.setUpApi({});
    cy.visit('/');
  });
  it('passes', () => {
    // chack that the app loads
    cy.get(buildDataCy(MAIN_CONTAINER_CY)).should('be.visible');

    // check that the app displays the list of members
    cy.get(buildDataCy(MEMBERS_LIST_CARD_CY)).should('be.visible');
  });
});
