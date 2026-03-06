import "server-only";

import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create();

const errorLoggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();

  // Executa a rota (procedure)
  const result = await next();

  // Verifica se a execução resultou em erro
  if (!result.ok) {
    const { error } = result;

    if (error.code === "INTERNAL_SERVER_ERROR") {
      // Ideal: Enviar para um APM como Sentry, Datadog ou CloudWatch
      console.error(`[CRITICAL] route: ${path}`, {
        type,
        ...error,
      });
    }

    // 3. Erros de Validação (O usuário preencheu um CNPJ inválido ou faltou um campo)
    else if (error.code === "BAD_REQUEST") {
      // Geralmente não disparamos alertas no Sentry para isso, mas um log de debug é útil
      console.debug(`[VALIDATION] route: ${path}`);
    }
  }

  const durationMs = Date.now() - start;
  // Opcional: Logar tempo de execução de rotas muito lentas
  if (durationMs > 2000) {
    console.warn(`[PERFORMANCE] route: ${path} latency ${durationMs}ms`);
  }

  return result;
});

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
