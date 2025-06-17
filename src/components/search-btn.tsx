"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { CommandEmpty } from "cmdk"
import { Input } from "./ui/input"

export default function SearchButton() {
  const [open, setOpen] = useState(false)
  return (
    <Command className="rounded-full lg:max-w-lg border-0 bg-chart-3/10">
      <div className="flex items-center px-3">
        <i className="fa-regular fa-magnifying-glass fa-lg text-muted-foreground" />
        <Input onFocus={() => setOpen(true)} className="outline-0 border-0 focus-visible:ring-0" placeholder="Search BzReader" />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger />
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="lg:min-w-lg p-1!" sideOffset={16}>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandList>
              <CommandItem>
                Example Item
              </CommandItem>
            </CommandList>
          </CommandGroup>
        </PopoverContent>
      </Popover>
    </Command>
  )
}
