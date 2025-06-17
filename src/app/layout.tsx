import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tooltip } from "@/components/ReactTooltip";
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BzRead",
  description: "...", // TODO: add description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            href="/logo.svg"
            type="image/<png>"
          />
        </head>
        <body
          className={`text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)] ${geistSans.variable} ${geistMono.variable} antialiased theme-default `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-background relative z-10 flex min-h-svh flex-col">
              {children}
              <Tooltip id="tp" className="z-60" />
            </div>
          </ThemeProvider>
        </body>
        <Script src="https://kit.fontawesome.com/d8ee3186cc.js" crossOrigin="anonymous" />
      </html >
    </>
  )
}
