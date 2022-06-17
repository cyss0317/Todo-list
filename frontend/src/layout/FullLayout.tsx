import React from "react";
import Todos from "components/todos/Todos";
import { useState, useEffect, useMemo } from "react";
import { TodoData } from "sources/todos/types";
import { useTodoApi } from "sources/todos/hooks";

const FullLayout = () => {
  const { fetchUpcomings, fetchProgress, fetchDones } = useTodoApi();

  const [upcomings, setUpcomings] = useState<Array<TodoData>>([]);
  const [progress, setProgress] = useState<Array<TodoData>>([]);
  const [dones, setDones] = useState<Array<TodoData>>([]);

  useEffect(() => {
    fetchUpcomings().then((todos) => setUpcomings(todos));
    fetchProgress().then((todos) => setProgress(todos));
    fetchDones().then((todos) => setDones(todos));
  }, []);

  return (
    <>
      <Todos
        setProgress={setProgress}
        setDones={setDones}
        setUnDones={setUpcomings}
        key="1"
        setPropTodos={setUpcomings}
        status="upcoming"
        propTodos={upcomings}
        title="Upcoming"
        className="todo-list"
      />
      <Todos
        setProgress={setProgress}
        setDones={setDones}
        setUnDones={setUpcomings}
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
        setUnDones={setUpcomings}
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
