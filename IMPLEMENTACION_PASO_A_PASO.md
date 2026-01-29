# 🚀 Guía de Implementación Paso a Paso: Lyria en Sinter

Esta guía te llevará paso a paso para integrar Lyria en tu proyecto.

## 📋 PREREQUISITOS

1. Cuenta de Google Cloud Platform
2. Node.js 18+ instalado
3. pnpm instalado (o npm/yarn)
4. Acceso a terminal/command line

---

## PASO 1: Configuración de Google Cloud (30 minutos)

### 1.1 Crear Proyecto en GCP

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID** (lo necesitarás después)

### 1.2 Habilitar APIs Necesarias

1. Ve a **APIs & Services > Library**
2. Busca y habilita:
   - ✅ **Vertex AI API**
   - ✅ **Cloud Storage API**
   - ✅ **Cloud Translation API** (opcional, para traducción)

### 1.3 Crear Service Account

1. Ve a **IAM & Admin > Service Accounts**
2. Click en **Create Service Account**
3. Nombre: `sinter-lyria-service`
4. Rol: **Vertex AI User** y **Storage Admin**
5. Click **Done**

### 1.4 Generar Credenciales

1. Click en el service account creado
2. Ve a la pestaña **Keys**
3. Click **Add Key > Create new key**
4. Selecciona **JSON**
5. Descarga el archivo y guárdalo de forma segura
6. **NO** lo subas a Git (ya está en .gitignore)

### 1.5 Crear Bucket de Cloud Storage

1. Ve a **Cloud Storage > Buckets**
2. Click **Create Bucket**
3. Nombre: `sinter-music-storage` (o el que prefieras)
4. Región: `us-central1` (o la más cercana)
5. Click **Create**

---

## PASO 2: Configuración del Proyecto (15 minutos)

### 2.1 Instalar Dependencias

```bash
cd /Users/gerryvela/Documents/Sinter
pnpm add @google-cloud/aiplatform @google-cloud/storage @google-cloud/translate
```

### 2.2 Crear Archivo de Variables de Entorno

Crea `.env.local` en la raíz del proyecto:

```env
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=tu-proyecto-id-aqui
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account-key.json
VERTEX_AI_LOCATION=us-central1
GCS_BUCKET_NAME=sinter-music-storage

# Opcional: Para traducción
GOOGLE_TRANSLATE_API_KEY=tu-api-key-si-usas-translate-api
```

### 2.3 Organizar Credenciales

```bash
mkdir -p credentials
# Mueve el archivo JSON descargado aquí
# mv ~/Downloads/tu-proyecto-xxxxx.json ./credentials/service-account-key.json
```

### 2.4 Verificar .gitignore

Asegúrate de que `.gitignore` incluya:

```
.env.local
credentials/
*.json
```

---

## PASO 3: Implementar Código Backend (2-3 horas)

### 3.1 Crear Estructura de Carpetas

```bash
mkdir -p lib/vertex-ai
mkdir -p lib/storage
mkdir -p app/api/music/generate
```

### 3.2 Implementar Cliente de Lyria

1. Copia `lib/vertex-ai/lyria-client.example.ts`
2. Renómbralo a `lyria-client.ts`
3. Ajusta según la documentación actual de Lyria
4. **IMPORTANTE**: La API de Lyria puede cambiar, consulta la [documentación oficial](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/lyria-music-generation?hl=es-419)

### 3.3 Implementar Traductor

1. Copia `lib/vertex-ai/translator.example.ts`
2. Renómbralo a `translator.ts`
3. Elige una opción:
   - **Opción A**: Usar Google Cloud Translation API (más preciso)
   - **Opción B**: Usar mapeo directo (más rápido, menos preciso)

### 3.4 Implementar Cliente de Storage

1. Copia `lib/storage/gcs-client.example.ts`
2. Renómbralo a `gcs-client.ts`
3. Ajusta según tus necesidades

### 3.5 Crear API Route

