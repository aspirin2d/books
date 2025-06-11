import EmailSignUpForm from "@/components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up to RollingSagas",
  description: "...", // TODO: add description here
};

export default function Page() {
  return (
    <EmailSignUpForm />
  )
}
