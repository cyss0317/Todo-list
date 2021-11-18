import axios from 'axios';

export const createTodo = async data => {
    try{
        const res = await axios.post('/api/todos/create', data)
        return res
    } catch(err){
        alert("Create request wasn't succesfully done, please try again")
        alert(err)
    }
}

export const updateTodo = async todo => {
    try{
        const res = await axios.put(`/api/todos/${todo.id}`, todo)
        return res
    } catch(err){
        alert("Update request wasn't successfully done, please try again")
        alert(err)
    }
}

export const deleteTodo = async todoId => {
    try{
        const res = await axios.delete(`/api/todos/${todoId}`)
        return res
    } catch(err){
        alert("Delete request wasn't successfully done, please try again")
        alert(err)
    }
}

export const getTodo = async todoId => {
    try{
        const res = await axios.get(`/api/todos/${todoId}`)
        return res
    } catch(err){
        alert("Couldn't find the todo, please try again")
        alert(err)
    }
}

export const getTodos = async () => {
    try{
        const res = await axios.get(`/api/todos/`)
        return res
    } catch(err){
        alert("Couldn't fetch todos, please try again")
        alert(err)
    }
}