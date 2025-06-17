"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuItem } from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { User } from "@/lib/auth"


function MenuItem({ link, label, icon }: { link: string, label: string, icon: string }) {
  return (
    <DropdownMenuItem asChild className="text-base h-12">
      <Link href={link} className="px-4 space-x-2">
        <i className={`fa-light fa-${icon} fa-lg`}></i>
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  )
}

export default function ProfileButton({ user }: { user: User | undefined }) {
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer rounded-full hover:bg-chart-3/10 size-10" data-tooltip-id="tp" data-tooltip-content={"Open profile menu"} data-tooltip-variant="dark" data-tooltip-place="bottom-end">
            {!user.image && <i className={`fa-regular fa-user fa-lg`}></i>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" sideOffset={14} alignOffset={100} onCloseAutoFocus={(e) => e.preventDefault()}>
          <MenuItem link="/profile" label="View Profile" icon="user" />
          <DropdownMenuItem asChild>
            <ModeToggle />
          </DropdownMenuItem>
          <MenuItem link="/auth/sign-out" label="Sign Out" icon="arrow-right-from-bracket" />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return <Button variant="ghost" asChild><Link href="/auth/sign-up">Sign up</Link></Button>
}
