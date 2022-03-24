import { v4 } from 'uuid';

const buildDatabase = (appContext) => ({
  appData: [],
  members: [
    // {
    //   id: appContext.memberId,
    //   name: 'mock-member',
    // },
    {
      id: v4(),
      name: 'Alex',
    },
    {
      id: v4(),
      name: 'Dana',
    },
    {
      id: v4(),
      name: 'Mira',
    },
    {
      id: v4(),
      name: 'Joe',
    },
    {
      id: v4(),
      name: 'Lynn',
    },
    {
      id: v4(),
      name: 'John',
    },
    {
      id: v4(),
      name: 'Mandy',
    },
    {
      id: v4(),
      name: 'Clara',
    },
    {
      id: v4(),
      name: 'Bob',
    },
  ],
});
export const mockContext = { permission: 'write', context: 'builder' };

export default buildDatabase;
