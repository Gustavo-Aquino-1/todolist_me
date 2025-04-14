import { createContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

export { Context };

export default function Provider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const value = useMemo(() => ({
    tasks, setTasks
  }), [tasks, setTasks]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
