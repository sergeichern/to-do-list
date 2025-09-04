import { useState } from "react";

function AddNewTask({ inputValue, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (newTask.trim()) {

      const newItem = { id: Date.now(), text: newTask };
      setTasks(prev => [...prev, newItem]);

      setNewTask('');
    }
  }

  function handleDelete(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do-List</h1>
      </header>
      <AddNewTask inputValue={newTask}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


