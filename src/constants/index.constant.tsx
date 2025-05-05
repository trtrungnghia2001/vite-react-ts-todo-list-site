import { PriorityType, StatusType } from "@/type/task.type";

export const status_options: StatusType[] = ["pending", "progress", "done"];
export const priority_options: PriorityType[] = ["low", "medium", "high"];
export const sort_options = [`title`, `dueDate`, `createdAt`];
