#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const CANON = 'https://parfum33ml.ma';
const WA = 'https://wa.me/212600000000';

const SOCIAL_SVG = {
  ig: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  tt: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`,
  wa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
};

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

const CITIES = [
  {
    slug: 'casablanca',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    region: 'Grand Casablanca-Settat',
    deliveryTime: '6-24h',
    deliveryExpress: '6h à 24h',
    deliveryStandard: '24h dans tout le Grand Casablanca',
    pop: '3,7 millions',
    zones: 'Maarif, Anfa, Hay Hassani, Sidi Maarouf, Ain Sebaa, Mohammedia, Bernoussi, Hay Mohammadi, Ben M\'sik, Ain Chok, Bourgogne',
    heroDesc: 'La capitale économique du Maroc — la ville où le parfum est une signature sociale. Livraison express en 6 à 24h dans tous les quartiers.',
    intro: 'Casablanca, métropole de 3,7 millions d\'habitants, est le cœur économique et commercial du Maroc. Le parfum y est un marqueur d\'identité fort — des habitants du Maarif aux actifs de Sidi Maarouf, en passant par les familles d\'Ain Sebaa et les résidents d\'Anfa. Parfum33ml.ma est le spécialiste des fragrances inspirées à Casablanca : +100 références masculines et féminines en 33ml à 100 DH, livrées en 6 à 24h dans tous les arrondissements.',
    soul: `<p>Casablanca sent la mer à l'aube — une brise iodée qui balaye le boulevard de la Corniche avant que la ville ne s'éveille. Puis viennent les odeurs du café noir fort dans les snacks du Maarif, le pain chaud des boulangeries de Bourgogne, les gaz d'échappement des embouteillages sur l'axe Hassan II. Casablanca ne flatte pas, elle stimule. C'est une ville qui avance — et ses parfums suivent.</p>
  <p>Les habitants de la capitale économique valorisent les fragrances qui "projettent" — non par ostentation, mais parce que le rythme de la ville est celui du mouvement perpétuel. Un parfum à Casablanca doit survivre à la salle de réunion du matin, au déjeuner en terrasse et à la soirée dans un rooftop d'Anfa. Il doit être à la fois professionnel et sensuel, sobre et mémorable.</p>`,
    moods: `<p><strong>Matin au bureau (Sidi Maarouf, Maarif) :</strong> Choisissez un accord frais et sobre — <a href="/parfums-inspires-dior">Sauvage Dior</a> pour les hommes, <a href="/parfums-inspires-chanel">Bleu de Chanel</a> pour une alternative plus discrète. Pour les femmes, <a href="/parfums-inspires-chloe">Chloé EDP</a> ou <a href="/parfums-inspires-lancome">Idôle Lancôme</a> — présents sans envahir.</p>
  <p><strong>Déjeuner d'affaires (restaurants du Maarif, La Sqala) :</strong> <a href="/parfums-inspires-hermes">Terre d'Hermès</a> pour lui — élégant, discret et immédiatement perçu comme "haut de gamme". Pour elle, <a href="/parfums-inspires-narciso-rodriguez">For Her Narciso Rodriguez</a> — une sensualité intime qui intrigue sans imposer.</p>
  <p><strong>Soirée à Anfa ou au Boulevard de la Corniche :</strong> C'est le moment des fragrances à sillage. <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540</a> ou <a href="/parfums-inspires-parfums-de-marly">Layton de Parfums de Marly</a> pour les hommes. <a href="/parfums-inspires-ysl">Black Opium YSL</a> ou <a href="/parfums-inspires-carolina-herrera">Good Girl</a> pour les femmes — fragrances conçues pour se faire remarquer.</p>`,
    climate: `<p>Casablanca bénéficie d'un climat océanique tempéré — étés chauds mais jamais étouffants (25-30°C), hivers doux et humides (10-18°C). Cette clémence relative permet de porter quasiment toutes les familles olfactives toute l'année.</p>
  <p><strong>Été (juin-septembre) :</strong> Privilégiez les fragrances fraîches et légères — aquatiques, aromatiques, agrumes. Sauvage, Acqua di Giò, Chance Eau Tendre. Appliquez le matin — la chaleur amplifie les notes de tête.</p>
  <p><strong>Hiver (novembre-février) :</strong> Les orientaux et les boisés chauds s'expriment pleinement. Layton, Baccarat Rouge 540, Black Opium, Tobacco Vanille. La pluie et l'humidité renforcent le sillage — une application plus modérée suffit.</p>`,
    popular: 'À Casablanca, les fragrances les plus demandées reflètent les goûts cosmopolites de la ville : <a href="/parfums-inspires-dior">Sauvage Dior</a> et <a href="/parfums-inspires-chanel">Bleu de Chanel</a> dominent chez les hommes, tandis que <a href="/parfums-inspires-ysl">Black Opium YSL</a> et <a href="/parfums-inspires-lancome">La Vie est Belle Lancôme</a> s\'imposent chez les femmes. Les fragrances niche comme <a href="/parfums-inspires-parfums-de-marly">Layton de Parfums de Marly</a> et <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540 MFK</a> connaissent une popularité croissante dans les quartiers branchés.',
    faq: [
      ['Livrez-vous dans tous les quartiers de Casablanca ?', 'Oui, nous livrons dans tous les arrondissements de Casablanca : Maarif, Anfa, Hay Hassani, Ain Chok, Ain Sebaa, Ben M\'sik, Bernoussi, Sidi Bernoussi, Hay Mohammadi, Bourgogne, Sidi Maarouf et Mohammedia. Le délai est de 6 à 24h après confirmation de commande.'],
      ['Quel est le parfum le plus commandé à Casablanca ?', 'Sauvage Dior est notre best-seller à Casablanca, suivi de Bleu de Chanel et de 1 Million Paco Rabanne. Chez les femmes, Black Opium YSL et La Vie est Belle Lancôme sont les plus demandés.'],
      ['Puis-je récupérer ma commande en main propre à Casablanca ?', 'Nous livrons uniquement à domicile. Pour Casablanca, la livraison est rapide (6-24h) — plus pratique qu\'un déplacement.'],
    ]
  },
  {
    slug: 'rabat',
    name: 'Rabat',
    nameAr: 'الرباط',
    region: 'Rabat-Salé-Kénitra',
    deliveryTime: '6-24h',
    deliveryExpress: '6h à 24h',
    deliveryStandard: '24h pour Salé et Temara',
    pop: '580 000 (1,9M agglomération)',
    zones: 'Agdal, Hay Riad, Hassan, Souissi, Océan, Akkari, Salé, Témara, Harhoura, Bouregreg',
    heroDesc: 'La capitale administrative et diplomatique du Maroc. Livraison en 6 à 24h à Rabat, Salé et Temara.',
    intro: 'Rabat, capitale du Royaume du Maroc et ville patrimoniale inscrite à l\'UNESCO, abrite une population sophistiquée de diplomates, fonctionnaires et étudiants. Les habitants d\'Agdal, Hay Riad et Souissi ont des goûts raffinés en matière de parfumerie. Parfum33ml.ma livre à Rabat, Salé et Temara en 6 à 24h — la même journée pour la plupart des commandes passées avant midi.',
    soul: `<p>Rabat respire différemment des autres villes marocaines. Capitale administrative et diplomatique, elle porte une élégance d'État — les grandes avenues bordées d'orangers en fleur au printemps, la Kasbah des Oudayas dominant l'Atlantique, les ministères et ambassades du quartier Hassan. La ville sent le jasmin et la politique, l'iode de la plage de Rabat et les reliures en cuir des bibliothèques.</p>
  <p>Les habitants d'Agdal et Souissi — diplomates, fonctionnaires supérieurs, universitaires — ont des goûts olfactifs tournés vers la sophistication discrète. Le sillage trop affirmé est perçu comme peu professionnel dans les couloirs de l'Administration. Rabat valorise la qualité sur la puissance.</p>`,
    moods: `<p><strong>Bureau au quartier Hassan ou ministères :</strong> Élégance sobre et retenue — <a href="/parfums-inspires-hermes">Terre d'Hermès</a> pour lui, <a href="/parfums-inspires-chloe">Chloé EDP</a> ou <a href="/parfums-inspires-narciso-rodriguez">For Her</a> pour elle. Des fragrances qui suggèrent la qualité sans la crier.</p>
  <p><strong>Promenade à la Kasbah des Oudayas :</strong> Face à l'Atlantique, les fragrances marines et fraîches s'imposent — <a href="/parfums-inspires-versace">Dylan Blue</a> ou <a href="/parfums-inspires-armani">Acqua di Giò</a> en harmonie avec le vent de mer.</p>
  <p><strong>Dîner en famille à Agdal :</strong> <a href="/parfums-inspires-parfums-de-marly">Delina</a> pour elle — royal et festif. <a href="/parfums-inspires-parfums-de-marly">Layton</a> pour lui — sophistiqué et chaleureux.</p>`,
    climate: `<p>Rabat bénéficie d'un climat océanique doux — l'Atlantique tempère les extrêmes. Étés chauds mais modérés (28-33°C), hivers doux (10-18°C). Les fragrances sont quasiment sans restriction saisonnière, mais l'humidité atlantique amplifie les sillages.</p>
  <p><strong>Été rabati :</strong> Fraîcheur relative qui permet d'utiliser des fragrances légèrement plus intenses qu'à Marrakech. Sauvage, Bleu de Chanel et les floraux frais fonctionnent très bien. <strong>Hiver :</strong> Les orientaux s'expriment dans le froid humide. Layton, Baccarat Rouge 540 et Mon Guerlain sont particulièrement appréciés en saison froide.</p>`,
    popular: 'À Rabat, les fragrances orientales et raffinées dominent : <a href="/parfums-inspires-parfums-de-marly">Delina et Layton de Parfums de Marly</a> sont très appréciés dans les quartiers résidentiels d\'Agdal et Souissi. Les classiques comme <a href="/parfums-inspires-chanel">Chanel N°5</a> et <a href="/parfums-inspires-dior">J\'adore Dior</a> restent des valeurs sûres. Les étudiants de Hay Riad optent souvent pour <a href="/parfums-inspires-paco-rabanne">1 Million</a> et <a href="/parfums-inspires-carolina-herrera">Good Girl</a>.',
    faq: [
      ['Livrez-vous à Salé et Temara depuis Rabat ?', 'Oui, nous livrons à Rabat, Salé, Temara et Harhoura. Les délais sont identiques : 6 à 24h pour Rabat et Salé, 24h pour Temara.'],
      ['Comment commander à Rabat ?', 'Envoyez votre liste de parfums par WhatsApp avec votre adresse complète à Rabat. Nous confirmons la disponibilité et expédions. Paiement à la livraison disponible.'],
    ]
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    nameAr: 'مراكش',
    region: 'Marrakech-Safi',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour les zones périphériques',
    pop: '920 000',
    zones: 'Gueliz, Hivernage, Médina, Palmeraie, Agdal, M\'hamid, Massira, Amerchich',
    heroDesc: 'La Ville Rose, capitale touristique et culturelle du Maroc. Livraison en 24 à 48h dans tous les quartiers.',
    intro: 'Marrakech, la cité impériale aux mille nuances, est l\'une des destinations les plus visitées au monde. Ses habitants — résidents aisés de Gueliz et de la Palmeraie, touristes de passage à l\'Hivernage, commerçants de la Médina — ont en commun un goût prononcé pour les parfums puissants et chaleureux, en harmonie avec le climat chaud et sec de la région. Parfum33ml.ma livre à Marrakech en 24 à 48h.',
    soul: `<p>Marrakech sent le safran, la rose et la menthe froissée. Dans les souks de la Médina, les odeurs se superposent en palimpseste : cuir tanné à la tannerie Chouara, épices au souk des herboristes, encens dans les zaouias, rose de Damas dans les boutiques de rosewater. C'est une ville qui olfactivement déborde — riche, contradictoire, inoubliable.</p>
  <p>Les habitants de Gueliz et de l'Hivernage vivent à l'interface de deux mondes : la Médina millénaire et la ville moderne avec ses hôtels cinq étoiles, ses restaurants gastronomiques, ses galeries d'art contemporain. Leurs choix olfactifs reflètent cette dualité — des fragrances qui honorent la profondeur orientale tout en revendiquant une modernité internationale. Les orientaux chauds et boisés s'imposent naturellement dans ce contexte.</p>`,
    moods: `<p><strong>Matin dans les ruelles de la Médina :</strong> Les fragrances légères et fraîches pour affronter la chaleur du souk. <a href="/parfums-inspires-hermes">Terre d'Hermès</a> pour lui — sa minéralité tranche avec l'opulence ambiante. <a href="/parfums-inspires-kenzo">Kenzo Homme</a> pour son yuzu rafraîchissant dans la touffeur des ruelles.</p>
  <p><strong>Après-midi à la Palmeraie ou en riad :</strong> Le repos mérite un parfum qui se révèle doucement. <a href="/parfums-inspires-guerlain">Mon Guerlain</a> pour elle — sa lavande-vanille est un baume olfactif. <a href="/parfums-inspires-parfums-de-marly">Percival de Parfums de Marly</a> — sa lavande-musc est parfaite pour les intérieurs ombragés.</p>
  <p><strong>Soirée sur la Jemaa el-Fna ou à l'Hivernage :</strong> C'est l'heure des grands sillages. <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540</a> ou <a href="/parfums-inspires-parfums-de-marly">Layton</a> pour lui. <a href="/parfums-inspires-ysl">Black Opium</a> ou <a href="/parfums-inspires-carolina-herrera">Good Girl</a> pour elle — la nuit de Marrakech appelle les fragrances qui durent.</p>`,
    climate: `<p>Marrakech est la ville marocaine au climat le plus extrême : étés très chauds et secs (35-42°C), hivers froids les nuits (5-10°C), printemps et automnes dorés (20-28°C). Ce contraste climatique influe considérablement sur le choix des fragrances.</p>
  <p><strong>Été (juin-août, chaleur intense) :</strong> Les fragrances légères et fraîches uniquement — appliquez tôt le matin, dans les zones fraîches (poignets, nuque). Privilégiez Kenzo Homme, Chance Eau Tendre, Light Blue. Évitez les orientaux trop chauds en plein été — ils se déploient trop vite et peuvent devenir étouffants.</p>
  <p><strong>Hiver (novembre-février, nuits fraîches) :</strong> Les orientaux et boisés chauds s'épanouissent parfaitement. Layton, Ombré Leather Tom Ford, Tobacco Vanille, Flowerbomb — ces fragrances ont besoin de chaleur corporelle pour révéler toute leur complexité, et les nuits fraîches de Marrakech créent le contexte idéal.</p>`,
    popular: 'À Marrakech, les fragrances orientales et boisées sont plébiscitées : <a href="/parfums-inspires-parfums-de-marly">Layton et Percival de Parfums de Marly</a> séduisent les amateurs de niche, tandis que <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540</a> est très demandé à l\'Hivernage. Les touristes apprécient <a href="/parfums-inspires-tom-ford">Tom Ford Ombré Leather</a> et <a href="/parfums-inspires-creed">Aventus Creed</a> pour leur sillage affirmé.',
    faq: [
      ['Livrez-vous dans la Médina de Marrakech ?', 'Oui, nous livrons dans tous les quartiers de Marrakech incluant la Médina, Gueliz, Hivernage, Palmeraie, M\'hamid et Massira. Délai : 24 à 48h.'],
      ['Quels parfums recommandez-vous pour le climat de Marrakech ?', 'Pour la chaleur de Marrakech en été, choisissez des fragrances fraîches (Kenzo Homme, Chance Eau Tendre). Pour les soirées et l\'hiver, les orientaux s\'épanouissent parfaitement (Layton, Baccarat Rouge 540, Ombré Leather). La clé est de s\'adapter à la saison.'],
    ]
  },
  {
    slug: 'tanger',
    name: 'Tanger',
    nameAr: 'طنجة',
    region: 'Tanger-Tétouan-Al Hoceïma',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour les zones éloignées',
    pop: '1 million',
    zones: 'Malabata, Ibéria, Centre ville, Moujahidine, Beni Makada, Charf, Tanja Balia, Boukhalef',
    heroDesc: 'Capitale du Nord et porte de l\'Europe. Carrefour culturel entre Orient et Occident. Livraison en 24-48h.',
    intro: 'Tanger, ville légendaire aux portes de l\'Europe et carrefour entre la Méditerranée et l\'Atlantique, est l\'une des métropoles les plus cosmopolites du Maroc. Ses habitants — des quartiers résidentiels de Malabata aux zones commerciales de Boukhalef — ont des goûts éclectiques influencés par les cultures européenne et orientale. Avec l\'essor économique de Tanger Med, la ville attire une population jeune et urbaine, très sensible aux grandes marques de parfumerie. Parfum33ml.ma livre à Tanger en 24 à 48h.',
    soul: `<p>Tanger sent le détroit. Une odeur de vent marin qui arrive d'Espagne, à seulement 14 kilomètres — ce vent du détroit de Gibraltar que les marins appellent le Levante, chargé d'iode et d'embruns, est l'ADN olfactif de la ville. Paul Bowles, Tennessee Williams et Jack Kerouac l'ont senti dans les cafés de la Medina et en ont écrit des pages mémorables — Tanger est la ville qui inspire, la porte entre deux continents.</p>
  <p>Le boom économique de Tanger Med — le plus grand port d'Afrique — a attiré une nouvelle génération de cadres, d'ingénieurs et d'entrepreneurs qui ont modernisé la ville sans effacer son cosmopolitisme légendaire. Les Tangérois d'aujourd'hui parlent arabe, darija, espagnol et français dans la même conversation, et leurs goûts parfumés reflètent cette richesse culturelle : ni totalement français, ni totalement oriental, toujours entre deux rives.</p>`,
    moods: `<p><strong>Matin sur la corniche de Malabata :</strong> Le vent du Détroit appelle les fragrances marines et fraiches — <a href="/parfums-inspires-versace">Dylan Blue Versace</a> pour lui (aquatique-boisé) ou <a href="/parfums-inspires-armani">Acqua di Giò</a> qui capture exactement cette énergie littorale.</p>
  <p><strong>Après-midi dans les souks de la Médina ou au Grand Socco :</strong> Les fragrances classiques et polyvalentes s'imposent — <a href="/parfums-inspires-dior">Sauvage Dior</a> ou <a href="/parfums-inspires-chanel">Bleu de Chanel</a> pour lui. Pour elle, <a href="/parfums-inspires-ysl">Libre YSL</a> — moderne et affirmée.</p>
  <p><strong>Soirée dans un café avec vue sur le Détroit :</strong> Tanger est une ville qui philosophe la nuit. <a href="/parfums-inspires-creed">Aventus Creed</a> pour l'homme ambitieux qui regarde vers l'Europe. <a href="/parfums-inspires-chanel">Coco Mademoiselle</a> pour la femme qui a du caractère — un classique qui ne vieillit pas.</p>`,
    climate: `<p>Tanger jouit d'un microclimat méditerranéen atypique — le Détroit de Gibraltar y crée un vent presque permanent qui modère les températures. Les étés restent plus frais que dans le reste du Maroc (25-32°C rarement), les hivers sont doux et pluvieux (10-16°C).</p>
  <p><strong>Été tangérois (frais et venteux) :</strong> Les fragrances fraîches-marines s'épanouissent idéalement — Acqua di Giò, Dylan Blue, Chance Eau Tendre, Light Blue. Le vent du Détroit transporte les sillages en les amplifiant — une application modérée suffit.</p>
  <p><strong>Hiver tangérois (doux et humide) :</strong> Les boisés et épicés s'expriment bien. Sauvage, Bleu de Chanel, Coco Mademoiselle restent polyvalents. Les orientaux très chauds ne sont pas nécessaires — le clima tangérois ne les justifie pas comme à Fès ou Marrakech.</p>`,
    popular: 'À Tanger, les fragrances fraîches et marines sont très prisées en raison du climat méditerranéen : <a href="/parfums-inspires-dior">Sauvage Dior</a> et <a href="/parfums-inspires-armani">Acqua di Giò Armani</a> dominent chez les hommes. Les femmes plébiscitent <a href="/parfums-inspires-chanel">Coco Mademoiselle Chanel</a> et <a href="/parfums-inspires-ysl">Libre YSL</a>. La proximité avec l\'Europe rend les Tangérois particulièrement sensibles aux tendances olfactives internationales.',
    faq: [
      ['Livrez-vous dans tous les quartiers de Tanger ?', 'Oui, nous livrons dans tous les quartiers de Tanger : Malabata, Centre ville, Ibéria, Moujahidine, Beni Makada, Charf, Tanja Balia et Boukhalef. Délai : 24 à 48h après confirmation.'],
      ['Les habitants de Tanger ont-ils des préférences particulières en parfumerie ?', 'Les Tangérois ont des goûts très influencés par la proximité de l\'Europe et le brassage culturel de la ville. Ils apprécient les fragrances fraîches-marines en été et les boisés en hiver. Sauvage Dior, Acqua di Giò et Coco Mademoiselle sont leurs références.'],
      ['Le vent de Tanger influence-t-il le choix de parfum ?', 'Oui — le vent du Détroit de Gibraltar amplifie les sillages. À Tanger, une application modérée suffit souvent là où d\'autres villes nécessiteraient plus. Les fragrances légères se projettent naturellement dans ce contexte venteux.'],
    ]
  },
  {
    slug: 'fes',
    name: 'Fès',
    nameAr: 'فاس',
    region: 'Fès-Meknès',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour les zones périphériques',
    pop: '1,1 million',
    zones: 'Médina, Ville Nouvelle, Saïss, Narjiss, Montfleuri, Agdal, Aouinat El Hajjaj, Bensouda',
    heroDesc: 'La capitale spirituelle et culturelle du Maroc — ville impériale classée UNESCO. Livraison en 24-48h.',
    intro: 'Fès, la plus ancienne ville impériale du Maroc et capitale de la culture islamique, est une cité où tradition et modernité coexistent harmonieusement. De la Médina — la plus grande médina médiévale du monde, classée UNESCO — aux quartiers modernes de Narjiss et Montfleuri, les habitants de Fès ont un attachement profond au raffinement olfactif. Le parfum y est intimement lié à l\'identité culturelle et religieuse. Parfum33ml.ma livre à Fès en 24 à 48h.',
    soul: `<p>Fès est la ville marocaine où le rapport au parfum est le plus ancien et le plus chargé de sens. Dans la Médina — la plus grande médina médiévale du monde, labyrinthique et hors du temps — l'oud brûle dans les mosquées, le jasmin en guirlandes orne les mariages, l'eau de rose asperge les visiteurs des zaouias. Le parfum n'est pas un accessoire à Fès : c'est une pratique spirituelle.</p>
  <p>Les artisans de la tannerie Chouara vivent entourés des peaux brutes et des pigments — une odeur paradoxalement fascinante qui a inspiré des générations de parfumeurs. Les familles bourgeoises de la Médina, héritières de siècles de culture olfactive arabo-andalouse, valorisent les fragrances qui portent une histoire et une profondeur authentiques.</p>`,
    moods: `<p><strong>Visite de la Médina et des souks :</strong> Un accord discret et résistant à la chaleur des ruelles — <a href="/parfums-inspires-hermes">Terre d'Hermès</a> (minéral, sobre, élégant) ou <a href="/parfums-inspires-narciso-rodriguez">For Her</a> pour les femmes (musc peau invisible).</p>
  <p><strong>Moment de prière et de recueillement :</strong> Les fragrances musquées et sobres respectent les espaces sacrés. <a href="/parfums-inspires-guerlain">Mon Guerlain</a> (lavande-vanille apaisante) ou <a href="/parfums-inspires-chloe">Chloé EDP</a> (floral délicat et respectueux).</p>
  <p><strong>Dîner en famille dans un riad traditionnel :</strong> Les orientaux chauds s'accordent parfaitement avec l'atmosphère des riads — zelliges, bougies, musique andalouse. <a href="/parfums-inspires-parfums-de-marly">Layton</a> ou <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540</a> pour lui, <a href="/parfums-inspires-gucci">Gucci Bloom</a> pour elle — opulent et festif.</p>`,
    climate: `<p>Fès a le climat le plus contrasté des villes marocaines : étés très chauds (38-42°C), hivers froids avec gelées nocturnes possibles (0-5°C la nuit en janvier). Cette amplitude thermique unique façonne les choix olfactifs de ses habitants.</p>
  <p><strong>Été fassi (très chaud et sec) :</strong> Matières légères uniquement — les floraux frais, les aquatiques, les agrumes. Appliquez tôt le matin. Chance Eau Tendre, Kenzo Homme, For Her. Les orientaux sont à éviter en journée — réservez-les pour la soirée fraîche.</p>
  <p><strong>Hiver fassi (froid et sec) :</strong> Les conditions idéales pour les fragrances profondes. Layton développe une richesse exceptionnelle dans le froid sec. Tobacco Vanille Tom Ford, Flowerbomb, Mon Guerlain s'y révèlent dans toute leur plénitude. La culture olfactive fassi valorise particulièrement les orientaux ambrés en hiver.</p>`,
    popular: 'À Fès, les fragrances orientales et musquées sont traditionnellement appréciées, reflet de la culture olfactive ancestrale de la ville. <a href="/parfums-inspires-parfums-de-marly">Layton de Parfums de Marly</a> et <a href="/parfums-inspires-maison-francis-kurkdjian">Baccarat Rouge 540</a> rencontrent un succès croissant chez les jeunes urbains. Les classiques comme <a href="/parfums-inspires-dior">Dior Homme</a> et <a href="/parfums-inspires-guerlain">Mon Guerlain</a> restent incontournables.',
    faq: [
      ['Livrez-vous dans la Médina de Fès ?', 'Oui, nous livrons dans tous les quartiers de Fès incluant la Médina, la Ville Nouvelle, Narjiss, Montfleuri, Saïss et Bensouda. Délai : 24 à 48h.'],
      ['Quels parfums sont les plus populaires à Fès ?', 'Les Fassis apprécient particulièrement les fragrances orientales et musquées, dans la continuité d\'une tradition olfactive millénaire. Layton, Baccarat Rouge 540 et les classiques Dior et Guerlain sont très demandés. Les orientaux chauds s\'expriment magnifiquement dans le climat sec de Fès.'],
      ['Fès a-t-elle une tradition parfumée particulière ?', 'Oui — Fès est l\'une des villes marocaines avec la culture olfactive la plus ancienne et la plus riche. L\'oud, le jasmin et l\'eau de rose sont utilisés depuis des siècles dans les cérémonies religieuses et familiales. Les habitants de la Médina ont souvent une connaissance olfactive sophistiquée transmise de génération en génération.'],
    ]
  },
  {
    slug: 'agadir',
    name: 'Agadir',
    nameAr: 'أكادير',
    region: 'Souss-Massa',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Tiznit et Taroudant',
    pop: '420 000',
    zones: 'Talborjt, Hay Mohammadi, Anza, Bensergao, Cité Dakhla, Secteur Touristique, Inzegane, Ait Melloul',
    heroDesc: 'La capitale balnéaire du Maroc — station touristique de renommée mondiale. Livraison en 24-48h.',
    intro: 'Agadir, la perle de l\'Atlantique et destination balnéaire phare du Maroc, bénéficie d\'un ensoleillement exceptionnel et d\'un développement touristique intense. Ses habitants et les nombreux touristes qui la visitent apprécient les fragrances fraîches et légères en été, et les boisés chaleureux en hiver. La ville jeune et dynamique d\'Agadir — reconstruite après le séisme de 1960 — est en constante croissance. Parfum33ml.ma livre à Agadir et dans toute sa région en 24 à 48h.',
    soul: `<p>Agadir sent la crème solaire et l'air iodé de l'Atlantique. Reconstruite entièrement après le séisme de 1960, elle est la seule ville marocaine sans passé médiéval — tout y est moderne, lumineux, tourné vers la mer. Cet optimisme balnéaire se retrouve dans les choix olfactifs de ses habitants : des fragrances légères, solaires, qui évoquent la plage et les vacances.</p>
  <p>La ville de Souss est aussi un carrefour culturel entre le Maroc arabe du nord et les populations amazighes du sud — une diversité culturelle qui enrichit les pratiques parfumées.</p>`,
    moods: `<p><strong>Plage et secteur touristique :</strong> Les fragrances légères et solaires sont reines — <a href="/parfums-inspires-armani">Acqua di Giò</a>, <a href="/parfums-inspires-chanel">Chance Eau Tendre</a>, <a href="/parfums-inspires-versace">Bright Crystal Versace</a>. Des fragrances qui évoquent la mer et le soleil.</p>
  <p><strong>Soirée à Talborjt ou au centre-ville :</strong> <a href="/parfums-inspires-versace">Eros Versace</a> ou <a href="/parfums-inspires-paco-rabanne">Invictus</a> pour lui — des fragrances à fort sillage adaptées aux soirées chaudes d'Agadir. Pour elle, <a href="/parfums-inspires-carolina-herrera">Good Girl</a> ou <a href="/parfums-inspires-lancome">Idôle</a>.</p>`,
    climate: `<p>Agadir a le meilleur ensoleillement du Maroc (plus de 300 jours de soleil/an) avec des températures douces toute l'année (20-28°C l'été, 14-20°C l'hiver). Ce climat permet de porter des fragrances fraîches presque toute l'année. En hiver, les orientaux comme Layton sont appréciés pour les soirées plus fraîches.</p>`,
    popular: 'À Agadir, les fragrances fraîches et marines sont les best-sellers en été : <a href="/parfums-inspires-armani">Acqua di Giò</a> et <a href="/parfums-inspires-versace">Versace Eros</a> dominent chez les hommes. Les femmes apprécient <a href="/parfums-inspires-chanel">Chance Eau Tendre</a> et <a href="/parfums-inspires-lancome">Idôle Lancôme</a> pour leur légèreté. En hiver, les orientaux comme <a href="/parfums-inspires-parfums-de-marly">Layton</a> prennent le dessus.',
    faq: [
      ['Livrez-vous à Inzegane et Ait Melloul ?', 'Oui, nous livrons dans toute l\'agglomération d\'Agadir incluant Inzegane, Ait Melloul, Bensergao, Anza et le Secteur Touristique. Délai : 24 à 48h.'],
      ['Quels parfums recommandez-vous pour le climat d\'Agadir ?', 'Pour le climat ensoleillé d\'Agadir, nous recommandons les fragrances fraîches en été (Acqua di Giò, Chance Eau Tendre) et les boisés en hiver (Layton, Ombré Leather). Les parfums floraux sont appréciés toute l\'année.'],
    ]
  },
  {
    slug: 'oujda',
    name: 'Oujda',
    nameAr: 'وجدة',
    region: 'Oriental',
    deliveryTime: '48-72h',
    deliveryExpress: '48h à 72h',
    deliveryStandard: '72h pour les zones éloignées',
    pop: '570 000',
    zones: 'Centre ville, Hay Qods, Sidi Maafa, Beni Drar, Hay Al Qods, Lazaret, Isly, Merinides',
    heroDesc: 'Capitale de la Région de l\'Oriental — aux portes de l\'Algérie et de la Méditerranée. Livraison en 48-72h.',
    intro: 'Oujda, capitale de la région de l\'Oriental et deuxième ville du nord-est marocain, est un carrefour commercial et culturel important. Ville universitaire dynamique avec l\'Université Mohammed Premier, Oujda attire une jeunesse ambitieuse qui suit de près les tendances mondiales en matière de mode et de parfumerie. La proximité avec l\'Algérie crée des échanges commerciaux intenses. Parfum33ml.ma livre à Oujda et dans toute la région orientale en 48 à 72h.',
    soul: `<p>Oujda est la capitale de l'Oriental — une région qui regarde autant vers l'Algérie que vers Rabat. Ville universitaire avec l'Université Mohammed Premier, elle rassemble une jeunesse ambitieuse et connectée qui suit de près les tendances internationales. Son climat continental extrême (étés brûlants, hivers froids) forge des goûts olfactifs pour des fragrances à fort sillage et longue tenue — des parfums qui résistent aux conditions climatiques les plus sévères.</p>`,
    climate: `<p>Oujda est la ville marocaine au climat le plus continental — étés très chauds et secs (40°C+), hivers froids (parfois négatifs la nuit). Les orientaux chauds et les boisés s'épanouissent remarquablement en hiver, quand le froid sec libère leurs accords ambrés. En été, les fragrances fraîches et légères sont essentielles.</p>`,
    popular: 'À Oujda, les fragrances masculines sont particulièrement recherchées : <a href="/parfums-inspires-dior">Sauvage Dior</a> et <a href="/parfums-inspires-paco-rabanne">1 Million</a> sont les plus commandés. Les femmes optent pour <a href="/parfums-inspires-ysl">Black Opium</a> et <a href="/parfums-inspires-carolina-herrera">Good Girl</a>. La culture olfactive de la région orientale valorise les parfums à fort sillage et longue tenue.',
    faq: [
      ['Livrez-vous à Oujda depuis Casablanca ?', 'Oui, nous livrons à Oujda via notre réseau de transport national. Le délai est de 48 à 72h après confirmation de commande. La livraison est disponible dans tous les quartiers d\'Oujda.'],
      ['Le paiement à la livraison est-il disponible à Oujda ?', 'Oui, le cash à la livraison est disponible à Oujda. Nous acceptons également CashPlus, Wafacash et Barid Cash pour plus de flexibilité.'],
    ]
  },
  {
    slug: 'meknes',
    name: 'Meknès',
    nameAr: 'مكناس',
    region: 'Fès-Meknès',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour les zones périphériques',
    pop: '630 000',
    zones: 'Hamria, Marjane, Centre ville, Médina, Riad, Ismailia, Zitoun, Bassatine, Agouray',
    heroDesc: 'L\'une des quatre villes impériales du Maroc — ville historique et viticole. Livraison en 24-48h.',
    intro: 'Meknès, la quatrième ville impériale du Maroc fondée par le sultan Moulay Ismaïl au XVIIe siècle, est une cité aux richesses architecturales et culturelles exceptionnelles. Classée patrimoine mondial de l\'UNESCO, Meknès est également connue pour ses vignobles et sa gastronomie. Ses habitants, entre tradition et modernité, apprécient les parfums de caractère. Parfum33ml.ma livre à Meknès en 24 à 48h.',
    soul: `<p>Meknès est la ville impériale oubliée — fondée par Moulay Ismaïl au XVIIe siècle, elle a la grandeur de Versailles sans son afflux touristique. Ses vastes écuries royales qui abritaient 12 000 chevaux, ses remparts en pisé rouge et sa Médina paisible en font une ville de caractère discret. Elle sent le bois de cèdre de ses souks de menuiserie, les olives de ses huileries et la menthe fraîche du marché central.</p>
  <p>Meknès est aussi la capitale marocaine du vin — ses vignobles de Guerrouane et de Beni M'tir produisent depuis l'époque coloniale. Cette culture gastronomique raffinée influence les goûts de la ville, notamment ses habitants de la Ville Nouvelle qui apprécient les nuances.</p>`,
    moods: `<p><strong>Visite des remparts et de la Médina :</strong> Des fragrances classiques et intemporelles — <a href="/parfums-inspires-dior">Dior Homme</a> ou <a href="/parfums-inspires-hermes">Terre d'Hermès</a> pour lui. Pour elle, <a href="/parfums-inspires-guerlain">Mon Guerlain</a> dont la lavande évoque les campagnes méditerranéennes.</p>
  <p><strong>Soirée à Hamria ou Marjane :</strong> <a href="/parfums-inspires-parfums-de-marly">Layton</a> pour les hommes qui apprécient le niche, <a href="/parfums-inspires-lancome">La Vie est Belle</a> pour les femmes — des choix élégants pour une ville qui valorise l'intemporel.</p>`,
    climate: `<p>Meknès partage le climat continental de Fès — étés très chauds (35-40°C) et hivers froids. Les fragrances orientales et boisées s'épanouissent parfaitement en hiver, quand les nuits fraîches du Moyen Atlas descendent sur la ville. En été, privilégiez les fraîcheurs aromatiques.</p>`,
    popular: 'À Meknès, les fragrances classiques et intemporelles sont très appréciées : <a href="/parfums-inspires-dior">Dior Homme</a> et <a href="/parfums-inspires-chanel">Bleu de Chanel</a> sont les références masculines. Les femmes meknassiotes apprécient <a href="/parfums-inspires-lancome">La Vie est Belle</a> et <a href="/parfums-inspires-guerlain">Mon Guerlain</a> pour leur élégance intemporelle.',
    faq: [
      ['Livrez-vous dans les médinas de Meknès ?', 'Oui, nous livrons dans tous les quartiers de Meknès : Centre ville, Hamria, Ismailia, Riad, Médina et les quartiers périphériques. Délai : 24 à 48h.'],
      ['Acceptez-vous les commandes groupées à Meknès ?', 'Absolument. Les commandes de 3 flacons ou plus bénéficient de la livraison gratuite — idéal pour se regrouper entre amis ou en famille.'],
    ]
  },
  {
    slug: 'kenitra',
    name: 'Kénitra',
    nameAr: 'القنيطرة',
    region: 'Rabat-Salé-Kénitra',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Sidi Kacem et Sidi Slimane',
    pop: '430 000',
    zones: 'Centre ville, Mimosas, Bettit, Hay Mansour, Bir Rami, Saknia, Municipalité, Port',
    heroDesc: 'Ville portuaire et industrielle en pleine croissance au nord du Maroc. Livraison en 24-48h.',
    intro: 'Kénitra, ville portuaire et industrielle de la région Rabat-Salé-Kénitra, connaît une croissance économique soutenue avec le développement de son port et des zones industrielles. Sa population jeune et active — étudiants de l\'Université Ibn Tofaïl, salariés des zones industrielles — est très connectée aux tendances de la mode et du parfum. Parfum33ml.ma livre à Kénitra en 24 à 48h.',
    soul: `<p>Kénitra, ville portuaire et industrielle en plein essor, est l'une des villes marocaines les plus jeunes démographiquement. Sa proximité avec Rabat (45 km) et l'Université Ibn Tofaïl créent une population étudiante et active qui suit les tendances olfactives avec attention. La ville sent les eucalyptus de la forêt de la Mamora toute proche et les embruns de l'embouchure du Sebou.</p>`,
    climate: `<p>Kénitra partage le climat océanique de Rabat — doux et humide. L'embouchure du fleuve Sebou crée une humidité particulière qui amplifie légèrement les sillages. Les fragrances sont quasiment sans restriction saisonnière, avec une légère préférence pour les fraîches en été côtier.</p>`,
    popular: 'À Kénitra, les fragrances fraîches et polyvalentes sont très demandées : <a href="/parfums-inspires-dior">Sauvage Dior</a> et <a href="/parfums-inspires-armani">Armani Code</a> sont les best-sellers masculins. <a href="/parfums-inspires-ysl">Black Opium</a> et <a href="/parfums-inspires-carolina-herrera">Good Girl</a> dominent chez les femmes. La jeunesse kenitra apprécient les fragrances modernes et affirmées.',
    faq: [
      ['Livrez-vous à Kénitra Port et Bir Rami ?', 'Oui, nous livrons dans tous les quartiers de Kénitra : Centre, Mimosas, Bettit, Hay Mansour, Bir Rami, Saknia et la zone portuaire. Délai : 24 à 48h.'],
      ['Puis-je payer avec Wafacash à Kénitra ?', 'Oui, nous acceptons Wafacash, CashPlus, Barid Cash, CMI, virement bancaire et cash à la livraison.'],
    ]
  },
  {
    slug: 'tetouan',
    name: 'Tétouan',
    nameAr: 'تطوان',
    region: 'Tanger-Tétouan-Al Hoceïma',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour M\'diq et Martil',
    pop: '380 000',
    zones: 'Centre ville, Médina, Hay Salam, Azla, M\'diq, Martil, Cabo Negro, Fnideq',
    heroDesc: 'La Colombe Blanche — cité andalouse aux portes de la Méditerranée. Livraison en 24-48h.',
    intro: 'Tétouan, surnommée "La Colombe Blanche" pour ses maisons blanches étincelantes, est une cité aux influences andalouses profondes. Sa Médina, classée patrimoine mondial de l\'UNESCO, témoigne d\'un riche héritage culturel hispano-mauresque. La ville et sa côte méditerranéenne — M\'diq, Martil, Cabo Negro — attirent une clientèle aisée. Parfum33ml.ma livre à Tétouan et sa région en 24 à 48h.',
    soul: `<p>Tétouan est la cité andalouse du Maroc — ses maisons blanches aux tuiles vertes, ses ruelles étroites ornées de céramique hispano-mauresque et sa Médina classée UNESCO témoignent d'un héritage unique : les musulmans et juifs expulsés d'Espagne en 1492 ont reconstruit ici leur Grenade perdue. La ville sent la menthe, la fleur d'oranger distillée dans les cuisines et l'humidité douce de sa baie méditerranéenne.</p>
  <p>La proximité de M'diq et Martil — stations balnéaires animées en été — donne à la ville un double visage : cité historique le matin, station estivale l'après-midi. Les habitants de Tétouan valorisent les fragrances fraîches qui s'accordent à leur environnement côtier et montagnard.</p>`,
    moods: `<p><strong>Promenade dans la Médina classée UNESCO :</strong> Des fragrances discrètes et élégantes — <a href="/parfums-inspires-hermes">Terre d'Hermès</a> (minéral, sobre) ou <a href="/parfums-inspires-chloe">Chloé EDP</a> (floral délicat). Des parfums en harmonie avec l'architecture andalouse.</p>
  <p><strong>Plage à M'diq ou Martil en été :</strong> Les fragrances marines s'imposent — <a href="/parfums-inspires-armani">Acqua di Giò</a>, <a href="/parfums-inspires-versace">Dylan Blue</a>, <a href="/parfums-inspires-chanel">Chance Eau Tendre</a>.</p>`,
    climate: `<p>Tétouan bénéficie d'un microclimat méditerranéen humide, renforcé par les montagnes du Rif qui piègent les nuages atlantiques. Les étés sont chauds mais tempérés par la mer (28-33°C), les hivers doux et pluvieux. Ce contexte favorise les fragrances fraîches et marines toute l'année, avec une ouverture vers les boisés chauds en hiver.</p>`,
    popular: 'À Tétouan, les fragrances fraîches méditerranéennes sont très appréciées, en accord avec le cadre naturel exceptionnel : <a href="/parfums-inspires-armani">Acqua di Giò</a> et <a href="/parfums-inspires-versace">Dylan Blue Versace</a> sont les stars masculines. Les femmes de Tétouan et du littoral apprécient <a href="/parfums-inspires-chanel">Chance Eau Tendre</a> et <a href="/parfums-inspires-chloe">Chloé EDP</a>.',
    faq: [
      ['Livrez-vous à M\'diq, Martil et Fnideq depuis Tétouan ?', 'Oui, nous livrons à Tétouan et dans toute sa région côtière : M\'diq, Martil, Cabo Negro et Fnideq. Délai : 24 à 48h.'],
      ['Commandez-vous des parfums pour la saison estivale à Tétouan ?', 'Oui, beaucoup de clients de Tétouan et du littoral commandent des fragrances fraîches pour l\'été. Acqua di Giò, Chance Eau Tendre et Light Blue Dolce & Gabbana sont parfaits pour la saison.'],
    ]
  },
  {
    slug: 'nador',
    name: 'Nador',
    nameAr: 'الناظور',
    region: 'Oriental',
    deliveryTime: '48-72h',
    deliveryExpress: '48h à 72h',
    deliveryStandard: '72h pour Driouch et Berkane',
    pop: '180 000',
    zones: 'Centre ville, Bni Nsar, Zegangan, Selouane, Kariat Arkmane, Taourirt',
    heroDesc: 'Ville côtière du nord-est, à deux pas de Melilla et de la Méditerranée. Livraison en 48-72h.',
    intro: 'Nador, ville côtière de la région de l\'Oriental, est stratégiquement positionnée face à Melilla et sur la mer Méditerranée. La ville est un important carrefour commercial pour toute la province du Rif oriental. Sa population, fortement influencée par les échanges commerciaux avec l\'Espagne et les liens avec la diaspora marocaine en Europe, est très sensible aux tendances occidentales en matière de parfumerie et de mode. Parfum33ml.ma livre à Nador en 48 à 72h.',
    soul: `<p>Nador est une ville de passage et d'échanges — face à Melilla et à quelques kilomètres de la Méditerranée espagnole, elle est l'une des villes marocaines les plus perméables aux tendances européennes. Sa communauté fortement liée à la diaspora en Belgique, en Espagne et en Hollande influence les goûts parfumés vers des références internationales connues.</p>`,
    climate: `<p>Nador bénéficie d'un climat méditerranéen typique — été chaud et sec (32-37°C), hiver doux et légèrement pluvieux (12-18°C). Les fragrances fraîches s'imposent en été, les boisés et orientaux en hiver. La Méditerranée toute proche adoucit les extrêmes.</p>`,
    popular: 'À Nador, les fragrances populaires en Europe sont très recherchées, reflétant les liens forts avec la communauté marocaine à l\'étranger : <a href="/parfums-inspires-dior">Sauvage</a> et <a href="/parfums-inspires-creed">Aventus Creed</a> sont très demandés. Les femmes optent pour <a href="/parfums-inspires-ysl">Libre YSL</a> et <a href="/parfums-inspires-lancome">Idôle Lancôme</a>.',
    faq: [
      ['Livrez-vous à Nador depuis Casablanca ?', 'Oui, nous livrons à Nador via notre réseau national. Le délai est de 48 à 72h. Nous livrons également à Bni Nsar, Zegangan et Selouane.'],
      ['Proposez-vous des prix spéciaux pour les commandes groupées à Nador ?', 'Livraison gratuite dès 3 flacons commandés — c\'est notre meilleure offre. Le prix unitaire reste 100 DH quel que soit la quantité.'],
    ]
  },
  {
    slug: 'el-jadida',
    name: 'El Jadida',
    nameAr: 'الجديدة',
    region: 'Casablanca-Settat',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Azemmour et Sidi Bennour',
    pop: '200 000',
    zones: 'Centre ville, Hay Hassani, Haouzia, Azemmour, Sidi Bouzid, Moulay Abdallah',
    heroDesc: 'Cité portugaise classée UNESCO sur l\'Atlantique — à 1h de Casablanca. Livraison en 24-48h.',
    intro: 'El Jadida, ancienne Mazagan — cité lusitanienne inscrite au patrimoine mondial de l\'UNESCO — est une ville côtière attachante qui combine histoire coloniale, plages atlantiques et gastronomie de qualité. Proche de Casablanca (100 km), El Jadida attire de nombreux habitants de la métropole pour les vacances. Sa population est en constante croissance. Parfum33ml.ma livre à El Jadida en 24 à 48h.',
    soul: `<p>El Jadida est une ville aux deux visages : la cité portugaise classée UNESCO avec sa citerne souterraine aux voûtes gothiques, et la station balnéaire atlantique avec ses plages qui accueillent les Casablancais le week-end. L'air y est chargé d'iode, de sel et d'histoire coloniale lusitanienne — une atmosphère unique au Maroc qui appelle des fragrances à la fois fraîches et chargées de profondeur.</p>`,
    climate: `<p>El Jadida bénéficie du même climat océanique doux qu'Agadir — l'Atlantique tempère les chaleurs. Étés frais (25-30°C), hivers très doux. La forte humidité marine amplifie les sillages — une application légère suffit. Les fragrances marines et fraîches sont idéales toute l'année.</p>`,
    popular: 'À El Jadida, les fragrances fraîches et marines sont très appréciées en raison de la proximité de l\'Atlantique : <a href="/parfums-inspires-armani">Acqua di Giò</a> et <a href="/parfums-inspires-dior">Sauvage</a> sont les best-sellers masculins. <a href="/parfums-inspires-chanel">Chance Eau Tendre</a> et <a href="/parfums-inspires-lancome">La Vie est Belle</a> sont les préférées féminines.',
    faq: [
      ['Livrez-vous à Azemmour et Sidi Bouzid depuis El Jadida ?', 'Oui, nous livrons dans toute la province d\'El Jadida : Centre ville, Haouzia, Azemmour, Moulay Abdallah et Sidi Bennour. Délai : 24 à 48h.'],
      ['Puis-je commander un pack couple pour El Jadida ?', 'Absolument. Notre Pack Couple (2 flacons, 180 DH) est livré à El Jadida en 24 à 48h avec livraison gratuite incluse.'],
    ]
  },
  {
    slug: 'safi',
    name: 'Safi',
    nameAr: 'آسفي',
    region: 'Marrakech-Safi',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Youssoufia et Chemaia',
    pop: '310 000',
    zones: 'Centre ville, Hay Salam, Al Qods, Chaâba, Sidi Bouzid, Lalla Fatna',
    heroDesc: 'La capitale de la poterie marocaine et port de pêche atlantique. Livraison en 24-48h.',
    intro: 'Safi, port atlantique et capitale mondiale reconnue de la poterie marocaine, est une ville au caractère bien affirmé. Ses habitants, entre artisans potiers, pêcheurs et jeunes urbains, apprécient les parfums qui reflètent leur personnalité forte et ancrée. La ville industrielle de Safi — avec son usine OCP et son port — attire également une population de cadres et d\'ingénieurs. Parfum33ml.ma livre à Safi en 24 à 48h.',
    soul: `<p>Safi est une ville de caractère brut — port industriel (OCP), capitale mondiale de la poterie marocaine et cité de pêcheurs qui résistent aux tempêtes atlantiques. L'air y est chargé d'embruns salés et de l'odeur argileuse des ateliers de poterie. Les habitants de Safi ont une personnalité forte et directe, et leurs parfums reflètent cette assurance naturelle.</p>`,
    climate: `<p>Safi jouit d'un climat atlantique tempéré mais venteux — les vents d'ouest peuvent être puissants. L'humidité marine amplifie les sillages. Les fragrances à fort sillage comme Sauvage et Invictus se projettent naturellement dans ce contexte. En hiver, les orientaux chauds apportent une chaleur bienvenue face aux vents froids.</p>`,
    popular: 'À Safi, les fragrances masculines affirmées sont très populaires : <a href="/parfums-inspires-dior">Sauvage</a> et <a href="/parfums-inspires-paco-rabanne">Invictus</a> sont les best-sellers. Les femmes de Safi apprécient <a href="/parfums-inspires-ysl">Black Opium</a> et <a href="/parfums-inspires-carolina-herrera">Good Girl</a> pour leur caractère affirmé.',
    faq: [
      ['Livrez-vous dans tout Safi ?', 'Oui, nous livrons dans tous les quartiers de Safi : Centre, Hay Salam, Al Qods, Chaâba et les quartiers industriels. Délai : 24 à 48h.'],
      ['Comment commander à Safi ?', 'Envoyez votre liste via WhatsApp avec votre adresse à Safi. Nous expédions après confirmation. Cash à la livraison disponible.'],
    ]
  },
  {
    slug: 'beni-mellal',
    name: 'Béni Mellal',
    nameAr: 'بني ملال',
    region: 'Béni Mellal-Khénifra',
    deliveryTime: '48-72h',
    deliveryExpress: '48h à 72h',
    deliveryStandard: '72h pour Khouribga et Fquih Ben Salah',
    pop: '190 000',
    zones: 'Centre ville, Ain Asserdoun, Ismailia, Hay Wiam, Hay Al Massira, Tabriquet',
    heroDesc: 'La capitale de la région de Béni Mellal-Khénifra, au pied du Moyen Atlas. Livraison en 48-72h.',
    intro: 'Béni Mellal, capitale de la région de Béni Mellal-Khénifra et porte du Moyen Atlas, est une ville en forte croissance économique. Située au carrefour des routes entre Casablanca, Marrakech et Fès, elle joue un rôle commercial central pour toute la région. La source d\'Ain Asserdoun, le joyau naturel de la ville, attire les visiteurs. Sa population jeune et connectée est de plus en plus attentive aux grandes marques de parfumerie. Parfum33ml.ma livre à Béni Mellal en 48 à 72h.',
    soul: `<p>Béni Mellal est la porte du Moyen Atlas — entre les plaines agricoles du Tadla et les premières forêts de cèdres de la montagne. La source d'Ain Asserdoun, jaillissant au cœur de la ville, crée une fraîcheur végétale unique. Ville carrefour entre Casablanca, Marrakech et Fès, Béni Mellal est en pleine modernisation et sa jeune population est très connectée aux tendances nationales.</p>`,
    climate: `<p>Béni Mellal a un climat continental modéré par l'altitude — moins extrême qu'Oujda ou Fès. Étés chauds (35-38°C), hivers frais (5-12°C). Les orientaux s'épanouissent bien en automne-hiver. En été, les fragrances fraîches sont préférables. La proximité de la montagne crée des variations thermiques qui valorisent les fragrances polyvalentes comme Sauvage ou Bleu de Chanel.</p>`,
    popular: 'À Béni Mellal, les parfums à bon rapport qualité-prix et à fort sillage sont très recherchés : <a href="/parfums-inspires-dior">Sauvage</a> et <a href="/parfums-inspires-paco-rabanne">1 Million</a> sont les leaders masculins. <a href="/parfums-inspires-lancome">La Vie est Belle</a> et <a href="/parfums-inspires-ysl">Black Opium</a> dominent chez les femmes.',
    faq: [
      ['Livrez-vous à Fquih Ben Salah et Khouribga depuis Béni Mellal ?', 'Oui, nous livrons dans toute la région de Béni Mellal-Khénifra incluant Khouribga, Fquih Ben Salah et Azilal. Délai : 48 à 72h.'],
      ['La livraison gratuite est-elle disponible à Béni Mellal ?', 'Oui, livraison gratuite dès 3 flacons commandés, partout au Maroc incluant Béni Mellal.'],
    ]
  },
  {
    slug: 'settat',
    name: 'Settat',
    nameAr: 'سطات',
    region: 'Casablanca-Settat',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Berrechid et Benslimane',
    pop: '130 000',
    zones: 'Centre ville, Hay Salam, Zouagha, Douar Al Filala, El Amal, Hay Al Massira',
    heroDesc: 'Capitale de la région Casablanca-Settat, ville agricole et universitaire. Livraison en 24-48h.',
    intro: 'Settat, capitale de la région de Casablanca-Settat, est une ville à vocation agricole et universitaire en pleine modernisation. À seulement 60 km de Casablanca, elle bénéficie d\'une excellente connectivité et d\'un tissu économique diversifié. L\'Université Hassan Ier attire des milliers d\'étudiants. Parfum33ml.ma livre à Settat en 24 à 48h, et dans toute la province (Berrechid, Benslimane).',
    soul: `<p>Settat est une ville en transformation — à 60 km de Casablanca, elle accueille de plus en plus de familles qui quittent la métropole pour un cadre de vie plus calme. L'Université Hassan Ier lui donne une énergie estudiantine. Ville agricole historique (blé, betterave sucrière), elle sent la terre humide après la pluie et les champs de céréales en été.</p>`,
    climate: `<p>Settat bénéficie d'un climat intermédiaire entre le maritime de Casablanca et le continental de l'intérieur. Étés chauds (32-37°C), hivers frais (8-14°C). Les fragrances polyvalentes comme Sauvage ou Bleu de Chanel fonctionnent toute l'année. En hiver, les orientaux comme Layton s'expriment bien dans le froid sec du plateau.</p>`,
    popular: 'À Settat, les fragrances accessibles et polyvalentes sont très demandées : <a href="/parfums-inspires-dior">Sauvage</a> et <a href="/parfums-inspires-armani">Armani Code</a> sont populaires chez les étudiants et jeunes actifs. <a href="/parfums-inspires-carolina-herrera">Good Girl</a> et <a href="/parfums-inspires-chanel">Chance Eau Tendre</a> dominent chez les femmes.',
    faq: [
      ['Livrez-vous à Berrechid et Benslimane depuis Settat ?', 'Oui, nous livrons dans toute la province de Settat : Berrechid, Benslimane, El Gara et Sidi Rahal. Délai : 24 à 48h.'],
      ['Comment payer à Settat ?', 'Cash à la livraison, CashPlus, Wafacash, Barid Cash ou virement bancaire — au choix.'],
    ]
  },
  {
    slug: 'larache',
    name: 'Larache',
    nameAr: 'العرائش',
    region: 'Tanger-Tétouan-Al Hoceïma',
    deliveryTime: '24-48h',
    deliveryExpress: '24h à 48h',
    deliveryStandard: '48h pour Asilah et Ksar El Kébir',
    pop: '130 000',
    zones: 'Centre ville, Hay Al Amal, Khmiss, Rmel, Laaouama, Mesnana',
    heroDesc: 'Ville côtière du nord atlantique au charme hispano-marocain. Livraison en 24-48h.',
    intro: 'Larache, cité côtière aux influences espagnoles marquées, est nichée à l\'embouchure du Loukkos sur l\'Atlantique. Ancienne ville coloniale espagnole, Larache conserve une architecture unique avec ses boulevards, ses cafés et ses balcons fleuris. La ville est également réputée pour ses plages et son marché de poissons. Sa population attachée à son identité culturelle particulière apprécie les fragrances qui reflètent cette dualité. Parfum33ml.ma livre à Larache en 24 à 48h.',
    soul: `<p>Larache est une petite ville atlantique au charme hispano-marocain intact — ses façades ocre et turquoise, ses balcons fleuris et ses larges avenues rappellent Séville plus que Rabat. À l'embouchure du Loukkos, l'air y sent le sel, les algues échouées et les fleurs des jardins andalous. C'est l'une des villes marocaines les plus photogéniques et les moins touristiques — un secret bien gardé.</p>`,
    climate: `<p>Larache bénéficie d'un climat atlantique frais et humide — similaire à Tanger mais moins venteux. L'humidité marine crée un contexte favorable aux fragrances fraîches et marines toute l'année. En hiver (novembre-mars), le froid humide valorise les fragrances boisées et épicées comme Sauvage ou Bleu de Chanel.</p>`,
    popular: 'À Larache, les fragrances fraîches méditerranéennes et les classiques internationaux sont très appréciés : <a href="/parfums-inspires-armani">Acqua di Giò</a> et <a href="/parfums-inspires-dior">Sauvage</a> sont les préférés masculins. <a href="/parfums-inspires-chanel">Coco Mademoiselle</a> et <a href="/parfums-inspires-lancome">La Vie est Belle</a> dominent chez les femmes larachies.',
    faq: [
      ['Livrez-vous à Asilah et Ksar El Kébir depuis Larache ?', 'Oui, nous livrons dans toute la province de Larache : Asilah, Ksar El Kébir et les zones rurales environnantes. Délai : 24 à 48h.'],
      ['Y a-t-il un minimum de commande à Larache ?', 'Aucun minimum. Vous pouvez commander un seul flacon à 100 DH. Les frais de livraison sont de 15 DH (gratuits dès 3 flacons).'],
    ]
  },
];

