import { useState } from "react";
import { useApp } from "../context/AppContext";
import "../styles/form.css";

function Form() {
  const { tasksList, setTasksList } = useApp();

  const [inputTaskValue, setInputTaskValue] = useState<string>("");

  type InputChange = React.ChangeEvent<HTMLInputElement>;
  type onSubmit = React.FormEvent<HTMLFormElement>;

  const handleWriteTask = (e: InputChange): void => {
    setInputTaskValue(e.target.value);
  };

  const handleAddTask = (e: onSubmit): void => {
    e.preventDefault();
    if (inputTaskValue.trim() === "") return; // No añadir tareas vacías
    setTasksList([
      ...tasksList,
      { id: crypto.randomUUID(), text: inputTaskValue, completed: false },
    ]);
    setInputTaskValue("");
  };
  return (
    <>
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          className="todo-input"
          name="tarea"
          type="text"
          placeholder="Añade una tarea"
          onChange={handleWriteTask}
          value={inputTaskValue}
          maxLength={50}
        />
        <button
          className="todo-submit"
          type="submit"
          disabled={!inputTaskValue.trim()}
        >
          Añadir
        </button>
      </form>
    </>
  );
}

export default Form;
