"use server"
import { getAuth } from "@/lib/auth"

type FormState = {
  success: boolean;
  message?: string;
};

export async function signUp(
  _: FormState,
  payload: { name: string, password: string, email: string }
): Promise<FormState> {
  const auth = await getAuth();
  try {
    await auth.api.signUpEmail({
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        callbackURL: process.env.APP_HOST
      },
    })
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message }
    } else {
      return { success: false, message: "unknown error" }
    }
  }

  return { success: true }
}


export async function signIn(
  _: FormState,
  payload: { password: string, email: string }
): Promise<FormState> {
  const auth = await getAuth();
  try {
    await auth.api.signInEmail({
      body: {
        email: payload.email,
        password: payload.password,
        callbackURL: process.env.APP_HOST
      },
    })
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message }
    } else {
      return { success: false, message: "unknown error" }
    }
  }

  return { success: true }
}