function head(city) {
  const title = `Parfum ${city.name} — Fragrances Inspirées 33ml à 100 DH | Parfum33ml.ma`;
  const desc = `Commandez vos parfums inspirés à ${city.name} et recevez-les en ${city.deliveryTime}. +100 fragrances Chanel, Dior, YSL, Armani, Paco Rabanne en 33ml à 100 DH. Livraison dans tout ${city.name}.`;
  const canonical = `${CANON}/${city.slug}`;
  const schema1 = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Parfum33ml.ma',
    url: CANON,
    description: desc,
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '100 DH',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash, CashPlus, Wafacash, Barid Cash, Virement',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['French', 'Arabic'] },
    address: { '@type': 'PostalAddress', addressCountry: 'MA', addressLocality: city.name, addressRegion: city.region }
  });
  const schema2 = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: CANON },
      { '@type': 'ListItem', position: 2, name: `Parfum ${city.name}`, item: canonical }
    ]
  });
  const schema3 = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  });

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
<meta name="geo.region" content="MA">
<meta name="geo.placename" content="${city.name}">
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
<script type="application/ld+json">${schema1}</script>
<script type="application/ld+json">${schema2}</script>
<script type="application/ld+json">${schema3}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static.css">
</head>
<body>`;
}

function genCityPage(city) {
  const faqHtml = city.faq.map(([q, a]) => `  <div style="margin-bottom:20px">
    <p><strong>Q : ${q}</strong></p>
    <p style="margin-top:6px">${a}</p>
  </div>`).join('\n');

  const soulSection = city.soul ? `
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>L'âme olfactive de ${city.name}</h2>
  ${city.soul}
