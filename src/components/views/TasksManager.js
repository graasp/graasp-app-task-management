import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/constants';
import { TASK_LABELS } from '../../config/settings';
import TasksList from '../main/TasksList';
import { taskProp, memberProp } from '../../types/props_types';

const TasksManager = ({ tasks, addTask, updateTask, deleteTask, members }) => {
  const contributionMap = new Map();
  // eslint-disable-next-line react/destructuring-assignment
  const totalNumberOfTasks = tasks.size || 0;

  members?.forEach((student) => contributionMap.set(student.name, 0));

  const contributions = Array.from(
    contributionMap,
    // eslint-disable-next-line arrow-body-style
    ([key, contribution], index) => {
      return {
        name: key,
        contribution:
          totalNumberOfTasks === 0
            ? 0
            : (contribution / totalNumberOfTasks) * 100,
        memberContribution:
          totalNumberOfTasks === 0
            ? 0
            : Math.floor((contribution / totalNumberOfTasks) * 100),
        color: COLORS[index % COLORS.length],
      };
    },
  );

  const renderTasksList = (title, label, add = false) => {
    // eslint-disable-next-line react/destructuring-assignment
    const tasksArray = [...tasks.filter(({ data }) => data.label === label)];

    return (
      <div>
        <TasksList
          title={title}
          label={label}
          tasks={tasksArray}
          addComponent={add}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          // eslint-disable-next-line no-use-before-define
          contributions={contributions}
        />
      </div>
    );
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const labelledTasks = [
      // eslint-disable-next-line react/destructuring-assignment
      ...tasks.filter(({ data }) => data.label === source.droppableId),
    ];

    const draggedTask = labelledTasks[source.index];

    const newTask = {
      ...draggedTask,
      data: {
        ...draggedTask.data,
        label: destination.droppableId,
      },
    };

    updateTask(newTask);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          {renderTasksList('To Do', TASK_LABELS.TODO, true)}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

TasksManager.propTypes = {
  tasks: PropTypes.arrayOf(taskProp).isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(memberProp).isRequired,
};

export default TasksManager;
