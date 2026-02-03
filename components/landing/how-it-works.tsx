"use client"

import { motion } from "framer-motion"
import { Music, Wand2, Sliders, Download } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Elige tu género",
      description: "Selecciona entre más de 20 géneros y define BPM, tonalidad y ambiente.",
      icon: Music
    },
    {
      step: "02",
      title: "Genera con IA",
      description: "Nuestra IA crea beats y melodías únicos según tus parámetros en segundos.",
      icon: Wand2
    },
    {
      step: "03",
      title: "Edita y refina",
      description: "Usa nuestro editor profesional para afinar cada aspecto de tu pista.",
      icon: Sliders
    },
    {
      step: "04",
      title: "Exporta o vende",
      description: "Descarga en varios formatos o publica en el marketplace para generar ingresos.",
      icon: Download
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  }

  return (
    <section className="py-20 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Crea música profesional en cuatro pasos sencillos.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
            >
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-12 left-full w-full h-[2px] -translate-x-1/2 origin-left"
                  variants={lineVariants}
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.2) 100%)"
                  }}
                />
              )}

              {/* Icon with animated background */}
              <motion.div
                className="relative mb-6"
                variants={iconVariants}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                {/* Animated pulse ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/10 scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>

              {/* Step number */}
              <motion.div
                className="text-5xl font-bold bg-gradient-to-r from-primary/30 to-purple-500/20 bg-clip-text text-transparent mb-4"
                variants={numberVariants}
              >
                {item.step}
              </motion.div>

              {/* Title with hover effect */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                {item.description}
              </p>

              {/* Bottom accent line that animates on hover */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-purple-500 rounded-full group-hover:w-16 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
