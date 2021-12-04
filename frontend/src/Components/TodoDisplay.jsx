import React from 'react'
import {useState, useEffect} from "react"
import * as todoAPIUtil from "../util/todo_util"


const TodoDisplay = ({props, propTodo, dones, progress, propTodos, unDones, id, status, todos, setTodos, setDones, setUnDones, setProgress}) => {
    const [todo, setTodo] = useState(propTodo)
    const [tags, setTags] = useState(propTodo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(propTodo.dueDate);
    let changeButton = document.getElementById(`${id}`);
    console.log("tododisplay")

    const onClickUpdateStatus =  e => {
        e.preventDefault();
        let newTodo = {};
        const answer = window.confirm(`Move this to ${e.target.innerHTML}?`)
        console.log(e.target.value)
        const newCurrentTodos = propTodos.filter(todo => todo._id !== id )

        if(!answer) return ;
        if(answer && e.target.value === "Done"){
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: true,
                    inProgress: todo.inProgress,
                    tags: tags
                }
            setTodo(old => newTodo) 
            setDones(old => [...old, newTodo])
        } else if (answer && e.target.value === "In Progress") {
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: false,
                    inProgress: true,
                    tags: tags
                }
            setTodo(old => newTodo)
            setProgress(old => [...old, newTodo])
        } else if (answer && e.target.value === "Upcoming"){
            newTodo =
                {
                    id: id,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    done: false,
                    inProgress: false,
                    tags: tags
                }

            setTodo(old => newTodo)
            setUnDones(old => [...old, newTodo])
        }
        setTodos(old => newCurrentTodos)
        todoAPIUtil.updateTodo(newTodo)
    }
    
    if(status === 'upcoming'){
        console.log(`todos ${status}`, propTodos)
        console.log(changeButton)
        console.log(id)
    }
    const deleteTodo = (e) => {
        e.preventDefault();
        const newTodos = propTodos.filter(todo =>  todo._id !== id)
        setTodos(old => newTodos)
        todoAPIUtil.deleteTodo(id)
        // setTodo(old => undefined)
    }
        

    let pastDue = undefined;

    const dueDateOnChange = (e) => {
        console.log(todo)

        setNewDueDate(e.target.value);
        changeButton = changeButton === null ? document.getElementById(`${id}`) : changeButton
        changeButton.style.display = "block"
    }

    const dueDateSubmit = (e) => {
        e.preventDefault()
        let newTodo =
        {
            id: id,
            description: todo.description,
            dueDate: newDueDate,
            done: todo.done,
            inProgress: todo.inProgress,
            tags: tags
        }

        setTodo(old => newTodo)
        todoAPIUtil.updateTodo(newTodo)
        changeButton.style.display = "none"
    }

    const submitTag =  e => {
        e.preventDefault();
        if( tag.length > 0){
            const tagsDup = [...tags, tag]
            setTags(old => [...old, tag]);
            const newTodo = {
                id: id,
                description: todo.description,
                dueDate: todo.dueDate,
                done: todo.done,
                inProgress: todo.inProgress,
                tags: tagsDup
            };
            setTodo(newTodo);
             todoAPIUtil.updateTodo(newTodo)
        }
        setTag("");

    }

    const removeTag = e => {
        e.preventDefault()
        const tagIndex = e.target.value
        const tempTags = [...tags]
        tempTags.splice(tagIndex, 1)
        setTags( tempTags)
        todoAPIUtil.updateTodo(
            {
                id: id,
                description: todo.description,
                dueDate: todo.dueDate,
                done: todo.done,
                inProgress: todo.inProgress,
                tags: tempTags
            }
        )

    }

    const pastDueRendering = (status) => {
        if( status === "upcoming"){
            return(
                pastDue ? <p style={{ color: "red" }}>Past Due</p> : <></>
            )
        }
        if( status === "inProgress"){
            return(
                pastDue ? <p style={{ color: "red" }}>Past Due</p> : <></>
            )
        }
        if( status === "done"){
            return(
                <p style={{ color: "#3992EB" }}>DONE</p>
            )
        } 

    }

    
    const statusButtons = status => {
        if(status === "upcoming"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="In Progress" onClick={e => onClickUpdateStatus(e) }>In Progress</button>
                    <button value="Done" onClick={e => onClickUpdateStatus(e)}>Done</button>
                </div>
            )
        } else if( status === "inProgress"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="Upcoming" onClick={e => onClickUpdateStatus(e)}>Upcoming</button>
                    <button value="Done" onClick={e => onClickUpdateStatus(e) }>Done</button>
                </div>
            )
        } else if(status === "done"){
            return(
                <div className="status-buttons">
                    <p>Move to:   </p>
                    <button value="Upcoming" onClick={e => onClickUpdateStatus(e) }>Upcoming</button>
                    <button value="In Progress" onClick={e => onClickUpdateStatus(e) }>In Progress</button>
                </div>

            )
        }
    }
    
    const currentDate = new Date();
    const todayMonth = currentDate.getUTCMonth() + 1;
    const todayDay = currentDate.getUTCDate();
    const todayYear = currentDate.getUTCFullYear();
    const [dueYear, dueMonth, dueDay] = newDueDate.split("-");
    
    if(parseInt(dueYear) < todayYear || parseInt(dueMonth) < todayMonth || parseInt(dueDay) < todayDay) pastDue = true;


    if(todo !== undefined){

        return (
            <div className="todo" value={id}>
                <div className="todo-sub">
                    <div >
                        <div className="description-and-X">
                            <p className="description">{todo.description}</p>
                            <button onClick={e => deleteTodo(e)} style={{display: "block"}} className="X-button">X</button>
                        </div>
                        {
                            tags.map((tag, i) => (
                                <button className="tag-button" onClick={e => removeTag(e)} value={i} key={i}>{tag}</button>
                                ))
                            }
                        <form className="tag-input" onSubmit={e => submitTag(e)}>
                            <input type="text" onChange={e => setTag(e.target.value) }  value={tag} placeholder="Add Tags to this"/>
                        </form>
                        <div className="change-dueDates-container">
                            <div className="due-date-hover-effect">
                                <span>Due: </span>< input type="date" className="dueDate" onChange={e => dueDateOnChange(e)}
                                defaultValue={newDueDate} >
                                </input >
    
                            </div>
                             <button id={id} className="change-dueDate-button" onClick={ e => dueDateSubmit(e)} style={{display:"none"}}>Click to change</button>
                        </div>
                        {
                            // (pastDue && status === "upcoming") || (pastDue && status === "inProgress") ? 
                            // <p style={{color: "red"}}>Past Due</p>
                            // :
                            // <p style={{ color: "#3992EB" }}>DONE</p>
                            pastDueRendering(status)
                        }
                    </div>
                    {
                        statusButtons(status)
                    }
                </div>
            </div>
        )
    } else {
        return(
            <>
            </>
        )
    }
}

export default TodoDisplay
