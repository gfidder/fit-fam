"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function AddWeight() {
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    startWeight: "",
    goalWeight: "",
  });

  return (
    <div>
      <h3 className="mb-5 text-center text-xl font-semibold text-gray-700">
        Add New Participant
      </h3>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter name (e.g. John)"
          maxLength={50}
          value={newParticipant.name}
          onChange={(e) =>
            setNewParticipant({ ...newParticipant, name: e.target.value })
          }
          className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
        />
        <input
          type="number"
          placeholder="Starting weight (lbs)"
          step={0.1}
          value={newParticipant.startWeight}
          onChange={(e) =>
            setNewParticipant({
              ...newParticipant,
              startWeight: e.target.value,
            })
          }
          className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
        />
        <input
          type="number"
          placeholder="Goal weight (lbs)"
          step={0.1}
          value={newParticipant.goalWeight}
          onChange={(e) =>
            setNewParticipant({ ...newParticipant, goalWeight: e.target.value })
          }
          className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
        />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button className="rounded-lg bg-gray-600 px-5 py-2 font-semibold text-white hover:bg-gray-700">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-400 px-5 py-2 font-semibold text-white hover:bg-blue-500">
          Add Participant
        </button>
      </div>
    </div>
  );
}
