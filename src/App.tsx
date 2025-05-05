import "./App.css";
import TaskItem from "./components/TaskItem";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTodoContext, useTodoFormContext } from "./contexts/todo.context";
import TaskForm from "./components/form/TaskForm";
import {
  priority_options,
  sort_options,
  status_options,
} from "./constants/index.constant";
import { useCallback, useMemo, useState } from "react";
import { ArrowDownUp, Funnel } from "lucide-react";
import { exportToExcel, importFormExcel } from "./lib/excel";
import { TaskType } from "./type/task.type";

function App() {
  const { todos, handleAdd } = useTodoContext();
  const { open, handleOpenForm, handleCloseForm, setTask, task } =
    useTodoFormContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    status: "all status",
    priority: "all priority",
    sort: "createdAt",
  });
  const handleFilter = useCallback((key: string, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  }, []);

  const todoRender = useMemo(() => {
    return todos
      .filter((item) => {
        return (
          item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
          item.status.includes(
            filter.status.includes("all") ? "" : filter.status
          ) &&
          item.priority.includes(
            filter.priority.includes("all") ? "" : filter.priority
          )
        );
      })
      .sort((a, b) => {
        if (filter.sort === "title") {
          return a.title.localeCompare(b.title);
        }
        if (filter.sort === "dueDate") {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }

        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
  }, [todos, filter, search]);

  const [excelData, setExcelData] = useState<TaskType[] | null>(null);

  return (
    <>
      <div className="space-y-6 max-w-5xl w-full mx-auto py-12 px-3">
        {/* actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button size={"sm"} onClick={handleOpenForm}>
            Add
          </Button>
          <Button
            size={"sm"}
            onClick={() => exportToExcel(todos, "todo-list.xlsx")}
          >
            Export
          </Button>
          <Input
            type="file"
            accept=".xlsx, .xls"
            className="max-w-max"
            onChange={async (e) => {
              const resp = await importFormExcel(e);
              setExcelData(resp as TaskType[]);
            }}
          />
          <Button
            size={"sm"}
            disabled={excelData === null}
            onClick={() => {
              excelData?.forEach((item) => handleAdd(item));
              setExcelData(null);
            }}
          >
            Import
          </Button>
        </div>
        <div>
          <Input
            placeholder="Searrch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* filter */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-500">
          <div className="flex items-center gap-1">
            <Funnel size={16} />
            <Select
              onValueChange={(value) => handleFilter("status", value)}
              value={filter.status}
            >
              <SelectTrigger size="sm" className="capitalize">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["all status", ...status_options].map((item, idx) => (
                  <SelectItem key={idx} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Funnel size={16} />
            <Select
              onValueChange={(value) => handleFilter("priority", value)}
              value={filter.priority}
            >
              <SelectTrigger size="sm" className="capitalize">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {["all priority", ...priority_options].map((item, idx) => (
                  <SelectItem key={idx} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDownUp size={16} />
            <Select
              onValueChange={(value) => handleFilter("sort", value)}
              value={filter.sort}
            >
              <SelectTrigger size="sm" className="capitalize">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sort_options.map((item, idx) => (
                  <SelectItem key={idx} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* tasks */}
        {todoRender.map((item, idx) => (
          <TaskItem key={idx} data={item} />
        ))}
      </div>
      {/* form */}
      <Dialog
        open={open}
        onOpenChange={() => {
          handleCloseForm();
          setTask(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{task ? `Edit` : `Add`}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <TaskForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
