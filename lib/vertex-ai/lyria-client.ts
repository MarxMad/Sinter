/**
 * Lyria Client for Google Cloud Vertex AI
 * 
 * Calls the Lyria API to generate instrumental music from text prompts.
 * Uses the lyria-002 model via HTTP POST to Vertex AI endpoints.
 */

import { buildMusicPrompt, buildNegativePrompt, type PromptBuilderParams } from './prompt-builder';

// Types for Lyria API
export interface LyriaGenerationParams extends PromptBuilderParams {
    seed?: number;
    sampleCount?: number;
}

export interface LyriaGenerationResult {
    success: boolean;
    audioBase64: string;
    mimeType: string;
    metadata: {
        prompt: string;
        negativePrompt: string;
        genre: string;
        mood: string;
        bpm: number;
        key: string;
        duration: number;
        generatedAt: string;
        seed?: number;
    };
}

interface LyriaPrediction {
    audioContent: string;
    mimeType: string;
}

interface LyriaApiResponse {
    predictions: LyriaPrediction[];
    deployedModelId: string;
    model: string;
    modelDisplayName: string;
}

/**
 * Get access token for Google Cloud API
 */
async function getAccessToken(): Promise<string> {
    // Check if we have the credentials file path
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (credentialsPath) {
        // Use google-auth-library for service account authentication
        try {
            const { GoogleAuth } = await import('google-auth-library');
            const auth = new GoogleAuth({
                keyFilename: credentialsPath,
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            });
            const client = await auth.getClient();
            const accessToken = await client.getAccessToken();

            if (!accessToken.token) {
                throw new Error('Failed to obtain access token');
            }

            return accessToken.token;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw new Error('Failed to authenticate with Google Cloud');
        }
    }

    // If no credentials file, try to use metadata server (for GCP environments)
    try {
        const response = await fetch(
            'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
            {
                headers: {
                    'Metadata-Flavor': 'Google',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Metadata server not available');
        }

        const data = await response.json();
        return data.access_token;
    } catch {
        throw new Error('No authentication method available. Set GOOGLE_APPLICATION_CREDENTIALS.');
    }
}

/**
 * Generate music using Lyria API
 */
export async function generateMusic(params: LyriaGenerationParams): Promise<LyriaGenerationResult> {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const location = process.env.VERTEX_AI_LOCATION || 'us-central1';

    if (!projectId) {
        throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable is not set');
    }

    // Build the prompt
    const prompt = buildMusicPrompt(params);
    const negativePrompt = buildNegativePrompt();

    // Build the API endpoint URL
    const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/lyria-002:predict`;

    // Build the request body
    // Note: seed and sample_count cannot be used together
    const requestBody: {
        instances: Array<{
            prompt: string;
            negative_prompt: string;
            seed?: number;
        }>;
        parameters: {
            sample_count?: number;
        };
    } = {
        instances: [
            {
                prompt,
                negative_prompt: negativePrompt,
            },
        ],
        parameters: {},
    };

    // Add seed if provided (for reproducibility)
    if (params.seed !== undefined) {
        requestBody.instances[0].seed = params.seed;
    } else if (params.sampleCount && params.sampleCount > 1) {
        // Only use sample_count if seed is not provided
        requestBody.parameters.sample_count = params.sampleCount;
    }

    try {
        // Get access token
        const accessToken = await getAccessToken();

        // Make the API request
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Lyria API error:', errorText);
            throw new Error(`Lyria API returned ${response.status}: ${errorText}`);
        }

        const data: LyriaApiResponse = await response.json();

        // Extract the first prediction
        if (!data.predictions || data.predictions.length === 0) {
            throw new Error('No predictions returned from Lyria API');
        }

        const prediction = data.predictions[0];

        return {
            success: true,
            audioBase64: prediction.audioContent,
            mimeType: prediction.mimeType || 'audio/wav',
            metadata: {
                prompt,
                negativePrompt,
                genre: params.genre,
                mood: params.mood,
                bpm: params.bpm,
                key: params.key,
                duration: 30, // Lyria always generates 30 seconds
                generatedAt: new Date().toISOString(),
                seed: params.seed,
            },
        };
    } catch (error) {
        console.error('Error generating music:', error);
        throw error;
    }
}

/**
 * Check if Lyria is properly configured
 */
export function isLyriaConfigured(): boolean {
    return !!(
        process.env.GOOGLE_CLOUD_PROJECT_ID &&
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    );
}

/**
 * Get configuration status for debugging
 */
export function getConfigStatus(): {
    projectId: boolean;
    credentials: boolean;
    location: string;
} {
    return {
        projectId: !!process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
        location: process.env.VERTEX_AI_LOCATION || 'us-central1',
    };
}
