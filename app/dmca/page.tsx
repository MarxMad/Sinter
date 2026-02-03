import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Scale, ArrowLeft, AlertTriangle, Mail, FileText, Clock } from "lucide-react"

export const metadata = {
    title: 'DMCA - Sinter',
    description: 'Política DMCA de Sinter. Cómo reportar infracciones de derechos de autor.',
}

export default function DMCAPage() {
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
                            <Scale className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Política DMCA</h1>
                            <p className="text-muted-foreground">Digital Millennium Copyright Act</p>
                        </div>
                    </div>

                    {/* Alert */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                            Sinter respeta los derechos de propiedad intelectual y espera que sus usuarios hagan lo mismo.
                            Respondemos a todas las notificaciones válidas de infracción de derechos de autor.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">1. Compromiso con los Derechos de Autor</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Sinter está comprometido a cumplir con las leyes de derechos de autor, incluyendo la
                                Digital Millennium Copyright Act (DMCA) de Estados Unidos y legislaciones equivalentes
                                en otras jurisdicciones. Toda la música generada por nuestra IA es original y no
                                infringe derechos de terceros.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                2. Cómo Reportar una Infracción
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Si crees que tu trabajo protegido por derechos de autor ha sido copiado de manera
                                que constituye una infracción, envía una notificación con la siguiente información:
                            </p>
                            <ul className="list-decimal list-inside space-y-3 text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Identificación de la obra:</strong> Descripción
                                    de la obra protegida que afirmas ha sido infringida.
                                </li>
                                <li>
                                    <strong className="text-foreground">Identificación del material infractor:</strong> URL
                                    o ubicación del material que afirmas infringe tu obra.
                                </li>
                                <li>
                                    <strong className="text-foreground">Información de contacto:</strong> Tu nombre,
                                    dirección, teléfono y correo electrónico.
                                </li>
                                <li>
                                    <strong className="text-foreground">Declaración de buena fe:</strong> Que crees de
                                    buena fe que el uso no está autorizado por el propietario de los derechos.
                                </li>
                                <li>
                                    <strong className="text-foreground">Declaración de exactitud:</strong> Que la
                                    información es exacta y que estás autorizado a actuar en nombre del propietario.
                                </li>
                                <li>
                                    <strong className="text-foreground">Firma:</strong> Firma física o electrónica del
                                    propietario o persona autorizada.
                                </li>
                            </ul>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">3. Dónde Enviar la Notificación</h2>
                            <div className="bg-secondary rounded-lg p-4">
                                <p className="text-muted-foreground mb-2">
                                    <strong className="text-foreground">Agente Designado DMCA:</strong>
                                </p>
                                <p className="text-muted-foreground">
                                    Sinter Legal Team<br />
                                    Email:{" "}
                                    <a href="mailto:dmca@sinter.app" className="text-primary hover:underline">
                                        dmca@sinter.app
                                    </a>
                                </p>
                            </div>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                4. Proceso de Respuesta
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Una vez recibida una notificación válida:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                <li>Revisaremos la notificación dentro de 2 días hábiles</li>
                                <li>Si es válida, retiraremos o deshabilitaremos el acceso al material</li>
                                <li>Notificaremos al usuario que subió el material</li>
                                <li>El usuario puede presentar una contra-notificación</li>
                                <li>Si no hay contra-notificación en 10 días, el material permanece retirado</li>
                            </ol>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                5. Contra-Notificación
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Si crees que tu contenido fue retirado por error, puedes enviar una contra-notificación
                                que incluya:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Tu firma física o electrónica</li>
                                <li>Identificación del material retirado y su ubicación anterior</li>
                                <li>Declaración bajo pena de perjurio de que el retiro fue un error</li>
                                <li>Tu nombre, dirección y consentimiento a la jurisdicción</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Si recibimos una contra-notificación válida, restauraremos el material en 10-14 días
                                hábiles, a menos que el reclamante original informe que ha iniciado acción legal.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">6. Política de Reincidencia</h2>
                            <p className="text-muted-foreground">
                                Sinter tiene una política de &quot;tres strikes&quot;. Los usuarios que reciban tres notificaciones
                                válidas de infracción pueden ver sus cuentas suspendidas o terminadas permanentemente.
                                Nos reservamos el derecho de terminar cuentas por infracciones graves incluso en la
                                primera instancia.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">7. Notificaciones Falsas</h2>
                            <p className="text-muted-foreground">
                                Advertimos que bajo la ley, una persona que hace declaraciones falsas en una
                                notificación DMCA puede ser responsable de daños, incluyendo costos y honorarios
                                de abogados. Si no estás seguro de si cierto material infringe tus derechos,
                                consulta con un abogado antes de presentar una notificación.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">8. Contenido Generado por IA</h2>
                            <p className="text-muted-foreground">
                                La música generada por nuestro sistema de IA es creada de manera procedural y no
                                copia works existentes. Nuestro sistema está diseñado para generar composiciones
                                originales basadas en teoría musical y parámetros definidos por el usuario. Si
                                crees que una composición generada es sustancialmente similar a una obra protegida,
                                puedes contactarnos para una revisión.
                            </p>
                        </section>

                        <section className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-4">9. Contacto</h2>
                            <p className="text-muted-foreground">
                                Para preguntas sobre esta política o para reportar infracciones:{" "}
                                <a href="mailto:dmca@sinter.app" className="text-primary hover:underline">
                                    dmca@sinter.app
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
