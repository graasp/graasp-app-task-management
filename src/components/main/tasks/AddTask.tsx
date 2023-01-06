import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';

import { TaskType } from '../../../config/appDataTypes';
import { DEFAULT_TASK, DEFAULT_TASK_DATA } from '../../../config/constants';

type AddTaskProps = {
  addTask: (task: TaskType) => void;
  label: string;
};

const AddTask = (props: AddTaskProps): JSX.Element => {
  const { addTask, label } = props;
  const { t } = useTranslation();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (): void => {
    const newTask: TaskType = {
      ...DEFAULT_TASK,
      data: {
        ...DEFAULT_TASK_DATA,
        title: newTaskTitle,
        label,
        members: [],
      },
    };
    addTask(newTask);
    setNewTaskTitle('');
  };

  const inputKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      if (newTaskTitle.trim().length !== 0) {
        handleAddTask();
      }
    }
  };

  return (
    <Container>
      <TextField
        label={t('New task')}
        variant="outlined"
        value={newTaskTitle}
        onKeyDown={inputKeyDown}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNewTaskTitle(event.target.value);
        }}
        fullWidth
      />
    </Container>
  );
};

export default AddTask;
