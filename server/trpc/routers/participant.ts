import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "../../db";

export const participantRouter = createTRPCRouter({
  getNumberOfParticipants: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.participant.count();

    return count;
  }),

  getParticipants: publicProcedure.query(async ({ ctx }) => {
    const participants = await ctx.db.participant.findMany({
      orderBy: { id: "asc" },
    });

    return participants;
  }),

  getParticipantWeights: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const weights = await ctx.db.weighIns.findMany({
        where: {
          participantId: input.id,
        },
        orderBy: {
          date: "asc",
        },
      });

      return weights;
    }),

  getParticipantStartWeight: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const participant = await ctx.db.participant.findFirst({
        where: {
          id: input.id,
        },
      });

      if (participant === null) {
        console.error(
          `Could not find participant with id ${input.id} in function getParticipantStartWeight`,
        );
        return 0;
      } else {
        return participant.startingWeight;
      }
    }),

  setGoalWeight: protectedProcedure
    .input(z.object({ id: z.number(), goalWeight: z.number() }))
    .query(async ({ ctx, input }) => {
      await ctx.db.participant.update({
        where: {
          id: input.id,
        },
        data: {
          goalWeight: input.goalWeight,
        },
      });
    }),

  setGoalDate: protectedProcedure
    .input(z.object({ id: z.number(), goalDate: z.date() }))
    .query(async ({ ctx, input }) => {
      await ctx.db.participant.update({
        where: {
          id: input.id,
        },
        data: {
          goalDate: input.goalDate,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
