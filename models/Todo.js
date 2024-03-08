// models/Todo.js
const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor(title, description) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Todo;
