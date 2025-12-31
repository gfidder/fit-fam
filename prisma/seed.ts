import { db } from "~/server/db";

async function main() {
  const gabeId = "cl9ebqhxk00003b600tymydho";
  const momId = "cl9ebqhxk00004b600tymydho";
  const dadId = "cl9ebqhxk00005b600tymydho";
  const sarahId = "cl9ebqhxk00006b600tymydho";

  await db.user.upsert({
    where: {
      id: gabeId,
    },
    create: {
      id: gabeId,
      name: "Gabriel Fidder",
      email: "gabfid@gmail.com",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      id: momId,
    },
    create: {
      id: momId,
      name: "Mom",
      email: "glorymarfidder@gmail.com",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      id: dadId,
    },
    create: {
      id: dadId,
      name: "Dad",
      email: "johnfidder@gmail.com",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      id: sarahId,
    },
    create: {
      id: sarahId,
      name: "Sarah",
      email: "sarahfidder@gmail.com",
    },
    update: {},
  });

  const goalDate = new Date("2026-05-26");

  await db.participant.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      userId: gabeId,
      goalWeight: 210.0,
      goalDate,
      startingWeight: 242.5,
    },
    update: {},
  });

  await db.participant.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      userId: momId,
      goalWeight: 145.0,
      goalDate,
      startingWeight: 165.0,
    },
    update: {},
  });

  await db.participant.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      userId: dadId,
      goalWeight: 170.0,
      goalDate,
      startingWeight: 190.0,
    },
    update: {},
  });

  await db.participant.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      userId: sarahId,
      goalWeight: 125.0,
      goalDate,
      startingWeight: 140.5,
    },
    update: {},
  });

  const firstDate = new Date("2026-01-06");
  const secondDate = new Date("2026-01-13");
  const thirdDate = new Date("2026-01-20");

  await db.weighIns.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      participantId: 1,
      date: firstDate,
      weight: 240.8,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      participantId: 1,
      date: secondDate,
      weight: 239.2,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 3,
    },
    create: {
      id: 3,
      participantId: 1,
      date: thirdDate,
      weight: 237.8,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 4,
    },
    create: {
      id: 4,
      participantId: 2,
      date: firstDate,
      weight: 163.2,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 5,
    },
    create: {
      id: 5,
      participantId: 2,
      date: secondDate,
      weight: 161.8,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 6,
    },
    create: {
      id: 6,
      participantId: 2,
      date: thirdDate,
      weight: 160.5,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 7,
    },
    create: {
      id: 7,
      participantId: 3,
      date: firstDate,
      weight: 188.5,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 8,
    },
    create: {
      id: 8,
      participantId: 3,
      date: secondDate,
      weight: 186.9,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 9,
    },
    create: {
      id: 9,
      participantId: 3,
      date: thirdDate,
      weight: 185.2,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 10,
    },
    create: {
      id: 10,
      participantId: 4,
      date: firstDate,
      weight: 138.7,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 11,
    },
    create: {
      id: 11,
      participantId: 4,
      date: secondDate,
      weight: 137.3,
    },
    update: {},
  });

  await db.weighIns.upsert({
    where: {
      id: 12,
    },
    create: {
      id: 12,
      participantId: 4,
      date: thirdDate,
      weight: 136.1,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
