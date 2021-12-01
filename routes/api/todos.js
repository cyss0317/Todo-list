const express = require("express");
const router = express.Router();
const Todo = require("../../Model/TodosModel");
const validateRegisterTodo = require("../../validation/todo_validation");

router.get("/test", (req, res) => {
    res.json({msg: "this is the note route"});
});

router.get("/:id", (req, res) => {
    const todo = Todo.findById(req.params.id)
        .then( todo => res.json(todo) )
        .catch( err => res.status(404).json(err))
});

router.get("/", (req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch( err => res.status((404).json(err)))
})



router.post("/create", (req, res) => {

    const { errors, isValid } = validateRegisterTodo(req.body);

    if(!isValid) return res.status(400).json(errors)
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();

    const newTodo = new Todo({
        description: req.body.description,
        done: req.body.done,
        inProgress: req.body.inProgress,
        dueDate: req.body.dueDate ? req.body.dueDate : `${todayYear}-${todayMonth}-${todayDay}`,
        tags: []
    })

    newTodo.save()
        .then(newTodo => res.json(newTodo))
        .catch(err => alert("create todo request failed"))
})
//working on
//question, 1
router.get("/1/", (req, res) => {
    // console.log("12312321",req)
    // const todos = Todo.find();
    // const upcomings = todos.filter(todo => {
    //     !todo.done && !todo.inProgress
    // })
    // return res.json(upcomings)

    // .then(todos => res.json(todos))
    // .catch(err => alert("upcoming fetch failed"))

    Todo.find()
        .then(todos => res.json(todos.filter(todo => {
            !todo.done && !todo.inProgress
        })))
        // .then(upcomings => res.json(upcomings))
        .catch(err => res.status(404).json(err))
    // Todo.find()
    //     .then(todos => res.json(todos))
    //     .catch(err => res.status((404).json(err)))
})

router.delete("/:id", (req, res) => {
    const todo = Todo.findOneAndRemove({_id: req.params.id})
        .then( () => res.json({todoDeleted: "Successfully delete"}))
        .catch( err => res.status(404).json(err))
})

router.put("/:id", (req, res)=> {
    Todo.findOneAndUpdate({_id: req.params.id},
        {
            description: req.body.description,
            done: req.body.done,
            inProgress: req.body.inProgress,
            dueDate: req.body.dueDate,
            tags: req.body.tags
        }, {new: true}, (err, data) => {
            data ? res.json(data) : res.json(err)
        }    
    )
})

module.exports = router;
