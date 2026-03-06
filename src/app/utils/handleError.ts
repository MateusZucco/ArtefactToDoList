// utils/handle-error.ts
import { TRPCClientError } from '@trpc/client';

export const getTRPCErrorMessage = (error: any): string => {
  // Se for um erro do tRPC
  if (error instanceof TRPCClientError) {
    try {
      // Tenta parsear caso a mensagem venha como string JSON (comum no tRPC/Zod)
      const parsed = JSON.parse(error.message);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].message; // Retorna apenas o primeiro erro de validação
      }
    } catch {
      // Se não for JSON, retorna a mensagem pura
      return error.message;
    }
  }
  
  return "Ocorreu um erro inesperado. Tente novamente.";
};