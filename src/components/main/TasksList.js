/* eslint-disable arrow-body-style */

import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { taskProp } from '../../types/props_types';
import AddTask from './AddTask';
import Task from './Task';

const TasksList = ({
  title,
  label,
  tasks,
  addTask,
  updateTask,
  deleteTask,
  addComponent,
}) => {
  return (
    <div>
      <div key={label} className="column" style={{ alignItems: 'center'}}>
        <div style={{ alignItems: 'center' }}>
          <h3 style={{ color: 'black', textAlign: 'center' }}>
            {title}&nbsp;
            <sup style={{ color: 'rgb(201, 59, 59)' }}>
              <small>{tasks.length}</small>
            </sup>
          </h3>
        </div>

        <Droppable droppableId={label}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              // TODO: DELETE
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...provided.droppableProps}
              className="droppable-col"
            >
              {addComponent && <AddTask addTask={addTask} label={label} />}

              {tasks.length ? (
                tasks.map((task, index) => (
                  <Draggable key={task.id} index={index} draggableId={task.id}>
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
                          className={snapshot.isDragging && 'dragging'}
                          task={task}
                          updateTask={updateTask}
                          deleteTask={deleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="no-item-text">&nbsp;No Tasks {title} </p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
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
