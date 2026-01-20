"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { api } from "~/trpc/react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface Props {
  doesParticipantExist: boolean;
  userId: string | null;
}

export function AddParticipant({ doesParticipantExist, userId }: Props) {
  type Inputs = {
    startingWeight: number;
    goalWeight: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [newParticipant, setNewParticipant] = useState({
    startWeight: 0.0,
    goalWeight: 0.0,
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [trpcError, setTrpcError] = useState("");

  let buttonText = "Create Participant";
  if (doesParticipantExist === true) {
    buttonText = "Update Goal";
  }

  const createParticipant = api.participant.createParticipant.useMutation({
    onSuccess: () => {
      console.log("it worked");
      setIsError(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(242);
    console.log(data);

    createParticipant.mutate({
      goalWeight: data.goalWeight,
      startingWeight: data.startingWeight,
      userId: userId ?? "",
    });
  };

  function submitFunction() {
    console.log(newParticipant);

    if (doesParticipantExist) {
    } else {
      createParticipant.mutate({
        goalWeight: newParticipant.goalWeight as unknown as number,
        startingWeight: newParticipant.startWeight,
        userId: userId ?? "",
      });
    }
  }

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700"
      >
        {buttonText}
      </button>
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50 p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="mb-5 text-center text-xl font-semibold text-gray-700">
              {buttonText}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="startingWeight"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Starting Weight (lbs)
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("startingWeight", {
                        required: true,
                        min: 0.0,
                        valueAsNumber: true,
                      })}
                      id="startingWeight"
                      name="startingWeight"
                      type="number"
                      step={0.1}
                      required
                      className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="goalWeight"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Goal Weight (lbs)
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("goalWeight", {
                        required: true,
                        min: 0.0,
                        valueAsNumber: true,
                      })}
                      required
                      type="number"
                      id="goalWeight"
                      name="goalWeight"
                      step={0.1}
                      className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  className="rounded-lg bg-gray-600 px-5 py-2 font-semibold text-white hover:bg-gray-700"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-blue-400 px-5 py-2 font-semibold text-white hover:bg-blue-500"
                  type="submit"
                >
                  Add Participant
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
