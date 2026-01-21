"use server";

import { getSession } from "~/server/better-auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/server";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AddParticipant } from "../_components/AddParticipant";
import { LogWeight } from "../_components/LogWeight";

export default async function Profile() {
  const session = await getSession();
  const userId = session?.user.id ?? "";
  const participantExists = await api.participant.doesParticipantExist({
    userId,
  });
  // we can set to 0 since this should only work if the participant exists
  const participantId =
    (await api.participant.getParticipantId({ userId })) ?? 0;

  return (
    <>
      {session ? (
        <div>
          <AddParticipant
            doesParticipantExist={participantExists}
            userId={userId}
          />
          {participantExists && (
            <div>
              <LogWeight participantId={participantId} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3 className="flex pt-8 text-xl font-semibold">
            You are not logged in
          </h3>
          <p className="flex p-6 font-medium">
            Please log in to access your profile
          </p>
        </div>
      )}
    </>
  );
}
