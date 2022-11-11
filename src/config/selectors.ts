export const MAIN_CONTAINER_CY = 'main_container';
export const MEMBERS_LIST_CARD_CY = 'members_list_card';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;

export const buildTextFieldSelectorCy = (selector: string): string =>
  `${buildDataCy(selector)} input`;
