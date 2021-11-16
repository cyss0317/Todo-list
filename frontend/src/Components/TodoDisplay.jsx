import React from 'react'
import {useState, useEffect} from "react"
import * as todoAPIUtil from "../util/todo_util"


const TodoDisplay = ({props, propTodo, dones, progress, unDones, id, status, todos, setTodos, setDones, setUnDones, setProgress}) => {
    const [todo, setTodo] = useState(propTodo)
    const [tags, setTags] = useState(propTodo.tags);
    const [tag, setTag] = useState("");
    const [newDueDate, setNewDueDate] = useState(propTodo.dueDate);


    const onClickUpdateStatus =  e => {
        e.preventDefault();
        let newTodo = {};
        const answer = window.confirm(`Move this to ${e.target.innerHTML}?`)
 
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
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    return newTodo
                } else {
                    return todo
                }
            })
            const newUndones = todos.map(todo => {
                if (todo.id === id) {

                } else {
                    return todo
                }
            })


            setTodo(old => newTodo) 
            setTodos(old =>newTodos)
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
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    return newTodo
                } else {
                    return todo
                }
            })
            setTodo(old => newTodo)
            setTodos(old => newTodos)
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
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    return newTodo
                } else {
                    return todo
                }
            })
            setTodo(old => newTodo)
            setTodos(old => newTodos)
        }
            todoAPIUtil.updateTodo(newTodo)
    }

    const deleteTodo = (e) => {
        e.preventDefault();
        if(status === "inProgress"){
            
            setProgress()
        }
        todoAPIUtil.deleteTodo(id)
        setTodo(old => undefined)
    }


    let pastDue = undefined;

    const dueDateOnChange = (e) => {
        const changeButton = document.getElementById(`${id}`);
        setNewDueDate(e.target.value);
        changeButton.style.display = "block"
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
                                <button onClick={e => removeTag(e)} value={i} key={i}>{tag}</button>
                            ))
                        }
                        <form className="tag-input" onSubmit={e => submitTag(e)}>
                            <input type="text" onChange={e => setTag(e.target.value) }  value={tag} placeholder="Add Tags to this"/>
                        </form>
                        <form className="change-dueDates-container">
                            <div className="due-date-hover-effect">
                                <span>Due: </span>< input type="date" className="dueDate" onChange={e => dueDateOnChange(e)}
                                defaultValue={newDueDate} >
                                </input >
    
                            </div>
                             <button id={id} className="change-dueDate-button" style={{display:"none"}}>Click to change</button>
                        </form>
                        {
                            pastDue && status !== "done" ? 
                            <p style={{color: "red"}}>Past Due</p>
                            :
                            <p style={{ color: "#3992EB" }}>DONE</p>
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
            <></>
        )
    }
}

export default TodoDisplay
