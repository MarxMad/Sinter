# 🎵 Diagnóstico y Plan de Implementación: Integración de Lyria en Sinter

## 📊 DIAGNÓSTICO DEL PROYECTO ACTUAL

### Estado Actual del Proyecto

#### **Arquitectura**
- **Framework**: Next.js 16.0.10 con React 19.2.0
- **Tipo**: Aplicación frontend completa (sin backend)
- **UI**: Componentes Radix UI con Tailwind CSS
- **Estado**: Solo simulación de generación de música (sin APIs reales)

#### **Funcionalidades Implementadas**

1. **Página de Landing** (`app/page.tsx`)
   - Hero section
   - Features, Genres, How It Works
   - Testimonials y Pricing
   - ✅ UI completa y funcional

2. **Estudio de Generación** (`app/studio/page.tsx`)
   - ✅ Selección de género (12 géneros disponibles)
   - ✅ Selección de mood (6 estados de ánimo)
   - ✅ Control de BPM (60-180)
   - ✅ Control de duración (15-120 segundos)
   - ✅ Selección de tonalidad musical (12 opciones)
   - ❌ **Generación simulada** - No hay integración real con APIs
   - ❌ **Sin almacenamiento** - No persiste las generaciones

3. **Editor de Audio** (`app/studio/editor/[id]/page.tsx`)
   - ✅ Interfaz de edición multi-pista
   - ✅ Controles de reproducción
   - ✅ Mixer con volumen por pista
   - ✅ Timeline con zoom
   - ❌ **Sin procesamiento real** - Solo visualización

4. **Biblioteca** (`app/studio/library/page.tsx`)
   - ✅ Visualización de tracks (grid/list)
   - ✅ Búsqueda y filtros
   - ❌ **Datos mock** - No hay base de datos real

5. **Marketplace** (`app/studio/marketplace/page.tsx`)
   - ✅ Catálogo de beats
   - ✅ Sistema de carrito y favoritos
   - ❌ **Datos mock** - No hay integración de pagos

#### **Dependencias Actuales**
```json
- Next.js 16.0.10
- React 19.2.0
- Radix UI (componentes)
- Tailwind CSS
- Lucide React (iconos)
- Zod (validación)
- React Hook Form
```

**Faltantes para Lyria:**
- ❌ SDK de Google Cloud Vertex AI
- ❌ Cliente HTTP para APIs
- ❌ Sistema de autenticación con GCP
- ❌ Variables de entorno configuradas
- ❌ API Routes de Next.js para backend

---

## 🎯 CAPACIDADES DE LYRIA (Google Cloud Vertex AI)

### Características Principales

1. **Generación de Música Instrumental**
   - Genera música a partir de prompts de texto descriptivos
   - Formato: WAV a 48 kHz
   - Duración máxima: 30 segundos por clip
   - Latencia: 10-20 segundos por generación

2. **Parámetros Disponibles**
   - `prompt`: Descripción textual de la música deseada
   - `negative_prompt`: Especificar qué evitar en la generación
   - `seed`: Para reproducibilidad (mismo seed = mismo resultado)
   - `sample_count`: Número de variaciones a generar (1-4 típicamente)
   - `temperature`: Control de creatividad (0.0-1.0)

3. **Limitaciones Actuales**
   - ⚠️ Solo música instrumental (no voces)
   - ⚠️ Prompts solo en inglés (en-us)
   - ⚠️ Máximo 30 segundos por clip
   - ⚠️ Requiere cuenta de Google Cloud con Vertex AI habilitado

4. **Ventajas para Artistas**
   - ✅ Infraestructura escalable de Google
   - ✅ API estable y confiable
   - ✅ Control fino mediante prompts negativos
   - ✅ Reproducibilidad con seeds

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### **FASE 1: Configuración Inicial y Backend** (Semana 1)

#### 1.1 Configuración de Google Cloud
- [ ] Crear proyecto en Google Cloud Platform
- [ ] Habilitar Vertex AI API
- [ ] Habilitar Cloud Storage (para almacenar audios generados)
- [ ] Crear Service Account con permisos necesarios
- [ ] Generar credenciales JSON para autenticación

#### 1.2 Configuración del Proyecto
- [ ] Instalar dependencias necesarias:
  ```bash
  pnpm add @google-cloud/aiplatform
  pnpm add @google-cloud/storage
  pnpm add zod
  ```
