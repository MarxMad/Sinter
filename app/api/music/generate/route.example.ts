/**
 * Ejemplo de API Route para generación de música con Lyria
 * 
 * IMPORTANTE:
 * - Renombrar a route.ts después de implementar
 * - Este es un ejemplo - ajustar según la API real de Lyria
 * - Implementar autenticación y rate limiting
 */

import { NextRequest, NextResponse } from 'next/server';
import { LyriaClient, buildMusicPrompt, buildNegativePrompt } from '@/lib/vertex-ai/lyria-client';
import { translateToEnglish } from '@/lib/vertex-ai/translator';
import { saveAudioToStorage } from '@/lib/storage/gcs-client';

// Validar que las variables de entorno estén configuradas
if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
  console.warn('GOOGLE_CLOUD_PROJECT_ID no está configurado');
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la request
    const body = await request.json();
    const { genre, mood, bpm, key, duration, negativePrompt, seed } = body;

    // Validar parámetros requeridos
    if (!genre || !mood || !bpm || !key) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: genre, mood, bpm, key' },
        { status: 400 }
      );
    }

    // Validar rango de BPM
    if (bpm < 60 || bpm > 180) {
      return NextResponse.json(
        { error: 'BPM debe estar entre 60 y 180' },
        { status: 400 }
      );
    }

    // Validar duración (máximo 30 segundos para Lyria)
    const validDuration = Math.min(duration || 30, 30);

    // Construir prompt en español
    const spanishPrompt = buildMusicPrompt({
      genre,
      mood,
      bpm,
      key,
      additionalDescription: body.additionalDescription,
    });

    // Traducir a inglés (Lyria solo acepta inglés)
    const englishPrompt = await translateToEnglish(spanishPrompt);

    // Construir negative prompt si se proporciona
    const negativePromptText = negativePrompt
      ? await translateToEnglish(buildNegativePrompt(negativePrompt))
      : undefined;

    // Inicializar cliente de Lyria
    const lyriaClient = new LyriaClient();

    // Generar música
    const generationResult = await lyriaClient.generateMusic({
      prompt: englishPrompt,
      negativePrompt: negativePromptText,
      seed: seed,
      sampleCount: 1,
      temperature: 0.8,
      durationSeconds: validDuration,
    });

    // Guardar audio en Cloud Storage
    let audioUrl: string;
    if (generationResult.audioBase64) {
      // Convertir base64 a buffer y subir a Cloud Storage
      const audioBuffer = Buffer.from(generationResult.audioBase64, 'base64');
      audioUrl = await saveAudioToStorage(audioBuffer, {
        genre,
        mood,
        bpm,
        key,
        duration: validDuration,
        prompt: englishPrompt,
        seed: generationResult.metadata.seed,
      });
    } else if (generationResult.audioUrl) {
      audioUrl = generationResult.audioUrl;
    } else {
      throw new Error('No se recibió audio de la generación');
    }

    // Retornar respuesta exitosa
    return NextResponse.json({
      success: true,
      audioUrl,
      metadata: {
        ...generationResult.metadata,
        genre,
        mood,
        bpm,
        key,
        duration: validDuration,
      },
      prompt: {
        original: spanishPrompt,
        translated: englishPrompt,
      },
    });
  } catch (error) {
    console.error('Error en generación de música:', error);

    // Retornar error apropiado
    return NextResponse.json(
      {
        error: 'Error al generar música',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}

// Método GET para obtener información sobre la generación
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST para generar música',
    requiredParams: ['genre', 'mood', 'bpm', 'key'],
    optionalParams: ['duration', 'negativePrompt', 'seed', 'additionalDescription'],
  });
}
