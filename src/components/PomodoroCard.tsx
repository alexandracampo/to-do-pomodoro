import "../styles/pomodoro.css";
import { useEffect, useState } from "react";

function PomodoroCard() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSwitch();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSwitch = () => {
    if (mode === "work") {
      const newCycle = cycle + 1;
      setCycle(newCycle);
      setMode("break");
      setTimeLeft(newCycle % 4 === 0 ? 15 * 60 : 5 * 60);
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className={`pomodoro-card ${mode}`}>
      <h2 className="pomodoro-mode">
        {mode === "work" ? "¡A trabajar!" : "Hora de descansar"}
      </h2>
      <div className="pomodoro-timer">{formatTime(timeLeft)}</div>
      <div className="pomodoro-buttons">
        <button onClick={() => setIsRunning(true)}>Iniciar - Reanudar</button>
        <button onClick={() => setIsRunning(false)}>Pausar</button>
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
