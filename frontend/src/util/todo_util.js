import axios from "axios";

export const createTodo = async (data) => {
  try {
    const res = await axios.post("/api/todos/create", data);
    return res;
  } catch (err) {
    // alert(`createTodo request failed, because ${err}`)
    console.log(err);
  }
};

export const updateTodo = async (todo) => {
  try {
    const res = await axios.put(`/api/todos/${todo.id}`, todo);
    return res;
  } catch (err) {
    // alert(`updateTodo request failed, because ${err}`)
    console.log(err);
  }
};

export const fetchUpcomings = async () => {
  try {
    const res = await axios.get(`/api/todos/upcomings`);
    return res;
  } catch (err) {
    // alert(`fetchUpcomings request failed, because ${err}`)
    console.log(err);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const res = await axios.delete(`/api/todos/${todoId}`);
    return res;
  } catch (err) {
    // alert(`deleteTodo request failed, because ${err}`)
    console.log(err);
  }
};

export const getTodo = async (todoId) => {
  try {
    const res = await axios.get(`/api/todos/${todoId}`);
    return res;
  } catch (err) {
    // alert(`getTodo request failed, because ${err}`)
    console.log(err);
  }
};

export const getTodos = async () => {
  try {
    const res = await axios.get(`/api/todos/`);
    return res;
  } catch (err) {
    // alert(`getTodos request failed, because ${err}`)
    console.log(err);
  }
};

export const getUpcoming = async () => {
  try {
    const res = await axios.get(`/api/todos/upcoming`);
    return res;
  } catch (err) {
    // alert(`getUpcomings request failed, because ${err}`)
    console.log(err);
  }
};

export const getInProgress = async () => {
  try {
    const res = await axios.get(`/api/todos/inProgress`);
    return res;
  } catch (err) {
    // alert(`getInProgress request failed, because ${err}`)
    console.log(err);
  }
};

export const getDone = async () => {
  try {
    const res = await axios.get(`/api/todos/done`);
    return res;
  } catch (err) {
    // alert(`getDone request failed, because ${err}`)
    console.log(err);
  }
};
