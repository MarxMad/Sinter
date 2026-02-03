/**
 * Music Engine - Enhanced Procedural Music Generation
 * 
 * Uses Tone.js for audio synthesis and Tonal.js for music theory.
 * Generates unique, copyright-free instrumental music with high variety.
 * 
 * Features:
 * - Multiple drum pattern variations per genre
 * - Random fills every few bars
 * - Velocity variation for humanization
 * - Arpeggiator patterns
 * - Chord voicings
 */

import * as Tone from 'tone';
import { Scale, Chord } from 'tonal';

// Genre-specific configurations with multiple pattern variations
interface GenreConfig {
    name: string;
    synthType: 'basic' | 'fm' | 'am' | 'pluck';
    drumPatterns: DrumPatternSet[];  // Multiple patterns!
    fills: string[];                  // Drum fills
    chordProgressions: string[][];    // Multiple progressions
    melodyDensity: number;
    bassOctave: number;
    melodyOctave: number;
    reverbAmount: number;
    delayAmount: number;
    filterFreq: number;
    useArpeggio: boolean;
    arpeggioPattern: 'up' | 'down' | 'upDown' | 'random';
    swingAmount: number;              // 0-1 for groove
}

interface DrumPatternSet {
    kick: string;
    snare: string;
    hihat: string;
    openHat?: string;
}

