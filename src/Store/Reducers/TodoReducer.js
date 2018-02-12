import update from "immutability-helper";

import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODO,
  FETCH_CHILDREN
} from "../ActionNames";

import Todo from "../../Model/Todo";
import { getDummyTodos, sortByDate, sortById } from "../../Utils";

const initialState = {
  todos: [],
  children: [],
  isLoading: false,
  page: 1
};

const PAGE_OFFSET = 10;
export default function TodoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODO: {
      let { page } = action;
      let todos = getDummyTodos().filter(
        item => item.id < PAGE_OFFSET * page //&& item.id > [page - 1] * PAGE_OFFSET
      );
      return { ...state, todos, page };
    }
    case FETCH_CHILDREN: {
      let { id } = action;
      let todos = getDummyTodos().filter(item => item.parentId === id);
      return { ...state, children: todos };
    }
    case ADD_TODO: {
      if (state.todos.length > 0) {
        let { title, description } = action.todo;
        let todos = sortById(state.todos);
        const todoListSize = todos.length;
        const totalPages = todoListSize / PAGE_OFFSET;
        let id = todos[todoListSize - 1].id + 1;
        let todo = new Todo(id, title, description);
        return {
          ...state,
          todos: [...state.todos, todo]
        };
      } else {
        let { title, description } = action.todo;
        let todo = new Todo(1, title, description);
        return { ...state, todos: [todo] };
      }
    }
    case UPDATE_TODO: {
      let { id, title, description } = action;
      let index = state.todos.findIndex(item => item.id === id);
      return update(state, {
        todos: {
          [index]: {
            title: { $set: title },
            description: { $set: description }
          }
        }
      });
    }
    case REMOVE_TODO: {
      let { id } = action;
      if (id === 0) {
        let index = state.todos.findIndex(item => item.id === id);
        return update(state, { todos: { $splice: [index, 1] } });
      } else {
        let children = state.todos.filter(item => item.parentId !== id);
        return { ...state, todos: children };
      }
    }
    default:
      return state;
  }
}
