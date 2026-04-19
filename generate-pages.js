#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const CANON = 'https://parfum33ml.ma';

// ── Slugify (must match index.html exactly) ────────────────────────────────
function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[°'"'&]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── WhatsApp link ──────────────────────────────────────────────────────────
const WA = 'https://wa.me/212600000000';
function waProduct(name, brand, gender) {
  const msg = `Bonjour 👋\nJe souhaite commander :\n\n🛍️ ${name} — ${brand} (inspiré)\n📦 Format 33ml · 100 DH\n${gender === 'femme' ? '♀ Femme' : '♂ Homme'}\n\n📍 Ville :\n📱 Téléphone :`;
  return `${WA}?text=${encodeURIComponent(msg)}`;
}

// ── Nav & Footer ───────────────────────────────────────────────────────────
const NAV = `<nav class="static-nav">
  <a href="/" class="static-logo"><img src="/dossier%20parfum/logo-h.png" alt="Parfum33ml.ma" loading="eager"></a>
  <div class="static-nav-links">
    <a href="/parfums-femme">Femme</a>
    <a href="/parfums-homme">Homme</a>
    <a href="/coffrets">Coffrets</a>
    <a href="/blog">Blog</a>
  </div>
  <a href="${WA}" class="static-nav-cta" target="_blank" rel="noopener">Commander →</a>
</nav>`;

const FOOTER = `<footer class="static-footer">
<div class="footer-grid">
  <div class="footer-brand">
    <a href="/"><img src="/dossier%20parfum/logo-h.png" alt="Parfum33ml.ma" style="height:44px;mix-blend-mode:lighten;display:block;margin-bottom:12px"></a>
    <p>+100 fragrances inspirées en 33ml à 100 DH. Livraison rapide partout au Maroc.</p>
    <div class="trust-badges">
      <div class="trust-badge">🔒 Paiement sécurisé</div>
      <div class="trust-badge">📦 Livraison 24-48h</div>
      <div class="trust-badge">💬 WhatsApp 7j/7</div>
    </div>
  </div>
  <div>
    <h4>Navigation</h4>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/parfums-femme">Parfums Femme</a></li>
      <li><a href="/parfums-homme">Parfums Homme</a></li>
      <li><a href="/coffrets">Coffrets &amp; Packs</a></li>
      <li><a href="/parfum-du-mois">Parfum du Mois</a></li>
      <li><a href="/blog">Blog Parfum</a></li>
    </ul>
  </div>
  <div>
    <h4>Marques</h4>
    <ul>
      <li><a href="/parfums-inspires-chanel">Chanel</a></li>
      <li><a href="/parfums-inspires-dior">Dior</a></li>
      <li><a href="/parfums-inspires-ysl">YSL</a></li>
      <li><a href="/parfums-inspires-armani">Armani</a></li>
      <li><a href="/parfums-inspires-paco-rabanne">Paco Rabanne</a></li>
    </ul>
  </div>
  <div>
    <h4>Familles</h4>
    <ul>
      <li><a href="/parfums-floraux-maroc">Floraux</a></li>
      <li><a href="/parfums-orientaux-maroc">Orientaux</a></li>
      <li><a href="/parfums-boises-maroc">Boisés</a></li>
      <li><a href="/parfums-frais-maroc">Frais</a></li>
    </ul>
  </div>
  <div>
    <h4>Livraison</h4>
    <ul>
      <li><a href="/casablanca">Casablanca</a></li>
      <li><a href="/rabat">Rabat</a></li>
      <li><a href="/marrakech">Marrakech</a></li>
      <li><a href="/livraison-gratuite">Livraison Gratuite</a></li>
    </ul>
    <h4 style="margin-top:20px">Villes</h4>
    <div class="footer-cities">
      <a href="/casablanca">Casablanca</a><a href="/rabat">Rabat</a><a href="/marrakech">Marrakech</a>
      <a href="/">Tanger</a><a href="/">Fès</a><a href="/">Agadir</a>
    </div>
  </div>
</div>
<div class="footer-bottom">
  <span>© 2026 Parfum33ml.ma — Fragrances inspirées 33ml</span>
  <div class="footer-legal">
    <a href="/">Mentions légales</a>
    <a href="/">CGV</a>
  </div>
</div>
</footer>`;

