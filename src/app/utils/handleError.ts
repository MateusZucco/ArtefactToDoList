// utils/handle-error.ts
import { TRPCClientError } from "@trpc/client";

export const getTRPCErrorMessage = (error: any): string => {
  // is is a tRPC error
  if (error instanceof TRPCClientError) {
    try {
      const parsed = JSON.parse(error.message);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].message;
      }
    } catch {
      return error.message;
    }
  }
  // fallback message
  return "An unexpected error occurred. Please try again.";
};