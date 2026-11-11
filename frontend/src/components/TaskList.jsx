
import { Trash2, CheckCircle } from "lucide-react";

function TaskList({ tasks, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks available. Create one!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`status ${task.status}`}>
              {task.status}
            </span>
          </div>

          <div className="task-actions">
            {task.status !== "completed" && (
              <button
                className="complete-btn"
                onClick={() =>
                  onUpdate(task.id, { status: "completed" })
                }
                aria-label="Complete task"
              >
                <CheckCircle size={18} />
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
