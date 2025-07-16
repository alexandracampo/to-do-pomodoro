import { useApp } from "../context/AppContext";
import EditButton from "./EditButton";
import iconDelete from "../assets/icons/icon-delete.png";

function TodoItem() {
  const { tasksList, setTasksList, editableTaskId } = useApp();

  const toggleCompleted = (id: string) => {
    const updatedTasks = tasksList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasksList(updatedTasks);
  };

  return (
    <div>
      <ul className="todo-list">
        {tasksList.map((task) => (
          <li className="todo-item" key={task.id}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />
            {editableTaskId === task.id ? (
              <input
                className="input-edit"
                type="text"
                defaultValue={task.text}
              />
            ) : (
              <span
                className={`todo-task ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
            )}

            {!task.completed && <EditButton currentTask={task} />}
            <button
              className="todo-delete"
              onClick={() =>
                setTasksList(tasksList.filter((t) => t.id !== task.id))
              }
            >
              <img
                src={iconDelete}
                alt="Eliminar tarea"
                className="img-icon-delete"
              ></img>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoItem;
