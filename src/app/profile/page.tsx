"use server";

import { getSession } from "~/server/better-auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  return (
    <>
      {session ? (
        <div>logged in</div>
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
