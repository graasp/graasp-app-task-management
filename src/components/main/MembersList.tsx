import { List as ImList } from 'immutable';

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import { MEMBERS_LIST_CARD_CY } from '../../config/selectors';
import { Member } from '../../types/member';

type MembersListProps = {
  members: ImList<Member>;
};

const MembersList = (props: MembersListProps): JSX.Element => {
  const { t } = useTranslation();
  const { members } = props;
  const onDragStart = (ev: React.DragEvent, member: string): void => {
    ev.dataTransfer.setData('member', member);
  };

  return (
    <Paper
      data-cy={MEMBERS_LIST_CARD_CY}
      variant="outlined"
      sx={{ p: 1, pt: 2, height: '100%' }}
    >
      <Typography variant="h2">{t('Members')}</Typography>
      <List>
        {members.map((member) => (
          <ListItem
            key={member.id}
            draggable
            onDragStart={(e) => onDragStart(e, member.id)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: member.color }}>{member.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MembersList;
