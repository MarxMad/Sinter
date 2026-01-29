# 🎥 Instrucciones para Agregar Video de Fondo al Hero

## 📍 Ubicación del Código

El contenedor de video está preparado en:
- `components/landing/hero.tsx` (líneas 20-35)

## 🎬 Cómo Agregar el Video

### Opción 1: Video Local

1. **Coloca tu video en la carpeta public:**
   ```
   public/videos/hero-background.mp4
   ```

2. **Descomenta y actualiza el código en `hero.tsx`:**
   ```tsx
   <div className="absolute inset-0">
     <video
       autoPlay
       loop
       muted
       playsInline
       className="w-full h-full object-cover"
     >
       <source src="/videos/hero-background.mp4" type="video/mp4" />
     </video>
   </div>
   ```

### Opción 2: Video desde URL Externa

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
>
  <source src="https://tu-url.com/video.mp4" type="video/mp4" />
</video>
```

## 🎨 Ajustes Recomendados

### Overlay de Oscurecimiento
El overlay actual está en `bg-background/60`. Puedes ajustarlo:
- Más oscuro: `bg-background/70` o `bg-background/80`
- Más claro: `bg-background/50` o `bg-background/40`

### Tamaño y Posición del Video
- `object-cover` - Cubre todo el área (recomendado)
- `object-contain` - Muestra todo el video sin recortar
- `object-center` - Centra el video

## 📝 Ejemplo Completo

```tsx
<div className="absolute inset-0 z-0">
  {/* Overlay oscuro para legibilidad */}
  <div className="absolute inset-0 bg-background/60 z-10" />
  
  {/* Video de fondo */}
  <div className="absolute inset-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/videos/hero-background.mp4" type="video/mp4" />
      {/* Fallback para navegadores que no soportan video */}
      Tu navegador no soporta videos.
    </video>
  </div>
</div>
```

## ⚙️ Atributos del Video

- `autoPlay` - Reproduce automáticamente
- `loop` - Repite el video infinitamente
- `muted` - Sin sonido (requerido para autoplay en muchos navegadores)
- `playsInline` - Reproduce inline en móviles (iOS)

## 🎯 Optimizaciones

### Formatos Múltiples (Recomendado)
```tsx
<video autoPlay loop muted playsInline className="w-full h-full object-cover">
  <source src="/videos/hero-background.webm" type="video/webm" />
  <source src="/videos/hero-background.mp4" type="video/mp4" />
</video>
```

### Poster (Imagen de carga)
```tsx
<video 
  autoPlay 
  loop 
  muted 
  playsInline 
  poster="/images/video-poster.jpg"
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-background.mp4" type="video/mp4" />
</video>
```

## 🚀 Efectos Parallax

El parallax ya está implementado. El contenido se mueve más lento que el scroll, creando un efecto de profundidad.

Para ajustar la velocidad del parallax, modifica en `hero.tsx`:
```tsx
const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
// Cambia "50%" a un valor menor para menos movimiento
```

## 📱 Responsive

El video se adapta automáticamente a diferentes tamaños de pantalla gracias a:
- `w-full h-full` - Tamaño completo
- `object-cover` - Cubre el área sin distorsión

## ⚠️ Consideraciones

1. **Tamaño del archivo**: Videos grandes pueden afectar el rendimiento
   - Recomendado: < 5MB
   - Duración: 10-30 segundos (se repite)

2. **Compresión**: Usa herramientas como HandBrake o FFmpeg para comprimir

3. **Fallback**: Considera mostrar una imagen si el video no carga

## 🎨 Colores de la App

Los colores principales son:
- **Naranja (Primary)**: `oklch(0.85 0.20 55)`
- **Azul (Accent)**: `oklch(0.70 0.20 250)`

El overlay usa estos colores para mantener la coherencia visual.
