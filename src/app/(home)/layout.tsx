import Link from "next/link";
import { Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import ProfileButton from "@/components/profile-btn";
import { getAuth } from "@/lib/auth";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import SearchButton from "@/components/search-btn";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400"
});

function TooltipLink({ name, link, icon, label }: { name: string, link: string, icon: string, label?: string }) {
  if (label) {
    return (
      <Button variant="ghost" asChild data-tooltip-id="tp" className="hover:bg-chart-3/10 h-10" data-tooltip-content={name} data-tooltip-variant="dark" data-tooltip-place="bottom">
        <Link href={link}>
          <i className={`fa-regular fa-${icon} fa-lg`}></i>
          <span className="font-medium text-base hidden md:flex">{label}</span>
        </Link>
      </Button>
    )
  }
  return (
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-chart-3/10 size-10" asChild data-tooltip-id="tp" data-tooltip-content={name} data-tooltip-variant="dark" data-tooltip-place="bottom-end">
      <Link href={link}>
        <i className={`fa-regular fa-${icon} fa-lg`}></i>
      </Link>
    </Button>
  )
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth()
  const h = await headers()

  const session = await unstable_cache(async () => {
    return await auth.api.getSession({
      headers: h
    })
  }, ["user-session"], { tags: ["user"] })()

  return (
    <SidebarProvider className="flex flex-col">
      <header className="bg-background sticky top-0 z-50 w-full border-b">
        <div className="container-wrapper 3xl:fixed:px-0 px-6">
          <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2">
            <Link href="/" data-tooltip-id="tp" data-tooltip-content={"Back to home"} data-tooltip-variant="dark" data-tooltip-place="right">
              <span className={`${pacifico.className} text-[26px] text-pink-600`}>BzReader</span>
              <span className="sr-only">bz-reader</span>
            </Link>
            <div className="flex-1 flex items-center lg:justify-center justify-end">
              <SearchButton />
            </div>
            <div className="flex-0 flex items-center md:space-x-2">
              <TooltipLink name="Compose your story" link="/compose" icon="pen-to-square" label="Compose" />
              <TooltipLink name="Open inbox" link="/actitivites" icon="bell" />
              <ProfileButton user={session ? session.user : undefined} />
            </div>
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <AppSidebar />
      </div>
      {children}
    </SidebarProvider>
  )
}
