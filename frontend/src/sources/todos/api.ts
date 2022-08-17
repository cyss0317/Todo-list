import axios, { AxiosPromise } from "axios";
import { Todo, TodoId, TodoPartialUpdate } from "./types";

declare global {
  interface Window {
    Todo: any;
  }
}

export default class Todos {
  static baseUrl = "/api/todos";

  static createTodo = async (data: Todo): Promise<AxiosPromise<Todo>> => {
    try {
      const res = await axios.post(`${this.baseUrl}/create`, data);
      return res;
    } catch (err) {
      // alert(`createTodo request failed, because ${err}`)
      throw new Error(`Failed to create Todo ${err}`);
    }
  };

  static updateTodo = async (
    todo_id: string,
    todo: TodoPartialUpdate
  ): Promise<AxiosPromise<any>> => {
    try {
      const res = await axios.put(`${this.baseUrl}/${todo_id}`, todo);
      return res;
    } catch (err) {
      // alert(`updateTodo request failed, because ${err}`)
      throw new Error(`Failed to update Todo ${err}`);
    }
  };

  static fetchUpcomings = async (): Promise<AxiosPromise<any>> => {
    try {
      const res = await axios.get(`${this.baseUrl}/upcoming`);
      return res;
    } catch (err) {
      // alert(`fetchUpcomings request failed, because ${err}`)
      throw new Error(`Failed to fetch upcoming Todos ${err}`);
    }
  };

  static deleteTodo = async (todoId: TodoId): Promise<AxiosPromise<void>> => {
    try {
      const res = await axios.delete(`${this.baseUrl}/${todoId}`);
      return res;
    } catch (err) {
      // alert(`deleteTodo request failed, because ${err}`)
      throw new Error(`Failed to delete Todo ${err}`);
    }
  };

  static getTodo = async (todoId: TodoId): Promise<AxiosPromise<Todo>> => {
    try {
      const res = await axios.get(`${this.baseUrl}/${todoId}`);
      return res;
    } catch (err) {
      // alert(`getTodo request failed, because ${err}`)
      throw new Error(`Failed to fetch Todo ${err}`);
    }
  };

  static getTodos = async (): Promise<AxiosPromise<Array<Todo>>> => {
    try {
      const res = await axios.get(`${this.baseUrl}`);
      return res;
    } catch (err) {
      // alert(`getTodos request failed, because ${err}`)
      throw new Error(`Failed to fetch Todos ${err}`);
    }
  };

  static getUpcoming = async (): Promise<AxiosPromise<Array<Todo>>> => {
    try {
      const res = await axios.get(`${this.baseUrl}/upcoming`);
      return res;
    } catch (err) {
      // alert(`getUpcomings request failed, because ${err}`)
      throw new Error(`Failed to fetch upcoming Todos ${err}`);
    }
  };

  static getInProgress = async (): Promise<AxiosPromise<Array<Todo>>> => {
    try {
      const res = await axios.get(`${this.baseUrl}/inProgress`);
      return res;
    } catch (err) {
      // alert(`getInProgress request failed, because ${err}`)
      throw new Error(`Failed to fetch inProgress Todos ${err}`);
    }
  };

  static getDone = async (): Promise<AxiosPromise<Array<Todo>>> => {
    try {
      const res = await axios.get(`${this.baseUrl}/done`);
      return res;
    } catch (err) {
      // alert(`getDone request failed, because ${err}`)
      throw new Error(`Failed to fetch done Todos ${err}`);
    }
  };
}
