import {
  //TaskApp Part
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_BEING_EDITED,
  EDIT_TASK_TITLE,
  EDIT_TASK_DESCRIPTION,
  CLEAR_TASK_BEING_EDITED,
} from '../types';



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
