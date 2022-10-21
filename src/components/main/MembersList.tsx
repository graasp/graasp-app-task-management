/* eslint-disable react/prop-types */
import React from 'react';
import { t } from 'i18next';
import {
  Paper,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from '@mui/material';
import { List as ImList } from 'immutable';
import { Member } from '../../types/member';

type MembersListProps = {
  members: ImList<Member>;
};

const MembersList = (props: MembersListProps): JSX.Element => {
  const { members } = props;
  const onDragStart = (ev: React.DragEvent, member: string): void => {
    ev.dataTransfer.setData('member', member);
  };

  const newLocal = 'Members';

  return (
    <Paper sx={{ p: 1, pt: 2 }}>
      <Typography variant="h2">
        <>{t(newLocal)}</>
      </Typography>
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
