import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskType } from "@/type/task.type";
import { status_options, priority_options } from "@/constants/index.constant";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTodoContext, useTodoFormContext } from "@/contexts/todo.context";

const formSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string().min(1, {
    message: "Due Date is required",
  }),
});
const initValues: Partial<TaskType> = {
  _id: "",
  title: "",
  description: "",
  status: status_options[0],
  priority: priority_options[0],
  dueDate: "",
};

const TaskForm = () => {
  const { handleAdd, handleEdit } = useTodoContext();
  const { handleCloseForm, setTask, task } = useTodoFormContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (task) {
      handleEdit(values as TaskType);
    } else {
      handleAdd(values as TaskType);
    }
    handleCloseForm();
    setTask(null);
  }

  useEffect(() => {
    if (task) {
      Object.entries(task).forEach(([key, value]) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, value as string);
      });
    }
  }, [task]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) => value != "" && field.onChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status_options.map((item) => (
                    <SelectItem key={item} value={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={(value) => value != "" && field.onChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priority_options.map((item) => (
                    <SelectItem key={item} value={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default memo(TaskForm);
