"use client"

import { ParallaxSection } from "./parallax-section"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Genre",
      description: "Select from 20+ musical genres and set your preferences for BPM, key, and mood."
    },
    {
      step: "02",
      title: "Generate with AI",
      description: "Our AI creates unique beats and melodies based on your parameters in seconds."
    },
    {
      step: "03",
      title: "Edit & Refine",
      description: "Use our professional editor to fine-tune every aspect of your track."
    },
    {
      step: "04",
      title: "Export or Sell",
      description: "Download in multiple formats or list on our marketplace to earn revenue."
    }
  ]

  return (
    <ParallaxSection 
      className="py-20 bg-card"
      speed={0.3}
      // imageUrl="/images/how-it-works-bg.jpg" // Descomentar cuando tengas la imagen
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional music in four simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