function head({ title, desc, canonical, schema = [] }) {
  const schemas = schema.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
<base href="/">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<meta name="author" content="Parfum33ml.ma">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="fr_MA">
<meta property="og:image" content="${CANON}/android-chrome-512x512.png">
<meta property="og:site_name" content="Parfum33ml.ma">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${CANON}/android-chrome-512x512.png">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="fr-MA" href="${canonical}">
<link rel="alternate" hreflang="fr" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#080604">
${schemas}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static.css">
</head>
<body>`;
}

// ── Product data ───────────────────────────────────────────────────────────
const F = [
  {id:'f1',name:'Chanel N°5',brand:'Chanel',notes:['Aldéhydes','Ylang-Ylang','Jasmin','Rose','Santal'],best:1,family:'floral',desc:"Le parfum le plus iconique au monde, créé en 1921 par Ernest Beaux pour Gabrielle Chanel. Un accord floral aldéhydé d'une élégance intemporelle : aldéhydes pétillants, jasmin de Grasse, rose de Mai et ylang-ylang, ancrés sur un fond poudreux de santal, iris et vétiver. Porter Chanel N°5, c'est traverser un siècle d'élégance féminine."},
  {id:'f2',name:'J\'adore',brand:'Dior',notes:['Ylang-Ylang','Rose','Jasmin','Tubéreuse'],best:1,family:'floral',desc:"Une symphonie florale somptueuse imaginée par Calice Becker pour la maison Dior. L'ylang-ylang de Madagascar, la rose centifolia de Grasse et le jasmin de Grasse se fondent dans un sillage lumineux et solaire. La tubéreuse apporte une sensualité opulente, tandis que le fond vanillé laisse une empreinte délicate et addictive."},
  {id:'f3',name:'La Vie Est Belle',brand:'Lancôme',notes:['Iris','Patchouli','Praline','Gourmand'],best:1,family:'gourmand',desc:"L'iris de Florence rencontre la praline d'Orient et le patchouli dans un accord gourmand d'une douceur irrésistible. Créé par trois nez iconiques — Dominique Ropion, Anne Flipo et Loc Dong — ce parfum incarne la joie de vivre. Un sourire olfactif que des millions de femmes au Maroc ont adopté comme signature quotidienne."},
  {id:'f4',name:'Coco Mademoiselle',brand:'Chanel',notes:['Orange','Jasmin','Rose','Patchouli'],best:1,family:'oriental',desc:"Un oriental frais et moderne signé Jacques Polge pour Chanel. L'orange fraîche de Sicile s'ouvre sur un cœur vibrant de rose centifolia et de jasmin de Grasse, avant de s'installer sur un fond boisé-patchouli d'une élégance insolente. Le parfum de la parisienne — et de la Marocaine — confiante, libre et contemporaine."},
  {id:'f5',name:'Black Opium',brand:'YSL',notes:['Café','Vanille','Fleur d\'Oranger'],best:1,family:'gourmand',desc:"L'accord café-vanille le plus iconique de la parfumerie moderne. Des grains de café torréfiés s'entremêlent à la fleur d'oranger addictive sur un lit de vanille chaude, de cèdre blanc et de patchouli velouté. Un sillage rock, glamour et envoûtant qui dure toute la nuit — le best-seller absolu au Maroc."},
  {id:'f6',name:'Miss Dior',brand:'Dior',notes:['Rose','Pivoine','Iris','Musc'],family:'floral',desc:"Un hommage poétique à l'amour imaginé par François Demachy. La pivoine de printemps, la rose sauvage et l'iris s'entrelacent dans un floral cristallin et romantique, porté par un musc blanc de soie. Léger, frais et infiniment élégant, Miss Dior s'impose comme la signature olfactive de la femme romantique et indépendante."},
  {id:'f7',name:'Good Girl',brand:'Carolina Herrera',notes:['Tubéreuse','Jasmin','Cacao','Tonka'],family:'oriental',desc:"Sensuel et provocateur dans son flacon en forme de stiletto. La tubéreuse crémeuse et le jasmin s'allient au cacao amer et à la fève tonka chaude pour créer une fragrance duale : angélique en surface, irrésistiblement obscure en fond. Le parfum de la femme qui joue avec les codes."},
  {id:'f8',name:'Flowerbomb',brand:'Viktor & Rolf',notes:['Rose','Jasmin','Orchidée','Patchouli'],family:'floral',desc:"Une explosion florale baroque et addictive. La rose, le jasmin, l'orchidée et le patchouli se fondent dans un accord floral opulent et sensuel qui laisse un sillage flamboyant. Flowerbomb transforme chaque femme en une force de la nature — douce, mais impossible à ignorer."},
  {id:'f9',name:'Light Blue',brand:'Dolce & Gabbana',notes:['Cèdre','Pomme','Muguet','Jasmin'],family:'frais',desc:"La fraîcheur méditerranéenne en flacon. Parfait pour les étés marocains, Light Blue capture l'essence de la mer et des agrumes dans une fragrance légère et universelle."},
  {id:'f10',name:'Chance Eau Tendre',brand:'Chanel',notes:['Pamplemousse','Jasmin','Musc Blanc'],family:'floral',desc:"La légèreté et la joie encapsulées dans un flacon rond et coloré. Le pamplemousse de Floride et le jasmin blanc s'entrelacent sur un fond délicat de musc blanc poudré. Chance Eau Tendre est le parfum des matins lumineux, du bureau et des premières rencontres."},
  {id:'f11',name:'Mon Paris',brand:'YSL',notes:['Fraise','Pivoine','Patchouli','Ambre'],family:'fruité',desc:"Fruité, floral et intensément romantique. La fraise gourmande et la pivoine printanière s'allient au patchouli profond pour créer une fragrance moderne et addictive."},
  {id:'f12',name:'Libre',brand:'YSL',notes:['Lavande','Fleur d\'Oranger','Vanille'],family:'oriental',desc:"Lavande fraîche et vanille chaude. La liberté en flacon — un paradoxe olfactif entre fraîcheur aromatique et chaleur orientale qui incarne la femme libre et affirmée."},
  {id:'f13',name:'Idôle',brand:'Lancôme',notes:['Rose','Jasmin','Musc Blanc','Cèdre'],family:'floral',desc:"Le parfum de la nouvelle génération. Une rose moderne et lumineuse sur un fond de musc blanc et de cèdre, pour une fragrance florale épurée et contemporaine."},
  {id:'f14',name:'Sì',brand:'Giorgio Armani',notes:['Cassis','Rose','Musc','Vanille'],family:'oriental',desc:"Un oui à la vie. Force et grâce réunies dans un flacon élégant signé Armani. Le cassis acidulé ouvre sur une rose fraîche, ancrée sur un fond vanillé et musqué d'une douceur enveloppante."},
  {id:'f15',name:'Alien',brand:'Mugler',notes:['Jasmin Sambac','Ambre','Cachemire'],family:'oriental',desc:"Solaire et mystique. Un accord jasmin ambré unique qui crée une signature olfactive impossible à oublier. Alien est le parfum des femmes qui assument leur singularité — puissant, envoûtant, extraterrestre."},
  {id:'f16',name:'Angel',brand:'Mugler',notes:['Chocolat','Caramel','Patchouli','Vanille'],family:'gourmand',desc:"Le pionnier du gourmand. Révolutionnaire depuis 1992, Angel mêle le patchouli terreux au caramel et au chocolat pour créer un accord sucré-sombre absolument unique dans l'histoire de la parfumerie."},
  {id:'f17',name:'Gucci Bloom',brand:'Gucci',notes:['Tubéreuse','Jasmin','Rangoon'],family:'floral',desc:"Un jardin blanc luxuriant. Gucci Bloom capture l'essence d'un bouquet de fleurs blanches — tubéreuse, jasmin et rangoon — dans un accord floral riche, opulent et infiniment féminin."},
  {id:'f18',name:'Daisy',brand:'Marc Jacobs',notes:['Fraise','Violette','Jasmin','Musc'],family:'fruité',desc:"La fraîcheur printanière capturée en flacon. Daisy mêle la fraise juteuse à la violette délicate et au jasmin pour créer une fragrance jeune, lumineuse et irrésistiblement optimiste."},
  {id:'f19',name:'For Her',brand:'Narciso Rodriguez',notes:['Musc','Fleur d\'Oranger','Ambre'],family:'musqué',desc:"Le musc absolu. For Her de Narciso Rodriguez est une déclaration de sensualité pure — un musc blanc profond et envoûtant qui fusionne avec la peau pour créer une seconde nature unique."},
  {id:'f20',name:'My Way',brand:'Giorgio Armani',notes:['Fleur d\'Oranger','Tubéreuse','Bergamote'],family:'floral',desc:"Un floral solaire qui célèbre l'ouverture au monde. La fleur d'oranger d'Égypte et la bergamote de Calabre s'allient à la tubéreuse indienne dans un accord lumineux et voyageur."},
  {id:'f21',name:'Olympéa',brand:'Paco Rabanne',notes:['Vanille','Jasmin','Sel','Ambre'],family:'oriental',desc:"Oriental salé-vanillé addictif. Olympéa capture la puissance d'une déesse — eau de fleur de jasmin et vanille crémeuse sur un fond ambré et salin qui évoque les dieux de l'Olympe."},
  {id:'f22',name:'Burberry Her',brand:'Burberry',notes:['Baies Rouges','Jasmin','Musc'],family:'fruité',desc:"Fruité gourmand pétillant. Burberry Her mêle les baies rouges juteuses à un jasmin délicat sur un fond de musc doux — une fragrance moderne, accessible et universellement appréciée."},
  {id:'f23',name:'Paradoxe',brand:'Prada',notes:['Néroli','Jasmin','Ambre','Musc'],family:'oriental',desc:"La contradiction sublimée. Paradoxe de Prada joue sur les opposés : le néroli lumineux contre l'ambre chaud, le jasmin délicat contre le musc profond — une fragrance complexe et fascinante."},
  {id:'f24',name:'Donna Born in Roma',brand:'Valentino',notes:['Jasmin','Vanille Bourbon','Santal'],family:'gourmand',desc:"Jasmin et vanille bourbon en harmonie. Donna Born in Roma capture l'esprit de la Ville Éternelle — un floral gourmand sophistiqué entre la modernité romaine et la tradition parfumière italienne."},
  {id:'f25',name:'Twilly d\'Hermès',brand:'Hermès',notes:['Gingembre','Tubéreuse','Santal'],family:'floral',desc:"L'audace Hermès en format pocket. Gingembre piquant, tubéreuse crémeuse et santal doux — Twilly d'Hermès est la fragrance de la jeune femme qui s'approprie l'héritage Hermès à sa façon."},
  {id:'f26',name:'Joy',brand:'Dior',notes:['Bergamote','Rose','Jasmin','Santal'],family:'floral',desc:"La joie de vivre par Dior. Joy capture l'essence du bonheur en flacon — bergamote lumineuse, rose centifolia et jasmin de Grasse sur un fond de santal chaleureux et boisé."},
  {id:'f27',name:'Chloé EDP',brand:'Chloé',notes:['Pivoine','Litchi','Rose','Cèdre'],family:'floral',desc:"Féminité romantique et naturelle. Chloé EDP est une déclaration de douceur — pivoine printanière, litchi juteux et rose absolue sur un fond de cèdre élégant."},
  {id:'f28',name:'Crystal Noir',brand:'Versace',notes:['Gingembre','Gardénia','Ambre'],family:'oriental',desc:"Le mystère nocturne par Versace. Crystal Noir associe le gingembre épicé au gardénia sensuel sur un fond d'ambre chaleureux — une fragrance orientale sophistiquée pour les nuits étoilées."},
  {id:'f29',name:'Bright Crystal',brand:'Versace',notes:['Grenade','Pivoine','Magnolia','Musc'],family:'fruité',desc:"Lumineux et rafraîchissant. Bright Crystal mêle la grenade acidulée à la pivoine délicate et au magnolia blanc pour créer une fragrance fruitée-florale lumineuse et moderne."},
  {id:'f30',name:'Poison Girl',brand:'Dior',notes:['Rose','Amande Amère','Tonka','Vanille'],family:'gourmand',desc:"Rose-amande amère addictif. Poison Girl de Dior est une fragrance gourmande et sensuelle qui joue avec les contrastes — la rose romantique contre l'amande amère et la vanille opulente."},
  {id:'f31',name:'Baccarat Rouge 540',brand:'MFK',notes:['Jasmin','Safran','Ambre','Cèdre'],best:1,family:'oriental',desc:"Le phénomène olfactif mondial qui a bouleversé la parfumerie en 2015. Le jasmin sambac et le safran de Francis Kurkdjian se marient dans un accord ambre-cèdre cristallin absolument unique. Cette fragrance unisexe laisse sur la peau une luminosité dorée et boisée qui dure des heures."},
  {id:'f32',name:'Sì Passione',brand:'Giorgio Armani',notes:['Rose','Jasmin','Vanille','Cèdre'],family:'floral',desc:"La passion incarnée par Armani. Rose somptueuse, jasmin chaleureux et vanille douce sur un fond de cèdre élégant — Sì Passione est une déclaration d'amour olfactive intense et raffinée."},
  {id:'f33',name:'Fame',brand:'Paco Rabanne',notes:['Mangue','Jasmin','Encens','Vanille'],family:'gourmand',desc:"Mangue-encens inédit. Fame de Paco Rabanne est une fragrance audacieuse et inattendue — la mangue tropicale et l'encens mystique se fondent dans une harmonie gourmande et spirituelle."},
  {id:'f34',name:'Scandal',brand:'Jean Paul Gaultier',notes:['Miel','Gardénia','Caramel','Patchouli'],family:'gourmand',desc:"Miel-gardénia provocant. Scandal de JPG est une fragrance scandaleusement addictive — le miel ambré et le gardénia blanc s'allient au caramel et au patchouli dans un accord féminin et irrésistible."},
  {id:'f35',name:'Good Girl Supreme',brand:'Carolina Herrera',notes:['Fruits Rouges','Tubéreuse','Vanille'],family:'fruité',desc:"Version fruitée et lumineuse de Good Girl. Good Girl Supreme ajoute des fruits rouges juteux à la tubéreuse crémeuse — une version plus accessible et solaire du classique iconique."},
  {id:'f36',name:'Lady Million',brand:'Paco Rabanne',notes:['Framboise','Néroli','Jasmin','Miel'],family:'floral',desc:"Floral miel-framboise glamour. Lady Million est la fragrance de la femme dorée qui brille — framboise pétillante, jasmin blanc et miel d'acacia dans un accord féminin et luxueux."},
  {id:'f37',name:'Very Good Girl',brand:'Carolina Herrera',notes:['Litchi','Rose','Vétiver','Vanille'],family:'fruité',desc:"Litchi-rose-vanille gourmand. Very Good Girl capture la joie d'une journée parfaite — litchi frais, rose délicate et vanille douce sur un fond de vétiver terreux et rafraîchissant."},
  {id:'f38',name:'L\'Interdit',brand:'Givenchy',notes:['Tubéreuse','Fleur d\'Oranger','Vétiver'],family:'floral',desc:"Un floral sombre et envoûtant. L'Interdit de Givenchy joue sur la dualité — la tubéreuse lumineuse contre le vétiver obscur, la fleur d'oranger fraîche contre l'accord boisé profond."},
  {id:'f39',name:'Irresistible',brand:'Givenchy',notes:['Rose','Iris','Musc','Ambre'],family:'floral',desc:"Rose-iris lumineux et irrésistible. Irresistible de Givenchy capture la légèreté d'un bouquet de roses fraîchement cueillies — iris délicat, musc blanc et ambre doux."},
  {id:'f40',name:'Delina',brand:'Parfums de Marly',notes:['Litchi','Rose','Pivoine','Musc','Vanille'],best:1,family:'floral',desc:"La princesse des parfums niche, créée par Hamid Merati-Kashani. Le litchi juteux et la pivoine fraîche s'ouvrent sur un cœur de rose absolue de Turquie, posé sur un fond de musc blanc et de vanille de Madagascar. Delina est une déclaration d'élégance royale — féminité pure, précieuse et infiniment raffinée."},
  {id:'f41',name:'Chance EDP',brand:'Chanel',notes:['Patchouli','Jasmin','Vanille'],family:'oriental',desc:"La version la plus intense et charnelle de Chance. Le patchouli profond et la vanille chaude amplifient le jasmin de Grasse dans un accord oriental sophistiqué — idéal pour les soirées et les occasions spéciales."},
  {id:'f42',name:'Gabrielle',brand:'Chanel',notes:['Jasmin','Ylang','Tubéreuse','Oranger'],family:'floral',desc:"Bouquet de fleurs blanches lumineux. Gabrielle de Chanel est un hymne à la féminité — jasmin de Grasse, ylang-ylang de Comores, tubéreuse et néroli dans un accord floral blanc d'une pureté absolue."},
  {id:'f43',name:'The Scent For Her',brand:'Hugo Boss',notes:['Pêche','Freesia','Cacao','Vanille'],family:'gourmand',desc:"Pêche-cacao gourmand. The Scent For Her associe la pêche juteuse et le freesia délicat au cacao intense et à la vanille crémeuse pour créer une fragrance féminine et addictive."},
  {id:'f44',name:'212 VIP',brand:'Carolina Herrera',notes:['Passion','Musc','Santal'],family:'musqué',desc:"L'esprit VIP en flacon. 212 VIP de Carolina Herrera capture l'atmosphère exclusive des clubs new-yorkais — fruit de la passion exotique, musc sensuel et santal doux."},
  {id:'f45',name:'Trésor',brand:'Lancôme',notes:['Rose','Iris','Abricot','Musc','Vanille'],family:'floral',desc:"Floral poudré romantique. Trésor de Lancôme est une déclaration d'amour intemporelle — rose de mai, iris poudré et abricot délicat sur un fond de musc et de vanille enveloppants."},
  {id:'f46',name:'La Nuit Trésor',brand:'Lancôme',notes:['Rose','Orchidée','Chocolat','Vanille'],family:'gourmand',desc:"Rose-chocolat-vanille envoûtant. La Nuit Trésor est la version nocturne du classique Trésor — une fragrance plus intense, plus sensuelle, parfaite pour les soirées romantiques."},
  {id:'f47',name:'Because It\'s You',brand:'Emporio Armani',notes:['Framboise','Néroli','Rose','Vanille'],family:'fruité',desc:"L'amour en parfum. Because It's You d'Emporio Armani capture les émotions du coup de foudre — framboise pétillante, rose délicate et vanille douce dans un accord romantique et féminin."},
  {id:'f48',name:'Mon Guerlain',brand:'Guerlain',notes:['Lavande','Jasmin','Vanille','Santal'],family:'oriental',desc:"Lavande-vanille sensuel. Mon Guerlain est une ode à la féminité moderne — lavande de Provence, jasmin sambac et vanille tahitienne sur un fond de santal velouté."},
  {id:'f49',name:'Flower',brand:'Kenzo',notes:['Rose','Violette','Vanille','Musc'],family:'floral',desc:"Coquelicot poudré délicat. Flower de Kenzo est une fragrance iconique qui capture la simplicité d'un champ de fleurs — rose, violette et vanille dans un accord poudré et doux."},
  {id:'f50',name:'Classique',brand:'Jean Paul Gaultier',notes:['Rose','Fleur d\'Oranger','Vanille','Ambre'],family:'oriental',desc:"Oriental floral intemporel. Classique de Jean Paul Gaultier est une déclaration de féminité audacieuse — rose, fleur d'oranger et vanille dans un accord oriental sensuel et sophistiqué."}
];

const H = [
  {id:'h1',name:'Sauvage',brand:'Dior',notes:['Bergamote','Poivre','Ambroxan','Cèdre'],best:1,family:'boisé',desc:"Le n°1 mondial des parfums masculins, créé par François Demachy pour la maison Dior. La bergamote de Calabre explose en tête avec une fraîcheur intense, puis l'ambroxan magnétique et le poivre de Sichuan installent un sillage boisé désertique ample et viril. Un accord unique qui évoque les espaces sauvages."},
  {id:'h2',name:'Bleu de Chanel',brand:'Chanel',notes:['Menthe','Citron','Cèdre','Santal'],best:1,family:'boisé',desc:"L'élégance masculine absolue imaginée par Jacques Polge pour Chanel. La menthe fraîche et le citron s'ouvrent sur un cœur labdanum chaud, avant un fond de cèdre blanc et de santal du Mysore. Boisé aromatique et intemporel, Bleu de Chanel est la signature de l'homme moderne."},
  {id:'h3',name:'Acqua di Giò',brand:'Giorgio Armani',notes:['Bergamote','Néroli','Calone','Jasmin'],best:1,family:'aquatique',desc:"La fraîcheur marine iconique signée Alberto Morillas pour Giorgio Armani. La bergamote de Calabre et le néroli sicilien s'allient aux notes aquatiques de calone pour évoquer les côtes méditerranéennes. Un parfum qui capte l'essence de la mer en été."},
  {id:'h4',name:'1 Million',brand:'Paco Rabanne',notes:['Pamplemousse','Rose','Cannelle','Cuir'],best:1,family:'épicé',desc:"L'or et l'audace en flacon — l'épicé boisé provocant créé par trois nez de génie. Le pamplemousse et la rose ouvrent sur la cannelle chaude et le cuir doré. 1 Million est le parfum de l'homme qui revendique son succès et attire les regards."},
  {id:'h5',name:'Le Mâle',brand:'Jean Paul Gaultier',notes:['Menthe','Lavande','Vanille','Tonka'],family:'oriental',desc:"Le marin séducteur — une icône de la parfumerie masculine. La menthe fraîche et la lavande aromatique s'allient à la vanille crémeuse et à la fève tonka dans un accord oriental unique et reconnaissable entre tous."},
  {id:'h6',name:'Invictus',brand:'Paco Rabanne',notes:['Pamplemousse','Laurier','Ambre'],best:1,family:'frais',desc:"Le champion invaincu, l'athlète qui ne s'arrête jamais. Un accord frais-aquatique musclé et solaire : pamplemousse de Floride, laurier méditerranéen, gingembre frais sur un fond d'ambre boisé et musqué. Invictus est l'énergie, la victoire, le dynamisme."},
  {id:'h7',name:'Dior Homme',brand:'Dior',notes:['Iris','Bois','Musc','Vétiver'],family:'boisé',desc:"L'iris au masculin — une révolution olfactive signée Dior. Dior Homme réinvente l'iris en lui donnant une dimension boisée et poudreuse unique. Un parfum sophistiqué et raffiné pour l'homme élégant."},
  {id:'h8',name:'Aventus',brand:'Creed',notes:['Ananas','Bouleau','Patchouli','Musc'],best:1,family:'fruité',desc:"Le roi des parfums, la fragrance de référence du monde niche. L'ananas juteux et la bergamote explosive s'ouvrent sur un cœur de bouleau fumé et de jasmin, avant un fond de patchouli et de musc blanc. Aventus de Creed est porté par des leaders — maintenant accessible à 100 DH."},
  {id:'h9',name:'Allure Homme Sport',brand:'Chanel',notes:['Mandarine','Cèdre','Poivre','Tonka'],family:'frais',desc:"Le sportif élégant par Chanel. La mandarine fraîche et le poivre dynamique s'allient au cèdre boisé et à la tonka crémeuse pour créer un parfum frais et élégant, parfait pour un homme actif."},
  {id:'h10',name:'Y EDP',brand:'YSL',notes:['Pomme','Gingembre','Sauge','Ambre'],family:'boisé',desc:"Frais et intense — Y EDP est la version masculine moderne de YSL. La pomme fraîche et le gingembre épicé s'ouvrent sur la sauge aromatique, avant un fond d'ambre boisé profond et durable."},
  {id:'h11',name:'Boss Bottled',brand:'Hugo Boss',notes:['Pomme','Cannelle','Santal','Cèdre'],family:'boisé',desc:"Le parfum du succès. Boss Bottled de Hugo Boss est une fragrance intemporelle — pomme fraîche, cannelle épicée et cèdre boisé dans un accord masculin sophistiqué qui accompagne l'homme ambitieux."},
  {id:'h12',name:'Terre d\'Hermès',brand:'Hermès',notes:['Orange','Pamplemousse','Poivre','Vétiver'],family:'boisé',desc:"Boisé minéral et sophistiqué, imaginé par Jean-Claude Ellena pour Hermès. Le pamplemousse acidulé et l'orange sanguine s'ouvrent sur un cœur poivré vif, avant un fond de vétiver terreux et de silex — une note minérale unique qui évoque la terre après la pluie."},
  {id:'h13',name:'Eros',brand:'Versace',notes:['Menthe','Pomme Verte','Vanille','Tonka'],family:'oriental',desc:"Menthe-vanille puissant — Eros de Versace incarne la force et la séduction masculine. La menthe fraîche et la pomme verte s'allient à la vanille crémeuse et à la tonka dans un accord oriental dynamique."},
  {id:'h14',name:'Armani Code',brand:'Giorgio Armani',notes:['Bergamote','Olive','Tonka','Guaiac'],family:'oriental',desc:"Le code de la séduction. Armani Code est une fragrance orientale sophistiquée — bergamote fraîche, olivier méditerranéen et guaiac boisé dans un accord chaud et envoûtant."},
  {id:'h15',name:'Gentleman',brand:'Givenchy',notes:['Iris','Lavande','Patchouli','Cèdre'],family:'boisé',desc:"Élégant et raffiné — Gentleman de Givenchy réinterprète l'iris masculin dans un accord boisé-aromatique moderne. Lavande provençale, patchouli profond et cèdre élégant."},
  {id:'h16',name:'Light Blue Pour Homme',brand:'Dolce & Gabbana',notes:['Bergamote','Mandarine','Romarin'],family:'frais',desc:"Parfait pour l'été marocain. Light Blue Pour Homme capture la fraîcheur méditerranéenne — bergamote, mandarine et romarin dans un accord marin léger et universel."},
  {id:'h17',name:'The One',brand:'Dolce & Gabbana',notes:['Gingembre','Basilic','Ambre','Tabac'],family:'oriental',desc:"Tabac-ambre chaleureux. The One de D&G est une fragrance orientale sophistiquée — gingembre épicé, basilic frais et tabac golden sur un fond d'ambre chaud et de santal profond."},
  {id:'h18',name:'Stronger With You',brand:'Emporio Armani',notes:['Cannelle','Poivre','Vanille','Châtaigne'],family:'gourmand',desc:"Cannelle-châtaigne réconfortant. Stronger With You est une fragrance gourmande et masculine — la chaleur de la cannelle et de la châtaigne rôtie sur un fond de vanille douce et de patchouli."},
  {id:'h19',name:'Phantom',brand:'Paco Rabanne',notes:['Citron','Lavande','Vanille','Styrax'],family:'oriental',desc:"Le futur de la parfumerie masculine. Phantom de Paco Rabanne est une fragrance futuriste — citron lumineux, lavande aromatique et vanille crémeuse dans un accord styraxé unique."},
  {id:'h20',name:'Bad Boy',brand:'Carolina Herrera',notes:['Poivre','Cèdre','Tonka','Cacao'],family:'boisé',desc:"Poivre-cèdre électrique. Bad Boy de Carolina Herrera est une fragrance masculine puissante — poivre noir électrique, cèdre boisé et cacao amer sur un fond de tonka douce."},
  {id:'h21',name:'La Nuit de L\'Homme',brand:'YSL',notes:['Cardamome','Cèdre','Lavande','Vétiver'],family:'épicé',desc:"Cardamome-lavande sensuel. La Nuit de L'Homme est la fragrance de séduction masculine par excellence — cardamome épicée, lavande aromatique et vétiver terreux dans un accord oriental irrésistible."},
  {id:'h22',name:'Spicebomb',brand:'Viktor & Rolf',notes:['Poivre','Safran','Tabac','Cuir'],family:'épicé',desc:"Cocktail explosif. Spicebomb est une bombe olfactive épicée — poivre noir, safran doré, tabac intense et cuir brut dans un accord masculin puissant et audacieux."},
  {id:'h23',name:'Luna Rossa Carbon',brand:'Prada',notes:['Bergamote','Poivre','Lavande','Ambroxan'],family:'boisé',desc:"Minéral et moderne. Luna Rossa Carbon de Prada capture l'esprit de la course nautique — bergamote fraîche, poivre vif et lavande aromatique sur un fond ambroxan magnétique."},
  {id:'h24',name:'Layton',brand:'Parfums de Marly',notes:['Pomme','Lavande','Vanille','Cardamome'],best:1,family:'oriental',desc:"Le roi du parfum niche oriental, créé par Quentin Bisch pour Parfums de Marly. La pomme juteuse et la lavande aromatique s'ouvrent sur un cœur de cardamome et de géranium, avant un fond de vanille Bourbon crémeuse et de santal. Layton est l'accord ultime entre fraîcheur et chaleur."},
  {id:'h25',name:'L\'Homme',brand:'YSL',notes:['Gingembre','Bergamote','Vétiver','Cèdre'],family:'boisé',desc:"Élégant et équilibré. L'Homme de YSL est une fragrance masculine intemporelle — bergamote fraîche, gingembre épicé et vétiver terreux sur un fond de cèdre boisé."},
  {id:'h26',name:'Guilty Pour Homme',brand:'Gucci',notes:['Lavande','Cèdre','Patchouli','Ambre'],family:'oriental',desc:"Fougère aromatique moderne. Guilty Pour Homme de Gucci est une fragrance masculine sophistiquée — lavande provençale, patchouli profond et ambre chaud dans un accord oriental élégant."},
  {id:'h27',name:'Wanted',brand:'Azzaro',notes:['Citron','Gingembre','Tonka','Vétiver'],family:'épicé',desc:"Épicé et charismatique. Wanted d'Azzaro capture le magnétisme masculin — citron acidulé, gingembre piquant et tonka douce sur un fond de vétiver terreux."},
  {id:'h28',name:'Explorer',brand:'Montblanc',notes:['Bergamote','Vétiver','Patchouli','Cacao'],family:'boisé',desc:"Boisé-cacao aventurier. Explorer de Montblanc invite à la découverte — bergamote fraîche, vétiver terreux et cacao intense dans un accord boisé riche et masculin."},
  {id:'h29',name:'Ombré Leather',brand:'Tom Ford',notes:['Cuir','Cardamome','Jasmin','Patchouli'],family:'cuiré',desc:"Le cuir absolu. Ombré Leather de Tom Ford est une ode au cuir masculin — cardamome épicée, jasmin sensuel et patchouli profond dans un accord cuiré intense et sophistiqué."},
  {id:'h30',name:'Baccarat Rouge 540',brand:'MFK',notes:['Jasmin','Safran','Ambre','Cèdre'],best:1,family:'oriental',desc:"Le joyau unisexe accessible. Baccarat Rouge 540 de MFK est la fragrance de prestige par excellence — jasmin sambac, safran et ambre bois dans un accord cristallin unique qui laisse un sillage inoubliable."},
  {id:'h31',name:'Dylan Blue',brand:'Versace',notes:['Bergamote','Pamplemousse','Ambroxan'],family:'frais',desc:"Frais et masculin. Dylan Blue de Versace est une fragrance aquatique moderne — bergamote lumineuse, pamplemousse juteux et ambroxan magnétique dans un accord marin élégant."},
  {id:'h32',name:'Uomo Born in Roma',brand:'Valentino',notes:['Gingembre','Sauge','Bois de Gaïac'],family:'boisé',desc:"Épicé et moderne. Uomo Born in Roma capture l'esprit de la Rome contemporaine — gingembre épicé, sauge aromatique et bois de gaïac dans un accord boisé-épicé sophistiqué."},
  {id:'h33',name:'Scandal Pour Homme',brand:'Jean Paul Gaultier',notes:['Caramel','Tonka','Vétiver'],family:'gourmand',desc:"Caramel-vétiver provocant. Scandal Pour Homme de JPG est une fragrance masculine gourmande et audacieuse — caramel ambré, tonka douce et vétiver terreux dans un accord unique."},
  {id:'h34',name:'Encre Noire',brand:'Lalique',notes:['Vétiver','Cyprès','Mousse de Chêne'],family:'boisé',desc:"Vétiver pur et élégant. Encre Noire de Lalique est une déclaration de sophistication masculine — vétiver haïtien pur, cyprès et mousse de chêne dans un accord boisé-terreux minimaliste."},
  {id:'h35',name:'Pegasus',brand:'Parfums de Marly',notes:['Amande','Héliotrope','Vanille','Santal'],family:'oriental',desc:"Amande-vanille-santal noble. Pegasus de Parfums de Marly est une fragrance orientale de prestige — amande douce, héliotrope poudré et vanille crémeuse sur un fond de santal chaleureux."},
  {id:'h36',name:'CH Men',brand:'Carolina Herrera',notes:['Bergamote','Santal','Musc','Cuir'],family:'cuiré',desc:"Cuir-santal raffiné. CH Men de Carolina Herrera est une fragrance masculine élégante — bergamote fraîche, santal crémeux et cuir raffiné dans un accord boisé-cuiré sophistiqué."},
  {id:'h37',name:'Cedrat Boisé',brand:'Mancera',notes:['Citron','Cassis','Cuir','Cèdre'],family:'frais',desc:"Citron-cuir vif. Cedrat Boisé de Mancera est une fragrance niche puissante — cédrat acidulé, cassis fruité et cuir brut sur un fond de cèdre boisé intense."},
  {id:'h38',name:'Invictus Victory',brand:'Paco Rabanne',notes:['Encens','Laurier','Ambre','Gaïac'],family:'oriental',desc:"Plus intense que l'original. Invictus Victory amplifie l'énergie du champion — encens mystique, laurier méditerranéen et gaïac boisé dans un accord oriental puissant."},
  {id:'h39',name:'K by D&G',brand:'Dolce & Gabbana',notes:['Orange','Cèdre','Piment','Lavande'],family:'boisé',desc:"Le roi méditerranéen. K by D&G capture l'esprit du soleil et de la mer — orange sicilienne, lavande aromatique et piment épicé sur un fond de cèdre majestueux."},
  {id:'h40',name:'Kenzo Homme',brand:'Kenzo',notes:['Bois Aquatique','Yuzu','Poivre'],family:'aquatique',desc:"Aquatique boisé frais. Kenzo Homme est une fragrance masculine rafraîchissante — bois aquatique unique, yuzu japonais et poivre vif dans un accord frais et contemporain."},
  {id:'h41',name:'Sauvage Elixir',brand:'Dior',notes:['Grapefruit','Cannelle','Lavande','Ambre'],best:1,family:'épicé',desc:"La version la plus intense et concentrée de Sauvage — une formule elixir d'une puissance rare. La bergamote de Calabre et la cannelle de Ceylan s'ouvrent sur la lavande provençale, avant un fond d'ambre franc et de santal chaud d'une profondeur exceptionnelle."},
  {id:'h42',name:'Tobacco Vanille',brand:'Tom Ford',notes:['Tabac','Vanille','Cacao','Fruits Secs'],family:'oriental',desc:"Tabac-vanille opulent. Tobacco Vanille de Tom Ford est une fragrance orientale luxueuse — tabac golden, vanille de Madagascar et cacao amer dans un accord warm et sophistiqué."},
  {id:'h43',name:'Percival',brand:'Parfums de Marly',notes:['Lavande','Néroli','Musc','Ambroxan'],family:'frais',desc:"Lavande-musc clean. Percival de Parfums de Marly est une fragrance fraîche et élégante — lavande provençale, néroli ensoleillé et ambroxan magnétique dans un accord clean et moderne."},
  {id:'h44',name:'The Scent',brand:'Hugo Boss',notes:['Gingembre','Maninka','Cuir','Lavande'],family:'cuiré',desc:"Gingembre-cuir sophistiqué. The Scent de Hugo Boss est une fragrance masculine envoûtante — gingembre épicé, maninka fruité et cuir raffiné dans un accord séduisant."},
  {id:'h45',name:'Ultra Male',brand:'Jean Paul Gaultier',notes:['Poire','Lavande','Vanille','Ambre'],family:'gourmand',desc:"Le Mâle version ultra. Ultra Male est une fragrance plus intense et gourmande — poire juteuse, lavande aromatique et vanille crémeuse dans un accord oriental puissant."},
  {id:'h46',name:'Jimmy Choo Man',brand:'Jimmy Choo',notes:['Lavande','Ananas','Suède','Patchouli'],family:'boisé',desc:"Fruité-suède élégant. Jimmy Choo Man associe l'ananas tropical à la lavande aromatique et au suède doux dans un accord boisé-fruité sophistiqué."},
  {id:'h47',name:'L\'Homme Idéal',brand:'Guerlain',notes:['Amande','Cerise','Cuir','Santal'],family:'gourmand',desc:"Amande-cerise-cuir irrésistible. L'Homme Idéal de Guerlain est une fragrance masculine gourmande et élégante — amande douce, cerise acidulée et cuir raffiné sur un fond de santal chaleureux."},
  {id:'h48',name:'Legend',brand:'Montblanc',notes:['Bergamote','Lavande','Santal','Tonka'],family:'boisé',desc:"La légende. Frais et universel, Legend de Montblanc est une fragrance masculine intemporelle — bergamote fraîche, lavande aromatique et santal crémeux dans un accord boisé élégant."},
  {id:'h49',name:'The Most Wanted',brand:'Azzaro',notes:['Cardamome','Toffee','Ambre','Cèdre'],family:'gourmand',desc:"Toffee-cardamome addictif. The Most Wanted d'Azzaro est une fragrance masculine séduisante — cardamome épicée, toffee caramelé et ambre chaud dans un accord oriental gourmand."},
  {id:'h50',name:'Gris Charnel',brand:'BDK Parfums',notes:['Iris','Figue','Musc','Santal'],family:'boisé',desc:"Iris-figue sophistiqué. Gris Charnel de BDK Parfums est une fragrance niche élégante — iris poudré, figue crémeuse et musc blanc sur un fond de santal chaleureux."}
];

const PROD_IMG = {
  'f1':'dossier%20parfum/parfum/chanel%20n5%20600-800.jpg',
  'f2':'dossier%20parfum/parfum/dior%20j\'adore%20600-800.jpg',
  'f3':'dossier%20parfum/parfum/lancome%20la%20vie%20est%20belle%20600-800.jpg',
  'f4':'dossier%20parfum/parfum/chanel%20coco%20mademoiselle%20600-800.jpg',
  'f5':'dossier%20parfum/parfum/black%20opium%20600-800.jpg',
  'f6':'dossier%20parfum/parfum/Dior%20miss%20dior%20600-800.jpg',
  'f7':'dossier%20parfum/parfum/carolina%20herrera%20good%20girl%20600-800.jpg',
  'f8':'dossier%20parfum/parfum/victor%20%26%20rolf%20flowerbomb%20600-800.jpg',
  'f9':'dossier%20parfum/parfum/dolce%20gabbana%20light%20blue%20600-800.jpg',
  'f10':'dossier%20parfum/parfum/chanel%20chance%20eau%20tendre%20600-800.jpg',
  'f11':'dossier%20parfum/parfum/YSL%20mon%20paris%20600-800.jpg',
  'f12':'dossier%20parfum/parfum/YSL%20Libre%20600-800.jpg',
  'f13':'dossier%20parfum/parfum/Lancome%20idole%20600-800.jpg',
  'f14':'dossier%20parfum/parfum/giorgio%20armani%20Si%20600-800.jpg',
  'f15':'dossier%20parfum/parfum/mugler%20alien%20600-800.jpg',
  'f16':'dossier%20parfum/parfum/mugler%20angel%20600-800.jpg',
  'f17':'dossier%20parfum/parfum/Gucci%20Gucci%20bloom%20600-800.jpg',
  'f18':'dossier%20parfum/parfum/Marc%20jacobs%20daisy%20600-800.jpg',
  'f19':'dossier%20parfum/parfum/Narciso%20Rodriguez%20for%20her%20600-800.jpg',
  'f20':'dossier%20parfum/parfum/giorgio%20armani%20my%20way%20600-800.jpg',
  'f21':'dossier%20parfum/parfum/Paco%20Rabanne%20olympea%20600-800.jpg',
  'f22':'dossier%20parfum/parfum/Burberry%20burberry%20her%20600-800.jpg',
  'f23':'dossier%20parfum/parfum/Prada%20Paradoxe%20600-800.jpg',
  'f24':'dossier%20parfum/parfum/Valentino%20Donna%20Born%20in%20Roma%20600-800.jpg',
  'f25':'dossier%20parfum/parfum/Herm%C3%A8s%20Twilly%20d\'Herm%C3%A8s%20600-800.jpg',
  'f26':'dossier%20parfum/parfum/Dior%20Joy%20600-800.jpg',
  'f27':'dossier%20parfum/parfum/Chlo%C3%A9%20Chlo%C3%A9%20EDP%20600-800.jpg',
  'f28':'dossier%20parfum/parfum/Versace%20Crystal%20Noir%20600-800.jpg',
  'f29':'dossier%20parfum/parfum/Versace%20Bright%20Crystal%20600-800.jpg',
  'f30':'dossier%20parfum/parfum/Dior%20Poison%20Girl%20600-800.jpg',
  'f31':'dossier%20parfum/parfum/mfk%20baccarat%20rouge%20540%20600-800.jpg',
  'f32':'dossier%20parfum/parfum/Giorgio%20Armani%20S%C3%AC%20Passione%20600-800.jpg',
  'f33':'dossier%20parfum/parfum/Paco%20Rabanne%20Fame%20600-800.jpg',
  'f34':'dossier%20parfum/parfum/Jean%20Paul%20Gaultier%20Scandal%20600-800.jpg',
  'f35':'dossier%20parfum/parfum/Carolina%20Herrera%20Good%20Girl%20Supreme%20600-800.jpg',
  'f36':'dossier%20parfum/parfum/Paco%20Rabanne%20Lady%20Million%20600-800.jpg',
  'f37':'dossier%20parfum/parfum/Carolina%20Herrera%20Very%20Good%20Girl%20600-800.jpg',
  'f38':'dossier%20parfum/parfum/Givenchy%20L\'Interdit%20600-800.jpg',
  'f39':'dossier%20parfum/parfum/Givenchy%20Irresistible%20600-800.jpg',
  'f40':'dossier%20parfum/parfum/Parfums%20de%20Marly%20Delina%20600-800.jpg',
  'f41':'dossier%20parfum/parfum/Chanel%20Chance%20EDP%20600-800.jpg',
  'f42':'dossier%20parfum/parfum/chanel%20Gabrielle%20600-800.jpg',
  'f43':'dossier%20parfum/parfum/Hugo%20Boss%20The%20Scent%20For%20Her%20600-800.jpg',
  'f44':'dossier%20parfum/parfum/Carolina%20Herrera%20212%20VIP%20600-800.jpg',
  'f45':'dossier%20parfum/parfum/Lanc%C3%B4me%20Tr%C3%A9sor%20600-800.jpg',
  'f46':'dossier%20parfum/parfum/Lanc%C3%B4me%20La%20Nuit%20Tr%C3%A9sor%20600-800.jpg',
  'f47':'dossier%20parfum/parfum/Emporio%20Armani%20Because%20It\'s%20You%20600-800.jpg',
  'f48':'dossier%20parfum/parfum/Guerlain%20Mon%20Guerlain%20600-800.jpg',
  'f49':'dossier%20parfum/parfum/Kenzo%20Flower%20600-800.jpg',
  'f50':'dossier%20parfum/parfum/Jean%20Paul%20Gaultier%20Classique%20600-800.jpg',
  'h1':'dossier%20parfum/parfum/dior%20sauvage%20600-800.jpg',
  'h2':'dossier%20parfum/parfum/chanel%20bleu%20de%20channel%20600-800.jpg',
  'h3':'dossier%20parfum/parfum/giorgio%20armani%20acqua%20di%20gio%20600-800.jpg',
  'h4':'dossier%20parfum/parfum/paco%20rabanne%201%20million%20600-800.jpg',
  'h5':'dossier%20parfum/parfum/Jean%20Paul%20Gaultier%20Le%20M%C3%A2le%20600-800.jpg',
  'h6':'dossier%20parfum/parfum/paco%20rabanne%20invictus%20600-800.jpg',
  'h7':'dossier%20parfum/parfum/Dior%20Dior%20Homme%20600-800.jpg',
  'h8':'dossier%20parfum/parfum/creed%20aventus%20600-800.jpg',
  'h9':'dossier%20parfum/parfum/Chanel%20Allure%20Homme%20Sport%20600-800.jpg',
  'h10':'dossier%20parfum/parfum/YSL%20Y%20EDP%20600-800.jpg',
  'h11':'dossier%20parfum/parfum/Hugo%20Boss%20Boss%20Bottled%20600-800.jpg',
  'h12':'dossier%20parfum/parfum/Herm%C3%A8s%20Terre%20d\'Herm%C3%A8s%20600-800.jpg',
  'h13':'dossier%20parfum/parfum/Versace%20Eros%20600-800.jpg',
  'h14':'dossier%20parfum/parfum/Giorgio%20Armani%20Armani%20Code%20600-800.jpg',
  'h15':'dossier%20parfum/parfum/Givenchy%20Gentleman%20600-800.jpg',
  'h16':'dossier%20parfum/parfum/Dolce%20%26%20Gabbana%20Light%20Blue%20Pour%20Homme%20600-800.jpg',
  'h17':'dossier%20parfum/parfum/Dolce%20%26%20Gabbana%20The%20One%20600-800.jpg',
  'h18':'dossier%20parfum/parfum/Emporio%20Armani%20Stronger%20With%20You%20600-800.jpg',
  'h19':'dossier%20parfum/parfum/Paco%20Rabanne%20Phantom%20600-800.jpg',
  'h20':'dossier%20parfum/parfum/Carolina%20Herrera%20Bad%20Boy%20600-800.jpg',
  'h21':'dossier%20parfum/parfum/YSL%20La%20Nuit%20de%20L\'Homme%20600-800.jpg',
  'h22':'dossier%20parfum/parfum/Viktor%20%26%20Rolf%20Spicebomb%20600-800.jpg',
  'h23':'dossier%20parfum/parfum/Prada%20Luna%20Rossa%20Carbon%20600-800.jpg',
  'h24':'dossier%20parfum/parfum/Parfums%20de%20marly%20layton%20600-800.jpg',
  'h25':'dossier%20parfum/parfum/YSL%20L\'Homme%20600-800.jpg',
  'h26':'dossier%20parfum/parfum/Gucci%20Guilty%20Pour%20Homme%20600-800.jpg',
  'h27':'dossier%20parfum/parfum/Azzaro%20Wanted%20600-800.jpg',
  'h28':'dossier%20parfum/parfum/Montblanc%20Explorer%20600-800.jpg',
  'h29':'dossier%20parfum/parfum/Tom%20Ford%20Ombr%C3%A9%20Leather%20600-800.jpg',
  'h30':'dossier%20parfum/parfum/mfk%20baccarat%20rouge%20540%20600-800.jpg',
  'h31':'dossier%20parfum/parfum/Versace%20Dylan%20Blue%20600-800.jpg',
  'h32':'dossier%20parfum/parfum/Valentino%20Donna%20Born%20in%20Roma%20600-800.jpg',
  'h33':'dossier%20parfum/parfum/Jean%20Paul%20Gaultier%20Scandal%20Pour%20Homme%20600-800.jpg',
  'h34':'dossier%20parfum/parfum/Lalique%20Encre%20Noire%20600-800.jpg',
  'h35':'dossier%20parfum/parfum/Parfums%20de%20Marly%20Pegasus%20600-800.jpg',
  'h36':'dossier%20parfum/parfum/Carolina%20Herrera%20CH%20Men%20600-800.jpg',
  'h37':'dossier%20parfum/parfum/Mancera%20Cedrat%20Bois%C3%A9%20600-800.jpg',
  'h38':'dossier%20parfum/parfum/Paco%20Rabanne%20Invictus%20Victory%20600-800.jpg',
  'h39':'dossier%20parfum/parfum/Dolce%20%26%20Gabbana%20K%20by%20D%26G%20600-800.jpg',
  'h40':'dossier%20parfum/parfum/Kenzo%20Homme%20600-800.jpg',
  'h41':'dossier%20parfum/parfum/Dior%20Sauvage%20Elixir%20600-800.jpg',
  'h42':'dossier%20parfum/parfum/Tom%20Ford%20Tobacco%20Vanille%20600-800.jpg',
  'h43':'dossier%20parfum/parfum/Parfums%20de%20Marly%20Percival%20600-800.jpg',
  'h44':'dossier%20parfum/parfum/Hugo%20Boss%20The%20Scent%20600-800.jpg',
  'h45':'dossier%20parfum/parfum/Jean%20Paul%20Gaultier%20Ultra%20Male%20600-800.jpg',
  'h46':'dossier%20parfum/parfum/Jimmy%20Choo%20Jimmy%20Choo%20Man%20600-800.jpg',
  'h47':'dossier%20parfum/parfum/Guerlain%20L\'Homme%20Id%C3%A9al%20600-800.jpg',
  'h48':'dossier%20parfum/parfum/Montblanc%20legend%20600-800.jpg',
  'h49':'dossier%20parfum/parfum/Azzaro%20The%20Most%20Wanted%20600-800.jpg',
  'h50':'dossier%20parfum/parfum/BDK%20Parfums%20Gris%20Charnel%20600-800.jpg',
};

const FAMILY_LABELS = {
  floral:'Floral',oriental:'Oriental',boisé:'Boisé',frais:'Frais',
  aquatique:'Aquatique',gourmand:'Gourmand',fruité:'Fruité',
  musqué:'Musqué',épicé:'Épicé',cuiré:'Cuiré',
};

// ── Generate product fiche ─────────────────────────────────────────────────
function genProduct(p, gender) {
  const slug = slugify(p.name);
  const url = `/parfums-${gender}/${slug}`;
  const canonical = CANON + url;
  const img = PROD_IMG[p.id] || '';
  const genderLabel = gender === 'femme' ? 'Femme' : 'Homme';
  const familyLabel = FAMILY_LABELS[p.family] || p.family;
  const notesStr = p.notes.join(', ');
  const titleStr = `${p.name} ${p.brand} — Fragrance inspirée 33ml à 100 DH | Parfum33ml.ma`;
  const descStr = `Fragrance inspirée de ${p.name} ${p.brand} en 33ml à 100 DH. Notes : ${notesStr}. Livraison 24-48h partout au Maroc.`;

  const schema = [
    {
      '@context':'https://schema.org','@type':'Product',
      name:`${p.name} ${p.brand} — Fragrance Inspirée 33ml`,
      description:p.desc,
      image:`${CANON}/${img}`,
      brand:{'@type':'Brand',name:'Parfum33ml.ma'},
      offers:{
        '@type':'Offer',price:'100',priceCurrency:'MAD',
        availability:'https://schema.org/InStock',
        url:canonical,seller:{'@type':'Organization',name:'Parfum33ml.ma'}
      }
    },
    {
      '@context':'https://schema.org','@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Accueil',item:CANON},
        {'@type':'ListItem',position:2,name:`Parfums ${genderLabel}`,item:`${CANON}/parfums-${gender}`},
        {'@type':'ListItem',position:3,name:`${p.name} ${p.brand}`,item:canonical}
      ]
    }
  ];

  const noteTags = p.notes.map(n => `<span class="note-tag">${n}</span>`).join('');
  const bestBadge = p.best ? '<span class="article-tag" style="background:rgba(90,158,111,.1);color:var(--green);border-color:rgba(90,158,111,.2)">⭐ Best-seller</span>' : '';

  return `${head({title:titleStr,desc:descStr,canonical,schema})}
${NAV}

<div class="breadcrumb">
  <a href="/">Accueil</a><span class="sep">›</span>
  <a href="/parfums-${gender}">Parfums ${genderLabel}</a><span class="sep">›</span>
  <span>${p.name}</span>
</div>

<div class="prod-hero">
  <div class="prod-img-wrap">
    ${img ? `<img src="/${img}" alt="${p.name} ${p.brand} — fragrance inspirée 33ml Maroc" loading="eager">` : ''}
  </div>
  <div class="prod-info">
    <div class="prod-brand">${p.brand} · ${familyLabel}</div>
    <h1>${p.name} <span style="font-weight:400;font-size:.75em;color:var(--txt2)">inspiré</span></h1>
    ${bestBadge}
    <div class="prod-price">100 DH <span style="font-size:16px;font-family:var(--ff-b);color:var(--txt3);font-weight:400">— 33ml</span></div>
    <div class="prod-notes">${noteTags}</div>
    <p class="prod-desc">${p.desc}</p>
    <div class="prod-cta">
      <a href="${waProduct(p.name, p.brand, gender)}" class="btn-p" target="_blank" rel="noopener">💬 Commander →</a>
      <a href="/parfums-${gender}" class="btn-o">← Voir tout ${genderLabel}</a>
    </div>
  </div>
</div>

<div class="prod-section">
  <h2>Pourquoi choisir ${p.name} ${p.brand} ?</h2>
  <p>${p.desc}</p>
  <p>Notre fragrance inspirée de <strong>${p.name}</strong> vous offre le même profil olfactif — notes de <strong>${notesStr}</strong> — dans un format pocket de 33ml, idéal pour varier vos fragrances ou découvrir cet univers olfactif à 100 DH seulement.</p>
</div>

<div class="prod-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Informations sur la fragrance</h2>
  <p><strong>Genre :</strong> ${genderLabel}</p>
  <p><strong>Famille olfactive :</strong> ${familyLabel}</p>
  <p><strong>Notes de tête/cœur/fond :</strong> ${notesStr}</p>
  <p><strong>Format :</strong> 33ml — Format pocket, parfait pour le sac ou les voyages</p>
  <p><strong>Prix :</strong> 100 DH — fixe, sans surprise</p>
  <p><strong>Livraison :</strong> 24-48h partout au Maroc. Gratuite dès 3 flacons.</p>
  <p><strong>Paiement :</strong> Cash · CashPlus · Wafacash · Barid Cash · Virement</p>
</div>

<div class="prod-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Explorez nos autres fragrances</h2>
  <p>Découvrez notre collection complète de ${gender === 'femme' ? '50 parfums féminins' : '50 parfums masculins'} — toutes les grandes maisons à 100 DH le 33ml.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px">
    <a href="/parfums-${gender}" class="btn-p">Voir les ${gender === 'femme' ? '50 parfums femme' : '50 parfums homme'} →</a>
    <a href="/parfums-${p.family === 'floral' ? 'floraux' : p.family === 'oriental' ? 'orientaux' : p.family === 'boisé' ? 'boises' : p.family === 'frais' || p.family === 'aquatique' ? 'frais' : 'orientaux'}-maroc" class="btn-o">Famille ${familyLabel}</a>
  </div>
</div>

<div class="article-cta" style="max-width:1100px;margin:0 auto 48px;padding:28px 24px">
  <h3 style="font-family:var(--ff-d);font-size:22px;margin-bottom:8px">Commandez ${p.name} maintenant</h3>
  <p style="color:var(--txt2);font-size:14px;margin-bottom:16px">33ml · 100 DH · Livraison 24-48h au Maroc</p>
  <a href="${waProduct(p.name, p.brand, gender)}" class="btn-p" target="_blank" rel="noopener">💬 Commander via WhatsApp →</a>
</div>

${FOOTER}
</body>
</html>`;
}

// ── Generate category page (femme or homme) ────────────────────────────────
function genCategory(gender, products) {
  const genderLabel = gender === 'femme' ? 'Femme' : 'Homme';
  const emoji = gender === 'femme' ? '🌸' : '🌲';
  const url = `/parfums-${gender}`;
  const canonical = CANON + url;
  const titleStr = `Parfums ${genderLabel} 33ml au Maroc — 100 DH | Parfum33ml.ma`;
  const descStr = `${products.length} fragrances inspirées ${gender === 'femme' ? 'féminines' : 'masculines'} en 33ml à 100 DH. Chanel, Dior, YSL, Armani, Paco Rabanne. Livraison 24-48h partout au Maroc.`;

  const schema = [
    {
      '@context':'https://schema.org','@type':'CollectionPage',
      name:`Parfums ${genderLabel} 33ml au Maroc`,
      description:descStr,
      url:canonical,
      numberOfItems:products.length
    },
    {
      '@context':'https://schema.org','@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Accueil',item:CANON},
        {'@type':'ListItem',position:2,name:`Parfums ${genderLabel}`,item:canonical}
      ]
    }
  ];

  const cards = products.map(p => {
    const slug = slugify(p.name);
    const img = PROD_IMG[p.id] || '';
    const bestBadge = p.best ? '<span style="position:absolute;top:8px;left:8px;background:rgba(90,158,111,.9);color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px">⭐ BEST</span>' : '';
    return `    <a href="/parfums-${gender}/${slug}" class="static-card" style="position:relative">
      ${bestBadge}
      ${img ? `<img class="static-card-img" src="/${img}" alt="${p.name} ${p.brand} 33ml Maroc" loading="lazy">` : ''}
      <div class="static-card-body">
        <div class="static-card-brand">${p.brand} · ${FAMILY_LABELS[p.family] || p.family}</div>
        <div class="static-card-name">${p.name}</div>
        <div class="static-card-price">100 DH · 33ml</div>
      </div>
    </a>`;
  }).join('\n');

  const genderDesc = gender === 'femme'
    ? 'Découvrez notre sélection de 50 fragrances féminines inspirées des plus grandes maisons de parfumerie — Chanel, Dior, YSL, Lancôme, Armani et bien d\'autres. Chaque fragrance est disponible en format 33ml à 100 DH, avec livraison en 24-48h partout au Maroc : Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir.'
    : 'Découvrez notre sélection de 50 fragrances masculines inspirées des plus grandes signatures — Dior Sauvage, Bleu de Chanel, 1 Million Paco Rabanne, Acqua di Giò Armani et bien d\'autres. Chaque fragrance est disponible en format 33ml à 100 DH, avec livraison en 24-48h partout au Maroc.';

  return `${head({title:titleStr,desc:descStr,canonical,schema})}
${NAV}

<div class="breadcrumb">
  <a href="/">Accueil</a><span class="sep">›</span>
  <span>Parfums ${genderLabel}</span>
</div>

<div class="static-hero">
  <span class="article-tag">${emoji} ${gender === 'femme' ? '50 Fragrances Féminines' : '50 Fragrances Masculines'}</span>
  <h1>Parfums <em>${genderLabel}</em> 33ml au Maroc</h1>
  <p>${genderDesc.split('.')[0]}.</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener" style="margin-top:4px">Commander via WhatsApp →</a>
</div>

<div class="static-content" style="max-width:1200px">

<div class="static-section">
  <h2>${products.length} fragrances inspirées ${gender === 'femme' ? 'féminines' : 'masculines'} — 100 DH le 33ml</h2>
  <p>${genderDesc}</p>
  <div class="static-card-grid">
${cards}
  </div>
</div>

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>${gender === 'femme' ? 'Pourquoi choisir nos parfums femme ?' : 'Pourquoi choisir nos parfums homme ?'}</h2>
  <p>Le format 33ml est idéal pour constituer une collection de fragrances variées sans se ruiner. À 100 DH seulement, vous pouvez vous offrir plusieurs parfums inspirés des plus grands noms de la parfumerie mondiale. Ce format pocket se glisse facilement dans un sac à main ou une pochette de voyage.</p>
  <p><strong>Livraison en 24-48h</strong> partout au Maroc. Gratuite dès 3 flacons commandés. Paiement flexible : Cash, CashPlus, Wafacash, Barid Cash, virement bancaire.</p>
</div>

</div>

${FOOTER}
</body>
</html>`;
}

// ── Write file helper ──────────────────────────────────────────────────────
function write(relPath, content) {
  const fullPath = path.join(BASE, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('✅  ' + relPath);
}

// ── Coffrets page ──────────────────────────────────────────────────────────
function genCoffrets() {
  const canonical = CANON + '/coffrets';
  const title = 'Coffrets Cadeaux Parfum Maroc — Dès 180 DH | Parfum33ml.ma';
  const desc = 'Pack Couple 180 DH, Pack Découverte 5 parfums 450 DH, Pack Collection 10 parfums 800 DH. Coffrets cadeaux parfum avec livraison rapide partout au Maroc.';
  const schema = [
    {'@context':'https://schema.org','@type':'CollectionPage',name:'Coffrets Cadeaux Parfum Maroc',description:desc,url:canonical},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:CANON},{'@type':'ListItem',position:2,name:'Coffrets Cadeaux',item:canonical}]}
  ];
  return `${head({title,desc,canonical,schema})}
${NAV}
<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Coffrets Cadeaux</span></div>
<div class="static-hero">
  <span class="article-tag">🎁 Coffrets Cadeaux</span>
  <h1>Nos <em>Coffrets</em> Parfum</h1>
  <p>3 formules pour offrir ou se faire plaisir — dès 180 DH, livraison rapide partout au Maroc. Le cadeau parfum idéal pour toutes les occasions.</p>
</div>
<div class="static-content" style="max-width:1100px">
<div class="static-section">
  <h2>Choisissez votre coffret</h2>
  <p>Tous nos coffrets incluent des fragrances 33ml au choix parmi nos 100 références — homme, femme ou mixte. Emballage cadeau soigné inclus.</p>
  <div class="packs-grid">
    <a href="/coffrets/pack-couple" class="pack-card">
      <div class="pack-icon">💑</div>
      <h3>Pack Couple</h3>
      <p class="pack-desc-text">1 parfum homme + 1 parfum femme au choix. Le cadeau idéal pour les duos.</p>
      <ul class="pack-features">
        <li>✦ 2 flacons 33ml au choix</li>
        <li>✦ 1 homme + 1 femme obligatoires</li>
        <li>✦ Emballage cadeau soigné</li>
        <li>✦ -10% vs achat séparé</li>
      </ul>
      <div><span class="pack-price">180 DH</span><span class="pack-old">200 DH</span></div>
      <span class="btn-p" style="margin-top:16px;display:inline-block">Voir ce coffret →</span>
    </a>
    <a href="/coffrets/pack-decouverte" class="pack-card pack-pop">
      <span class="pack-badge">⭐ POPULAIRE</span>
      <div class="pack-icon">✨</div>
      <h3>Pack Découverte</h3>
      <p class="pack-desc-text">5 parfums au choix libre — homme, femme ou mixte. Le best-seller absolu.</p>
      <ul class="pack-features">
        <li>✦ 5 flacons 33ml au choix</li>
        <li>✦ Mixte homme/femme possible</li>
        <li>✦ Livraison GRATUITE incluse</li>
        <li>✦ -10% vs achat séparé</li>
      </ul>
      <div><span class="pack-price">450 DH</span><span class="pack-old">500 DH</span></div>
      <span class="btn-p" style="margin-top:16px;display:inline-block">Voir ce coffret →</span>
    </a>
    <a href="/coffrets/pack-collection" class="pack-card">
      <span class="pack-badge">💎 MEILLEURE OFFRE</span>
      <div class="pack-icon">👑</div>
      <h3>Pack Collection</h3>
      <p class="pack-desc-text">10 parfums au choix — la collection ultime pour les vrais passionnés.</p>
      <ul class="pack-features">
        <li>✦ 10 flacons 33ml au choix</li>
        <li>✦ Livraison express GRATUITE</li>
        <li>✦ Coffret cadeau luxe inclus</li>
        <li>✦ -20% — Soit 80 DH/parfum</li>
      </ul>
      <div><span class="pack-price">800 DH</span><span class="pack-old">1 000 DH</span></div>
      <span class="btn-p" style="margin-top:16px;display:inline-block">Voir ce coffret →</span>
    </a>
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Tableau comparatif des prix</h2>
  <div class="price-table">
    <div class="price-row"><div class="pr-qty">1 parfum</div><div class="pr-val">100 DH</div><div class="pr-note">+15 DH livraison</div></div>
    <div class="price-row"><div class="pr-qty">3 parfums</div><div class="pr-val">300 DH</div><div class="pr-note">Livraison gratuite</div></div>
    <div class="price-row"><div class="pr-qty">5 parfums</div><div class="pr-val">450 DH</div><div class="pr-note">-10% + Gratuite</div></div>
    <div class="price-row best"><div class="pr-qty">10 parfums</div><div class="pr-val">800 DH</div><div class="pr-note">-20% + Express gratuite</div></div>
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Comment commander un coffret ?</h2>
  <p>1. Explorez notre catalogue et choisissez vos fragrances parmi les 100 références disponibles.</p>
  <p>2. Envoyez votre sélection via WhatsApp — nous vous confirmons la commande en quelques minutes.</p>
  <p>3. Recevez votre coffret en 24-48h partout au Maroc. Paiement à la livraison ou virement.</p>
  <a href="${WA}?text=${encodeURIComponent('Bonjour 👋\nJe souhaite commander un coffret parfum.\n\nFormule souhaitée :\n☐ Pack Couple (180 DH)\n☐ Pack Découverte 5 parfums (450 DH)\n☐ Pack Collection 10 parfums (800 DH)\n\nParfums souhaités :\n\n📍 Ville :\n📱 Téléphone :')}" class="btn-p" target="_blank" rel="noopener" style="margin-top:8px;display:inline-block">💬 Commander via WhatsApp →</a>
</div>
</div>
${FOOTER}
</body>
</html>`;
}

// ── City pages ─────────────────────────────────────────────────────────────
function genCity(city) {
  const cities = {
    casablanca:{
      label:'Casablanca',emoji:'🏙️',
      h1:'Parfum <em>Casablanca</em> — Livraison le jour même',
      intro:'Commandez vos parfums inspirés à Casablanca et recevez-les en quelques heures. Nous livrons dans tous les quartiers — Maarif, Anfa, Hay Hassani, Sidi Maarouf, Ain Sebaa, Mohammedia.',
      delay:'Livraison en 6-24h à Casablanca',
      delayColor:'var(--green)',
      features:[
        {icon:'⚡',title:'Livraison express',desc:'6-24h à Casablanca et Mohammedia'},
        {icon:'📦',title:'Livraison standard',desc:'24h dans toute la région du Grand Casablanca'},
        {icon:'💰',title:'Frais de livraison',desc:'15 DH — Gratuite dès 3 flacons commandés'},
        {icon:'💬',title:'Commande WhatsApp',desc:'Réponse en quelques minutes 7j/7'},
      ],
      seoText:`Parfum33ml.ma est le spécialiste des fragrances inspirées à Casablanca. Avec plus de 100 références masculines et féminines disponibles en format 33ml à 100 DH, nous livrons dans tous les arrondissements de Casablanca : Maarif, Anfa, Bourgogne, Hay Hassani, Ain Chok, Ain Sebaa, Ben M'sik, Sidi Bernoussi, Hay Mohammadi et Mohammedia.`
    },
    rabat:{
      label:'Rabat',emoji:'🏛️',
      h1:'Parfum <em>Rabat</em> — Livraison 24h',
      intro:'Commandez vos parfums inspirés à Rabat, Salé et Temara. Livraison en 24h dans toute la région de Rabat-Salé-Kénitra.',
      delay:'Livraison en 24h à Rabat et Salé',
      delayColor:'var(--gold)',
      features:[
        {icon:'🚚',title:'Livraison 24h',desc:'Rabat, Salé, Temara, Kénitra'},
        {icon:'📦',title:'Livraison 24-48h',desc:'Toute la région Rabat-Salé-Kénitra'},
        {icon:'💰',title:'Frais de livraison',desc:'15 DH — Gratuite dès 3 flacons commandés'},
        {icon:'💬',title:'Commande WhatsApp',desc:'Réponse en quelques minutes 7j/7'},
      ],
      seoText:'Parfum33ml.ma livre à Rabat, Salé et Temara en 24h. Découvrez notre collection de +100 fragrances inspirées — Sauvage Dior, Bleu de Chanel, Black Opium YSL, La Vie Est Belle Lancôme — en format 33ml à 100 DH chacune. Le cadeau parfait pour les habitants de la capitale.'
    },
    marrakech:{
      label:'Marrakech',emoji:'🕌',
      h1:'Parfum <em>Marrakech</em> — Livraison 24-48h',
      intro:'Commandez vos parfums inspirés à Marrakech et Agadir. Livraison en 24-48h dans toute la région Marrakech-Safi.',
      delay:'Livraison en 24-48h à Marrakech',
      delayColor:'var(--gold)',
      features:[
        {icon:'🚚',title:'Livraison 24-48h',desc:'Marrakech, Agadir, Ouarzazate'},
        {icon:'📦',title:'Toute la région',desc:'Marrakech-Safi en 48h maximum'},
        {icon:'💰',title:'Frais de livraison',desc:'15 DH — Gratuite dès 3 flacons commandés'},
        {icon:'💬',title:'Commande WhatsApp',desc:'Réponse en quelques minutes 7j/7'},
      ],
      seoText:'Parfum33ml.ma livre à Marrakech en 24-48h. Fragrances inspirées pour les touristes et résidents de la Ville Rose — Gueliz, Hivernage, Médina, Palmeraie. Les parfums orientaux comme Baccarat Rouge 540 ou Layton Parfums de Marly sont particulièrement appréciés à Marrakech pour leur sillage intense et chaleureux, parfait pour le climat marocain.'
    }
  };
  const c = cities[city];
  const canonical = `${CANON}/${city}`;
  const title = `Parfum ${c.label} — Fragrances Inspirées 33ml à 100 DH | Parfum33ml.ma`;
  const desc = `Fragrances inspirées 33ml à 100 DH livrées à ${c.label}. ${c.delay}. Chanel, Dior, YSL, Armani, Paco Rabanne.`;
  const schema = [
    {'@context':'https://schema.org','@type':'LocalBusiness',name:'Parfum33ml.ma',url:CANON,description:desc,areaServed:{'@type':'City',name:c.label},priceRange:'100 DH'},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:CANON},{'@type':'ListItem',position:2,name:`Parfum ${c.label}`,item:canonical}]}
  ];

  const deliveryCards = c.features.map(f => `    <div class="delivery-card">
      <div class="delivery-icon">${f.icon}</div>
      <div class="delivery-title">${f.title}</div>
      <div class="delivery-desc">${f.desc}</div>
    </div>`).join('\n');

  return `${head({title,desc,canonical,schema})}
${NAV}
<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Parfum ${c.label}</span></div>
<div class="city-hero">
  <span class="article-tag">${c.emoji} ${c.label}</span>
  <h1>${c.h1}</h1>
  <p>${c.intro}</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener">💬 Commander maintenant →</a>
</div>
<div class="static-content" style="max-width:1100px">
<div class="static-section">
  <h2>Livraison à ${c.label}</h2>
  <div class="delivery-grid">
${deliveryCards}
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Nos fragrances les plus demandées à ${c.label}</h2>
  <p>${c.seoText}</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px">
    <a href="/parfums-femme" class="btn-p">Parfums Femme →</a>
    <a href="/parfums-homme" class="btn-o">Parfums Homme →</a>
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Comment commander à ${c.label} ?</h2>
  <p>1. Parcourez notre catalogue de +100 fragrances femme et homme.</p>
  <p>2. Envoyez votre sélection par WhatsApp — liste de parfums, nom et adresse à ${c.label}.</p>
  <p>3. Nous confirmons et expédions. ${c.delay} après confirmation.</p>
  <p>Modes de paiement acceptés : Cash à la livraison · CashPlus · Wafacash · Barid Cash · Virement bancaire.</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener" style="margin-top:8px;display:inline-block">💬 Commander via WhatsApp →</a>
</div>
</div>
${FOOTER}
</body>
</html>`;
}

