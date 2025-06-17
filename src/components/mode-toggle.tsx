"use client"

import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  function onClick() {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <div className="rounded px-4 items-center h-12 w-full text-base font-normal flex justify-between hover:bg-muted cursor-default" onClick={() => onClick()}>
      <div className="space-x-3 pl-1">
        <i className={`fa-light fa-moon fa-lg`}></i>
        <span>Dark Mode</span>
      </div>
      <Switch checked={theme === "dark"} />
    </div>
  )
}