1. Copia `app/api/music/generate/route.example.ts`
2. Renómbralo a `route.ts`
3. Ajusta según tu implementación

---

## PASO 4: Integrar Frontend (1-2 horas)

### 4.1 Actualizar Studio de Generación

Modifica `app/studio/page.tsx`:

```typescript
const handleGenerate = async () => {
  setIsGenerating(true);
  setProgress(0);

  try {
    const response = await fetch('/api/music/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        genre: selectedGenre,
        mood: selectedMood,
        bpm: bpm[0],
        key: selectedKey,
        duration: duration[0],
      }),
    });

    if (!response.ok) {
      throw new Error('Error al generar música');
    }

    const data = await response.json();
    
    // Actualizar estado con el audio generado
    setGeneratedTrack(true);
    setAudioUrl(data.audioUrl);
    setProgress(100);
  } catch (error) {
    console.error('Error:', error);
    // Mostrar error al usuario
  } finally {
    setIsGenerating(false);
  }
};
```

### 4.2 Agregar Reproductor Real

```typescript
const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

useEffect(() => {
  if (audioUrl) {
    const audio = new Audio(audioUrl);
    setAudioElement(audio);
    
    audio.addEventListener('ended', () => setIsPlaying(false));
    
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }
}, [audioUrl]);

const togglePlay = () => {
  if (audioElement) {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  }
};
```

---

## PASO 5: Testing (1 hora)

### 5.1 Probar Generación Básica

1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

2. Ve a `/studio`
3. Selecciona parámetros
4. Click en "Generate Track"
5. Verifica que se genere correctamente

### 5.2 Verificar Almacenamiento

1. Ve a Cloud Storage en GCP Console
2. Verifica que los archivos se estén guardando
3. Verifica que las URLs sean accesibles

### 5.3 Probar Diferentes Parámetros

- Diferentes géneros
- Diferentes moods
- Diferentes BPMs
- Diferentes duraciones

---

## PASO 6: Optimizaciones y Mejoras (Opcional)

### 6.1 Implementar Caché

```typescript
// Cachear generaciones similares
const cacheKey = `${genre}-${mood}-${bpm}-${key}`;
// Verificar si existe en caché antes de generar
```

### 6.2 Agregar Rate Limiting

```typescript
// Limitar número de generaciones por usuario
// Implementar cola de generaciones
```

### 6.3 Mejorar Manejo de Errores

```typescript
// Mostrar mensajes de error específicos
// Implementar retry automático
// Logging de errores
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "GOOGLE_CLOUD_PROJECT_ID no está configurado"
- Verifica que `.env.local` existe
- Verifica que las variables estén correctas
- Reinicia el servidor de desarrollo

### Error: "Permission denied"
- Verifica que el Service Account tenga los roles correctos
- Verifica que el archivo de credenciales sea correcto

### Error: "Model not found"
- Verifica que Vertex AI API esté habilitada
- Verifica el nombre del modelo en la documentación actual

### Error: "Bucket not found"
- Verifica que el bucket existe en Cloud Storage
- Verifica que el nombre en `.env.local` sea correcto

---

## 📚 RECURSOS ADICIONALES

- [Documentación de Lyria](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/lyria-music-generation?hl=es-419)
- [Guía de Prompts](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/music/music-gen-prompt-guide?hl=es-419)
- [Ejemplos de Google Cloud](https://github.com/GoogleCloudPlatform/generative-ai)
- [SDK de Vertex AI](https://cloud.google.com/nodejs/docs/reference/aiplatform/latest)

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto GCP configurado
- [ ] APIs habilitadas
- [ ] Service Account creado
- [ ] Credenciales descargadas
- [ ] Bucket de Storage creado
- [ ] Dependencias instaladas
- [ ] Variables de entorno configuradas
- [ ] Código backend implementado
- [ ] Frontend integrado
- [ ] Testing completado
- [ ] Deployment listo

---

**¡Buena suerte con la implementación!** 🎵
