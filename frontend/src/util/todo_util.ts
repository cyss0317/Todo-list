import axios from "axios";
import { TodoData, TodoId, TodoPartialUpdate } from "./types";
import { AxiosPromise } from "axios";

export const createTodo = async (
  data: TodoData
): Promise<AxiosPromise<TodoData>> => {
  try {
    const res = await axios.post("/api/todos/create", data);
    return res;
  } catch (err) {
    // alert(`createTodo request failed, because ${err}`)
    throw new Error(`Failed to create Todo ${err}`);
  }
};

export const updateTodo = async (
  todo_id: string,
  todo: TodoPartialUpdate
): Promise<AxiosPromise<any>> => {
  try {
    const res = await axios.put(`/api/todos/${todo_id}`, todo);
    return res;
  } catch (err) {
    // alert(`updateTodo request failed, because ${err}`)
    throw new Error(`Failed to update Todo ${err}`);
  }
};

export const fetchUpcomings = async (): Promise<AxiosPromise<any>> => {
  try {
    const res = await axios.get(`/api/todos/upcomings`);
    return res;
  } catch (err) {
    // alert(`fetchUpcomings request failed, because ${err}`)
    throw new Error(`Failed to fetch upcoming Todos ${err}`);
  }
};

export const deleteTodo = async (
  todoId: TodoId
): Promise<AxiosPromise<void>> => {
  try {
    const res = await axios.delete(`/api/todos/${todoId}`);
    return res;
  } catch (err) {
    // alert(`deleteTodo request failed, because ${err}`)
    throw new Error(`Failed to delete Todo ${err}`);
  }
};

export const getTodo = async (
  todoId: TodoId
): Promise<AxiosPromise<TodoData>> => {
  try {
    const res = await axios.get(`/api/todos/${todoId}`);
    return res;
  } catch (err) {
    // alert(`getTodo request failed, because ${err}`)
    throw new Error(`Failed to fetch Todo ${err}`);
  }
};

export const getTodos = async (): Promise<AxiosPromise<Array<TodoData>>> => {
  try {
    const res = await axios.get(`/api/todos/`);
    return res;
  } catch (err) {
    // alert(`getTodos request failed, because ${err}`)
    throw new Error(`Failed to fetch Todos ${err}`);
  }
};

export const getUpcoming = async (): Promise<AxiosPromise<Array<TodoData>>> => {
  try {
    const res = await axios.get(`/api/todos/upcoming`);
    return res;
  } catch (err) {
    // alert(`getUpcomings request failed, because ${err}`)
    throw new Error(`Failed to fetch upcoming Todos ${err}`);
  }
};

export const getInProgress = async (): Promise<
  AxiosPromise<Array<TodoData>>
> => {
  try {
    const res = await axios.get(`/api/todos/inProgress`);
    return res;
  } catch (err) {
    // alert(`getInProgress request failed, because ${err}`)
    throw new Error(`Failed to fetch inProgress Todos ${err}`);
  }
};

export const getDone = async (): Promise<AxiosPromise<Array<TodoData>>> => {
  try {
    const res = await axios.get(`/api/todos/done`);
    return res;
  } catch (err) {
    // alert(`getDone request failed, because ${err}`)
    throw new Error(`Failed to fetch done Todos ${err}`);
  }
};
