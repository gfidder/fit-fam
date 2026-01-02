"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// import { api } from "~/trpc/react";

export function AddParticipant() {
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    startWeight: "",
    goalWeight: "",
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700"
      >
        + Add Participant
      </button>
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="mb-5 text-center text-xl font-semibold text-gray-700">
              + Add New Participant
            </DialogTitle>
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
                  setNewParticipant({
                    ...newParticipant,
                    goalWeight: e.target.value,
                  })
                }
                className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-lg bg-gray-600 px-5 py-2 font-semibold text-white hover:bg-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-400 px-5 py-2 font-semibold text-white hover:bg-blue-500">
                Add Participant
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
