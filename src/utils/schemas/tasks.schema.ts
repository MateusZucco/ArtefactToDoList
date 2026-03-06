import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().nonoptional(),
  title: z
    .string()
    .min(3, { message: "Task title must be at least 3 characters long" })
    .max(150, { message: "Task title must be at most 150 characters long" }),
  description: z
    .string()
    .min(3, { message: "Task description must be at least 3 characters long" })
    .max(1000, {
      message: "Task description must be at most 1000 characters long",
    })
    .optional(),
  createDateTime: z.iso.datetime(),
  updateDateTime: z.iso.datetime().optional().nullable(),
});

// export const TaskIdSchema = TaskSchema.shape.id;
export type Task = z.infer<typeof TaskSchema>;
export type TaskList = Task[];
