"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft,
    Play,
    Pause,
    Heart,
    Share2,
    ShoppingCart,
    Download,
    Clock,
    Music2,
    User,
    Star,
    Check,
    Headphones,
    Award,
    Shield
} from "lucide-react"

// Mock data - in production this would come from an API
const mockTracks: Record<string, {
    id: string
    name: string
    artist: string
    artistAvatar?: string
    genre: string
    mood: string
    bpm: number
    key: string
    duration: string
    price: number
    exclusivePrice: number
    plays: number
    likes: number
    rating: number
    description: string
    tags: string[]
    licenses: {
        type: string
        price: number
        features: string[]
    }[]
    relatedTracks: { id: string; name: string; artist: string; price: number }[]
}> = {
    "1": {
        id: "1",
        name: "Boulevard al atardecer",
        artist: "ProducerX",
        genre: "Lo-Fi",
        mood: "Relajado",
        bpm: 85,
        key: "C Minor",
        duration: "2:45",
        price: 29.99,
        exclusivePrice: 299.99,
        plays: 12500,
        likes: 890,
        rating: 4.8,
        description: "Un beat lo-fi perfecto para estudiar o relajarse. Combina samples de vinilo con melodías suaves de piano y drums chill. Ideal para proyectos de contenido, podcasts o simplemente para disfrutar.",
        tags: ["lo-fi", "chill", "study", "piano", "vinyl"],
        licenses: [
            {
                type: "Standard",
                price: 29.99,
                features: ["MP3 + WAV", "Uso en streaming (500K)", "Redes sociales", "1 proyecto comercial"]
            },
            {
                type: "Premium",
                price: 99.99,
                features: ["MP3 + WAV + Stems", "Streaming ilimitado", "Videos musicales", "Proyectos ilimitados"]
            },
            {
                type: "Exclusive",
                price: 299.99,
                features: ["Todos los archivos + Proyecto", "Propiedad exclusiva", "Se retira del marketplace", "Derechos completos"]
            }
        ],
        relatedTracks: [
            { id: "9", name: "Lluvia en la ventana", artist: "ChillBeats MX", price: 24.99 },
            { id: "10", name: "Café y notas", artist: "Lofi Collective", price: 19.99 },
            { id: "6", name: "Chill Vibes", artist: "MellowBeats", price: 19.99 }
        ]
    }
}

// Default track for any ID
const defaultTrack = {
    id: "default",
    name: "Beat Premium",
    artist: "Sinter Producer",
    genre: "Hip-Hop",
    mood: "Energético",
    bpm: 140,
    key: "G Minor",
    duration: "3:20",
    price: 39.99,
    exclusivePrice: 399.99,
    plays: 8500,
    likes: 620,
    rating: 4.7,
    description: "Un beat versátil de alta calidad, perfecto para cualquier proyecto de música urbana. Mezcla elementos modernos de trap con influencias clásicas de hip-hop.",
    tags: ["hip-hop", "trap", "urban", "808", "dark"],
    licenses: [
        {
            type: "Standard",
            price: 39.99,
            features: ["MP3 + WAV", "Uso en streaming (500K)", "Redes sociales", "1 proyecto comercial"]
        },
        {
            type: "Premium",
            price: 129.99,
            features: ["MP3 + WAV + Stems", "Streaming ilimitado", "Videos musicales", "Proyectos ilimitados"]
        },
        {
            type: "Exclusive",
            price: 399.99,
            features: ["Todos los archivos + Proyecto", "Propiedad exclusiva", "Se retira del marketplace", "Derechos completos"]
        }
    ],
    relatedTracks: [
        { id: "2", name: "Night Rider", artist: "BeatMaster", price: 39.99 },
        { id: "11", name: "Dinero y flow", artist: "Trap King", price: 44.99 },
        { id: "4", name: "Urban Jungle", artist: "HipHopKing", price: 34.99 }
    ]
}

