import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Task, TaskList } from "@/utils/schemas/tasks.schema";
import { trpc } from "@/app/client/trpc";
import { TaskFormTemplate } from "../forms/TaskForm";
import { useTaskStore } from "@/app/store/useTaskDialogStore";
import { useToastStore } from "@/app/store/useToastStore";
import { getTRPCErrorMessage } from "@/app/utils/handleError";
import { useRouter } from "next/navigation";

export const TaskListTemplate = ({ taskList }: { taskList: TaskList }) => {
  const utils = trpc.useUtils();
  const router = useRouter();

  const openTaskDialog = useTaskStore((state) => state.openTaskDialog);
  const showToast = useToastStore((state) => state.showToast);

  const { mutate: deleteMutate, isPending } = trpc.delete.useMutation({
    onSuccess: async () => {
      await utils.getAll.invalidate();
      router.refresh();
      showToast("Task removed!", "success");
    },
    onError: (error) => {
      const message = getTRPCErrorMessage(error);
      showToast(message, "error");
    },
  });

  function handleDelete(id: Task["id"]) {
    deleteMutate({ id });
  }

  function handleOpenEdit(task: Task) {
    openTaskDialog(task);
  }

  return (
    <>
      {
        taskList && taskList.length > 0 ? (
          <List>
            {taskList.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenEdit(task)}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(task.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    )}
                  </>
                }
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description || "Sem descrição"}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" className="p-4 text-center">
            No tasks found
          </Typography>
        )
      }
      <TaskFormTemplate />
    </>
  );
};
