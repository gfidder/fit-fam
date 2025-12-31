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

  const getWeeksRemaining = (goalDate: Date) => {
    const today = new Date();
    const diffTime = goalDate.getTime() - today.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, diffWeeks);
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
              <tr className="bg-gray-100"></tr>
            </thead>
          </table>
        </div>
      </div>
    </HydrateClient>
  );
}
