"use client";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { TaskListTemplate } from "../ui/TaskList";
import { TaskListHeaderTemplate } from "../ui/TaskListHeader";
import { TaskList } from "@/utils/schemas/tasks.schema";


const theme = createTheme({
  palette: {
    background: { default: "#c1c2c3a1" },
    primary: { main: "#2563eb" },
  },
});

export default function AppView({taskList}: {taskList: TaskList}) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Paper elevation={3}>
          <TaskListHeaderTemplate />
          <Divider />
          <TaskListTemplate taskList={taskList}/>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
