import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useEffect } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type AppContextType = {
  tasksList: Task[];
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  editableTaskId: string;
  setEditableTaskId: React.Dispatch<React.SetStateAction<string>>;
  toggleCard: boolean;
  setToggleCard: React.Dispatch<React.SetStateAction<boolean>>;
  hasShownConfetti: boolean;
  setHasShownConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "work" | "break";
  setMode: React.Dispatch<React.SetStateAction<"work" | "break">>;
  cycle: number;
  setCycle: React.Dispatch<React.SetStateAction<number>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tasksList, setTasksList] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [editableTaskId, setEditableTaskId] = useState<string>("");
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [toggleCard, setToggleCard] = useState<boolean>(true); // true será <lista de tareas> y false será <pomodoro>
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [cycle, setCycle] = useState(0);

  // Gestion del temporizador del pomodoro. Se añade aqui para que no se detenga al cambiar de vista (al renderizar de nuevo la card pomodoro, se iniciaba el contador):
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

  return (
    <AppContext.Provider
      value={{
        tasksList,
        setTasksList,
        editableTaskId,
        setEditableTaskId,
        toggleCard,
        setToggleCard,
        hasShownConfetti,
        setHasShownConfetti,
        timeLeft,
        setTimeLeft,
        isRunning,
        setIsRunning,
        mode,
        setMode,
        cycle,
        setCycle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};
