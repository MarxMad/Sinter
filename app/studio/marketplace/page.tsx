"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Play,
  Pause,
  ShoppingCart,
  Heart,
  Filter,
  TrendingUp,
  Clock,
  Star,
  DollarSign,
  Upload
} from "lucide-react"
import { useSearchParams } from "next/navigation"

interface MarketplaceTrack {
  id: string
  name: string
  artist: string
  genre: string
  bpm: number
  key: string
  price: number
  plays: number
  likes: number
  rating: number
  isNew: boolean
  isTrending: boolean
}

// Contenido precargado del marketplace
const marketplaceTracks: MarketplaceTrack[] = [
  // Lo-Fi
  { id: "1", name: "Boulevard al atardecer", artist: "ProducerX", genre: "Lo-Fi", bpm: 85, key: "C Minor", price: 29.99, plays: 12500, likes: 890, rating: 4.8, isNew: true, isTrending: true },
  { id: "9", name: "Lluvia en la ventana", artist: "ChillBeats MX", genre: "Lo-Fi", bpm: 78, key: "A Minor", price: 24.99, plays: 8200, likes: 612, rating: 4.7, isNew: true, isTrending: false },
  { id: "10", name: "Café y notas", artist: "Lofi Collective", genre: "Lo-Fi", bpm: 82, key: "F Major", price: 19.99, plays: 15600, likes: 1100, rating: 4.9, isNew: false, isTrending: true },
  // Trap
  { id: "2", name: "Night Rider", artist: "BeatMaster", genre: "Trap", bpm: 140, key: "G Minor", price: 39.99, plays: 8900, likes: 654, rating: 4.6, isNew: false, isTrending: true },
  { id: "11", name: "Dinero y flow", artist: "Trap King", genre: "Trap", bpm: 145, key: "D Minor", price: 44.99, plays: 11200, likes: 890, rating: 4.8, isNew: true, isTrending: true },
  { id: "12", name: "Oscuro total", artist: "Dark Beats", genre: "Trap", bpm: 138, key: "C Minor", price: 34.99, plays: 6700, likes: 520, rating: 4.5, isNew: false, isTrending: false },
  // EDM
  { id: "3", name: "Electric Dreams", artist: "SynthWave", genre: "EDM", bpm: 128, key: "A Minor", price: 24.99, plays: 15600, likes: 1200, rating: 4.9, isNew: false, isTrending: false },
  { id: "13", name: "Festival drop", artist: "EDM Factory", genre: "EDM", bpm: 128, key: "E Minor", price: 49.99, plays: 18900, likes: 1450, rating: 4.9, isNew: true, isTrending: true },
  { id: "14", name: "Midnight pulse", artist: "Neon Sounds", genre: "EDM", bpm: 126, key: "G Major", price: 29.99, plays: 9200, likes: 680, rating: 4.6, isNew: false, isTrending: false },
  // Hip-Hop
  { id: "4", name: "Urban Jungle", artist: "HipHopKing", genre: "Hip-Hop", bpm: 92, key: "D Minor", price: 34.99, plays: 6700, likes: 445, rating: 4.5, isNew: true, isTrending: false },
  { id: "15", name: "Barrio sur", artist: "MC Beats", genre: "Hip-Hop", bpm: 88, key: "B Minor", price: 27.99, plays: 13400, likes: 920, rating: 4.7, isNew: false, isTrending: true },
  { id: "16", name: "Old school vibes", artist: "Vinyl Producer", genre: "Hip-Hop", bpm: 95, key: "F Minor", price: 31.99, plays: 7800, likes: 560, rating: 4.6, isNew: true, isTrending: false },
  // House
  { id: "5", name: "Club Banger", artist: "DJMix", genre: "House", bpm: 124, key: "F Major", price: 44.99, plays: 21000, likes: 1800, rating: 4.9, isNew: false, isTrending: true },
  { id: "17", name: "Groove nocturno", artist: "House Nation", genre: "House", bpm: 122, key: "A Minor", price: 39.99, plays: 14500, likes: 1120, rating: 4.8, isNew: true, isTrending: true },
  { id: "18", name: "Deep session", artist: "Underground DJ", genre: "House", bpm: 120, key: "C Minor", price: 36.99, plays: 9800, likes: 720, rating: 4.7, isNew: false, isTrending: false },
  // Ambient
  { id: "6", name: "Chill Vibes", artist: "MellowBeats", genre: "Ambient", bpm: 70, key: "E Minor", price: 19.99, plays: 4500, likes: 320, rating: 4.4, isNew: true, isTrending: false },
  { id: "19", name: "Espacio sideral", artist: "Cosmic Drift", genre: "Ambient", bpm: 65, key: "D Major", price: 22.99, plays: 6200, likes: 480, rating: 4.6, isNew: false, isTrending: false },
  { id: "20", name: "Amanecer digital", artist: "Synth Ambient", genre: "Ambient", bpm: 72, key: "G Major", price: 24.99, plays: 5100, likes: 390, rating: 4.5, isNew: true, isTrending: false },
  // Drill
  { id: "7", name: "Street Flow", artist: "DrillMaster", genre: "Drill", bpm: 145, key: "B Minor", price: 49.99, plays: 9800, likes: 720, rating: 4.7, isNew: false, isTrending: true },
  { id: "21", name: "UK drill type", artist: "London Beats", genre: "Drill", bpm: 142, key: "E Minor", price: 44.99, plays: 11200, likes: 850, rating: 4.8, isNew: true, isTrending: true },
  { id: "22", name: "Hard street", artist: "Block Producer", genre: "Drill", bpm: 148, key: "A Minor", price: 41.99, plays: 7600, likes: 590, rating: 4.6, isNew: false, isTrending: false },
  // Reggaeton
  { id: "8", name: "Summer Party", artist: "LatinBeats", genre: "Reggaeton", bpm: 100, key: "A Major", price: 29.99, plays: 11200, likes: 980, rating: 4.6, isNew: true, isTrending: false },
  { id: "23", name: "Perreo fino", artist: "Reggaeton Lab", genre: "Reggaeton", bpm: 98, key: "D Minor", price: 32.99, plays: 16800, likes: 1320, rating: 4.9, isNew: true, isTrending: true },
  { id: "24", name: "Dembow session", artist: "Caribe Beats", genre: "Reggaeton", bpm: 102, key: "G Major", price: 27.99, plays: 8900, likes: 670, rating: 4.7, isNew: false, isTrending: false },
  // R&B / Pop / Techno / Jazz (más variedad)
  { id: "25", name: "Midnight soul", artist: "Soul Kitchen", genre: "R&B", bpm: 92, key: "C Minor", price: 35.99, plays: 7200, likes: 540, rating: 4.7, isNew: false, isTrending: false },
  { id: "26", name: "Pop hook ready", artist: "Hit Maker", genre: "Pop", bpm: 118, key: "F Major", price: 38.99, plays: 19800, likes: 1560, rating: 4.9, isNew: true, isTrending: true },
  { id: "27", name: "Techno warehouse", artist: "Berlin Nights", genre: "Techno", bpm: 130, key: "A Minor", price: 42.99, plays: 10200, likes: 780, rating: 4.8, isNew: false, isTrending: true },
  { id: "28", name: "Jazz lounge", artist: "Smooth Keys", genre: "Jazz", bpm: 90, key: "E Minor", price: 33.99, plays: 5400, likes: 410, rating: 4.6, isNew: true, isTrending: false },
]

