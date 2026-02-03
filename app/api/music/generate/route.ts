/**
 * API Route: Generate Music (Local Engine)
 * 
 * POST /api/music/generate
 * 
 * Uses local Tone.js + Tonal.js engine for procedural music generation.
 * No external APIs needed, 100% free, no copyright issues.
 */

import { NextRequest, NextResponse } from 'next/server';

// Validation constants
const VALID_GENRES = [
    "Hip-Hop", "EDM", "House", "Trap", "R&B", "Lo-Fi",
    "Techno", "Drill", "Reggaeton", "Pop", "Ambient", "Jazz"
];

const VALID_MOODS = [
    "Energético", "Relajado", "Oscuro", "Feliz", "Melancólico", "Agresivo"
];

const VALID_KEYS = [
    "C Major", "C Minor", "D Major", "D Minor", "E Major", "E Minor",
    "F Major", "F Minor", "G Major", "G Minor", "A Major", "A Minor"
];

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { genre, mood, bpm, key, seed, duration } = body;

        // Validate required parameters
        if (!genre || !mood || !bpm || !key) {
            return NextResponse.json(
                {
                    error: 'Missing required parameters',
                    required: ['genre', 'mood', 'bpm', 'key'],
                    received: { genre, mood, bpm, key },
                },
                { status: 400 }
            );
        }

        // Validate genre
        if (!VALID_GENRES.includes(genre)) {
            return NextResponse.json(
                {
                    error: 'Invalid genre',
                    validGenres: VALID_GENRES,
                    received: genre,
                },
                { status: 400 }
            );
        }

        // Validate mood
        if (!VALID_MOODS.includes(mood)) {
            return NextResponse.json(
                {
                    error: 'Invalid mood',
                    validMoods: VALID_MOODS,
                    received: mood,
                },
                { status: 400 }
            );
        }

        // Validate key
        if (!VALID_KEYS.includes(key)) {
            return NextResponse.json(
                {
                    error: 'Invalid key',
                    validKeys: VALID_KEYS,
                    received: key,
                },
                { status: 400 }
            );
        }

        // Validate BPM range
        const bpmNumber = Number(bpm);
        if (isNaN(bpmNumber) || bpmNumber < 60 || bpmNumber > 180) {
            return NextResponse.json(
                {
                    error: 'Invalid BPM',
                    message: 'BPM must be a number between 60 and 180',
                    received: bpm,
                },
                { status: 400 }
            );
        }

        // Since Tone.js requires browser context, we return generation params
        // The actual generation will happen client-side
        const generationParams = {
            genre,
            mood,
            bpm: bpmNumber,
            key,
            duration: duration || 30,
            seed: seed || Math.floor(Math.random() * 1000000),
        };

        return NextResponse.json({
            success: true,
            message: 'Parameters validated. Use client-side generation.',
            mode: 'local',
            params: generationParams,
            metadata: {
                genre,
                mood,
                bpm: bpmNumber,
                key,
                duration: generationParams.duration,
                seed: generationParams.seed,
            },
        });

    } catch (error) {
        console.error('Error in music generation API:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {
                error: 'Music generation validation failed',
                message: errorMessage,
            },
            { status: 500 }
        );
    }
}

// GET endpoint for API info
export async function GET() {
    return NextResponse.json({
        endpoint: '/api/music/generate',
        method: 'POST',
        mode: 'local',
        description: 'Local procedural music generation using Tone.js + Tonal.js',
        features: [
            '100% free - no API costs',
            'No copyright issues - procedural generation',
            'Instant - generates in browser',
            'Works offline',
        ],
        parameters: {
            required: {
                genre: VALID_GENRES,
                mood: VALID_MOODS,
                bpm: '60-180',
                key: VALID_KEYS,
            },
            optional: {
                seed: 'number (for reproducibility)',
                duration: 'number (seconds, default 30)',
            },
        },
    });
}
