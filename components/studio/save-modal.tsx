"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Save, Music2, Sparkles } from "lucide-react"

interface SaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
    trackInfo: {
        genre: string;
        mood: string;
        bpm: number;
        key: string;
    } | null;
}

export function SaveModal({ isOpen, onClose, onSave, trackInfo }: SaveModalProps) {
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    // Generate a suggested name when modal opens
    useEffect(() => {
        if (isOpen && trackInfo) {
            const suggestedName = `${trackInfo.genre} ${trackInfo.mood} - ${trackInfo.bpm}BPM`
            setName(suggestedName)
            setError("")
        }
    }, [isOpen, trackInfo])

    const handleSave = () => {
        if (!name.trim()) {
            setError("Por favor ingresa un nombre para tu pista")
            return
        }
        onSave(name.trim())
        setName("")
        setError("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="bg-card border border-border rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Save className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Guardar en biblioteca</h2>
                            <p className="text-sm text-muted-foreground">Dale un nombre a tu creación</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Track Preview */}
                    {trackInfo && (
                        <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                                <Music2 className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-primary px-2 py-0.5 bg-primary/10 rounded">
                                        {trackInfo.genre}
                                    </span>
                                    <span className="text-xs font-medium text-purple-400 px-2 py-0.5 bg-purple-500/10 rounded">
                                        {trackInfo.mood}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {trackInfo.bpm} BPM • {trackInfo.key}
                                </p>
                            </div>
                            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="track-name" className="text-foreground">
                            Nombre de la pista
                        </Label>
                        <Input
                            id="track-name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError("")
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Mi beat increíble..."
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            autoFocus
                        />
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>

                    {/* Quick suggestions */}
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Sugerencias rápidas:</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Midnight Vibes",
                                "Summer Flow",
                                "Dark Mode",
                                "Golden Hour"
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setName(suggestion)}
                                    className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-border">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}
