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
  //   inputTaskValue: string;
  //   setInputTaskValue: React.Dispatch<React.SetStateAction<string>>;
  //   isModalOpen: boolean;
  //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  return (
    <AppContext.Provider value={{ tasksList, setTasksList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};
