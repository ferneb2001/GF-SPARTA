#!/usr/bin/env node

/**
 * TEST BUGBOT DIRECT - GF SPARTA
 * Pruebas específicas y tests unitarios para la página del gimnasio
 * Ejecuta verificaciones directas sin dependencias externas
 */

const fs = require('fs');
const path = require('path');

class GFSpartaDirectTests {
    constructor() {
        this.testResults = [];
        this.projectRoot = process.cwd();
        this.passed = 0;
        this.failed = 0;
    }

    // Utilidad para logging
    log(message, type = 'INFO') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${type}: ${message}`);
    }

    // Ejecutar test individual
    runTest(testName, testFunction) {
        try {
            const result = testFunction();
            if (result) {
                this.passed++;
                this.testResults.push(`✅ ${testName}: PASSED`);
                this.log(`✅ ${testName}: PASSED`, 'TEST');
            } else {
                this.failed++;
                this.testResults.push(`❌ ${testName}: FAILED`);
                this.log(`❌ ${testName}: FAILED`, 'TEST');
            }
        } catch (error) {
            this.failed++;
            this.testResults.push(`❌ ${testName}: ERROR - ${error.message}`);
            this.log(`❌ ${testName}: ERROR - ${error.message}`, 'TEST');
        }
    }

    // TEST 1: Verificar existencia de archivos críticos
    testCriticalFilesExist() {
        const files = ['index.html', 'README.md', '.gitignore'];
        return files.every(file => fs.existsSync(path.join(this.projectRoot, file)));
    }

    // TEST 2: Verificar estructura HTML básica
    testHTMLStructure() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        if (!fs.existsSync(htmlPath)) return false;
        
        const content = fs.readFileSync(htmlPath, 'utf8');
        const requiredTags = ['<!DOCTYPE html>', '<html', '<head>', '<body>', '<nav>', '<footer>'];
        return requiredTags.every(tag => content.includes(tag));
    }

    // TEST 3: Verificar meta tags móvil
    testMobileMetaTags() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        return content.includes('viewport') && 
               content.includes('width=device-width') &&
               content.includes('initial-scale=1.0');
    }

    // TEST 4: Verificar CDN de Tailwind CSS
    testTailwindCDN() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        return content.includes('tailwindcss.com');
    }

    // TEST 5: Verificar Font Awesome
    testFontAwesome() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        return content.includes('font-awesome') || content.includes('fontawesome');
    }

    // TEST 6: Verificar logo de GF SPARTA
    testGFSpartaLogo() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        return content.includes('https://i.imgur.com/eYIyi1B.png');
    }

    // TEST 7: Verificar enlaces de WhatsApp
    testWhatsAppLinks() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const whatsappPattern = /https:\/\/wa\.me\/542612525922/g;
        const matches = content.match(whatsappPattern);
        return matches && matches.length >= 5; // Al menos 5 enlaces (planes + contacto)
    }

    // TEST 8: Verificar enlace de Instagram
    testInstagramLink() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        return content.includes('instagram.com/gf.sparta') && content.includes('@gf.sparta');
    }

    // TEST 9: Verificar enlace de Google Maps
    testGoogleMapsLink() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        return content.includes('maps.app.goo.gl/bYcpbQpixSFJcjaNA');
    }

    // TEST 10: Verificar precios específicos
    testPricingInformation() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const expectedPrices = ['$65.000', '$75.000', '$85.000', '$100.000', '$35.000', '$10.000'];
        const foundPrices = expectedPrices.filter(price => content.includes(price));
        return foundPrices.length >= 4; // Al menos 4 de los 6 precios
    }

    // TEST 11: Verificar planes de entrenamiento
    testTrainingPlans() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const plans = ['Plan Básico', 'Plan Intermedio', 'Plan Premium'];
        return plans.every(plan => content.includes(plan));
    }

    // TEST 12: Verificar servicios de entrenamiento
    testTrainingServices() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const services = ['Funcional', 'Fuerza', 'GAP'];
        return services.every(service => content.includes(service));
    }

    // TEST 13: Verificar equipo de entrenadores
    testTrainingTeam() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        return content.includes('Fernanda Nieto') && content.includes('Gastón Nebro');
    }

    // TEST 14: Verificar JavaScript funcional
    testJavaScriptFunctions() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const jsFunctions = ['openModal', 'closeModal', 'scrollIntoView'];
        return jsFunctions.every(func => content.includes(func));
    }

    // TEST 15: Verificar diseño responsive
    testResponsiveDesign() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        // Verificar clases responsive de Tailwind
        const responsiveClasses = ['md:', 'lg:', 'grid-cols-2', 'flex-col'];
        return responsiveClasses.every(cls => content.includes(cls));
    }

    // TEST 16: Verificar imágenes del gimnasio
    testGymImages() {
        const files = fs.readdirSync(this.projectRoot);
        const gymImages = files.filter(file => file.startsWith('IMG-') && file.endsWith('.jpg'));
        return gymImages.length >= 5; // Al menos 5 imágenes
    }

    // TEST 17: Verificar modal de galería
    testGalleryModal() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        return content.includes('imageModal') && 
               content.includes('modalImage') &&
               content.includes('onclick="openModal(this)"');
    }

    // TEST 18: Verificar colores del tema
    testThemeColors() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        return content.includes('sparta-gold') && 
               content.includes('sparta-red') &&
               content.includes('#FF8C00') &&
               content.includes('#DC143C');
    }

    // TEST 19: Verificar navegación suave
    testSmoothNavigation() {
        const htmlPath = path.join(this.projectRoot, 'index.html');
        const content = fs.readFileSync(htmlPath, 'utf8');
        
        const navigationIds = ['#inicio', '#servicios', '#precios', '#galeria', '#contacto'];
        return navigationIds.every(id => content.includes(`href="${id}"`));
    }

    // TEST 20: Verificar configuración de GitHub Pages
    testGitHubPagesReady() {
        // Verificar que el archivo principal se llama index.html
        const indexExists = fs.existsSync(path.join(this.projectRoot, 'index.html'));
        
        // Verificar que no hay conflictos de naming
        const noConflicts = !fs.existsSync(path.join(this.projectRoot, 'gimnasio.html'));
        
        return indexExists && noConflicts;
    }

    // EJECUTAR TODAS LAS PRUEBAS
    runAllTests() {
        this.log('🧪 Iniciando suite de pruebas directas para GF SPARTA...');

        // Ejecutar todos los tests
        this.runTest('Archivos Críticos Existen', () => this.testCriticalFilesExist());
        this.runTest('Estructura HTML Básica', () => this.testHTMLStructure());
        this.runTest('Meta Tags Móvil', () => this.testMobileMetaTags());
        this.runTest('Tailwind CSS CDN', () => this.testTailwindCDN());
        this.runTest('Font Awesome CDN', () => this.testFontAwesome());
        this.runTest('Logo GF SPARTA', () => this.testGFSpartaLogo());
        this.runTest('Enlaces WhatsApp', () => this.testWhatsAppLinks());
        this.runTest('Enlace Instagram', () => this.testInstagramLink());
        this.runTest('Enlace Google Maps', () => this.testGoogleMapsLink());
        this.runTest('Información de Precios', () => this.testPricingInformation());
        this.runTest('Planes de Entrenamiento', () => this.testTrainingPlans());
        this.runTest('Servicios de Entrenamiento', () => this.testTrainingServices());
        this.runTest('Equipo de Entrenadores', () => this.testTrainingTeam());
        this.runTest('Funciones JavaScript', () => this.testJavaScriptFunctions());
        this.runTest('Diseño Responsive', () => this.testResponsiveDesign());
        this.runTest('Imágenes del Gimnasio', () => this.testGymImages());
        this.runTest('Modal de Galería', () => this.testGalleryModal());
        this.runTest('Colores del Tema', () => this.testThemeColors());
        this.runTest('Navegación Suave', () => this.testSmoothNavigation());
        this.runTest('Listo para GitHub Pages', () => this.testGitHubPagesReady());

        // Generar reporte
        this.generateReport();
    }

    // GENERAR REPORTE DE PRUEBAS
    generateReport() {
        const total = this.passed + this.failed;
        const successRate = ((this.passed / total) * 100).toFixed(1);

        const report = `
╔══════════════════════════════════════════════════════════════╗
║                🧪 GF SPARTA DIRECT TESTS REPORT             ║
╠══════════════════════════════════════════════════════════════╣
║ Total Tests: ${total.toString().padEnd(47)} ║
║ ✅ Passed: ${this.passed.toString().padEnd(49)} ║
║ ❌ Failed: ${this.failed.toString().padEnd(49)} ║
║ Success Rate: ${successRate}%${(' '.repeat(44 - successRate.length))}║
╚══════════════════════════════════════════════════════════════╝

RESULTADOS DETALLADOS:
${this.testResults.join('\n')}

${this.failed === 0 ? '🎉 ¡TODOS LOS TESTS PASARON!' : `🔧 ${this.failed} TESTS REQUIEREN ATENCIÓN`}
        `;

        console.log(report);

        // Guardar reporte en archivo
        const reportPath = path.join(this.projectRoot, 'test-results.txt');
        fs.writeFileSync(reportPath, report);
        this.log('📄 Reporte guardado en test-results.txt');

        return {
            total,
            passed: this.passed,
            failed: this.failed,
            successRate: parseFloat(successRate),
            details: this.testResults
        };
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const tests = new GFSpartaDirectTests();
    tests.runAllTests();
    process.exit(tests.failed > 0 ? 1 : 0);
}

module.exports = GFSpartaDirectTests;