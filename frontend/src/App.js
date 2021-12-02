import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useMemo } from "react";
import Todos from "./Components/Todos";
import * as todoAPIUtil from "./util/todo_util"


const App = () => {
  const [todos, setTodos] = useState([]);
  const [unDones, setUnDones] = useState([]);
  const [progress, setProgress] = useState([]);
  const [dones, setDones ] = useState([]);
  const [didFetchTodos, setDidFetchTodos]  = useState(false)

  // console.log('api call', todoAPIUtil.fetchUpcomings())

  useEffect(()=> {

    const fetchTodos = async () => {
      const response = await todoAPIUtil.getTodos()
      const data = await response.data
      setTodos(old => data)
    }
    if( didFetchTodos ){
      setDidFetchTodos(false)
    }else {
      setDidFetchTodos(true)
      fetchTodos()
    }
    // fetchTodos()
    setDones([])
    setProgress([])
    setUnDones([])
    console.log("App.js")
    todos.forEach(todo => {
      if (todo.done) {
        setDones(old => [...old, todo])
      } else if (!todo.done && todo.inProgress) {
        setProgress(old => [...old, todo])
      } else if (!todo.done && !todo.inProgress) {
        setUnDones(old => [...old, todo])
      }
    })
  },[todos])
  
  return (
    <div className="custom-shape-divider-top-1636227455" className="App">

        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
        <section className="containers">
          <Todos propTodos={todos} progress={progress} dones={dones} setProgress={setProgress} setDone={setDones} setUndones={setUnDones} key="1" setPropTodos={setTodos} status="upcoming" propTodos={unDones} title="Upcoming"  className="todo-list" />
          <Todos propTodos={todos} unDones={unDones} dones={dones} setProgress={setProgress} setDone={setDones} setUndones={setUnDones} key="2" setPropTodos={setTodos} status="inProgress" propTodos={progress} title="In Progress"  className="progress" />
          <Todos propTodos={todos} unDones={unDones} progress={progress} setProgress={setProgress} setDone={setDones} setUndones={setUnDones} key="3" setPropTodos={setTodos} status="done" propTodos={dones} title="Done"  className="done" />
        </section>

     
    </div>
  );
}

export default App;
