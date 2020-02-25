import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.socket = io.connect('http://localhost:8000');
  };

  removeTask (taskIndex) {
    this.setState(state => {
      return state.tasks.splice(taskIndex, 1);
    });
    this.socket.emit('removeTask', taskIndex);
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="App">
    
        <header>
          <h1>ToDoList.app</h1>
        </header>
    
        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>
    
          <ul className="tasks-section__list" id="tasks-list">
            {tasks.map(task => (
              <li className="task">{task} 
                <button className="btn btn--red" onClick={() => this.removeTask(tasks.indexOf(task))}>Remove</button>
              </li>
            ))}
          </ul>
    
          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>
    
        </section>
      </div>
    );
  };

};

export default App;
