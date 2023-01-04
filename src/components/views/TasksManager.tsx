import { List } from 'immutable';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { APP_ACTION_TYPES } from '../../config/appActionTypes';
import {
  APP_DATA_TYPES,
  ExistingTaskType,
  TaskType,
} from '../../config/appDataTypes';
import {
  APP_SETTINGS_TYPES,
  FilteredMembersSettingType,
} from '../../config/appSettingTypes';
import { COLORS, TASK_LABELS } from '../../config/constants';
import {
  mouseActivationConstraint,
  touchActivationConstraint,
} from '../../config/dndActivationConstraints';
import { useAppActionContext } from '../context/AppActionContext';
import { useAppDataContext } from '../context/AppDataContext';
import { useAppSettingContext } from '../context/AppSettingContext';
import { useMembersContext } from '../context/MembersContext';
import MembersList from '../main/MembersList';
import TasksList from '../main/TasksList';

const TasksManager = (): JSX.Element => {
  const { t } = useTranslation();
  // get the appData array and a callback to post new appData
  const { postAppData, patchAppData, deleteAppData, appDataArray } =
    useAppDataContext();

  const { postAppAction } = useAppActionContext();

  const { appSettingArray } = useAppSettingContext();

  const filteredMembersSetting = appSettingArray.find(
    ({ name }) => name === APP_SETTINGS_TYPES.FILTERED_MEMBERS,
  ) as FilteredMembersSettingType;

  const { filteredMembers } = filteredMembersSetting?.data || {
    filteredMembers: [],
  };

  const [tasks, setTasks] = useState<List<ExistingTaskType>>(List());

  // get the members having access to the space
  const members = useMembersContext()
    .filter(({ id }) => !filteredMembers.includes(id))
    .map((member, index) => ({
      ...member,
      color: COLORS[index],
    }));

  useEffect(() => {
    const newTasks = appDataArray.filter(
      ({ type }) => type === APP_DATA_TYPES.TASK,
    ) as List<ExistingTaskType>;
    if (newTasks) {
      // TODO: Add sorting strategy.
      setTasks(newTasks);
    }
  }, [appDataArray]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: mouseActivationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: touchActivationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const addTask = (newTask: TaskType): void => {
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

  const handleDragEnd = (result: DragEndEvent): void => {
    const { over: destination, active: source } = result;

    if (!destination) {
      return;
    }

    const droppedTask = tasks.find((ta) => ta.id === source.id);

    if (droppedTask) {
      if (destination.id !== droppedTask.data.label) {
        const newTask = {
          ...droppedTask,
          data: {
            ...droppedTask.data,
            label: destination.id as string,
          },
        };
        updateTask(newTask);
      }
    }
  };

  const renderTasksList = (
    title: string,
    label: string,
    add = false,
  ): JSX.Element => {
    // eslint-disable-next-line react/destructuring-assignment
    const tasksArray = tasks.filter(({ data }) => data.label === label);

    return (
      <Grid item sm={12} md={4} height="100%">
        <TasksList
          title={title}
          label={label}
          tasks={tasksArray}
          addComponent={add}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          members={members}
        />
      </Grid>
    );
  };

  return (
    <Grid container spacing={4} height="100%">
      <Grid item sm={12} md={2} height="100%">
        <MembersList members={members} />
      </Grid>
      <Grid item sm={12} md={10}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <Grid container spacing={2} height="100%">
            {renderTasksList(t('To Do'), TASK_LABELS.TODO, true)}
            {renderTasksList(t('In Progress'), TASK_LABELS.IN_PROGRESS)}
            {renderTasksList(t('Completed'), TASK_LABELS.COMPLETED)}
          </Grid>
        </DndContext>
      </Grid>
    </Grid>
  );
};

export default TasksManager;
