// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 } from 'uuid';

import type { Database, LocalContext, Member } from '@graasp/apps-query-client';
import { Context, PermissionLevel } from '@graasp/sdk';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APP_DATA_TYPES } from '../config/appDataTypes';
import { REACT_APP_API_HOST } from '../config/env';

export const mockContext: LocalContext = {
  apiHost: REACT_APP_API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.BUILDER,
  itemId: '1234-1234-123456-8123-123456',
  memberId: 'mock-member-id',
};

export const mockMembers: Member[] = [
  {
    id: mockContext.memberId || '',
    name: 'current-member',
    email: 'current@graasp.org',
    extra: {},
  },
  {
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: 'other-member@graasp.org',
    extra: {},
  },
];

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
});

export default buildDatabase;
