import { Task } from "@/utils/schemas/tasks.schema";
import { create } from "zustand";

interface TaskState {
  dialogOpen: boolean;
  selectedTask: Task | null;
  setDialogOpen: (open: boolean) => void;
  setSelectedTask: (task: Task | null) => void;
  openTaskDialog: (task: Task | null) => void;
  closeTaskDialog: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  dialogOpen: false,
  selectedTask: null,
  setDialogOpen: (open) => set({ dialogOpen: open }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  openTaskDialog: (task) => set({ selectedTask: task, dialogOpen: true }),
  closeTaskDialog: () => set({ selectedTask: null, dialogOpen: false }),
}));
