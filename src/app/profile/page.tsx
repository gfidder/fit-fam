import { getSession } from "~/server/better-auth/server";
import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  console.log(session);

  if (!session) {
    unauthorized();
  }

  return (
    <>
      <form>
        <button></button>
      </form>
    </>
  );
}
