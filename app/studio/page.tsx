"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  Wand2, 
  Play, 
  Pause, 
  Download, 
  Save, 
  RefreshCw,
  Volume2,
  Clock,
  Music2
} from "lucide-react"

const genres = [
  "Hip-Hop", "EDM", "House", "Trap", "R&B", "Lo-Fi", 
  "Techno", "Drill", "Reggaeton", "Pop", "Ambient", "Jazz"
]

const moods = [
  "Energetic", "Chill", "Dark", "Happy", "Melancholic", "Aggressive"
]

const keys = [
  "C Major", "C Minor", "D Major", "D Minor", "E Major", "E Minor",
  "F Major", "F Minor", "G Major", "G Minor", "A Major", "A Minor"
]

export default function StudioPage() {
  const [selectedGenre, setSelectedGenre] = useState("Hip-Hop")
  const [selectedMood, setSelectedMood] = useState("Energetic")
  const [selectedKey, setSelectedKey] = useState("C Minor")
  const [bpm, setBpm] = useState([120])
  const [duration, setDuration] = useState([30])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedTrack, setGeneratedTrack] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setGeneratedTrack(true)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Generate Music</h1>
        <p className="text-muted-foreground mt-1">
          Create unique beats and melodies using AI
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Generation Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Genre Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <Label className="text-foreground text-lg font-semibold mb-4 block">
              Select Genre
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedGenre === genre
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
              Mood
            </Label>
            <div className="flex flex-wrap gap-3">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedMood === mood
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
              Parameters
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
                    Duration (sec)
                  </Label>
                  <span className="text-sm text-primary font-medium">{duration[0]}s</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={15}
                  max={120}
                  step={5}
                  className="[&_[role=slider]]:bg-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15s</span>
                  <span>120s</span>
                </div>
              </div>
            </div>

            {/* Key Selection */}
            <div className="space-y-4">
              <Label className="text-foreground flex items-center gap-2">
                <Music2 className="h-4 w-4 text-primary" />
                Musical Key
              </Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {keys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                      selectedKey === key
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
            disabled={isGenerating}
            className="w-full py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating... {progress}%
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 mr-2" />
                Generate Track
              </>
            )}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
            
            {generatedTrack ? (
              <div className="space-y-6">
                {/* Waveform Visualization */}
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-end justify-center gap-1 h-24">
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 bg-primary rounded-t transition-all duration-150 ${
                          isPlaying ? "animate-pulse" : ""
                        }`}
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Track Info */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Genre:</span> {selectedGenre}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Mood:</span> {selectedMood}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Key:</span> {selectedKey}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">BPM:</span> {bpm[0]}
                  </p>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
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
                      className={`h-full bg-primary transition-all duration-300 ${
                        isPlaying ? "animate-[progress_30s_linear_forwards]" : ""
                      }`}
                      style={{ width: isPlaying ? "100%" : "0%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0:00</span>
                    <span>0:{duration[0]}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Wand2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Configure your parameters and click Generate to create a track
                </p>
              </div>
            )}
          </div>

          {/* Recent Generations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent</h3>
            <div className="space-y-3">
              {[
                { genre: "Lo-Fi", bpm: 85, time: "2 hours ago" },
                { genre: "Trap", bpm: 140, time: "5 hours ago" },
                { genre: "House", bpm: 128, time: "Yesterday" },
              ].map((track, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {track.genre} Beat
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {track.bpm} BPM
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{track.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
