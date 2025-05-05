export type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  dueDate: string;
  createdAt: string;
};

export type StatusType = `pending` | `progress` | `done`;

export type PriorityType = `low` | `medium` | `high`;

export type TodoContextType = {
  todos: TaskType[];
  handleAdd: (task: TaskType) => void;
  handleEdit: (task: TaskType) => void;
  handleRemove: (task: TaskType) => void;
};

export type TodoFormType = {
  open: boolean;
  handleOpenForm: () => void;
  handleCloseForm: () => void;
  task: TaskType | null;
  setTask: (task: TaskType | null) => void;
};
