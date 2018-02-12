import moment from "moment";

export default class Todo {
  constructor(id, title, description, parentId = 0, time = new Date()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.parentId = parentId;
    this.time = moment(time);
  }
}
