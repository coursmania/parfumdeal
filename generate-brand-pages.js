#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const CANON = 'https://parfum33ml.ma';
const WA = 'https://wa.me/212600000000';

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[°'"'&]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
      <li><a href="/parfums-inspires-carolina-herrera">Carolina Herrera</a></li>
      <li><a href="/parfums-inspires-jean-paul-gaultier">Jean Paul Gaultier</a></li>
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
    <h4 style="margin-top:16px">Livraison</h4>
    <ul>
      <li><a href="/casablanca">Casablanca</a></li>
      <li><a href="/rabat">Rabat</a></li>
      <li><a href="/marrakech">Marrakech</a></li>
    </ul>
  </div>
</div>
<div class="footer-bottom">
  <span>© 2026 Parfum33ml.ma — Fragrances inspirées 33ml</span>
  <div class="footer-legal"><a href="/">Mentions légales</a><a href="/">CGV</a></div>
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
const ALL = [
  {id:'f1',name:'Chanel N°5',brand:'Chanel',gender:'femme'},
  {id:'f2',name:"J'adore",brand:'Dior',gender:'femme'},
  {id:'f3',name:'La Vie Est Belle',brand:'Lancôme',gender:'femme'},
  {id:'f4',name:'Coco Mademoiselle',brand:'Chanel',gender:'femme'},
  {id:'f5',name:'Black Opium',brand:'YSL',gender:'femme'},
  {id:'f6',name:'Miss Dior',brand:'Dior',gender:'femme'},
  {id:'f7',name:'Good Girl',brand:'Carolina Herrera',gender:'femme'},
  {id:'f8',name:'Flowerbomb',brand:'Viktor & Rolf',gender:'femme'},
  {id:'f9',name:'Light Blue',brand:'Dolce & Gabbana',gender:'femme'},
  {id:'f10',name:'Chance Eau Tendre',brand:'Chanel',gender:'femme'},
  {id:'f11',name:'Mon Paris',brand:'YSL',gender:'femme'},
  {id:'f12',name:'Libre',brand:'YSL',gender:'femme'},
  {id:'f13',name:'Idôle',brand:'Lancôme',gender:'femme'},
  {id:'f14',name:'Sì',brand:'Giorgio Armani',gender:'femme'},
  {id:'f15',name:'Alien',brand:'Mugler',gender:'femme'},
  {id:'f16',name:'Angel',brand:'Mugler',gender:'femme'},
  {id:'f17',name:'Gucci Bloom',brand:'Gucci',gender:'femme'},
  {id:'f18',name:'Daisy',brand:'Marc Jacobs',gender:'femme'},
  {id:'f19',name:'For Her',brand:'Narciso Rodriguez',gender:'femme'},
  {id:'f20',name:'My Way',brand:'Giorgio Armani',gender:'femme'},
  {id:'f21',name:'Olympéa',brand:'Paco Rabanne',gender:'femme'},
  {id:'f22',name:'Burberry Her',brand:'Burberry',gender:'femme'},
  {id:'f23',name:'Paradoxe',brand:'Prada',gender:'femme'},
  {id:'f24',name:'Donna Born in Roma',brand:'Valentino',gender:'femme'},
  {id:'f25',name:"Twilly d'Hermès",brand:'Hermès',gender:'femme'},
  {id:'f26',name:'Joy',brand:'Dior',gender:'femme'},
  {id:'f27',name:'Chloé EDP',brand:'Chloé',gender:'femme'},
  {id:'f28',name:'Crystal Noir',brand:'Versace',gender:'femme'},
  {id:'f29',name:'Bright Crystal',brand:'Versace',gender:'femme'},
  {id:'f30',name:'Poison Girl',brand:'Dior',gender:'femme'},
  {id:'f31',name:'Baccarat Rouge 540',brand:'MFK',gender:'femme'},
  {id:'f32',name:'Sì Passione',brand:'Giorgio Armani',gender:'femme'},
  {id:'f33',name:'Fame',brand:'Paco Rabanne',gender:'femme'},
  {id:'f34',name:'Scandal',brand:'Jean Paul Gaultier',gender:'femme'},
  {id:'f35',name:'Good Girl Supreme',brand:'Carolina Herrera',gender:'femme'},
  {id:'f36',name:'Lady Million',brand:'Paco Rabanne',gender:'femme'},
  {id:'f37',name:'Very Good Girl',brand:'Carolina Herrera',gender:'femme'},
  {id:'f38',name:"L'Interdit",brand:'Givenchy',gender:'femme'},
  {id:'f39',name:'Irresistible',brand:'Givenchy',gender:'femme'},
  {id:'f40',name:'Delina',brand:'Parfums de Marly',gender:'femme'},
  {id:'f41',name:'Chance EDP',brand:'Chanel',gender:'femme'},
  {id:'f42',name:'Gabrielle',brand:'Chanel',gender:'femme'},
  {id:'f43',name:'The Scent For Her',brand:'Hugo Boss',gender:'femme'},
  {id:'f44',name:'212 VIP',brand:'Carolina Herrera',gender:'femme'},
  {id:'f45',name:'Trésor',brand:'Lancôme',gender:'femme'},
  {id:'f46',name:'La Nuit Trésor',brand:'Lancôme',gender:'femme'},
  {id:'f47',name:"Because It's You",brand:'Emporio Armani',gender:'femme'},
  {id:'f48',name:'Mon Guerlain',brand:'Guerlain',gender:'femme'},
  {id:'f49',name:'Flower',brand:'Kenzo',gender:'femme'},
  {id:'f50',name:'Classique',brand:'Jean Paul Gaultier',gender:'femme'},
  {id:'h1',name:'Sauvage',brand:'Dior',gender:'homme'},
  {id:'h2',name:'Bleu de Chanel',brand:'Chanel',gender:'homme'},
  {id:'h3',name:'Acqua di Giò',brand:'Giorgio Armani',gender:'homme'},
  {id:'h4',name:'1 Million',brand:'Paco Rabanne',gender:'homme'},
  {id:'h5',name:'Le Mâle',brand:'Jean Paul Gaultier',gender:'homme'},
  {id:'h6',name:'Invictus',brand:'Paco Rabanne',gender:'homme'},
  {id:'h7',name:'Dior Homme',brand:'Dior',gender:'homme'},
  {id:'h8',name:'Aventus',brand:'Creed',gender:'homme'},
  {id:'h9',name:'Allure Homme Sport',brand:'Chanel',gender:'homme'},
  {id:'h10',name:'Y EDP',brand:'YSL',gender:'homme'},
  {id:'h11',name:'Boss Bottled',brand:'Hugo Boss',gender:'homme'},
  {id:'h12',name:"Terre d'Hermès",brand:'Hermès',gender:'homme'},
  {id:'h13',name:'Eros',brand:'Versace',gender:'homme'},
  {id:'h14',name:'Armani Code',brand:'Giorgio Armani',gender:'homme'},
  {id:'h15',name:'Gentleman',brand:'Givenchy',gender:'homme'},
  {id:'h16',name:'Light Blue Pour Homme',brand:'Dolce & Gabbana',gender:'homme'},
  {id:'h17',name:'The One',brand:'Dolce & Gabbana',gender:'homme'},
  {id:'h18',name:'Stronger With You',brand:'Emporio Armani',gender:'homme'},
  {id:'h19',name:'Phantom',brand:'Paco Rabanne',gender:'homme'},
  {id:'h20',name:'Bad Boy',brand:'Carolina Herrera',gender:'homme'},
  {id:'h21',name:"La Nuit de L'Homme",brand:'YSL',gender:'homme'},
  {id:'h22',name:'Spicebomb',brand:'Viktor & Rolf',gender:'homme'},
  {id:'h23',name:'Luna Rossa Carbon',brand:'Prada',gender:'homme'},
  {id:'h24',name:'Layton',brand:'Parfums de Marly',gender:'homme'},
  {id:'h25',name:"L'Homme",brand:'YSL',gender:'homme'},
  {id:'h26',name:'Guilty Pour Homme',brand:'Gucci',gender:'homme'},
  {id:'h27',name:'Wanted',brand:'Azzaro',gender:'homme'},
  {id:'h28',name:'Explorer',brand:'Montblanc',gender:'homme'},
  {id:'h29',name:'Ombré Leather',brand:'Tom Ford',gender:'homme'},
  {id:'h30',name:'Baccarat Rouge 540',brand:'MFK',gender:'homme'},
  {id:'h31',name:'Dylan Blue',brand:'Versace',gender:'homme'},
  {id:'h32',name:'Uomo Born in Roma',brand:'Valentino',gender:'homme'},
  {id:'h33',name:'Scandal Pour Homme',brand:'Jean Paul Gaultier',gender:'homme'},
  {id:'h34',name:'Encre Noire',brand:'Lalique',gender:'homme'},
  {id:'h35',name:'Pegasus',brand:'Parfums de Marly',gender:'homme'},
  {id:'h36',name:'CH Men',brand:'Carolina Herrera',gender:'homme'},
  {id:'h37',name:'Cedrat Boisé',brand:'Mancera',gender:'homme'},
  {id:'h38',name:'Invictus Victory',brand:'Paco Rabanne',gender:'homme'},
  {id:'h39',name:'K by D&G',brand:'Dolce & Gabbana',gender:'homme'},
  {id:'h40',name:'Kenzo Homme',brand:'Kenzo',gender:'homme'},
  {id:'h41',name:'Sauvage Elixir',brand:'Dior',gender:'homme'},
  {id:'h42',name:'Tobacco Vanille',brand:'Tom Ford',gender:'homme'},
  {id:'h43',name:'Percival',brand:'Parfums de Marly',gender:'homme'},
  {id:'h44',name:'The Scent',brand:'Hugo Boss',gender:'homme'},
  {id:'h45',name:'Ultra Male',brand:'Jean Paul Gaultier',gender:'homme'},
  {id:'h46',name:'Jimmy Choo Man',brand:'Jimmy Choo',gender:'homme'},
  {id:'h47',name:"L'Homme Idéal",brand:'Guerlain',gender:'homme'},
  {id:'h48',name:'Legend',brand:'Montblanc',gender:'homme'},
  {id:'h49',name:'The Most Wanted',brand:'Azzaro',gender:'homme'},
  {id:'h50',name:'Gris Charnel',brand:'BDK Parfums',gender:'homme'},
];

