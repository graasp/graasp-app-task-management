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
    <Paper variant="outlined" sx={{ p: 1, pt: 2 }}>
      <Typography variant="h2">{t('Members') as string}</Typography>
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
