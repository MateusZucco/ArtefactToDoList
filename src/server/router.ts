import "server-only";
import TarefaDatabase from "./database/database";
import { publicProcedure, router } from "./trpc";
import { TaskSchema } from "../utils/schemas/tasks.schema";
import z from "zod";
import { revalidatePath } from "next/cache";

const db = TarefaDatabase.getInstance();

export const appRouter = router({
  getAll: publicProcedure
    .output(TaskSchema.array())
    .query(() => db.getAll()),

  getById: publicProcedure
    .input(TaskSchema.pick({ id: true }))
    .output(TaskSchema.or(z.undefined()))
    .query(({ input }) => db.getById(input.id)),

  create: publicProcedure
    .input(TaskSchema.pick({ title: true, description: true }))
    .output(TaskSchema)
    .mutation(async ({ input }) => {
      const result = await db.create({ ...input });
      revalidatePath("/");
      return result;
    }),

  update: publicProcedure
    .input(TaskSchema)
    .output(TaskSchema)
    .mutation(async ({ input }) => {
      const result = await db.update({
        id: input.id,
        form: { ...input },
      });
      revalidatePath("/");
      return result;
    }),

  delete: publicProcedure
    .input(TaskSchema.pick({ id: true }))
    .output(z.boolean())
    .mutation(async ({ input }) => {
      const result = db.delete(input.id);
      revalidatePath("/");
      return result;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
