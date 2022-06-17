import { Todo } from "./api";
import { TodoData } from "./types";

interface TodoApiHook {
  fetchUpcomings: () => Promise<Array<TodoData>>;
  fetchProgress: () => Promise<Array<TodoData>>;
  fetchDones: () => Promise<Array<TodoData>>;
}

export function useTodoApi(): TodoApiHook {
  async function fetchUpcomings() {
    const response = await Todo.getUpcoming();
    const data = response.data;
    return data;
  }

  async function fetchProgress() {
    const response = await Todo.getInProgress();
    const data = await response.data;
    return data;
  }

  async function fetchDones() {
    const response = await Todo.getDone();
    const data = await response.data;
    return data;
  }

  return {
    fetchUpcomings,
    fetchProgress,
    fetchDones,
  };
}
