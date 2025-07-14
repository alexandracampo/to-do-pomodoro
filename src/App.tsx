import "./styles/app.css";
import Form from "./components/Form";
import TodoItem from "./components/TodoItem";

function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-title">Lista de tareas</h1>
      <Form />
      <TodoItem />
    </div>
  );
}

export default App;
