import { useApp } from "../context/AppContext";
import "../styles/pomodoro.css";
// import { useEffect } from "react";

function PomodoroCard() {
  const { timeLeft, setTimeLeft, setIsRunning, mode, cycle, isRunning } =
    useApp();

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={`pomodoro-card ${mode}`}>
      <h2 className={`pomodoro-mode ${mode}`}>
        {mode === "work" ? "¡A trabajar!" : "Hora de descansar"}
      </h2>
      <div className="pomodoro-timer">{formatTime(timeLeft)}</div>
      <div className={`pomodoro-buttons ${mode}`}>
        <button disabled={isRunning} onClick={() => setIsRunning(true)}>
          Iniciar - Reanudar
        </button>
        <button disabled={!isRunning} onClick={() => setIsRunning(false)}>
          Pausar
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
          }}
        >
          Reiniciar
        </button>
      </div>
      <p className="pomodoro-cycle">Ciclo actual: {cycle}</p>
    </div>
  );
}

export default PomodoroCard;
