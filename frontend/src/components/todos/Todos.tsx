import React from "react";
import { useState } from "react";
import { Dialog, Box, TextField, Typography } from "@material-ui/core";

import { Todo } from "sources/todos/types";
import { useTodoApi } from "sources/todos/hooks";

import TodoDisplay from "./TodoDisplay";
import * as todoAPIUtil from "../../sources/todos/api";

interface TodosProps {
  setProgress: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setDones: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setUnDones: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setData: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  status: string;
  data: Array<Todo>;
  title: string;
  className: string;
}

const Todos = ({
  data,
  title,
  status,
  setData,
  setProgress,
  setUnDones,
  setDones,
  className,
}: TodosProps) => {
  const { createTodo } = useTodoApi();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentDate = new Date();
  const todayMonth = currentDate.getUTCMonth() + 1;
  const todayDay =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : currentDate.getUTCDate();
  const todayYear = currentDate.getUTCFullYear();

  const [description, setDescription] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>(
    `${todayYear}-${todayMonth}-${todayDay}`
  );
  const [todos, setTodos] = useState<Array<Todo>>(data);

  let newTodo = {
    description: description,
    dueDate: newDueDate,
    done: status === "done",
    inProgress: status === "inProgress",
    tags: [],
  };

  const createSubmit = async (e: any) => {
    setDescription("")
    const createdTodo = await createTodo(newTodo);
    await setData((old) => [...old, createdTodo]);
    setOpenModal(false);
  };

  React.useEffect(() => {

  }, [createTodo])

  return (
    <div className={`${className} todos-container`}>
      <div className={`${className} title-addButton`}>
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <button onClick={() => setOpenModal(true)} className="addTodo">
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
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <div
          id="modal-background"
          className={`modal-background-${status}`}
          style={{ display: "none" }}
        >
          <div className="modal-child" onClick={(e) => e.stopPropagation()}>
            <div className="status-x-button">
              <div>Create {title} todos</div>
              <button
                onClick={() => setOpenModal(false)}
                id="modal-close-button"
                className="X-button"
              >
                X
              </button>
            </div>
            <form
              className="info-section"
              onSubmit={(e) => createSubmit(e)}
            >
              <label htmlFor="descrition">Description</label>
              <TextField
                id="description-input"
                className={`description-input-${status}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
      </Dialog>
    </div>
  );
};

export default Todos;
