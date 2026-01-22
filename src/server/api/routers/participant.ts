import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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

  createParticipant: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        goalWeight: z.number(),
        startingWeight: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const goalDate = await ctx.db.participant.findFirst({});

      const id = Math.floor(Math.random() * 65536);

      console.log(goalDate);

      await ctx.db.participant.create({
        data: {
          id,
          userId: input.userId,
          goalWeight: input.goalWeight,
          startingWeight: input.startingWeight,
          goalDate: goalDate?.goalDate ?? new Date(),
        },
      });
    }),

  logNewWeight: protectedProcedure
    .input(
      z.object({
        participantId: z.number(),
        weight: z.number(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = Math.floor(Math.random() * 2117337681);

      await ctx.db.weighIns.create({
        data: {
          participantId: input.participantId,
          weight: input.weight,
          date: input.date,
          id,
        },
      });
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

  setStartingWeight: protectedProcedure
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

  doesParticipantExist: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const p = await ctx.db.participant.findFirst({
        where: {
          userId: input.userId,
        },
      });

      return p !== null;
    }),

  getParticipantId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const p = await ctx.db.participant.findFirst({
        where: {
          userId: input.userId,
        },
      });

      return p?.id;
    }),

  getUserName: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      return user?.name;
    }),
});
