"use client"

import { Wand2, Music2, DollarSign, Sliders, Download, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Wand2,
    title: "AI Generation",
    description: "Generate unique beats, melodies, and full tracks using advanced AI models trained on millions of songs.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Music2,
    title: "Genre Selection",
    description: "Choose from 20+ genres including Hip-Hop, EDM, House, Trap, R&B, Lo-Fi, and more.",
    gradient: "from-accent to-primary"
  },
  {
    icon: Sliders,
    title: "Advanced Editor",
    description: "Fine-tune your tracks with our professional-grade editor. Adjust BPM, key, instruments, and effects.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Download,
    title: "Export Stems",
    description: "Download individual stems for maximum flexibility in your DAW. WAV, MP3, and FLAC formats.",
    gradient: "from-accent to-primary"
  },
  {
    icon: DollarSign,
    title: "Sell Your Music",
    description: "Upload your creations to our marketplace and earn money from other artists and producers.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work with other artists in real-time. Share projects and build tracks together.",
    gradient: "from-accent to-primary"
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-card relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Create
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional tools designed for musicians, producers, and DJs of all skill levels.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-6 bg-secondary/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Efecto de brillo al hover */}
              <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4 relative z-10"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">
                {feature.title}
              </h3>
              <p className="text-muted-foreground relative z-10">
                {feature.description}
              </p>
              
              {/* Línea decorativa animada */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
