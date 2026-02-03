"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Search,
  Menu,
  Wand2,
  Library,
  ShoppingBag,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/blockchain/connect-wallet"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Generar", href: "/studio", icon: Wand2, description: "Crear música con IA" },
  { name: "Mi biblioteca", href: "/studio/library", icon: Library, description: "Tus pistas guardadas" },
  { name: "Marketplace", href: "/studio/marketplace", icon: ShoppingBag, description: "Compra y vende beats" },
]

const secondaryNav = [
  { name: "Ajustes", href: "/studio/settings", icon: Settings },
  { name: "Ayuda", href: "/studio/help", icon: HelpCircle },
]

export function StudioHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu - Hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-foreground p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-card border-border p-0">
              <SheetHeader className="p-6 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                    <Image
                      src="/SinterLogo.jpeg"
                      alt="Sinter"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xl font-bold text-foreground">Sinter</span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <nav className="p-4 space-y-1">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Crear
                </p>
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <div className="flex-1">
                        <span>{item.name}</span>
                        {item.description && (
                          <p className={cn(
                            "text-xs mt-0.5",
                            isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Secondary Navigation */}
              <div className="px-4 py-4 space-y-1 border-t border-border">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cuenta
                </p>
                {secondaryNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setShowLogoutConfirm(true)
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo for mobile (since sidebar is hidden) */}
          <Link href="/studio" className="md:hidden flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image
                src="/SinterLogo.jpeg"
                alt="Sinter"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold text-foreground">Sinter</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pistas, géneros..."
              className="w-64 pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ConnectWallet />
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">¿Cerrar sesión?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Tendrás que volver a iniciar sesión para acceder a tu biblioteca y configuración.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-destructive-foreground bg-destructive hover:bg-destructive/90 rounded-lg transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
