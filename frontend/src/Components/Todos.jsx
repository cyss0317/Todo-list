import React from 'react';
import {useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status, setPropTodos, number, setProgress, setUnDones, setDones}) => {
    const [todos, setTodos] = useState([]);
    const [unDones, setUnDones] = useState([]);
    const [progress, setProgress] = useState([]);
    const [dones, setDones] = useState([]);

    useEffect(() => {
      const fetchTodos = async () => {
        const response = await todoAPIUtil.getTodos();
        const data = await response.data;
        setTodos((old) => data);
      };
      fetchTodos();
      todos.forEach((todo) => {
        if (!todo.done && !todo.inProgress) {
          setUnDones((old) => [...old, todo]);
        } else if (todo.done) {
          setDones((old) => [...old, todo]);
        } else if (todo.inProgress) {
          setProgress((old) => [...old, todo]);
        }
      });
    }, []);

    async function fetchUpcomings() {
      const response = await todoAPIUtil.getUpcoming();
      const data = await response.data;
      setUnDones((old) => data);
    }

    useEffect(() => {
      fetchUpcomings();
    }, [unDones.length]);

    async function fetchProgress() {
      const response = await todoAPIUtil.getInProgress();
      const data = await response.data;
      setProgress((old) => data);
    }
    useEffect(() => {
      fetchProgress();
    }, [progress.length]);

    async function fetchDones() {
      const response = await todoAPIUtil.getDone();
      const data = await response.data;
      setDones((old) => data);
    }
    useEffect(() => {
      fetchDones();
    }, [dones.length]);

    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate() < 10 ? `0${currentDate.getUTCDate()}` : currentDate.getUTCDate() ;
    const todayYear = currentDate.getUTCFullYear();
    
    const [newDescription, setNewDescription] = useState("")
    const [newDueDate, setNewDueDate] = useState(`${todayYear}-${todayMonth}-${todayDay}`)
    const [todos, setTodos] = useState(propTodos)
    const modal = document.querySelector(`.modal-background-${status}`)
    const textArea = document.querySelector(`.description-input-${status}`)

    window.modal = modal

    let newTodo = ({
        description: newDescription,
        dueDate: newDueDate,
        done: status === "done",
        inProgress: status === "inProgress",
        tags: []
    })


    const setDescriptionOnChange = (e) => {
        setNewDescription(e.target.value)
    }

    const openModal = e => {

        e.preventDefault()
        textArea.value = ""
        modal.style.display = "block"
    }

    
    const closeModal = e => {
        modal.style.display = "none"
    }
    
    const createSubmit = async (e, status) => {
        e.preventDefault()
        textArea.value = ""
        todoAPIUtil.createTodo(newTodo)
        await setPropTodos(old => [...old, newTodo])
        closeModal()
    }
    
        return (
            <div  className="todos-container">
                <div className="title-addButton">
                    <div className="title-container">
                        <h1 className="title">{title}</h1>
                    </div>
                    <button onClick={e => openModal(e)} className="addTodo">+ Add new {title} todo </button>
                </div>
                {
                    propTodos.length !== 0 ?
                    propTodos.map((todo, i) => (
                        <TodoDisplay setProgress={setProgress} setDones={setDones} setUnDones={setUnDones} propTodos={propTodos} todos={todos}
                         setTodos={setPropTodos} status={status} key={i} id={todo._id} propTodo={todo} />
                    ))
                    :
                    <p style={{fontSize: "1.5rem"}}>There is nothing todo in {status}</p>
                }
                <div onClick={e => closeModal(e)} id="modal-background" className={`modal-background-${status}`} style={{ display: "none" }}>
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        <div className="status-x-button">
                        <div>Create {title} todos</div>
                            <button onClick={e => closeModal(e)}id="modal-close-button" className="X-button">X</button>
                        </div>
                        <form className="info-section" onSubmit={(e, status) => createSubmit(e, status)}>
                            <label htmlFor="descrition">Description</label>
                            <textarea id="description-input" className={`description-input-${status}`} type="text" value={newDescription} 
                                onChange={e => setDescriptionOnChange(e)}/>
                            
                            <label htmlFor="dueDate">Due date:  </label>
                            <input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)}/>
                            {/* <input type="date" value={newDueDate} onChange={e => onChangeSetDate(e)}/> */}
                            <button>submit</button>
                        </form>

                    </div>
                </div>
            </div>
        )

}

export default Todos
