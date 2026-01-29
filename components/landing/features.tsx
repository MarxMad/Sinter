import { Wand2, Music2, DollarSign, Sliders, Download, Users } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "Generación con IA",
    description: "Genera beats, melodías y pistas completas con modelos de IA entrenados en millones de canciones."
  },
  {
    icon: Music2,
    title: "Géneros musicales",
    description: "Elige entre más de 20 géneros: Hip-Hop, EDM, House, Trap, R&B, Lo-Fi y más."
  },
  {
    icon: Sliders,
    title: "Editor avanzado",
    description: "Ajusta tus pistas con nuestro editor profesional. BPM, tonalidad, instrumentos y efectos."
  },
  {
    icon: Download,
    title: "Exportar stems",
    description: "Descarga stems individuales para tu DAW. Formatos WAV, MP3 y FLAC."
  },
  {
    icon: DollarSign,
    title: "Vende tu música",
    description: "Sube tus creaciones al marketplace y gana dinero con otros artistas y productores."
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabaja con otros artistas en tiempo real. Comparte proyectos y crea pistas juntos."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Todo lo que necesitas para crear
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas profesionales para músicos, productores y DJs de todos los niveles.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-secondary/50 rounded-xl border border-border hover:border-primary/50 transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
