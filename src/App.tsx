import "./styles/app.css";
import Form from "./components/Form";
import TodoItem from "./components/TodoItem";
import { useApp } from "./context/AppContext";
import { useEffect, useState } from "react";
import PomodoroCard from "./components/PomodoroCard";

function App() {
  const { tasksList, toggleCard, setToggleCard } = useApp();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const tittle = toggleCard ? "Lista de tareas" : "Pomodoro";
  const iconButton = toggleCard ? "🍅" : "📋";

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setToggleCard((prev) => !prev);
      setIsAnimating(false);
    }, 600); // tiempo de la animación (debe coincidir con CSS)
  };

  return (
    <div className={`todo-container ${isAnimating ? "flip" : ""}`}>
      <section className="section-change-card">
        <button className="toggle-button" onClick={handleToggle}>
          {iconButton}
        </button>
      </section>

      <h1 className="todo-title bounce">
        {tittle.split("").map((letter, i) => (
          <span key={i}>{letter === " " ? "\u00A0" : letter}</span>
        ))}
      </h1>

      {toggleCard ? (
        <section>
          <Form />
          <TodoItem />
        </section>
      ) : (
        <section>
          <PomodoroCard />
        </section>
      )}
    </div>
  );
}

export default App;