- [ ] Crear archivo `.env.local` con variables:
  ```env
  GOOGLE_CLOUD_PROJECT_ID=tu-proyecto-id
  GOOGLE_APPLICATION_CREDENTIALS=./path/to/credentials.json
  VERTEX_AI_LOCATION=us-central1
  GCS_BUCKET_NAME=sinter-music-storage
  ```
- [ ] Agregar `.env.local` a `.gitignore`

#### 1.3 Estructura de API Routes
- [ ] Crear `app/api/music/generate/route.ts` - Endpoint para generación
- [ ] Crear `app/api/music/status/[id]/route.ts` - Estado de generación
- [ ] Crear `app/api/music/download/[id]/route.ts` - Descarga de audio
- [ ] Crear `app/api/library/route.ts` - CRUD de biblioteca
- [ ] Crear `lib/vertex-ai/lyria-client.ts` - Cliente para Lyria

---

### **FASE 2: Integración con Lyria** (Semana 2)

#### 2.1 Cliente de Lyria
- [ ] Implementar `lib/vertex-ai/lyria-client.ts`:
  ```typescript
  - Función generateMusic(prompt, params)
  - Función translatePromptToEnglish(texto en español)
  - Manejo de errores y retry logic
  - Conversión de respuesta a formato usable
  ```

#### 2.2 API Route de Generación
- [ ] Implementar `app/api/music/generate/route.ts`:
  - Recibir parámetros del frontend (género, mood, BPM, key, duración)
  - Construir prompt descriptivo en inglés
  - Llamar a Lyria API
  - Guardar audio en Cloud Storage
  - Retornar metadata y URL del audio

#### 2.3 Traducción de Prompts
- [ ] Integrar servicio de traducción (Google Translate API o similar)
- [ ] Mapear géneros y moods a descripciones en inglés
- [ ] Crear templates de prompts optimizados para Lyria

#### 2.4 Sistema de Almacenamiento
- [ ] Configurar Cloud Storage bucket
- [ ] Implementar upload de audios generados
- [ ] Generar URLs firmadas para acceso temporal
- [ ] Implementar sistema de metadatos (género, BPM, fecha, etc.)

---

### **FASE 3: Integración Frontend** (Semana 3)

#### 3.1 Actualizar Studio de Generación
- [ ] Modificar `app/studio/page.tsx`:
  - Reemplazar simulación con llamada real a API
  - Implementar polling para estado de generación
  - Mostrar progreso real
  - Manejar errores y timeouts

#### 3.2 Reproductor de Audio
- [ ] Integrar reproductor real con HTML5 Audio API
- [ ] Implementar visualización de waveform real
- [ ] Agregar controles de reproducción funcionales

#### 3.3 Sistema de Biblioteca
- [ ] Conectar con API de biblioteca
- [ ] Implementar guardado de tracks generados
- [ ] Agregar funcionalidad de descarga
- [ ] Implementar eliminación de tracks

#### 3.4 Mejoras de UX
- [ ] Agregar notificaciones de éxito/error
- [ ] Implementar cola de generaciones
- [ ] Agregar preview antes de guardar
- [ ] Mostrar historial de prompts exitosos

---

### **FASE 4: Funcionalidades Avanzadas** (Semana 4)

#### 4.1 Optimizaciones
- [ ] Implementar caché de generaciones similares
- [ ] Agregar sistema de seeds para variaciones
- [ ] Implementar prompts negativos desde UI
- [ ] Agregar control de temperatura

#### 4.2 Editor Mejorado
- [ ] Integrar tracks generados en editor
- [ ] Permitir exportar múltiples clips combinados
- [ ] Agregar efectos básicos (reverb, delay, etc.)

#### 4.3 Marketplace
- [ ] Conectar con base de datos real
- [ ] Implementar sistema de compra/venta
- [ ] Agregar preview de tracks del marketplace

#### 4.4 Analytics y Monitoreo
- [ ] Implementar logging de uso
- [ ] Dashboard de métricas (generaciones, usuarios, etc.)
- [ ] Monitoreo de costos de API

---

## 📁 ESTRUCTURA DE ARCHIVOS PROPUESTA

