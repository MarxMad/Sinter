"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  VolumeX,
  Save,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Scissors,
  Copy,
  Trash2,
  Layers,
  Music2,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface Track {
  id: string
  name: string
  color: string
  volume: number
  muted: boolean
  solo: boolean
}

const initialTracks: Track[] = [
  { id: "drums", name: "Batería", color: "bg-primary", volume: 80, muted: false, solo: false },
  { id: "bass", name: "Bajo", color: "bg-accent", volume: 75, muted: false, solo: false },
  { id: "melody", name: "Melodía", color: "bg-chart-5", volume: 70, muted: false, solo: false },
  { id: "synth", name: "Pad sintetizador", color: "bg-chart-3", volume: 60, muted: false, solo: false },
]

export default function EditorPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [masterVolume, setMasterVolume] = useState([80])
  const [tracks, setTracks] = useState<Track[]>(initialTracks)
  const [selectedTrack, setSelectedTrack] = useState<string | null>("drums")
  const [zoom, setZoom] = useState(1)
  const [trackName, setTrackName] = useState("Midnight Vibes")

  const toggleMute = (trackId: string) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, muted: !t.muted } : t
    ))
  }

  const toggleSolo = (trackId: string) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, solo: !t.solo } : t
    ))
  }

  const updateVolume = (trackId: string, volume: number) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, volume } : t
    ))
  }

  const duration = 30 // seconds

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/studio/library" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Input
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            className="w-48 bg-secondary border-border text-foreground font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Redo className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="text-muted-foreground hover:text-foreground">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.25))} className="text-muted-foreground hover:text-foreground">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Track List Sidebar */}
        <div className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-foreground font-medium">Pistas</Label>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Layers className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedTrack === track.id 
                    ? "bg-secondary border border-primary" 
                    : "hover:bg-secondary border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${track.color}`} />
                  <span className="text-sm font-medium text-foreground flex-1">{track.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(track.id); }}
                    className={`px-2 py-1 text-xs rounded ${
                      track.muted 
                        ? "bg-destructive/20 text-destructive" 
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSolo(track.id); }}
                    className={`px-2 py-1 text-xs rounded ${
                      track.solo 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    S
                  </button>
                  <div className="flex-1 ml-2">
                    <Slider
                      value={[track.volume]}
                      onValueChange={([v]) => updateVolume(track.id, v)}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary bg-transparent">
              <Music2 className="h-4 w-4 mr-2" />
              Añadir pista
            </Button>
          </div>
        </div>

        {/* Timeline Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Timeline Header */}
          <div className="h-8 bg-secondary border-b border-border flex items-center px-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground" style={{ marginLeft: `${currentTime / duration * 100}%` }}>
              {[...Array(Math.ceil(duration / 5) + 1)].map((_, i) => (
                <span key={i} className="w-24">
                  {i * 5}s
                </span>
              ))}
            </div>
          </div>

          {/* Waveform/Track View */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-2" style={{ width: `${100 * zoom}%`, minWidth: "100%" }}>
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`h-20 rounded-lg border transition-colors ${
                    selectedTrack === track.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border bg-card"
                  } ${track.muted ? "opacity-50" : ""}`}
                >
                  <div className="h-full flex items-center px-4">
                    <div className={`w-2 h-full ${track.color} rounded-l-lg`} />
                    <div className="flex-1 h-12 mx-4 flex items-end gap-0.5">
                      {[...Array(64)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 ${track.color} rounded-t opacity-70`}
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Playhead */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="bg-card border-t border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Time Display */}
          <div className="text-sm font-mono text-foreground w-24">
            {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / 
            {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentTime(0)} className="text-muted-foreground hover:text-foreground">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentTime(duration)} className="text-muted-foreground hover:text-foreground">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Master Volume */}
          <div className="flex items-center gap-3 w-48">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMasterVolume(masterVolume[0] === 0 ? [80] : [0])}
              className="text-muted-foreground hover:text-foreground"
            >
              {masterVolume[0] === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={masterVolume}
              onValueChange={setMasterVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-8">{masterVolume[0]}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 max-w-4xl mx-auto">
          <Slider
            value={[currentTime]}
            onValueChange={([v]) => setCurrentTime(v)}
            max={duration}
            step={0.1}
            className="[&_[role=slider]]:bg-primary"
          />
        </div>
      </div>
    </div>
  )
}
