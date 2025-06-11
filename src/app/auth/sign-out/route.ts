import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const auth = await getAuth();
  await auth.api.signOut({
    headers: request.headers
  })

  redirect("/")
}
