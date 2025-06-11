import EmailSignInForm from "@/components/sign-in-form"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in to RollingSagas",
  description: "...", // TODO: add description here
};

export default function Page() {
  return (
    <EmailSignInForm />
  )
}
