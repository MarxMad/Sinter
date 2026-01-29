/**
 * Ejemplo de implementación del cliente de Lyria
 * 
 * Este archivo muestra cómo integrar Lyria de Google Cloud Vertex AI
 * 
 * IMPORTANTE: 
 * - Renombrar a lyria-client.ts después de configurar
 * - Instalar: pnpm add @google-cloud/aiplatform
 * - Configurar variables de entorno en .env.local
 */

import { VertexAI } from '@google-cloud/aiplatform';

// Tipos para los parámetros de Lyria
export interface LyriaGenerationParams {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  sampleCount?: number;
  temperature?: number;
  durationSeconds?: number; // Máximo 30 segundos
}

export interface LyriaGenerationResult {
  audioUrl: string;
  audioBase64?: string;
  metadata: {
    prompt: string;
    seed?: number;
    duration: number;
    generatedAt: string;
  };
}

/**
 * Cliente para generar música con Lyria
 */
export class LyriaClient {
  private vertexAI: VertexAI;
  private projectId: string;
  private location: string;

  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '';
    this.location = process.env.VERTEX_AI_LOCATION || 'us-central1';

    if (!this.projectId) {
      throw new Error('GOOGLE_CLOUD_PROJECT_ID no está configurado');
    }

    // Inicializar Vertex AI
    this.vertexAI = new VertexAI({
      project: this.projectId,
      location: this.location,
    });
  }

  /**
   * Genera música usando Lyria
   */
  async generateMusic(params: LyriaGenerationParams): Promise<LyriaGenerationResult> {
    try {
      // Validar duración (máximo 30 segundos)
      const duration = Math.min(params.durationSeconds || 30, 30);

      // Construir el request para Lyria
      const request = {
        prompt: params.prompt,
        negativePrompt: params.negativePrompt,
        seed: params.seed,
        sampleCount: params.sampleCount || 1,
        temperature: params.temperature || 0.8,
        durationSeconds: duration,
      };

      // Llamar a la API de Lyria
      // NOTA: La API exacta puede variar, consultar documentación actualizada
      const model = this.vertexAI.preview.getGenerativeModel({
        model: 'lyria-001', // Verificar nombre exacto del modelo
      });

      const response = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Generate instrumental music: ${request.prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: request.temperature,
          // Otros parámetros según documentación
        },
      });

      // Procesar respuesta
      // La respuesta incluirá el audio en formato base64 o URL
      const audioData = this.extractAudioFromResponse(response);

      return {
        audioUrl: audioData.url || '',
        audioBase64: audioData.base64,
        metadata: {
          prompt: params.prompt,
          seed: params.seed,
          duration: duration,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error generando música con Lyria:', error);
      throw new Error(`Error en generación de música: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Extrae el audio de la respuesta de la API
   */
  private extractAudioFromResponse(response: any): { url?: string; base64?: string } {
    // Implementar según el formato de respuesta real de Lyria
    // Esto es un ejemplo - ajustar según documentación actual
    
    if (response.audioData) {
      return {
        base64: response.audioData,
      };
    }

    if (response.audioUrl) {
      return {
        url: response.audioUrl,
      };
    }

    throw new Error('No se pudo extraer audio de la respuesta');
  }

  /**
   * Valida que el prompt esté en inglés
   */
  validatePromptLanguage(prompt: string): boolean {
    // Implementación básica - considerar usar una librería de detección de idioma
    // Por ahora, asumimos que el prompt ya está traducido
    return true;
  }
}

/**
 * Función helper para construir prompts descriptivos
 */
export function buildMusicPrompt(params: {
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  additionalDescription?: string;
}): string {
  const { genre, mood, bpm, key, additionalDescription } = params;

  let prompt = `Create an instrumental ${genre} track with a ${mood} mood. `;
  prompt += `The tempo should be ${bpm} BPM. `;
  prompt += `Use the key of ${key}. `;
  
  if (additionalDescription) {
    prompt += additionalDescription;
  }

  prompt += `The track should be professional quality, suitable for commercial use.`;

  return prompt;
}

/**
 * Función helper para construir negative prompts
 */
export function buildNegativePrompt(excludeElements: string[]): string {
  if (excludeElements.length === 0) {
    return 'low quality, distorted, out of tune, repetitive, boring';
  }

  return excludeElements.join(', ');
}
