import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { FileText, ArrowLeft } from "lucide-react"

export const metadata = {
    title: 'Términos de Servicio - Sinter',
    description: 'Términos y condiciones de uso de la plataforma Sinter para generación de música con IA.',
}

export default function TermsPage() {
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
                            <FileText className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Términos de Servicio</h1>
                            <p className="text-muted-foreground">Última actualización: Febrero 2026</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">1. Aceptación de Términos</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Al acceder o utilizar Sinter (&quot;la Plataforma&quot;), aceptas estar legalmente vinculado por estos
                                Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes
                                utilizar nuestros servicios.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">2. Descripción del Servicio</h2>
                            <p className="text-muted-foreground mb-4">
                                Sinter es una plataforma de generación de música que utiliza inteligencia artificial
                                para crear pistas musicales originales. Nuestros servicios incluyen:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Generación de música basada en parámetros (género, mood, BPM, tonalidad)</li>
                                <li>Biblioteca personal para almacenar pistas generadas</li>
                                <li>Marketplace para comprar y vender beats</li>
                                <li>Herramientas de edición y exportación</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">3. Registro de Cuenta</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>Para utilizar ciertas funciones, debes crear una cuenta. Al hacerlo:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Debes proporcionar información precisa y actualizada</li>
                                    <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                                    <li>Debes notificarnos inmediatamente cualquier uso no autorizado</li>
                                    <li>No puedes transferir tu cuenta a terceros</li>
                                    <li>Debes ser mayor de 18 años para crear una cuenta</li>
                                </ul>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">4. Uso Aceptable</h2>
                            <p className="text-muted-foreground mb-4">Te comprometes a NO utilizar la Plataforma para:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Violar leyes o regulaciones aplicables</li>
                                <li>Infringir derechos de propiedad intelectual</li>
                                <li>Generar contenido ilegal, ofensivo o dañino</li>
                                <li>Intentar acceder sin autorización a nuestros sistemas</li>
                                <li>Interferir con el funcionamiento de la Plataforma</li>
                                <li>Utilizar bots o automatización no autorizada</li>
                                <li>Revender o redistribuir nuestros servicios sin permiso</li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">5. Propiedad Intelectual</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h3 className="text-foreground font-medium mb-2">Música generada</h3>
                                    <p>
                                        La música que generas usando Sinter te pertenece según el tipo de licencia que tengas.
                                        Los usuarios con plan gratuito obtienen una licencia limitada, mientras que los usuarios
                                        Pro obtienen derechos comerciales completos.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-medium mb-2">Plataforma Sinter</h3>
                                    <p>
                                        La Plataforma, incluyendo su código, diseño, logotipos y contenido, es propiedad de Sinter
                                        y está protegida por leyes de propiedad intelectual.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">6. Precios y Pagos</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Los precios están en USD y pueden cambiar con previo aviso</li>
                                    <li>Las suscripciones se renuevan automáticamente hasta que canceles</li>
                                    <li>Los pagos son procesados por proveedores de pago seguros</li>
                                    <li>Las compras en el marketplace son transacciones entre usuarios</li>
                                </ul>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">7. Reembolsos</h2>
                            <p className="text-muted-foreground">
                                Las suscripciones pueden ser canceladas en cualquier momento, pero no se ofrecen reembolsos
                                por períodos parciales. Las compras de beats en el marketplace son finales, excepto en casos
                                de problemas técnicos verificables con el producto.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitación de Responsabilidad</h2>
                            <p className="text-muted-foreground">
                                Sinter se proporciona &quot;tal cual&quot; sin garantías de ningún tipo. No somos responsables por
                                daños indirectos, incidentales o consecuentes derivados del uso de la Plataforma. Nuestra
                                responsabilidad total no excederá el monto que hayas pagado en los últimos 12 meses.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">9. Indemnización</h2>
                            <p className="text-muted-foreground">
                                Aceptas indemnizar y mantener indemne a Sinter de cualquier reclamación, daño o gasto
                                derivado de tu uso de la Plataforma, tu contenido, o tu violación de estos términos.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">10. Terminación</h2>
                            <p className="text-muted-foreground">
                                Podemos suspender o terminar tu acceso a la Plataforma si violas estos términos o por
                                cualquier otra razón a nuestra discreción. Puedes eliminar tu cuenta en cualquier momento
                                desde la configuración de tu perfil.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">11. Cambios a los Términos</h2>
                            <p className="text-muted-foreground">
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos
                                sobre cambios materiales con 30 días de anticipación. El uso continuado de la Plataforma
                                después de los cambios constituye aceptación de los nuevos términos.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">12. Ley Aplicable</h2>
                            <p className="text-muted-foreground">
                                Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta en los
                                tribunales competentes de la Ciudad de México.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">13. Contacto</h2>
                            <p className="text-muted-foreground">
                                Para preguntas sobre estos términos, contáctanos en:{" "}
                                <a href="mailto:legal@sinter.app" className="text-primary hover:underline">
                                    legal@sinter.app
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
