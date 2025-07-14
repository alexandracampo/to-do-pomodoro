import { useApp } from "../context/AppContext";

function TodoItem() {
  const { tasksList, setTasksList } = useApp();

  return (
    <div>
      <ul className="todo-list">
        {tasksList.map((task, index) => (
          <li className="todo-item" key={index}>
            <input className="todo-checkbox" type="checkbox" />
            <span className="todo-task">{task}</span>
            <button
              className="todo-delete"
              onClick={() =>
                setTasksList(tasksList.filter((_, i) => i !== index))
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
