import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TodoFormProvider, TodoProvider } from "./contexts/todo.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoFormProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </TodoFormProvider>
  </StrictMode>
);
