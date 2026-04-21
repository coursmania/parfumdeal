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

const NAV = `<div class="announce-bar">✦ Livraison gratuite à partir de 3 parfums — Partout au Maroc 🇲🇦 · Commandez sur WhatsApp →</div>
<nav class="static-nav">
  <a href="/" class="static-logo"><img src="/dossier%20parfum/logo-h.png" alt="Parfum33ml.ma — L'Art du Parfum" loading="eager"></a>
  <div class="static-nav-links">
    <a href="/parfums-femme">Parfum Femme</a>
    <a href="/parfums-homme">Parfum Homme</a>
    <a href="/coffrets">Coffrets</a>
    <a href="/blog">Blog</a>
  </div>
  <a href="${WA}" class="static-nav-cta" target="_blank" rel="noopener">Commander →</a>
</nav>`;

const SOCIAL_SVG = {
  ig: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  tt: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`,
  wa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
};

const FOOTER = `<footer class="static-footer">
<div class="footer-grid">
  <div class="footer-brand">
    <a href="/"><img src="/dossier%20parfum/logo-h.png" alt="Parfum33ml.ma — L'Art du Parfum" style="height:70px;mix-blend-mode:lighten;display:block;margin-bottom:12px"></a>
    <p>+100 fragrances inspirées en 33ml à 100 DH. Livraison rapide partout au Maroc.</p>
    <div class="social-links">
      <a href="https://www.instagram.com/parfum33ml.ma" target="_blank" rel="noopener" class="social-link" title="Instagram">${SOCIAL_SVG.ig}</a>
      <a href="https://www.tiktok.com/@parfum33ml.ma" target="_blank" rel="noopener" class="social-link" title="TikTok">${SOCIAL_SVG.tt}</a>
      <a href="${WA}" target="_blank" rel="noopener" class="social-link" title="WhatsApp">${SOCIAL_SVG.wa}</a>
    </div>
    <div class="trust-badges" style="margin-top:16px">
      <div class="trust-badge">🔒 Paiement sécurisé</div>
      <div class="trust-badge">📦 Livraison 24-48h</div>
      <div class="trust-badge">💬 Support WhatsApp 7j/7</div>
    </div>
    <div class="footer-payment">
      <p>Modes de paiement</p>
      <img src="/dossier%20parfum/logo%20bancaire/banniere%20bancaire.jpg" alt="Modes de paiement acceptés au Maroc">
    </div>
  </div>
  <div>
    <h4>Navigation</h4>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/parfums-femme">Parfums Femme</a></li>
      <li><a href="/parfums-homme">Parfums Homme</a></li>
      <li><a href="/coffrets">Coffrets &amp; Packs</a></li>
      <li><a href="/coffrets/pack-couple">Pack Couple 180 DH</a></li>
      <li><a href="/coffrets/pack-decouverte">Pack Découverte 450 DH</a></li>
      <li><a href="/coffrets/pack-collection">Pack Collection 800 DH</a></li>
      <li><a href="/parfum-du-mois">🔥 Parfum du Mois</a></li>
      <li><a href="/livraison-gratuite">🚚 Livraison gratuite dès 3</a></li>
      <li><a href="/blog">Blog Parfum</a></li>
    </ul>
  </div>
  <div>
    <h4>Marques</h4>
    <ul>
      <li><a href="/parfums-inspires-dior">Dior</a></li>
      <li><a href="/parfums-inspires-chanel">Chanel</a></li>
      <li><a href="/parfums-inspires-ysl">YSL</a></li>
      <li><a href="/parfums-inspires-tom-ford">Tom Ford</a></li>
      <li><a href="/parfums-inspires-creed">Creed</a></li>
      <li><a href="/parfums-inspires-parfums-de-marly">Parfums de Marly</a></li>
      <li><a href="/parfums-inspires-maison-francis-kurkdjian">MFK</a></li>
    </ul>
  </div>
  <div>
    <h4>Villes</h4>
    <div class="footer-cities">
      <a href="/casablanca">Casablanca</a><a href="/rabat">Rabat</a><a href="/marrakech">Marrakech</a>
      <a href="/tanger">Tanger</a><a href="/fes">Fès</a><a href="/agadir">Agadir</a>
      <a href="/oujda">Oujda</a><a href="/meknes">Meknès</a><a href="/kenitra">Kénitra</a>
      <a href="/tetouan">Tétouan</a><a href="/nador">Nador</a><a href="/el-jadida">El Jadida</a>
      <a href="/safi">Safi</a><a href="/beni-mellal">Béni Mellal</a>
      <a href="/settat">Settat</a><a href="/larache">Larache</a>
    </div>
  </div>
  <div>
    <h4>Contact</h4>
    <ul>
      <li><a href="${WA}" target="_blank" rel="noopener">💬 WhatsApp</a></li>
      <li><a href="mailto:contact@parfum33ml.ma">📧 contact@parfum33ml.ma</a></li>
      <li><a href="https://www.instagram.com/parfum33ml.ma" target="_blank" rel="noopener">📸 @parfum33ml.ma</a></li>
    </ul>
    <h4 style="margin-top:20px">Horaires</h4>
    <ul>
      <li>Lun – Sam : 9h – 20h</li>
      <li>Dim : 10h – 18h</li>
    </ul>
  </div>
</div>
<div class="footer-bottom">
  <span>© 2026 Parfum33ml.ma — Fragrances inspirées 33ml</span>
  <div class="footer-legal">
    <a href="/">Mentions légales</a>
    <a href="/">Politique de confidentialité</a>
    <a href="/">CGV</a>
    <a href="/">Politique de retour</a>
    <a href="/">Cookies</a>
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
    story: `<p>Armand Petitjean fonde Lancôme en 1935 avec un rêve paradoxal : rendre l'élégance française accessible au plus grand nombre. La maison s'impose d'abord en beauté, avant que la parfumerie ne devienne son territoire le plus emblématique. Trésor (1990) est le premier grand succès — un floral poudré romantique signé Sophia Grojsman qui reste l'un des dix parfums les plus vendus de l'histoire.</p>
  <p>La révolution arrive en 2012 avec <strong>La Vie est Belle</strong>, co-créé par Daphné Bugey et Anne Flipo. Ce parfum brise les conventions en associant iris gourmand, praline sucrée et fleurs blanches dans un accord qui réconcilie l'élégance parisienne et la tendance gourmande. En quelques années, il devient le parfum féminin le plus vendu au monde — un accomplissement rarissime dans la parfumerie moderne.</p>`,
    maroc: `<p>La Vie est Belle est l'une des fragrances féminines les plus commandées sur Parfum33ml.ma. Son accord iris-praline, à la fois sophistiqué et accessible, correspond parfaitement aux occasions marocaines : du bureau au salon de réception en passant par les sorties en famille. La chaleur marocaine sublime sa note gourmande sans l'alourdir.</p>
  <p>Trésor reste incontournable pour les cérémonies — mariages, fiançailles, Aïd — où les femmes marocaines privilégient les floraux poudrés de qualité. Idôle, plus légère, est devenue la fragrance de prédilection des femmes actives de Casablanca et Rabat pour le quotidien au bureau.</p>`,
    guide: `<p><strong>La Vie est Belle :</strong> Le best-seller universel. Accord iris-praline gourmand et féminin — pour toutes les occasions, du bureau à la cérémonie.</p>
  <p><strong>Idôle :</strong> La rose moderne et lumineuse. Légère, fraîche et contemporaine — parfaite pour le bureau et les journées chargées.</p>
  <p><strong>Trésor :</strong> Floral poudré romantique pour les cérémonies, mariages et occasions spéciales. Un classique à offrir.</p>
  <p><strong>La Nuit Trésor :</strong> Version plus intense de Trésor — rose, framboise et vanille pour les soirées et sorties nocturnes.</p>`,
    faq: [
      ['Vos parfums inspirés de Lancôme sont-ils des contrefaçons ?', 'Non. Ce sont des fragrances inspirées légalement commercialisées, créées pour capturer l\'essence olfactive des originaux sans reproduire leurs formules ou utiliser leurs marques.'],
      ['La Vie est Belle est-elle disponible en 33ml ?', 'Oui, notre fragrance inspirée de La Vie est Belle est disponible en format 33ml à 100 DH, avec une tenue de 6 à 8 heures.'],
      ['Trésor ou La Vie est Belle pour un mariage ?', 'Trésor (floral poudré classique) convient aux cérémonies élégantes et raffinées. La Vie est Belle (iris-praline gourmand) est plus moderne et universellement aimé. Pour offrir, La Vie est Belle est le choix le plus sûr.'],
    ]
  },
  {
    slug: 'parfums-inspires-mugler',
    name: 'Mugler',
    title: 'Parfums inspirés Mugler au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Mugler : Alien, Angel. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Thierry Mugler a révolutionné la parfumerie en 1992 avec Angel, premier parfum gourmand de l\'histoire. Puis en 2005 avec Alien, l\'ovni olfactif au jasmin ambré unique. Deux fragrances iconiques, reconnaissables entre toutes, désormais accessibles en 33ml à 100 DH.',
    story: `<p>Manfred Thierry Mugler naît à Strasbourg en 1948 et devient l'un des créateurs de mode les plus provocateurs de sa génération — connu pour ses épaulettes sculptées et ses silhouettes futuristes. En 1992, il commet un acte révolutionnaire en parfumerie : <strong>Angel</strong>, premier parfum "gourmand" de l'histoire, inspiré des odeurs de son enfance — barbe à papa, praline, fête foraine. L'accord chocolat-patchouli-caramel scandalise les puristes et conquiert le monde entier.</p>
  <p>Angel redéfinit les règles de la parfumerie féminine et ouvre la voie à toute une génération de fragrances sucrées. En 2005, Alien confirme le statut d'ovni olfactif de la maison : un jasmin sambac d'une pureté absolue, suspendu dans un halo d'ambre et de bois de cachemire — une fragrance extraterrestre conçue pour les femmes qui assument leur singularité.</p>`,
    maroc: `<p>Angel est l'un des parfums féminins à plus fort sillage de notre catalogue — une caractéristique appréciée au Maroc où le sillage est une expression de présence sociale. Son accord caramel-patchouli se déploie magnifiquement à la chaleur des soirées marocaines, créant une traîne enveloppante qui marque les esprits.</p>
  <p>Alien séduit les femmes marocaines qui cherchent une fragrance distinctive et mémorable, loin des floraux conventionnels. Son jasmin ambré résonne avec la culture olfactive orientale tout en restant résolument contemporain — un pont entre deux univers.</p>`,
    guide: `<p><strong>Angel :</strong> L'accord chocolat-patchouli-caramel le plus audacieux de la parfumerie. Pour les femmes qui aiment les parfums sucrés, puissants, à fort sillage. Idéal le soir et en automne-hiver.</p>
  <p><strong>Alien :</strong> Le jasmin sambac ambré mystique. Pour les personnalités singulières qui veulent une signature immédiatement reconnaissable. Puissant en toute saison.</p>`,
    faq: [
      ['Angel et Alien sont-ils très différents ?', 'Totalement opposés. Angel est gourmand et sucré (chocolat, caramel, patchouli). Alien est floral oriental (jasmin, ambre, bois de cachemire). Les deux ont une tenue exceptionnelle mais des caractères radicalement différents.'],
      ['Ces parfums conviennent-ils aux soirées ?', 'Oui, les deux sont des fragrances de soirée naturelles — leur sillage puissant et leur personnalité affirmée sont idéaux pour les soirées, fêtes et occasions spéciales. Pour le bureau, la projection peut être un peu forte.'],
      ['Pourquoi Angel a-t-il une étoile sur le flacon ?', 'L\'étoile symbolise l\'univers magique de l\'enfance de Thierry Mugler — les fêtes foraines, les lumières, les odeurs sucrées. Elle est devenue l\'une des silhouettes de flacon les plus reconnaissables de la parfumerie mondiale.'],
    ]
  },
  {
    slug: 'parfums-inspires-creed',
    name: 'Creed',
    title: 'Parfums inspirés Creed au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Creed Aventus : ananas, bouleau, patchouli, musc. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Creed est la maison parfumée la plus prestigieuse du monde — fondée en 1760, fournisseur officiel de cours royales européennes pendant deux siècles. Aventus, lancé en 2010, est devenu la fragrance masculine de référence mondiale. Un ananas-bouleau-patchouli d\'une complexité rare, porté par des leaders d\'opinion du monde entier. Désormais accessible en 33ml à 100 DH.',
    story: `<p>James Henry Creed fonde la maison en 1760 à Londres, d\'abord comme tailleur. La parfumerie s\'impose rapidement — Creed fournit les cours royales d\'Angleterre, de France (Napoléon III en était client), d\'Autriche et d\'Espagne. La maison obtient plusieurs <em>Royal Warrant</em>, distinctions réservées aux fournisseurs officiels de la Couronne britannique. Six générations plus tard, Olivier Creed perpétue cet héritage unique.</p>
  <p><strong>Aventus</strong>, lancé en 2010, est né de l\'admiration d\'Olivier Creed pour la figure de Napoléon Bonaparte. L\'ananas du tête évoque ses victoires militaires, le bouleau fumé rappelle les feux des bivouacs, le patchouli la terre conquise. Cet accord d\'une complexité rare est devenu en moins de quinze ans la fragrance masculine la plus commentée sur internet — aucun autre parfum n\'a généré autant de critiques, de comparaisons et de discussions entre connaisseurs.</p>`,
    maroc: `<p>Aventus est considéré au Maroc comme la "fragrance du succès" — portée lors des réunions importantes, des négociations d\'affaires et des cérémonies de mariage par les hommes qui veulent affirmer leur statut. Sa rareté relative (peu de points de vente physiques au Maroc) en fait un choix distinctif et valorisant.</p>
  <p>Chez Parfum33ml.ma, Aventus est l\'une de nos fragrances masculines les plus commandées par des clients de Casablanca, Rabat et Marrakech — souvent des entrepreneurs et cadres qui connaissent la fragrance originale et recherchent un accès quotidien à cet accord exceptionnel à 100 DH.</p>`,
    guide: `<p><strong>Aventus :</strong> La fragrance du leader. Ananas juteux, bouleau fumé, jasmin et patchouli dans un accord sophistiqué et masculin. Pour l'homme ambitieux — réunions importantes, occasions formelles, soirées. Polyvalent quatre saisons.</p>`,
    faq: [
      ['Pourquoi Aventus coûte-t-il si cher en original ?', 'Creed utilise des matières premières rares (ambre gris naturel, musc de fleur de nuit) et une fabrication artisanale. Un flacon 50ml original dépasse 2 000 DH. Notre inspiré à 100 DH capture l\'essence de cet accord exceptionnel dans un format quotidien.'],
      ['Aventus est-il adapté à toutes les occasions ?', 'Oui, Aventus est l\'un des rares parfums véritablement polyvalents. Frais et fruité en tête, boisé-musqué en fond — il convient au bureau, aux réunions importantes, aux soirées et aux rendez-vous romantiques.'],
      ['Creed fabrique-t-il encore Aventus artisanalement ?', 'Creed maintient ses méthodes de fabrication en petite série avec macération longue (6 semaines minimum). Chaque lot diffère légèrement selon les matières premières — ce qui explique les discussions entre "batches" dans la communauté des connaisseurs.'],
    ]
  },
  {
    slug: 'parfums-inspires-versace',
    name: 'Versace',
    title: 'Parfums inspirés Versace au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Versace : Eros, Dylan Blue, Crystal Noir, Bright Crystal. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Versace incarne la démesure italienne et le luxe méditerranéen. En parfumerie, Versace propose des fragrances directes, puissantes et très sillageantes. Eros pour lui (menthe-vanille), Dylan Blue (aquatique-boisé), Crystal Noir et Bright Crystal pour elle — 4 parfums iconiques disponibles en 33ml à 100 DH.',
    story: `<p>Gianni Versace fonde sa maison à Milan en 1978, construisant un empire de la mode autour de l\'excès baroque, des imprimés grecs et d\'une sexualité affichée. La parfumerie Versace suit le même ADN : des fragrances sans retenue, puissantes et immédiatement identifiables. Gianni Versace est assassiné en 1997 à Miami ; sa sœur Donatella reprend les rênes et maintient cet héritage d\'ostentation assumée.</p>
  <p><strong>Eros</strong> (2012), nommé d\'après le dieu grec du désir, capture cet univers en flacon : menthe glaciale sur pomme verte, vanille crémeuse et ambre dans un accord qui joue ouvertement la carte de la séduction. Son flacon doré orné de la tête de Méduse est devenu l\'un des visuels parfumés les plus reconnaissables d\'Instagram.</p>`,
    maroc: `<p>Eros est particulièrement populaire dans les villes du nord du Maroc — Tanger, Tétouan, Al Hoceïma — où le caractère méditerranéen de la fragrance résonne avec l\'environnement côtier. Sa vanille-menthe crée une présence remarquable lors des soirées estivales sans être lourde à la chaleur.</p>
  <p>Dylan Blue, plus sobre et aquatique, est le choix des cadres marocains qui veulent une fragrance Versace pour le quotidien professionnel. Crystal Noir et Bright Crystal séduisent des profils opposés : Bright Crystal pour les femmes qui veulent rester discrètes, Crystal Noir pour celles qui veulent marquer les esprits en soirée.</p>`,
    guide: `<p><strong>Eros :</strong> Puissant et séducteur. Menthe fraîche, pomme verte et vanille crémeuse — pour les hommes qui aiment les parfums à fort sillage. Soirées et sorties, pas le bureau.</p>
  <p><strong>Dylan Blue :</strong> Frais et aquatique-boisé. Plus sobre qu'Eros, élégant et polyvalent — idéal pour le bureau et les occasions formelles.</p>
  <p><strong>Crystal Noir :</strong> Oriental épicé pour la femme mystérieuse. Gingembre, gardénia, ambre — pour les soirées et occasions spéciales.</p>
  <p><strong>Bright Crystal :</strong> Fruité-floral lumineux. Grenade, magnolia et musc — léger, moderne, parfait pour le quotidien et le printemps.</p>`,
    faq: [
      ['Eros convient-il pour le bureau ?', 'Eros est un parfum à fort sillage — préférable pour les soirées ou les sorties. Pour le bureau, Dylan Blue est plus discret et approprié dans un espace fermé.'],
      ['Crystal Noir ou Bright Crystal ?', 'Crystal Noir est oriental et mystérieux, conçu pour les soirées. Bright Crystal est fruité et lumineux, parfait pour une utilisation quotidienne et les occasions légères.'],
      ['Eros est-il adapté à l\'été marocain ?', 'Oui, paradoxalement. La menthe en tête rafraîchit à la chaleur, puis la vanille prend le relais en soirée. Une application modérée (2-3 sprays) suffit en été.'],
    ]
  },
  {
    slug: 'parfums-inspires-hermes',
    name: 'Hermès',
    title: 'Parfums inspirés Hermès au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées d\'Hermès : Terre d\'Hermès, Twilly d\'Hermès. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Hermès, fondée en 1837 à Paris, est le summum de l\'élégance française. Ses parfums portent la signature unique de Jean-Claude Ellena, nez de génie qui a créé Terre d\'Hermès — accord boisé-minéral révolutionnaire. Twilly d\'Hermès, lancé en 2017, est la déclaration de modernité audacieuse de la jeune femme Hermès.',
    story: `<p>Thierry Hermès fonde en 1837 à Paris une sellerie pour l\'aristocratie européenne. La maison habille les chevaux des cours royales avant d\'habiller les hommes. En 2004, Hermès prend une décision sans précédent dans la parfumerie de luxe : recruter Jean-Claude Ellena comme "nez en résidence" exclusif — le premier parfumeur permanent d\'une grande maison.</p>
  <p>Ellena crée en 2006 <strong>Terre d\'Hermès</strong>, une révolution olfactive construite sur l\'absence plutôt que sur l\'accumulation : un accord minéral-boisé épuré où le pamplemousse, le poivre et le vétiver créent de la profondeur par leur retenue même. Ce refus de l\'ostentation en fait paradoxalement l\'un des parfums masculins les plus désirables de la parfumerie contemporaine — une leçon de sophistication par le vide.</p>`,
    maroc: `<p>Terre d\'Hermès est la fragrance des hommes marocains qui valorisent l\'élégance discrète sur le sillage démonstratif. Populaire parmi les professionnels et dirigeants de Casablanca et Rabat, il représente une alternative raffinée aux fragrances puissantes — une signature olfactive qui se révèle à ceux qui s\'approchent plutôt qu\'à ceux qui sont loin.</p>
  <p>Twilly séduit les jeunes femmes marocaines de la génération Z qui cherchent à s\'écarter des floraux conventionnels. Son gingembre piquant-tubéreuse crémeuse est particulièrement apprécié en automne et en hiver au Maroc.</p>`,
    guide: `<p><strong>Terre d'Hermès :</strong> Pour l'homme élégant qui préfère suggérer plutôt qu'affirmer. Boisé minéral avec pamplemousse et vétiver. Idéal au bureau et pour les occasions formelles. Quatre saisons.</p>
  <p><strong>Twilly d'Hermès :</strong> Pour la femme qui s'approprie l'héritage Hermès à sa façon. Gingembre piquant, tubéreuse crémeuse et santal doux — un floral épicé moderne et distinctif.</p>`,
    faq: [
      ['Vos inspirés Hermès ont-ils la même qualité de tenue ?', 'Nos fragrances inspirées d\'Hermès durent 6 à 8 heures avec un sillage discret et sophistiqué — dans l\'esprit de l\'original qui privilégie la qualité au volume.'],
      ['Terre d\'Hermès est-il un parfum hivernal ?', 'Non, Terre d\'Hermès est l\'un des rares parfums véritablement quatre-saisons. Sa minéralité et ses agrumes le rendent léger en été, son vétiver et son poivre lui donnent de la chaleur en hiver.'],
      ['Twilly est-il très différent des autres parfums Hermès ?', 'Oui. Là où la plupart des Hermès cherchent la sobriété, Twilly est pétillant et espiègle — gingembre piquant et tubéreuse crémeuse créent un contraste délicieux que les jeunes femmes apprécient particulièrement.'],
    ]
  },
  {
    slug: 'parfums-inspires-maison-francis-kurkdjian',
    name: 'MFK',
    title: 'Parfums inspirés MFK Baccarat Rouge 540 au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée du Baccarat Rouge 540 de Maison Francis Kurkdjian. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Maison Francis Kurkdjian est la maison niche fondée en 2009 par Francis Kurkdjian, l\'un des nez les plus talentueux du monde. Baccarat Rouge 540, créé en 2015 pour cristallerie Baccarat, est devenu le phénomène olfactif mondial — la fragrance la plus désirée de la dernière décennie. Un accord jasmin-safran-ambre-cèdre d\'une luminosité unique. Disponible en 33ml à 100 DH.',
    story: `<p>Francis Kurkdjian naît en 1969 à Paris d\'une famille d\'origine arménienne. Il entre à l\'École Supérieure du Parfum et crée à 26 ans sa première grande commission : <strong>Le Mâle</strong> pour Jean Paul Gaultier (1995), devenu immédiatement iconique. Au cours des quinze années suivantes, il signe des dizaines de succès pour Dior, Burberry, Armani, et collabore avec des artistes du monde entier.</p>
  <p>En 2009, il fonde <em>Maison Francis Kurkdjian</em> avec Marc Chaya. En 2015, la cristallerie Baccarat lui commande une fragrance pour ses 250 ans — il crée <strong>Baccarat Rouge 540</strong>, un accord jasmin-safran-ambre-cèdre d'une luminosité cristalline unique. La fragrance devient virale sur les réseaux sociaux à partir de 2018 et s'impose comme le phénomène olfactif de la décennie, adoptée par des célébrités du monde entier.</p>`,
    maroc: `<p>Baccarat Rouge 540 est probablement le parfum niche le plus photographié et le plus demandé sur les réseaux sociaux marocains. Son accord ambré-jasmin-cèdre, chaud et lumineux, résonne profondément avec la culture olfactive du Maroc — un pays où l'ambre et le jasmin sont des notes culturellement ancrées. Les soirées marocaines estivales lui conviennent parfaitement.</p>
  <p>Sa nature unisexe en fait une fragrance prisée par les couples et les personnes qui refusent les catégories genrées traditionnelles. À Casablanca et Marrakech, BR540 est devenu un marqueur de sophistication olfactive — un signal discret adressé aux autres connaisseurs.</p>`,
    guide: `<p><strong>Baccarat Rouge 540 :</strong> La fragrance unisexe d'exception. Jasmin sambac, safran et ambre cristallin dans un accord lumineux et boisé que l'on reconnaît immédiatement. Pour homme comme pour femme, du bureau aux soirées les plus élégantes. Polyvalent toute l'année.</p>`,
    faq: [
      ['Pourquoi Baccarat Rouge 540 est-il si célèbre ?', 'BR540 a été adopté massivement sur les réseaux sociaux puis par des célébrités mondiales. Son accord cristallin unique — ambre chaud, jasmin et effluve médicinal de cèdre — crée un sillage immédiatement reconnaissable et universellement apprécié. C\'est aussi l\'un des parfums les plus documentés sur YouTube et TikTok.'],
      ['Est-il vraiment unisexe ?', 'Oui, BR540 transcende les genres. Sa composition équilibrée — jasmin floral + ambre chaud + cèdre boisé — ne penche ni vers le féminin ni vers le masculin. C\'est sa grande force et l\'une des raisons de son succès mondial.'],
      ['Tient-il longtemps ?', 'BR540 original est réputé pour sa longévité exceptionnelle (12h+). Notre inspiré offre une tenue de 7 à 10h avec un sillage chaleureux et distinctif.'],
    ]
  },
  {
    slug: 'parfums-inspires-carolina-herrera',
    name: 'Carolina Herrera',
    title: 'Parfums inspirés Carolina Herrera au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Carolina Herrera : Good Girl, Bad Boy, 212 VIP, Very Good Girl, Good Girl Supreme, CH Men. Format 33ml à 100 DH. Livraison au Maroc.',
    intro: 'Carolina Herrera, la créatrice venezuelano-américaine, a bâti un empire de la mode et du parfum. Good Girl (2016) dans son flacon stiletto iconique est devenu un classique de la parfumerie moderne. Bad Boy pour lui, avec son accord poivre-cèdre électrique, lui répond parfaitement. 6 fragrances disponibles en 33ml à 100 DH.',
    story: `<p>Carolina Herrera naît en 1939 à Caracas dans une famille de l'aristocratie vénézuélienne. Elle s'installe à New York en 1980 et lance sa maison de couture, devenant rapidement une référence de l'élégance américaine. Sa première fragrance éponyme date de 1988. La maison entre dans une nouvelle ère en 2016 avec <strong>Good Girl</strong>, un pari audacieux sur la dualité féminine.</p>
  <p>Le flacon de Good Girl — un stiletto noir et doré — est conçu par Louise Doktor pour incarner cette dualité : angélique au-dessus (fleurs blanches, jasmin), sombre et sensuel en dessous (cacao, tonka, vétiver). Ce concept visuel-olfactif remporte le Fragrance Foundation Award en 2017 et propulse la maison au rang des parfumeries les plus désirées de sa génération.</p>`,
    maroc: `<p>Good Girl est l'une des cinq fragrances féminines les plus commandées sur Parfum33ml.ma. Son accord tubéreuse-cacao correspond parfaitement à la culture des soirées marocaines — à la fois féminin et affirmé, il crée une présence mémorable lors des événements festifs. Les femmes marocaines de 20 à 35 ans en sont particulièrement adeptes.</p>
  <p>Bad Boy est populaire chez les jeunes hommes marocains qui veulent une fragrance charismatique sans recourir aux références traditionnelles (Sauvage, Bleu de Chanel). Son poivre-électrique-cèdre est particulièrement efficace en soirée dans le contexte climatique marocain.</p>`,
    guide: `<p><strong>Good Girl :</strong> Le flacon stiletto iconique. Tubéreuse-cacao-tonka — dualité angélique et obscure. Pour les soirées, événements festifs et occasions où l'on veut marquer les esprits.</p>
  <p><strong>Bad Boy :</strong> Son pendant masculin. Poivre noir électrique et cèdre — pour l'homme charismatique, bureau comme soirées.</p>
  <p><strong>212 VIP :</strong> L'esprit club new-yorkais. Musqué-fruité-santal pour les nuits urbaines et les sorties.</p>
  <p><strong>Good Girl Supreme :</strong> Version plus fruitée et lumineuse de Good Girl — parfaite pour le quotidien et le bureau.</p>
  <p><strong>Very Good Girl :</strong> Litchi-rose-vanille gourmand et frais — pour les femmes qui aiment les floraux fruits légers.</p>
  <p><strong>CH Men :</strong> Cuir-santal raffiné pour l'homme élégant — du bureau aux occasions formelles.</p>`,
    faq: [
      ['Good Girl et Good Girl Supreme sont-ils très différents ?', 'Good Girl est plus sombre et oriental (cacao, tonka, vétiver). Good Girl Supreme est plus fruité et lumineux (fruits rouges, litchi). Supreme convient mieux au quotidien et au bureau, Good Girl est fait pour les soirées.'],
      ['Bad Boy est-il adapté pour le bureau ?', 'Oui, Bad Boy est puissant mais équilibré — son accord poivre-cèdre convient très bien au bureau comme aux sorties du soir.'],
      ['Good Girl est-il adapté en cadeau ?', 'Absolument. Le flacon stiletto iconique en fait l\'un des cadeaux parfumés les plus reconnaissables — parfait pour un anniversaire, une fête des mères ou une occasion spéciale.'],
    ]
  },
  {
    slug: 'parfums-inspires-gucci',
    name: 'Gucci',
    title: 'Parfums inspirés Gucci au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Gucci : Gucci Bloom, Guilty Pour Homme. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Gucci, fondée à Florence en 1921, est l\'un des symboles les plus puissants du luxe italien. En parfumerie, Gucci Bloom (2017) a marqué un retour aux sources florales — un bouquet blanc luxuriant conçu par Alberto Morillas. Guilty Pour Homme (2011) reste une référence fougère moderne. Deux parfums iconiques en 33ml à 100 DH.',
    story: `<p>Guccio Gucci ouvre sa première boutique de maroquinerie à Florence en 1921, inspiré par les malles de voyage élégantes qu'il avait admirées en travaillant au Savoy Hotel de Londres. La maison grandit, traverse des décennies de scandales familiaux et de repositionnements, avant que Tom Ford ne la propulse au sommet du luxe dans les années 1990.</p>
  <p>Alessandro Michele prend la direction artistique en 2015 et lance <strong>Gucci Bloom</strong> (2017) comme manifeste d'une féminité libre et flamboyante — un bouquet blanc éblouissant où tubéreuse, jasmin et rangoon créent un effet "jardin la nuit" conçu par Alberto Morillas, l'un des nez les plus respectés du monde. La fragrance devient instantanément l'une des meilleures ventes florales de sa génération.</p>`,
    maroc: `<p>Gucci Bloom s'épanouit remarquablement à la chaleur — sa tubéreuse et son jasmin développent toute leur opulence aux températures estivales marocaines. La fragrance est particulièrement appréciée lors des événements festifs marocains (mariages, henné, fiançailles) où les floraux riches sont de mise.</p>
  <p>Guilty Pour Homme, avec son accord lavande-patchouli-ambre, représente une alternative plus classique à Sauvage pour les hommes marocains qui recherchent une fragrance élégante et professionnelle dans la lignée de la parfumerie italienne.</p>`,
    guide: `<p><strong>Gucci Bloom :</strong> Pour la femme qui aime les floraux riches et opulents. Tubéreuse, jasmin et rangoon dans un accord blanc luxuriant et sensuel. Soirées, cérémonies et occasions spéciales.</p>
  <p><strong>Guilty Pour Homme :</strong> Fougère-oriental moderne. Lavande, patchouli et ambre — élégant et masculin. Du bureau aux sorties, polyvalent et raffiné.</p>`,
    faq: [
      ['Gucci Bloom est-il adapté au climat marocain ?', 'Oui, Gucci Bloom est un floral riche qui s\'épanouit à la chaleur. La tubéreuse et le jasmin se libèrent magnifiquement aux températures marocaines. Idéal pour les soirées estivales et les occasions formelles.'],
      ['Guilty Pour Homme tient-il longtemps ?', 'Notre inspiré de Guilty Pour Homme offre une tenue de 6 à 8 heures avec un sillage aromatique modéré et élégant — parfait pour le bureau et les sorties.'],
      ['Peut-on offrir Gucci Bloom pour un mariage ?', 'C\'est un excellent choix cadeau — son accord floral blanc opulent est universellement perçu comme luxueux et festif, en parfaite harmonie avec l\'ambiance des cérémonies marocaines.'],
    ]
  },
  {
    slug: 'parfums-inspires-valentino',
    name: 'Valentino',
    title: 'Parfums inspirés Valentino au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Valentino : Donna Born in Roma, Uomo Born in Roma. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Valentino, fondée à Rome en 1960, est synonyme de glamour et d\'élégance italienne. La collection Born in Roma capture l\'esprit de la Ville Éternelle — Donna pour elle, Uomo pour lui. Deux fragrances modernes et sophistiquées disponibles en 33ml à 100 DH.',
    story: `<p>Valentino Garavani fonde sa maison à Rome en 1960 après avoir formé aux côtés de Jean Dessès et Guy Laroche à Paris. Il devient rapidement le couturier des célébrités et de la haute société internationale — Jackie Kennedy, Audrey Hepburn, Elizabeth Taylor portent ses créations. Le rouge Valentino et les robes de soirée deviennent sa signature inimitable.</p>
  <p>La collection <strong>Born in Roma</strong> (2019) traduit cette essence en parfumerie : l\'énergie contrastée de Rome moderne — la douceur de la Via Veneto et la rudesse des quartiers populaires. <strong>Donna Born in Roma</strong>, signé par Adriana Medina, marie jasmin et vanille bourbon pour créer un accord féminin opulent et intemporel. <strong>Uomo Born in Roma</strong> capte l'adrénaline masculine de la ville — gingembre, sauge et bois de gaïac dans une fragrance épicée et moderne.</p>`,
    maroc: `<p>Donna Born in Roma résonne profondément avec la culture olfactive marocaine : son jasmin évoque les fleurs de jasmin omniprésentes dans les riads et les médinas, tandis que sa vanille bourbon ajoute une douceur chaleureuse appréciée lors des occasions festives. C'est un choix raffiné pour les cérémonies marocaines.</p>
  <p>La complémentarité parfaite de Donna et Uomo en fait un coffret naturel pour les couples — populaire au Maroc pour les cadeaux de mariage et les anniversaires.</p>`,
    guide: `<p><strong>Donna Born in Roma :</strong> Jasmin-vanille bourbon opulent pour la femme élégante. Floraux gourmands et féminins — soirées, cérémonies, occasions romantiques.</p>
  <p><strong>Uomo Born in Roma :</strong> Gingembre-sauge-bois de gaïac. Pour l'homme moderne qui aime les épicés-boisés raffinés — du bureau aux sorties.</p>`,
    faq: [
      ['Les parfums Born in Roma sont-ils unisexes ?', 'Donna est résolument féminin (jasmin, vanille). Uomo est masculin (épicé, boisé). Ils se complètent parfaitement pour un couple qui cherche des fragrances coordonnées mais distinctes.'],
      ['Donna Born in Roma convient-il aux soirées ?', 'Oui, son accord jasmin-vanille bourbon gourmand est parfait pour les soirées et occasions festives. Son sillage opulent sans être excessif le rend également agréable au bureau.'],
      ['Peut-on offrir le pack couple Donna + Uomo ?', 'Absolument — c\'est l\'un des cadeaux les plus appréciés pour des fiançailles ou un mariage. Leur complémentarité est évidente et intentionnelle.'],
    ]
  },
  {
    slug: 'parfums-inspires-parfums-de-marly',
    name: 'Parfums de Marly',
    title: 'Parfums inspirés Parfums de Marly au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Parfums de Marly : Delina, Layton, Pegasus, Percival. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Parfums de Marly est la maison niche fondée en 2009, inspirée par le faste de la cour de Versailles et des écuries royales de Marly. Ses fragrances — Delina, Layton, Pegasus, Percival — sont parmi les plus désirées au monde. Chez Parfum33ml.ma, ces 4 joyaux niche sont disponibles en 33ml à 100 DH.',
    story: `<p>Julien Sprecher fonde Parfums de Marly en 2009, inspiré par le château de Marly — résidence de plaisance de Louis XIV nichée dans la forêt de Versailles, détruite à la Révolution mais restée symbole d'un raffinement sans égal. La maison adopte l'esthétique équestre de la cour royale française : chaque flacon évoque les scellées et ornements des harnais de chevaux de race.</p>
  <p><strong>Delina</strong> (2017) est le coup de maître : un accord rose-litchi-pivoine-musc-vanille travaillé pendant trois ans pour atteindre la perfection florale. <strong>Layton</strong> suit avec un accord pomme-lavande-vanille-cardamome qui conquiert immédiatement les connaisseurs — surnommé "le Sauvage des amateurs de niche", il est devenu l'une des fragrances masculines les plus commentées au monde.</p>`,
    maroc: `<p>Layton est devenu un phénomène au Maroc : surnommé <em>"le Layton"</em> dans les cercles de passionnés de parfumerie marocains, il génère une communauté de fans dédiée sur les réseaux sociaux locaux. Son accord pomme-vanille-cardamome crée un nuage doux et enveloppant particulièrement apprécié lors des soirées marocaines où l'ambre et la chaleur magnifient les orientaux.</p>
  <p>Delina est la fragrance niche féminine la plus demandée sur Parfum33ml.ma — son accord rose-litchi évoque le jardin de rose de Damas, fleur sacrée dans la culture marocaine. Pour les femmes marocaines qui cherchent à s'élever au-dessus des floraux conventionnels, Delina est le choix niche par excellence.</p>`,
    guide: `<p><strong>Delina :</strong> La princesse des parfums niche. Litchi-rose-pivoine-musc-vanille — le floral royal de la parfumerie contemporaine. Pour les occasions spéciales et cadeaux d'exception.</p>
  <p><strong>Layton :</strong> Pomme-lavande-vanille-cardamome. Le "Sauvage des connaisseurs" — polyvalent bureau/soirée, particulièrement remarquable en automne-hiver.</p>
  <p><strong>Pegasus :</strong> Amande-héliotrope-vanille-santal. Oriental poudré noble et raffiné — pour l'homme qui aime les accords chauds et sophistiqués.</p>
  <p><strong>Percival :</strong> Lavande-néroli-musc-ambroxan. Clean et moderne — le plus polyvalent de la gamme, idéal au quotidien et en été.</p>`,
    faq: [
      ['Pourquoi les parfums de Marly sont-ils si réputés ?', 'Parfums de Marly combine des matières premières nobles, des concentrations élevées et un storytelling autour de l\'héritage royal français. Layton et Delina sont devenus des références mondiales du segment niche accessible — preuve qu\'un parfum peut être à la fois luxueux et universellement apprécié.'],
      ['Layton est-il adapté à toutes les saisons ?', 'Layton brille particulièrement en automne-hiver, quand sa vanille-cardamome se déploie pleinement dans l\'air froid. En été marocain, Percival est une meilleure option — plus frais et aérien.'],
      ['Delina est-il un bon cadeau ?', 'C\'est l\'un des meilleurs cadeaux parfumés possibles — son accord floral-fruité luxueux est universellement aimé par les femmes, et son positionnement niche le rend distinctif sans être intimidant.'],
    ]
  },
  {
    slug: 'parfums-inspires-tom-ford',
    name: 'Tom Ford',
    title: 'Parfums inspirés Tom Ford au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Tom Ford : Ombré Leather, Tobacco Vanille. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Tom Ford est la maison de luxe fondée en 2006 par le créateur américain Tom Ford. Ses parfums Private Blend — Tobacco Vanille, Ombré Leather — sont devenus des icônes de la parfumerie niche. Puissants, sensuels et inoubliables, ils transcendent les genres. Disponibles en 33ml à 100 DH.',
    story: `<p>Tom Ford naît en 1961 au Texas et devient directeur artistique de Gucci en 1994, sauvant la maison de la faillite avec une vision sexuellement chargée et luxueuse qui redéfinit la mode des années 1990. Il prend ensuite les rênes de Yves Saint Laurent avant de fonder sa propre maison en 2006. La collection <strong>Private Blend</strong> (2007) est son manifeste parfumé : des fragrances destinées aux "vrais connaisseurs qui refusent le mainstream".</p>
  <p><strong>Tobacco Vanille</strong> s'inspire des clubs de gentlemen londoniens du XIXe siècle — tabac, épices et vanille dans un accord opulent et masculin. <strong>Ombré Leather</strong> (2018) est plus radical : un cuir brut et minimaliste, fleur de cactus sur fond de patchouli et d'ambre, qui devient rapidement un classique de la parfumerie cuirée contemporaine.</p>`,
    maroc: `<p>Ombré Leather a trouvé un public enthousiaste dans les cercles de connaisseurs marocains — particulièrement à Casablanca et Marrakech où l'esthétique cuir-luxe résonne avec la culture locale du leather artisanal marocain (babouches, maroquinerie). Sa nature unisexe en fait une fragrance recherchée par les deux genres.</p>
  <p>Tobacco Vanille est la fragrance Tom Ford la plus demandée au Maroc en hiver, quand ses accords tabac-épices-vanille se déploient parfaitement dans les soirées fraîches des mois de novembre à février — notamment dans les villes d'altitude comme Fès, Meknès et Ifrane.</p>`,
    guide: `<p><strong>Ombré Leather :</strong> Le cuir absolu. Cardamome-fleur de cactus-patchouli-cuir dans un accord intense et sophistiqué. Pour les occasions importantes, les soirées et les jours où l'on veut une présence mémorable.</p>
  <p><strong>Tobacco Vanille :</strong> Tabac-vanille-cacao opulent. Oriental luxueux et chaleureux — parfait pour l'automne-hiver et les soirées d'exception.</p>`,
    faq: [
      ['Tom Ford convient-il pour tous les jours ?', 'Les fragrances Tom Ford Private Blend sont puissantes et marquantes — plutôt pour les occasions spéciales, les soirées ou les jours où l\'on veut affirmer sa présence. Une application modérée (1-2 sprays) les rend néanmoins portables au quotidien.'],
      ['Ombré Leather est-il unisexe ?', 'Oui. Bien que commercialisé initialement dans la section masculine, Ombré Leather est porté par de nombreuses femmes qui aiment les parfums cuirés, affirmés et sans conventions de genre.'],
      ['Tobacco Vanille est-il adapté à l\'été marocain ?', 'Non — Tobacco Vanille est un parfum hivernal. Sa richesse opulente (tabac, épices, vanille crémeuse) est trop intense pour les chaleurs estivales marocaines. Réservez-le pour l\'automne-hiver.'],
    ]
  },
  {
    slug: 'parfums-inspires-prada',
    name: 'Prada',
    title: 'Parfums inspirés Prada au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Prada : Paradoxe, Luna Rossa Carbon. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Prada, symbole d\'intellect et d\'avant-garde italienne, crée des parfums qui questionnent les conventions. Paradoxe (2022) pour elle est un jeu de lumière olfactif entre néroli et ambre. Luna Rossa Carbon (2017) pour lui capture l\'énergie de la navigation sportive. En 33ml à 100 DH.',
    story: `<p>Mario Prada ouvre sa première boutique milanaise en 1913, vendant des articles de maroquinerie. Sa petite-fille Miuccia Prada reprend la maison en 1978 et la réinvente comme laboratoire d'idées — la laideur élevée en esthétique, l'intellectualisme comme luxe. Prada devient l'une des maisons les plus copiées et les plus admirées du XXe siècle.</p>
  <p>En parfumerie, Prada applique la même philosophie de la contradiction. <strong>Paradoxe</strong> (2022) est signé par Daniela Andrier : ses ingrédients (néroli, jasmin, ambre) se comportent différemment selon la chaleur de chaque peau — la même fragrance sent différemment sur chaque individu, d'où son nom. <strong>Luna Rossa Carbon</strong> capture l'énergie électrique de la compétition nautique — bergamote, lavande marine et ambroxan dans une fragrance qui évolue aussi vite qu'un voilier de course.</p>`,
    maroc: `<p>Paradoxe attire les femmes marocaines sophistiquées qui cherchent une fragrance originale, loin des floraux commerciaux. Son néroli-ambre change subtilement selon la chaleur cutanée — particulièrement fascinant dans le contexte climatique marocain où les températures créent des révélations olfactives inattendues.</p>
  <p>Luna Rossa Carbon est en croissance dans la communauté des passionnés de parfumerie masculine au Maroc — une alternative raffinée pour les hommes qui veulent s'éloigner des aquatiques trop courants (Invictus, Acqua di Giò) sans perdre la fraîcheur qui convient au climat.</p>`,
    guide: `<p><strong>Paradoxe :</strong> Néroli-jasmin-ambre-musc. Floral lumineux et complexe pour la femme qui aime les fragrances modernes et originales. Du bureau aux sorties — sa sophistication convient partout.</p>
  <p><strong>Luna Rossa Carbon :</strong> Bergamote-poivre-lavande-ambroxan. Aquatique-boisé frais et masculin — polyvalent du bureau à la soirée, particulièrement apprécié au printemps-été.</p>`,
    faq: [
      ['Paradoxe est-il adapté au bureau ?', 'Oui, Paradoxe est sophistiqué sans être envahissant — parfait pour un environnement professionnel tout en restant élégant pour les sorties du soir.'],
      ['Luna Rossa Carbon est-il différent d\'Invictus ?', 'Oui. Luna Rossa Carbon est plus minéral et poivré qu\'Invictus — moins "mainstream", plus raffiné. Il s\'adresse à un homme qui cherche une fragrance aquatique distinctive plutôt que la référence universellement connue.'],
      ['Pourquoi Paradoxe s\'appelle-t-il ainsi ?', 'Parce que ses ingrédients se comportent différemment selon la chaleur de chaque peau — le même parfum peut sentir légèrement différent sur deux personnes. Daniela Andrier voulait une fragrance "personnelle" dans le sens littéral du terme.'],
    ]
  },
  {
    slug: 'parfums-inspires-chloe',
    name: 'Chloé',
    title: 'Parfums inspirés Chloé au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Chloé EDP : pivoine, litchi, rose, cèdre. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Chloé incarne la féminité romantique et naturelle — une élégance parisienne décontractée et accessible. Chloé EDP (2008), créé par Michel Almairac, est devenu un classique discret et raffiné : pivoine printanière, litchi juteux et rose absolue sur un fond de cèdre. En 33ml à 100 DH.',
    story: `<p>Gaby Aghion fonde Chloé en 1952 à Paris — avant même que l'expression "luxe accessible" n'existe. Elle invente le prêt-à-porter de luxe, des vêtements de haute qualité qui peuvent se porter dans la rue. Karl Lagerfeld devient son premier directeur artistique en 1964 et transforme Chloé en l'une des maisons parisiennes les plus influentes des décennies suivantes.</p>
  <p>En parfumerie, Chloé développe le même ADN de "luxe décontracté". <strong>Chloé EDP</strong> (2008), signé par Michel Almairac, anticipe de dix ans le mouvement du "quiet luxury" : une pivoine printanière, un litchi juteux et une rose absolue sur un fond de cèdre. Pas de déclaration, pas d'excès — juste une beauté florale intemporelle et immédiatement reconnaissable à ceux qui savent apprécier la subtilité.</p>`,
    maroc: `<p>Chloé EDP représente le choix olfactif des femmes marocaines qui valorisent l'élégance discrète — professionnelles de Casablanca et Rabat qui travaillent en environnement mixte et cherchent une fragrance présente sans être intrusive. C'est aussi un choix de prédilection pour les cadres et avocates marocaines.</p>
  <p>Sa discrétion apparente cache une tenue remarquable — il persiste sur la peau pendant 6 à 8 heures. Les femmes marocaines qui l'ont découvert en font souvent leur "parfum signature" au bureau, créant une association personnelle mémorable sans imposition olfactive.</p>`,
    guide: `<p><strong>Chloé EDP :</strong> Floral poudré délicat et romantique. Pivoine, litchi et rose absolue — idéal pour le quotidien, le bureau et les occasions romantiques. Un parfum discret et mémorable qui révèle sa profondeur à ceux qui s'approchent.</p>`,
    faq: [
      ['Chloé EDP est-il un parfum léger ?', 'Chloé EDP a un sillage délicat — il ne s\'impose pas à distance mais laisse une empreinte raffinée à proximité. Parfait pour le bureau, les transports et les espaces fermés.'],
      ['Est-il adapté au printemps et à l\'été ?', 'Chloé EDP est particulièrement sublime au printemps — son accord pivoine-rose-litchi est frais et lumineux. En été marocain, appliquez-le le soir ou les jours plus tempérés.'],
      ['Chloé EDP est-il un bon premier parfum ?', 'Oui, c\'est l\'une des meilleures portes d\'entrée dans la parfumerie féminine — son accord floral est universel, inoffensif et d\'une qualité indéniable.'],
    ]
  },
  {
    slug: 'parfums-inspires-givenchy',
    name: 'Givenchy',
    title: 'Parfums inspirés Givenchy au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Givenchy : L\'Interdit, Irresistible, Gentleman. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Givenchy, fondée en 1952 par Hubert de Givenchy, est synonyme d\'élégance parisienne et de sophistication. Ses parfums jouent sur la dualité — L\'Interdit entre lumière et obscurité, Irresistible entre fraîcheur et sensualité, Gentleman entre force et raffinement. En 33ml à 100 DH.',
    story: `<p>Hubert de Givenchy fonde sa maison en 1952 à Paris, à seulement 25 ans. Son tout premier client est une inconnue qui se présente à son atelier : Audrey Hepburn. Leur collaboration deviendra l\'une des plus célèbres de l\'histoire de la mode — Hepburn portera du Givenchy dans <em>Sabrina</em>, <em>Breakfast at Tiffany's</em>, et dans sa vie privée.</p>
  <p>En 1957, Givenchy crée <strong>L\'Interdit</strong> exclusivement pour Hepburn — le nom signifie "interdit aux autres". La fragrance devient publique plus tard, mais conserve cette aura d\'exclusivité. Relancée en 2018 par Olivier Polge avec une tubéreuse-vétiver sombre et envoûtante, elle perpétue l\'esprit original : une élégance qui n\'a pas peur de son propre mystère.</p>`,
    maroc: `<p>L'Interdit est particulièrement apprécié par les femmes marocaines qui cherchent une fragrance florale sortant de l'ordinaire — son accord tubéreuse-vétiver sombre est loin des floraux sucrés conventionnels. Il s'épanouit remarquablement lors des soirées marocaines estivales où la chaleur révèle sa profondeur.</p>
  <p>Gentleman est l'un des parfums masculins les plus appréciés des professionnels marocains qui veulent une fragrance française classique sans tomber dans l'omniprésent Sauvage. Son iris-lavande-cèdre est raffiné, polyvalent et adapté aux environnements professionnels formels.</p>`,
    guide: `<p><strong>L'Interdit :</strong> Tubéreuse-fleur d'oranger-vétiver. Floral sombre et envoûtant pour les femmes aux personnalités affirmées. Soirées et occasions spéciales.</p>
  <p><strong>Irresistible :</strong> Rose-iris-musc lumineux. Plus léger et accessible — parfait pour le quotidien, le bureau et le printemps.</p>
  <p><strong>Gentleman :</strong> Iris-lavande-patchouli-cèdre. L'homme élégant et sophistiqué — du bureau aux cérémonies formelles.</p>`,
    faq: [
      ['L\'Interdit ou Irresistible — lequel choisir ?', 'L\'Interdit est plus sombre, plus sillageant et plus mystérieux — pour les soirées et les femmes qui veulent affirmer leur présence. Irresistible est plus lumineux, frais et quotidien — pour le bureau et les occasions légères.'],
      ['Gentleman est-il adapté au bureau ?', 'Oui, Gentleman est un parfum élégant et modéré — idéal pour le bureau, les réunions formelles et les occasions de prestige. Son iris-lavande est discret et sophistiqué.'],
      ['L\'Interdit a-t-il vraiment été créé pour Audrey Hepburn ?', 'Oui. En 1957, Hubert de Givenchy créa la fragrance originale exclusivement pour Hepburn, en l\'appelant "L\'Interdit" — interdit aux autres. La fragrance actuelle (2018) est une réinterprétation moderne de cet héritage par Olivier Polge.'],
    ]
  },
  {
    slug: 'parfums-inspires-guerlain',
    name: 'Guerlain',
    title: 'Parfums inspirés Guerlain au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Guerlain : Mon Guerlain, L\'Homme Idéal. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Guerlain est la plus ancienne maison de parfumerie française encore en activité — fondée en 1828. Depuis plus de 190 ans, la maison crée des fragrances d\'exception : Shalimar (1925), Mitsouko (1919), et plus récemment Mon Guerlain (2017) et L\'Homme Idéal (2014). Un héritage de luxe désormais accessible en 33ml à 100 DH.',
    story: `<p>Pierre-François Pascal Guerlain ouvre sa parfumerie à Paris en 1828, fournissant rapidement la cour impériale de Napoléon III. Son petit-fils Jacques Guerlain est celui qui signe les chefs-d'œuvre absolus : <strong>Mitsouko</strong> (1919), inspiré d'une héroïne japonaise, et <strong>Shalimar</strong> (1925), né d'une légère addition d'éthyl-vanilline à un flacon de Jicky — selon la légende, Jacques Guerlain versa un flacon entier de vanille dans le jet d'eau des jardins Guerlain en hommage aux jardins de Shalimar au Cachemire.</p>
  <p>Guerlain inventa aussi la "Guerlinade" — un accord de fond propriétaire à base de vanille, iris, rose et jasmin qui traverse secrètement des dizaines de créations maison. C'est cette signature invisible qui donne aux fragrances Guerlain leur parenté reconnaissable, un héritage de 190 ans condensé dans chaque flacon.</p>`,
    maroc: `<p>La réputation orientale de Guerlain — Shalimar et son jasmin-vanille, Mitsouko et son chypre-pêche — résonne profondément avec la culture olfactive du Maroc. Mon Guerlain, avec sa lavande provençale et sa vanille tahitienne, représente un pont idéal entre la tradition olfactive marocaine et la sophistication française.</p>
  <p>L'Homme Idéal est particulièrement apprécié des hommes marocains qui veulent une fragrance distinguée et mémorable sans recourir aux références ultra-connues. Son accord amande-cerise-cuir crée une signature personnelle rare et appréciée.</p>`,
    guide: `<p><strong>Mon Guerlain :</strong> Lavande-vanille-jasmin-santal. Oriental sensuel pour la femme moderne — entre fraîcheur et chaleur. Polyvalent jour et soir, particulièrement beau en automne.</p>
  <p><strong>L'Homme Idéal :</strong> Amande-cerise-cuir-santal. Gourmand masculin élégant — pour les hommes qui aiment les accords chaleureux, distinctifs et sophistiqués.</p>`,
    faq: [
      ['Mon Guerlain est-il un parfum de jour ou de soir ?', 'Mon Guerlain est polyvalent — sa lavande le rend frais pour le jour, sa vanille et son jasmin le rendent sensuel pour le soir. C\'est l\'un des rares parfums qui fonctionne réellement dans les deux registres.'],
      ['L\'Homme Idéal est-il vraiment gourmand ?', 'Oui, avec l\'amande douce et la cerise, L\'Homme Idéal est dans la famille gourmande — mais le cuir et le santal lui apportent une dimension masculine et sophistiquée qui l\'éloigne du sucré simple.'],
      ['Guerlain est-il la plus ancienne maison de parfumerie ?', 'Oui, Guerlain est la maison de parfumerie de luxe française la plus ancienne encore en activité — fondée en 1828, soit 195 ans d\'histoire olfactive continue. Une rareté absolue dans l\'industrie.'],
    ]
  },
  {
    slug: 'parfums-inspires-hugo-boss',
    name: 'Hugo Boss',
    title: 'Parfums inspirés Hugo Boss au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Hugo Boss : Boss Bottled, The Scent, The Scent For Her. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Hugo Boss, la maison de mode et de parfumerie allemande fondée en 1924, est devenue un empire mondial du parfum masculin. Boss Bottled (1998) est l\'un des parfums masculins les plus vendus de l\'histoire. The Scent (2015) a renouvelé l\'ADN Boss avec un accord gingembre-cuir séduisant. En 33ml à 100 DH.',
    story: `<p>Hugo Ferdinand Boss fonde son entreprise à Metzingen en 1924, produisant initialement des vêtements de travail. La maison se redresse dans les années 1950 en se positionnant sur les costumes masculins de qualité. Aujourd\'hui, Hugo Boss est l\'une des rares marques de mode allemandes à avoir réussi une percée mondiale dans la parfumerie.</p>
  <p><strong>Boss Bottled</strong> (1998) est une surprise industrielle : lancé comme fragrance secondaire, il devient en quelques années l\'un des dix parfums masculins les plus vendus au monde. Son accord pomme-cannelle-santal-bois de cèdre est délibérément sobre et professionnel — le "parfum de l'homme qui réussit sans le crier". The Scent (2015) réinterprète cet héritage dans un registre plus sensuel, avec du gingembre et une note cuir qui évoquent davantage la séduction que la salle de réunion.</p>`,
    maroc: `<p>Boss Bottled est la fragrance professionnelle masculine par défaut dans de nombreux bureaux marocains — Casablanca, Rabat, Tanger. Son accord boisé-épicé sobre et intemporel convient parfaitement à l\'environnement professionnel marocain, où une fragrance trop marquée peut être perçue comme déplacée. C\'est aussi l\'un des parfums offerts le plus souvent comme cadeau masculin au Maroc.</p>
  <p>The Scent est populaire pour les soirées marocaines — son gingembre-cuir-lavande crée une présence séduisante sans les excès d\'un Invictus ou d\'un Eros. La version féminine (pêche-cacao-vanille) séduit les femmes qui préfèrent les gourmands fruités aux floraux conventionnels.</p>`,
    guide: `<p><strong>Boss Bottled :</strong> Pomme-cannelle-santal-cèdre. Le parfum du succès professionnel — sobre, élégant, intemporel. Le choix par excellence pour le bureau et les occasions formelles.</p>
  <p><strong>The Scent :</strong> Gingembre-maninka-cuir-lavande. Plus séducteur et charnel — pour les soirées, les rendez-vous et les occasions où l'on veut impressionner.</p>
  <p><strong>The Scent For Her :</strong> Pêche-freesia-cacao-vanille. Féminin et gourmand — pour la femme qui aime les accords fruités-sucrés accessibles et plaisants.</p>`,
    faq: [
      ['Boss Bottled est-il encore moderne ?', 'Oui, Boss Bottled a traversé les décennies et reste un classique intemporel. Son accord boisé-épicé discret est parfaitement adapté au bureau et aux environnements professionnels — une valeur sûre qui ne déçoit jamais.'],
      ['The Scent pour femme ou pour homme ?', 'The Scent existe en version pour lui (gingembre-cuir) et pour elle (pêche-cacao). Les deux sont complémentaires pour un couple et constituent un excellent coffret cadeau.'],
      ['Quelle est la différence entre Boss Bottled et The Scent ?', 'Boss Bottled est professionnel et sobre — pour le bureau et les occasions formelles. The Scent est plus séducteur et charnel — pour les soirées et les rendez-vous romantiques.'],
    ]
  },
  {
    slug: 'parfums-inspires-jean-paul-gaultier',
    name: 'Jean Paul Gaultier',
    title: 'Parfums inspirés Jean Paul Gaultier au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Jean Paul Gaultier : Le Mâle, Scandal, Ultra Male, Classique, Scandal Pour Homme. Format 33ml à 100 DH. Livraison au Maroc.',
    intro: 'Jean Paul Gaultier, l\'enfant terrible de la mode française, a révolutionné la parfumerie avec Le Mâle en 1995 — le marin-lavande le plus iconique du monde. Classique pour elle, Scandal dans son corset, Ultra Male hypermasculin — 5 fragrances audacieuses disponibles en 33ml à 100 DH.',
    story: `<p>Jean Paul Gaultier naît en 1952 à Arcueil, autodidacte qui envoie ses croquis à Pierre Cardin à 18 ans et intègre immédiatement le monde de la haute couture. Il devient l'enfant terrible de la mode française — corsets portés comme vêtements, jupes pour hommes, marinières en or — toujours en avance d'une décennie sur son époque.</p>
  <p>En 1995, il confie à Francis Kurkdjian (26 ans) sa première grande commission : <strong>Le Mâle</strong>. Le flacon en forme de torse masculin tatoué est aussi provocateur que la fragrance — menthe glaciale, lavande provençale et vanille-tonka dans un accord qui déconstruit la masculinité pour mieux la célébrer. Le Mâle devient l'une des fragrances masculines les plus reconnaissables du XXe siècle, symbole d'une masculinité assumée et moderne.</p>`,
    maroc: `<p>Le Mâle est l'une des fragrances masculines les plus populaires au Maroc depuis vingt ans — sa lavande-menthe-vanille est immédiatement identifiable et appréciée dans toutes les régions. Son sillage affirmé correspond à la culture olfactive marocaine où une fragrance doit se faire remarquer.</p>
  <p>Ultra Male est le choix préféré pour les soirées marocaines où l'on veut amplifier l'effet — sa poire-lavande-vanille est plus gourmand et enveloppant que Le Mâle original. Scandal (femme) est très apprécié lors des événements nocturnes marocains pour son miel-caramel sulfureux et addictif.</p>`,
    guide: `<p><strong>Le Mâle :</strong> Menthe-lavande-vanille-tonka. L'icône absolue de la masculinité affirmée. Du bureau aux soirées — polyvalent et universellement reconnu.</p>
  <p><strong>Ultra Male :</strong> Version plus intense et gourmande — poire-lavande-vanille. Pour les soirées et les hommes qui veulent amplifier leur présence.</p>
  <p><strong>Scandal (femme) :</strong> Miel-gardénia-caramel-patchouli. Pour la femme scandaleusement addictive — soirées et occasions festives uniquement.</p>
  <p><strong>Scandal Pour Homme :</strong> Caramel-tonka-vétiver — masculin et provocateur. Pour les soirées et les sorties nocturnes.</p>
  <p><strong>Classique :</strong> Rose-fleur d'oranger-vanille-ambre. Oriental féminin intemporel — pour les occasions spéciales et les femmes qui aiment les orientaux classiques.</p>`,
    faq: [
      ['Le Mâle et Ultra Male — lequel choisir ?', 'Le Mâle est plus équilibré et polyvalent (bureau + soirée). Ultra Male est plus intense, sucré et gourmand — conçu spécifiquement pour les soirées et les hommes qui veulent un sillage puissant.'],
      ['Scandal (femme) convient-il aux soirées ?', 'Oui, Scandal est conçu pour les soirées — son accord miel-gardénia-caramel est trop affirmé pour le bureau mais parfait pour les événements nocturnes et les occasions festives.'],
      ['Pourquoi le flacon de Le Mâle est-il en forme de torse ?', 'Jean Paul Gaultier a voulu créer un objet aussi provocateur que la fragrance elle-même. Le torse tatoué de marin célèbre une masculinité assumée et joyeuse — un anti-conformisme cohérent avec l\'ADN de la maison.'],
    ]
  },
  {
    slug: 'parfums-inspires-kenzo',
    name: 'Kenzo',
    title: 'Parfums inspirés Kenzo au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Kenzo : Flower, Kenzo Homme. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Kenzo, fondée par Kenzo Takada à Paris en 1970, fusionne l\'élégance japonaise et la créativité parisienne. Flower de Kenzo (2000) est devenu un classique floral-poudré reconnaissable à son flacon coquelicot. Kenzo Homme apporte la fraîcheur aquatique boisée. En 33ml à 100 DH.',
    story: `<p>Kenzo Takada naît à Himeji (Japon) en 1939 dans une famille d\'hôteliers. En 1965, à 26 ans, il embarque pour la France avec 50 dollars en poche et un carton de croquis. Sans parler français, il vend ses dessins aux magasins parisiens pour survivre. En 1970, il ouvre sa première boutique dans la galerie Vivienne — ses vêtements colorés, inspirés des kimonos et du folklore japonais, créent une sensation immédiate.</p>
  <p><strong>Flower de Kenzo</strong> (2000) est l\'aboutissement parfumé de cette vision : un flacon en forme de coquelicot, fleur des champs par excellence, conçu par Serge Mansau, et un accord rose-violette-vanille-musc signé Alberto Morillas — une floral poudré qui marie la douceur japonaise et la romantisme parisien. En vingt ans, il est devenu l'un des classiques floraux les plus reconnaissables de la parfumerie mondiale.</p>`,
    maroc: `<p>Flower de Kenzo est apprécié au Maroc par les femmes qui recherchent un floral doux et intemporel, loin des floraux puissants et opulents. Son accord poudré-rose-musc convient parfaitement aux environnements professionnels et aux occasions romantiques discrètes. Le flacon coquelicot rouge est immédiatement reconnaissable et en fait un beau cadeau.</p>
  <p>Kenzo Homme est l\'une des fragrances masculines fraîches les plus adaptées au climat marocain — son yuzu japonais et ses bois aquatiques créent une fraîcheur durable dans la chaleur, idéale pour les journées d'été à Casablanca, Agadir ou sur le littoral méditerranéen.</p>`,
    guide: `<p><strong>Flower de Kenzo :</strong> Rose-violette-vanille-musc. Floral poudré délicat et romantique — pour le quotidien, le bureau et les occasions romantiques discrètes.</p>
  <p><strong>Kenzo Homme :</strong> Bois aquatique-yuzu-poivre. Frais, rafraîchissant et moderne — parfait pour le bureau et les journées actives, particulièrement en été.</p>`,
    faq: [
      ['Flower de Kenzo est-il démodé ?', 'Non, Flower est un classique intemporel — son accord poudré-floral traverse les décennies et les tendances. Il revient régulièrement en popularité et convient à toutes les générations.'],
      ['Kenzo Homme est-il adapté à l\'été marocain ?', 'Oui, c\'est l\'un des meilleurs choix masculins pour l\'été marocain — sa fraîcheur aquatique-yuzu est légère et persistante même à la chaleur. Idéal pour les villes côtières.'],
      ['Kenzo Takada portait-il ses propres parfums ?', 'Kenzo Takada (1939-2020) était connu pour son amour des couleurs et des fleurs — Flower de Kenzo reflète sa vision d\'un monde plus joyeux et coloré. Il portait lui-même des fragrances florales et légères.'],
    ]
  },
  {
    slug: 'parfums-inspires-montblanc',
    name: 'Montblanc',
    title: 'Parfums inspirés Montblanc au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Montblanc : Explorer, Legend. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Montblanc, la maison de maroquinerie de luxe fondée en 1906, a développé une gamme parfums appréciée pour son excellente qualité-prix. Legend (2011) est une fougère boisée moderne universellement appréciée. Explorer (2019) est un aventurier boisé-cacoté qui évoque les grands espaces. En 33ml à 100 DH.',
    story: `<p>Claus-Johannes Voss fonde la manufacture de stylos Montblanc à Hambourg en 1906. La marque construit son identité autour de l\'excellence artisanale et de la borne neigeuse des Alpes — symbole d\'altitude et de perfection. Connue pour ses stylos plume et ses accessoires de luxe, Montblanc entre dans la parfumerie en 2005 avec une ambition : appliquer à la fragrance les mêmes valeurs d\'excellence accessible.</p>
  <p><strong>Legend</strong> (2011), signé par Olivier Pescheux, devient une surprise de l\'industrie : une fougère boisée moderne (bergamote, lavande, santal, tonka) qui se hisse dans les charts mondiaux sans budget marketing excessif — juste par la qualité de sa formule et sa polyvalence absolue. <strong>Explorer</strong> (2019) complète l\'image avec un accord boisé-cacao qui évoque les grands espaces — son vétiver d\'Haïti et son patchouli d\'Indonésie en font une fragrance géographiquement ancrée.</p>`,
    maroc: `<p>Legend est devenu au Maroc le "parfum de confiance" par excellence — la fragrance que l'on choisit quand on ne veut pas se tromper, pour un cadeau ou pour compléter sa collection. Son accord fougère-boisé universel est apprécié par toutes les générations et tous les profils, du lycéen à l'entrepreneur.</p>
  <p>Explorer attire les jeunes professionnels marocains qui veulent s'éloigner des références ultra-connues (Sauvage, Bleu de Chanel) sans pour autant investir dans le niche. Son positionnement "aventurier-boisé" résonne avec une génération marocaine connectée et voyageuse.</p>`,
    guide: `<p><strong>Legend :</strong> Bergamote-lavande-santal-tonka. Fougère boisée universelle — pour tous les jours, du bureau aux sorties. Le choix infaillible pour débuter en parfumerie masculine ou pour offrir.</p>
  <p><strong>Explorer :</strong> Bergamote-vétiver-patchouli-cacao. Boisé aventurier et masculin — pour l'homme actif et moderne qui cherche une alternative aux fragrances ultra-connues.</p>`,
    faq: [
      ['Legend est-il comparable à d\'autres parfums connus ?', 'Legend est dans la famille des fougères boisées, proche dans l\'esprit de Bleu de Chanel mais avec une personnalité plus douce et accessible. Il est souvent cité comme l\'un des meilleurs rapports qualité-prix de la parfumerie masculine.'],
      ['Explorer est-il un parfum de bureau ou de soirée ?', 'Explorer est polyvalent — son accord boisé-cacao convient au bureau en toute saison et aux sorties du soir. Sa profondeur de fond en fait un excellent choix pour l\'automne-hiver marocain.'],
      ['Montblanc est-il une vraie maison de parfumerie ?', 'Oui, bien que connue d\'abord pour ses stylos, Montblanc investi réellement dans la qualité parfumée — ses formules sont conçues par des nez de réputation internationale et ont la même exigence d\'excellence que ses autres produits.'],
    ]
  },
  {
    slug: 'parfums-inspires-narciso-rodriguez',
    name: 'Narciso Rodriguez',
    title: 'Parfums inspirés Narciso Rodriguez au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Narciso Rodriguez For Her : musc, fleur d\'oranger, ambre. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Narciso Rodriguez, le créateur de mode américain, a signé l\'un des parfums les plus sensuels et discrets de l\'histoire moderne : For Her (2003). Un musc blanc d\'une pureté absolue — la fragrance qui se fond à la peau pour créer une seconde nature unique. Disponible en 33ml à 100 DH.',
    story: `<p>Narciso Rodriguez naît en 1961 à New York dans une famille cubaine. Il travaille chez Anne Klein et Calvin Klein avant de lancer sa propre maison. Sa notoriété explose en 1996 pour une raison inattendue : il dessine la robe de mariée de Carolyn Bessette, qui épouse John F. Kennedy Jr. Cette robe de crêpe blanc minimaliste devient l\'une des plus célèbres du XXe siècle et définit l\'esthétique de toute la maison.</p>
  <p>En 2003, il traduit cette même philosophie de "l\'essentiel sans le superflu" en parfumerie avec <strong>For Her</strong>, conçu par Christine Nagel : une quantité sans précédent de musc synthétique dans une formule délibérément anti-parfum. For Her ne se pose pas sur la peau — il semble en émaner, créant l\'illusion que vous ne portez rien d\'autre que votre propre sensualité amplifiée.</p>`,
    maroc: `<p>For Her représente le choix olfactif des femmes marocaines qui ont compris que la discrétion peut être la forme la plus sophistiquée de présence. Populaire parmi les professionnelles qui travaillent en environnement mixte et veulent une fragrance intime sans déclaration, il fonctionne aussi bien au bureau que dans les occasions privées.</p>
  <p>Sa chaleur musquée s'intensifie légèrement avec la chaleur cutanée marocaine, révélant progressivement sa sensualité au fil de la journée — particulièrement réussi en automne-hiver quand les vêtements plus couvrants piègent le sillage contre la peau.</p>`,
    guide: `<p><strong>For Her :</strong> Musc blanc-fleur d'oranger-ambre. La sensualité discrète absolue. Pour la femme qui veut laisser une empreinte intime et mémorable — un parfum qui semble venir de la peau elle-même. Bureau, soirées intimistes, quatre saisons.</p>`,
    faq: [
      ['For Her est-il un parfum discret ?', 'For Her est dans la catégorie des parfums "peau" — son sillage est discret mais sa présence est indéniable pour ceux qui s\'approchent. Parfait pour le bureau et les espaces fermés où les fragrances trop puissantes seraient déplacées.'],
      ['For Her convient-il toute l\'année ?', 'Oui, le musc blanc est l\'une des rares familles olfactives véritablement quatre-saisons. Il est particulièrement apprécié en automne-hiver pour sa chaleur sensuelle, mais reste léger et agréable en été.'],
      ['Pourquoi For Her sent différemment selon les personnes ?', 'Les muscs blancs sont des molécules olfactives qui s\'associent intimement à la chimie cutanée de chaque individu. C\'est pourquoi For Her sent légèrement différent sur chaque personne — c\'est précisément sa force : il révèle votre sensualité propre plutôt que d\'imposer la sienne.'],
    ]
  },
  {
    slug: 'parfums-inspires-azzaro',
    name: 'Azzaro',
    title: 'Parfums inspirés Azzaro au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées d\'Azzaro : Wanted, The Most Wanted. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Loris Azzaro, le créateur français d\'origine tunisienne, a fondé sa maison en 1967 et créé des fragrances masculines charismatiques. Wanted (2016) avec son accord citron-gingembre-tonka est devenu l\'un des parfums masculins les plus appréciés de la décennie. The Most Wanted (2021) amplifie le registre gourmand. En 33ml à 100 DH.',
    story: `<p>Loris Azzaro naît en 1933 à Sfax, Tunisie, dans une famille italo-sicilienne. Il arrive à Paris dans les années 1960 et fonde sa maison de couture en 1967, devenant célèbre pour ses robes à sequins de l'ère disco — portées par Sophia Loren, Claudia Cardinale et les stars de la nuit parisienne. En parfumerie, il crée dès 1978 <em>Azzaro Pour Homme</em>, un fougère-lavande-anis qui devient un classique méditerranéen.</p>
  <p>En 2016, la maison se réinvente avec <strong>Wanted</strong>, signé par Quentin Bisch : un accord citron sicilien-gingembre-tonka-vétiver qui incarne l\'homme charismatique et ambitieux. La fragrance devient rapidement l\'une des plus discutées sur les forums de parfumerie — pour son rapport qualité-prix exceptionnel et sa polyvalence rare. The Most Wanted (2021) pousse le curseur vers le gourmand avec du toffee-cardamome-ambre.</p>`,
    maroc: `<p>L\'origine tunisienne de Loris Azzaro donne à la maison une résonance particulière dans le monde maghrébin. Wanted est très apprécié au Maroc pour sa polyvalence — son ouverture citron-gingembre est parfaite pour les matins chauds, tandis que sa base tonka-vétiver s\'épanouit lors des soirées fraîches. Un parfum qui fonctionne dans le contexte climatique marocain à toutes les saisons.</p>
  <p>The Most Wanted est le choix des soirées hivernales marocaines — son toffee-cardamome-ambre crée un nuage chaud et enveloppant parfaitement adapté aux nuits fraîches de Fès, Meknès ou Marrakech en décembre-janvier.</p>`,
    guide: `<p><strong>Wanted :</strong> Citron sicilien-gingembre-tonka-vétiver. Épicé et charismatique — pour l'homme magnétique. Excellent du bureau aux soirées. Polyvalent toutes saisons.</p>
  <p><strong>The Most Wanted :</strong> Cardamome-toffee-ambre-cèdre. Plus gourmand et enveloppant — pour les soirées et l'automne-hiver marocain.</p>`,
    faq: [
      ['Wanted est-il adapté au Maroc ?', 'Oui, Wanted est l\'un des parfums masculins les plus polyvalents de notre catalogue. Son citron-gingembre rafraîchit en été, sa base tonka-vétiver réchauffe en hiver. Il fonctionne dans tous les contextes climatiques marocains.'],
      ['The Most Wanted est-il très sucré ?', 'The Most Wanted est dans la famille gourmand-oriental avec son toffee caramelé — plus affirmé que Wanted. Si vous aimez les parfums chauds et sucrés comme Scandal Pour Homme ou Ultra Male, c\'est un excellent choix.'],
      ['Quelle est la différence entre Wanted et The Most Wanted ?', 'Wanted est plus frais et épicé (citron-gingembre dominant). The Most Wanted est plus gourmand et oriental (toffee-cardamome dominant). Wanted convient au bureau, The Most Wanted est plutôt pour les soirées.'],
    ]
  },
  {
    slug: 'parfums-inspires-burberry',
    name: 'Burberry',
    title: 'Parfums inspirés Burberry au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Notre fragrance inspirée de Burberry Her : baies rouges, jasmin, musc. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'La maison Burberry, fondée à Basingstoke en 1856, est l\'une des marques de luxe britanniques les plus reconnues. Burberry Her (2018), créé par Francis Kurkdjian, est un fruit-floral-musqué moderne — baies rouges pétillantes, jasmin délicat et musc doux. Une fragrance jeune, accessible et universellement appréciée. En 33ml à 100 DH.',
    story: `<p>Thomas Burberry ouvre sa boutique à Basingstoke en 1856, à l\'âge de 21 ans. Son génie vient de l\'invention, en 1880, du gabardine — un tissu imperméable mais respirant qui révolutionne les vêtements d\'extérieur. Burberry habille les explorateurs de l\'Antarctique (Amundsen et Scott emportent du gabardine), les pilotes de la Première Guerre mondiale et les troupes britanniques. Le trench-coat devient son symbole universel.</p>
  <p>En parfumerie, Burberry maintient ce positionnement britannique raffiné. <strong>Burberry Her</strong> (2018), confié à Francis Kurkdjian (celui de BR540), est une déclaration moderne et vibrante : baies rouges pétillantes, jasmin léger et musc enveloppant — une fragrance qui capture l\'énergie d\'une jeune femme à Londres, entre le marché de Portobello et les galeries de Shoreditch.</p>`,
    maroc: `<p>Burberry Her est une porte d\'entrée idéale dans la parfumerie pour les jeunes femmes marocaines qui commencent à explorer les fragrances de marque. Son accord fruité-floral est immédiatement plaisant, jamais intimidant, et convient aussi bien au lycée qu\'au bureau — une polyvalence rare à ce niveau de qualité.</p>
  <p>Son association avec Francis Kurkdjian — nez de BR540, la fragrance la plus désirée du Maroc — lui donne une crédibilité supplémentaire auprès des connaisseurs. Burberry Her offre l\'ADN olfactif Kurkdjian à un rapport qualité-prix très accessible.</p>`,
    guide: `<p><strong>Burberry Her :</strong> Baies rouges-jasmin-musc. Fruité-floral moderne et lumineux — pour la femme jeune et dynamique. Idéal pour le quotidien, le bureau, le printemps et l'été.</p>`,
    faq: [
      ['Burberry Her est-il adapté à une première fragrance ?', 'Oui, c\'est l\'une des meilleures premières fragrances — son accord fruité-floral est accessible, moderne et universellement apprécié. Un excellent point de départ pour explorer la parfumerie de marque.'],
      ['Burberry Her tient-il longtemps ?', 'Notre inspiré offre une tenue de 5 à 7 heures — légèrement moins intense que les orientaux, ce qui le rend parfait pour le bureau et les espaces fermés.'],
      ['Quel est le lien entre Burberry Her et Francis Kurkdjian ?', 'Burberry a confié la création de Her à Francis Kurkdjian — le même nez derrière Baccarat Rouge 540 de MFK. Cette origine explique la qualité et la luminosité particulière de son accord fruité.'],
    ]
  },
  {
    slug: 'parfums-inspires-viktor-rolf',
    name: 'Viktor & Rolf',
    title: 'Parfums inspirés Viktor & Rolf au Maroc — 33ml à 100 DH | Parfum33ml.ma',
    desc: 'Nos fragrances inspirées de Viktor & Rolf : Flowerbomb, Spicebomb. Format 33ml à 100 DH. Livraison 24-48h partout au Maroc.',
    intro: 'Le duo de designers hollandais Viktor Horsting et Rolf Snoeren ont créé deux "bombes" olfactives devenues cultes. Flowerbomb (2005) pour elle — une explosion florale baroque. Spicebomb (2012) pour lui — une bombe épicée provocante. Les deux sont des parfums extravagants et à fort sillage disponibles en 33ml à 100 DH.',
    story: `<p>Viktor Horsting et Rolf Snoeren se rencontrent à l\'École de Design d\'Arnhem aux Pays-Bas en 1988, s\'installent à Paris en 1993 et commencent à questionner les codes de la mode avec des défilés-performances conceptuels. Leur génie est dans la provocation intellectuelle : ils vendent du rêve tout en moquant les conventions du luxe.</p>
  <p><strong>Flowerbomb</strong> (2005) est leur manifeste parfumé : un flacon en forme de grenade florale, un accord rose-jasmin-orchidée-patchouli d\'une opulence baroque délibérément excessive. Le nom lui-même est une contradiction — la violence de la bombe, la douceur de la fleur. <strong>Spicebomb</strong> (2012) réplique pour lui avec la même logique de l\'excès : poivre, safran, tabac et cuir dans un accord épicé-explosif que porte l\'homme qui n\'a peur de rien.</p>`,
    maroc: `<p>Flowerbomb est le parfum des grandes occasions marocaines — mariages, fiançailles, cérémonies du henné — où son accord rose-jasmin opulent et son sillage puissant sont non seulement acceptés mais recherchés. Dans la culture olfactive marocaine, un parfum qui "tient" et "projette" est signe de qualité et d\'intention.</p>
  <p>Spicebomb attire les hommes marocains qui veulent une fragrance épicée-masculine affirmée sans passer par les références classiques. Son accord safran-poivre-cuir résonne avec les épices de la cuisine marocaine — une familiarité olfactive qui le rend intuitivement séduisant.</p>`,
    guide: `<p><strong>Flowerbomb :</strong> Rose-jasmin-orchidée-patchouli. Explosion florale opulente — pour les femmes qui assument les parfums riches et enveloppants. Soirées, cérémonies et grandes occasions.</p>
  <p><strong>Spicebomb :</strong> Poivre-safran-tabac-cuir. Épicé explosif et masculin — pour les soirées et les hommes qui assument leur présence. Automne-hiver idéal.</p>`,
    faq: [
      ['Flowerbomb convient-il au bureau ?', 'Flowerbomb est un parfum puissant conçu pour être remarqué — son sillage opulent peut être envahissant en espace fermé. Réservez-le pour les soirées et les occasions festives. Au bureau, une application ultra-légère (1 spray) reste envisageable.'],
      ['Spicebomb ou Spicebomb Extreme ?', 'Nous proposons Spicebomb (la version originale). Spicebomb Extreme est encore plus intense et chaud — l\'original est déjà très affirmé et convient à la majorité des préférences. Commencez par l\'original.'],
      ['Pourquoi le flacon est-il en forme de grenade ?', 'Viktor & Rolf jouent délibérément sur la contradiction — une grenade florale. La beauté qui détruit (la monotonie du parfum conventionnel). C\'est leur façon d\'affirmer qu\'une fragrance doit être un acte, pas un accessoire.'],
    ]
  },
];

