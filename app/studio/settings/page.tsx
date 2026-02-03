"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    User,
    Bell,
    CreditCard,
    Shield,
    Wallet,
    Crown,
    Check,
    ChevronRight,
    Music,
    Volume2,
    Download,
    Trash2,
    ExternalLink
} from "lucide-react"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [notifications, setNotifications] = useState({
        email: true,
        marketing: false,
        updates: true,
        newFeatures: true,
    })

    // Mock user data
    const user = {
        name: "Usuario Demo",
        email: "demo@sinter.app",
        plan: "Pro",
        joinDate: "Enero 2026",
        tracksGenerated: 147,
        tracksInLibrary: 42,
    }

    const tabs = [
        { id: "profile", name: "Perfil", icon: User },
        { id: "subscription", name: "Suscripción", icon: CreditCard },
        { id: "notifications", name: "Notificaciones", icon: Bell },
        { id: "audio", name: "Audio", icon: Volume2 },
        { id: "wallet", name: "Wallet", icon: Wallet },
        { id: "privacy", name: "Privacidad", icon: Shield },
    ]

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Ajustes</h1>
                <p className="text-muted-foreground mt-1">
                    Gestiona tu cuenta y preferencias
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <nav className="lg:w-64 flex-shrink-0">
                    <div className="bg-card border border-border rounded-xl p-2 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Profile Section */}
                    {activeTab === "profile" && (
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Información del perfil</h2>

                                {/* Avatar */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                                        <User className="h-10 w-10 text-white" />
                                    </div>
                                    <div>
                                        <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                                            Cambiar foto
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG. Máximo 2MB</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input
                                            id="name"
                                            defaultValue={user.name}
                                            className="bg-secondary border-border text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue={user.email}
                                            className="bg-secondary border-border text-foreground"
                                        />
                                    </div>
                                </div>

                                <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Guardar cambios
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Estadísticas</h2>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="p-4 bg-secondary rounded-lg">
                                        <p className="text-2xl font-bold text-foreground">{user.tracksGenerated}</p>
                                        <p className="text-sm text-muted-foreground">Pistas generadas</p>
                                    </div>
                                    <div className="p-4 bg-secondary rounded-lg">
                                        <p className="text-2xl font-bold text-foreground">{user.tracksInLibrary}</p>
                                        <p className="text-sm text-muted-foreground">En biblioteca</p>
                                    </div>
                                    <div className="p-4 bg-secondary rounded-lg">
                                        <p className="text-2xl font-bold text-foreground">{user.joinDate}</p>
                                        <p className="text-sm text-muted-foreground">Miembro desde</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscription Section */}
                    {activeTab === "subscription" && (
                        <div className="space-y-6">
                            {/* Current Plan */}
                            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/30 rounded-xl p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Crown className="h-5 w-5 text-yellow-500" />
                                            <h2 className="text-lg font-semibold text-foreground">Plan Pro</h2>
                                        </div>
                                        <p className="text-muted-foreground">Acceso ilimitado a todas las funciones</p>
                                    </div>
                                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                                        Activo
                                    </span>
                                </div>
                                <div className="mt-6 flex items-center gap-4">
                                    <p className="text-3xl font-bold text-foreground">$19.99<span className="text-lg font-normal text-muted-foreground">/mes</span></p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground">Próxima facturación: 3 de Marzo, 2026</p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Incluido en tu plan</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Generaciones ilimitadas",
                                        "Todos los géneros y estilos",
                                        "Exportación en alta calidad (WAV)",
                                        "Licencia comercial completa",
                                        "Acceso al marketplace",
                                        "Soporte prioritario",
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                                    Cambiar plan
                                </Button>
                                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent">
                                    Cancelar suscripción
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    {activeTab === "notifications" && (
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-6">Preferencias de notificaciones</h2>
                            <div className="space-y-4">
                                {[
                                    { key: "email", label: "Notificaciones por email", description: "Recibe actualizaciones sobre tu cuenta" },
                                    { key: "marketing", label: "Emails promocionales", description: "Ofertas especiales y descuentos" },
                                    { key: "updates", label: "Actualizaciones de productos", description: "Nuevas funciones y mejoras" },
                                    { key: "newFeatures", label: "Anuncios", description: "Noticias importantes sobre Sinter" },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div>
                                            <p className="font-medium text-foreground">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary justify-end' : 'bg-muted justify-start'
                                                }`}
                                        >
                                            <div className="w-4 h-4 bg-white rounded-full" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Audio Section */}
                    {activeTab === "audio" && (
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Preferencias de audio</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Download className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="font-medium text-foreground">Formato de exportación</p>
                                                <p className="text-sm text-muted-foreground">Calidad de los archivos descargados</p>
                                            </div>
                                        </div>
                                        <select className="bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                                            <option>WAV (48kHz)</option>
                                            <option>WAV (44.1kHz)</option>
                                            <option>MP3 (320kbps)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Music className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="font-medium text-foreground">Duración por defecto</p>
                                                <p className="text-sm text-muted-foreground">Duración inicial al generar</p>
                                            </div>
                                        </div>
                                        <select className="bg-background border border-border rounded-lg px-3 py-2 text-foreground">
                                            <option>30 segundos</option>
                                            <option>45 segundos</option>
                                            <option>60 segundos</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Wallet Section */}
                    {activeTab === "wallet" && (
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-4">Conectar wallet</h2>
                                <p className="text-muted-foreground mb-6">
                                    Conecta tu wallet para comprar, vender y recibir pagos en el marketplace.
                                </p>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Wallet className="h-4 w-4 mr-2" />
                                    Conectar Wallet
                                </Button>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-medium text-foreground mb-4">Wallets compatibles</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {["MetaMask", "WalletConnect", "Coinbase Wallet", "Freighter (Stellar)"].map((wallet) => (
                                        <div key={wallet} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                            <span className="text-muted-foreground">{wallet}</span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Section */}
                    {activeTab === "privacy" && (
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Privacidad y datos</h2>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Download className="h-5 w-5 text-primary" />
                                            <div className="text-left">
                                                <p className="font-medium text-foreground">Exportar mis datos</p>
                                                <p className="text-sm text-muted-foreground">Descarga una copia de tus datos</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <ExternalLink className="h-5 w-5 text-primary" />
                                            <div className="text-left">
                                                <p className="font-medium text-foreground">Política de privacidad</p>
                                                <p className="text-sm text-muted-foreground">Lee nuestra política completa</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 bg-destructive/10 border border-destructive/30 rounded-lg hover:bg-destructive/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Trash2 className="h-5 w-5 text-destructive" />
                                            <div className="text-left">
                                                <p className="font-medium text-destructive">Eliminar cuenta</p>
                                                <p className="text-sm text-muted-foreground">Eliminar permanentemente tu cuenta y datos</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-destructive" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
