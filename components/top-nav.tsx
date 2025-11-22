"use client"

import { Sun, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TopNav() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-2">
        <div className="relative h-5 w-5">
          <Square className="h-5 w-5 text-foreground stroke-foreground" strokeWidth={1.5} />
          <div className="absolute left-1 top-1 h-3 w-3 border border-foreground bg-foreground/10" />
        </div>
        <h1 className="text-lg font-semibold text-foreground">Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto gap-2 px-3 py-2 text-foreground hover:bg-transparent">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/50">
                <span className="text-lg">🇺🇸</span>
              </div>
              <span className="text-sm text-foreground">English</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground">
          <Sun className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

