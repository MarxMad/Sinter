/**
 * Ejemplo de cliente para Google Cloud Storage
 * 
 * Este archivo maneja el almacenamiento de audios generados
 * 
 * IMPORTANTE:
 * - Instalar: pnpm add @google-cloud/storage
 * - Configurar bucket en .env.local: GCS_BUCKET_NAME
 */

import { Storage } from '@google-cloud/storage';

export interface AudioMetadata {
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  duration: number;
  prompt: string;
  seed?: number;
  userId?: string;
  createdAt?: string;
}

/**
 * Cliente para Google Cloud Storage
 */
export class GCSClient {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.GCS_BUCKET_NAME || 'sinter-music-storage';

    if (!this.bucketName) {
      throw new Error('GCS_BUCKET_NAME no está configurado');
    }

    this.storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  }

  /**
   * Guarda un audio en Cloud Storage
   */
  async saveAudio(
    audioBuffer: Buffer,
    metadata: AudioMetadata
  ): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      
      // Generar nombre único para el archivo
      const fileName = this.generateFileName(metadata);
      const file = bucket.file(fileName);

      // Subir el archivo
      await file.save(audioBuffer, {
        metadata: {
          contentType: 'audio/wav',
          metadata: {
            genre: metadata.genre,
            mood: metadata.mood,
            bpm: metadata.bpm.toString(),
            key: metadata.key,
            duration: metadata.duration.toString(),
            prompt: metadata.prompt,
            seed: metadata.seed?.toString() || '',
            userId: metadata.userId || '',
            createdAt: metadata.createdAt || new Date().toISOString(),
          },
        },
      });

      // Hacer el archivo público o generar URL firmada
      // Opción 1: Hacer público (más simple)
      await file.makePublic();

      // Opción 2: URL firmada (más seguro, expira después de cierto tiempo)
      // const [url] = await file.getSignedUrl({
      //   action: 'read',
      //   expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
      // });

      // Retornar URL pública
      return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
    } catch (error) {
      console.error('Error guardando audio en Cloud Storage:', error);
      throw new Error(`Error al guardar audio: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  /**
   * Genera un nombre de archivo único
   */
  private generateFileName(metadata: AudioMetadata): string {
    const timestamp = Date.now();
    const sanitizedGenre = metadata.genre.toLowerCase().replace(/\s+/g, '-');
    const sanitizedMood = metadata.mood.toLowerCase().replace(/\s+/g, '-');
    
    return `music/${sanitizedGenre}/${sanitizedMood}/${timestamp}-${metadata.bpm}bpm-${metadata.key.replace(/\s+/g, '-')}.wav`;
  }

  /**
   * Elimina un audio de Cloud Storage
   */
  async deleteAudio(fileName: string): Promise<void> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(fileName);
      await file.delete();
    } catch (error) {
      console.error('Error eliminando audio:', error);
      throw error;
    }
  }

  /**
   * Obtiene la URL de un audio
   */
  async getAudioUrl(fileName: string, signed: boolean = false): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    if (signed) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
      });
      return url;
    }

    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
  }
}

/**
 * Función helper para guardar audio
 */
export async function saveAudioToStorage(
  audioBuffer: Buffer,
  metadata: AudioMetadata
): Promise<string> {
  const client = new GCSClient();
  return await client.saveAudio(audioBuffer, metadata);
}
