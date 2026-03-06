"use client";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { trpc } from "@/app/client/trpc";
import { Task } from "@/utils/schemas/tasks.schema";
import { TaskModel } from "./models/Task";
import { useTaskStore } from "@/app/store/useTaskDialogStore";
import { useToastStore } from "@/app/store/useToastStore";
import { getTRPCErrorMessage } from "@/app/utils/handleError";
import { useRouter } from "next/navigation";
// Tipagem para os dados do formulário (apenas o que o usuário edita)

export const TaskFormTemplate = () => {
  const utils = trpc.useUtils();
  const router = useRouter();

  const dialogOpen = useTaskStore((state) => state.dialogOpen);
  const closeTaskDialog = useTaskStore((state) => state.closeTaskDialog);
  const selectedTask = useTaskStore((state) => state.selectedTask);
  const showToast = useToastStore((state) => state.showToast);

  const { mutate: createMutate, isPending: isPendingCreate } =
    trpc.create.useMutation({
      onSuccess: async () => {
        await utils.getAll.invalidate();
        router.refresh();
        showToast("Task created!", "success");
        handleClose();
      },
      onError: (error) => {
        const message = getTRPCErrorMessage(error);
        showToast(message, "error");
      },
    });

  const { mutate: updateMutate, isPending: isPendingUpdate } =
    trpc.update.useMutation({
      onSuccess: async () => {
        await utils.getAll.invalidate();
        router.refresh();
        showToast("Task updated!", "success");
        handleClose();
      },
      onError: (error) => {
        const message = getTRPCErrorMessage(error);
        showToast(message, "error");
      },
    });

  const {
    control,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<Task>({
    defaultValues: TaskModel(null),
  });

  useEffect(() => {
    if (selectedTask) {
      reset(TaskModel(selectedTask));
    } else {
      reset(TaskModel(null));
    }
  }, [selectedTask]);

  const form = watch();

  function handleSubmitForm(form: Task) {
    if (form.id) {
      updateMutate({ ...form });
    } else {
      createMutate({ ...form });
    }
  }

  function handleClose() {
    reset(TaskModel(null));
    closeTaskDialog();
  }

  return (
    <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>New Task</DialogTitle>

      <DialogContent className="pt-2!">
        <Stack spacing={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "O título é obrigatório" }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Título da Tarefa"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description (Optional)"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions className="flex! p-4! justify-between!">
        <Button
          disabled={isPendingUpdate || isPendingCreate}
          onClick={handleClose}
          color="inherit"
        >
          Cancel
        </Button>
        {isPendingUpdate || isPendingCreate ? (
          <CircularProgress />
        ) : (
          <Button
            disabled={!isDirty}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleSubmitForm(form)}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
