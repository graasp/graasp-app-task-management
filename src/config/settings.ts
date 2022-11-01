import { Context, PermissionLevel } from '@graasp/sdk';

export const DEFAULT_LANG = 'en';

export const DEFAULT_API_HOST = 'localhost:3000';

export const DEFAULT_PERMISSION = PermissionLevel.Read;

export const DEFAULT_LOCAL_CONTEXT = {
  permission: PermissionLevel.Read,
  lang: DEFAULT_LANG,
  context: Context.PLAYER,
  apiHost: DEFAULT_API_HOST,
};
