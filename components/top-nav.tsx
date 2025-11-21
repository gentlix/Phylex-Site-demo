"use client"

import { Globe, Sun, Bell, HelpCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TopNav() {
  return (
    <div className="flex h-16 items-center justify-end gap-4 border-b bg-card px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm">English</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Spanish</DropdownMenuItem>
          <DropdownMenuItem>French</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon">
        <HelpCircle className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </div>
  )
}

