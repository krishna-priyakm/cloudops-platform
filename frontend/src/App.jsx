
import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/taskService";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Unable to connect to backend.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      await loadTasks();
    } catch (err) {
      setError("Unable to create task.");
    }
  };

  const handleUpdateTask = async (id, data) => {
    try {
      await updateTask(id, data);
      await loadTasks();
    } catch (err) {
      setError("Unable to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  const completed = tasks.filter(
    task => task.status === "completed"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>CloudOps</h1>
          <p>Task Management Platform</p>
        </div>
        <span className="system-status">● System Online</span>
      </header>

      <main className="container">
        <section className="stats">
          <div className="stat-card">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h2>{tasks.length - completed}</h2>
            <p>Pending</p>
          </div>
        </section>

        <TaskForm onAddTask={handleAddTask} />

        <section className="tasks-section">
          <h2>Your Tasks</h2>
          {error && <p className="error">{error}</p>}

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
