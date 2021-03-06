import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@material-ui/core";

import Todos from "components/todos/Todos";
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
    <Box p={3} sx={{ display: "block", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Todos
          setProgress={setProgress}
          setDones={setDones}
          setUnDones={setUpcomings}
          setData={setUpcomings}
          status="upcoming"
          data={upcomings}
          title="Upcoming"
          className="todo-list"
        />
        <Todos
          setProgress={setProgress}
          setDones={setDones}
          setUnDones={setUpcomings}
          setData={setProgress}
          status="inProgress"
          data={progress}
          title="In Progress"
          className="progress"
        />
        <Todos
          setProgress={setProgress}
          setDones={setDones}
          setUnDones={setUpcomings}
          setData={setDones}
          status="done"
          data={dones}
          title="Done"
          className="done"
        />
      </Box>
    </Box>
  );
};

export default FullLayout;
