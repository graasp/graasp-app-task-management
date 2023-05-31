import type { Database, LocalContext } from '@graasp/apps-query-client';
import { Context, Member, MemberType, PermissionLevel } from '@graasp/sdk';

import { REACT_APP_API_HOST } from '../config/env';

export const mockContext: Partial<LocalContext> = {
  apiHost: REACT_APP_API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.Builder,
  memberId: 'mock-member-id',
};

export const mockMembers: Member[] = [
  {
    id: mockContext.memberId || '',
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

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Partial<Database> => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
});

export default buildDatabase;
