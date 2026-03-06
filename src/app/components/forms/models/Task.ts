import { Task } from "@/utils/schemas/tasks.schema";
import _ from "lodash";

export const TaskModel = (data: Partial<Task> | null) => {
  const defaultValues = {
    id: null,
    title: "",
    description: "",
    // createDateTime: null,
    // updateDateTime: null
  };
  return _.defaults(data, defaultValues);
};
