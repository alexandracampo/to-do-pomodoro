import "./styles/app.css";
import Form from "./components/Form";
import TodoItem from "./components/TodoItem";
import { useApp } from "./context/AppContext";
import { useEffect, useState } from "react";
import PomodoroCard from "./components/PomodoroCard";
import Lottie from "lottie-react";
import emptyAnimation from "./assets/Empty red.json";

function App() {
  const { tasksList, toggleCard, setToggleCard } = useApp();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const tittle = toggleCard ? "Lista de tareas" : "Pomodoro";
  const iconButton = toggleCard ? "🍅" : "📋";
  const emptyList = tasksList.length === 0;

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
          {emptyList ? (
            <div className="empty-container">
              <Lottie
                animationData={emptyAnimation}
                loop={true}
                className="animation"
              />
              <p className="empty-text">Añade una nueva tarea</p>
            </div>
          ) : (
            <TodoItem />
          )}
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
