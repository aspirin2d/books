"use client"

import { startTransition, useActionState } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"

import passwordSchema from "@/lib/utils/password-schema"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUp } from "@/actions/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import SocialAuth from "./social-auth"

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Username should contains at least 2 character" }),
  email: z.email(),
  password: passwordSchema,
})

export default function EmailSignUpForm() {
  const [state, action, pending] = useActionState(signUp, { success: false })

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      action(values)
    })
  }

  if (state.success) {
    return redirect("/")
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 transition-transform">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Sign up to RollingSagas
            </p>
          </div>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                </div>
                <FormControl>
                  <Input type="password" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>Sign up</Button>

          {state.message && <div className="text-sm font-medium text-red-500">{state.message}</div>}

          <SocialAuth />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form >
  )
}
