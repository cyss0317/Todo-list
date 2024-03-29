const express = require("express");
const router = express.Router();
const Todo = require("./model");
const validateRegisterTodo = require("../validation/todo_validation");

router.post("/create", (req, res) => {
  const data = req.body;
  const { errors, isValid } = validateRegisterTodo(data);

  if (!isValid) return res.status(400).json(errors);
  const currentDate = new Date();
  const todayMonth = currentDate.getUTCMonth() + 1;
  const todayDay = currentDate.getUTCDate();
  const todayYear = currentDate.getUTCFullYear();

  const newTodo = new Todo({
    description: data.description,
    done: data.done,
    inProgress: data.inProgress,
    dueDate: data.dueDate
      ? data.dueDate
      : `${todayYear}-${todayMonth}-${todayDay}`,
    tags: [],
  });

  newTodo
    .save()
    .then((newTodo) => res.json(newTodo))
    .catch((err) => alert(`create todo request failed ${err}`));
});

router.get("/", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => {
      throw new Error(`Failed to retrieve todos: ${err}`);
    });
});

router.get("/upcoming", (req, res) => {
  Todo.find({ done: false, inProgress: false })
    .then((todos) => res.json(todos))
    .catch((err) => {
      throw new Error(`Failed to retrieve upcomings: ${err}`);
    });
});

router.get("/inprogress", (req, res) => {
  Todo.find({ inProgress: true })
    .then((todos) => res.json(todos))
    .catch((err) => {
      throw new Error(`Failed to retrieve inprogress: ${err}`);
    });
});

router.get("/done", (req, res) => {
  Todo.find({ done: true })
    .then((todos) => res.json(todos))
    .catch((err) => {
      throw new Error(`Failed to retrieve dones: ${err}`);
    });
});

router.get("/:id", (req, res) => {
  const todo = Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", (req, res) => {
  const todo = Todo.findOneAndRemove({ _id: req.params.id })
    .then(() => res.json({ todoDeleted: "Successfully delete" }))
    .catch((err) => res.status(404).json(err));
});

router.put("/:id", (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      description: req.body.description,
      done: req.body.done,
      inProgress: req.body.inProgress,
      dueDate: req.body.dueDate,
      tags: req.body.tags,
    },
    { new: true },
    (err, data) => {
      data ? res.json(data) : res.json(err);
    }
  );
});

module.exports = router;
