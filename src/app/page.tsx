import { StatCard } from "./_components/stat_card";
import { auth } from "~/server/better-auth";
import { getSession } from "~/server/better-auth/server";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const participants = await api.participant.getParticipants();

  const numberOfParticipants = await api.participant.getNumberOfParticipants();

  const getCurrentWeight = async (participantId: number): Promise<number> => {
    let currentWeight = 0;

    const startWeight = await api.participant.getParticipantStartWeight({
      id: participantId,
    });
    const weights = await api.participant.getParticipantWeights({
      id: participantId,
    });

    if (weights.length > 0) {
      currentWeight = weights[weights.length - 1]?.weight ?? 0;
    } else {
      currentWeight = startWeight;
    }

    return currentWeight;
  };

  const getWeightLost = async (participantId: number, startWeight: number) =>
    startWeight - (await getCurrentWeight(participantId));
  const getRemainingWeight = async (
    participantId: number,
    goalWeight: number,
  ) => Math.max(0, (await getCurrentWeight(participantId)) - goalWeight);

  const getWeeksRemaining = (goalDate: Date) => {
    const today = new Date();
    const diffTime = goalDate.getTime() - today.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, diffWeeks);
  };

  const getWeeklyTarget = async (
    participantId: number,
    goalWeight: number,
    goalDate: Date,
  ) => {
    const remaining = await getRemainingWeight(participantId, goalWeight);
    const weeks = getWeeksRemaining(goalDate);
    return weeks > 0 ? remaining / weeks : 0;
  };

  const totalStartWeight = participants.reduce(
    (sum, p) => sum + p.startingWeight,
    0,
  );

  let totalCurrentWeight = 0;
  participants.forEach(async (participant) => {
    const currentWeight = await getCurrentWeight(participant.id);
    totalCurrentWeight = totalCurrentWeight + currentWeight;
  });
  const totalGoalWeight = participants.reduce(
    (sum, p) => sum + p.goalWeight,
    0,
  );
  const totalLost = totalStartWeight - totalCurrentWeight;
  const totalToLose = totalStartWeight - totalGoalWeight;
  const progressPercent = totalToLose > 0 ? (totalLost / totalToLose) * 100 : 0;

  const goalDates = participants.map((p) => p.goalDate);
  const mostCommonGoalDate =
    goalDates
      .sort(
        (a, b) =>
          goalDates.filter((date) => date === a).length -
          goalDates.filter((date) => date === b).length,
      )
      .pop() ?? new Date();
  const weeksToGoal = getWeeksRemaining(mostCommonGoalDate);

  const session = await getSession();

  if (session) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="p-8">
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Family Members"
            value={numberOfParticipants.toString()}
            subtext="Active Participants"
          />
          <StatCard
            title="Weeks to Current Goals"
            value={weeksToGoal.toString()}
            subtext="weeks remaining"
          />
          <StatCard
            title="Total Weight Lost"
            value={totalLost.toFixed(1)}
            subtext="pounds lost so far"
          />
          <StatCard
            title="Average Per Person"
            value={
              numberOfParticipants > 0
                ? (totalLost / numberOfParticipants).toFixed(1)
                : "0.0"
            }
            subtext="pounds lost each"
          />
          <StatCard
            title="Goal Progress"
            value={`${progressPercent.toFixed(0)}%`}
            subtext="of total goal achieved"
          />
          <StatCard
            title="Remaining"
            value={(totalToLose - totalLost).toFixed(1)}
            subtext="pounds to family goal"
          />
        </div>

        <div className="overflow-x-auto rounded-xl shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Family Progress Summary
          </h3>
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Name",
                  "Starting Weight",
                  "Current Weight",
                  "Goal Weight",
                  "Lost So Far",
                  "Remaining",
                  "Weekly Target",
                  "Progress %",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b-2 border-gray-200 p-4 text-left text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participants.map(async (participant) => {
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
                    ? (weightLost /
                        (participant.startingWeight - participant.goalWeight)) *
                      100
                    : 0;
                const lostColor =
                  weightLost > 0
                    ? "text-green-600"
                    : weightLost < 0
                      ? "text-red-600"
                      : "text-gray-600";
                const progressBarColor =
                  goalProgress >= 100 ? "bg-green-600" : "bg-blue-400";

                return (
                  <tr key={participant.userId} className="hover:bg-gray-50">
                    <td className="p3 border-b border-gray-100 text-sm">
                      <strong>{participant.userId}</strong>
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      {participant.startingWeight.toFixed(1)} lbs
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      {currentWeight.toFixed(1)}
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      {participant.goalWeight.toFixed(1)} lbs
                    </td>
                    <td
                      className={`p3 border-b border-gray-100 text-sm ${lostColor} font-bold`}
                    >
                      {weightLost > 0 ? "-" : weightLost < 0 ? "+" : ""}
                      {Math.abs(weightLost).toFixed(1)} lbs
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      {remaining.toFixed(1)} lbs
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      {weeklyTarget.toFixed(1)} lbs/week
                    </td>
                    <td className="p3 border-b border-gray-100 text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-15 rounded bg-gray-200">
                          <div
                            className={`${progressBarColor} h-full rounded`}
                            style={{ width: `${Math.min(100, goalProgress)}%` }}
                          />
                        </div>
                        {goalProgress.toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HydrateClient>
  );
}
