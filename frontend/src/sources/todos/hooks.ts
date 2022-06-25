import { Todo } from "./api";
import { TodoData, TodoId } from "./types";

interface TodoApiHook {
  getOne: (id: TodoId) => Promise<TodoData>;
  fetchUpcomings: () => Promise<Array<TodoData>>;
  fetchProgress: () => Promise<Array<TodoData>>;
  fetchDones: () => Promise<Array<TodoData>>;
  createTodo: (todo: TodoData) => Promise<TodoData>;
  updateTodo: (todo: TodoData) => Promise<TodoData>;
  deleteTodo: (id: TodoId) => void;
}

export function useTodoApi(): TodoApiHook {
  async function createTodo(todo: TodoData) {
    const response = await Todo.createTodo(todo);
    const data = response.data;
    return data;
  }

  async function updateTodo(todo: TodoData) {
    const response = await Todo.updateTodo(todo._id, todo);
    const data = response.data;
    return data;
  }

  async function deleteTodo(id: TodoId) {
    return await Todo.deleteTodo(id);
  }

  async function getOne(id: TodoId) {
    const response = await Todo.getTodo(id);
    const data = response.data;
    return data;
  }

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
    createTodo,
    updateTodo,
    deleteTodo,
    getOne,
  };
}
