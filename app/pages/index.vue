<script setup lang="ts">
import StatCard from "~/components/StatCard.vue";
const { $trpc } = useNuxtApp();

const participants =
  (await $trpc.participant.getParticipants.useQuery().data.value) ?? [];

if (participants === undefined) {
  console.error("Did not load in any participants");
}

const numberOfParticipants = participants.length;
console.log(numberOfParticipants);

async function getCurrentWeight(participantId: number) {
  let currentWeight = 0;

  const startWeight =
    await $trpc.participant.getParticipantStartWeight.useQuery({
      id: participantId,
    });
  const { data: weights } =
    await $trpc.participant.getParticipantWeights.useQuery({
      id: participantId,
    });

  if (weights.value !== undefined && startWeight.data.value !== undefined) {
    if (weights.value.length > 0) {
      currentWeight = weights.value[weights.value.length - 1]?.weight ?? 0;
    } else {
      currentWeight = startWeight.data.value;
    }
  }

  return currentWeight;
}

async function getWeightLost(participantId: number, startWeight: number) {
  const weightLoss = startWeight - (await getCurrentWeight(participantId));

  return weightLoss;
}

async function getRemainingWeight(participantId: number, goalWeight: number) {
  const remaining = Math.max(
    0,
    (await getCurrentWeight(participantId)) - goalWeight,
  );

  return remaining;
}

function getWeeksRemaining(goalDate: Date) {
  const today = new Date();
  const diffTime = goalDate.getTime() - today.getTime();
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

  return Math.max(0, diffWeeks);
}

async function getWeeklyTarget(
  participantId: number,
  goalWeight: number,
  goalDate: Date,
) {
  const remaining = await getRemainingWeight(participantId, goalWeight);
  const weeks = getWeeksRemaining(goalDate);

  return weeks > 0 ? remaining / weeks : 0;
}

let totalStartWeight = 0;
let totalCurrentWeight = 0;
let totalGoalWeight = 0;
const goalDates: Date[] = [];

for (let i = 0; i < participants.length; i++) {
  const p = participants.at(i);
  if (p !== undefined) {
    const currentWeight = await getCurrentWeight(p.id);
    totalStartWeight = totalStartWeight + p.startingWeight;
    totalCurrentWeight = totalCurrentWeight + currentWeight;
    totalGoalWeight = totalGoalWeight + p.goalWeight;
    goalDates.push(p.goalDate);
  }
}

const totalLost = totalStartWeight - totalCurrentWeight;
const totalToLose = totalStartWeight - totalGoalWeight;
const progressPercent = totalToLose > 0 ? (totalLost / totalToLose) * 100 : 0;

const mostCommonGoalDate =
  goalDates
    .sort(
      (a, b) =>
        goalDates.filter((date) => date === a).length -
        goalDates.filter((date) => date === b).length,
    )
    .pop() ?? new Date();
const weeksToGoal = getWeeksRemaining(mostCommonGoalDate);

const tableHeaders = [
  "Name",
  "Starting Weight",
  "Current Weight",
  "Goal Weight",
  "Lost So Far",
  "Remaining",
  "Weekly Target",
  "Progress %",
];

interface participantInfo {
  id: number;
  userId: string;
  startingWeight: number;
  currentWeight: number;
  goalWeight: number;
  weightLost: number;
  remaining: number;
  weeklyTarget: number;
  goalProgress: number;
  lostColor: string;
  progressBar: string;
}

const participantsInfo: Array<participantInfo> = [];

for (let i = 0; i < participants.length; i++) {
  const participant = participants.at(i);
  if (participant !== undefined) {
    const currentWeight = await getCurrentWeight(participant.id);
    const weightLost = await getWeightLost(
      participant.id,
      participant.startingWeight,
    );
    const remaining = await getRemainingWeight(
      participant.id,
      participant.goalWeight,
    );
    const weeklyTarget = await getWeeklyTarget(
      participant.id,
      participant.goalWeight,
      participant.goalDate,
    );
    const goalProgress =
      participant.startingWeight - participant.goalWeight > 0
        ? (weightLost / (participant.startingWeight - participant.goalWeight)) *
          100
        : 0;
    const lostColor =
      weightLost > 0
        ? "text-green-600"
        : weightLost < 0
          ? "text-red-600"
          : "text-gray-600";
    const progressBarColor: string =
      goalProgress >= 100 ? "bg-green-600" : "bg-blue-400";

    participantsInfo.push({
      id: participant.id,
      userId: participant.userId,
      startingWeight: participant.startingWeight,
      currentWeight,
      goalWeight: participant.goalWeight,
      weightLost,
      goalProgress,
      remaining,
      weeklyTarget,
      lostColor,
      progressBar: progressBarColor,
    });
  }
}
</script>

<template>
  <div class="p-8">
    <div class="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <!-- <StatCard
        title="Family Members"
        :value="numberOfParticipants.toFixed(0)"
        subtext="Active Participants"
      /> -->
      <StatCard
        title="Weeks to Current Goals"
        :value="weeksToGoal.toString() ?? ''"
        subtext="weeks remaining"
      />
      <StatCard
        title="Total Weight Lost"
        :value="totalLost.toFixed(1) ?? ''"
        subtext="pounds lost so far"
      />
      <StatCard
        title="Average Per Person"
        :value="
          numberOfParticipants > 0
            ? ((totalLost / numberOfParticipants).toFixed(1) ?? '')
            : '0.0'
        "
        subtext="pounds lost each"
      />
      <StatCard
        title="Goal Progress"
        :value="`${progressPercent.toFixed(0) ?? ''}%`"
        subtext="of total goal achieved"
      />
      <StatCard
        title="Remaining"
        :value="(totalToLose - totalLost).toFixed(1) ?? ''"
        subtext="pounds to family goal"
      />
    </div>

    <div class="overflow-x-auto rounded-xl shadow-md">
      <h3 class="mb-4 text-lg font-semibold text-gray-700">
        Family Progress Summary
      </h3>
      <table class="w-full border-collapse bg-white">
        <thead>
          <tr class="bg-gray-100">
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-700"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pInfo in participantsInfo"
            :key="pInfo.userId"
            class="hover:bg-gray-50"
          >
            <td class="p3 border-b border-gray-100 text-sm">
              <strong>{{ pInfo.userId }}</strong>
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              {{ pInfo.startingWeight.toFixed(1) }} lbs
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              {{ pInfo.currentWeight.toFixed(1) }} lbs
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              {{ pInfo.goalWeight.toFixed(1) }} lbs
            </td>
            <td
              :class="['p3 border-b border-gray-100 text-sm', pInfo.lostColor]"
            >
              {{ pInfo.weightLost > 0 ? "-" : pInfo.weightLost < 0 ? "+" : "" }}
              {{ Math.abs(pInfo.weightLost).toFixed(1) }} lbs
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              {{ pInfo.remaining.toFixed(1) }} lbs
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              {{ pInfo.weeklyTarget.toFixed(1) }} lbs/week
            </td>
            <td class="p3 border-b border-gray-100 text-sm">
              <div class="flex items-center">
                <div class="mr-2 h-2 w-15 rounded bg-gray-200">
                  {{ pInfo.weeklyTarget.toFixed(1) }} lbs/week
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
