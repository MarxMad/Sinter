/**
 * API Route: Music Library Management
 * 
 * GET /api/music/library - List saved tracks
 * POST /api/music/library - Save a new track
 * DELETE /api/music/library - Delete a track
 * 
 * Note: This uses in-memory storage for now. 
 * In production, replace with a database.
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Storage directory for saved tracks
const STORAGE_DIR = path.join(process.cwd(), 'public', 'generated-music');
const INDEX_FILE = path.join(STORAGE_DIR, 'index.json');

interface TrackMetadata {
    id: string;
    filename: string;
    genre: string;
    mood: string;
    bpm: number;
    key: string;
    duration: number;
    prompt: string;
    createdAt: string;
}

interface LibraryIndex {
    tracks: TrackMetadata[];
    lastUpdated: string;
}

/**
 * Ensure storage directory exists
 */
async function ensureStorageDir(): Promise<void> {
    if (!existsSync(STORAGE_DIR)) {
        await mkdir(STORAGE_DIR, { recursive: true });
    }
}

/**
 * Read the library index
 */
async function readLibraryIndex(): Promise<LibraryIndex> {
    try {
        await ensureStorageDir();

        if (!existsSync(INDEX_FILE)) {
            return { tracks: [], lastUpdated: new Date().toISOString() };
        }

        const data = await readFile(INDEX_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading library index:', error);
        return { tracks: [], lastUpdated: new Date().toISOString() };
    }
}

/**
 * Write the library index
 */
async function writeLibraryIndex(index: LibraryIndex): Promise<void> {
    await ensureStorageDir();
    index.lastUpdated = new Date().toISOString();
    await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
}

/**
 * Generate a unique ID for tracks
 */
function generateTrackId(): string {
    return `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * GET - List all saved tracks
 */
export async function GET(request: NextRequest) {
    try {
        const index = await readLibraryIndex();

        // Get pagination parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const genre = searchParams.get('genre');

        let tracks = index.tracks;

        // Filter by genre if provided
        if (genre) {
            tracks = tracks.filter(t => t.genre.toLowerCase() === genre.toLowerCase());
        }

        // Sort by creation date (newest first)
        tracks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Paginate
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTracks = tracks.slice(startIndex, endIndex);

        return NextResponse.json({
            success: true,
            tracks: paginatedTracks,
            pagination: {
                page,
                limit,
                total: tracks.length,
                totalPages: Math.ceil(tracks.length / limit),
            },
        });
    } catch (error) {
        console.error('Error listing tracks:', error);
        return NextResponse.json(
            { error: 'Failed to list tracks' },
            { status: 500 }
        );
    }
}

/**
 * POST - Save a new track
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { audioBase64, metadata } = body;

        if (!audioBase64 || !metadata) {
            return NextResponse.json(
                { error: 'Missing audioBase64 or metadata' },
                { status: 400 }
            );
        }

        // Generate track ID and filename
        const trackId = generateTrackId();
        const filename = `${trackId}.wav`;
        const filepath = path.join(STORAGE_DIR, filename);

        // Decode base64 and save audio file
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        await ensureStorageDir();
        await writeFile(filepath, audioBuffer);

        // Create track metadata
        const trackMetadata: TrackMetadata = {
            id: trackId,
            filename,
            genre: metadata.genre || 'Unknown',
            mood: metadata.mood || 'Unknown',
            bpm: metadata.bpm || 120,
            key: metadata.key || 'C Major',
            duration: metadata.duration || 30,
            prompt: metadata.prompt || '',
            createdAt: new Date().toISOString(),
        };

        // Update library index
        const index = await readLibraryIndex();
        index.tracks.push(trackMetadata);
        await writeLibraryIndex(index);

        return NextResponse.json({
            success: true,
            track: trackMetadata,
            audioUrl: `/generated-music/${filename}`,
        });
    } catch (error) {
        console.error('Error saving track:', error);
        return NextResponse.json(
            { error: 'Failed to save track' },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Remove a track
 */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const trackId = searchParams.get('id');

        if (!trackId) {
            return NextResponse.json(
                { error: 'Missing track ID' },
                { status: 400 }
            );
        }

        // Read library index
        const index = await readLibraryIndex();

        // Find the track
        const trackIndex = index.tracks.findIndex(t => t.id === trackId);
        if (trackIndex === -1) {
            return NextResponse.json(
                { error: 'Track not found' },
                { status: 404 }
            );
        }

        const track = index.tracks[trackIndex];

        // Delete the audio file
        const filepath = path.join(STORAGE_DIR, track.filename);
        if (existsSync(filepath)) {
            await unlink(filepath);
        }

        // Remove from index
        index.tracks.splice(trackIndex, 1);
        await writeLibraryIndex(index);

        return NextResponse.json({
            success: true,
            message: 'Track deleted successfully',
            deletedTrackId: trackId,
        });
    } catch (error) {
        console.error('Error deleting track:', error);
        return NextResponse.json(
            { error: 'Failed to delete track' },
            { status: 500 }
        );
    }
}