const PROD_IMG = {
  'f1':'dossier%20parfum/parfum/chanel%20n5%20600-800.jpg',
  'f2':"dossier%20parfum/parfum/dior%20j'adore%20600-800.jpg",
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
  'f25':"dossier%20parfum/parfum/Herm%C3%A8s%20Twilly%20d'Herm%C3%A8s%20600-800.jpg",
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
  'f38':"dossier%20parfum/parfum/Givenchy%20L'Interdit%20600-800.jpg",
  'f39':'dossier%20parfum/parfum/Givenchy%20Irresistible%20600-800.jpg',
  'f40':'dossier%20parfum/parfum/Parfums%20de%20Marly%20Delina%20600-800.jpg',
  'f41':'dossier%20parfum/parfum/Chanel%20Chance%20EDP%20600-800.jpg',
  'f42':'dossier%20parfum/parfum/chanel%20Gabrielle%20600-800.jpg',
  'f43':'dossier%20parfum/parfum/Hugo%20Boss%20The%20Scent%20For%20Her%20600-800.jpg',
  'f44':'dossier%20parfum/parfum/Carolina%20Herrera%20212%20VIP%20600-800.jpg',
  'f45':'dossier%20parfum/parfum/Lanc%C3%B4me%20Tr%C3%A9sor%20600-800.jpg',
  'f46':'dossier%20parfum/parfum/Lanc%C3%B4me%20La%20Nuit%20Tr%C3%A9sor%20600-800.jpg',
  'f47':"dossier%20parfum/parfum/Emporio%20Armani%20Because%20It's%20You%20600-800.jpg",
  'f48':"dossier%20parfum/parfum/Guerlain%20Mon%20Guerlain%20600-800.jpg",
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
  'h12':"dossier%20parfum/parfum/Herm%C3%A8s%20Terre%20d'Herm%C3%A8s%20600-800.jpg",
  'h13':'dossier%20parfum/parfum/Versace%20Eros%20600-800.jpg',
  'h14':'dossier%20parfum/parfum/Giorgio%20Armani%20Armani%20Code%20600-800.jpg',
  'h15':'dossier%20parfum/parfum/Givenchy%20Gentleman%20600-800.jpg',
  'h16':'dossier%20parfum/parfum/Dolce%20%26%20Gabbana%20Light%20Blue%20Pour%20Homme%20600-800.jpg',
  'h17':'dossier%20parfum/parfum/Dolce%20%26%20Gabbana%20The%20One%20600-800.jpg',
  'h18':'dossier%20parfum/parfum/Emporio%20Armani%20Stronger%20With%20You%20600-800.jpg',
  'h19':'dossier%20parfum/parfum/Paco%20Rabanne%20Phantom%20600-800.jpg',
  'h20':'dossier%20parfum/parfum/Carolina%20Herrera%20Bad%20Boy%20600-800.jpg',
  'h21':"dossier%20parfum/parfum/YSL%20La%20Nuit%20de%20L'Homme%20600-800.jpg",
  'h22':'dossier%20parfum/parfum/Viktor%20%26%20Rolf%20Spicebomb%20600-800.jpg',
  'h23':'dossier%20parfum/parfum/Prada%20Luna%20Rossa%20Carbon%20600-800.jpg',
  'h24':'dossier%20parfum/parfum/Parfums%20de%20marly%20layton%20600-800.jpg',
  'h25':"dossier%20parfum/parfum/YSL%20L'Homme%20600-800.jpg",
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
  'h47':"dossier%20parfum/parfum/Guerlain%20L'Homme%20Id%C3%A9al%20600-800.jpg",
  'h48':'dossier%20parfum/parfum/Montblanc%20legend%20600-800.jpg',
  'h49':'dossier%20parfum/parfum/Azzaro%20The%20Most%20Wanted%20600-800.jpg',
  'h50':'dossier%20parfum/parfum/BDK%20Parfums%20Gris%20Charnel%20600-800.jpg',
};

