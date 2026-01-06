import { z } from "zod";

import { auth } from "~/server/better-auth";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { cookies, headers } from "next/headers";
import { keepMount } from "better-auth/react";
import { redirect } from "next/navigation";

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
    .mutation(async ({ input }) => {
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

  signUserIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const cookieStore = await cookies();
      await auth.api.signInEmail({
        body: {
          email: input.email,
          password: input.password,
        },
        // headers: await headers(),
        // asResponse: true,
      });

      // const set_cookie = data.headers.get("set-cookie")!;
      // set_cookie.split("; ").map((cookie) => {
      //   const c = cookie.split("=");
      //   console.log(c);
      //   cookieStore.set(c[0]!, c[1]!);
      // });

      // // console.log(data.token);
      // console.log(data.url);
      // console.log(data.headers);
      // console.log(data.body);
      // console.log(data.status);
      // // console.log(data.user);

      // redirect("/profile");
    }),
});
