import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

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