function productCards(brandName) {
  const prods = ALL.filter(p => p.brand === brandName);
  return prods.map(p => {
    const genderLabel = p.gender === 'femme' ? 'Femme' : 'Homme';
    const href = p.gender === 'femme' ? `/parfums-femme/${slugify(p.name)}` : `/parfums-homme/${slugify(p.name)}`;
    return `    <a href="${href}" class="static-card">
      <img class="static-card-img" src="${PROD_IMG[p.id]}" alt="Inspiré ${p.name} ${brandName} 33ml Maroc" loading="lazy">
      <div class="static-card-body">
        <div class="static-card-brand">${brandName} · ${genderLabel}</div>
        <div class="static-card-name">${p.name}</div>
        <div class="static-card-price">100 DH · 33ml</div>
      </div>
    </a>`;
  }).join('\n');
}

// ── Brand definitions ──────────────────────────────────────────────────────
const BRANDS = [
  {
    slug: 'parfums-inspires-lancome',
    name: 'Lancôme',
    title: 'Parfums inspirés Lancôme au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Lancôme : La Vie est Belle, Idôle, Trésor, La Nuit Trésor. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Lancôme est la maison de beauté française par excellence, fondée en 1935. Parmi ses créations olfactives les plus emblématiques : La Vie est Belle (2012), devenu l\'un des parfums féminins les plus vendus au monde, et Trésor (1990), le floral poudré intemporel. Chez Parfum33ml.ma, nous proposons 4 fragrances inspirées de Lancôme en 33ml à 100 DH.',
    guide: `<p><strong>La Vie est Belle :</strong> Le best-seller universel. Accord iris-praline gourmand et féminin — pour toutes les occasions.</p>
  <p><strong>Idôle :</strong> La rose moderne et lumineuse. Légère, fraîche et contemporaine — parfaite pour le bureau.</p>
  <p><strong>Trésor :</strong> Floral poudré romantique pour les cérémonies et occasions spéciales.</p>
  <p><strong>La Nuit Trésor :</strong> Plus intense, pour les soirées et sorties nocturnes.</p>`,
    faq: [
      ['Vos parfums inspirés de Lancôme sont-ils des contrefaçons ?', 'Non. Ce sont des fragrances inspirées légalement commercialisées, créées pour capturer l\'essence olfactive des originaux sans reproduire leurs formules ou utiliser leurs marques.'],
      ['La Vie est Belle est-elle disponible en 33ml ?', 'Oui, notre fragrance inspirée de La Vie est Belle est disponible en format 33ml à 100 DH, avec une tenue de 6 à 8 heures.'],
    ]
  },
  {
    slug: 'parfums-inspires-mugler',
    name: 'Mugler',
    title: 'Parfums inspirés Mugler au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Mugler : Alien, Angel. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Thierry Mugler a révolutionné la parfumerie en 1992 avec Angel, premier parfum gourmand de l\'histoire. Puis en 2005 avec Alien, l\'ovni olfactif au jasmin ambré unique. Deux fragrances iconiques, reconnaissables entre toutes, désormais accessibles en 33ml à 100 DH.',
    guide: `<p><strong>Angel :</strong> L\'accord chocolat-patchouli-caramel le plus audacieux. Pour les femmes qui aiment les parfums sucrés, gourmands et à fort sillage.</p>
  <p><strong>Alien :</strong> Le jasmin sambac ambré mystique. Pour les personnalités singulières qui veulent une signature unique.</p>`,
    faq: [
      ['Angel et Alien sont-ils très différents ?', 'Totalement opposés. Angel est gourmand et sucré (chocolat, caramel, patchouli). Alien est floral oriental (jasmin, ambre, bois de cachemire). Les deux ont une tenue exceptionnelle.'],
      ['Ces parfums conviennent-ils aux soirées ?', 'Oui, les deux sont des "soir" naturels — leur sillage puissant et leur personnalité affirmée sont idéaux pour les soirées et occasions spéciales.'],
    ]
  },
  {
    slug: 'parfums-inspires-creed',
    name: 'Creed',
    title: 'Parfums inspirés Creed au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Creed Aventus : ananas, bouleau, patchouli, musc. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Creed est la maison parfumée la plus prestigieuse du monde — fondée en 1760, fournisseur officiel de cours royales européennes pendant deux siècles. Aventus, lancé en 2010, est devenu la fragrance masculine de référence mondiale. Un ananas-bouleau-patchouli d\'une complexité rare, porté par des leaders d\'opinion du monde entier. Désormais accessible en 33ml à 100 DH.',
    guide: `<p><strong>Aventus :</strong> La fragrance du leader. Ananas juteux, bouleau fumé, jasmin et patchouli dans un accord sophistiqué et masculin. Pour l\'homme ambitieux, professionnel ou lors des occasions importantes.</p>`,
    faq: [
      ['Pourquoi Aventus coûte-t-il si cher en original ?', 'Creed utilise des matières premières rares (iris de Florence, musc blanc naturel) et une fabrication artisanale en petites séries. Un flacon 50ml original coûte 1 500 à 2 500 DH. Notre inspiré à 100 DH capture l\'essence de cet accord exceptionnel.'],
      ['Aventus est-il adapté à toutes les occasions ?', 'Oui, Aventus est polyvalent. Frais en tête, boisé-musqué en fond — il convient au bureau, aux réunions importantes, aux soirées et aux rendez-vous.'],
    ]
  },
  {
    slug: 'parfums-inspires-versace',
    name: 'Versace',
    title: 'Parfums inspirés Versace au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Versace : Eros, Dylan Blue, Crystal Noir, Bright Crystal. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Versace incarne la démesure italienne et le luxe méditerranéen. En parfumerie, Versace propose des fragrances directes, puissantes et très sillageantes. Eros pour lui (menthe-vanille), Dylan Blue (aquatique-boisé), Crystal Noir et Bright Crystal pour elle — 4 parfums iconiques disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Eros :</strong> Puissant et séducteur. Menthe fraîche, pomme verte et vanille crémeuse — pour les hommes qui aiment les parfums à fort sillage.</p>
  <p><strong>Dylan Blue :</strong> Frais et aquatique-boisé. Plus sobre qu\'Eros, élégant et polyvalent.</p>
  <p><strong>Crystal Noir :</strong> Oriental épicé pour la femme mystérieuse. Gingembre, gardénia, ambre.</p>
  <p><strong>Bright Crystal :</strong> Fruité-floral lumineux. Grenade, magnolia et musc — léger et moderne.</p>`,
    faq: [
      ['Eros convient-il pour le bureau ?', 'Eros est un parfum à fort sillage — préférable pour les soirées ou les sorties. Pour le bureau, Dylan Blue est plus discret et approprié.'],
      ['Crystal Noir ou Bright Crystal ?', 'Crystal Noir est oriental et mystérieux, pour les soirées. Bright Crystal est fruité et lumineux, parfait pour une utilisation quotidienne.'],
    ]
  },
  {
    slug: 'parfums-inspires-hermes',
    name: 'Hermès',
    title: 'Parfums inspirés Hermès au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées d\'Hermès : Terre d\'Hermès, Twilly d\'Hermès. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Hermès, fondée en 1837 à Paris, est le summum de l\'élégance française. Ses parfums portent la signature unique de Jean-Claude Ellena, nez de génie qui a créé Terre d\'Hermès — accord boisé-minéral révolutionnaire. Twilly d\'Hermès, lancé en 2017, est la déclaration de modernité audacieuse de la jeune femme Hermès.',
    guide: `<p><strong>Terre d\'Hermès :</strong> Pour l\'homme élégant et sobre. Boisé minéral avec pamplemousse et vétiver. Idéal au bureau et pour les occasions formelles.</p>
  <p><strong>Twilly d\'Hermès :</strong> Pour la femme qui s\'approprie l\'héritage Hermès à sa façon. Gingembre piquant, tubéreuse crémeuse et santal doux.</p>`,
    faq: [
      ['Vos inspirés Hermès ont-ils la même qualité de tenue ?', 'Nos fragrances inspirées d\'Hermès durent 6 à 8 heures avec un sillage discret et sophistiqué — dans l\'esprit de l\'original.'],
      ['Terre d\'Hermès est-il un parfum hivernal ?', 'Non, Terre d\'Hermès est polyvalent — sa minéralité et ses agrumes en font un parfum quatre-saisons, particulièrement apprécié au printemps et en automne.'],
    ]
  },
  {
    slug: 'parfums-inspires-maison-francis-kurkdjian',
    name: 'MFK',
    title: 'Parfums inspirés MFK Baccarat Rouge 540 au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée du Baccarat Rouge 540 de Maison Francis Kurkdjian. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Maison Francis Kurkdjian est la maison niche fondée en 2009 par Francis Kurkdjian, l\'un des nez les plus talentueux du monde. Baccarat Rouge 540, créé en 2015 pour cristallerie Baccarat, est devenu le phénomène olfactif mondial — la fragrance la plus désirée de la dernière décennie. Un accord jasmin-safran-ambre-cèdre d\'une luminosité unique. Disponible en 33ml à 100 DH.',
    guide: `<p><strong>Baccarat Rouge 540 :</strong> Fragrance unisexe d\'exception. Jasmin sambac, safran et ambre cristallin dans un accord lumineux et boisé que l\'on reconnaît immédiatement. Pour homme comme pour femme, du bureau aux soirées les plus élégantes.</p>`,
    faq: [
      ['Pourquoi Baccarat Rouge 540 est-il si célèbre ?', 'BR540 a été adopté massivement sur les réseaux sociaux puis par les célébrités mondiales. Son accord cristallin unique — ni trop sucré, ni trop boisé — crée un sillage immédiatement reconnaissable et universellement apprécié.'],
      ['Est-il vraiment unisexe ?', 'Oui, BR540 est conçu pour se porter aussi bien par les hommes que les femmes. Sa composition équilibrée (jasmin + cèdre) transcende les genres.'],
    ]
  },
  {
    slug: 'parfums-inspires-carolina-herrera',
    name: 'Carolina Herrera',
    title: 'Parfums inspirés Carolina Herrera au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Carolina Herrera : Good Girl, Bad Boy, 212 VIP, Very Good Girl, Good Girl Supreme, CH Men. Format 33ml à 100 DH. Livraison au Maroc.',
    intro: 'Carolina Herrera, la créatrice venezuelano-américaine, a bâti un empire de la mode et du parfum. Good Girl (2016) dans son flacon stiletto iconique est devenu un classique de la parfumerie moderne. Bad Boy pour lui, avec son accord poivre-cèdre électrique, lui répond parfaitement. 6 fragrances disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Good Girl :</strong> Le flacon stiletto iconique. Tubéreuse-cacao-tonka — dualité angélique et obscure. Idéal pour les soirées.</p>
  <p><strong>Bad Boy :</strong> Son pendant masculin. Poivre noir électrique et cèdre — pour l\'homme charismatique.</p>
  <p><strong>212 VIP :</strong> L\'esprit club new-yorkais. Musqué-fruité-santal pour les nuits urbaines.</p>
  <p><strong>Good Girl Supreme :</strong> Version plus fruitée et lumineuse — parfaite pour le quotidien.</p>
  <p><strong>Very Good Girl :</strong> Litchi-rose-vanille gourmand et frais.</p>
  <p><strong>CH Men :</strong> Cuir-santal raffiné pour l\'homme élégant.</p>`,
    faq: [
      ['Good Girl et Good Girl Supreme sont-ils très différents ?', 'Good Girl est plus sombre et oriental (cacao, tonka). Good Girl Supreme est plus fruité et lumineux (fruits rouges). Supreme convient mieux au quotidien, Good Girl aux soirées.'],
      ['Bad Boy est-il adapté pour le bureau ?', 'Oui, Bad Boy est puissant mais pas excessif — convient au bureau et aux sorties.'],
    ]
  },
  {
    slug: 'parfums-inspires-gucci',
    name: 'Gucci',
    title: 'Parfums inspirés Gucci au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Gucci : Gucci Bloom, Guilty Pour Homme. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Gucci, fondée à Florence en 1921, est l\'un des symboles les plus puissants du luxe italien. En parfumerie, Gucci Bloom (2017) a marqué un retour aux sources florales — un bouquet blanc luxuriant conçu par Alberto Morillas. Guilty Pour Homme (2011) reste une référence fougère moderne. Deux parfums iconiques en 33ml à 100 DH.',
    guide: `<p><strong>Gucci Bloom :</strong> Pour la femme qui aime les floraux riches et opulents. Tubéreuse, jasmin et rangoon dans un accord blanc sensuel.</p>
  <p><strong>Guilty Pour Homme :</strong> Fougère-oriental moderne. Lavande, patchouli et ambre — élégant et masculin.</p>`,
    faq: [
      ['Gucci Bloom est-il adapté au climat marocain ?', 'Oui, Gucci Bloom est un floral riche — il s\'épanouit à la chaleur. Idéal pour les soirées estivales et les occasions formelles.'],
      ['Guilty Pour Homme tient-il longtemps ?', 'Notre inspiré de Guilty Pour Homme offre une tenue de 6 à 8 heures avec un sillage aromatique modéré — parfait pour le bureau et les sorties.'],
    ]
  },
  {
    slug: 'parfums-inspires-valentino',
    name: 'Valentino',
    title: 'Parfums inspirés Valentino au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Valentino : Donna Born in Roma, Uomo Born in Roma. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Valentino, fondée à Rome en 1960, est synonyme de glamour et d\'élégance italienne. La collection Born in Roma capture l\'esprit de la Ville Éternelle — Donna pour elle, Uomo pour lui. Deux fragrances modernes et sophistiquées disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Donna Born in Roma :</strong> Jasmin-vanille bourbon opulent. Pour la femme élégante qui aime les floraux gourmands et féminins.</p>
  <p><strong>Uomo Born in Roma :</strong> Gingembre-sauge-bois de gaïac. Pour l\'homme moderne, épicé et raffiné.</p>`,
    faq: [
      ['Les parfums Born in Roma sont-ils unisexes ?', 'Donna est résolument féminin (jasmin, vanille). Uomo est masculin (épicé, boisé). Ils se complètent parfaitement pour un couple.'],
      ['Donna Born in Roma convient-il aux soirées ?', 'Oui, son accord jasmin-vanille bourbon gourmand est parfait pour les soirées et occasions festives.'],
    ]
  },
  {
    slug: 'parfums-inspires-parfums-de-marly',
    name: 'Parfums de Marly',
    title: 'Parfums inspirés Parfums de Marly au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Parfums de Marly : Delina, Layton, Pegasus, Percival. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Parfums de Marly est la maison niche fondée en 2009, inspirée par le faste de la cour de Versailles et des écuries royales de Marly. Ses fragrances — Delina, Layton, Pegasus, Percival — sont parmi les plus désirées au monde. Chez Parfum33ml.ma, ces 4 joyaux niche sont disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Delina :</strong> La princesse des parfums niche. Litchi-rose-pivoine-musc-vanille. Le floral le plus royal de la parfumerie contemporaine.</p>
  <p><strong>Layton :</strong> Pomme-lavande-vanille-cardamome. Le "Sauvage des connaisseurs" — l\'accord oriental qui conquiert Casablanca et Marrakech.</p>
  <p><strong>Pegasus :</strong> Amande-héliotrope-vanille-santal. Oriental poudré noble et raffiné.</p>
  <p><strong>Percival :</strong> Lavande-néroli-musc-ambroxan. Clean et moderne — polyvalent au quotidien.</p>`,
    faq: [
      ['Pourquoi les parfums de Marly sont-ils si réputés ?', 'Parfums de Marly combine des matières premières nobles, une formulation généreuse et un storytelling autour de l\'héritage royal français. Layton et Delina sont devenus des références mondiales du segment niche accessible.'],
      ['Layton est-il adapté à toutes les saisons ?', 'Layton est particulièrement apprécié en automne-hiver. En été, son accord vanillé peut être trop chaud — préférez Percival pour la saison chaude.'],
    ]
  },
  {
    slug: 'parfums-inspires-tom-ford',
    name: 'Tom Ford',
    title: 'Parfums inspirés Tom Ford au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Tom Ford : Ombré Leather, Tobacco Vanille. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Tom Ford est la maison de luxe fondée en 2006 par le créateur américain Tom Ford. Ses parfums Private Blend — Tobacco Vanille, Ombré Leather — sont devenus des icônes de la parfumerie niche. Puissants, sensuels et inoubliables, ils transcendent les genres. Disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Ombré Leather :</strong> Le cuir absolu. Cardamome-jasmin-patchouli-cuir dans un accord intense, viril et sophistiqué. Pour les occasions importantes et les soirées.</p>
  <p><strong>Tobacco Vanille :</strong> Tabac-vanille-cacao opulent. Oriental luxueux et warm — parfait pour l\'hiver et les soirées d\'automne.</p>`,
    faq: [
      ['Tom Ford convient-il pour tous les jours ?', 'Les parfums Tom Ford sont puissants et marquants — plutôt pour les occasions spéciales, les soirées ou les jours où l\'on veut affirmer sa présence.'],
      ['Ombré Leather est-il unisexe ?', 'Oui, bien que lancé dans la collection masculin, Ombré Leather est porté par des femmes qui aiment les parfums cuirés et affirmés.'],
    ]
  },
  {
    slug: 'parfums-inspires-prada',
    name: 'Prada',
    title: 'Parfums inspirés Prada au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Prada : Paradoxe, Luna Rossa Carbon. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Prada, symbole d\'intellect et d\'avant-garde italienne, crée des parfums qui questionnent les conventions. Paradoxe (2022) pour elle est un jeu de lumière olfactif entre néroli et ambre. Luna Rossa Carbon (2017) pour lui capture l\'énergie de la navigation sportive. En 33ml à 100 DH.',
    guide: `<p><strong>Paradoxe :</strong> Néroli-jasmin-ambre-musc. Floral lumineux et complexe pour la femme intellectuelle qui aime les fragrances modernes et originales.</p>
  <p><strong>Luna Rossa Carbon :</strong> Bergamote-poivre-lavande-ambroxan. Aquatique-boisé frais et masculin — polyvalent du bureau à la soirée.</p>`,
    faq: [
      ['Paradoxe est-il adapté au bureau ?', 'Oui, Paradoxe est discret et sophistiqué — parfait pour un environnement professionnel tout en restant élégant pour les sorties.'],
      ['Luna Rossa Carbon est-il différent d\'Invictus ?', 'Oui, Luna Rossa Carbon est plus minéral et poivré qu\'Invictus. Il s\'adresse à un homme plus raffiné qui recherche une fragrance aquatique-boisée moderne.'],
    ]
  },
  {
    slug: 'parfums-inspires-chloe',
    name: 'Chloé',
    title: 'Parfums inspirés Chloé au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Chloé EDP : pivoine, litchi, rose, cèdre. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Chloé incarne la féminité romantique et naturelle — une élégance parisienne décontractée et accessible. Chloé EDP (2008), créé par Michel Almairac, est devenu un classique discret et raffiné : pivoine printanière, litchi juteux et rose absolue sur un fond de cèdre. En 33ml à 100 DH.',
    guide: `<p><strong>Chloé EDP :</strong> Floral poudré délicat et romantique. Pivoine, litchi et rose — idéal pour le quotidien, le bureau et les occasions romantiques. Un parfum à la fois discret et mémorable.</p>`,
    faq: [
      ['Chloé EDP est-il un parfum léger ?', 'Oui, Chloé EDP est dans la catégorie des floraux discrets — son sillage est délicat et raffiné, idéal pour le bureau et les espaces fermés.'],
      ['Est-il adapté au printemps et à l\'été ?', 'Chloé EDP est particulièrement adapté au printemps — son accord pivoine-rose est lumineux et frais. En été, appliquez-le le soir ou dans les zones fraîches.'],
    ]
  },
  {
    slug: 'parfums-inspires-givenchy',
    name: 'Givenchy',
    title: 'Parfums inspirés Givenchy au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Givenchy : L\'Interdit, Irresistible, Gentleman. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Givenchy, fondée en 1952 par Hubert de Givenchy, est synonyme d\'élégance parisienne et de sophistication. Ses parfums jouent sur la dualité — L\'Interdit entre lumière et obscurité, Irresistible entre fraîcheur et sensualité, Gentleman entre force et raffinement. En 33ml à 100 DH.',
    guide: `<p><strong>L\'Interdit :</strong> Tubéreuse-fleur d\'oranger-vétiver. Floral sombre et envoûtant pour les femmes aux personnalités affirmées.</p>
  <p><strong>Irresistible :</strong> Rose-iris-musc lumineux. Plus léger et accessible — parfait pour le quotidien.</p>
  <p><strong>Gentleman :</strong> Iris-lavande-patchouli-cèdre. L\'homme élégant et sophistiqué — du bureau aux cérémonies.</p>`,
    faq: [
      ['L\'Interdit ou Irresistible — lequel choisir ?', 'L\'Interdit est plus sombre et sillageant — pour les soirées et les femmes qui veulent marquer les esprits. Irresistible est plus lumineux et quotidien.'],
      ['Gentleman est-il adapté au bureau ?', 'Oui, Gentleman est un parfum élégant et modéré — idéal pour le bureau, les réunions et les occasions formelles.'],
    ]
  },
  {
    slug: 'parfums-inspires-guerlain',
    name: 'Guerlain',
    title: 'Parfums inspirés Guerlain au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Guerlain : Mon Guerlain, L\'Homme Idéal. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Guerlain est la plus ancienne maison de parfumerie française encore en activité — fondée en 1828. Depuis plus de 190 ans, la maison crée des fragrances d\'exception : Shalimar (1925), Mitsouko (1919), et plus récemment Mon Guerlain (2017) et L\'Homme Idéal (2014). Un héritage de luxe désormais accessible en 33ml à 100 DH.',
    guide: `<p><strong>Mon Guerlain :</strong> Lavande-vanille-jasmin-santal. Oriental sensuel pour la femme moderne — entre fraîcheur et chaleur, du bureau à la soirée.</p>
  <p><strong>L\'Homme Idéal :</strong> Amande-cerise-cuir-santal. Gourmand masculin élégant — pour les hommes qui aiment les parfums chaleureux et distinctifs.</p>`,
    faq: [
      ['Mon Guerlain est-il un parfum de jour ou de soir ?', 'Mon Guerlain est polyvalent — sa lavande le rend frais pour le jour, sa vanille et son jasmin le rendent sensuel pour le soir.'],
      ['L\'Homme Idéal est-il vraiment gourmand ?', 'Oui, avec l\'amande douce et la cerise, L\'Homme Idéal est dans la famille gourmande — mais le cuir lui apporte une dimension masculine et sophistiquée.'],
    ]
  },
  {
    slug: 'parfums-inspires-hugo-boss',
    name: 'Hugo Boss',
    title: 'Parfums inspirés Hugo Boss au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Hugo Boss : Boss Bottled, The Scent, The Scent For Her. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Hugo Boss, la maison de mode et de parfumerie allemande fondée en 1924, est devenue un empire mondial du parfum masculin. Boss Bottled (1998) est l\'un des parfums masculins les plus vendus de l\'histoire. The Scent (2015) a renouvelé l\'ADN Boss avec un accord gingembre-cuir séduisant. En 33ml à 100 DH.',
    guide: `<p><strong>Boss Bottled :</strong> Pomme-cannelle-santal-cèdre. Le parfum du succès professionnel — sobre, élégant et intemporel. Idéal au bureau.</p>
  <p><strong>The Scent :</strong> Gingembre-maninka-cuir-lavande. Plus séducteur et charnel — pour les soirées et les rendez-vous.</p>
  <p><strong>The Scent For Her :</strong> Pêche-freesia-cacao-vanille. Féminin et gourmand — pour la femme douce et addictive.</p>`,
    faq: [
      ['Boss Bottled est-il encore moderne ?', 'Oui, Boss Bottled a été reformulé et reste un classique intemporel. Son accord boisé-épicé discret convient parfaitement au bureau moderne.'],
      ['The Scent pour femme ou pour homme ?', 'The Scent existe en version pour lui (gingembre-cuir) et pour elle (pêche-cacao). Les deux sont complémentaires pour un couple.'],
    ]
  },
  {
    slug: 'parfums-inspires-jean-paul-gaultier',
    name: 'Jean Paul Gaultier',
    title: 'Parfums inspirés Jean Paul Gaultier au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Jean Paul Gaultier : Le Mâle, Scandal, Ultra Male, Classique, Scandal Pour Homme. Format 33ml à 100 DH. Livraison au Maroc.',
    intro: 'Jean Paul Gaultier, l\'enfant terrible de la mode française, a révolutionné la parfumerie avec Le Mâle en 1995 — le marin-lavande le plus iconique du monde. Classique pour elle, Scandal dans son corset, Ultra Male hypermasculin — 5 fragrances audacieuses disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Le Mâle :</strong> Menthe-lavande-vanille-tonka. L\'icône absolue. Pour l\'homme séducteur et affirmé.</p>
  <p><strong>Ultra Male :</strong> Version plus intense et gourmande — poire-lavande-vanille.</p>
  <p><strong>Scandal (femme) :</strong> Miel-gardénia-caramel-patchouli. Pour la femme scandaleusement addictive.</p>
  <p><strong>Scandal Pour Homme :</strong> Caramel-tonka-vétiver — masculin et provocateur.</p>
  <p><strong>Classique :</strong> Rose-fleur d\'oranger-vanille-ambre. Oriental féminin intemporel.</p>`,
    faq: [
      ['Le Mâle et Ultra Male — lequel choisir ?', 'Le Mâle est plus équilibré et polyvalent. Ultra Male est plus intense et sucré — pour les soirées et les hommes qui aiment les parfums à fort sillage.'],
      ['Scandal (femme) convient-il aux soirées ?', 'Oui, Scandal est conçu pour les soirées — son accord miel-caramel est trop marqué pour le bureau.'],
    ]
  },
  {
    slug: 'parfums-inspires-kenzo',
    name: 'Kenzo',
    title: 'Parfums inspirés Kenzo au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Kenzo : Flower, Kenzo Homme. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Kenzo, fondée par Kenzo Takada à Paris en 1970, fusionne l\'élégance japonaise et la créativité parisienne. Flower de Kenzo (2000) est devenu un classique floral-poudré reconnaissable à son flacon coquelicot. Kenzo Homme apporte la fraîcheur aquatique boisée. En 33ml à 100 DH.',
    guide: `<p><strong>Flower de Kenzo :</strong> Rose-violette-vanille-musc. Floral poudré délicat et iconique — pour le quotidien et les occasions romantiques.</p>
  <p><strong>Kenzo Homme :</strong> Bois aquatique-yuzu-poivre. Frais et rafraîchissant — parfait pour le bureau et les journées actives.</p>`,
    faq: [
      ['Flower de Kenzo est-il démodé ?', 'Non, Flower est un classique intemporel qui revient constamment en tendance. Son accord poudré-floral plaît à de nombreuses femmes, tous âges confondus.'],
      ['Kenzo Homme est-il adapté à l\'été marocain ?', 'Oui, sa fraîcheur aquatique et son yuzu en font un parfum idéal pour les journées chaudes.'],
    ]
  },
  {
    slug: 'parfums-inspires-montblanc',
    name: 'Montblanc',
    title: 'Parfums inspirés Montblanc au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Montblanc : Explorer, Legend. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Montblanc, la maison de maroquinerie de luxe fondée en 1906, a développé une gamme parfums appréciée pour son excellente qualité-prix. Legend (2011) est une fougère boisée moderne universellement appréciée. Explorer (2019) est un aventurier boisé-cacoté qui évoque les grands espaces. En 33ml à 100 DH.',
    guide: `<p><strong>Legend :</strong> Bergamote-lavande-santal-tonka. Fougère boisée universelle — pour tous les jours, du bureau aux sorties. Idéal pour débuter en parfumerie masculine.</p>
  <p><strong>Explorer :</strong> Bergamote-vétiver-patchouli-cacao. Boisé aventurier et masculin — pour l\'homme actif et moderne.</p>`,
    faq: [
      ['Legend est-il comparable à d\'autres parfums connus ?', 'Legend est dans la famille des fougères boisées, proche de Bleu de Chanel dans l\'esprit, mais avec moins de puissance. Un excellent rapport qualité-prix.'],
      ['Explorer est-il un parfum de bureau ou de soirée ?', 'Explorer est polyvalent — son accord boisé-cacao convient au bureau en hiver et aux sorties toute l\'année.'],
    ]
  },
  {
    slug: 'parfums-inspires-narciso-rodriguez',
    name: 'Narciso Rodriguez',
    title: 'Parfums inspirés Narciso Rodriguez au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Narciso Rodriguez For Her : musc, fleur d\'oranger, ambre. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Narciso Rodriguez, le créateur de mode américain, a signé l\'un des parfums les plus sensuels et discrets de l\'histoire moderne : For Her (2003). Un musc blanc d\'une pureté absolue — la fragrance qui se fond à la peau pour créer une seconde nature unique. Disponible en 33ml à 100 DH.',
    guide: `<p><strong>For Her :</strong> Musc blanc-fleur d\'oranger-ambre. La sensualité discrète absolue. Pour la femme qui veut laisser une empreinte intime et sophistiquée — un parfum qui semble venir de la peau elle-même.</p>`,
    faq: [
      ['For Her est-il un parfum discret ?', 'Oui, For Her est dans la catégorie des parfums "peau" — il est discret en sillage mais présent pour ceux qui s\'approchent. Parfait pour le bureau et les espaces fermés.'],
      ['For Her convient-il toute l\'année ?', 'Oui, le musc blanc est une fragrance quatre-saisons. Il est particulièrement apprécié en automne-hiver pour sa chaleur sensuelle.'],
    ]
  },
  {
    slug: 'parfums-inspires-azzaro',
    name: 'Azzaro',
    title: 'Parfums inspirés Azzaro au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées d\'Azzaro : Wanted, The Most Wanted. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Loris Azzaro, le créateur français d\'origine tunisienne, a fondé sa maison en 1967 et créé des fragrances masculines charismatiques. Wanted (2016) avec son accord citron-gingembre-tonka est devenu l\'un des parfums masculins les plus appréciés de la décennie. The Most Wanted (2021) amplifie le registre gourmand. En 33ml à 100 DH.',
    guide: `<p><strong>Wanted :</strong> Citron-gingembre-tonka-vétiver. Épicé et charismatique — pour l\'homme magnétique. Du bureau aux soirées.</p>
  <p><strong>The Most Wanted :</strong> Cardamome-toffee-ambre-cèdre. Plus gourmand et intense — pour les soirées et l\'automne-hiver.</p>`,
    faq: [
      ['Wanted est-il adapté au Maroc ?', 'Oui, Wanted est polyvalent et adapté à toutes les saisons. En été, appliquez-le le matin. En hiver, il déploie tout son potentiel.'],
      ['The Most Wanted est-il très sucré ?', 'Oui, The Most Wanted est dans la catégorie gourmand-oriental avec le toffee caramelé. Si vous aimez les parfums sucrés, c\'est un excellent choix.'],
    ]
  },
  {
    slug: 'parfums-inspires-burberry',
    name: 'Burberry',
    title: 'Parfums inspirés Burberry au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Burberry Her : baies rouges, jasmin, musc. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Burberry, fondée à Basingstoke en 1856, est l\'une des marques de luxe britanniques les plus reconnues. Burberry Her (2018), créé par Francis Kurkdjian, est un fruit-floral-musqué moderne — baies rouges pétillantes, jasmin délicat et musc doux. Une fragrance jeune, accessible et universellement appréciée. En 33ml à 100 DH.',
    guide: `<p><strong>Burberry Her :</strong> Baies rouges-jasmin-musc. Fruité-floral moderne et gourmand — pour la femme jeune et dynamique. Idéal pour le quotidien, le printemps et l\'été.</p>`,
    faq: [
      ['Burberry Her est-il adapté à une première fragrance ?', 'Oui, c\'est une excellente première fragrance — son accord fruité-floral est accessible, moderne et universel.'],
      ['Burberry Her tient-il longtemps ?', 'Notre inspiré offre une tenue de 5 à 7 heures — légèrement moins sillageant que les oriental, ce qui le rend parfait pour le bureau.'],
    ]
  },
  {
    slug: 'parfums-inspires-viktor-rolf',
    name: 'Viktor & Rolf',
    title: 'Parfums inspirés Viktor & Rolf au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Viktor & Rolf : Flowerbomb, Spicebomb. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Le duo de designers hollandais Viktor Horsting et Rolf Snoeren ont créé deux "bombes" olfactives devenues cultes. Flowerbomb (2005) pour elle — une explosion florale baroque. Spicebomb (2012) pour lui — une bombe épicée provocante. Les deux sont des parfums extravagants et à fort sillage disponibles en 33ml à 100 DH.',
    guide: `<p><strong>Flowerbomb :</strong> Rose-jasmin-orchidée-patchouli. Explosion florale opulente — pour les femmes qui aiment les parfums riches et enveloppants. Idéal pour les soirées.</p>
  <p><strong>Spicebomb :</strong> Poivre-safran-tabac-cuir. Épicé explosif et masculin — pour les soirées et les hommes qui assument leur présence.</p>`,
    faq: [
      ['Flowerbomb convient-il au bureau ?', 'Flowerbomb est puissant — son sillage opulent peut être envahissant en espace fermé. Préférez-le pour les soirées. Pour le bureau, choisissez une application plus légère ou une autre fragrance.'],
      ['Spicebomb ou Spicebomb Extreme ?', 'Nous proposons Spicebomb (la version originale). Spicebomb Extreme est encore plus intense — l\'original est déjà très affirmé et suffisant pour la majorité.'],
    ]
  },
];

