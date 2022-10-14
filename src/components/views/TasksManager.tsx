import React from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { TASK_LABELS } from '../../config/settings';
import TasksList from '../main/TasksList';
import { taskProp, memberProp } from '../../types/props_types';
import MembersList from '../main/MembersList';
import { ExistingTaskType, TaskType } from '../../config/appDataTypes';
import { List } from 'immutable';
import { Member } from '@graasp/apps-query-client';

type TasksManagerProps = {
  tasks: List<ExistingTaskType>;
  addTask: (task: TaskType) => void;
  updateTask: (task: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: Array<Member>;
};

const TasksManager = (props: TasksManagerProps): JSX.Element => {
  const { tasks, addTask, updateTask, deleteTask, members } = props;
  const renderTasksList = (title: string, label: string, add = false) => {
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
            members={members}
          />
        </div>
      </Grid>
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const {destination, source} = result;
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
        <MembersList members={members}/>
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
