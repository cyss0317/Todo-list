import React from 'react';
import {useState } from "react";
import TodoDisplay from "./TodoDisplay"
import * as todoAPIUtil from "../util/todo_util"


const Todos = ({propTodos, title, status, setPropTodos, number, setProgress, setUnDones, setDones}) => {
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
                            <button>submit</button>
                        </form>

                    </div>
                </div>
            </div>
        )

}

export default Todos
