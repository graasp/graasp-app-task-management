import { v4 } from 'uuid';

import type { Database, LocalContext, Member } from '@graasp/apps-query-client';

import { APP_DATA_TYPES } from '../config/appDataTypes';
import { REACT_APP_API_HOST } from '../config/env';

export const mockContext: LocalContext = {
  apiHost: REACT_APP_API_HOST,
  permission: 'admin',
  context: 'player',
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
  appData: [
    {
      id: v4(),
      data: {
        content: '',
      },
      memberId: mockMembers[1].id,
      type: APP_DATA_TYPES.TASK,
      itemId: appContext.itemId || '',
      creator: mockMembers[1].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: v4(),
      data: {
        content: 'Another AppData',
      },
      memberId: mockMembers[0].id,
      type: APP_DATA_TYPES.TASK,
      itemId: appContext.itemId || '',
      creator: mockMembers[1].id,
      createdAt: new Date(Date.now() - 1500).toISOString(),
      updatedAt: new Date(Date.now() - 1500).toISOString(),
    },
  ],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
});

export default buildDatabase;
