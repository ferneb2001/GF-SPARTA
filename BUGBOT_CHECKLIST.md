# 🥊 GF SPARTA - BUGBOT CHECKLIST

## 📋 Lista de Verificación Completa

### 🔧 COMANDOS DISPONIBLES

```bash
npm run bugbot          # Análisis completo con BugBot
npm run test           # Suite de pruebas directas
npm run health-check   # Chequeo rápido de salud
npm run full-analysis  # Análisis completo (tests + bugbot)
npm run monitor        # Monitoreo y guardado en bitácora
npm run pre-deploy     # Verificación antes de deploy
npm run post-update    # Análisis después de actualizaciones
```

---

## ✅ CHECKLIST PRE-DEPLOY

### 📁 Estructura de Archivos
- [ ] `index.html` existe y es válido
- [ ] `README.md` está presente
- [ ] `.gitignore` configurado correctamente
- [ ] `package.json` con scripts de BugBot
- [ ] Al menos 5 imágenes del gimnasio (IMG-*.jpg)

### 🌐 Estructura HTML
- [ ] DOCTYPE HTML5 declarado
- [ ] Meta viewport para móviles configurado
- [ ] Tailwind CSS CDN cargando
- [ ] Font Awesome CDN cargando
- [ ] Estructura semántica (nav, main, footer)

### 🎨 Branding y Diseño
- [ ] Logo de GF SPARTA presente (i.imgur.com/eYIyi1B.png)
- [ ] Colores oficiales implementados (sparta-gold #FF8C00, sparta-red #DC143C)
- [ ] Tipografía Montserrat cargando
- [ ] Diseño responsive con Tailwind (md:, lg:)
- [ ] "VERSIÓN FUNCIONAL WEB" en navegación

### 📱 Optimización Móvil
- [ ] Grid responsive (grid-cols-2, md:grid-cols-X)
- [ ] Texto optimizado para móvil (text-sm, text-xs)
- [ ] Botones táctiles adecuados (min 44px)
- [ ] Espaciado móvil optimizado (gap-4, gap-6)
- [ ] Imágenes responsive

### 📞 Enlaces de Contacto
- [ ] WhatsApp: https://wa.me/542612525922 (mínimo 5 enlaces)
- [ ] Instagram: @gf.sparta + instagram.com/gf.sparta
- [ ] Google Maps: maps.app.goo.gl/bYcpbQpixSFJcjaNA
- [ ] Mensajes WhatsApp personalizados por plan

### 💰 Información de Precios
- [ ] Plan Básico: $65.000 (2 veces/semana)
- [ ] Plan Intermedio: $75.000 (3 veces/semana)
- [ ] Plan Premium: $85.000 (4+ veces/semana)
- [ ] Plan Básico Plus: $85.000 (+ batido)
- [ ] Plan Premium Plus: $100.000 (+ batido)
- [ ] Nutrición: $35.000
- [ ] Drenaje Linfático: $10.000

### 🏋️‍♂️ Servicios de Entrenamiento
- [ ] Funcional - capacidad de movimiento diario
- [ ] Funcional Intensivo - máxima intensidad
- [ ] Fuerza - potencia y resistencia muscular
- [ ] GAP - Glúteos, Abdominales, Piernas
- [ ] Instalaciones Propias - asesoramiento externo

### 👥 Equipo de Entrenadores
- [ ] Fernanda Nieto - Entrenadora Personal
- [ ] Gastón Nebro - Entrenador Personal & Nutricionista
- [ ] Descripciones profesionales incluidas

### 🖼️ Galería de Imágenes
- [ ] Modal de galería funcionando (imageModal)
- [ ] Función openModal() implementada
- [ ] Función closeModal() implementada
- [ ] Tecla ESC para cerrar modal
- [ ] Click en fondo para cerrar modal
- [ ] Al menos 7 imágenes mostrándose

### ⚙️ Funcionalidades JavaScript
- [ ] Navegación suave (scrollIntoView)
- [ ] Efecto scroll en navbar
- [ ] Modal de galería completamente funcional
- [ ] Manejo de eventos de teclado (ESC)

### 📊 Suplementos
- [ ] Sección "Línea de Suplementos"
- [ ] Botón CONSULTAR con WhatsApp
- [ ] Proteína Premium, Creatina Premium
- [ ] Quemador Gold, Multivitamínico ENA
- [ ] Enlaces funcionales a consulta

---

## 🚨 CHECKLIST POST-UPDATE

### 📝 Después de Cambios de Contenido
- [ ] Ejecutar `npm run post-update`
- [ ] Verificar que precios siguen actualizados
- [ ] Confirmar enlaces WhatsApp funcionando
- [ ] Revisar BITACORA_TECNICA_MONITOREO.md

### 🔄 Después de Cambios de Código
- [ ] Ejecutar `npm run full-analysis`
- [ ] Verificar que no se rompieron funcionalidades
- [ ] Confirmar responsive design intacto
- [ ] Probar modal de galería

### 🚀 Antes de Deploy a GitHub Pages
- [ ] Ejecutar `npm run pre-deploy`
- [ ] Archivo se llama `index.html` (no gimnasio.html)
- [ ] Commit y push a rama master
- [ ] Verificar GitHub Pages configurado
- [ ] Probar URL: https://ferneb2001.github.io/GF-SPARTA/

---

## 🔍 VERIFICACIONES CRÍTICAS

### ⚡ Rendimiento
- [ ] Imágenes optimizadas (< 500KB cada una)
- [ ] CDNs cargando correctamente
- [ ] Sin JavaScript bloquean te

### 🔒 Seguridad
- [ ] No hay información sensible expuesta
- [ ] Enlaces externos con target="_blank"
- [ ] API keys seguras (solo .env local)

### 📱 Experiencia Móvil
- [ ] Página carga rápido en móvil
- [ ] Botones táctiles fáciles de presionar
- [ ] Texto legible sin zoom
- [ ] WhatsApp se abre correctamente

---

## 📈 MÉTRICAS DE ÉXITO

| Métrica | Objetivo | Estado |
|---------|----------|--------|
| Tests Pasados | > 95% | ⏳ |
| Tiempo de Carga | < 3s | ⏳ |
| Compatibilidad Móvil | 100% | ⏳ |
| Enlaces Funcionales | 100% | ⏳ |
| Responsive Design | 100% | ⏳ |

---

## 🆘 TROUBLESHOOTING

### Si BugBot falla:
```bash
# Verificar Node.js
node --version

# Ejecutar tests individuales
node test_bugbot_direct.js

# Verificar permisos de archivos
ls -la *.js
```

### Si GitHub Pages no funciona:
1. Verificar que el archivo sea `index.html`
2. Confirmar rama master seleccionada
3. Esperar 10 minutos para propagación
4. Revisar Settings → Pages en GitHub

---

**🎯 OBJETIVO:** Mantener la página web GF SPARTA funcionando perfectamente en móviles con todos los enlaces de WhatsApp operativos y información actualizada.

**🕐 FRECUENCIA RECOMENDADA:**
- Después de cada cambio: `npm run monitor`
- Antes de updates importantes: `npm run pre-deploy`
- Semanalmente: `npm run full-analysis`