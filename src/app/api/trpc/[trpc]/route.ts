import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/router"; 

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}), 
    onError: ({ path, error }) => {
      console.error(
        `Api error on ${path ?? "<no-path>"}: ${error.message}`,
      );
    },
  });

export { handler as GET, handler as POST };
