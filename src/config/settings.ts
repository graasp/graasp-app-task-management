import { CONTEXTS } from './constants';

export const DEFAULT_LANG = 'en';

export const DEFAULT_API_HOST = 'localhost:3000';

// TODO: use from graasp constants
export enum PERMISSION_LEVELS {
  WRITE = 'write',
  READ = 'read',
  ADMIN = 'admin',
}

export const DEFAULT_PERMISSION = PERMISSION_LEVELS.READ;

export const DEFAULT_LOCAL_CONTEXT = {
  permission: PERMISSION_LEVELS.READ,
  lang: DEFAULT_LANG,
  context: CONTEXTS.PLAYER,
  apiHost: DEFAULT_API_HOST,
};
