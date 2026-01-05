import { auth } from ".";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const h = await headers();
  console.log("cookie header:", h.get("cookie"));

  const result = await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });
  console.log("result:", result);

  return result;
});