</div>
` : '';

  const moodsSection = city.moods ? `
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Choisir son parfum selon l'humeur et le moment à ${city.name}</h2>
  ${city.moods}
</div>
` : '';

  const climateSection = city.climate ? `
<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Climat de ${city.name} et choix de parfum</h2>
  ${city.climate}
</div>
` : '';

  return `${head(city)}
${NAV}

<div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><span>Parfum ${city.name}</span></div>

<div class="city-hero">
  <span class="article-tag">🏙️ ${city.name}</span>
  <h1>Parfum <em>${city.name}</em> — Livraison ${city.deliveryTime}</h1>
  <p>${city.heroDesc}</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener">💬 Commander maintenant →</a>
</div>

<div class="static-content" style="max-width:1100px">

<div class="static-section">
  <h2>Livraison parfum à ${city.name}</h2>
  <div class="delivery-grid">
    <div class="delivery-card">
      <div class="delivery-icon">⚡</div>
      <div class="delivery-title">Livraison express</div>
      <div class="delivery-desc">${city.deliveryExpress} à ${city.name}</div>
    </div>
    <div class="delivery-card">
      <div class="delivery-icon">📦</div>
      <div class="delivery-title">Couverture totale</div>
      <div class="delivery-desc">${city.deliveryStandard}</div>
    </div>
    <div class="delivery-card">
      <div class="delivery-icon">💰</div>
      <div class="delivery-title">Frais de livraison</div>
      <div class="delivery-desc">15 DH — Gratuite dès 3 flacons commandés</div>
    </div>
    <div class="delivery-card">
      <div class="delivery-icon">💬</div>
      <div class="delivery-title">Commande WhatsApp</div>
      <div class="delivery-desc">Réponse en quelques minutes 7j/7</div>
    </div>
  </div>
