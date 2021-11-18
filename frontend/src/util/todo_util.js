import axios from 'axios';

export const createTodo = async data => {
    const res = await axios.post('/api/todos/create', data)
    return res
}

export const updateTodo = async todo => {
    try{
        const res = await axios.put(`/api/todos/${todo.id}`, todo)
        return res
    }
}

export const deleteTodo = async todoId => {
    const res = await axios.delete(`/api/todos/${todoId}`)
    return res
}

export const getTodo = async todoId => {
    const res = await axios.get(`/api/todos/${todoId}`)
    return res
}

export const getTodos = async () => {
    const res = await axios.get(`/api/todos/`)
    return res
}