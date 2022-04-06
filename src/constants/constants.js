/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500

export const DEFAULT_LIST = {
    todo:{
      title: 'To Do',
      items: [],
    },
    inProgress: {
      title: 'In Progress',
      items: [],
    },
    completed: {
      title: 'Completed',
      items: [],
    },
  };

export const DEFAULT_TASK = {
    title: '',
    description: '',
    members: [],
  };