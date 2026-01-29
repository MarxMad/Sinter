"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AudioVisualizerProps {
  isPlaying?: boolean
  bars?: number
  className?: string
}

export function AudioVisualizer({ 
  isPlaying = true, 
  bars = 32,
  className = "" 
}: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Inicializar alturas aleatorias
    setHeights(Array.from({ length: bars }, () => Math.random() * 80 + 20))

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setHeights(prev => 
          prev.map((height, i) => {
            // Crear efecto de onda
            const wave = Math.sin((Date.now() / 1000 + i * 0.2) * 2) * 30
            const base = 30 + (i % 3) * 15
            return Math.max(20, Math.min(100, base + wave + Math.random() * 20))
          })
        )
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // Animación suave hacia valores más bajos cuando no está reproduciendo
      setHeights(prev => prev.map(() => 20 + Math.random() * 10))
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, bars])

  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {heights.map((height, i) => (
        <motion.div
          key={i}
          className="w-2 md:w-3 rounded-t bg-gradient-to-t from-primary via-accent to-primary/50"
          initial={{ height: "20%" }}
          animate={{ 
            height: `${height}%`,
            opacity: isPlaying ? 1 : 0.5
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: i * 0.02
          }}
          style={{
            boxShadow: isPlaying 
              ? `0 0 ${height / 5}px rgba(255, 165, 0, 0.5), 0 0 ${height / 3}px rgba(59, 130, 246, 0.3)`
              : 'none'
          }}
        />
      ))}
    </div>
  )
}
