import { combineReducers } from "redux";

import TodoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  Todos: TodoReducer
});

export default rootReducer;
