import React, { useCallback, useState } from 'react';
import { MdCancel, MdOutlineDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { taskProp } from '../../types/props_types';

const Modal = ({ task, updateTask }) => {
  const { t } = useTranslation();

  const { id, data } = task;

  const { description, members } = data;

  const [isEditingDescription, setIsEditingDescription] = useState(null);

  const [editingDescription, setEditingDescription] = useState(description);

  const handleDescriptionChange = useCallback(
    (event) => {
      setEditingDescription(event.target.value);
    },
    [setEditingDescription],
  );

  const saveDescription = () => {
    const newTask = {
      ...task,
      data: {
        ...data,
        description: editingDescription,
      },
    };
    updateTask(newTask);
    setIsEditingDescription(false)
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const addMembers = (member) => {
    const newTask = {
      ...task,
      members: [...members, member],
    };
    updateTask(newTask);
  };

  const removeMembers = (member) => {
    const newTask = {
      ...task,
      data: {
        ...data,
        members: [...members.filter((m) => m !== member)],
      }
    };
    console.debug("The task with a member removed is: ", newTask);
    updateTask(newTask);
  };

  const onDrop = (ev) => {
    const member = ev.dataTransfer.getData('member');
    addMembers(member);
  };

  return (
    <div
      className="modal droppable"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      <div className="modal_content">
        <div className="date-footer row">
          <div className="col-md-6">
            <div className="col-md-12">
              <div className="date-footer">
                <br />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  className={
                    isEditingDescription
                      ? 'task-description-label-edit'
                      : 'task-description-label'
                  }
                >
                  <small>Description</small>
                </label>
                <br />
                <br />

                <div>
                  {id === isEditingDescription ? (
                    <div>
                      <TextField
                        className="description-text-box"
                        placeholder={t(' Task Description')}
                        onChange={handleDescriptionChange}
                        defaultValue={description}
                        multiline
                        inputProps={{ style: { fontSize: '0.8em' } }}
                        rows={5}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        InputProps={{ disableUnderline: true }}
                        autoFocus
                        onFocus={(e) =>
                          e.currentTarget.setSelectionRange(
                            e.currentTarget.value.length,
                            e.currentTarget.value.length,
                          )
                        }
                      />
                      <div>
                        <MdOutlineDone
                          onClick={saveDescription}
                          style={{
                            color: 'black',
                            cursor: 'pointer',
                            alignContent: 'center',
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <TextField
                      className="description-text-box"
                      InputProps={{ disableUnderline: true }}
                      style={{ border: '1px solid rgb(218, 213, 213)' }}
                      multiline
                      rows={5}
                      /* eslint-disable-next-line react/jsx-no-duplicate-props */
                      inputProps={{ style: { fontSize: '0.8em' } }}
                      placeholder={t(' Task Description')}
                      onClick={() => setIsEditingDescription(id)}
                      onChange={handleDescriptionChange}
                      value={editingDescription}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
              <div className="date-footer">
                <div>
                  <div>
                    <div
                      className={
                        members.length
                          ? 'members-text '
                          : 'no-members-text'
                      }
                    >
                      {members.length
                        ? members.map((member) => (
                            <small>
                              {member}
                              <sup>
                                {' '}
                                <MdCancel
                                  className="remove-member-button"
                                  onClick={() => removeMembers(member)}
                                  title={`Remove ${member}`}
                                />
                                &nbsp;&nbsp;
                              </sup>
                            </small>
                          ))
                        : 'No members yet'}
                    </div>{' '}
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  task: taskProp.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Modal;
