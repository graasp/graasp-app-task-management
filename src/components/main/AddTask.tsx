import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TASK, DEFAULT_TASK_DATA } from '../../config/constants';
import { TaskType } from '../../config/appDataTypes';

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
    console.debug('New task added: ', newTaskTitle);
  };

  const inputKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      if (newTaskTitle.trim().length !== 0) {
        handleAddTask();
      }
    }
  };

  return (
    <div>
      <div
        className="row"
        style={{
          alignSelf: 'center',
          marginTop: '10px',
        }}
      >
        <input
          className={`${newTaskTitle.trim() ? 'text-input-out' : 'text-input'}`}
          // InputProps={{ disableUnderline: true }}
          value={newTaskTitle}
          placeholder={t('New Task')}
          onKeyDown={inputKeyDown}
          onChange={(event) => {
            setNewTaskTitle(event.target.value);
          }}
        />
        <MdAddCircle
          type="submit"
          data-toggle="tooltip"
          data-placement="left"
          title={t('Add Task')}
          className={`${newTaskTitle.trim() ? 'active-add-icon' : 'add-icon'}`}
        />
      </div>
      <br />
    </div>
  );
};

export default AddTask;
