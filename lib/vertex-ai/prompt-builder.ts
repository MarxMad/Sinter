/**
 * Prompt Builder for Lyria Music Generation
 * 
 * Builds optimized English prompts from Spanish UI parameters
 * Following Lyria best practices: detailed genre, mood, instrumentation, tempo
 */

// Genre mappings from Spanish UI to English descriptions
const genreDescriptions: Record<string, string> = {
    "Hip-Hop": "hip-hop beat with punchy drums, deep bass, and rhythmic patterns",
    "EDM": "electronic dance music with energetic synths, driving basslines, and build-ups",
    "House": "house music with four-on-the-floor beats, warm chords, and groovy basslines",
    "Trap": "trap beat with hard-hitting 808s, hi-hat rolls, and aggressive synths",
    "R&B": "R&B track with smooth melodies, soulful chords, and laid-back grooves",
    "Lo-Fi": "lo-fi hip-hop with dusty samples, mellow keys, and relaxed drums",
    "Techno": "techno track with hypnotic rhythms, industrial sounds, and repetitive patterns",
    "Drill": "drill beat with sliding 808s, dark melodies, and aggressive drum patterns",
    "Reggaeton": "reggaeton track with dembow rhythm, Latin percussion, and catchy melodies",
    "Pop": "pop track with catchy hooks, polished production, and upbeat energy",
    "Ambient": "ambient soundscape with ethereal pads, atmospheric textures, and spacious sound",
    "Jazz": "jazz composition with sophisticated harmonies, improvisational elements, and acoustic instruments",
};

// Mood mappings from Spanish to English
const moodDescriptions: Record<string, string> = {
    "Energético": "energetic and uplifting",
    "Energetic": "energetic and uplifting",
    "Relajado": "relaxed and chill",
    "Oscuro": "dark and moody",
    "Feliz": "happy and joyful",
    "Melancólico": "melancholic and emotional",
    "Agresivo": "aggressive and intense",
};

// Key descriptions for musical context
const keyDescriptions: Record<string, string> = {
    "C Major": "C major key with bright and uplifting tonality",
    "C Minor": "C minor key with emotional and introspective feel",
    "D Major": "D major key with triumphant and powerful sound",
    "D Minor": "D minor key with dramatic and intense mood",
    "E Major": "E major key with bright and energetic character",
    "E Minor": "E minor key with reflective and emotional quality",
    "F Major": "F major key with warm and pastoral feeling",
    "F Minor": "F minor key with dark and passionate mood",
    "G Major": "G major key with simple and natural sound",
    "G Minor": "G minor key with serious and dramatic character",
    "A Major": "A major key with bright and confident tone",
    "A Minor": "A minor key with wistful and contemplative feel",
};

export interface PromptBuilderParams {
    genre: string;
    mood: string;
    bpm: number;
    key: string;
    additionalDescription?: string;
}

/**
 * Builds an optimized English prompt for Lyria from user parameters
 */
export function buildMusicPrompt(params: PromptBuilderParams): string {
    const { genre, mood, bpm, key, additionalDescription } = params;

    // Get genre description or use raw genre if not mapped
    const genreDesc = genreDescriptions[genre] || `${genre.toLowerCase()} instrumental track`;

    // Get mood description or use raw mood
    const moodDesc = moodDescriptions[mood] || mood.toLowerCase();

    // Get key description or use raw key
    const keyDesc = keyDescriptions[key] || `in the key of ${key}`;

    // Build the prompt following Lyria best practices
    let prompt = `Create a professional ${genreDesc}. `;
    prompt += `The track should feel ${moodDesc}. `;
    prompt += `Set the tempo at ${bpm} BPM. `;
    prompt += `Compose it ${keyDesc}. `;
    prompt += `The production should be high-quality and suitable for commercial use.`;

    if (additionalDescription) {
        prompt += ` ${additionalDescription}`;
    }

    return prompt;
}

/**
 * Builds a negative prompt to exclude unwanted elements
 */
export function buildNegativePrompt(excludeElements?: string[]): string {
    const defaultExclusions = [
        "vocals",
        "singing",
        "speech",
        "voice",
        "low quality",
        "distorted",
        "out of tune",
        "clipping",
        "noise",
    ];

    const allExclusions = excludeElements
        ? [...defaultExclusions, ...excludeElements]
        : defaultExclusions;

    return allExclusions.join(", ");
}

/**
 * Get tempo description for a BPM value
 */
export function getTempoDescription(bpm: number): string {
    if (bpm < 70) return "very slow";
    if (bpm < 90) return "slow";
    if (bpm < 110) return "moderate";
    if (bpm < 130) return "upbeat";
    if (bpm < 150) return "fast";
    return "very fast";
}
