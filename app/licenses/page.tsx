import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Music, ArrowLeft, Check, X, Crown, Zap, Star } from "lucide-react"

export const metadata = {
    title: 'Licencias de Música - Sinter',
    description: 'Tipos de licencias de música en Sinter. Conoce los derechos incluidos en cada tipo de licencia.',
}

export default function LicensesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al inicio
                    </Link>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Music className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Licencias de Música</h1>
                            <p className="text-muted-foreground">Entiende qué puedes hacer con la música de Sinter</p>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-card border border-border rounded-xl p-6 mb-8">
                        <p className="text-muted-foreground leading-relaxed">
                            Toda la música generada en Sinter viene con una licencia que define cómo puedes usarla.
                            A continuación, te explicamos los diferentes tipos de licencias disponibles y los derechos
                            que incluyen.
                        </p>
                    </div>

                    {/* License Comparison */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Free License */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Licencia Free</h3>
                                    <p className="text-sm text-muted-foreground">Plan gratuito</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Uso personal</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Redes sociales (no monetizado)</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Proyectos educativos</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-500" />
                                    <span className="text-muted-foreground">Uso comercial</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-500" />
                                    <span className="text-muted-foreground">Monetización</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-500" />
                                    <span className="text-muted-foreground">Distribución en plataformas</span>
                                </li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-4 p-3 bg-secondary rounded-lg">
                                Requiere atribución: &quot;Música creada con Sinter&quot;
                            </p>
                        </div>

                        {/* Standard License */}
                        <div className="bg-card border border-primary/50 rounded-xl p-6 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                Más popular
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Star className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Licencia Standard</h3>
                                    <p className="text-sm text-muted-foreground">Plan Pro</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Uso personal</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Redes sociales monetizadas</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">YouTube, Twitch, TikTok</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Podcasts y videos</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Hasta 500K streams</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <X className="h-4 w-4 text-red-500" />
                                    <span className="text-muted-foreground">Reventa de pistas</span>
                                </li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-4 p-3 bg-secondary rounded-lg">
                                No requiere atribución
                            </p>
                        </div>

                        {/* Exclusive License */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                    <Crown className="h-5 w-5 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Licencia Exclusive</h3>
                                    <p className="text-sm text-muted-foreground">Marketplace</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Todos los derechos</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Uso comercial ilimitado</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Distribución mundial</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Spotify, Apple Music, etc.</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Streams ilimitados</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-muted-foreground">Propiedad exclusiva</span>
                                </li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-4 p-3 bg-secondary rounded-lg">
                                El beat se retira del marketplace
                            </p>
                        </div>
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-8">

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">¿Qué es una licencia de música?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Una licencia de música es un permiso legal que define cómo puedes usar una pista musical.
                                Cuando generas o compras música en Sinter, obtienes una licencia que especifica tus
                                derechos para usar, distribuir y monetizar esa música.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Uso en Plataformas de Streaming</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                                <div>
                                    <h3 className="text-foreground font-medium mb-2">Permitido con Licencia Standard/Exclusive:</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Spotify, Apple Music, Amazon Music</li>
                                        <li>YouTube Music, Deezer, Tidal</li>
                                        <li>SoundCloud (monetizado)</li>
                                        <li>Cualquier plataforma de distribución</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-2">Requisitos:</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Verificar límite de streams según licencia</li>
                                        <li>Mantener registro de uso</li>
                                        <li>Notificar si superas el límite</li>
                                        <li>Actualizar licencia si es necesario</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Uso en Videos y Contenido</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">YouTube:</strong> Monetización permitida con licencia Standard o superior</li>
                                <li><strong className="text-foreground">TikTok:</strong> Uso permitido, incluyendo contenido patrocinado con licencia Pro</li>
                                <li><strong className="text-foreground">Instagram/Reels:</strong> Mismo tratamiento que TikTok</li>
                                <li><strong className="text-foreground">Podcasts:</strong> Uso como intro, outro o fondo con licencia Standard</li>
                                <li><strong className="text-foreground">Publicidad:</strong> Requiere licencia Exclusive o permiso especial</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Restricciones Generales</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>No puedes reclamar autoría exclusiva de la composición subyacente</li>
                                <li>No puedes registrar la música en sociedades de derechos sin licencia Exclusive</li>
                                <li>No puedes sublicenciar a terceros sin autorización</li>
                                <li>No puedes usar la música para contenido ilegal o difamatorio</li>
                                <li>No puedes usar la música en política electoral</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Preguntas Frecuentes</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-foreground font-medium mb-1">¿Puedo usar música de Sinter en mi álbum?</h3>
                                    <p className="text-sm text-muted-foreground">Sí, con licencia Standard (hasta 500K streams) o Exclusive (sin límite).</p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-1">¿Qué pasa si supero el límite de streams?</h3>
                                    <p className="text-sm text-muted-foreground">Debes actualizar a una licencia superior. Te contactaremos para ayudarte.</p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-1">¿Las licencias expiran?</h3>
                                    <p className="text-sm text-muted-foreground">No, las licencias son perpetuas una vez adquiridas.</p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-1">¿Puedo modificar la música?</h3>
                                    <p className="text-sm text-muted-foreground">Sí, puedes editar, mezclar y producir sobre cualquier pista que hayas generado o comprado.</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Contacto</h2>
                            <p className="text-muted-foreground">
                                ¿Necesitas una licencia personalizada o tienes dudas? Contáctanos en:{" "}
                                <a href="mailto:licensing@sinter.app" className="text-primary hover:underline">
                                    licensing@sinter.app
                                </a>
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
