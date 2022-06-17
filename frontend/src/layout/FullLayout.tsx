import React from "react";
import Todos from "components/todos/Todos";
import { useState, useEffect, useMemo } from "react";
import * as todoAPIUtil from "util/todo_util";

const FullLayout = () => {
  const [todos, setTodos] = useState([]);
  const [unDones, setUnDones] = useState([]);
  const [progress, setProgress] = useState([]);
  const [dones, setDones] = useState([]);

  async function fetchUpcomings() {
    const response = await todoAPIUtil.getUpcoming();
    console.log("response", response);
    const data = await response.data;
    setUnDones((old) => data);
  }
  useMemo(() => {
    fetchUpcomings();
  }, [unDones.length]);

  async function fetchProgress() {
    const response = await todoAPIUtil.getInProgress();
    const data = await response.data;
    setProgress((old) => data);
  }
  useMemo(() => {
    fetchProgress();
  }, [progress.length]);

  async function fetchDones() {
    const response = await todoAPIUtil.getDone();
    const data = await response.data;
    setDones((old) => data);
  }
  useMemo(() => {
    fetchDones();
  }, [dones.length]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await todoAPIUtil.getTodos();
      const data = await response.data;
      setTodos((old) => data);
    };
    fetchTodos();
    todos.forEach((todo) => {
      if (!todo.done && !todo.inProgress) {
        setUnDones((old) => [...old, todo]);
      } else if (todo.done) {
        setDones((old) => [...old, todo]);
      } else if (todo.inProgress) {
        setProgress((old) => [...old, todo]);
      }
    });
  }, []);

  return (
    <>
      <Todos
        setProgress={setProgress}
        setDones={setDones}
        setUnDones={setUnDones}
        key="1"
        setPropTodos={setUnDones}
        status="upcoming"
        propTodos={unDones}
        title="Upcoming"
        className="todo-list"
      />
      <Todos
        setProgress={setProgress}
        setDones={setDones}
        setUnDones={setUnDones}
        key="2"
        setPropTodos={setProgress}
        status="inProgress"
        propTodos={progress}
        title="In Progress"
        className="progress"
      />
      <Todos
        setProgress={setProgress}
        setDones={setDones}
        setUnDones={setUnDones}
        key="3"
        setPropTodos={setDones}
        status="done"
        propTodos={dones}
        title="Done"
        className="done"
      />
    </>
  );
};

export default FullLayout;
