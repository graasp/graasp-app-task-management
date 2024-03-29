import { List } from 'immutable';

import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Member } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';
import { Button } from '@graasp/ui';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { ExistingTaskTypeRecord } from '../../../config/appDataTypes';

type TaskEditDialogProps = {
  task: ExistingTaskTypeRecord;
  updateTask: (t: ExistingTaskTypeRecord) => void;
  open: boolean;
  onClose: () => void;
  members: List<MemberRecord>;
};

const TaskEditDialog: FC<TaskEditDialogProps> = ({
  task: inputTask,
  updateTask,
  open,
  onClose,
  members: membersList,
}) => {
  const { t } = useTranslation();

  const [task, setTask] = useState(inputTask);

  const { members: taskMembers } = task.data;

  const tM = membersList.filter(({ id }) => taskMembers.includes(id));

  useEffect(() => {
    if (!open) {
      setTask(inputTask);
    }
  }, [inputTask, open]);

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setTask(task.setIn(['data', prop], event.target.value));
    };

  const handleMemberChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newMembers: Member[],
  ): void => {
    const membersIds = newMembers.map((m) => m.id);
    setTask(task.setIn(['data', 'members'], membersIds));
  };

  const handleClose = (): void => {
    updateTask(task.set('id', inputTask.id));
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
      <DialogTitle>Modify Task</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel>{t('Title')}</InputLabel>
              <Input
                value={task.data.title}
                onChange={handleChange('title')}
                inputProps={{
                  'aria-label': 'title',
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>{t('Description')}</InputLabel>
              <Input
                value={task.data.description}
                onChange={handleChange('description')}
                inputProps={{
                  'aria-label': 'description',
                }}
                multiline
              />
            </FormControl>
            <Autocomplete
              multiple
              fullWidth
              options={membersList.toJS() as Member[]}
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
                <TextField {...params} label={t('Assigned members')} />
              )}
              value={tM.toJS() as Member[]}
              onChange={handleMemberChange}
              isOptionEqualToValue={(a, b) => a.id === b.id}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} color="secondary">
          {t('Cancel')}
        </Button>
        <Button onClick={handleClose}>{t('Save task')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
