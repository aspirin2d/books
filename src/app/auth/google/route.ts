import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
export async function GET(request: Request) {
  const auth = await getAuth()
  const res = await auth.api.signInSocial({
    body: {
      provider: "google"
    }
  })

  if (res.url) {
    console.log(res.url)
    redirect(res.url)
  } else {
    console.error("google auth url not found:", res)
    redirect("/")
  }
}
