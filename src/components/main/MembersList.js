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

const MembersList = ({ members, filteredMembers }) => {
  const onDragStart = (ev, member) => {
    ev.dataTransfer.setData('member', member);
  };

  const isChecked = (id) => {
    if (filteredMembers?.includes(id)) {
      return false;
    }
    return true;
  };

  return (
    <Paper sx={{ p: 1, pt: 2 }}>
      <Typography variant="h2">{t('Members')}</Typography>
      <List>
        {members.map((member) =>
          isChecked(member.id) && member?.name ? (
            <ListItem
              key={member.id}
              draggable
              onDragStart={(e) => onDragStart(e, member.id)}
              cursor
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: member.color }}>{member.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={member.name} />
            </ListItem>
          ) : null,
        )}
      </List>
    </Paper>
  );
};

export default MembersList;
