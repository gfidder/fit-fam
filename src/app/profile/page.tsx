"use server";

import { getSession } from "~/server/better-auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/server";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AddParticipant } from "../_components/AddParticipant";

export default async function Profile() {
  const session = await getSession();
  const userId = session?.user.id ?? "";
  const participantExists = await api.participant.doesParticipantExist({
    userId,
  });

  return (
    <>
      {session ? (
        <div>
          <AddParticipant
            doesParticipantExist={participantExists}
            userId={userId}
          />
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
