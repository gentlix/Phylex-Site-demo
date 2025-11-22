"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Eye, 
  ShoppingCart, 
  FileText, 
  List, 
  Ticket,
  MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Overview", href: "/", icon: Eye },
  { name: "Order new service", href: "/order", icon: ShoppingCart },
]

const finances = [
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Transactions", href: "/transactions", icon: List },
]

const help = [
  { name: "Tickets", href: "/tickets", icon: List },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="relative h-8 w-8 shrink-0">
          <div className="absolute inset-0 rotate-45 rounded-sm bg-[#5B9BD5]"></div>
          <div className="absolute left-1 top-1 h-4 w-4 rotate-45 rounded-sm bg-[#B4D7ED]"></div>
        </div>
        <span className="text-lg font-semibold text-foreground">Phylex Platforms</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Main
        </div>
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-foreground" : "text-muted-foreground")} />
                <span className={isActive ? "text-foreground" : "text-muted-foreground"}>{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Finances
          </div>
          <div className="space-y-1">
            {finances.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Help Center
          </div>
          <div className="space-y-1">
            {help.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 border border-border bg-muted flex items-center justify-center shrink-0">
            <div className="grid grid-cols-2 gap-0.5 h-full w-full p-1">
              <div className="bg-foreground/20"></div>
              <div className="bg-foreground/40"></div>
              <div className="bg-foreground/40"></div>
              <div className="bg-foreground/20"></div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">Karina Bokovskaya</p>
            <p className="text-xs text-muted-foreground truncate">@im_karabiina</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-1 hover:bg-accent text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

