"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Search } from "lucide-react"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"

export default function SearchButton() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="hidden sm:flex">
      <Button
        variant="ghost"
        className="bg-muted"
        onClick={() => setOpen(true)}
      >
        <Search className="text-muted-foreground" />
        <span className="hidden lg:inline-flex text-muted-foreground">Search story...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <div className="top-1.5 right-1.5 hidden gap-1 sm:flex">
          <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&amp;_svg:not([class*='size-'])]:size-3">
            ⌘
          </kbd>
          <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&amp;_svg:not([class*='size-'])]:size-3 aspect-square">
            K
          </kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type something to search..." />
        {/* <CommandList> */}
        {/*   <CommandEmpty>No results found.</CommandEmpty> */}
        {/*   <CommandGroup heading="Suggestions"> */}
        {/*     <CommandItem>Calendar</CommandItem> */}
        {/*     <CommandItem>Search Emoji</CommandItem> */}
        {/*     <CommandItem>Calculator</CommandItem> */}
        {/*   </CommandGroup> */}
        {/* </CommandList> */}
      </CommandDialog>
    </div>
  )
}
