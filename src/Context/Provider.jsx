import { createContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

export { Context };

export default function Provider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [theme, setTheme] = useLocalStorage("theme", "light")

  const value = useMemo(() => ({
    tasks, setTasks, theme, setTheme
  }), [tasks, setTasks, theme, setTheme]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