</div>

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Parfums inspirés livrés à ${city.name}</h2>
  <p>${city.intro}</p>
  <p style="margin-top:16px">Nos <strong>+100 fragrances</strong> couvrent toutes les grandes maisons de parfumerie — Chanel, Dior, YSL, Armani, Paco Rabanne, Lancôme, Mugler, Hermès, Creed, Parfums de Marly et bien d'autres. Chaque fragrance est disponible en <strong>format 33ml à 100 DH</strong>, livré à ${city.name} en ${city.deliveryTime}.</p>
  <p style="margin-top:12px">Quartiers desservis : <strong>${city.zones}</strong>.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px">
    <a href="/parfums-femme" class="btn-p">Parfums Femme →</a>
    <a href="/parfums-homme" class="btn-o">Parfums Homme →</a>
  </div>
</div>

${soulSection}

${moodsSection}

${climateSection}

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Fragrances populaires à ${city.name}</h2>
  <p>${city.popular}</p>
  <p style="margin-top:14px">Vous hésitez entre plusieurs fragrances ? Notre équipe WhatsApp vous guide en quelques minutes selon vos préférences (famille olfactive, occasion, saison) pour trouver le parfum idéal à commander depuis ${city.name}.</p>
  <div style="margin-top:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
    <a href="/parfums-inspires-dior" class="delivery-card" style="text-decoration:none;display:block;cursor:pointer">
      <div class="delivery-title">Inspirés Dior</div>
      <div class="delivery-desc">Sauvage, J'adore, Miss Dior…</div>
    </a>
    <a href="/parfums-inspires-chanel" class="delivery-card" style="text-decoration:none;display:block;cursor:pointer">
      <div class="delivery-title">Inspirés Chanel</div>
      <div class="delivery-desc">N°5, Coco Mademoiselle, Bleu…</div>
    </a>
    <a href="/parfums-inspires-ysl" class="delivery-card" style="text-decoration:none;display:block;cursor:pointer">
      <div class="delivery-title">Inspirés YSL</div>
      <div class="delivery-desc">Black Opium, Libre, L'Homme…</div>
    </a>
    <a href="/parfums-inspires-parfums-de-marly" class="delivery-card" style="text-decoration:none;display:block;cursor:pointer">
      <div class="delivery-title">Parfums de Marly</div>
      <div class="delivery-desc">Layton, Delina, Pegasus…</div>
    </a>
  </div>
