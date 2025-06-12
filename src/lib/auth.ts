import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";
import { VerificationEmailParams, verificationEmail } from "@/lib/email";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nextCookies } from "better-auth/next-js";
import { getDbAsync } from "./db";

export async function getAuth() {
  const { env } = await getCloudflareContext({ async: true })
  const db = await getDbAsync()
  const resend = new Resend(env.RESEND_API_KEY)
  return betterAuth({
    baseURL: env.APP_HOST + "/api/auth",
    database: prismaAdapter(db, {
      provider: "sqlite",
    }),
    socialProviders: {
      apple: {
        clientId: env.APPLE_CLIENT_ID as string,
        clientSecret: env.APPLE_CLIENT_SECRET as string,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      },
      facebook: {
        clientId: env.FACEBOOK_CLIENT_ID as string,
        clientSecret: env.FACEBOOK_CLIENT_SECRET as string,
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    emailVerification: {
      sendOnSignUp: true, // Automatically sends a verification email at signup
      autoSignInAfterVerification: true, // Automatically signIn the user after verification
      sendVerificationEmail: async ({ user, url }) => {
        const params: VerificationEmailParams = {
          firstName: user.name,
          serviceName: 'Rollingsagas',
          verificationLink: url,
          supportEmail: 'support@rollingsagas.com',
        };

        const { subject, text, html } = verificationEmail(params);

        const { error } = await resend.emails.send({
          from: 'Support <support@rollingsagas.com>',
          to: [user.email],
          subject,
          html,
          text
        });

        if (error) {
          return console.error({ error });
        }
      },
    },
    advanced: {
      cookiePrefix: "br"
    },
    plugins: [nextCookies()]
  })
}
