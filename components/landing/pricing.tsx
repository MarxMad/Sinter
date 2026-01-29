import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Gratis",
    price: "$0",
    period: "para siempre",
    description: "Ideal para probar Sinter",
    features: [
      "5 generaciones con IA al mes",
      "Acceso al editor básico",
      "Solo exportación MP3",
      "Soporte comunitario"
    ],
    cta: "Empezar",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "al mes",
    description: "Para creadores serios",
    features: [
      "Generaciones con IA ilimitadas",
      "Editor completo",
      "Exportación WAV, MP3, FLAC",
      "Descarga de stems",
      "Soporte prioritario",
      "Licencia comercial"
    ],
    cta: "Probar Pro",
    popular: true
  },
  {
    name: "Studio",
    price: "$49",
    period: "al mes",
    description: "Para estudios profesionales",
    features: [
      "Todo lo de Pro",
      "Acceso a API",
      "Colaboración en equipo",
      "Entrenamiento de IA personalizado",
      "Soporte dedicado",
      "Herramientas para vendedores en marketplace"
    ],
    cta: "Contactar ventas",
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Precios simples y transparentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que se adapte a tus necesidades. Cambia cuando quieras.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border ${
                plan.popular
                  ? "bg-secondary border-primary"
                  : "bg-background border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Más popular
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/{plan.period}</span>
              </div>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/register" className="block mt-8">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
