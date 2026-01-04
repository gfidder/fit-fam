import { z } from "zod";

import { auth } from "~/server/better-auth";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const regsitrationRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        nickName: z.string().optional(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const nameField = input.nickName ?? input.firstName;

      console.log(nameField);
      console.log(input.nickName);
      console.log(input.firstName);

      await auth.api.signUpEmail({
        body: {
          name: nameField,
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
          nickName: input.nickName,
        },
      });
    }),
});
