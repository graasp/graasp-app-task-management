import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { taskProp } from '../../types/props_types';

const TaskEditDialog = (props) => {
  const { t } = useTranslation();

  const { task: inputTask, updateTask, open, onClose } = props;

  const [task, setTask] = useState(inputTask);

  useEffect(() => {
    if (!open) {
      setTask(inputTask);
    }
  }, [inputTask]);

  const handleChange = (prop) => (event) => {
    setTask({
      ...task,
      data: {
        ...task.data,
        [prop]: event.target.value,
      },
    });
  };

  const handleClose = () => {
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

TaskEditDialog.propTypes = {
  task: taskProp.isRequired,
  updateTask: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskEditDialog;
