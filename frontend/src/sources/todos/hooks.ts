import { Todo, TodoId } from "sources/todos/types";
import Todos from "./api";

interface TodoApiHook {
  getOne: (id: TodoId) => Promise<Todo>;
  fetchUpcomings: () => Promise<Array<Todo>>;
  fetchProgress: () => Promise<Array<Todo>>;
  fetchDones: () => Promise<Array<Todo>>;
  createTodo: (todo: Todo) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: TodoId) => void;
}

export function useTodoApi(): TodoApiHook {
  async function createTodo(todo: Todo) {
    const response = await Todos.createTodo(todo);
    const data = response.data;
    return data;
  }

  async function updateTodo(todo: Todo) {
    const response = await Todos.updateTodo(todo._id, todo);
    const data = response.data;
    return data;
  }

  async function deleteTodo(id: TodoId) {
    return await Todos.deleteTodo(id);
  }

  async function getOne(id: TodoId) {
    const response = await Todos.getTodo(id);
    const data = response.data;
    return data;
  }

  async function fetchUpcomings() {
    const response = await Todos.getUpcoming();
    const data = response.data;
    return data;
  }

  async function fetchProgress() {
    const response = await Todos.getInProgress();
    const data = await response.data;
    return data;
  }

  async function fetchDones() {
    const response = await Todos.getDone();
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
