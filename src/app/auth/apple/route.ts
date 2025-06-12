import { getAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function GET(_: Request) {
  const auth = await getAuth()
  const res = await auth.api.signInSocial({
    body: {
      provider: "apple"
    }
  })
  revalidatePath("/")

  if (res.url) {
    redirect(res.url)
  } else {
    console.error("apple auth url not found:", res)
    redirect("/")
  }
}
