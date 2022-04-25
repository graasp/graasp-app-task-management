import { REACT_APP_MOCK_API } from './env';

export const APP_NAME = 'Graasp';

export const ENV = {
  DEVELOPMENT: 'development',
};
export const GRAASP_APP_ID = process.env.REACT_APP_GRAASP_APP_ID;

export const NODE_ENV =
  process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || ENV.DEVELOPMENT;

export const DESCRIPTION_MAX_LENGTH = 30;

export const DEFAULT_IMAGE_SRC =
  'https://pbs.twimg.com/profile_images/1300707321262346240/IsQAyu7q_400x400.jpg';

export const ROOT_ID = 'root-id';

export const CONTAINER_HEIGHT = 450;

export const DRAWER_WIDTH = 300;
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_LANG = 'en';
export const DEFAULT_SHOW_USER_SHARE_SETTING = true;

export const HEADER_HEIGHT = 64;
export const FILE_UPLOAD_MAX_FILES = 5;

export const DEFAULT_PERMISSION = 'read';

export const MOCK_API = REACT_APP_MOCK_API === 'true';

// todo: use from graasp constants
export const PERMISSION_LEVELS = {
  WRITE: 'write',
  READ: 'read',
  ADMIN: 'admin',
};

export const APP_DATA_TYPES = {
  FILE: 'file',
};
// strings used in components/custom/CustomTooltip to generate added tooltip text in ActionsByTimeOfDay
export const LATE_NIGHT = 'Late night';
export const EARLY_MORNING = 'Early morning';
export const MORNING = 'Morning';
export const AFTERNOON = 'Afternoon';
export const EVENING = 'Evening';
export const NIGHT = 'Night';
