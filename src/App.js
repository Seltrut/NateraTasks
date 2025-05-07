import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Tasks from './tasks.jsx'
import NewTaskForm from './newTaskForm.jsx'

function App() {
  const [tasks, setTasks] = useState([])

  const newTask = (task) =>{
    const newTasks = [...tasks,task]
    setTasks(newTasks)
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>Tasks</h1>
        <Tasks />
        <h2>Add a new Task</h2>
        <NewTaskForm newTask={newTask} />
      </header>
    </div>
  );
}

export default App;