</div>

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Comment commander à ${city.name} ?</h2>
  <p><strong>1.</strong> Parcourez notre catalogue de +100 fragrances femme et homme et sélectionnez vos préférées.</p>
  <p><strong>2.</strong> Envoyez votre sélection par WhatsApp — liste de parfums, nom et adresse complète à ${city.name}.</p>
  <p><strong>3.</strong> Nous confirmons la disponibilité et expédions. Livraison en ${city.deliveryTime} à ${city.name} après confirmation.</p>
  <p style="margin-top:14px"><strong>Modes de paiement acceptés :</strong> Cash à la livraison · CashPlus · Wafacash · Barid Cash · CMI · Virement bancaire.</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener" style="margin-top:16px;display:inline-block">💬 Commander via WhatsApp →</a>
</div>

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>Coffrets et packs livrés à ${city.name}</h2>
  <p>En plus des flacons individuels à 100 DH, nous proposons des coffrets cadeaux parfaits pour les occasions spéciales — anniversaires, mariages, Aïd, fêtes des mères :</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:16px">
    <a href="/coffrets/pack-couple" class="delivery-card" style="text-decoration:none;display:block">
      <div class="delivery-icon">💑</div>
      <div class="delivery-title">Pack Couple</div>
      <div class="delivery-desc">2 flacons · 180 DH · Livraison gratuite</div>
    </a>
    <a href="/coffrets/pack-decouverte" class="delivery-card" style="text-decoration:none;display:block">
      <div class="delivery-icon">🎁</div>
      <div class="delivery-title">Pack Découverte</div>
      <div class="delivery-desc">5 flacons · 450 DH · Livraison gratuite</div>
    </a>
    <a href="/coffrets/pack-collection" class="delivery-card" style="text-decoration:none;display:block">
      <div class="delivery-icon">👑</div>
      <div class="delivery-title">Pack Collection</div>
      <div class="delivery-desc">10 flacons · 800 DH · Livraison gratuite</div>
    </a>
  </div>
