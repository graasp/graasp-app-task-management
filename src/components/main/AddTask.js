import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TASK, DEFAULT_TASK_DATA } from '../../constants/constants';

const AddTask = ({ addTask, label }) => {
  const { t } = useTranslation();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    const newTask = {
      ...DEFAULT_TASK,
      data: {
        ...DEFAULT_TASK_DATA,
        title: newTaskTitle,
        label,
      },
    };
    addTask(newTask);
    setNewTaskTitle('');
  };

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
      if(newTaskTitle.trim().length!==0){
      handleAddTask()
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
          InputProps={{ disableUnderline: true }}
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
          alt="add-task"
          className={`${newTaskTitle.trim() ? 'active-add-icon' : 'add-icon'}`}
          onClick={handleAddTask}
        />
      </div>
      <br />
    </div>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default AddTask;