function genBrandPage(brand) {
  const url = `${CANON}/${brand.slug}`;
  const brandProds = ALL.filter(p => p.brand === brand.name);
  const hasFemme = brandProds.some(p => p.gender === 'femme');
  const hasHomme = brandProds.some(p => p.gender === 'homme');

  const ctaHero = hasFemme && hasHomme
    ? `<a href="/parfums-femme" class="btn-p" style="margin-top:4px">Collection Femme →</a>\n  <a href="/parfums-homme" class="btn-o" style="margin-top:4px">Collection Homme →</a>`
    : hasFemme
      ? `<a href="/parfums-femme" class="btn-p" style="margin-top:4px">Voir la collection Femme →</a>`
      : `<a href="/parfums-homme" class="btn-p" style="margin-top:4px">Voir la collection Homme →</a>`;

  const ctaBottom = hasFemme && hasHomme
    ? `<a href="/parfums-femme" class="btn-p">Collection Femme →</a>\n  <a href="/parfums-homme" class="btn-o">Collection Homme →</a>`
    : hasFemme
      ? `<a href="/parfums-femme" class="btn-p">Voir tous nos parfums Femme →</a>`
      : `<a href="/parfums-homme" class="btn-p">Voir tous nos parfums Homme →</a>`;

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

  const storySection = brand.story ? `
<div class="static-section">
  <h2>L'histoire de la maison ${brand.name}</h2>
  ${brand.story}
</div>
` : '';

  const marocSection = brand.maroc ? `
<div class="static-section">
  <h2>Pourquoi les fragrances ${brand.name} séduisent au Maroc</h2>
  ${brand.maroc}
</div>
` : '';

  const html = `${head({ title: brand.title, desc: brand.desc, canonical: url, schema: [schemaCollectionPage, schemaBreadcrumb] })}
${NAV}

<div class="breadcrumb">
  <a href="/">Accueil</a><span class="sep">›</span>
  <span>Parfums inspirés ${brand.name}</span>
</div>

<div class="static-hero">
  <span class="article-tag">Marque</span>
  <h1>Parfums inspirés <em>${brand.name}</em></h1>
  <p>${brand.desc}</p>
  __CTA_HERO__
</div>

<div class="static-content">

<div class="static-section">
  <h2>Nos ${count} fragrance${count > 1 ? 's' : ''} inspirée${count > 1 ? 's' : ''} de ${brand.name}</h2>
  <p>${brand.intro}</p>
  <div class="static-card-grid">
${cards}
  </div>
</div>

${storySection}

<div class="static-section">
  <h2>Quel parfum ${brand.name} choisir ?</h2>
  ${brand.guide}
</div>

${marocSection}

<div class="static-section">
  <h2>FAQ — Parfums inspirés ${brand.name} au Maroc</h2>
${faqItems}
  <p><strong>Q : Livraison à Casablanca, Rabat, Marrakech ?</strong><br>Livraison en 24h à Casablanca et Rabat, 24-48h dans toutes les autres villes du Maroc. Gratuite dès 3 flacons commandés.</p>
</div>

<div class="article-cta">
  <h3 style="font-family:var(--ff-d);font-size:22px;margin-bottom:8px">Commandez votre fragrance inspirée de ${brand.name}</h3>
  <p style="color:var(--txt2);font-size:14px;margin-bottom:16px">${count} fragrance${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''} · 33ml à 100 DH · Livraison 24-48h partout au Maroc</p>
  ${ctaBottom}
</div>

</div>

${FOOTER}
</body>
</html>`;
  return html.replace('__CTA_HERO__', ctaHero);
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
