import { getAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function GET(_: Request) {
  // You may need vpn to make it works in local env
  const auth = await getAuth()
  const res = await auth.api.signInSocial({
    body: {
      provider: "facebook"
    }
  })
  revalidatePath("/")
  if (res.url) {
    redirect(res.url)
  } else {
    console.error("facebook auth url not found:", res)
    redirect("/")
  }
}