const genres = ["Todos", "Hip-Hop", "EDM", "House", "Trap", "Lo-Fi", "Drill", "Reggaeton", "Ambient", "R&B", "Pop", "Techno", "Jazz"]

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [tracks] = useState<MarketplaceTrack[]>(marketplaceTracks)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("Todos")
  const [sortBy, setSortBy] = useState("trending")
  const [likedTracks, setLikedTracks] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])

  const filteredTracks = tracks
    .filter(track =>
      (track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedGenre === "Todos" || track.genre === selectedGenre)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "trending": return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)
        case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 0 : 0)
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "popular": return b.plays - a.plays
        default: return 0
      }
    })

  const toggleLike = (trackId: string) => {
    setLikedTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }

  const toggleCart = (trackId: string) => {
    setCart(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Suspense fallback={
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Cargando marketplace...</div>
      </div>
    }>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Descubre y compra beats de alta calidad de productores talentosos
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/studio/marketplace/upload">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Vender tus beats
              </Button>
            </Link>
            <Link href="/studio/marketplace/cart">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrito
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total de beats", value: "12.500+", icon: TrendingUp },
            { label: "Nuevos esta semana", value: "340", icon: Clock },
            { label: "Mejor valorados", value: "4.8", icon: Star },
            { label: "Precio promedio", value: "$32", icon: DollarSign },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar beats, artistas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-36 bg-card border-border text-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre} className="text-foreground hover:bg-secondary cursor-pointer">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-card border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="trending" className="text-foreground hover:bg-secondary cursor-pointer">Tendencia</SelectItem>
                <SelectItem value="newest" className="text-foreground hover:bg-secondary cursor-pointer">Más recientes</SelectItem>
                <SelectItem value="popular" className="text-foreground hover:bg-secondary cursor-pointer">Más populares</SelectItem>
                <SelectItem value="price-low" className="text-foreground hover:bg-secondary cursor-pointer">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high" className="text-foreground hover:bg-secondary cursor-pointer">Precio: mayor a menor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTracks.map((track) => (
            <div key={track.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              {/* Track Image/Waveform */}
              <div className="aspect-square bg-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-24 px-8">
                    {[...Array(16)].map((_, i) => {
                      // Altura determinista desde track.id + índice para que servidor y cliente coincidan (evitar hydration mismatch)
                      const seed = (parseInt(track.id, 10) || 0) * 7 + i * 11
                      const heightPct = (seed % 81) + 20
                      return (
                        <div
                          key={i}
                          className={`flex-1 bg-primary/50 rounded-t ${playingTrack === track.id ? "animate-pulse" : ""}`}
                          style={{
                            height: `${heightPct}%`,
                            animationDelay: `${(i * 0.05).toFixed(2)}s`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {track.isNew && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      NUEVO
                    </span>
                  )}
                  {track.isTrending && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                      TENDENCIA
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <button
                  onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                  className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {playingTrack === track.id ? (
                    <Pause className="h-16 w-16 text-primary" />
                  ) : (
                    <Play className="h-16 w-16 text-primary" />
                  )}
                </button>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(track.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likedTracks.includes(track.id) ? "fill-primary text-primary" : "text-foreground"}`}
                  />
                </button>
              </div>

              {/* Track Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Link href={`/studio/marketplace/${track.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                      {track.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">${track.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>{track.genre}</span>
                  <span>{track.bpm} BPM</span>
                  <span>{track.key}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {formatNumber(track.plays)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {formatNumber(track.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {track.rating}
                  </span>
                </div>

                <Button
                  onClick={() => toggleCart(track.id)}
                  className={`w-full ${cart.includes(track.id)
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {cart.includes(track.id) ? "En el carrito" : "Añadir al carrito"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary px-8 bg-transparent">
            Cargar más beats
          </Button>
        </div>
      </div>
    </Suspense>
  )
}
