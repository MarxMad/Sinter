"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Disc3, 
  Wand2, 
  Library, 
  ShoppingBag, 
  Settings, 
  HelpCircle,
  LogOut,
  Music
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Generate", href: "/studio", icon: Wand2 },
  { name: "My Library", href: "/studio/library", icon: Library },
  { name: "Marketplace", href: "/studio/marketplace", icon: ShoppingBag },
]

const secondaryNav = [
  { name: "Settings", href: "/studio/settings", icon: Settings },
  { name: "Help", href: "#", icon: HelpCircle },
]

export function StudioSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Disc3 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">BeatForge</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-6 space-y-1 border-t border-border">
        {secondaryNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors w-full">
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>

      <div className="p-4 mx-4 mb-4 bg-secondary rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Pro Plan</p>
            <p className="text-xs text-muted-foreground">Unlimited access</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="text-primary font-medium">147</span> tracks generated this month
        </div>
      </div>
    </aside>
  )
}