// ── Parfum du mois ─────────────────────────────────────────────────────────
function genPotm() {
  const canonical = CANON + '/parfum-du-mois';
  const title = 'Parfum du Mois Avril 2026 — Baccarat Rouge 540 à 80 DH | Parfum33ml.ma';
  const desc = 'Parfum du mois : Baccarat Rouge 540 MFK en 33ml à 80 DH (−20%). La fragrance niche la plus prisée au monde, accessible ce mois uniquement. Livraison 24-48h Maroc.';
  const schema = [
    {'@context':'https://schema.org','@type':'Product',name:'Baccarat Rouge 540 MFK — Fragrance Inspirée 33ml',description:desc,image:`${CANON}/dossier%20parfum/parfum/mfk%20baccarat%20rouge%20540%20600-800.jpg`,brand:{'@type':'Brand',name:'Parfum33ml.ma'},offers:{'@type':'Offer',price:'80',priceCurrency:'MAD',availability:'https://schema.org/InStock',validThrough:'2026-04-30',url:canonical}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:CANON},{'@type':'ListItem',position:2,name:'Parfum du Mois',item:canonical}]}
  ];
  return `${head({title,desc,canonical,schema})}
${NAV}
<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Parfum du Mois</span></div>
<div class="static-hero">
  <span class="article-tag" style="background:rgba(194,112,128,.1);color:var(--rose);border-color:rgba(194,112,128,.2)">🌟 Offre Avril 2026 — −20%</span>
  <h1>Parfum du <em>Mois</em></h1>
  <p>Chaque mois, nous mettons en avant une fragrance d'exception avec une remise exclusive de 20%. Ce mois-ci : Baccarat Rouge 540.</p>
</div>
<div class="prod-hero">
  <div class="prod-img-wrap">
    <img src="/dossier%20parfum/parfum/mfk%20baccarat%20rouge%20540%20600-800.jpg" alt="Baccarat Rouge 540 MFK — Parfum du Mois" loading="eager">
  </div>
  <div class="prod-info">
    <div class="prod-brand">Maison Francis Kurkdjian · Oriental</div>
    <h1>Baccarat Rouge 540 <span style="font-size:.65em;color:var(--txt2);font-weight:400">inspiré</span></h1>
    <span class="article-tag" style="background:rgba(194,112,128,.1);color:var(--rose);border-color:rgba(194,112,128,.2);display:inline-block;margin-bottom:16px">OFFRE CE MOIS — STOCKS LIMITÉS</span>
    <div class="prod-price">80 DH <span style="font-size:16px;text-decoration:line-through;color:var(--txt3);font-family:var(--ff-b);font-weight:400">100 DH</span> <span style="font-size:14px;color:var(--green);font-weight:700">−20%</span></div>
    <div style="margin-bottom:16px;font-size:13px;color:var(--txt2)">Format 33ml · Valable tout le mois d'avril 2026</div>
    <div class="prod-notes">
      <span class="note-tag">Jasmin Sambac</span>
      <span class="note-tag">Safran</span>
      <span class="note-tag">Ambre Bois</span>
      <span class="note-tag">Cèdre</span>
    </div>
    <p class="prod-desc">Le phénomène olfactif mondial qui a bouleversé la parfumerie en 2015. Le jasmin sambac et le safran de Francis Kurkdjian se marient dans un accord ambre-cèdre cristallin absolument unique. Cette fragrance unisexe laisse sur la peau une luminosité dorée et boisée qui dure des heures — un luxe accessible uniquement en format 33ml à Parfum33ml.ma.</p>
    <div class="prod-cta">
      <a href="${WA}?text=${encodeURIComponent('Bonjour 👋\nJe souhaite le Parfum du Mois :\n\n🌟 Baccarat Rouge 540 — MFK (inspiré)\n📦 Format 33ml · 80 DH (−20%)\n\n📍 Ville :\n📱 Téléphone :')}" class="btn-p" target="_blank" rel="noopener">💬 Commander à 80 DH →</a>
      <a href="/parfums-femme/baccarat-rouge-540" class="btn-o">Fiche produit</a>
    </div>
  </div>
</div>
<div class="prod-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Pourquoi Baccarat Rouge 540 est-il le parfum du mois ?</h2>
  <p>Baccarat Rouge 540 de Maison Francis Kurkdjian est sans doute la fragrance niche la plus imitée et la plus désirée au monde. Son accord jasmin-safran-ambre bois est reconnaissable entre tous — une luminosité cristalline qui laisse un sillage inoubliable sur la peau pendant des heures.</p>
  <p>Habituellement vendu à plus de 2 500 DH en flacon original de 200ml, notre fragrance inspirée en 33ml vous permet de découvrir cet univers olfactif d'exception pour seulement <strong>80 DH ce mois-ci</strong>.</p>
</div>
${FOOTER}
</body>
</html>`;
}

