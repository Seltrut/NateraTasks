import React, { useState, useEffect } from 'react';
import './App.css';
function Tasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetch('/tasks').then(res => {
        
        return res.json()
        }).then(data => {
          console.log(data)
          setTasks(data);
      });
    }, []);

    const handleChange=(event) => {
        let {name, value} = event.target
        let target = "/tasks"
        if(value != "all") {
            target = target + "?priority="+value
        }
        fetch(target).then(res => {
            return res.json()
            }).then(data => {
              console.log(data)
              setTasks(data);
          });
    }

    return (


          <table>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <select id="priority" name="priority" onChange={handleChange}>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>
            </tr>
            {tasks.map((task) =>(
              <tr>
                <td>{task.TITLE}</td>
                <td>{task.DESC}</td>
                <td>{task.PRIORITY}</td>
              </tr>
            ))}
          </table>
    )
}
export default Tasks;