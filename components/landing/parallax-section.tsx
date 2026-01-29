"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  imageUrl?: string
  imageAlt?: string
}

export function ParallaxSection({ 
  children, 
  className = "", 
  speed = 0.5,
  imageUrl,
  imageAlt = "Parallax background"
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <section 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Imagen de fondo con parallax */}
      {imageUrl && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          {/* Overlay para mejorar legibilidad */}
          <div className="absolute inset-0 bg-background/40" />
        </motion.div>
      )}
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
