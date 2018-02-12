import moment from "moment";
import data from "./data";
import Todo from "./Model/Todo";

export const getDummyTodos = () =>
  data.map(
    ({ id, title, description, parent_id }) =>
      new Todo(id, title, description, parent_id)
  );

export const sortByDate = data =>
  data.sort((a, b) => moment(b.time) - moment(a.time));

export const sortById = data =>
  data.sort((a, b) => moment(a.id) - moment(b.id));
