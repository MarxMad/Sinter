"use client"

import { useState } from "react"
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
import { useSearchParams, Suspense } from "next/navigation"
import Loading from "./loading"

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

const marketplaceTracks: MarketplaceTrack[] = [
  { id: "1", name: "Sunset Boulevard", artist: "ProducerX", genre: "Lo-Fi", bpm: 85, key: "C Minor", price: 29.99, plays: 12500, likes: 890, rating: 4.8, isNew: true, isTrending: true },
  { id: "2", name: "Night Rider", artist: "BeatMaster", genre: "Trap", bpm: 140, key: "G Minor", price: 39.99, plays: 8900, likes: 654, rating: 4.6, isNew: false, isTrending: true },
  { id: "3", name: "Electric Dreams", artist: "SynthWave", genre: "EDM", bpm: 128, key: "A Minor", price: 24.99, plays: 15600, likes: 1200, rating: 4.9, isNew: false, isTrending: false },
  { id: "4", name: "Urban Jungle", artist: "HipHopKing", genre: "Hip-Hop", bpm: 92, key: "D Minor", price: 34.99, plays: 6700, likes: 445, rating: 4.5, isNew: true, isTrending: false },
  { id: "5", name: "Club Banger", artist: "DJMix", genre: "House", bpm: 124, key: "F Major", price: 44.99, plays: 21000, likes: 1800, rating: 4.9, isNew: false, isTrending: true },
  { id: "6", name: "Chill Vibes", artist: "MellowBeats", genre: "Ambient", bpm: 70, key: "E Minor", price: 19.99, plays: 4500, likes: 320, rating: 4.4, isNew: true, isTrending: false },
  { id: "7", name: "Street Flow", artist: "DrillMaster", genre: "Drill", bpm: 145, key: "B Minor", price: 49.99, plays: 9800, likes: 720, rating: 4.7, isNew: false, isTrending: true },
  { id: "8", name: "Summer Party", artist: "LatinBeats", genre: "Reggaeton", bpm: 100, key: "A Major", price: 29.99, plays: 11200, likes: 980, rating: 4.6, isNew: true, isTrending: false },
]

const genres = ["All", "Hip-Hop", "EDM", "House", "Trap", "Lo-Fi", "Drill", "Reggaeton", "Ambient"]

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [tracks] = useState<MarketplaceTrack[]>(marketplaceTracks)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const [likedTracks, setLikedTracks] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])

  const filteredTracks = tracks
    .filter(track => 
      (track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedGenre === "All" || track.genre === selectedGenre)
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
    <Suspense fallback={<Loading />}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Discover and purchase high-quality beats from talented producers
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Sell Your Beats
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Beats", value: "12,500+", icon: TrendingUp },
            { label: "New This Week", value: "340", icon: Clock },
            { label: "Top Rated", value: "4.8", icon: Star },
            { label: "Avg. Price", value: "$32", icon: DollarSign },
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
              placeholder="Search beats, artists..."
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
                <SelectItem value="trending" className="text-foreground hover:bg-secondary cursor-pointer">Trending</SelectItem>
                <SelectItem value="newest" className="text-foreground hover:bg-secondary cursor-pointer">Newest</SelectItem>
                <SelectItem value="popular" className="text-foreground hover:bg-secondary cursor-pointer">Most Popular</SelectItem>
                <SelectItem value="price-low" className="text-foreground hover:bg-secondary cursor-pointer">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="text-foreground hover:bg-secondary cursor-pointer">Price: High to Low</SelectItem>
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
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 bg-primary/50 rounded-t ${playingTrack === track.id ? "animate-pulse" : ""}`}
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {track.isNew && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      NEW
                    </span>
                  )}
                  {track.isTrending && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                      HOT
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
                    <h3 className="font-semibold text-foreground">{track.name}</h3>
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
                  className={`w-full ${
                    cart.includes(track.id)
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {cart.includes(track.id) ? "In Cart" : "Add to Cart"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary px-8 bg-transparent">
            Load More Beats
          </Button>
        </div>
      </div>
    </Suspense>
  )
}
