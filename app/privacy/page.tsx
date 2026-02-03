import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Shield, ArrowLeft } from "lucide-react"

export const metadata = {
    title: 'Política de Privacidad - Sinter',
    description: 'Política de privacidad de Sinter. Conoce cómo protegemos y utilizamos tus datos personales.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <Shield className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Política de Privacidad</h1>
                            <p className="text-muted-foreground">Última actualización: Febrero 2026</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                        <div className="space-y-8">

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">1. Introducción</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    En Sinter, nos comprometemos a proteger tu privacidad. Esta política describe cómo
                                    recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra
                                    plataforma de generación de música con inteligencia artificial.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">2. Información que Recopilamos</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <div>
                                        <h3 className="text-foreground font-medium mb-2">Información de cuenta</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Nombre y apellido</li>
                                            <li>Dirección de correo electrónico</li>
                                            <li>Información de perfil (opcional)</li>
                                            <li>Dirección de wallet blockchain (si conectas una)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-foreground font-medium mb-2">Información de uso</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Pistas de música generadas y sus parámetros</li>
                                            <li>Historial de generaciones</li>
                                            <li>Preferencias de géneros y estilos</li>
                                            <li>Interacciones con la plataforma</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-foreground font-medium mb-2">Información técnica</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Dirección IP</li>
                                            <li>Tipo de navegador y dispositivo</li>
                                            <li>Cookies y tecnologías similares</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">3. Cómo Usamos tu Información</h2>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Proporcionar y mejorar nuestros servicios de generación de música</li>
                                    <li>Procesar transacciones y pagos</li>
                                    <li>Personalizar tu experiencia en la plataforma</li>
                                    <li>Comunicarnos contigo sobre actualizaciones y nuevas funciones</li>
                                    <li>Analizar el uso de la plataforma para mejoras</li>
                                    <li>Cumplir con obligaciones legales</li>
                                    <li>Prevenir fraude y actividades maliciosas</li>
                                </ul>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">4. Compartir Información</h2>
                                <p className="text-muted-foreground mb-4">
                                    No vendemos tu información personal. Solo compartimos datos en las siguientes circunstancias:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li><strong className="text-foreground">Proveedores de servicios:</strong> Para procesar pagos, hosting y análisis</li>
                                    <li><strong className="text-foreground">Transacciones blockchain:</strong> Las direcciones de wallet son públicas por naturaleza</li>
                                    <li><strong className="text-foreground">Requisitos legales:</strong> Cuando sea requerido por ley</li>
                                    <li><strong className="text-foreground">Consentimiento:</strong> Cuando nos des permiso explícito</li>
                                </ul>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies</h2>
                                <p className="text-muted-foreground mb-4">
                                    Utilizamos cookies para:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Mantener tu sesión activa</li>
                                    <li>Recordar tus preferencias</li>
                                    <li>Analizar el tráfico del sitio</li>
                                    <li>Mejorar la experiencia de usuario</li>
                                </ul>
                                <p className="text-muted-foreground mt-4">
                                    Puedes configurar tus preferencias de cookies en cualquier momento desde el banner
                                    de cookies o la configuración de tu navegador.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">6. Seguridad</h2>
                                <p className="text-muted-foreground">
                                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información,
                                    incluyendo encriptación de datos, acceso restringido y monitoreo continuo de seguridad.
                                    Sin embargo, ningún sistema es 100% seguro y no podemos garantizar seguridad absoluta.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">7. Tus Derechos</h2>
                                <p className="text-muted-foreground mb-4">Tienes derecho a:</p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Acceder a tu información personal</li>
                                    <li>Corregir datos inexactos</li>
                                    <li>Solicitar la eliminación de tus datos</li>
                                    <li>Oponerte al procesamiento de tus datos</li>
                                    <li>Exportar tus datos en formato portable</li>
                                    <li>Retirar tu consentimiento en cualquier momento</li>
                                </ul>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">8. Retención de Datos</h2>
                                <p className="text-muted-foreground">
                                    Conservamos tu información mientras mantengas una cuenta activa o según sea necesario
                                    para proporcionarte servicios. Los datos de generación de música se conservan para
                                    tu acceso en la biblioteca. Puedes solicitar la eliminación contactándonos.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">9. Menores de Edad</h2>
                                <p className="text-muted-foreground">
                                    Nuestros servicios están destinados a usuarios mayores de 18 años. No recopilamos
                                    intencionalmente información de menores. Si crees que un menor ha proporcionado
                                    información personal, contáctanos para eliminarla.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">10. Cambios a esta Política</h2>
                                <p className="text-muted-foreground">
                                    Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios
                                    significativos por correo electrónico o mediante un aviso en la plataforma.
                                </p>
                            </section>

                            <section className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-foreground mb-4">11. Contacto</h2>
                                <p className="text-muted-foreground">
                                    Para preguntas sobre esta política o para ejercer tus derechos de privacidad,
                                    contáctanos en:{" "}
                                    <a href="mailto:privacy@sinter.app" className="text-primary hover:underline">
                                        privacy@sinter.app
                                    </a>
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