// Enhanced genre configurations with MULTIPLE patterns
const genreConfigs: Record<string, GenreConfig> = {
    'Hip-Hop': {
        name: 'Hip-Hop',
        synthType: 'basic',
        drumPatterns: [
            // Classic boom-bap
            { kick: 'x...x...x...x...', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // Variation with syncopation
            { kick: 'x.....x.x.......', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // J Dilla style off-beat
            { kick: 'x....x....x.x...', snare: '....x.......x...', hihat: '.x.x.x.x.x.x.x.x' },
            // Harder knock
            { kick: 'x..x....x..x....', snare: '....x.......x...', hihat: 'x.xxx.x.x.xxx.x.' },
        ],
        fills: [
            '....x.x.x.x.xxxx',
            '........x.x.x.xx',
            'x.x.x.x.xxxxxxxx',
            '....xxxx....xxxx',
        ],
        chordProgressions: [
            ['Am', 'F', 'C', 'G'],
            ['Em', 'C', 'G', 'D'],
            ['Dm', 'Bb', 'C', 'Am'],
            ['Am', 'Em', 'F', 'G'],
        ],
        melodyDensity: 0.4,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.2,
        delayAmount: 0.1,
        filterFreq: 2000,
        useArpeggio: false,
        arpeggioPattern: 'up',
        swingAmount: 0.1,
    },
    'EDM': {
        name: 'EDM',
        synthType: 'fm',
        drumPatterns: [
            // Four-on-the-floor
            { kick: 'x...x...x...x...', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // With off-beat kick
            { kick: 'x...x..xx...x...', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Build-up style
            { kick: 'x.x.x.x.x.x.x.x.', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // Drop pattern
            { kick: 'x..x..x.x..x..x.', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx', openHat: '..x...x...x...x.' },
        ],
        fills: [
            'xxxxxxxxxxxxxxxx',
            'x.x.x.x.xxxxxxxx',
            '....xxxxxxxxxxxx',
            'x...x...xxxxxxxx',
        ],
        chordProgressions: [
            ['Cm', 'Ab', 'Eb', 'Bb'],
            ['Am', 'F', 'C', 'G'],
            ['Em', 'C', 'G', 'D'],
            ['Dm', 'Bb', 'F', 'C'],
        ],
        melodyDensity: 0.7,
        bassOctave: 2,
        melodyOctave: 5,
        reverbAmount: 0.4,
        delayAmount: 0.3,
        filterFreq: 4000,
        useArpeggio: true,
        arpeggioPattern: 'upDown',
        swingAmount: 0,
    },
    'House': {
        name: 'House',
        synthType: 'basic',
        drumPatterns: [
            // Classic house
            { kick: 'x...x...x...x...', snare: '....x.......x...', hihat: '..x...x...x...x.', openHat: '....x.......x...' },
            // Deep house
            { kick: 'x...x...x...x...', snare: '........x.......', hihat: '.x.x.x.x.x.x.x.x' },
            // Funky house
            { kick: 'x..x..x.x..x..x.', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // Garage style
            { kick: 'x.....x.x.....x.', snare: '....x.......x...', hihat: '.xxx.xxx.xxx.xxx' },
        ],
        fills: [
            '..x.x.x.x.x.x.x.',
            '....x.x.x.x.xxxx',
            'x...x...x.x.x.x.',
        ],
        chordProgressions: [
            ['Dm', 'Am', 'Gm', 'C'],
            ['Am', 'Dm', 'G', 'C'],
            ['Em', 'Am', 'D', 'G'],
        ],
        melodyDensity: 0.5,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.3,
        delayAmount: 0.2,
        filterFreq: 3000,
        useArpeggio: true,
        arpeggioPattern: 'up',
        swingAmount: 0.05,
    },
    'Trap': {
        name: 'Trap',
        synthType: 'basic',
        drumPatterns: [
            // Classic trap
            { kick: 'x.....x.x.......', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // 808 slide
            { kick: 'x.......x.x.....', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Hard trap
            { kick: 'x..x....x..x....', snare: '....x.......x...', hihat: 'xxxxx.xxxxxxxxxx' },
            // Drill influenced
            { kick: 'x....x..x....x..', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
        ],
        fills: [
            'xxxxxxxxxxxxxxxx',
            'x.xxx.xxx.xxxxxx',
            '........xxxxxxxx',
            'xx.xx.xx.xxxxxxx',
        ],
        chordProgressions: [
            ['Am', 'Em', 'F', 'G'],
            ['Dm', 'Am', 'E', 'Am'],
            ['Cm', 'Gm', 'Ab', 'Bb'],
            ['Em', 'Bm', 'C', 'D'],
        ],
        melodyDensity: 0.3,
        bassOctave: 1,
        melodyOctave: 4,
        reverbAmount: 0.5,
        delayAmount: 0.2,
        filterFreq: 1500,
        useArpeggio: false,
        arpeggioPattern: 'down',
        swingAmount: 0,
    },
    'Lo-Fi': {
        name: 'Lo-Fi',
        synthType: 'pluck',
        drumPatterns: [
            // Chill
            { kick: 'x.....x.........', snare: '....x......x....', hihat: '..x...x...x...x.' },
            // Jazz influenced
            { kick: 'x.......x.......', snare: '....x.......x...', hihat: '.x.x.x.x.x.x.x.x' },
            // Lazy groove
            { kick: 'x....x..........', snare: '.....x......x...', hihat: '..x...x..x....x.' },
            // Vinyl crackle style
            { kick: 'x.........x.....', snare: '....x.......x...', hihat: 'x...x...x...x...' },
        ],
        fills: [
            '........x.x.x...',
            '....x...x...x...',
            '..x...x...x...x.',
        ],
        chordProgressions: [
            ['Dm7', 'G7', 'Cmaj7', 'Am7'],
            ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7'],
            ['Am7', 'D7', 'Gmaj7', 'Cmaj7'],
            ['Em7', 'A7', 'Dmaj7', 'Gmaj7'],
        ],
        melodyDensity: 0.3,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.6,
        delayAmount: 0.4,
        filterFreq: 2500,
        useArpeggio: true,
        arpeggioPattern: 'random',
        swingAmount: 0.15,
    },
    'Techno': {
        name: 'Techno',
        synthType: 'fm',
        drumPatterns: [
            // Minimal
            { kick: 'x...x...x...x...', snare: '........x.......', hihat: 'x.x.x.x.x.x.x.x.', openHat: '..x...x...x...x.' },
            // Industrial
            { kick: 'x..x..x.x..x..x.', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Acid
            { kick: 'x...x...x...x...', snare: '................', hihat: '.x.x.x.x.x.x.x.x', openHat: 'x...x...x...x...' },
            // Hard techno
            { kick: 'x.x.x.x.x.x.x.x.', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
        ],
        fills: [
            'x.x.x.x.xxxxxxxx',
            '....xxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx',
        ],
        chordProgressions: [
            ['Am', 'Am', 'F', 'F'],
            ['Em', 'Em', 'C', 'C'],
            ['Dm', 'Dm', 'Am', 'Am'],
        ],
        melodyDensity: 0.6,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.5,
        delayAmount: 0.3,
        filterFreq: 5000,
        useArpeggio: true,
        arpeggioPattern: 'up',
        swingAmount: 0,
    },
    'Ambient': {
        name: 'Ambient',
        synthType: 'basic',
        drumPatterns: [
            { kick: '................', snare: '................', hihat: '........x.......' },
            { kick: 'x...............', snare: '................', hihat: '....x.......x...' },
            { kick: '................', snare: '................', hihat: '..x.....x.......' },
        ],
        fills: [
            '................',
            '..........x.....',
        ],
        chordProgressions: [
            ['Cmaj7', 'Am7', 'Fmaj7', 'Dm7'],
            ['Gmaj7', 'Em7', 'Cmaj7', 'Am7'],
            ['Fmaj7', 'Cmaj7', 'Dm7', 'Am7'],
        ],
        melodyDensity: 0.2,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.9,
        delayAmount: 0.6,
        filterFreq: 1000,
        useArpeggio: true,
        arpeggioPattern: 'random',
        swingAmount: 0,
    },
    'Jazz': {
        name: 'Jazz',
        synthType: 'pluck',
        drumPatterns: [
            // Swing
            { kick: 'x.....x.........', snare: '..x.....x.......', hihat: '.x.x.x.x.x.x.x.x' },
            // Bossa nova
            { kick: 'x..x..x.x..x..x.', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // Brush style
            { kick: 'x.......x.......', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
        ],
        fills: [
            '..x.x.x.x.x.x.x.',
            'x.x.x.x.x.x.x.x.',
            '....x.x.x.x.x.x.',
        ],
        chordProgressions: [
            ['Dm7', 'G7', 'Cmaj7', 'Fmaj7'],
            ['Am7', 'D7', 'Gmaj7', 'Cmaj7'],
            ['Em7', 'A7', 'Dm7', 'G7'],
            ['Fmaj7', 'Bb7', 'Am7', 'Dm7'],
        ],
        melodyDensity: 0.5,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.4,
        delayAmount: 0.2,
        filterFreq: 4000,
        useArpeggio: true,
        arpeggioPattern: 'random',
        swingAmount: 0.2,
    },
    'R&B': {
        name: 'R&B',
        synthType: 'basic',
        drumPatterns: [
            // Smooth
            { kick: 'x.....x.x.......', snare: '....x.......x...', hihat: '..x...x...x...x.' },
            // Neo-soul
            { kick: 'x.......x.x.....', snare: '....x.......x...', hihat: '.x.x.x.x.x.x.x.x' },
            // Modern R&B
            { kick: 'x..x....x..x....', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
        ],
        fills: [
            '....x.x.x.x.x...',
            '..x...x.x.x.x.x.',
        ],
        chordProgressions: [
            ['Am7', 'Dm7', 'Gmaj7', 'Cmaj7'],
            ['Fmaj7', 'Em7', 'Am7', 'Dm7'],
            ['Dm7', 'G7', 'Em7', 'Am7'],
        ],
        melodyDensity: 0.4,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.5,
        delayAmount: 0.3,
        filterFreq: 3000,
        useArpeggio: false,
        arpeggioPattern: 'up',
        swingAmount: 0.1,
    },
    'Drill': {
        name: 'Drill',
        synthType: 'basic',
        drumPatterns: [
            // UK Drill
            { kick: 'x..x..x..x..x...', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Chicago Drill
            { kick: 'x....x..x....x..', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Brooklyn Drill
            { kick: 'x..x....x..x....', snare: '....x.......x...', hihat: 'xxxxx.xxxxxxxxxx' },
            // Sliding bass style
            { kick: 'x.....x.x.....x.', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
        ],
        fills: [
            'x.xxx.xxx.xxxxxx',
            'xxxxxxxxxxxxxxxx',
            '....xxxxxxxxxxxx',
        ],
        chordProgressions: [
            ['Am', 'Dm', 'E', 'Am'],
            ['Em', 'Am', 'B', 'Em'],
            ['Cm', 'Gm', 'D', 'Gm'],
        ],
        melodyDensity: 0.25,
        bassOctave: 1,
        melodyOctave: 4,
        reverbAmount: 0.4,
        delayAmount: 0.2,
        filterFreq: 1200,
        useArpeggio: false,
        arpeggioPattern: 'down',
        swingAmount: 0,
    },
    'Reggaeton': {
        name: 'Reggaeton',
        synthType: 'basic',
        drumPatterns: [
            // Dembow clásico
            { kick: 'x..x..x.x..x..x.', snare: '...x.x.....x.x..', hihat: 'x.x.x.x.x.x.x.x.' },
            // Dembow moderno
            { kick: 'x..x..x.x..x..x.', snare: '..x..x....x..x..', hihat: 'xxxxxxxxxxxxxxxx' },
            // Moombahton influenced
            { kick: 'x...x..xx...x...', snare: '...x.x.....x.x..', hihat: 'x.x.x.x.x.x.x.x.' },
        ],
        fills: [
            '...x.x.x.x.x.x.x',
            'x.x.x.x.x.x.x.x.',
            '....x.x.x.x.xxxx',
        ],
        chordProgressions: [
            ['Am', 'F', 'Dm', 'E'],
            ['Em', 'C', 'Am', 'B'],
            ['Dm', 'Bb', 'Gm', 'A'],
        ],
        melodyDensity: 0.5,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.3,
        delayAmount: 0.15,
        filterFreq: 3500,
        useArpeggio: false,
        arpeggioPattern: 'up',
        swingAmount: 0,
    },
    'Pop': {
        name: 'Pop',
        synthType: 'am',
        drumPatterns: [
            // Classic pop
            { kick: 'x...x...x...x...', snare: '....x.......x...', hihat: 'x.x.x.x.x.x.x.x.' },
            // Dance pop
            { kick: 'x...x...x...x...', snare: '....x.......x...', hihat: 'xxxxxxxxxxxxxxxx' },
            // Synth pop
            { kick: 'x..x..x.x..x..x.', snare: '....x.......x...', hihat: '.x.x.x.x.x.x.x.x' },
        ],
        fills: [
            '....x.x.x.x.xxxx',
            'x...x...x.x.x.x.',
        ],
        chordProgressions: [
            ['C', 'G', 'Am', 'F'],
            ['G', 'D', 'Em', 'C'],
            ['Am', 'F', 'C', 'G'],
            ['D', 'A', 'Bm', 'G'],
        ],
        melodyDensity: 0.5,
        bassOctave: 2,
        melodyOctave: 4,
        reverbAmount: 0.3,
        delayAmount: 0.2,
        filterFreq: 4000,
        useArpeggio: false,
        arpeggioPattern: 'up',
        swingAmount: 0,
    },
};

// Mood modifiers
const moodModifiers: Record<string, { tempoMod: number; filterMod: number; densityMod: number; velocityRange: [number, number] }> = {
    'Energético': { tempoMod: 1.1, filterMod: 1.2, densityMod: 1.3, velocityRange: [0.8, 1.0] },
    'Relajado': { tempoMod: 0.85, filterMod: 0.7, densityMod: 0.6, velocityRange: [0.4, 0.7] },
    'Oscuro': { tempoMod: 0.95, filterMod: 0.5, densityMod: 0.8, velocityRange: [0.6, 0.9] },
    'Feliz': { tempoMod: 1.05, filterMod: 1.3, densityMod: 1.1, velocityRange: [0.7, 0.95] },
    'Melancólico': { tempoMod: 0.9, filterMod: 0.6, densityMod: 0.5, velocityRange: [0.3, 0.6] },
    'Agresivo': { tempoMod: 1.15, filterMod: 1.0, densityMod: 1.4, velocityRange: [0.85, 1.0] },
};

export interface GenerationParams {
    genre: string;
    mood: string;
    bpm: number;
    key: string;
    duration: number;
    seed?: number;
}

export interface GenerationResult {
    success: boolean;
    audioBlob: Blob;
    metadata: {
        genre: string;
        mood: string;
        bpm: number;
        key: string;
        duration: number;
        generatedAt: string;
        seed: number;
        patternVariation: number;
        chordProgression: string[];
    };
}

/**
 * Seeded random number generator for reproducibility
 */
function createSeededRandom(seed: number) {
    let state = seed;
    return () => {
        state = (state * 1103515245 + 12345) & 0x7fffffff;
        return state / 0x7fffffff;
    };
}

/**
 * Apply swing to timing
 */
function applySwing(time: number, step: number, swingAmount: number, sixteenthNote: number): number {
    // Swing affects every other 16th note (the "and" of each beat)
    if (step % 2 === 1) {
        return time + (swingAmount * sixteenthNote * 0.33);
    }
    return time;
}

/**
 * Generate arpeggio pattern
 */
function getArpeggioNotes(notes: string[], pattern: string, random: () => number): string[] {
    const result: string[] = [];

    switch (pattern) {
        case 'up':
            return notes;
        case 'down':
            return [...notes].reverse();
        case 'upDown':
            return [...notes, ...notes.slice(1, -1).reverse()];
        case 'random':
            const shuffled = [...notes];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        default:
            return notes;
    }
}

/**
 * Generate music using Tone.js with enhanced variety
 */
export async function generateMusicLocal(params: GenerationParams): Promise<GenerationResult> {
    const { genre, mood, bpm, key, duration } = params;
    const seed = params.seed ?? Math.floor(Math.random() * 1000000);
    const random = createSeededRandom(seed);

    // Get configurations
    const config = genreConfigs[genre] || genreConfigs['Hip-Hop'];
    const moodMod = moodModifiers[mood] || moodModifiers['Energético'];

    // Randomly select pattern variations based on seed
    const patternIndex = Math.floor(random() * config.drumPatterns.length);
    const selectedPattern = config.drumPatterns[patternIndex];

    const progressionIndex = Math.floor(random() * config.chordProgressions.length);
    const selectedProgression = config.chordProgressions[progressionIndex];

    // Apply mood modifications
    const adjustedBpm = Math.round(bpm * moodMod.tempoMod);
    const adjustedFilter = config.filterFreq * moodMod.filterMod;
    const adjustedDensity = config.melodyDensity * moodMod.densityMod;

    // Parse key info
    const scaleType = key.includes('Minor') ? 'minor' : 'major';
    const rootNote = key.split(' ')[0];
    const scaleNotes = Scale.get(`${rootNote} ${scaleType}`).notes;

    // Ensure Tone is started
    await Tone.start();

    // Create offline context
    const offlineContext = new Tone.OfflineContext(2, duration, 44100);
    Tone.setContext(offlineContext);
    Tone.getTransport().bpm.value = adjustedBpm;

    // Create effects
    const reverb = new Tone.Reverb({
        decay: config.reverbAmount * 4 + 1,
        wet: config.reverbAmount,
    }).toDestination();

    const delay = new Tone.FeedbackDelay({
        delayTime: '8n',
        feedback: config.delayAmount * 0.4,
        wet: config.delayAmount,
    }).connect(reverb);

    const filter = new Tone.Filter({
        frequency: adjustedFilter,
        type: 'lowpass',
        rolloff: -12,
    }).connect(delay);

    // Create drums with velocity variation
    const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 8,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 },
    }).connect(filter);

    const snare = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
    }).connect(filter);

    const hihat = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
    }).connect(filter);

    const openHat = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0.05, release: 0.1 },
    }).connect(filter);

    // Create melody synth
    let melodySynth: Tone.Synth | Tone.FMSynth | Tone.AMSynth | Tone.PluckSynth;
    switch (config.synthType) {
        case 'fm':
            melodySynth = new Tone.FMSynth();
            break;
        case 'am':
            melodySynth = new Tone.AMSynth();
            break;
        case 'pluck':
            melodySynth = new Tone.PluckSynth();
            break;
        default:
            melodySynth = new Tone.Synth();
    }
    melodySynth.connect(filter);

    // Create bass synth
    const bassSynth = new Tone.MonoSynth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.8 },
        filterEnvelope: { attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.8, baseFrequency: 200, octaves: 2 },
    }).connect(filter);

    // Calculate timing
    const sixteenthNote = 60 / adjustedBpm / 4;
    const barLength = sixteenthNote * 16;
    const numBars = Math.ceil(duration / barLength);
    const fillEveryNBars = 4; // Add fill every 4 bars

    // Schedule drums with variations
    for (let bar = 0; bar < numBars; bar++) {
        // Decide if this bar should have a fill
        const useFill = (bar + 1) % fillEveryNBars === 0 && config.fills.length > 0;
        const fillPattern = useFill ? config.fills[Math.floor(random() * config.fills.length)] : null;

        for (let step = 0; step < 16; step++) {
            let time = bar * barLength + step * sixteenthNote;
            time = applySwing(time, step, config.swingAmount, sixteenthNote);

            if (time >= duration) break;

            // Get velocity with humanization
            const [minVel, maxVel] = moodMod.velocityRange;
            const velocity = minVel + random() * (maxVel - minVel);
            const velocityVariation = 0.85 + random() * 0.15; // 85-100% of base velocity

            // Use fill pattern for snare on fill bars, otherwise normal pattern
            const currentSnarePattern = useFill && fillPattern ? fillPattern : selectedPattern.snare;

            // Kick
            if (selectedPattern.kick[step] === 'x') {
                kick.volume.value = -5 + (velocity - 0.9) * 10;
                kick.triggerAttackRelease('C1', '8n', time);
            }

            // Snare (with fills)
            if (currentSnarePattern[step] === 'x') {
                snare.volume.value = -10 + (velocity - 0.9) * 8;
                snare.triggerAttackRelease('8n', time);
            }

            // Hi-hat with velocity variation
            if (selectedPattern.hihat[step] === 'x') {
                const hihatVelocity = velocity * velocityVariation;
                hihat.volume.value = -20 + (hihatVelocity - 0.5) * 6;
                hihat.triggerAttackRelease('32n', time);
            }

            // Open hi-hat
            if (selectedPattern.openHat && selectedPattern.openHat[step] === 'x') {
                openHat.volume.value = -15 + (velocity - 0.9) * 6;
                openHat.triggerAttackRelease('16n', time);
            }
        }
    }

    // Schedule chords and melody
    const chordDuration = duration / selectedProgression.length;

    selectedProgression.forEach((chordName, chordIndex) => {
        const chordTime = chordIndex * chordDuration;
        const chordNotes = Chord.get(chordName).notes;

        if (chordNotes.length === 0) return;

        // Bass note with slight timing variation
        const bassNote = chordNotes[0] + config.bassOctave;
        const bassTimeOffset = (random() - 0.5) * 0.02; // Slight humanization
        try {
            bassSynth.volume.value = -6;
            bassSynth.triggerAttackRelease(bassNote, chordDuration * 0.8, chordTime + bassTimeOffset);
        } catch {
            // Skip invalid notes
        }

        // Melody notes with arpeggio support
        let melodyNotes = chordNotes.map(n => n + config.melodyOctave);

        if (config.useArpeggio) {
            melodyNotes = getArpeggioNotes(melodyNotes, config.arpeggioPattern, random);
        }

        const numMelodyNotes = Math.floor(adjustedDensity * 8);

        for (let i = 0; i < numMelodyNotes; i++) {
            const noteTime = chordTime + (chordDuration / numMelodyNotes) * i;
            if (noteTime >= duration) break;

            // Use scale notes for more melodic variety
            const useScaleNote = random() < 0.3; // 30% chance to use scale note instead of chord note
            let note: string;

            if (useScaleNote && scaleNotes.length > 0) {
                const scaleIndex = Math.floor(random() * scaleNotes.length);
                note = scaleNotes[scaleIndex] + config.melodyOctave;
            } else {
                const noteIndex = Math.floor(random() * melodyNotes.length);
                note = melodyNotes[noteIndex];
            }

            if (random() < adjustedDensity) {
                const [minVel, maxVel] = moodMod.velocityRange;
                const velocity = minVel + random() * (maxVel - minVel);
                melodySynth.volume.value = -8 + (velocity - 0.7) * 8;

                const noteDuration = ['8n', '16n', '4n', '8n.'][Math.floor(random() * 4)];
                const noteOffset = (random() - 0.5) * 0.015; // Slight humanization

                try {
                    melodySynth.triggerAttackRelease(note, noteDuration, noteTime + noteOffset);
                } catch {
                    // Skip invalid notes
                }
            }
        }
    });

    // Render audio
    const buffer = await offlineContext.render();

    // Convert to WAV
    const audioBlob = bufferToWav(buffer);

    // Restore context
    Tone.setContext(Tone.getContext());

    // Cleanup
    kick.dispose();
    snare.dispose();
    hihat.dispose();
    openHat.dispose();
    melodySynth.dispose();
    bassSynth.dispose();
    reverb.dispose();
    delay.dispose();
    filter.dispose();

    return {
        success: true,
        audioBlob,
        metadata: {
            genre,
            mood,
            bpm: adjustedBpm,
            key,
            duration,
            generatedAt: new Date().toISOString(),
            seed,
            patternVariation: patternIndex + 1,
            chordProgression: selectedProgression,
        },
    };
}

/**
 * Convert Tone buffer to WAV blob
 */
function bufferToWav(buffer: Tone.ToneAudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length;

    const channels: Float32Array[] = [];
    for (let i = 0; i < numChannels; i++) {
        channels.push(buffer.getChannelData(i));
    }

    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = length * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, totalSize - 8, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
        for (let ch = 0; ch < numChannels; ch++) {
            const sample = Math.max(-1, Math.min(1, channels[ch][i]));
            const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
            view.setInt16(offset, int16, true);
            offset += 2;
        }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}

export function getAvailableGenres(): string[] {
    return Object.keys(genreConfigs);
}

export function getAvailableMoods(): string[] {
    return Object.keys(moodModifiers);
}

export function getGenrePatternCount(genre: string): number {
    const config = genreConfigs[genre];
    return config ? config.drumPatterns.length : 0;
}