```
Sinter/
├── app/
│   ├── api/
│   │   ├── music/
│   │   │   ├── generate/
│   │   │   │   └── route.ts          # POST - Generar música
│   │   │   ├── status/
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET - Estado de generación
│   │   │   └── download/
│   │   │       └── [id]/
│   │   │           └── route.ts      # GET - Descargar audio
│   │   └── library/
│   │       └── route.ts              # GET/POST - Biblioteca
│   └── studio/
│       └── page.tsx                   # Actualizar con API real
├── lib/
│   ├── vertex-ai/
│   │   ├── lyria-client.ts           # Cliente de Lyria
│   │   ├── prompt-builder.ts          # Construcción de prompts
│   │   └── translator.ts              # Traducción español → inglés
│   ├── storage/
│   │   └── gcs-client.ts              # Cliente de Cloud Storage
│   └── utils/
│       └── audio-utils.ts             # Utilidades de audio
└── .env.local                          # Variables de entorno
```

---

## 🔧 IMPLEMENTACIÓN TÉCNICA DETALLADA

### Ejemplo de Cliente Lyria

```typescript
// lib/vertex-ai/lyria-client.ts
import { VertexAI } from '@google-cloud/aiplatform';

export interface LyriaParams {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  sampleCount?: number;
  temperature?: number;
}

export async function generateMusicWithLyria(params: LyriaParams) {
  // Implementación de llamada a Vertex AI
  // Retornar audio en formato base64 o URL de Cloud Storage
}
```

### Ejemplo de API Route

```typescript
// app/api/music/generate/route.ts
export async function POST(request: Request) {
  const { genre, mood, bpm, key, duration } = await request.json();
  
  // Construir prompt
  const prompt = buildPrompt({ genre, mood, bpm, key });
  
  // Generar música
  const audioData = await generateMusicWithLyria({ prompt });
  
  // Guardar en Cloud Storage
  const audioUrl = await saveToStorage(audioData);
  
  return Response.json({ audioUrl, metadata: {...} });
}
```

---

## ⚠️ CONSIDERACIONES IMPORTANTES

### Costos
- Vertex AI tiene costos por uso
- Cloud Storage tiene costos de almacenamiento
- Implementar límites de uso por usuario
- Considerar sistema de suscripciones

### Limitaciones de Lyria
- Solo 30 segundos por clip → Implementar concatenación para tracks más largos
- Solo inglés → Traducción automática necesaria
- Solo instrumental → Comunicar claramente a usuarios

### Seguridad
- Nunca exponer credenciales en el frontend
- Usar API Routes como proxy
- Implementar rate limiting
- Validar inputs del usuario

### Performance
- Implementar caché de resultados similares
- Usar streaming para audios grandes
- Optimizar tamaño de archivos
- Considerar CDN para distribución

---

## 📈 MÉTRICAS DE ÉXITO

- [ ] Generación exitosa de música en < 30 segundos
- [ ] 95%+ de uptime del servicio
- [ ] Integración fluida con UI existente
- [ ] Almacenamiento persistente de tracks
- [ ] Sistema de traducción funcional
- [ ] Manejo robusto de errores

---

## 🔗 RECURSOS Y DOCUMENTACIÓN

- [Documentación oficial de Lyria](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/lyria-music-generation?hl=es-419)
- [Guía de prompts para música](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/music/music-gen-prompt-guide?hl=es-419)
- [Repositorio de ejemplos Google Cloud](https://github.com/GoogleCloudPlatform/generative-ai)
- [SDK de Vertex AI para Node.js](https://cloud.google.com/nodejs/docs/reference/aiplatform/latest)

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Preparación
- [ ] Cuenta de Google Cloud creada
- [ ] Proyecto GCP configurado
- [ ] Vertex AI habilitado
- [ ] Cloud Storage configurado
- [ ] Credenciales descargadas

### Desarrollo Backend
- [ ] Cliente Lyria implementado
- [ ] API Routes creadas
- [ ] Sistema de almacenamiento funcionando
- [ ] Traducción de prompts implementada

### Desarrollo Frontend
- [ ] Integración con API completa
- [ ] Reproductor de audio funcional
- [ ] Biblioteca conectada
- [ ] Manejo de errores implementado

### Testing y Deployment
- [ ] Pruebas de generación exitosas
- [ ] Pruebas de almacenamiento
- [ ] Pruebas de descarga
- [ ] Deployment en producción

---

**Fecha de creación**: 2025-01-20  
**Última actualización**: 2025-01-20
