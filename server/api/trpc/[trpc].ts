import { createTRPCNuxtHandler } from "trpc-nuxt/server";
import { appRouter } from "../../trpc/root";
import { createTRPCContext } from "../../trpc/trpc";

export default createTRPCNuxtHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
