import { useApp } from "../context/AppContext";

function TodoItem() {
  const { tasksList, setTasksList } = useApp();

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
            <span className="todo-task">{task.text}</span>
            <button
              className="todo-delete"
              onClick={() =>
                setTasksList(tasksList.filter((t) => t.id !== task.id))
              }
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoItem;
