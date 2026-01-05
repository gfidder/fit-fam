import { getSession } from "~/server/better-auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  console.log(session);

  return (
    <>
      <form>
        <button></button>
      </form>
    </>
  );
}
