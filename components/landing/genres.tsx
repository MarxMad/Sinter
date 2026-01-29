"use client"

import { motion } from "framer-motion"
import { AudioVisualizer } from "./audio-visualizer"

const genres = [
  { name: "Hip-Hop", tracks: "12.5K", color: "from-primary to-accent" },
  { name: "EDM", tracks: "8.3K", color: "from-accent to-primary" },
  { name: "House", tracks: "7.2K", color: "from-primary to-accent" },
  { name: "Trap", tracks: "9.8K", color: "from-accent to-primary" },
  { name: "R&B", tracks: "5.4K", color: "from-primary to-accent" },
  { name: "Lo-Fi", tracks: "11.2K", color: "from-accent to-primary" },
  { name: "Techno", tracks: "6.1K", color: "from-primary to-accent" },
  { name: "Drill", tracks: "4.7K", color: "from-accent to-primary" },
  { name: "Reggaeton", tracks: "3.9K", color: "from-primary to-accent" },
  { name: "Pop", tracks: "8.6K", color: "from-accent to-primary" },
  { name: "Ambient", tracks: "2.8K", color: "from-primary to-accent" },
  { name: "Jazz", tracks: "1.9K", color: "from-accent to-primary" },
]

export function Genres() {
  return (
    <section id="genres" className="py-20 bg-background relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Generate Any Genre
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From Hip-Hop to Ambient, our AI understands the nuances of every style.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre, index) => (
            <motion.div
              key={index}
              className="group p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Efecto de color al hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center justify-between relative z-10">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                  {genre.tracks}
                </span>
              </div>
              
              {/* Visualizador de audio mini */}
              <div className="mt-4 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AudioVisualizer isPlaying={false} bars={8} className="h-full" />
              </div>
              
              {/* Barras de audio estáticas */}
              <div className="mt-4 flex gap-1 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-1 rounded-full bg-primary"
                    style={{ opacity: Math.max(0.2, 1 - i * 0.15) }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 + i * 0.1 }}
                    whileHover={{ height: "4px", opacity: 1 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
