/**
 * Ejemplo de servicio de traducción para prompts
 * 
 * Lyria solo acepta prompts en inglés, por lo que necesitamos
 * traducir los prompts del español al inglés
 * 
 * OPCIONES:
 * 1. Google Cloud Translation API (recomendado)
 * 2. Librería de Node.js como @google-cloud/translate
 * 3. Servicio externo
 */

/**
 * Traduce texto de español a inglés usando Google Cloud Translation
 */
export async function translateToEnglish(text: string): Promise<string> {
  try {
    // OPCIÓN 1: Usar Google Cloud Translation API
    // Instalar: pnpm add @google-cloud/translate
    
    // const { Translate } = require('@google-cloud/translate').v2;
    // const translate = new Translate({
    //   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    // });
    // 
    // const [translation] = await translate.translate(text, {
    //   from: 'es',
    //   to: 'en',
    // });
    // 
    // return translation;

    // OPCIÓN 2: Mapeo directo de términos comunes (más rápido, menos preciso)
    return translateWithMapping(text);

    // OPCIÓN 3: Usar servicio externo como DeepL o similar
  } catch (error) {
    console.error('Error en traducción:', error);
    // Fallback: retornar texto original si falla la traducción
    return text;
  }
}

/**
 * Traducción básica usando mapeo de términos comunes
 * Útil como fallback o para términos específicos de música
 */
function translateWithMapping(text: string): string {
  // Mapeo de géneros
  const genreMap: Record<string, string> = {
    'hip-hop': 'hip-hop',
    'edm': 'edm',
    'house': 'house',
    'trap': 'trap',
    'r&b': 'r&b',
    'lo-fi': 'lo-fi',
    'techno': 'techno',
    'drill': 'drill',
    'reggaeton': 'reggaeton',
    'pop': 'pop',
    'ambient': 'ambient',
    'jazz': 'jazz',
  };

  // Mapeo de moods
  const moodMap: Record<string, string> = {
    'energético': 'energetic',
    'energetic': 'energetic',
    'relajado': 'chill',
    'chill': 'chill',
    'oscuro': 'dark',
    'dark': 'dark',
    'feliz': 'happy',
    'happy': 'happy',
    'melancólico': 'melancholic',
    'melancholic': 'melancholic',
    'agresivo': 'aggressive',
    'aggressive': 'aggressive',
  };

  // Mapeo de tonalidades
  const keyMap: Record<string, string> = {
    'do mayor': 'C Major',
    'do menor': 'C Minor',
    're mayor': 'D Major',
    're menor': 'D Minor',
    'mi mayor': 'E Major',
    'mi menor': 'E Minor',
    'fa mayor': 'F Major',
    'fa menor': 'F Minor',
    'sol mayor': 'G Major',
    'sol menor': 'G Minor',
    'la mayor': 'A Major',
    'la menor': 'A Minor',
  };

  let translated = text.toLowerCase();

  // Reemplazar géneros
  Object.entries(genreMap).forEach(([es, en]) => {
    translated = translated.replace(new RegExp(es, 'gi'), en);
  });

  // Reemplazar moods
  Object.entries(moodMap).forEach(([es, en]) => {
    translated = translated.replace(new RegExp(es, 'gi'), en);
  });

  // Reemplazar tonalidades
  Object.entries(keyMap).forEach(([es, en]) => {
    translated = translated.replace(new RegExp(es, 'gi'), en);
  });

  // Traducciones comunes
  const commonTranslations: Record<string, string> = {
    'crear': 'create',
    'generar': 'generate',
    'pista': 'track',
    'instrumental': 'instrumental',
    'música': 'music',
    'ritmo': 'tempo',
    'velocidad': 'speed',
    'calidad profesional': 'professional quality',
    'uso comercial': 'commercial use',
  };

  Object.entries(commonTranslations).forEach(([es, en]) => {
    translated = translated.replace(new RegExp(es, 'gi'), en);
  });

  // Capitalizar primera letra
  return translated.charAt(0).toUpperCase() + translated.slice(1);
}

/**
 * Traduce un prompt completo de música
 */
export async function translateMusicPrompt(params: {
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  additionalDescription?: string;
}): Promise<string> {
  // Construir prompt en español primero
  const spanishPrompt = `Crear una pista instrumental de ${params.genre} con un mood ${params.mood}. `;
  const spanishPrompt2 = `El tempo debe ser ${params.bpm} BPM. `;
  const spanishPrompt3 = `Usar la tonalidad de ${params.key}. `;
  const spanishPrompt4 = params.additionalDescription || '';
  const spanishPrompt5 = `La pista debe ser de calidad profesional, adecuada para uso comercial.`;

  const fullPrompt = spanishPrompt + spanishPrompt2 + spanishPrompt3 + spanishPrompt4 + spanishPrompt5;

  // Traducir a inglés
  return await translateToEnglish(fullPrompt);
}
