"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

interface DateObject {
  date: Date;
  formatted: string;
  key: number;
}

export default function DataEntry() {
  const [participants] = api.participant.getParticipants.useSuspenseQuery();

  const getParticipantWeights = (participantId: number) => {
    const weights = api.participant.getParticipantWeights.useSuspenseQuery({
      id: participantId,
    });

    return weights;
  };

  const [showHidden, setShowHidden] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);

  const [weekDates, setWeekDates] = useState<Array<DateObject>>([]);

  const setDates = () => {
    const dates: DateObject[] = [];

    const startDate = new Date("2026-01-06T12:00:00");

    for (let i = 0; i < 52; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i * 7);

      const month = date.toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      });
      const day = date.getUTCDate();

      const key = date.toISOString().split("T")[0];
      let keyNum;

      if (key !== undefined) {
        keyNum = Number(key);
      } else {
        keyNum = 0;
      }

      dates.push({
        date: date,
        formatted: `${month} ${day}`,
        key: keyNum,
      });
    }
    setWeekDates(dates);
  };
  setDates();

  const updateGoalWeight = (participantId: number, goalWeight: number) => {
    api.participant.setGoalWeight.useQuery({
      id: participantId,
      goalWeight,
    });
  };

  const updateGoalDate = (participantId: number, goalDate: Date) => {
    //
  };

  return (
    <div className="p-8">
      <div className="mb-6 rounded-xl border-4 border-red-800 bg-red-600 p-5 text-center text-white">
        <h2 className="m-0 mb-2 text-3xl font-bold">
          ⚠️ PLEASE DO NOT EDIT THIS PAGE ⚠️
        </h2>
        <p className="m-0 text-xl font-semibold">
          SEND YOUR WEEKLY WEIGHT TO GABE FOR HIM TO ENTER
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700"
        >
          + Add New Participant
        </button>
        <button
          onClick={() => setShowHidden(!showHidden)}
          className={`rounded-lg px-6 py-3 font-semibold text-white transition-all ${showHidden ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"}`}
        >
          {showHidden
            ? "Hide Hiddent Participants"
            : "Show Hidden Participants"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="sticky top-0 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="sticky top-0 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700">
                Starting Weight
              </th>
              <th className="sticky top-0 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700">
                Goal Weight
              </th>
              <th className="sticky top-0 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700">
                Goal Date
              </th>
              {weekDates.slice(0, 35).map((week, index) => (
                <th
                  key={week.key}
                  className="sticky top-0 min-w-20 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700"
                >
                  {week.formatted}
                  <br />
                  Week {index + 1}
                </th>
              ))}
              <th className="sticky top-0 border-b-2 border-gray-200 bg-gray-100 p-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.userId} className="hover:bg-gray-50">
                <td className="border-b border-gray-100 p-3 text-sm">
                  <strong>{participant.userId}</strong>
                </td>
                <td className="border-b border-gray-100 p-3 text-sm">
                  {participant.startingWeight} lbs
                </td>
                <td className="border-b border-gray-100 p-3 text-sm">
                  <input
                    type="number"
                    value={participant.goalWeight}
                    onChange={(e) => {
                      updateGoalWeight(participant.id, e.target.valueAsNumber);
                    }}
                    className="w-17.5 rounded border border-gray-300 px-2 py-1 text-center"
                  />
                </td>
                <td className="border-b border-gray-100 p-3 text-sm">
                  <input
                    type="date"
                    // TODO - Fix how this string is being rendered
                    value={participant.goalDate.toLocaleDateString()}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      updateGoalDate(participant.id, date);
                    }}
                    className="w-35 rounded border border-gray-300 px-2 py-1"
                  />
                </td>
                {weekDates.slice(0, 35).map((week) => {
                  const weightValue = getParticipantWeights(participant.id);
                  const displayValue =
                    weightValue !== undefined && weightValue !== null
                      ? String(weightValue.at(week.key)?.weight)
                      : "";
                  return (
                    <td
                      key={week.key}
                      className="border-b border-gray-100 p-3 text-sm"
                    >
                      <input type="number" step="0.1" value={displayValue} />
                    </td>
                  );
                })}
                <td className="border-b border-gray-100 p-3 text-sm"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
