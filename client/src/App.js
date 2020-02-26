import React from 'react';
import io from 'socket.io-client';
const uuidv1 = require('uuid/v1');

class App extends React.Component {
  state = {
    tasks: [],
    taskName: '',
  };

  componentDidMount() {
    this.socket = io.connect('http://localhost:8000');
    this.socket.on('updateData', (tasksList) => {this.updateTasksList(tasksList)});
    this.socket.on('addTask', newTask => {this.addTask(newTask)});
    this.socket.on('removeTask', taskId => {this.removeTask(taskId)});
  };

  updateTasksList (tasksList) {
    this.setState({ tasks: tasksList});
  };

  removeTask (taskId, isLocalChange) {
    this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId)});
   if (isLocalChange) {
      this.socket.emit('removeTask', taskId);
    }
  };
  
  updateTaskName (newValue) {
    this.setState({
      taskName: newValue,
    });
  }

  addTask (newTask) {
    this.setState({tasks: [...this.state.tasks, newTask]});
  };

  submitForm (e) {
    const { taskName } = this.state;
    e.preventDefault();
    const newTask = { id: uuidv1(), name: taskName };
    this.addTask(newTask);
    this.socket.emit('addTask', newTask);
  };

  render() {
    const { tasks, taskName } = this.state;
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map(task => (
              <li className="task">{task.name} 
                <button className="btn btn--red" onClick={() => this.removeTask(task.id, true)}>Remove</button>
              </li>
            ))}
          </ul>
    
          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={taskName} onChange={(e) => this.updateTaskName(e.target.value)} />
            <button className="btn" type="submit" onClick={event => this.submitForm(event)}>Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;