export default function ProductDetailPage() {
    const params = useParams()
    const trackId = params.id as string
    const track = mockTracks[trackId] || { ...defaultTrack, id: trackId, name: `Beat #${trackId}` }

    const [isPlaying, setIsPlaying] = useState(false)
    const [selectedLicense, setSelectedLicense] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Reset states when track changes
        setIsPlaying(false)
        setSelectedLicense(0)
        setAddedToCart(false)
    }, [trackId])

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
        // In production, this would control actual audio playback
    }

    const handleAddToCart = () => {
        setAddedToCart(true)
        // In production, this would add to cart state/context
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Back Link */}
            <Link
                href="/studio/marketplace"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al marketplace
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Player Card */}
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        {/* Cover Image / Waveform Area */}
                        <div className="relative h-64 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <div className="absolute inset-0 backdrop-blur-3xl" />

                            {/* Play Button */}
                            <button
                                onClick={handlePlayPause}
                                className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/30"
                            >
                                {isPlaying ? (
                                    <Pause className="h-8 w-8 text-primary-foreground" />
                                ) : (
                                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                                )}
                            </button>

                            {/* Waveform visualization (mock) */}
                            <div className="absolute bottom-4 left-4 right-4 h-12 flex items-end justify-center gap-0.5">
                                {Array.from({ length: 60 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-white/30 rounded-full"
                                        style={{
                                            height: `${Math.random() * 100}%`,
                                            opacity: isPlaying ? 0.8 : 0.4
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Duration badge */}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-white text-sm flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {track.duration}
                            </div>
                        </div>

                        {/* Track Info */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-foreground mb-2">{track.name}</h1>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="text-muted-foreground">{track.artist}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm">{track.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2.5 rounded-lg transition-colors ${isLiked ? 'bg-pink-500/10 text-pink-500' : 'bg-secondary text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-2.5 bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Tags & Info */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{track.genre}</span>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full">{track.mood}</span>
                                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">{track.bpm} BPM</span>
                                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">{track.key}</span>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Headphones className="h-4 w-4" />
                                    {track.plays.toLocaleString()} plays
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    {track.likes.toLocaleString()} likes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Descripción</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">{track.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {track.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Related Tracks */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Tracks similares</h2>
                        <div className="space-y-3">
                            {track.relatedTracks.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/studio/marketplace/${related.id}`}
                                    className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-lg flex items-center justify-center">
                                            <Music2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{related.name}</p>
                                            <p className="text-sm text-muted-foreground">{related.artist}</p>
                                        </div>
                                    </div>
                                    <span className="text-primary font-medium">${related.price}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Purchase Options */}
                <div className="space-y-6">
                    {/* License Selection */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Seleccionar licencia
                        </h2>
                        <div className="space-y-3">
                            {track.licenses.map((license, index) => (
                                <button
                                    key={license.type}
                                    onClick={() => setSelectedLicense(index)}
                                    className={`w-full text-left p-4 rounded-lg transition-colors ${selectedLicense === index
                                            ? "bg-primary/10 border-2 border-primary"
                                            : "bg-secondary hover:bg-secondary/80 border-2 border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-foreground">{license.type}</span>
                                        <span className="text-lg font-bold text-primary">${license.price}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {license.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="h-3.5 w-3.5 text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {addedToCart ? (
                            <Link href="/studio/marketplace/cart" className="block">
                                <Button className="w-full h-12 bg-green-600 text-white hover:bg-green-700">
                                    <Check className="h-5 w-5 mr-2" />
                                    Ver carrito
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={handleAddToCart}
                                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Agregar al carrito - ${track.licenses[selectedLicense].price}
                            </Button>
                        )}
                        <Link href="/studio/marketplace/checkout">
                            <Button
                                variant="outline"
                                className="w-full h-12 border-border text-foreground hover:bg-secondary bg-transparent"
                            >
                                Comprar ahora
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium text-foreground">Compra segura</span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                Descarga instantánea
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                Licencia verificada
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                Soporte 24/7
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