// ── Livraison gratuite page ────────────────────────────────────────────────
function genLivraison() {
  const canonical = CANON + '/livraison-gratuite';
  const title = 'Livraison Gratuite Parfum au Maroc — Conditions | Parfum33ml.ma';
  const desc = 'Livraison gratuite dès 3 flacons commandés partout au Maroc. Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir. 24-48h après confirmation. Paiement à la livraison.';
  const schema = [
    {'@context':'https://schema.org','@type':'WebPage',name:'Livraison Gratuite Parfum Maroc',description:desc,url:canonical},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:CANON},{'@type':'ListItem',position:2,name:'Livraison Gratuite',item:canonical}]}
  ];
  return `${head({title,desc,canonical,schema})}
${NAV}
<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Livraison Gratuite</span></div>
<div class="static-hero">
  <span class="article-tag">🚚 Livraison Rapide</span>
  <h1>Livraison <em>Gratuite</em> au Maroc</h1>
  <p>Commandez 3 flacons ou plus et profitez de la livraison offerte partout au Maroc. 24-48h de délai, paiement à la livraison accepté.</p>
</div>
<div class="static-content" style="max-width:1100px">
<div class="static-section">
  <h2>Conditions de livraison gratuite</h2>
  <div class="price-table" style="max-width:700px">
    <div class="price-row"><div class="pr-qty">1 flacon</div><div class="pr-val">100 DH</div><div class="pr-note" style="color:var(--txt3)">+15 DH livraison</div></div>
    <div class="price-row"><div class="pr-qty">2 flacons</div><div class="pr-val">200 DH</div><div class="pr-note" style="color:var(--txt3)">+15 DH livraison</div></div>
    <div class="price-row best"><div class="pr-qty">3 flacons et +</div><div class="pr-val">300 DH+</div><div class="pr-note">🎁 Livraison GRATUITE</div></div>
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Délais de livraison par ville</h2>
  <div class="delivery-grid">
    <div class="delivery-card"><div class="delivery-icon">🏙️</div><div class="delivery-title">Casablanca</div><div class="delivery-desc">6-24h — Livraison express possible</div></div>
    <div class="delivery-card"><div class="delivery-icon">🏛️</div><div class="delivery-title">Rabat &amp; Salé</div><div class="delivery-desc">24h — Temara et Kénitra inclus</div></div>
    <div class="delivery-card"><div class="delivery-icon">🕌</div><div class="delivery-title">Marrakech</div><div class="delivery-desc">24-48h — Agadir et région inclus</div></div>
    <div class="delivery-card"><div class="delivery-icon">⚓</div><div class="delivery-title">Tanger &amp; Tétouan</div><div class="delivery-desc">24-48h — Nord du Maroc</div></div>
    <div class="delivery-card"><div class="delivery-icon">🌆</div><div class="delivery-title">Fès &amp; Meknès</div><div class="delivery-desc">24-48h — Région Fès-Meknès</div></div>
    <div class="delivery-card"><div class="delivery-icon">🌊</div><div class="delivery-title">Agadir &amp; Sud</div><div class="delivery-desc">48h — Tiznit, Taroudant, Laâyoune</div></div>
  </div>
</div>
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Modes de paiement acceptés</h2>
  <p>Nous acceptons tous les moyens de paiement courants au Maroc :</p>
  <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;margin-top:8px">
    <li style="font-size:14px;color:var(--txt2)">💵 <strong>Cash à la livraison</strong> — paiement au livreur</li>
    <li style="font-size:14px;color:var(--txt2)">📱 <strong>CashPlus</strong> — transfert mobile instantané</li>
    <li style="font-size:14px;color:var(--txt2)">📮 <strong>Wafacash / Barid Cash</strong> — réseau national</li>
    <li style="font-size:14px;color:var(--txt2)">🏦 <strong>Virement bancaire</strong> — pour les grandes commandes</li>
  </ul>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener" style="margin-top:24px;display:inline-block">💬 Commander maintenant →</a>
</div>
</div>
${FOOTER}
</body>
</html>`;
}

