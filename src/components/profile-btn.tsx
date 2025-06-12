import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { ChevronDown, LogOut, User } from "lucide-react";

import { unstable_cache } from 'next/cache';
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuItem } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export default async function ProfileButton() {
  const auth = await getAuth()
  const h = await headers()

  const session = await unstable_cache(async () => {
    return await auth.api.getSession({
      headers: h
    })
  }, ["user-session"], { tags: ["user"] })()

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {session.user.name}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 mr-4 text-xl">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="font-medium">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/auth/sign-out" className="font-medium">Sign out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return <>
    <Button variant="ghost" asChild><Link href="/auth/sign-in">Sign in</Link></Button>
    <Separator orientation="vertical" />
    <Button variant="ghost" asChild><Link href="/auth/sign-up">Sign up</Link></Button>
  </>

}