function genBrandPage(brand) {
  const url = `${CANON}/${brand.slug}`;
  const brandProds = ALL.filter(p => p.brand === brand.name);
  const prodNames = brandProds.map(p => p.name).join(', ');

  const schemaCollectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Parfums inspirés ${brand.name} au Maroc`,
    description: brand.desc,
    url,
    provider: { '@type': 'Organization', name: 'Parfum33ml.ma', url: CANON }
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: CANON },
      { '@type': 'ListItem', position: 2, name: `Parfums inspirés ${brand.name}`, item: url }
    ]
  };

  const cards = productCards(brand.name);
  const count = brandProds.length;
  const faqItems = brand.faq.map(([q, a]) => `  <p><strong>Q : ${q}</strong><br>${a}</p>`).join('\n');

  return `${head({ title: brand.title, desc: brand.desc, canonical: url, schema: [schemaCollectionPage, schemaBreadcrumb] })}
${NAV}

<div class="breadcrumb">
  <a href="/">Accueil</a><span class="sep">›</span>
  <span>Parfums inspirés ${brand.name}</span>
</div>

<div class="static-hero">
  <span class="article-tag">Marque</span>
  <h1>Parfums inspirés <em>${brand.name}</em></h1>
  <p>${brand.desc}</p>
  <a href="/parfums-femme" class="btn-p" style="margin-top:4px">Voir la collection →</a>
</div>

<div class="static-content">

<div class="static-section">
  <h2>Nos ${count} fragrance${count > 1 ? 's' : ''} inspirée${count > 1 ? 's' : ''} de ${brand.name}</h2>
  <p>${brand.intro}</p>
  <div class="static-card-grid">
${cards}
  </div>
</div>

<div class="static-section">
  <h2>Quel parfum ${brand.name} choisir ?</h2>
  ${brand.guide}
</div>

<div class="static-section">
  <h2>FAQ — Parfums inspirés ${brand.name} au Maroc</h2>
${faqItems}
  <p><strong>Q : Livraison à Casablanca, Rabat, Marrakech ?</strong><br>Livraison en 24h à Casablanca et Rabat, 24-48h dans toutes les autres villes du Maroc. Gratuite dès 3 flacons commandés.</p>
</div>

<div class="article-cta">
  <h3 style="font-family:var(--ff-d);font-size:22px;margin-bottom:8px">Commandez votre fragrance inspirée de ${brand.name}</h3>
  <p style="color:var(--txt2);font-size:14px;margin-bottom:16px">${count} fragrance${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''} · 33ml à 100 DH · Livraison 24-48h partout au Maroc</p>
  <a href="/parfums-femme" class="btn-p">Collection Femme →</a>
  <a href="/parfums-homme" class="btn-o">Collection Homme →</a>
</div>

</div>

${FOOTER}
</body>
</html>`;
}

// ── Generate all pages ────────────────────────────────────────────────────
let count = 0;
BRANDS.forEach(brand => {
  const html = genBrandPage(brand);
  const filePath = path.join(BASE, `${brand.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${brand.slug}.html`);
  count++;
});
console.log(`\n✅ ${count} brand pages generated.`);
