import "server-only";

import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create();

/* 
*  middleware to log error
*/
const errorLoggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();

  if (!result.ok) {
    const { error } = result;

    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error(`[CRITICAL] route: ${path}`, {
        type,
        ...error,
      });
    }

    else if (error.code === "BAD_REQUEST") {
      console.debug(`[VALIDATION] route: ${path}`);
    }
  }

  const durationMs = Date.now() - start;
  if (durationMs > 2000) {
    console.warn(`[PERFORMANCE] route: ${path} latency ${durationMs}ms`);
  }

  return result;
});

/* 
*  middleware to throw error
*/
const handleErrorMiddleware = t.middleware(async ({ next }) => {
  const result = await next();

  if (!result.ok) {
    const { error } = result;
    if (error instanceof TRPCError) {
      throw new TRPCError({ ...error });
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      });
    }
  }
  return result;
});

export const router = t.router;
export const publicProcedure = t.procedure
  .use(handleErrorMiddleware)
  .use(errorLoggerMiddleware);
