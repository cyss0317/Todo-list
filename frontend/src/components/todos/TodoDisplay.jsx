import React from "react";
import { useState, useEffect } from "react";
import * as todoAPIUtil from "util/todo_util";

const TodoDisplay = ({
  props,
  propTodo,
  dones,
  progress,
  propTodos,
  unDones,
  id,
  status,
  todos,
  setTodos,
  setDones,
  setUnDones,
  setProgress,
}) => {
  const [todo, setTodo] = useState(propTodo);
  const [tags, setTags] = useState(propTodo.tags);
  const [tag, setTag] = useState("");
  const [newDueDate, setNewDueDate] = useState(propTodo.dueDate);
  const [numDay, setNumDay] = useState(new Date(propTodo.dueDate).getDay());
  const [day, setDay] = useState(numberToDay(numDay));
  // numberToDay(new Date('2021-12-11').getDay())

  let changeButton = document.getElementById(`${id}`);

  useEffect(() => {
    setDay(numberToDay(numDay));
  }, [newDueDate]);

  function numberToDay(number) {
    switch (number) {
      case 6:
        return "Sun";
      case 0:
        return "Mon";
      case 1:
        return "Tues";
      case 2:
        return "Wednes";
      case 3:
        return "Thurs";
      case 4:
        return "Fri";
      case 5:
        return "Satur";
      default:
        break;
    }
  }

  const onClickUpdateStatus = (e) => {
    e.preventDefault();
    let newTodo = {};
    const answer = window.confirm(`Move this to ${e.target.innerHTML}?`);
    const newCurrentTodos = propTodos.filter((todo) => todo._id !== id);

    if (!answer) return;
    setTodos((old) => newCurrentTodos);
    if (answer && e.target.value === "Done") {
      //start from here, when it moves from inprogress to done, it duplicates it
      newTodo = {
        id: id,
        description: todo.description,
        dueDate: todo.dueDate,
        done: true,
        inProgress: false,
        tags: tags,
      };
      setTodo((old) => newTodo);
      setDones((old) => [...old, newTodo]);
    } else if (answer && e.target.value === "In Progress") {
      newTodo = {
        id: id,
        description: todo.description,
        dueDate: todo.dueDate,
        done: false,
        inProgress: true,
        tags: tags,
      };
      setTodo((old) => newTodo);
      setProgress((old) => [...old, newTodo]);
    } else if (answer && e.target.value === "Upcoming") {
      newTodo = {
        id: id,
        description: todo.description,
        dueDate: todo.dueDate,
        done: false,
        inProgress: false,
        tags: tags,
      };

      setTodo((old) => newTodo);
      setUnDones((old) => [...old, newTodo]);
    }
    todoAPIUtil.updateTodo(newTodo);
  };

  const deleteTodo = (e) => {
    e.preventDefault();
    if (todo.tags.length >= 3) {
      const return_value = prompt(
        "Tags length more than 3 require password to delete"
      );
      if (return_value === "1111") {
        const newTodos = propTodos.filter((todo) => todo._id !== id);
        setTodos((old) => newTodos);
        todoAPIUtil.deleteTodo(id);
      } else {
        window.alert("password did not match");
      }
    } else {
      if (window.confirm("Do you want to delete this Todo?")) {
        const newTodos = propTodos.filter((todo) => todo._id !== id);
        setTodos((old) => newTodos);
        todoAPIUtil.deleteTodo(id);
      }
    }
  };

  let pastDue = undefined;

  const dueDateOnChange = (e) => {
    setNewDueDate(e.target.value);
    setNumDay(new Date(e.target.value).getDay());
    changeButton =
      changeButton === null ? document.getElementById(`${id}`) : changeButton;
    changeButton.style.display = "block";
  };

  const dueDateSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: id,
      description: todo.description,
      dueDate: newDueDate,
      done: todo.done,
      inProgress: todo.inProgress,
      tags: tags,
    };

    setTodo((old) => newTodo);
    todoAPIUtil.updateTodo(newTodo);
    changeButton.style.display = "none";
  };

  const submitTag = (e) => {
    e.preventDefault();
    if (tag.length > 0) {
      const tagsDup = [...tags, tag];
      setTags((old) => [...old, tag]);
      const newTodo = {
        id: id,
        description: todo.description,
        dueDate: todo.dueDate,
        done: todo.done,
        inProgress: todo.inProgress,
        tags: tagsDup,
      };
      setTodo(newTodo);
      todoAPIUtil.updateTodo(newTodo);
    }
    setTag("");
  };

  const removeTag = (e) => {
    e.preventDefault();
    const tagIndex = e.target.value;
    const tempTags = [...tags];
    tempTags.splice(tagIndex, 1);
    setTags(tempTags);
    todoAPIUtil.updateTodo({
      id: id,
      description: todo.description,
      dueDate: todo.dueDate,
      done: todo.done,
      inProgress: todo.inProgress,
      tags: tempTags,
    });
  };

  const pastDueRendering = (status) => {
    if (status === "upcoming") {
      return pastDue ? <p style={{ color: "red" }}>Past Due</p> : <></>;
    }
    if (status === "inProgress") {
      return pastDue ? <p style={{ color: "red" }}>Past Due</p> : <></>;
    }
    if (status === "done") {
      return <p style={{ color: "#3992EB" }}>DONE</p>;
    }
  };

  const statusButtons = (status) => {
    if (status === "upcoming") {
      return (
        <div className="status-buttons">
          <p>Move to: </p>
          <button value="In Progress" onClick={(e) => onClickUpdateStatus(e)}>
            In Progress
          </button>
          <button value="Done" onClick={(e) => onClickUpdateStatus(e)}>
            Done
          </button>
        </div>
      );
    } else if (status === "inProgress") {
      return (
        <div className="status-buttons">
          <p>Move to: </p>
          <button value="Upcoming" onClick={(e) => onClickUpdateStatus(e)}>
            Upcoming
          </button>
          <button value="Done" onClick={(e) => onClickUpdateStatus(e)}>
            Done
          </button>
        </div>
      );
    } else if (status === "done") {
      return (
        <div className="status-buttons">
          <p>Move to: </p>
          <button value="Upcoming" onClick={(e) => onClickUpdateStatus(e)}>
            Upcoming
          </button>
          <button value="In Progress" onClick={(e) => onClickUpdateStatus(e)}>
            In Progress
          </button>
        </div>
      );
    }
  };

  const currentDate = new Date();
  const todayMonth = currentDate.getUTCMonth() + 1;
  const todayDay = currentDate.getUTCDate();
  const todayYear = currentDate.getUTCFullYear();
  const [dueYear, dueMonth, dueDay] = newDueDate.split("-");

  if (
    parseInt(dueYear) < todayYear ||
    parseInt(dueMonth) < todayMonth ||
    parseInt(dueDay) < todayDay
  )
    pastDue = true;

  if (todo !== undefined) {
    return (
      <div className="todo" value={id}>
        <div className="todo-sub">
          <div>
            <div className="description-and-X">
              <p className="description">{todo.description}</p>
              <button
                onClick={(e) => deleteTodo(e)}
                style={{ display: "block" }}
                className="X-button"
              >
                X
              </button>
            </div>
            {tags.map((tag, i) => (
              <button
                className="tag-button"
                onClick={(e) => removeTag(e)}
                value={i}
                key={i}
              >
                {tag}
              </button>
            ))}
            <form className="tag-input" onSubmit={(e) => submitTag(e)}>
              <input
                type="text"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                placeholder="Add Tags to this"
              />
            </form>
            <div className="change-dueDates-container">
              <div className="due-date-hover-effect">
                <span>Due: {day}day</span>
                <input
                  type="date"
                  className="dueDate"
                  onClick={(e) => (changeButton.style = "block")}
                  onChange={(e) => dueDateOnChange(e)}
                  defaultValue={newDueDate}
                ></input>
              </div>
              <button
                id={id}
                className="change-dueDate-button"
                onClick={(e) => dueDateSubmit(e)}
                style={{ display: "none" }}
              >
                Click to change
              </button>
            </div>
            {pastDueRendering(status)}
          </div>
          {statusButtons(status)}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default TodoDisplay;
