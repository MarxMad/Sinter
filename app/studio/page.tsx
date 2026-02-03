"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SaveModal } from "@/components/studio/save-modal"
import {
  Wand2,
  Play,
  Pause,
  Download,
  Save,
  RefreshCw,
  Volume2,
  Clock,
  Music2,
  AlertCircle,
  CheckCircle2,
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

interface GeneratedTrack {
  audioBlob: Blob;
  audioUrl: string;
  metadata: {
    genre: string;
    mood: string;
    bpm: number;
    key: string;
    duration: number;
    generatedAt: string;
    seed: number;
    patternVariation?: number;
    chordProgression?: string[];
  };
}

interface RecentTrack {
  id: string;
  genre: string;
  bpm: number;
  createdAt: string;
  audioUrl?: string;
}

export default function StudioPage() {
  const [selectedGenre, setSelectedGenre] = useState("Hip-Hop")
  const [selectedMood, setSelectedMood] = useState("Energético")
  const [selectedKey, setSelectedKey] = useState("C Minor")
  const [bpm, setBpm] = useState([120])
  const [duration, setDuration] = useState([30])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedTrack, setGeneratedTrack] = useState<GeneratedTrack | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [recentTracks, setRecentTracks] = useState<RecentTrack[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [generatorLoaded, setGeneratorLoaded] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const generatorRef = useRef<typeof import('@/lib/music-engine/generator') | null>(null)

  // Load generator and recent tracks on mount
  useEffect(() => {
    loadGenerator()
    loadRecentTracks()
  }, [])

  // Handle audio time update
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [generatedTrack])

  const loadGenerator = async () => {
    try {
      const generator = await import('@/lib/music-engine/generator')
      generatorRef.current = generator
      setGeneratorLoaded(true)
    } catch (err) {
      console.error('Error loading music generator:', err)
      setError('Error al cargar el generador de música')
    }
  }

  const loadRecentTracks = async () => {
    try {
      const response = await fetch('/api/music/library?limit=3')
      if (response.ok) {
        const data = await response.json()
        setRecentTracks(data.tracks.map((t: { id: string; genre: string; bpm: number; createdAt: string; filename: string }) => ({
          id: t.id,
          genre: t.genre,
          bpm: t.bpm,
          createdAt: t.createdAt,
          audioUrl: `/generated-music/${t.filename}`
        })))
      }
    } catch (err) {
      console.error('Error loading recent tracks:', err)
    }
  }

  const handleGenerate = async () => {
    if (!generatorRef.current) {
      setError('El generador de música no está listo. Por favor recarga la página.')
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setError(null)
    setSuccessMessage(null)

    // Clean up previous audio
    if (generatedTrack?.audioUrl) {
      URL.revokeObjectURL(generatedTrack.audioUrl)
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setGeneratedTrack(null)
    setIsPlaying(false)

    // Start progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95
        return prev + Math.random() * 10
      })
    }, 200)

    try {
      // Generate music locally using Tone.js
      const result = await generatorRef.current.generateMusicLocal({
        genre: selectedGenre,
        mood: selectedMood,
        bpm: bpm[0],
        key: selectedKey,
        duration: duration[0],
      })

      clearInterval(progressInterval)
      setProgress(100)

      // Create audio URL from blob
      const audioUrl = URL.createObjectURL(result.audioBlob)
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      setGeneratedTrack({
        audioBlob: result.audioBlob,
        audioUrl,
        metadata: result.metadata,
      })

      setSuccessMessage('¡Música generada exitosamente!')
      setTimeout(() => setSuccessMessage(null), 3000)

    } catch (err) {
      clearInterval(progressInterval)
      setProgress(0)
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Error al generar música')
    } finally {
      setIsGenerating(false)
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

  const handleSave = () => {
    if (!generatedTrack) return
    setShowSaveModal(true)
  }

  const handleSaveWithName = async (name: string) => {
    if (!generatedTrack) return

    try {
      // Convert blob to base64
      const reader = new FileReader()
      reader.readAsDataURL(generatedTrack.audioBlob)

      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1]

        const response = await fetch('/api/music/library', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioBase64: base64,
            metadata: {
              ...generatedTrack.metadata,
              name,
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Error al guardar')
        }

        setShowSaveModal(false)
        setSuccessMessage(`¡"${name}" guardado en tu biblioteca!`)
        setTimeout(() => setSuccessMessage(null), 3000)

        loadRecentTracks()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    }
  }

  const handleDownload = () => {
    if (!generatedTrack) return

    const a = document.createElement('a')
    a.href = generatedTrack.audioUrl
    a.download = `sinter-${selectedGenre.toLowerCase()}-${bpm[0]}bpm-${generatedTrack.metadata.seed}.wav`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return 'Hace momentos'
    if (diffHours < 24) return `Hace ${diffHours} h`
    if (diffHours < 48) return 'Ayer'
    return `Hace ${Math.floor(diffHours / 24)} días`
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-foreground">Generar música</h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            100% Gratis
          </span>
        </div>
        <p className="text-muted-foreground">
          Crea beats y melodías únicos con nuestro motor de síntesis procedural • Sin costos de API • Sin derechos de autor
        </p>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-destructive">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-destructive hover:text-destructive/80"
          >
            ✕
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <p className="text-green-500">{successMessage}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Generation Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Genre Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <Label className="text-foreground text-lg font-semibold mb-4 block">
              Seleccionar género
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${selectedGenre === genre
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <Label className="text-foreground text-lg font-semibold mb-4 block">
              Ambiente
            </Label>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedMood === mood
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <Label className="text-foreground text-lg font-semibold block">
              Parámetros
            </Label>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* BPM */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    BPM
                  </Label>
                  <span className="text-sm text-primary font-medium">{bpm[0]}</span>
                </div>
                <Slider
                  value={bpm}
                  onValueChange={setBpm}
                  min={60}
                  max={180}
                  step={1}
                  className="[&_[role=slider]]:bg-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>60</span>
                  <span>180</span>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    Duración (seg)
                  </Label>
                  <span className="text-sm text-primary font-medium">{duration[0]}s</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={10}
                  max={60}
                  step={5}
                  className="[&_[role=slider]]:bg-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10s</span>
                  <span>60s</span>
                </div>
              </div>
            </div>

            {/* Key Selection */}
            <div className="space-y-4">
              <Label className="text-foreground flex items-center gap-2">
                <Music2 className="h-4 w-4 text-primary" />
                Tonalidad
              </Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {keys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className={`px-3 py-2 rounded text-xs font-medium transition-colors ${selectedKey === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !generatorLoaded}
            className="w-full py-6 text-lg bg-gradient-to-r from-primary to-purple-600 text-primary-foreground hover:opacity-90"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generando... {Math.round(progress)}%
              </>
            ) : !generatorLoaded ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Cargando motor de audio...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generar pista con IA
              </>
            )}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Vista previa</h3>

            {generatedTrack ? (
              <div className="space-y-6">
                {/* Waveform Visualization */}
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-end justify-center gap-1 h-24">
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 bg-gradient-to-t from-primary to-purple-500 rounded-t transition-all duration-150 ${isPlaying ? "animate-pulse" : ""
                          }`}
                        style={{
                          height: `${20 + (Math.sin(i * 0.5) + 1) * 30 + Math.random() * 20}%`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Track Info */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Género:</span> {generatedTrack.metadata.genre}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Ambiente:</span> {generatedTrack.metadata.mood}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Tonalidad:</span> {generatedTrack.metadata.key}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">BPM:</span> {generatedTrack.metadata.bpm}
                  </p>
                  {generatedTrack.metadata.patternVariation && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Variación:</span> #{generatedTrack.metadata.patternVariation}
                    </p>
                  )}
                  {generatedTrack.metadata.chordProgression && (
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">Acordes:</span> {generatedTrack.metadata.chordProgression.join(' → ')}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Seed: {generatedTrack.metadata.seed}
                  </p>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayPause}
                    className="h-12 w-12 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
                      style={{
                        width: `${(currentTime / duration[0]) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration[0])}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary bg-transparent"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Wand2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Configura los parámetros y haz clic en Generar para crear una pista
                </p>
              </div>
            )}
          </div>

          {/* Recent Generations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recientes</h3>
            <div className="space-y-3">
              {recentTracks.length > 0 ? (
                recentTracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                      <Play className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        Beat {track.genre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {track.bpm} BPM
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getRelativeTime(track.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                [
                  { genre: "Lo-Fi", bpm: 85, time: "Genera tu primera pista" },
                ].map((track, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                      <Play className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {track.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Las pistas aparecerán aquí
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveWithName}
        trackInfo={generatedTrack ? {
          genre: generatedTrack.metadata.genre,
          mood: generatedTrack.metadata.mood,
          bpm: generatedTrack.metadata.bpm,
          key: generatedTrack.metadata.key,
        } : null}
      />
    </div>
  )
}
