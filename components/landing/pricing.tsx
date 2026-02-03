"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Music, Zap, Crown, Wallet } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "$19",
    currency: "MXN",
    beats: "10",
    description: "Perfecto para comenzar",
    features: [
      "10 generaciones con IA",
      "Acceso al editor básico",
      "Exportación MP3",
      "Soporte comunitario"
    ],
    cta: "Comprar",
    popular: false,
    icon: Music
  },
  {
    name: "Plus",
    price: "$39",
    currency: "MXN",
    beats: "20",
    description: "Mejor valor",
    features: [
      "20 generaciones con IA",
      "Editor completo",
      "Exportación WAV, MP3, FLAC",
      "Descarga de stems",
      "Soporte prioritario"
    ],
    cta: "Comprar Plus",
    popular: true,
    icon: Zap
  },
  {
    name: "Pro",
    price: "$99",
    currency: "MXN",
    beats: "100",
    description: "Para creadores serios",
    features: [
      "100 generaciones con IA",
      "Todo lo de Plus",
      "Licencia comercial completa",
      "Acceso anticipado a nuevos géneros",
      "Soporte dedicado"
    ],
    cta: "Comprar Pro",
    popular: false,
    icon: Crown
  }
]

const paymentMethods = [
  { name: "USDC", icon: "💵" },
  { name: "XLM", icon: "⭐" },
  { name: "Lightning", icon: "⚡" },
]

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="pricing" className="py-20 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Precios simples y transparentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Paga solo por lo que usas. Sin suscripciones, sin compromisos.
          </p>

          {/* Payment methods badge */}
          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Acepta:</span>
            <div className="flex items-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.name}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-background rounded text-xs font-medium text-foreground"
                >
                  {method.icon} {method.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative p-8 rounded-2xl border group ${plan.popular
                  ? "bg-gradient-to-b from-primary/10 to-purple-500/5 border-primary shadow-xl shadow-primary/10"
                  : "bg-background border-border hover:border-primary/50"
                } transition-all duration-300`}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground text-sm font-medium rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  ⭐ Más popular
                </motion.div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.popular
                  ? "bg-primary/20"
                  : "bg-secondary group-hover:bg-primary/10"
                } transition-colors duration-300`}>
                <plan.icon className={`h-6 w-6 ${plan.popular ? "text-primary" : "text-muted-foreground group-hover:text-primary"} transition-colors duration-300`} />
              </div>

              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-lg text-muted-foreground">{plan.currency}</span>
              </div>

              {/* Beats count highlight */}
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <Music className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{plan.beats} beats</span>
              </div>

              <p className="mt-3 text-muted-foreground">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/subscribe" className="block mt-8">
                <Button
                  className={`w-full h-12 text-base font-medium transition-all duration-300 ${plan.popular
                      ? "bg-gradient-to-r from-primary to-purple-500 text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25"
                      : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary"
                    }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.p
          className="text-center mt-12 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          💡 Los beats no vencen. Usa tus créditos cuando quieras.
        </motion.p>
      </div>
    </section>
  )
}
