import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";

import { unstable_cache } from 'next/cache';

export default async function ProfileButton() {
  const auth = await getAuth()
  const h = await headers()

  const session = await unstable_cache(async () => {
    return await auth.api.getSession({
      headers: h
    })
  }, ["user-session"], { tags: ["user"] })()

  if (session) {
    return (
      <div className="flex font-medium">
        <span>{session.user.name}</span>
      </div>
    )
  }

  return <div>Not found</div>
}
