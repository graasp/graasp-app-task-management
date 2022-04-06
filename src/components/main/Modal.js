import React, { useCallback } from 'react';
import { MdCancel, MdOutlineDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

const Modal = ({
  task,
  listTitle,
  submitDescriptionEdits,
  setIsEditingDescription,
  isEditingDescription,
  setEditingDescription,
  members,
  addMembers,
  removeMembers,
  setMembers,
}) => {
  const { t } = useTranslation();

  const handleDescriptionChange = useCallback(
    (event) => {
      setEditingDescription(event.target.value);
    },
    [setEditingDescription],
  );

  const saveDescription = () => {
    submitDescriptionEdits(task.id, listTitle);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const handleMembers = useCallback(
    (value) => {
      setMembers(value);
    },
    [setMembers],
  );

  const onDrop = (ev) => {
    const member = ev.dataTransfer.getData('member');
    members.push(member);
    handleMembers(members);
    addMembers(task.id, listTitle);
    console.log(task.members);
  };

  const handleRemoveMembers = (member) => {
    handleMembers(members.filter((e) => e !== member));

    removeMembers(task.id, listTitle, member);
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
                  {task.id === isEditingDescription ? (
                    <div>
                      <TextField
                        className="description-text-box"
                        placeholder={t(' Task Description')}
                        onChange={handleDescriptionChange}
                        defaultValue={task.description}
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
                      onClick={() =>
                        setIsEditingDescription(task.id)
                      }
                      value={task.description}
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
                        task.members.length
                          ? 'members-text '
                          : 'no-members-text'
                      }
                    >
                      {task.members.length
                        ? task.members.map((member) => (
                            <small>
                              {member}
                              <sup>
                                {' '}
                                <MdCancel
                                  className="remove-member-button"
                                  onClick={() => handleRemoveMembers(member)}
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
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    completed: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
  listTitle: PropTypes.string.isRequired,
  submitDescriptionEdits: PropTypes.func.isRequired,
  setIsEditingDescription: PropTypes.func.isRequired,
  isEditingDescription: PropTypes.bool,
  setEditingDescription: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  addMembers: PropTypes.func.isRequired,
  removeMembers: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isEditingDescription: false,
}

export default Modal;
