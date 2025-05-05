import { TaskType, TodoContextType, TodoFormType } from "@/type/task.type";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer, { initialState } from "./todo.reducer";

//
const TodoContext = createContext<TodoContextType>({
  todos: [],
  handleAdd: () => {},
  handleEdit: () => {},
  handleRemove: () => {},
});
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = useCallback((task: TaskType) => {
    dispatch({ type: "ADD", payload: task });
  }, []);

  const handleEdit = useCallback((task: TaskType) => {
    dispatch({ type: "EDIT", payload: task });
  }, []);

  const handleRemove = useCallback((task: TaskType) => {
    dispatch({ type: "REMOVE", payload: task });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAdd,
        handleEdit,
        handleRemove,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export const useTodoContext = () => useContext(TodoContext);

// form
const TodoFormContext = createContext<TodoFormType>({
  open: false,
  handleOpenForm: () => {},
  handleCloseForm: () => {},
  task: null,
  setTask: () => {},
});
export const TodoFormProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskType | null>(null);

  const handleOpenForm = useCallback(() => {
    setOpen(true);
  }, []);
  const handleCloseForm = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <TodoFormContext.Provider
      value={{ open, handleCloseForm, handleOpenForm, task, setTask }}
    >
      {children}
    </TodoFormContext.Provider>
  );
};
export const useTodoFormContext = () => useContext(TodoFormContext);
