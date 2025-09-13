// CMS Data Loader para GF SPARTA
// Este script carga los datos desde los archivos YAML del CMS

class CMSLoader {
    constructor() {
        this.dataPath = '/_data/';
        this.cache = {};
    }

    // Función para parsear YAML simple (para archivos básicos)
    parseSimpleYAML(yamlText) {
        const lines = yamlText.split('\n');
        const result = {};
        
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                    result[key.trim()] = value;
                }
            }
        });
        
        return result;
    }

    // Función para parsear frontmatter de archivos markdown
    parseFrontMatter(content) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontMatterRegex);
        
        if (match) {
            return this.parseSimpleYAML(match[1]);
        }
        return null;
    }

    // Cargar archivo individual
    async loadFile(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) return null;
            const text = await response.text();
            
            if (path.endsWith('.yml') || path.endsWith('.yaml')) {
                return this.parseSimpleYAML(text);
            } else if (path.endsWith('.md')) {
                return this.parseFrontMatter(text);
            }
            
            return text;
        } catch (error) {
            console.log(`No se pudo cargar ${path}, usando valores por defecto`);
            return null;
        }
    }

    // Cargar todos los archivos de una carpeta
    async loadFolder(folderPath) {
        // Para Netlify CMS, los archivos se generan con nombres específicos
        // Intentamos cargar varios archivos comunes
        const files = [];
        const possibleFiles = [
            'plan-basico.md',
            'plan-intermedio.md', 
            'plan-premium.md',
            'plan-basico-plus.md',
            'plan-premium-plus.md',
            'programas-especializados.md',
            'clases-domicilio.md'
        ];

        for (const fileName of possibleFiles) {
            const data = await this.loadFile(`${folderPath}/${fileName}`);
            if (data) {
                files.push(data);
            }
        }

        return files;
    }

    // Actualizar planes en el DOM
    async updatePlanes() {
        const planesData = await this.loadFolder('/_data/planes');
        
        if (planesData.length === 0) {
            console.log('No se encontraron datos de planes, manteniendo contenido actual');
            return;
        }

        const planesContainer = document.querySelector('#precios .grid');
        if (!planesContainer) return;

        // Limpiar contenedor actual
        const serviciosAdicionales = planesContainer.nextElementSibling;
        planesContainer.innerHTML = '';

        // Ordenar planes por campo 'order'
        planesData.sort((a, b) => (a.order || 999) - (b.order || 999));

        // Crear HTML para cada plan
        planesData.forEach(plan => {
            const planHTML = `
                <div class="bg-sparta-gray p-6 rounded-2xl border ${plan.featured ? 'border-2 border-sparta-gold relative' : 'border-gray-700'} flex flex-col justify-between">
                    ${plan.featured ? '<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 sparta-gradient px-6 py-2 rounded-full text-black font-semibold text-sm">MÁS POPULAR</div>' : ''}
                    <div class="text-center mb-6">
                        <h3 class="text-xl font-bold mb-2">${plan.title || ''}</h3>
                        <p class="text-gray-400 mb-4">${plan.frequency || ''}</p>
                        <div class="text-3xl font-bold sparta-gradient bg-clip-text text-transparent">
                            $${plan.price ? plan.price.toLocaleString('es-AR') : '0'}
                        </div>
                        <p class="text-gray-400">por mes</p>
                    </div>
                    <ul class="space-y-2 mb-6">
                        ${plan.features ? plan.features.map(feature => `
                            <li class="flex items-center text-sm">
                                <i class="fas fa-check text-sparta-gold mr-3"></i>
                                ${feature}
                            </li>
                        `).join('') : ''}
                    </ul>
                    <a href="https://wa.me/542612525922?text=Hola%20Gastón,%20estoy%20interesado%20en%20el%20${encodeURIComponent(plan.title || 'plan')}" 
                       target="_blank" 
                       class="block w-full py-3 sparta-gradient text-black font-semibold rounded-xl hover:shadow-lg transition-all text-center">
                        Consultar Plan
                    </a>
                </div>
            `;
            planesContainer.insertAdjacentHTML('beforeend', planHTML);
        });
    }

    // Actualizar configuración de contacto
    async updateContacto() {
        const contactoData = await this.loadFile('/_data/configuracion/contacto.yml');
        
        if (!contactoData) {
            console.log('No se encontraron datos de contacto, manteniendo valores actuales');
            return;
        }

        // Actualizar todos los enlaces de WhatsApp
        if (contactoData.whatsapp) {
            const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
            whatsappLinks.forEach(link => {
                const currentHref = link.getAttribute('href');
                const textPart = currentHref.split('?text=')[1] || '';
                link.setAttribute('href', `https://wa.me/${contactoData.whatsapp}${textPart ? '?text=' + textPart : ''}`);
            });
        }

        // Actualizar Instagram si existe
        if (contactoData.instagram) {
            const instagramLink = document.querySelector('a[href*="instagram.com"]');
            if (instagramLink) {
                instagramLink.setAttribute('href', `https://instagram.com/${contactoData.instagram}`);
            }
        }
    }

    // Actualizar textos generales
    async updateTextos() {
        const textosData = await this.loadFile('/_data/configuracion/textos.yml');
        
        if (!textosData) {
            console.log('No se encontraron datos de textos, manteniendo valores actuales');
            return;
        }

        // Actualizar slogan
        if (textosData.slogan) {
            const sloganElement = document.querySelector('#inicio h1');
            if (sloganElement) {
                sloganElement.textContent = textosData.slogan;
            }
        }

        // Actualizar subtítulo
        if (textosData.subtitle) {
            const subtitleElement = document.querySelector('#inicio p.text-lg');
            if (subtitleElement) {
                subtitleElement.textContent = textosData.subtitle;
            }
        }

        // Actualizar textos de transformaciones
        if (textosData.transformations_subtitle) {
            const transformSubtitle = document.querySelector('#cambios p.text-gray-400');
            if (transformSubtitle) {
                transformSubtitle.textContent = textosData.transformations_subtitle;
            }
        }

        // Actualizar CTA
        if (textosData.cta_text) {
            const ctaText = document.querySelector('#cambios .text-sparta-gold');
            if (ctaText) {
                ctaText.textContent = textosData.cta_text;
            }
        }

        if (textosData.cta_button) {
            const ctaButton = document.querySelector('#cambios a.sparta-gradient');
            if (ctaButton) {
                ctaButton.textContent = textosData.cta_button;
            }
        }
    }

    // Actualizar transformaciones
    async updateTransformaciones() {
        const transformacionesData = await this.loadFolder('/_data/transformaciones');
        
        if (transformacionesData.length === 0) {
            console.log('No se encontraron datos de transformaciones, manteniendo contenido actual');
            return;
        }

        const container = document.querySelector('#cambios .grid');
        if (!container) return;

        // Limpiar contenedor
        container.innerHTML = '';

        // Ordenar por orden
        transformacionesData.sort((a, b) => (a.order || 999) - (b.order || 999));

        // Crear HTML para cada transformación
        transformacionesData.forEach(item => {
            const html = `
                <div class="bg-sparta-gray rounded-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <img src="${item.image || ''}" alt="${item.title || 'Transformación'}" class="w-full h-96 object-cover">
                    <div class="p-4">
                        <p class="text-center text-gray-300 italic">
                            "${item.quote || ''}"
                        </p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }

    // Actualizar galería
    async updateGaleria() {
        const galeriaData = await this.loadFolder('/_data/galeria');
        
        if (galeriaData.length === 0) {
            console.log('No se encontraron datos de galería, manteniendo contenido actual');
            return;
        }

        const container = document.querySelector('#galeria .grid');
        if (!container) return;

        // Limpiar contenedor (manteniendo el modal)
        const modal = document.getElementById('imageModal');
        container.innerHTML = '';

        // Ordenar por orden
        galeriaData.sort((a, b) => (a.order || 999) - (b.order || 999));

        // Crear HTML para cada imagen
        galeriaData.forEach(item => {
            const html = `
                <div class="gallery-img rounded-xl overflow-hidden cursor-pointer">
                    <img src="${item.image || ''}" alt="${item.alt || item.title || ''}" 
                         class="w-full h-48 object-cover" onclick="openModal(this)">
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }

    // Inicializar todo
    async init() {
        console.log('Cargando datos del CMS...');
        
        // Cargar todos los datos en paralelo para mejor performance
        await Promise.all([
            this.updateContacto(),
            this.updateTextos(),
            this.updatePlanes(),
            this.updateTransformaciones(),
            this.updateGaleria()
        ]);
        
        console.log('Datos del CMS cargados');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const cmsLoader = new CMSLoader();
    cmsLoader.init();
});