import React, { useState } from 'react'
import TaskAPIService from './TaskAPIService'

const NewTaskForm = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [priority, setPriority] = useState('low')

    const addTask = () => {
        TaskAPIService.AddTask({title,description,priority})
            .then((response) => props.newTask(response))
            .catch(error => console.log('Error adding task', error))
    }

    const handleSubmit=(event) => {
        event.preventDefault()
        console.log("handling submit.....")
        addTask()
        setTitle('')
        setDesc('')
        setPriority('low')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" placeholder="enter title" value={title} onChange={(e)=>setTitle(e.target.value)} id="title" />
            <br></br>
            <input type="text" placeholder="enter description" value={description} onChange={(e)=>setDesc(e.target.value)} id="desc" />
            <select id="priority" value={priority} onLoad={(e)=>setPriority(e.target.value)} onChange={(e)=>setPriority(e.target.value)}name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <br></br>
            <input type='submit' value='submit' onClick={handleSubmit}/>
          </form>
    )
}

export default NewTaskForm;