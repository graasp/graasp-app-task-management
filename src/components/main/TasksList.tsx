/* eslint-disable arrow-body-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { List } from 'immutable';
import { taskProp } from '../../types/props_types';
import AddTask from './AddTask';
import Task from './Task';
import { ExistingTaskType, TaskType } from '../../config/appDataTypes';
import { Member } from '../../types/member';

type TasksListProps = {
  title: string;
  tasks: List<ExistingTaskType>;
  label: string;
  addTask: (task: TaskType) => void;
  updateTask: (task: ExistingTaskType) => void;
  deleteTask: (id: string) => void;
  members: List<Member>;
  addComponent: boolean;
};

const TasksList = (props: TasksListProps): JSX.Element => {
  const {
    title,
    label,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    addComponent,
    members,
  } = props;
  return (
    <Paper sx={{ p: 1, pt: 2 }}>
      <div key={label} className="column" style={{ alignItems: 'center' }}>
        <Badge badgeContent={tasks.size} color="primary">
          <Typography variant="h2">{title}</Typography>
        </Badge>

        <Droppable droppableId={label}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              // TODO: DELETE
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...provided.droppableProps}
              // className="droppable-col"
              style={{ width: '100%' }}
            >
              <Stack spacing={1} sx={{ m: 1 }}>
                {addComponent && <AddTask addTask={addTask} label={label} />}

                {tasks.size ? (
                  tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      index={index}
                      draggableId={task.id}
                    >
                      {(provided2, snapshot) => (
                        <div
                          ref={provided2.innerRef}
                          // TODO: DELETE
                          /* eslint-disable-next-line react/jsx-props-no-spreading */
                          {...provided2.draggableProps}
                          // TODO: DELETE
                          /* eslint-disable-next-line react/jsx-props-no-spreading */
                          {...provided2.dragHandleProps}
                        >
                          <Task
                            task={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                            members={members}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Typography variant="subtitle1">No Tasks {title}</Typography>
                )}
                {provided.placeholder}
              </Stack>
            </div>
          )}
        </Droppable>
      </div>
    </Paper>
  );
};

TasksList.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(taskProp).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addTask: PropTypes.func,
  addComponent: PropTypes.bool,
};

TasksList.defaultProps = {
  addTask: () => {
    // console.warn('The task could not be added. [addTask not defined]');
  },
  addComponent: false,
};

export default TasksList;