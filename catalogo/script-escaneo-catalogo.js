// ============================================================
// SCRIPT DE ESCANEO - CATÁLOGO GF SPARTA
// ============================================================
// USO:
//   1. Abrí https://catalogo.treinta.co/fulltraining
//   2. IMPORTANTE: scrolleá manualmente la pestaña "Suplementos"
//      de arriba a abajo antes de correr este script (limitación
//      de lazy loading de esa página)
//   3. Abrí la consola del navegador (F12 → Console)
//   4. Pegá todo este script y presioná Enter
//   5. Esperá a que termine (puede tardar varios minutos)
//   6. Se descargará automáticamente "catalogo-gf-sparta.html"
//   7. Reemplazá el archivo en la carpeta catalogo/ del proyecto
//   8. Commitéalo y en 2 minutos está live en Netlify
// ============================================================

(async () => {
  const PHONE = '542612525922';
  const catalog = {};

  // Obtiene las pestañas válidas (excluye VER TODOS, ORDENAR, PROMO y similares)
  const getTabs = () => [...document.querySelectorAll('button')]
    .filter(b => {
      const text = b.innerText.trim().toUpperCase();
      return b.offsetParent &&
             text.length > 0 &&
             text !== 'VER TODOS' &&
             !text.includes('ORDENAR') &&
             !text.includes('PROMO') &&
             text.length < 50;
    });

  // Extrae productos visibles en pantalla
  const getProducts = () => {
    return [...document.querySelectorAll('a[href*="/product/"]')].map(card => {
      const texts = [...card.querySelectorAll('*')]
        .filter(el => el.children.length === 0)
        .map(el => el.innerText?.trim())
        .filter(t => t && t.length > 1);
      const name = texts.find(t => t && !/^\$/.test(t) && t.length > 2);
      const img = card.querySelector('img')?.src || '';
      const finalName = name || card.querySelector('img')?.alt?.trim();
      return finalName ? { name: finalName, img } : null;
    }).filter(Boolean);
  };

  // Scrollea hasta el final usando scrollIntoView (activa el lazy loading)
  const scrollAll = async () => {
    let lastCount = 0;
    let stable = 0;
    while (stable < 5) {
      const cards = document.querySelectorAll('a[href*="/product/"]');
      const last = cards[cards.length - 1];
      if (last) last.scrollIntoView({ behavior: 'smooth', block: 'end' });
      await new Promise(r => setTimeout(r, 2500));
      const count = document.querySelectorAll('a[href*="/product/"]').length;
      if (count === lastCount) { stable++; } else { stable = 0; lastCount = count; }
      console.log('  productos visibles:', count);
    }
  };

  // --- Escaneo por pestaña ---
  const tabs = getTabs();
  console.log('Pestañas a procesar:', tabs.map(t => t.innerText.trim()).join(', '));

  for (const tab of tabs) {
    const catName = tab.innerText.trim();
    console.log('\n▶ Procesando:', catName);
    tab.click();
    await new Promise(r => setTimeout(r, 2000));
    await scrollAll();
    const products = getProducts();
    if (products.length > 0) catalog[catName] = products;
    console.log('  ✓', catName + ':', products.length, 'productos');
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 800));
  }

  // --- Genera el HTML de las secciones ---
  let sectionsHtml = '';
  for (const [cat, products] of Object.entries(catalog)) {
    const catSafe = cat.replace(/"/g, '&quot;');
    sectionsHtml += `\n<section data-cat="${catSafe}">\n<h2>${cat} (${products.length})</h2>\n<div class="grid">`;
    for (const p of products) {
      const nameSafe = p.name
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const waMsg = encodeURIComponent('Hola Gastón, quiero consultar el precio de: ' + p.name);
      const waUrl = `https://wa.me/${PHONE}?text=${waMsg}`;
      sectionsHtml += `
<div class="card">
  <img src="${p.img}" alt="${nameSafe}" loading="lazy" onerror="this.style.display='none'">
  <div class="info">
    <p class="name">${nameSafe}</p>
    <a class="consulta" href="${waUrl}" target="_blank">Consultá el precio</a>
  </div>
</div>`;
    }
    sectionsHtml += '\n</div></section>';
  }

  // --- HTML completo con todas las funcionalidades ---
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Catálogo GF SPARTA</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#1a1a1a;color:#fff;font-family:'Montserrat',sans-serif;padding:24px}
.back-link{text-align:center;margin-bottom:16px}
.back-link a{display:inline-flex;align-items:center;gap:8px;color:#FF8C00;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;opacity:0.8;transition:opacity 0.2s}
.back-link a:hover{opacity:1}
.header{display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:32px}
.header img{height:80px;width:auto}
h1{color:#FF8C00;font-size:2rem;font-weight:900;letter-spacing:2px}
#search-bar{max-width:700px;margin:0 auto 30px;display:flex;flex-direction:column;gap:12px}
#search{width:100%;padding:12px 20px;background:#2d2d2d;border:2px solid rgba(255,140,0,0.4);border-radius:12px;color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s}
#search:focus{border-color:#FF8C00}
#search::placeholder{color:#555}
#cat-filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.cat-btn{background:#2d2d2d;border:1px solid rgba(255,140,0,0.3);color:#aaa;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Montserrat',sans-serif;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s}
.cat-btn:hover,.cat-btn.active{background:#FF8C00;color:#000;border-color:#FF8C00}
.no-results{text-align:center;color:#555;padding:40px;font-size:14px;display:none}
section{margin-bottom:50px}
h2{color:#FF8C00;font-size:1.2rem;font-weight:800;text-transform:uppercase;letter-spacing:1px;padding-bottom:8px;border-bottom:2px solid #FF8C00;margin-bottom:20px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}
.card{background:#2d2d2d;border-radius:12px;overflow:hidden;border:1px solid rgba(255,140,0,0.2)}
.card img{width:100%;height:150px;object-fit:cover;background:#111}
.info{padding:10px}
.name{font-size:10px;color:#aaa;text-transform:uppercase;line-height:1.4;margin-bottom:6px}
a.consulta{display:inline-flex;align-items:center;gap:5px;margin-top:4px;font-size:11px;font-weight:700;color:#25D366;text-decoration:none;transition:color 0.2s}
a.consulta:hover{color:#fff}
</style>
</head>
<body>

<div class="back-link">
  <a href="../index.html">&#8592; Volver al sitio</a>
</div>

<div class="header">
  <img src="../logo.jpeg" alt="GF SPARTA">
  <h1>CATÁLOGO GF SPARTA</h1>
</div>

<div id="search-bar">
  <input id="search" type="text" placeholder="Buscar producto..." autocomplete="off">
  <div id="cat-filters">
    <button class="cat-btn active" data-cat="all">Todos</button>
  </div>
</div>

<p class="no-results" id="no-results">No se encontraron productos.</p>

${sectionsHtml}

<script>
(function() {
  var filters = document.getElementById('cat-filters');
  document.querySelectorAll('section').forEach(function(sec) {
    var h2 = sec.querySelector('h2');
    if (!h2) return;
    var cat = sec.dataset.cat;
    var btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.dataset.cat = cat;
    btn.textContent = cat;
    filters.appendChild(btn);
  });

  var search = document.getElementById('search');
  var noResults = document.getElementById('no-results');

  function filterAll() {
    var q = search.value.toLowerCase().trim();
    var activeCat = (document.querySelector('.cat-btn.active') || {}).dataset.cat;
    var totalVisible = 0;
    document.querySelectorAll('section').forEach(function(sec) {
      var catMatch = activeCat === 'all' || sec.dataset.cat === activeCat;
      var secVisible = 0;
      sec.querySelectorAll('.card').forEach(function(card) {
        var name = card.querySelector('.name') ? card.querySelector('.name').textContent.toLowerCase() : '';
        var show = catMatch && name.includes(q);
        card.style.display = show ? '' : 'none';
        if (show) secVisible++;
      });
      sec.style.display = secVisible > 0 ? '' : 'none';
      totalVisible += secVisible;
    });
    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  }

  search.addEventListener('input', filterAll);

  document.getElementById('cat-filters').addEventListener('click', function(e) {
    var btn = e.target.closest('.cat-btn');
    if (!btn) return;
    document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    filterAll();
  });
})();
<\/script>
</body>
</html>`;

  // --- Descarga el archivo ---
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'catalogo-gf-sparta.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const total = Object.values(catalog).reduce((s, p) => s + p.length, 0);
  console.log('\n✅ Catálogo descargado: catalogo-gf-sparta.html');
  console.log('📦 Categorías:', Object.keys(catalog).join(', '));
  console.log('📊 Total productos:', total);
})();
