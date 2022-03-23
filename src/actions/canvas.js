import {
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE_POSITION,
  SET_USER_NOTE_COLOR,
  SET_NOTE_BEING_EDITED,
  EDIT_NOTE_COLOR,
  EDIT_NOTE_TITLE,
  EDIT_NOTE_DESCRIPTION,
  CLEAR_NOTE_BEING_EDITED,
  //TaskApp Part
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_BEING_EDITED,
  EDIT_TASK_TITLE,
  EDIT_TASK_DESCRIPTION,
  CLEAR_TASK_BEING_EDITED,
} from '../types';

const addNote = (payload) => (dispatch) =>
  dispatch({
    type: ADD_NOTE,
    payload,
  });

const updateNote = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_NOTE,
    payload,
  });

const deleteNote = (payload) => (dispatch) =>
  dispatch({
    type: DELETE_NOTE,
    payload,
  });

const updateNotePosition = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_NOTE_POSITION,
    payload,
  });

const setUserNoteColor = (payload) => (dispatch) =>
  dispatch({
    type: SET_USER_NOTE_COLOR,
    payload,
  });

const setNoteBeingEdited = (payload) => (dispatch) =>
  dispatch({
    type: SET_NOTE_BEING_EDITED,
    payload,
  });

const editNoteColor = (payload) => (dispatch) =>
  dispatch({
    type: EDIT_NOTE_COLOR,
    payload,
  });

const editNoteTitle = (payload) => (dispatch) =>
  dispatch({
    type: EDIT_NOTE_TITLE,
    payload,
  });

const editNoteDescription = (payload) => (dispatch) =>
  dispatch({
    type: EDIT_NOTE_DESCRIPTION,
    payload,
  });

const clearNoteBeingEdited = (payload) => (dispatch) =>
  dispatch({
    type: CLEAR_NOTE_BEING_EDITED,
    payload,
  });

//TaskApp Part

const addTask = (payload) => (dispatch) =>
  dispatch({
    type: ADD_TASK,
    payload,
  });

const updateTask = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_TASK,
    payload,
  });
const deleteTask = (payload) => (dispatch) =>
  dispatch({
    type: DELETE_TASK,
    payload,
  });
const setTaskBeingEdited = (payload) => (dispatch) =>
  dispatch({
    type: SET_TASK_BEING_EDITED,
    payload,
  });

const editTaskTitle = (payload) => (dispatch) =>
  dispatch({
    type: EDIT_TASK_TITLE,
    payload,
  });

const editTaskDescription = (payload) => (dispatch) =>
  dispatch({
    type: EDIT_TASK_DESCRIPTION,
    payload,
  });

const clearTaskBeingEdited = (payload) => (dispatch) =>
  dispatch({
    type: CLEAR_TASK_BEING_EDITED,
    payload,
  });

export {
  addNote,
  updateNote,
  deleteNote,
  updateNotePosition,
  setUserNoteColor,
  setNoteBeingEdited,
  editNoteColor,
  editNoteTitle,
  editNoteDescription,
  clearNoteBeingEdited,
  addTask,
  updateTask,
  deleteTask,
  setTaskBeingEdited,
  editTaskTitle,
  editTaskDescription,
  clearTaskBeingEdited,
};
