import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import { List } from 'immutable';
import TasksList from '../main/TasksList';
import MembersList from '../main/MembersList';
import {
  APP_DATA_TYPES,
  ExistingTaskType,
  TaskType,
} from '../../config/appDataTypes';
import { useAppDataContext } from '../context/AppDataContext';
import { useAppActionContext } from '../context/AppActionContext';
import { useMembersContext } from '../context/MembersContext';
import { COLORS, TASK_LABELS } from '../../config/constants';
import { APP_ACTION_TYPES } from '../../config/appActionTypes';

const TasksManager = (): JSX.Element => {
  // get the appData array and a callback to post new appData
  const { postAppData, patchAppData, deleteAppData, appDataArray } =
    useAppDataContext();

  const { postAppAction } = useAppActionContext();

  const [tasks, setTasks] = useState<List<ExistingTaskType>>(List());

  // get the members having access to the space
  const members = useMembersContext().map((member, index) => ({
    ...member,
    color: COLORS[index],
  }));

  useEffect(() => {
    const newTasks = appDataArray.filter(
      ({ type }) => type === APP_DATA_TYPES.TASK,
    ) as List<ExistingTaskType>;
    if (newTasks) {
      setTasks(newTasks);
    }
  }, [appDataArray]);

  const addTask = (newTask: TaskType): void => {
    console.debug('Post app data (newTask): ', newTask);
    console.debug('postAppData: ', postAppData);
    postAppData(newTask);

    postAppAction({
      type: APP_ACTION_TYPES.ADD,
      data: {
        ...newTask.data,
      },
    });
  };

  const updateTask = (newTask: ExistingTaskType): void => {
    patchAppData(newTask);
    postAppAction({
      type: APP_ACTION_TYPES.EDIT,
      data: {
        ...newTask.data,
        id: newTask.id,
      },
    });
  };

  const deleteTask = (id: string): void => {
    deleteAppData({ id });
    postAppAction({
      type: APP_ACTION_TYPES.DELETE,
      data: {
        id,
      },
    });
  };

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const labelledTasks = tasks
      .filter(({ data }) => data.label === source.droppableId)
      .toArray();

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

  const renderTasksList = (
    title: string,
    label: string,
    add = false,
  ): JSX.Element => {
    // eslint-disable-next-line react/destructuring-assignment
    const tasksArray = tasks.filter(({ data }) => data.label === label);

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

  return (
    <Grid container columnSpacing={1}>
      <Grid item md={12} lg={2}>
        <MembersList members={members} />
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

export default TasksManager;
