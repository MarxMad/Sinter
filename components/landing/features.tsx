import { Wand2, Music2, DollarSign, Sliders, Download, Users } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "AI Generation",
    description: "Generate unique beats, melodies, and full tracks using advanced AI models trained on millions of songs."
  },
  {
    icon: Music2,
    title: "Genre Selection",
    description: "Choose from 20+ genres including Hip-Hop, EDM, House, Trap, R&B, Lo-Fi, and more."
  },
  {
    icon: Sliders,
    title: "Advanced Editor",
    description: "Fine-tune your tracks with our professional-grade editor. Adjust BPM, key, instruments, and effects."
  },
  {
    icon: Download,
    title: "Export Stems",
    description: "Download individual stems for maximum flexibility in your DAW. WAV, MP3, and FLAC formats."
  },
  {
    icon: DollarSign,
    title: "Sell Your Music",
    description: "Upload your creations to our marketplace and earn money from other artists and producers."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work with other artists in real-time. Share projects and build tracks together."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Create
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional tools designed for musicians, producers, and DJs of all skill levels.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-secondary rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
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
