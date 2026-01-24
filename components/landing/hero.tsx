import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Music Generation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            Create Professional
            <span className="text-primary block">Beats & Melodies</span>
            with AI
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            The ultimate platform for artists and DJs to generate unique music, 
            edit tracks, and sell your creations. No musical expertise required.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                Start Creating Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-border text-foreground hover:bg-secondary bg-transparent">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">50K+</p>
              <p className="text-sm">Artists</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">1M+</p>
              <p className="text-sm">Tracks Created</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">20+</p>
              <p className="text-sm">Genres</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="bg-card border border-border rounded-xl p-4 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div className="flex-1 bg-secondary rounded px-4 py-2 text-sm text-muted-foreground">
                beatforge.ai/studio
              </div>
            </div>
            
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-border/50 rounded w-3/4" />
                  <div className="h-24 bg-primary/20 rounded flex items-center justify-center">
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 55, 70, 35, 90, 60, 75, 50, 85].map((height, i) => (
                        <div
                          key={i}
                          className="w-2 md:w-3 bg-primary rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-primary rounded w-24" />
                    <div className="h-10 bg-border/50 rounded w-20" />
                    <div className="h-10 bg-border/50 rounded w-20" />
                  </div>
                </div>
                <div className="w-full md:w-48 space-y-3">
                  <div className="h-6 bg-border/50 rounded" />
                  <div className="h-6 bg-border/50 rounded w-3/4" />
                  <div className="h-6 bg-border/50 rounded w-1/2" />
                  <div className="h-10 bg-accent rounded mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
