"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Cookie, Settings2 } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('sinter-cookie-consent')
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setShowBanner(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptAll = () => {
        const consentData = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        }
        localStorage.setItem('sinter-cookie-consent', JSON.stringify(consentData))
        setShowBanner(false)
    }

    const acceptNecessary = () => {
        const consentData = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        }
        localStorage.setItem('sinter-cookie-consent', JSON.stringify(consentData))
        setShowBanner(false)
    }

    const savePreferences = () => {
        const consentData = {
            ...preferences,
            timestamp: new Date().toISOString(),
        }
        localStorage.setItem('sinter-cookie-consent', JSON.stringify(consentData))
        setShowBanner(false)
        setShowSettings(false)
    }

    if (!showBanner) return null

    return (
        <>
            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" />
                                Configurar Cookies
                            </h3>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Necessary */}
                            <div className="flex items-start justify-between p-4 bg-secondary rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">Cookies Necesarias</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Esenciales para el funcionamiento del sitio. No se pueden desactivar.
                                    </p>
                                </div>
                                <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                                    <div className="w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="flex items-start justify-between p-4 bg-secondary rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">Cookies de Análisis</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Nos ayudan a entender cómo usas el sitio para mejorarlo.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.analytics ? 'bg-primary justify-end' : 'bg-muted justify-start'
                                        }`}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full" />
                                </button>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start justify-between p-4 bg-secondary rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">Cookies de Marketing</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Permiten mostrarte contenido relevante y personalizado.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.marketing ? 'bg-primary justify-end' : 'bg-muted justify-start'
                                        }`}
                                >
                                    <div className="w-4 h-4 bg-white rounded-full" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowSettings(false)}
                                className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={savePreferences}
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Guardar preferencias
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cookie Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
                <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                        {/* Icon & Text */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Cookie className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground">Usamos cookies 🍪</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
                                Al continuar navegando, aceptas nuestra{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Política de Privacidad
                                </Link>
                                .
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => setShowSettings(true)}
                                className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                            >
                                <Settings2 className="h-4 w-4 mr-2" />
                                Configurar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={acceptNecessary}
                                className="border-border text-foreground hover:bg-secondary bg-transparent"
                            >
                                Solo necesarias
                            </Button>
                            <Button
                                onClick={acceptAll}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Aceptar todas
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
