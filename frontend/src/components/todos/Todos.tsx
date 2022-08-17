import React from "react";
import { useState } from "react";
import {
  Dialog,
  Button,
  IconButton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";
// import CloseIcon from "@mui/icons-material/Close";

import { Todo } from "sources/todos/types";
import { useTodoApi } from "sources/todos/hooks";

import TodoDisplay from "./TodoDisplay";

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

  const currentDate = new Date();
  const todayMonth = currentDate.getUTCMonth() + 1;
  const todayDay =
    currentDate.getUTCDate() < 10
      ? `0${currentDate.getUTCDate()}`
      : currentDate.getUTCDate();
  const todayYear = currentDate.getUTCFullYear();
  const [newDueDate, setNewDueDate] = useState<string>(
    `${todayYear}-${todayMonth}-${todayDay}`
  );

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>(data);

  let newTodo = {
    description: description,
    dueDate: newDueDate,
    done: status === "done",
    inProgress: status === "inProgress",
    tags: [],
  };

  const createSubmit = async () => {
    setDescription("");
    const createdTodo = await createTodo(newTodo);
    await setData((old) => [...old, createdTodo]);
    setOpenModal(false);
  };

  React.useEffect(() => {}, [createTodo]);

  return (
    <Box className={`${className} todos-container`}>
      <Box className={`${className} title-addButton`}>
        <Box className="title-container">
          <Typography variant="h1" className="title">
            {title}
          </Typography>
        </Box>
        <Button onClick={() => setOpenModal(true)} className="addTodo">
          + Add new {title} todo{" "}
        </Button>
      </Box>
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
        <Typography style={{ fontSize: "1.5rem" }}>
          There is nothing todo in {status}
        </Typography>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: "calc(60vw)", position: "relative" }}>
          <Box>
            <Typography variant="h4">Create {title} todos</Typography>
            <IconButton
              onClick={() => setOpenModal(false)}
              id="modal-close-button"
              className="X-button"
            >
              FeatherIcon X
            </IconButton>
          </Box>
          <form className="info-section" onSubmit={createSubmit}>
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
            <Button type="submit">submit</Button>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Todos;
