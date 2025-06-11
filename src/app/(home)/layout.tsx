import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-background sticky top-0 z-50 w-full">
        <div className="container-wrapper 3xl:fixed:px-0 px-6">
          <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <img src="/BZ.svg" alt="logo" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}
