import { Typography, Box, Button } from "@mui/material";
import { useTaskStore } from "@/app/store/useTaskDialogStore";

export const TaskListHeaderTemplate = () => {
  const openTaskDialog = useTaskStore((state) => state.openTaskDialog);
  return (
    <div className="flex justify-between p-4">
      <Typography className="w-fit" variant="h5">
        My Tasks
      </Typography>
      <Button
        onClick={() => openTaskDialog(null)}
        variant="contained"
        color="primary"
        size="medium"
      >
        New Task
      </Button>
    </div>
  );
};
