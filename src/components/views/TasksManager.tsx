import { List } from 'immutable';

import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';

import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
  ExistingTaskTypeRecord,
  TaskType,
} from '../../config/appDataTypes';
import {
  APP_SETTINGS_TYPES,
  FilteredMembersSettingTypeRecord,
} from '../../config/appSettingTypes';
import { TASK_LABELS } from '../../config/constants';
import {
  mouseActivationConstraint,
  touchActivationConstraint,
} from '../../config/dndActivationConstraints';
import stringToColor from '../../utils/stringToColor';
import { useAppActionContext } from '../context/AppActionContext';
import { useAppDataContext } from '../context/AppDataContext';
import { useAppSettingContext } from '../context/AppSettingContext';
import { useMembersContext } from '../context/MembersContext';
import MembersList from '../main/MembersList';
import Task from '../main/tasks/Task';
import TasksList from '../main/tasks/TasksList';
import TasksListMinimized from '../main/tasks/TasksListMinimized';

const TasksManager: FC = () => {
  const { t } = useTranslation();
  // get the appData array and a callback to post new appData
  const { postAppData, patchAppData, deleteAppData, appDataArray } =
    useAppDataContext();

  const { postAppAction } = useAppActionContext();

  const { appSettingArray } = useAppSettingContext();

  const [hiddenLists, setHiddenLists] = useState<{ [key: string]: boolean }>({
    [TASK_LABELS.TODO]: false,
    [TASK_LABELS.IN_PROGRESS]: false,
    [TASK_LABELS.COMPLETED]: false,
  });

  const numberOfColumnsInGridForVisibleList =
    12 /
    Object.values(hiddenLists).reduce(
      (total, x) => (x === false ? total + 1 : total),
      0,
    );

  const [activeTask, setActiveTask] = useState<ExistingTaskTypeRecord | null>(
    null,
  );

  const filteredMembersSetting = appSettingArray.find(
    ({ name }) => name === APP_SETTINGS_TYPES.FILTERED_MEMBERS,
  ) as FilteredMembersSettingTypeRecord;

  const { filteredMembers } = filteredMembersSetting?.data || {
    filteredMembers: [],
  };

  const [tasks, setTasks] = useState<List<ExistingTaskTypeRecord>>(List());

  // get the members having access to the space
  const membersColor = Object.fromEntries(
    useMembersContext()
      .filter(({ id }) => !filteredMembers.includes(id))
      .map((member) => [member.id, stringToColor(member.name)]),
  );

  useEffect(() => {
    const newTasks = appDataArray.filter(
      ({ type }) => type === APP_DATA_TYPES.TASK,
    ) as List<ExistingTaskTypeRecord>;
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

  const updateTask = (newTask: ExistingTaskTypeRecord): void => {
    patchAppData(newTask.toJS() as ExistingTaskType);
    postAppAction({
      type: APP_ACTION_TYPES.EDIT,
      data: {
        ...newTask.data.toJS(),
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
        const newTask = droppedTask.setIn(
          ['data', 'label'],
          destination.id as string,
        );
        updateTask(newTask);
      }
    }
    setActiveTask(null);
  };

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveTask(tasks.find((ta) => ta.id === event.active.id) ?? null);
  };

  const handleHide = (label: string, hide: boolean): void => {
    setHiddenLists((prevState) => ({
      ...prevState,
      [label]: hide,
    }));
  };

  const renderTasksList = (
    title: string,
    label: string,
    add = false,
  ): JSX.Element => {
    const tasksArray = tasks.filter(({ data }) => data.label === label);
    const isHidden = hiddenLists[label] ?? false;

    return (
      <Slide
        direction="up"
        in={!isHidden}
        mountOnEnter
        unmountOnExit
        style={{ height: 'auto' }}
      >
        <Grid
          item
          sm={12}
          md={numberOfColumnsInGridForVisibleList}
          height="100%"
        >
          <TasksList
            title={title}
            label={label}
            tasks={tasksArray}
            addComponent={add}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            membersColor={membersColor}
            onHide={() => handleHide(label, true)}
          />
        </Grid>
      </Slide>
    );
  };

  const renderTasksListMinimized = (
    title: string,
    label: string,
  ): JSX.Element => {
    // eslint-disable-next-line react/destructuring-assignment
    const tasksArray = tasks.filter(({ data }) => data.label === label);
    const isHidden = hiddenLists[label] ?? false;

    return (
      <Slide
        direction="up"
        in={isHidden}
        mountOnEnter
        unmountOnExit
        style={{ height: 'auto' }}
      >
        <TasksListMinimized
          title={title}
          tasksNumber={tasksArray.size}
          onShow={() => handleHide(label, false)}
        />
      </Slide>
    );
  };

  return (
    <Grid
      container
      spacing={4}
      maxHeight="100vh"
      position="relative"
      zIndex={0}
    >
      <Grid item sm={12} md={2} height="100%">
        <MembersList membersColor={membersColor} />
        {renderTasksListMinimized(t('todo'), TASK_LABELS.TODO)}
        {renderTasksListMinimized(t('in_progress'), TASK_LABELS.IN_PROGRESS)}
        {renderTasksListMinimized(t('completed'), TASK_LABELS.COMPLETED)}
      </Grid>
      <Grid item sm={12} md={10}>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <TransitionGroup>
            <Grid container spacing={2}>
              {renderTasksList(t('todo'), TASK_LABELS.TODO, true)}
              {renderTasksList(t('in_progress'), TASK_LABELS.IN_PROGRESS)}
              {renderTasksList(t('completed'), TASK_LABELS.COMPLETED)}
            </Grid>
          </TransitionGroup>
          <DragOverlay dropAnimation={null}>
            {activeTask ? (
              <Task
                key={0}
                task={activeTask}
                membersColor={membersColor}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Grid>
    </Grid>
  );
};

export default TasksManager;
