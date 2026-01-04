import { auth } from "~/server/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      {!session ? (
        <form>
          <button
            className="rounded-full bg-green-600/60 px-10 py-3 font-semibold no-underline transition hover:bg-green-600/70"
            formAction={async () => {
              "use server";
              const res = await auth.api.signInSocial({
                body: {
                  provider: "google",
                  callbackURL: "/profile",
                },
              });
              if (!res.url) {
                throw new Error("No URL returned from signInSocial");
              }
              redirect(res.url);
            }}
          >
            Sign in with Google
          </button>
        </form>
      ) : (
        <form>
          <button></button>
        </form>
      )}
    </>
  );
}
