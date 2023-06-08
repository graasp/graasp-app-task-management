import { AppSetting } from '@graasp/sdk';
import { ImmutableCast } from '@graasp/sdk/frontend';

enum APP_SETTINGS_TYPES {
  FILTERED_MEMBERS = 'filtered-members',
}

export type FilteredMembersSettingType = AppSetting & {
  data: {
    filteredMembers: string[];
  };
};

export type FilteredMembersSettingTypeRecord =
  ImmutableCast<FilteredMembersSettingType>;

export { APP_SETTINGS_TYPES };
