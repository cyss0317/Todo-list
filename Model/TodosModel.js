const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({

    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    inProgress: {
        type: Boolean,
        required: true
    },
    dueDate:{
        type: String,
        required: true
    },
    tags:{
        type: Array
    }
}
);

const Todo = mongoose.model("todo", TodoSchema)
module.exports = Todo;
