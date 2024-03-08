// controllers/todosController.js
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const Todo = require('../models/Todo');

const dataFilePath = path.join(__dirname, '..', 'data', 'todos.json');

// Validation schema for todo
const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

// Read todos from file
const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write todos to file
const writeTodosToFile = (todos) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
};

// Get all todos
exports.getAllTodos = (req, res) => {
  const todos = readTodosFromFile();
  res.json(todos);
};

// Get todo by ID
exports.getTodoById = (req, res) => {
  const todos = readTodosFromFile();
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
};

// Create a new todo
exports.createTodo = (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { title, description } = req.body;
  const newTodo = new Todo(title, description);

  const todos = readTodosFromFile();
  todos.push(newTodo);
  writeTodosToFile(todos);

  res.status(201).json(newTodo);
};

// Update a todo
exports.updateTodo = (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { title, description } = req.body;
  const todos = readTodosFromFile();
  const index = todos.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index].title = title;
  todos[index].description = description;
  todos[index].updatedAt = new Date();

  writeTodosToFile(todos);

  res.json(todos[index]);
};

// Delete a todo
exports.deleteTodo = (req, res) => {
  const todos = readTodosFromFile();
  const filteredTodos = todos.filter((t) => t.id !== req.params.id);

  if (todos.length === filteredTodos.length) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  writeTodosToFile(filteredTodos);

  res.status(204).end();
};
