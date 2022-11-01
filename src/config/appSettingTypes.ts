import { AppSetting } from '@graasp/apps-query-client';

enum APP_SETTINGS_TYPES {
  FILTERED_MEMBERS = 'filtered-members',
}

export type FilteredMembersSettingType = AppSetting & {
  data: {
    filteredMembers: Array<string>;
  };
};

export { APP_SETTINGS_TYPES };
