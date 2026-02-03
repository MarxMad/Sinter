"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ArrowLeft,
    Upload,
    Music2,
    DollarSign,
    Tag,
    FileAudio,
    Play,
    Pause,
    X,
    CheckCircle2,
    AlertCircle,
    Sparkles
} from "lucide-react"

const genres = [
    "Hip-Hop", "EDM", "House", "Trap", "R&B", "Lo-Fi",
    "Techno", "Drill", "Reggaeton", "Pop", "Ambient", "Jazz"
]

const moods = [
    "Energético", "Relajado", "Oscuro", "Feliz", "Melancólico", "Agresivo"
]

const keys = [
    "C Major", "C Minor", "D Major", "D Minor", "E Major", "E Minor",
    "F Major", "F Minor", "G Major", "G Minor", "A Major", "A Minor"
]

const licenseTypes = [
    { id: "standard", name: "Standard", description: "Uso comercial limitado", price: "$29.99" },
    { id: "premium", name: "Premium", description: "Uso comercial extendido", price: "$99.99" },
    { id: "exclusive", name: "Exclusive", description: "Derechos exclusivos completos", price: "$499.99" },
]

export default function MarketplaceUploadPage() {
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        genre: "Hip-Hop",
        mood: "Energético",
        bpm: "120",
        key: "C Minor",
        price: "29.99",
        licenseType: "standard",
        tags: "",
        description: "",
    })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile && droppedFile.type.startsWith("audio/")) {
            setFile(droppedFile)
            setAudioUrl(URL.createObjectURL(droppedFile))
        } else {
            setError("Por favor sube un archivo de audio válido")
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile && selectedFile.type.startsWith("audio/")) {
            setFile(selectedFile)
            setAudioUrl(URL.createObjectURL(selectedFile))
        } else {
            setError("Por favor sube un archivo de audio válido")
        }
    }

    const handlePlayPause = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const removeFile = () => {
        setFile(null)
        setAudioUrl(null)
        setIsPlaying(false)
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            setError("Por favor sube un archivo de audio")
            return
        }

        if (!formData.name.trim()) {
            setError("Por favor ingresa un nombre para el beat")
            return
        }

        setIsUploading(true)
        setError(null)

        try {
            // Simulate upload - in production this would be an actual API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            setSuccess(true)
            setIsUploading(false)
        } catch {
            setError("Error al subir el beat. Intenta de nuevo.")
            setIsUploading(false)
        }
    }

    if (success) {
        return (
            <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-4">¡Beat publicado!</h1>
                    <p className="text-muted-foreground mb-8">
                        Tu beat &quot;{formData.name}&quot; ha sido publicado en el marketplace y estará disponible para compradores pronto.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/studio/marketplace">
                            <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                                Ver en marketplace
                            </Button>
                        </Link>
                        <Button
                            onClick={() => {
                                setSuccess(false)
                                setFile(null)
                                setAudioUrl(null)
                                setFormData({
                                    name: "",
                                    genre: "Hip-Hop",
                                    mood: "Energético",
                                    bpm: "120",
                                    key: "C Minor",
                                    price: "29.99",
                                    licenseType: "standard",
                                    tags: "",
                                    description: "",
                                })
                            }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Subir otro beat
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/studio/marketplace"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al marketplace
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">Vender tu beat</h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Sparkles className="h-3 w-3" />
                        Pro Feature
                    </span>
                </div>
                <p className="text-muted-foreground mt-1">
                    Sube tu música al marketplace y comienza a ganar
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-destructive">{error}</p>
                    <button onClick={() => setError(null)} className="ml-auto text-destructive hover:text-destructive/80">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Upload & Preview */}
                    <div className="space-y-6">
                        {/* File Upload */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <FileAudio className="h-5 w-5 text-primary" />
                                Archivo de audio
                            </h2>

                            {!file ? (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${dragActive
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-muted-foreground"
                                        }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-foreground font-medium mb-2">
                                        Arrastra tu archivo aquí
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        o haz clic para seleccionar
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-4">
                                        WAV, MP3, FLAC • Máximo 50MB
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-secondary rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={handlePlayPause}
                                            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-5 w-5 text-primary-foreground" />
                                            ) : (
                                                <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                                            )}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-foreground font-medium truncate">{file.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    {audioUrl && (
                                        <audio
                                            ref={audioRef}
                                            src={audioUrl}
                                            onEnded={() => setIsPlaying(false)}
                                            className="hidden"
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* License Type */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Tag className="h-5 w-5 text-primary" />
                                Tipo de licencia
                            </h2>
                            <div className="space-y-3">
                                {licenseTypes.map((license) => (
                                    <label
                                        key={license.id}
                                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${formData.licenseType === license.id
                                                ? "bg-primary/10 border border-primary"
                                                : "bg-secondary hover:bg-secondary/80"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="licenseType"
                                                value={license.id}
                                                checked={formData.licenseType === license.id}
                                                onChange={(e) => setFormData(f => ({ ...f, licenseType: e.target.value }))}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.licenseType === license.id ? "border-primary" : "border-muted-foreground"
                                                }`}>
                                                {formData.licenseType === license.id && (
                                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{license.name}</p>
                                                <p className="text-sm text-muted-foreground">{license.description}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-primary">{license.price}+</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Music2 className="h-5 w-5 text-primary" />
                                Información del beat
                            </h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre del beat *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                                        placeholder="Ej: Midnight Trap"
                                        className="bg-secondary border-border text-foreground"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="genre">Género</Label>
                                        <select
                                            id="genre"
                                            value={formData.genre}
                                            onChange={(e) => setFormData(f => ({ ...f, genre: e.target.value }))}
                                            className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-foreground"
                                        >
                                            {genres.map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mood">Mood</Label>
                                        <select
                                            id="mood"
                                            value={formData.mood}
                                            onChange={(e) => setFormData(f => ({ ...f, mood: e.target.value }))}
                                            className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-foreground"
                                        >
                                            {moods.map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bpm">BPM</Label>
                                        <Input
                                            id="bpm"
                                            type="number"
                                            min="60"
                                            max="200"
                                            value={formData.bpm}
                                            onChange={(e) => setFormData(f => ({ ...f, bpm: e.target.value }))}
                                            className="bg-secondary border-border text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="key">Tonalidad</Label>
                                        <select
                                            id="key"
                                            value={formData.key}
                                            onChange={(e) => setFormData(f => ({ ...f, key: e.target.value }))}
                                            className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-foreground"
                                        >
                                            {keys.map(k => (
                                                <option key={k} value={k}>{k}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                Precio
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio (USD)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => setFormData(f => ({ ...f, price: e.target.value }))}
                                            className="bg-secondary border-border text-foreground pl-7"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (separados por comas)</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData(f => ({ ...f, tags: e.target.value }))}
                                        placeholder="trap, dark, bass, 808"
                                        className="bg-secondary border-border text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción (opcional)</Label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                                        placeholder="Describe tu beat..."
                                        rows={3}
                                        className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base"
                        >
                            {isUploading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                    Publicando...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5 mr-2" />
                                    Publicar en el Marketplace
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            Al publicar, aceptas nuestros{" "}
                            <Link href="/terms" className="text-primary hover:underline">términos de servicio</Link>
                            {" "}y{" "}
                            <Link href="/licenses" className="text-primary hover:underline">políticas de licencias</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
