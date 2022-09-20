import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/constants';
import { TASK_LABELS } from '../../config/settings';
import TasksList from '../main/TasksList';
import { taskProp, memberProp } from '../../types/props_types';
import Students from '../main/Students';

const TasksManager = ({
  tasks,
  addTask,
  updateTask,
  deleteTask,
  members,
  filteredNames,
}) => {
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
      <Grid item md={12} lg={4}>
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
      </Grid>
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
    <Grid container columnSpacing={1}>
      <Grid item md={12} lg={2}>
        <Students contributions={contributions} filteredNames={filteredNames} />
      </Grid>
      <Grid item md={12} lg={10}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container columnSpacing={1}>
            {renderTasksList('To Do', TASK_LABELS.TODO, true)}
            {renderTasksList('In Progress', TASK_LABELS.IN_PROGRESS)}
            {renderTasksList('Completed', TASK_LABELS.COMPLETED)}
          </Grid>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};

TasksManager.propTypes = {
  tasks: PropTypes.arrayOf(taskProp).isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(memberProp).isRequired,
  filteredNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TasksManager;
