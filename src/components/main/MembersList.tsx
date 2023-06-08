import React from 'react';
import { useTranslation } from 'react-i18next';

import { UUID } from '@graasp/sdk';

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
import { useMembersContext } from '../context/MembersContext';

type MembersListProps = {
  membersColor: { [key: UUID]: string };
};

const MembersList = ({ membersColor }: MembersListProps): JSX.Element => {
  const { t } = useTranslation();
  const members = useMembersContext();
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
              <Avatar sx={{ bgcolor: membersColor[member.id] }}>
                {member.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MembersList;
