import "./styles/app.css";
import Form from "./components/Form";
import TodoItem from "./components/TodoItem";
import { useApp } from "./context/AppContext";
import { useEffect } from "react";

function App() {
  const { tasksList } = useApp();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Lista de tareas</h1>
      <Form />
      <TodoItem />
    </div>
  );
}

export default App;
