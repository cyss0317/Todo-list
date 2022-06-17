import React from "react";
import { useState } from "react";
import TodoDisplay from "./TodoDisplay";
import * as todoAPIUtil from "../../sources/todos/api";

const Todos = ({
  data,
  title,
  status,
  setData,
  setProgress,
  setUnDones,
  setDones,
  className,
}) => {
  const currentDate = new Date();
  const todayMonth = currentDate.getUTCMonth() + 1;
  const todayDay =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : currentDate.getUTCDate();
  const todayYear = currentDate.getUTCFullYear();

  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState(
    `${todayYear}-${todayMonth}-${todayDay}`
  );
  const [todos, setTodos] = useState(data);
  const modal = document.querySelector(`.modal-background-${status}`);
  const textArea = document.querySelector(`.description-input-${status}`);

  window.modal = modal;

  let newTodo = {
    description: newDescription,
    dueDate: newDueDate,
    done: status === "done",
    inProgress: status === "inProgress",
    tags: [],
  };

  const setDescriptionOnChange = (e) => {
    setNewDescription(e.target.value);
  };

  const openModal = () => {
    textArea.value = "";
    modal.style.display = "block";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  const createSubmit = async (e, status) => {
    e.preventDefault();
    textArea.value = "";
    todoAPIUtil.createTodo(newTodo);
    await setData((old) => [...old, newTodo]);
    closeModal();
  };

  return (
    <div className={`${className} todos-container`}>
      <div className={`${className} title-addButton`}>
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <button onClick={openModal} className="addTodo">
          + Add new {title} todo{" "}
        </button>
      </div>
      {data.length !== 0 ? (
        data.map((todo, i) => (
          <TodoDisplay
            setProgress={setProgress}
            setDones={setDones}
            setUnDones={setUnDones}
            propTodos={data}
            todos={todos}
            setTodos={setData}
            status={status}
            key={i}
            id={todo._id}
            propTodo={todo}
          />
        ))
      ) : (
        <p style={{ fontSize: "1.5rem" }}>There is nothing todo in {status}</p>
      )}
      <div
        onClick={closeModal}
        id="modal-background"
        className={`modal-background-${status}`}
        style={{ display: "none" }}
      >
        <div className="modal-child" onClick={(e) => e.stopPropagation()}>
          <div className="status-x-button">
            <div>Create {title} todos</div>
            <button
              onClick={(e) => closeModal(e)}
              id="modal-close-button"
              className="X-button"
            >
              X
            </button>
          </div>
          <form
            className="info-section"
            onSubmit={(e, status) => createSubmit(e, status)}
          >
            <label htmlFor="descrition">Description</label>
            <textarea
              id="description-input"
              className={`description-input-${status}`}
              type="text"
              value={newDescription}
              onChange={(e) => setDescriptionOnChange(e)}
            />

            <label htmlFor="dueDate">Due date: </label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            {/* <input type="date" value={newDueDate} onChange={e => onChangeSetDate(e)}/> */}
            <button>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Todos;
