import { TaskType } from "@/type/task.type";
import { v4 } from "uuid";

interface Action {
  type: "ADD" | "REMOVE" | "EDIT";
  payload: TaskType;
}

export const initialState: TaskType[] =
  JSON.parse(localStorage.getItem("todos") || "[]") || [];

const reducer = (state = initialState, action: Action): TaskType[] => {
  switch (action.type) {
    case "ADD":
      const newTask: TaskType = {
        ...action.payload,
        _id: v4(),
      };
      return [newTask, ...state];

    case "EDIT":
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, ...action.payload } : item
      );

    case "REMOVE":
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return [];
  }
};

export default reducer;
