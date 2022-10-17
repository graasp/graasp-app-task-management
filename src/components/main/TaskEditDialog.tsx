import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ExistingTaskType } from '../../config/appDataTypes';

type TaskEditDialogProps = {
  task: ExistingTaskType;
  updateTask: (t: ExistingTaskType) => void;
  open: boolean;
  onClose: () => void;
};

const TaskEditDialog = (props: TaskEditDialogProps): JSX.Element => {
  const { t } = useTranslation();

  const { task: inputTask, updateTask, open, onClose } = props;

  const [task, setTask] = useState(inputTask);

  useEffect(() => {
    if (!open) {
      setTask(inputTask);
    }
  }, [inputTask, open]);

  const handleChange =
    (prop: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setTask({
        ...task,
        data: {
          ...task.data,
          [prop]: event.target.value,
        },
      });
    };

  const handleClose = (): void => {
    updateTask({
      ...task,
      id: inputTask.id,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
      <DialogTitle>Modify Task</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel>Title</InputLabel>
              <Input
                value={task.data.title}
                onChange={handleChange('title')}
                inputProps={{
                  'aria-label': 'title',
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Description</InputLabel>
              <Input
                value={task.data.description}
                onChange={handleChange('description')}
                inputProps={{
                  'aria-label': 'description',
                }}
              />
            </FormControl>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Save task')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
