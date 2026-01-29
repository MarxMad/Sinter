"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { AudioVisualizer } from "./audio-visualizer"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Contenedor de video de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-background">
            {/* Placeholder para video - reemplazar con <video> cuando tengas el archivo */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full mb-6 border border-primary/30">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Generación de música con IA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            Crea
            <span className="text-primary block">beats y melodías</span>
            profesionales con IA
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto text-pretty">
            La plataforma definitiva para artistas y DJs: genera música única, 
            edita pistas y vende tus creaciones. Sin necesidad de experiencia musical.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg shadow-lg">
                Empezar gratis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-accent text-foreground hover:bg-accent/10 bg-transparent backdrop-blur-sm">
              <Play className="h-5 w-5 mr-2" />
              Ver demo
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
            {[
              { value: "50K+", label: "Artistas" },
              { value: "1M+", label: "Pistas creadas" },
              { value: "20+", label: "Géneros" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm mt-1 text-foreground/70">{stat.label}</p>
                </div>
                {index < 2 && <div className="w-px h-12 bg-border" />}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="bg-card/90 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div className="flex-1 bg-secondary/70 backdrop-blur-sm rounded px-4 py-2 text-sm text-muted-foreground border border-border/50">
                sinter.app/studio
              </div>
            </div>
            
            <div className="bg-secondary/40 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-primary/20 rounded w-3/4" />
                  <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center p-4 border border-primary/20">
                    <AudioVisualizer isPlaying={true} bars={16} className="h-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-primary rounded-lg w-24" />
                    <div className="h-10 bg-border/50 rounded-lg w-20" />
                    <div className="h-10 bg-border/50 rounded-lg w-20" />
                  </div>
                </div>
                <div className="w-full md:w-48 space-y-3">
                  <div className="h-6 bg-accent/30 rounded" />
                  <div className="h-6 bg-accent/30 rounded w-3/4" />
                  <div className="h-6 bg-accent/30 rounded w-1/2" />
                  <div className="h-10 bg-accent rounded-lg mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
