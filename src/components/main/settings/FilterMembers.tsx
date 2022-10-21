/* eslint-disable react/prop-types */
import { List } from 'immutable';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppSetting, Member } from '@graasp/apps-query-client';

import { Autocomplete, Checkbox, TextField } from '@mui/material';

import { APP_SETTINGS_TYPES } from '../../../config/appSettingTypes';
import {
  PatchAppSettingType,
  PostAppSettingType,
} from '../../../types/appSettings';

interface FilterMembersProps {
  members: List<Member>;
  settings: List<AppSetting>;
  postAppSetting: (s: PostAppSettingType) => void;
  patchAppSetting: (s: PatchAppSettingType) => void;
}

type FilteredMembersSettingType = AppSetting & {
  data: {
    filteredMembers: Array<string>;
  };
};

const FilterMembers = (fcProps: FilterMembersProps): JSX.Element => {
  const { t } = useTranslation();
  const { members, postAppSetting, patchAppSetting, settings } = fcProps;

  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [settingId, setSettingId] = useState<string>();

  useEffect(() => {
    const filteredMembersSetting: FilteredMembersSettingType | undefined =
      settings.find(
        (s) => s.name === APP_SETTINGS_TYPES.FILTERED_MEMBERS,
      ) as FilteredMembersSettingType;
    if (filteredMembersSetting) {
      const fm = members.filter((m) =>
        filteredMembersSetting.data.filteredMembers.includes(m.id),
      );
      setSettingId(filteredMembersSetting.id);
      if (filteredMembers.length === 0) {
        setFilteredMembers(fm.toArray());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, members]);

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: Member[],
  ): void => {
    setFilteredMembers(newInputValue);
    if (settingId) {
      patchAppSetting({
        id: settingId,
        data: { filteredMembers: newInputValue.map((m: Member) => m.id) },
      });
    } else {
      postAppSetting({
        name: APP_SETTINGS_TYPES.FILTERED_MEMBERS,
        data: { filteredMembers: newInputValue.map((m: Member) => m.id) },
      });
    }
  };

  const membersList = members.toArray();

  return (
    <Autocomplete
      multiple
      fullWidth
      id="tags-outlined"
      options={membersList}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      disableCloseOnSelect
      renderOption={(props, option: Member, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={t('Filtered members')} />
      )}
      value={filteredMembers}
      onChange={handleInputChange}
    />
  );
};

export default FilterMembers;
