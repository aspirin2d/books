import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const auth = await getAuth()
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="p-2">
      <div>Hello{
        session ? `, ${session.user.name}.` : "."
      }</div>
      {
        session ? (
          <Link href="/auth/sign-out">Sign out</Link>
        ) : (
          <div>Please <Link className="underline text-blue-500" href="/auth/sign-in">Sigin in</Link> or <Link className="underline text-blue-500" href="/auth/sign-up">Sign up</Link></div>
        )
      }
    </div >
  );
}
