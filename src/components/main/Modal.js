import React, {useCallback } from 'react';
import { MdCancel, MdOutlineDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { ACTION_TYPES } from '../../config/actionTypes';
import { MUTATION_KEYS, useMutation } from '../../config/queryClient';

const Modal = (props) => {
  const { t } = useTranslation();
  const { mutate: postAction } = useMutation(MUTATION_KEYS.POST_APP_ACTION);

  const handleDescriptionChange = useCallback(
    (event) => {
      props.setEditingDescription(event.target.value);
    },
    [props.setEditingDescription],
  );

  const saveDescription = () => {
    props.submitDescriptionEdits(props.task.id, props.listTitle);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  const onDrop = (ev) => {
    let member = ev.dataTransfer.getData('member');
    props.members.push(member);
    handleMembers(props.members);
    props.addMembers(props.task.id, props.listTitle);
    console.log(props.task.members);
  };

  const handleMembers = useCallback(
    (value) => {
      props.setMembers(value);
    },
    [props.setMembers],
  );

  const handleRemoveMembers = (member) => {
    handleMembers(props.members.filter((e) => e !== member));

    props.removeMembers(props.task.id, props.listTitle, member);
    postAction({
      type: ACTION_TYPES.DELETE,
      data: props.task.id,
    });
  };

  return (
    <div
      className="modal droppable"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      <div className="modal_content">
        <div class="row" className="date-footer">
          <div className="col-md-6">
            <div className="col-md-12">
              <div className="date-footer">
                <br />
                <label
                  className={
                    props.isEditingDescription
                      ? 'task-description-label-edit'
                      : 'task-description-label'
                  }
                >
                  <small>Description</small>
                </label>
                <br />
                <br />

                <div>
                  {props.task.id === props.isEditingDescription &&
                  !props.task.completed ? (
                    <div>
                      <TextField
                        className="description-text-box"
                        placeholder={t(' Task Description')}
                        onChange={handleDescriptionChange}
                        defaultValue={props.task.description}
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
                      inputProps={{ style: { fontSize: '0.8em' } }}
                      placeholder={t(' Task Description')}
                      onClick={() =>
                        props.setIsEditingDescription(props.task.id)
                      }
                      value={props.task.description}
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
                        props.task.members.length
                          ? 'members-text '
                          : 'no-members-text'
                      }
                    >
                      {props.task.members.length
                        ? props.task.members.map((member) => (
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

export default Modal;
