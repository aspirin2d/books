import { ModeToggle } from "@/components/mode-toggle";
import ProfileButton from "@/components/profile-btn";
import SearchButton from "@/components/search-btn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
            <Button variant="ghost" size="icon">
              <Link href="/">
                <img src="/logo.svg" alt="logo" className="size-6" />
                <span className="sr-only">bzreader</span>
              </Link>
            </Button>
            <nav className="items-center gap-0.5 hidden lg:flex">
              <Button variant="ghost">
                <Link href="/">
                  Browse
                </Link>
              </Button>
              <Button variant="ghost">
                <Link href="/">
                  Bookshelf
                </Link>
              </Button>
              <Button variant="ghost">
                <Link href="/">
                  Activities
                </Link>
              </Button>
            </nav>
            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <SearchButton />
              <Separator orientation="vertical" className="hidden sm:flex" />
              <ModeToggle />
              <Separator orientation="vertical" className="hidden sm:flex" />
              <ProfileButton />
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  )
}
