# ESTADO DEL PROYECTO — GF SPARTA
*Última actualización: 21/05/2026 (sesión 2)*

---

## EL PROYECTO

Sitio web para el gimnasio de Gastón Nebro (hijo de Fernando Nebro).
- **URL publicada:** https://gf-sparta.netlify.app/
- **Repositorio:** https://github.com/ferneb2001/GF-SPARTA
- **Cuenta Google del gym:** gfsparta1996@gmail.com
- **WhatsApp:** +54 261 252 5922
- **Instagram:** @gf.sparta
- **Horarios:** Lunes a Viernes 9:00–21:00 / Sábados a convenir

### Equipo
- **Gastón Nebro** — Entrenador personal + Nutricionista
- Fernanda Nieto fue quitada del sitio (ya no trabaja ahí)

---

## SERVICIOS Y PRECIOS ACTUALES

### Entrenamiento
- 2 veces/semana: $65.000
- 3 veces/semana: $75.000
- 4+ veces/semana: $85.000
- 2 veces/semana + batido proteico: $85.000
- 3 veces/semana + batido proteico: $100.000
- Entrenamiento 2 veces/semana + Nutrición: $100.000

### Servicios individuales
- Nutrición: $35.000
- Drenaje linfático con botas: $10.000/sesión (quitado del sitio pero sigue siendo servicio)

### Catálogo Deportivo y Línea de Suplementos (sección en el sitio)
- Sección renombrada de "Línea de Suplementos" a "Catálogo Deportivo y Línea de Suplementos"
- Ya no muestra marcas con precios fijos — hay un banner que lleva al catálogo completo
- Ver sección CATÁLOGO más abajo para el detalle completo

