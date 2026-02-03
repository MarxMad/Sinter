"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Wand2,
  Library,
  ShoppingBag,
  Settings,
  HelpCircle,
  LogOut,
  Music,
  User,
  ChevronDown,
  Crown,
  CreditCard,
  Bell,
  ExternalLink
} from "lucide-react"
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

export function StudioSidebar() {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Mock user data - in production this would come from auth context
  const user = {
    name: "Usuario Demo",
    email: "demo@sinter.app",
    plan: "Pro",
    avatar: null,
    tracksGenerated: 147,
  }

  const handleLogout = () => {
    // In production, this would call auth logout
    window.location.href = "/"
  }

  return (
    <>
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        {/* Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/SinterLogo.jpeg"
                alt="Sinter"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Sinter
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Crear
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
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
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="px-4 py-4 space-y-1 border-t border-border">
          <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Cuenta
          </p>
          {secondaryNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-4">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  {user.plan === "Pro" && (
                    <Crown className="h-3.5 w-3.5 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                showUserMenu && "rotate-180"
              )} />
            </div>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="mt-2 p-2 bg-secondary rounded-xl space-y-1">
              <Link
                href="/studio/settings"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors"
              >
                <User className="h-4 w-4" />
                Mi perfil
              </Link>
              <Link
                href="/studio/settings#subscription"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Suscripción
              </Link>
              <Link
                href="/studio/settings#notifications"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors"
              >
                <Bell className="h-4 w-4" />
                Notificaciones
              </Link>
              <div className="border-t border-border my-2" />
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Ir a la web
              </Link>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Plan {user.plan}</p>
              <p className="text-xs text-muted-foreground">Acceso ilimitado</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">{user.tracksGenerated}</span> pistas generadas este mes
          </div>
          <div className="mt-3 h-1.5 bg-primary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
              style={{ width: `${Math.min(user.tracksGenerated / 200 * 100, 100)}%` }}
            />
          </div>
        </div>
      </aside>

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
