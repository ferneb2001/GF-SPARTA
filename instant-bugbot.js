#!/usr/bin/env node

/**
 * INSTANT BUGBOT - GF SPARTA Gymnasium Website
 * Sistema de monitoreo y verificación automática
 * Diseñado para sitios web estáticos con funcionalidades específicas
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GFSpartaBugBot {
    constructor() {
        this.projectName = 'GF SPARTA Gymnasium';
        this.projectRoot = process.cwd();
        this.timestamp = new Date().toISOString();
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            errors: [],
            warnings_list: [],
            summary: ''
        };
    }

    log(message, type = 'INFO') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${type}: ${message}`);
    }

    // CHEQUEOS DE SALUD BÁSICOS
    healthChecks() {
        this.log('🏥 Ejecutando chequeos de salud básicos...');

        // Verificar estructura de archivos críticos
        const criticalFiles = [
            'index.html',
            'README.md',
            '.gitignore',
            'precios, productos y servicios.txt'
        ];

        criticalFiles.forEach(file => {
            if (fs.existsSync(path.join(this.projectRoot, file))) {
                this.results.passed++;
                this.log(`✅ ${file} encontrado`);
            } else {
                this.results.failed++;
                this.results.errors.push(`❌ Archivo crítico faltante: ${file}`);
            }
        });

        // Verificar imágenes del gimnasio
        const imagePattern = /IMG-\d{8}-WA\d{4}\.jpg/;
        const files = fs.readdirSync(this.projectRoot);
        const images = files.filter(file => imagePattern.test(file));
        
        if (images.length >= 5) {
            this.results.passed++;
            this.log(`✅ ${images.length} imágenes del gimnasio encontradas`);
        } else {
            this.results.warnings++;
            this.results.warnings_list.push(`⚠️ Pocas imágenes encontradas (${images.length})`);
        }
    }

    // ANÁLISIS DE CONTENIDO HTML
    analyzeHTML() {
        this.log('🔍 Analizando estructura HTML...');

        const htmlPath = path.join(this.projectRoot, 'index.html');
        if (!fs.existsSync(htmlPath)) {
            this.results.failed++;
            this.results.errors.push('❌ index.html no encontrado');
            return;
        }

        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Verificar elementos críticos
        const criticalElements = [
            { name: 'Logo GF SPARTA', pattern: /https:\/\/i\.imgur\.com\/eYIyi1B\.png/ },
            { name: 'WhatsApp Link', pattern: /https:\/\/wa\.me\/542612525922/ },
            { name: 'Instagram Link', pattern: /@gf\.sparta/ },
            { name: 'Google Maps', pattern: /https:\/\/maps\.app\.goo\.gl/ },
            { name: 'Tailwind CSS', pattern: /tailwindcss\.com/ },
            { name: 'Font Awesome', pattern: /font-awesome/ },
            { name: 'Planes de Entrenamiento', pattern: /Plan\s+(Básico|Intermedio|Premium)/ },
            { name: 'Precios', pattern: /\$\d{2,3}\.000/ },
            { name: 'Modal de Galería', pattern: /imageModal/ }
        ];

        criticalElements.forEach(element => {
            if (element.pattern.test(htmlContent)) {
                this.results.passed++;
                this.log(`✅ ${element.name} presente`);
            } else {
                this.results.failed++;
                this.results.errors.push(`❌ ${element.name} faltante o incorrecto`);
            }
        });

        // Verificar responsive design
        if (htmlContent.includes('md:') && htmlContent.includes('lg:')) {
            this.results.passed++;
            this.log('✅ Diseño responsive detectado');
        } else {
            this.results.warnings++;
            this.results.warnings_list.push('⚠️ Clases responsive limitadas');
        }

        // Verificar meta tags para móviles
        if (htmlContent.includes('viewport') && htmlContent.includes('width=device-width')) {
            this.results.passed++;
            this.log('✅ Meta viewport para móviles presente');
        } else {
            this.results.failed++;
            this.results.errors.push('❌ Meta viewport faltante');
        }
    }

    // VERIFICAR FUNCIONALIDADES ESPECÍFICAS
    checkFunctionality() {
        this.log('⚙️ Verificando funcionalidades específicas...');

        const htmlPath = path.join(this.projectRoot, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Verificar JavaScript crítico
        const jsFeatures = [
            { name: 'Smooth Scrolling', pattern: /scrollIntoView/ },
            { name: 'Modal Functions', pattern: /openModal|closeModal/ },
            { name: 'Escape Key Handler', pattern: /keydown.*Escape/ },
            { name: 'Navbar Scroll Effect', pattern: /window\.addEventListener.*scroll/ }
        ];

        jsFeatures.forEach(feature => {
            if (feature.pattern.test(htmlContent)) {
                this.results.passed++;
                this.log(`✅ ${feature.name} implementado`);
            } else {
                this.results.warnings++;
                this.results.warnings_list.push(`⚠️ ${feature.name} no detectado`);
            }
        });

        // Verificar enlaces de contacto específicos
        const contactLinks = [
            'wa.me/542612525922',
            'instagram.com/gf.sparta',
            'maps.app.goo.gl'
        ];

        contactLinks.forEach(link => {
            if (htmlContent.includes(link)) {
                this.results.passed++;
                this.log(`✅ Enlace ${link} presente`);
            } else {
                this.results.failed++;
                this.results.errors.push(`❌ Enlace ${link} faltante`);
            }
        });
    }

    // VERIFICAR PRECIOS ACTUALIZADOS
    checkPricing() {
        this.log('💰 Verificando información de precios...');

        const htmlPath = path.join(this.projectRoot, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Precios esperados según documento
        const expectedPrices = ['65.000', '75.000', '85.000', '100.000', '35.000', '10.000'];
        
        expectedPrices.forEach(price => {
            if (htmlContent.includes(`$${price}`)) {
                this.results.passed++;
                this.log(`✅ Precio $${price} encontrado`);
            } else {
                this.results.warnings++;
                this.results.warnings_list.push(`⚠️ Precio $${price} no encontrado`);
            }
        });

        // Verificar servicios específicos
        const services = ['Funcional', 'Fuerza', 'GAP', 'Nutrición', 'Drenaje'];
        services.forEach(service => {
            if (htmlContent.includes(service)) {
                this.results.passed++;
                this.log(`✅ Servicio ${service} presente`);
            } else {
                this.results.warnings++;
                this.results.warnings_list.push(`⚠️ Servicio ${service} no encontrado`);
            }
        });
    }

    // VERIFICAR OPTIMIZACIÓN MÓVIL
    checkMobileOptimization() {
        this.log('📱 Verificando optimización móvil...');

        const htmlPath = path.join(this.projectRoot, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Verificar grid responsive
        if (htmlContent.includes('grid-cols-2') && htmlContent.includes('md:grid-cols-')) {
            this.results.passed++;
            this.log('✅ Grids responsivos detectados');
        } else {
            this.results.warnings++;
            this.results.warnings_list.push('⚠️ Grids responsivos limitados');
        }

        // Verificar tamaños de texto móvil
        if (htmlContent.includes('text-sm') || htmlContent.includes('text-xs')) {
            this.results.passed++;
            this.log('✅ Tamaños de texto móvil optimizados');
        } else {
            this.results.warnings++;
            this.results.warnings_list.push('⚠️ Texto podría ser muy grande para móvil');
        }

        // Verificar espaciado móvil
        if (htmlContent.includes('gap-4') || htmlContent.includes('gap-6')) {
            this.results.passed++;
            this.log('✅ Espaciado optimizado para móvil');
        } else {
            this.results.warnings++;
            this.results.warnings_list.push('⚠️ Espaciado no optimizado');
        }
    }

    // GENERAR REPORTE
    generateReport() {
        const total = this.results.passed + this.results.failed + this.results.warnings;
        const successRate = ((this.results.passed / total) * 100).toFixed(1);

        this.results.summary = `
╔══════════════════════════════════════════════════════════════╗
║                    🥊 GF SPARTA BUGBOT REPORT                ║
╠══════════════════════════════════════════════════════════════╣
║ Proyecto: ${this.projectName.padEnd(48)} ║
║ Timestamp: ${this.timestamp.padEnd(47)} ║
║ Éxito: ${successRate}%${(' '.repeat(52 - successRate.length))}║
╠══════════════════════════════════════════════════════════════╣
║ ✅ Pruebas Pasadas: ${this.results.passed.toString().padEnd(39)} ║
║ ❌ Fallos: ${this.results.failed.toString().padEnd(47)} ║
║ ⚠️  Advertencias: ${this.results.warnings.toString().padEnd(43)} ║
╚══════════════════════════════════════════════════════════════╝

${this.results.errors.length > 0 ? '🚨 ERRORES CRÍTICOS:\n' + this.results.errors.join('\n') + '\n' : ''}
${this.results.warnings_list.length > 0 ? '⚠️ ADVERTENCIAS:\n' + this.results.warnings_list.join('\n') + '\n' : ''}

${this.results.failed === 0 ? '🎉 ¡PÁGINA WEB FUNCIONANDO CORRECTAMENTE!' : '🔧 REQUIERE ATENCIÓN'}
        `;

        console.log(this.results.summary);
        return this.results;
    }

    // EJECUTAR TODAS LAS PRUEBAS
    async runAll() {
        this.log('🚀 Iniciando análisis completo de GF SPARTA...');
        
        this.healthChecks();
        this.analyzeHTML();
        this.checkFunctionality();
        this.checkPricing();
        this.checkMobileOptimization();
        
        return this.generateReport();
    }

    // GUARDAR BITÁCORA
    saveToBitacora(results) {
        const bitacoraPath = path.join(this.projectRoot, 'BITACORA_TECNICA_MONITOREO.md');
        const entry = `
## 🔍 Análisis ${new Date().toLocaleString()}

**Estado:** ${results.failed === 0 ? '✅ SALUDABLE' : '🔧 REQUIERE ATENCIÓN'}
**Éxito:** ${(((results.passed) / (results.passed + results.failed + results.warnings)) * 100).toFixed(1)}%

### Resultados:
- ✅ Pruebas Pasadas: ${results.passed}
- ❌ Fallos: ${results.failed}  
- ⚠️ Advertencias: ${results.warnings}

${results.errors.length > 0 ? '### 🚨 Errores:\n' + results.errors.map(e => `- ${e}`).join('\n') + '\n' : ''}
${results.warnings_list.length > 0 ? '### ⚠️ Advertencias:\n' + results.warnings_list.map(w => `- ${w}`).join('\n') + '\n' : ''}

---
`;

        if (fs.existsSync(bitacoraPath)) {
            const content = fs.readFileSync(bitacoraPath, 'utf8');
            const newContent = content.replace('---\n', entry);
            fs.writeFileSync(bitacoraPath, newContent);
        } else {
            fs.writeFileSync(bitacoraPath, `# 🥊 GF SPARTA - Bitácora Técnica de Monitoreo\n\n${entry}`);
        }

        this.log('📝 Entrada guardada en bitácora técnica');
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const bugbot = new GFSpartaBugBot();
    bugbot.runAll().then(results => {
        bugbot.saveToBitacora(results);
        process.exit(results.failed > 0 ? 1 : 0);
    }).catch(error => {
        console.error('❌ Error en BugBot:', error);
        process.exit(1);
    });
}

module.exports = GFSpartaBugBot;