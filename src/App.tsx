import "./App.css";
import { useState } from "react";

function App() {
const [tasksList, setTasksList] = useState<string[]>([]);
const [inputTaskValue, setInputTaskValue] = useState<string>("");
type InputChange = React.ChangeEvent<HTMLInputElement>;
type onSubmit = React.FormEvent<HTMLFormElement>;

console.log({tasksList})

const handleWriteTask = (e: InputChange): void => {
  setInputTaskValue(e.target.value);
}

const handleAddTask = (e: onSubmit): void => {
  e.preventDefault(); 
  if(inputTaskValue.trim() === "") return; // No añadir tareas vacías
  setTasksList( [...tasksList, inputTaskValue]);
  setInputTaskValue(""); 
}

  return (
    <div className="todo-container">
      <h1>Lista de tareas</h1>
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Añade una tarea" onChange={handleWriteTask} value={inputTaskValue}/>
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {tasksList.map((task, index) => (
          <li key={index}>
            <input type="checkbox" />
            <span>{task}</span>
            <button onClick={() => setTasksList(tasksList.filter((_, i) => i !== index))}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