// ── Blog listing page ──────────────────────────────────────────────────────
const ARTICLES = [
  {slug:'top-10-parfums-femme-pour-un-mariage-marocain',tag:'Guide Femme',title:'Top 10 parfums femme pour un mariage marocain',meta:'8 min · Parfum Femme · Janvier 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'comment-bien-porter-son-parfum-au-maroc-en-ete',tag:'Guide Pratique',title:'Comment bien porter son parfum au Maroc en été ?',meta:'6 min · Conseils · Février 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'les-5-parfums-homme-les-plus-portes-au-maroc-en-2025',tag:'Guide Homme',title:'Les 5 parfums homme les plus portés au Maroc en 2025',meta:'7 min · Parfum Homme · Février 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'quel-parfum-offrir-en-cadeau-au-maroc-guide-complet-2025',tag:'Guide Cadeau',title:'Quel parfum offrir en cadeau au Maroc ? Guide complet 2025',meta:'9 min · Cadeau · Mars 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'floral-oriental-ou-boise-quelle-famille-olfactive-vous-correspond',tag:'Découverte',title:'Floral, oriental ou boisé : quelle famille olfactive vous correspond ?',meta:'8 min · Découverte · Mars 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'acheter-son-parfum-en-33ml-pourquoi-cest-le-format-ideal-au-maroc',tag:'Guide Pratique',title:'Acheter son parfum en 33ml : pourquoi c\'est le format idéal au Maroc',meta:'5 min · Format · Avril 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'les-parfums-tendance-au-maroc-en-2025-classement-complet',tag:'Tendances',title:'Les parfums tendance au Maroc en 2025 — Classement complet',meta:'10 min · Tendances · Avril 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'comment-conserver-ses-parfums-en-ete-au-maroc',tag:'Conseils',title:'Comment conserver ses parfums en été au Maroc ?',meta:'5 min · Conseils · Avril 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
  {slug:'offrir-un-parfum-pour-laid-au-maroc-le-guide-ultime',tag:'Aïd &amp; Fêtes',title:'Offrir un parfum pour l\'Aïd au Maroc — Le guide ultime',meta:'7 min · Fêtes · Avril 2026',img:'dossier%20parfum/baniere/baniere-blog-mariage.jpg'},
];

function genBlog() {
  const canonical = CANON + '/blog';
  const title = 'Blog Parfum Maroc — Guides, Conseils et Tendances | Parfum33ml.ma';
  const desc = 'Blog parfum : guides d\'achat, conseils d\'utilisation, tendances 2025-2026 au Maroc. Choisir son parfum, famille olfactive, parfum cadeau — tous les conseils pour les amateurs de fragrance au Maroc.';
  const schema = [
    {'@context':'https://schema.org','@type':'Blog',name:'Blog Parfum Maroc',description:desc,url:canonical},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Accueil',item:CANON},{'@type':'ListItem',position:2,name:'Blog',item:canonical}]}
  ];

  const cards = ARTICLES.map(a => `  <a href="/blog/${a.slug}" class="blog-card">
    <img src="/${a.img}" alt="${a.title}" loading="lazy">
    <div class="blog-card-body">
      <div class="blog-card-tag">${a.tag}</div>
      <div class="blog-card-title">${a.title}</div>
      <div class="blog-card-meta">${a.meta}</div>
    </div>
  </a>`).join('\n');

  return `${head({title,desc,canonical,schema})}
${NAV}
<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Blog</span></div>
<div class="blog-hero">
  <span class="article-tag">📚 Blog &amp; Conseils</span>
  <h1>Blog <em>Parfum</em> Maroc</h1>
  <p>Guides d'achat, conseils d'utilisation et tendances pour les amateurs de fragrance au Maroc.</p>
</div>
<div class="blog-grid-wrap">
${cards}
</div>
${FOOTER}
</body>
</html>`;
}

// ── Main ───────────────────────────────────────────────────────────────────
console.log('\n🚀  Génération des pages statiques...\n');

// Category pages
write('parfums-femme.html', genCategory('femme', F));
write('parfums-homme.html', genCategory('homme', H));

// Product pages femme
fs.mkdirSync(path.join(BASE, 'parfums-femme'), { recursive: true });
for (const p of F) {
  write(`parfums-femme/${slugify(p.name)}.html`, genProduct(p, 'femme'));
}

// Product pages homme
fs.mkdirSync(path.join(BASE, 'parfums-homme'), { recursive: true });
for (const p of H) {
  write(`parfums-homme/${slugify(p.name)}.html`, genProduct(p, 'homme'));
}

// Other pages
write('coffrets.html', genCoffrets());
write('casablanca.html', genCity('casablanca'));
write('rabat.html', genCity('rabat'));
write('marrakech.html', genCity('marrakech'));
write('parfum-du-mois.html', genPotm());
write('livraison-gratuite.html', genLivraison());
write('blog.html', genBlog());

console.log('\n✅  Toutes les pages générées avec succès !');
console.log(`   Femme  : 50 fiches + 1 catégorie`);
console.log(`   Homme  : 50 fiches + 1 catégorie`);
console.log(`   Autres : coffrets, 3 villes, potm, livraison, blog`);
console.log('\n📌  Prochaine étape : mettre à jour sitemap.xml\n');