</div>

<div class="static-section" style="border-top:1px solid var(--border);padding-top:32px">
  <h2>FAQ — Livraison parfum à ${city.name}</h2>
  <p><strong>Q : Livraison à domicile ou en point relais à ${city.name} ?</strong></p>
  <p style="margin-top:6px">Nous livrons exclusivement à domicile à ${city.name} — directement à votre adresse. Pas de point relais, pas de déplacement de votre part.</p>
${faqHtml}
  <div style="margin-top:6px">
    <p><strong>Q : Quelle est votre politique de retour à ${city.name} ?</strong></p>
    <p style="margin-top:6px">En cas de problème avec votre commande (colis endommagé, mauvais produit), nous procédons à un renvoi sans frais supplémentaires. Contactez-nous dans les 24h via WhatsApp.</p>
  </div>
</div>

<div class="article-cta">
  <h3 style="font-family:var(--ff-d);font-size:22px;margin-bottom:8px">Commandez vos parfums à ${city.name}</h3>
  <p style="color:var(--txt2);font-size:14px;margin-bottom:16px">+100 fragrances disponibles · 33ml à 100 DH · Livraison ${city.deliveryTime} à ${city.name}</p>
  <a href="${WA}" class="btn-p" target="_blank" rel="noopener">💬 Commander sur WhatsApp →</a>
</div>

</div>

${FOOTER}
</body>
</html>`;
}

let count = 0;
CITIES.forEach(city => {
  const html = genCityPage(city);
  const filePath = path.join(BASE, `${city.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${city.slug}.html`);
  count++;
});
console.log(`\n✅ ${count} city pages generated.`);
