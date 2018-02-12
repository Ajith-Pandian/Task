import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODO,
  FETCH_CHILDREN
} from "../ActionNames";
import Todo from "../../Model/Todo";

export const fetchTodo = page => dispatch => dispatch(_fetchTodo(page));

export const fetchChildren = page => dispatch => dispatch(_fetchChildren(page));

export const createTodo = todo => dispatch => dispatch(_createTodo(todo));

export const removeTodo = id => dispatch => dispatch(_removeTodo(id));

export const updateTodo = (id, title, description) => dispatch =>
  dispatch(_updateTodo(id, title, description));

function _fetchTodo(page) {
  return {
    type: FETCH_TODO,
    page
  };
}

function _fetchChildren(id) {
  return {
    type: FETCH_CHILDREN,
    id
  };
}
function _createTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function _removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function _updateTodo(id, title, description) {
  return {
    type: UPDATE_TODO,
    id,
    title,
    description
  };
}
