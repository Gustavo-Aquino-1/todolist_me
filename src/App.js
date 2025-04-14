import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route Component={Home} path="/" />
       <Route Component={NotFound} path="*" />  {/* deve sempre vir por ultimo, por como é * pega todos as rotas, se vir primeiro cai nela já e nao renderiza as outras */}
    </Routes>
  );
}

export default App;
