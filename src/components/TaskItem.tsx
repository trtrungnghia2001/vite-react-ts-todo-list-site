import { TaskType } from "@/type/task.type";
import { memo } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useTodoContext, useTodoFormContext } from "@/contexts/todo.context";

const TaskItem = ({ data }: { data: TaskType }) => {
  const { handleOpenForm, setTask } = useTodoFormContext();
  const { handleRemove, handleEdit } = useTodoContext();
  return (
    <div className="p-3 border rounded-lg space-y-2">
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={data.status === "done"}
            onCheckedChange={() => {
              if (data.status === "done") {
                handleEdit({ ...data, status: "pending" });
              } else {
                handleEdit({ ...data, status: "done" });
              }
            }}
          />
          <span>{data.title}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                handleOpenForm();
                setTask(data);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRemove(data)}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* content */}
      <div className="text-13 text-gray-500 space-x-3">
        <span>{new Date(data.dueDate).toLocaleString()}</span>
        <span
          className={`capitalize inline-block border px-3 py-1 rounded-full leading-none ${data.status}`}
        >
          {data.status}
        </span>
        <span
          className={`capitalize inline-block border px-3 py-1 rounded-full leading-none ${data.priority}`}
        >
          {data.priority}
        </span>
      </div>
      {/* description */}
      {data.description && (
        <div
          className="whitespace-break-spaces text-sm"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      )}
    </div>
  );
};

export default memo(TaskItem);