### PYMES FORCE (módulo en el sitio)
- Módulo corporativo para empresas y pymes
- Aparece al inicio del sitio (antes de #servicios)
- Incluye video + flyer + tagline: "Rutinas compactas y eficientes para agendas ocupadas (35/40 min)"
- Archivos en `pymes/`: video `.mp4` y flyer `.jpeg`
- Tiene su propio ítem en la nav (desktop y mobile), destacado en dorado

---

## CATÁLOGO DEPORTIVO

### Estructura
- **Archivo:** `catalogo/catalogo-gf-sparta.html`
- **URL pública:** `https://gf-sparta.netlify.app/catalogo/catalogo-gf-sparta.html`
- El catálogo es una página separada, accesible desde el banner en la sección de suplementos del sitio principal

### Qué tiene el catálogo
- Productos de Full Training (distribuidor de equipamiento y suplementos)
- Fotos de cada producto (tomadas del sitio del distribuidor)
- Sin precios — cada producto tiene un botón "Consultá el precio" que abre WhatsApp de Gastón con el nombre del producto en el mensaje
- Barra de búsqueda por nombre
- Filtros por categoría (Accesorios, Barras, Mancuernas, Suplementos, etc.)
- Botón "← Volver al sitio" en el encabezado
- Logo de GF SPARTA en el encabezado

### Por qué sin precios
Los precios varían según el cliente. Gastón los maneja directamente por WhatsApp. El distribuidor es Full Training y el margen es ~50% sobre el precio de lista.

### Flujo mensual — actualización del catálogo
Cuando el distribuidor agrega productos o cambia el catálogo:

1. Abrir `https://catalogo.treinta.co/fulltraining` en el navegador
2. **IMPORTANTE:** Scrollear manualmente la pestaña "Suplementos" de arriba a abajo antes de correr el script (limitación de lazy loading de esa página — las demás pestañas no tienen este problema)
3. Abrir consola del navegador: `F12` → pestaña **Console**
4. Abrir `catalogo/script-escaneo-catalogo.js` con el Bloc de notas, seleccionar todo, copiar y pegar en la consola
5. Esperar que termine (varios minutos — recorre pestaña por pestaña)
6. Se descarga automáticamente `catalogo-gf-sparta.html` ya completo
7. Reemplazar el archivo en la carpeta `catalogo/` del proyecto
8. Hacer commit y push → en ~2 minutos está live en Netlify

### Qué hace el script automáticamente
- Recorre todas las pestañas del distribuidor (excluye "VER TODOS", "ORDENAR" y todo lo que diga "PROMO")
- Scrollea cada categoría hasta el final para activar el lazy loading
- Captura nombre e imagen de cada producto
- Genera el HTML completo con buscador, filtros, WhatsApp links, logo y botón de volver
- Descarga el archivo listo para subir, sin pasos manuales adicionales

### Por qué se excluyen las PROMOCIONES
Las tarjetas de promoción tienen los precios del distribuidor impresos en las imágenes, lo que expondría el precio de costo. Gastón maneja las promos directamente.

---

## INFRAESTRUCTURA TÉCNICA

### Sitio web
- HTML/CSS estático con Tailwind CSS
- Publicado en Netlify (deploy automático desde GitHub)
- Colores: sparta-gold `#FF8C00`, sparta-red `#DC143C`

### Chatbot IA — SPARTA Bot
- Modelo: Gemini 2.5 Flash
- **NO** está la API key en el HTML — está guardada como secreto en Cloudflare
- Worker URL: `https://esparta-gemini-proxy.ferneb2001.workers.dev`
- CORS configurado solo para `https://gf-sparta.netlify.app`
- Fallback al WhatsApp si falla la API

### CMS (Netlify CMS)
- Los archivos `_data/planes/` fueron **eliminados** intencionalmente
- Razón: el `js/cms-loader.js` sobreescribía la sección de precios con datos viejos
- Si se vuelven a crear archivos en esa carpeta, el loader los va a volver a mostrar

---

## CAMBIOS REALIZADOS AL HTML ORIGINAL

**Eliminado:**
- Fernanda Nieto (entrenadora)
- Servicio "Instalaciones Propias"
- Servicio "Drenaje Linfático"
- Bloque de Ubicación
- Sección de Galería completa
- Badges "MÁS ELEGIDO" y "MÁS COMPLETO"

**Modificado:**
- Nav: "Planes" → "Objetivos" / "Galería" eliminado de la nav
- Sección precios: rediseñada como "Planificá tus objetivos" con dos grupos (gold/red)
- Sección suplementos: rediseñada con marcas y precios reales
- Grid servicios: 5 columnas → 4 columnas
- Grid contacto: 4 columnas → 3 columnas
- Equipo: solo queda la card de Gastón, centrada

**Agregado:**
- SEO completo (description, keywords, canonical, robots)
- Open Graph + Twitter Card (imagen: logo.jpeg)
- Meta tag Google Search Console
- Chatbot SPARTA Bot (Gemini vía Cloudflare Worker)
- Módulo PYMES FORCE (video + flyer + nav item)
- Banner "Ver Catálogo Completo" que enlaza a `catalogo/catalogo-gf-sparta.html`
- Catálogo deportivo completo con buscador, filtros y WhatsApp por producto

---

## POSICIONAMIENTO — ESTADO ACTUAL

| Paso | Estado | Notas |
|------|--------|-------|
| SEO en HTML | ✅ Completo | |
| Open Graph / preview de link | ✅ Completo | Usa logo.jpeg |
| Chatbot IA | ✅ Completo | Gemini 2.5 Flash |
| Módulo PYMES FORCE | ✅ Completo | Video + flyer + nav |
| Catálogo deportivo | ✅ Completo | Con buscador, filtros y WhatsApp |
| Google Business Profile | ⏳ Incompleto | Creado pero sin verificar. Necesita videollamada con Google desde celular con cuenta gfsparta1996@gmail.com |
| Google Search Console | ✅ Verificado | Etiqueta HTML en index.html |
| Solicitar indexación | ⏳ Pendiente | Cuota agotada el 20/05. Hacer desde Search Console: Inspección de URLs → pegar URL → "Solicitar indexación" |
| Instagram — link en bio | ⏳ Pendiente | Agregar https://gf-sparta.netlify.app/ en bio de @gf.sparta |

---

## TAREAS PENDIENTES INMEDIATAS

1. **Search Console** → Inspección de URLs → `https://gf-sparta.netlify.app/` → "Solicitar indexación"
2. **Instagram** @gf.sparta → Editar perfil → campo "Sitio web" → `https://gf-sparta.netlify.app/`
3. **Google Business** → verificar con videollamada (escanear QR desde celular con cuenta del gym)

---

## TAREAS FUTURAS (no urgentes)

- Dominio propio (ej: `gfspartamendoza.com`) — ~$10/año, mejora SEO y credibilidad
- Pedirles reseñas de Google a clientes actuales — factor clave para posicionamiento local
- Posts en Instagram con link al sitio
- Actualizar contenido del HTML con Gastón (horarios exactos, dirección si tiene local fijo, fotos)
