import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Resend } from "resend";
import { VerificationEmailParams, verificationEmail } from "@/lib/email";
import prismaClients from "@/lib/prisma";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nextCookies } from "better-auth/next-js";


export async function getAuth() {
  const { env } = await getCloudflareContext({ async: true })
  const db = prismaClients.fetch(env.DB)
  const resend = new Resend(process.env.RESEND_API_KEY)
  return betterAuth({
    baseURL: process.env.APP_HOST + "/api/auth",
    database: prismaAdapter(db, {
      provider: "sqlite",
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    plugins: [nextCookies()]
  })
}
