"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Play, 
  Pause,
  MoreVertical, 
  Download, 
  Edit, 
  Trash2,
  Filter,
  Grid,
  List,
  Upload,
  Clock,
  Music
} from "lucide-react"
import Link from "next/link"
import Loading from "./loading"

interface Track {
  id: string
  name: string
  genre: string
  bpm: number
  key: string
  duration: string
  createdAt: string
  status: "draft" | "published" | "selling"
}

const mockTracks: Track[] = [
  { id: "1", name: "Midnight Vibes", genre: "Lo-Fi", bpm: 85, key: "C Minor", duration: "0:30", createdAt: "2025-01-20", status: "published" },
  { id: "2", name: "Street Dreams", genre: "Hip-Hop", bpm: 92, key: "G Minor", duration: "0:45", createdAt: "2025-01-19", status: "selling" },
  { id: "3", name: "Neon Nights", genre: "EDM", bpm: 128, key: "A Minor", duration: "1:00", createdAt: "2025-01-18", status: "draft" },
  { id: "4", name: "Summer Heat", genre: "House", bpm: 124, key: "F Major", duration: "0:30", createdAt: "2025-01-17", status: "published" },
  { id: "5", name: "Dark Matter", genre: "Trap", bpm: 140, key: "D Minor", duration: "0:45", createdAt: "2025-01-16", status: "selling" },
  { id: "6", name: "Chill Wave", genre: "Ambient", bpm: 70, key: "E Minor", duration: "1:30", createdAt: "2025-01-15", status: "draft" },
]

export default function LibraryPage() {
  const [tracks] = useState<Track[]>(mockTracks)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTracks = tracks.filter(track => 
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.genre.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: Track["status"]) => {
    switch (status) {
      case "published": return "bg-accent text-accent-foreground"
      case "selling": return "bg-primary text-primary-foreground"
      default: return "bg-secondary text-muted-foreground"
    }
  }

  const getStatusLabel = (status: Track["status"]) => {
    switch (status) {
      case "draft": return "Borrador"
      case "published": return "Publicado"
      case "selling": return "En venta"
      default: return status
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mi biblioteca</h1>
            <p className="text-muted-foreground mt-1">
              {tracks.length} pistas en tu colección
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Upload className="h-4 w-4 mr-2" />
            Subir pista
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pistas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Track List */}
        {viewMode === "list" ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Pista</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Género</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">BPM</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Tonalidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Estado</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTracks.map((track) => (
                  <tr key={track.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                          className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {playingTrack === track.id ? (
                            <Pause className="h-4 w-4 text-primary" />
                          ) : (
                            <Play className="h-4 w-4 text-foreground" />
                          )}
                        </button>
                        <div>
                          <p className="font-medium text-foreground">{track.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {track.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground hidden md:table-cell">{track.genre}</td>
                    <td className="px-4 py-4 text-muted-foreground hidden lg:table-cell">{track.bpm}</td>
                    <td className="px-4 py-4 text-muted-foreground hidden lg:table-cell">{track.key}</td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(track.status)}`}>
                        {getStatusLabel(track.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem asChild>
                            <Link href={`/studio/editor/${track.id}`} className="flex items-center cursor-pointer text-foreground hover:bg-secondary">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-foreground hover:bg-secondary">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-secondary">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTracks.map((track) => (
              <div key={track.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
                <div className="aspect-square bg-secondary rounded-lg mb-4 flex items-center justify-center relative group">
                  <Music className="h-12 w-12 text-muted-foreground" />
                  <button
                    onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                    className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {playingTrack === track.id ? (
                      <Pause className="h-12 w-12 text-primary" />
                    ) : (
                      <Play className="h-12 w-12 text-primary" />
                    )}
                  </button>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{track.name}</p>
                    <p className="text-sm text-muted-foreground">{track.genre} - {track.bpm} BPM</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground -mt-1 -mr-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem asChild>
                        <Link href={`/studio/editor/${track.id}`} className="flex items-center cursor-pointer text-foreground hover:bg-secondary">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-foreground hover:bg-secondary">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive hover:bg-secondary">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(track.status)}`}>
                    {getStatusLabel(track.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  )
}
