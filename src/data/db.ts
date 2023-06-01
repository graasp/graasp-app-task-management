import type { Database, LocalContext } from '@graasp/apps-query-client';
import {
  Context,
  Item,
  Member,
  MemberType,
  PermissionLevel,
} from '@graasp/sdk';

import { REACT_APP_API_HOST } from '../config/env';

export const mockMembers: Member[] = [
  {
    id: 'mock-member-id',
    name: 'current-member',
    email: 'current@graasp.org',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: 'other-member@graasp.org',
    extra: {},
    type: MemberType.Individual,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockItem = {
  id: '1234-1234-123456-8123-123456',
} as Item;

export const mockContext: Partial<LocalContext> = {
  apiHost: REACT_APP_API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.Builder,
  memberId: mockMembers[0].id,
  itemId: mockItem.id,
};

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Partial<Database> => ({
  items: [mockItem],
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
});

export default buildDatabase;
