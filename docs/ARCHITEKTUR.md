# Technische Architektur — handwerker.vision

> Letzte Aktualisierung: Februar 2026

---

## Inhaltsverzeichnis

1. [Architektur-Uebersicht](#1-architektur-uebersicht)
2. [Tech-Stack](#2-tech-stack)
3. [Dateistruktur](#3-dateistruktur)
4. [Design-System](#4-design-system)
5. [JavaScript-Module](#5-javascript-module)
6. [Formular & Webhook-Integration](#6-formular--webhook-integration)
7. [SEO-Implementierung](#7-seo-implementierung)
8. [Performance](#8-performance)
9. [Responsive Design](#9-responsive-design)
10. [Deployment](#10-deployment)

---

## 1. Architektur-Uebersicht

handwerker.vision ist ein statischer **Onepager** ohne Build-Prozess, Framework oder Abhaengigkeiten. Die gesamte Website besteht aus reinem HTML, CSS und Vanilla JavaScript.

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
├─────────────────────────────────────────────────┤
│  index.html (Onepager)                          │
│  ├── css/style.css (Design-System)              │
│  ├── js/main.js (Cursor, FAQ, Scroll)           │
│  ├── js/navigation.js (Nav, Mobile Menu)        │
│  ├── js/animations.js (Scroll-Reveal)           │
│  ├── js/counter.js (Stats-Animation)            │
│  ├── js/forms.js (Webhook-Integration)          │
│  └── js/pricing-toggle.js (Billing-Switch)      │
├─────────────────────────────────────────────────┤
│  n8n Webhook (Backend)                          │
│  └── https://n8n.handwerker.vision/webhook/...  │
├─────────────────────────────────────────────────┤
│  Stripe (Zahlungen)                             │
│  └── Checkout-Links fuer 3 Pakete               │
└─────────────────────────────────────────────────┘
```

### Designentscheidungen

| Entscheidung | Begruendung |
|---|---|
| Kein Framework | Maximale Performance, keine Abhaengigkeiten, einfaches Hosting |
| Onepager | Handwerker scrollen lieber als zu navigieren; alle Infos auf einer Seite |
| Vanilla JS | Kein Overhead, schnelle Ladezeit, volle Kontrolle |
| Externes CSS | Caching-Vorteil, saubere Trennung, einfache Wartung |
| n8n als Backend | No-Code-Automatisierung, Webhooks, E-Mail-Workflows |

---

## 2. Tech-Stack

| Schicht | Technologie | Version/Details |
|---|---|---|
| **Markup** | HTML5 | Semantische Elemente (section, nav, footer, article) |
| **Styling** | CSS3 | Custom Properties, Grid, Flexbox, kein Preprocessor |
| **Interaktion** | Vanilla JavaScript | ES5-kompatibel, kein Transpiler noetig |
| **Fonts** | Google Fonts | Bebas Neue, Space Mono, DM Sans |
| **Backend** | n8n | Self-hosted, Webhook-Automatisierung |
| **Zahlungen** | Stripe | Checkout-Links, Abo-Modell |
| **Hosting** | GitHub Pages | Statisches Hosting, Custom Domain |
| **DNS** | Custom | handwerker.vision → GitHub Pages |
| **SEO** | Schema.org JSON-LD | LocalBusiness + FAQPage |
| **Analytics** | Google Analytics 4 | Geplant |

---

## 3. Dateistruktur

```
handwerker.vision/
├── index.html              # Onepager (Hauptseite, ~620 Zeilen)
├── impressum.html          # Impressum (noindex)
├── datenschutz.html        # Datenschutzerklaerung (noindex)
├── 404.html                # Fehlerseite (noindex)
├── robots.txt              # Crawler-Anweisungen
├── sitemap.xml             # XML-Sitemap (3 URLs)
├── .nojekyll               # GitHub Pages: Jekyll deaktivieren
├── .gitignore              # Git-Ausschluesse
├── css/
│   └── style.css           # Einheitliches Design-System (~1500 Zeilen)
├── js/
│   ├── main.js             # Cursor, FAQ-Accordion, Smooth Scroll
│   ├── navigation.js       # Sticky Nav, Hamburger-Menu, Scroll-Effekt
│   ├── animations.js       # IntersectionObserver Scroll-Reveal
│   ├── counter.js          # Animierte Zaehler (Stats-Sektion)
│   ├── forms.js            # n8n Webhook-Integration + Spam-Schutz
│   └── pricing-toggle.js   # Monatlich/Jaehrlich-Umschalter
├── docs/
│   ├── SEO-STRATEGIE.md    # SEO-Strategie (Google Seite 1)
│   └── ARCHITEKTUR.md      # Diese Datei
└── README.md               # Projekt-Dokumentation
```

### Geloeschte Dateien (alter Multi-Page-Aufbau)

Diese Dateien wurden beim Rebuild entfernt:

| Datei | Grund |
|---|---|
| `kontakt.html` | In Onepager integriert (#kontakt) |
| `leistungen.html` | In Onepager integriert (#leistungen) |
| `pakete.html` | In Onepager integriert (#preise) |
| `referenzen.html` | In Onepager integriert (#referenzen) |
| `css/variables.css` | Ersetzt durch css/style.css |
| `css/reset.css` | Ersetzt durch css/style.css |
| `css/base.css` | Ersetzt durch css/style.css |
| `css/layout.css` | Ersetzt durch css/style.css |
| `css/components.css` | Ersetzt durch css/style.css |
| `css/animations.css` | Ersetzt durch css/style.css |
| `css/responsive.css` | Ersetzt durch css/style.css |

---

## 4. Design-System

### CSS Custom Properties (Design-Tokens)

```css
:root {
  /* Farben */
  --black: #0D0F14;          /* Hintergrund */
  --white: #fff;              /* Primaertext */
  --blue: #2463EB;            /* Akzent, CTAs, Links */
  --red: #E8472A;             /* Urgency, Alerts */
  --muted: rgba(255,255,255,0.35);  /* Sekundaertext */
  --line: rgba(255,255,255,0.1);    /* Trennlinien */
  --card: rgba(255,255,255,0.03);   /* Karten-Hintergrund */

  /* Typografie */
  --display: 'Bebas Neue', cursive;   /* Headlines */
  --mono: 'Space Mono', monospace;    /* Labels, Nav, Features */
  --body: 'DM Sans', sans-serif;      /* Fliesstext */
}
```

### Typografie-Hierarchie

| Element | Font | Groesse (Desktop) | Verwendung |
|---|---|---|---|
| H1 (Hero) | Bebas Neue | 5-7rem | Einmalig, Hero-Headline |
| H2 (Sektionen) | Bebas Neue | 3-4rem | Sektions-Ueberschriften |
| Eyebrow | Space Mono | 0.65rem, uppercase | Sektions-Labels ("01 — LEISTUNGEN") |
| Body | DM Sans | 1rem | Fliesstext, Beschreibungen |
| Labels | Space Mono | 0.75rem | Feature-Titel, Nav-Links |
| Preise | Bebas Neue | 4rem | Preisanzeige (159, 299, 499) |

### Design-Prinzipien

1. **Kein border-radius** — 0px ueberall (brutalistisch)
2. **1px-Linien** als primaere Strukturelemente
3. **Grosszuegiger Weissraum** — Sektionen mit 120px+ Padding
4. **Uebergrosse Typografie** — Headlines dominieren die Viewport-Breite
5. **Dark Theme** durchgehend — #0D0F14 als Basis
6. **Blau als Akzentfarbe** — #2463EB fuer CTAs, Links, Highlights
7. **Rot fuer Urgency** — #E8472A nur fuer Alert-Bar und Probleme

### Komponenten-Uebersicht

| Komponente | CSS-Klasse | Beschreibung |
|---|---|---|
| Primaer-Button | `.btn-lime` | Blauer Hintergrund, weisser Text |
| Sekundaer-Button | `.btn-outline` | 1px weisser Rand, transparent |
| Nav-Button | `.btn-nav` | Kompakter CTA in Navigation |
| Feature-Card | `.feature-card` | Bordered Box mit Icon + Titel + Text |
| Pricing-Card | `.pricing-card` | Paket-Karte mit Preis und Features |
| Alert-Bar | `.hero-alert` | Roter Streifen unter Hero |
| Section-Eyebrow | `.section-eyebrow` | Monospace-Label ueber Sektionen |
| Pricing-Toggle | `.pricing-toggle` | Monatlich/Jaehrlich Umschalter |
| Pricing-Badge | `.pricing-badge` | "Beliebteste Wahl" Label |
| Pricing-Promo | `.pricing-promo` | Setup-Kosten Banner |

---

## 5. JavaScript-Module

### main.js — Kern-Funktionalitaet

| Funktion | Beschreibung |
|---|---|
| Custom Cursor | Blaue Kreise folgen der Maus (Desktop only) |
| FAQ Accordion | Click-to-expand mit `.active` Toggle |
| Smooth Scroll | Sanftes Scrollen zu Anker-Links |

### navigation.js — Navigation

| Funktion | Beschreibung |
|---|---|
| Sticky Nav | Feste Navigation am oberen Rand |
| Scroll-Effekt | Nav-Hintergrund aendert sich beim Scrollen |
| Hamburger-Menu | Mobile Menu oeffnen/schliessen |
| Active Link | Aktiver Nav-Link basierend auf Scroll-Position |

### animations.js — Scroll-Reveal

| Funktion | Beschreibung |
|---|---|
| IntersectionObserver | Beobachtet `.reveal`-Elemente |
| Sichtbarkeit | Fuegt `.visible` hinzu wenn Element im Viewport |
| Threshold | 10% des Elements muss sichtbar sein |

```javascript
// Vereinfachtes Schema
Observer.observe('.reveal') → Element enters viewport → add '.visible'
```

### counter.js — Zaehler-Animation

| Funktion | Beschreibung |
|---|---|
| Animierte Zaehler | Zaehlt von 0 bis `data-target` Wert |
| Trigger | Startet wenn Stats-Sektion sichtbar wird |
| Dauer | ~2 Sekunden pro Zaehler |
| Format | Ganzzahlen mit optionalem Suffix (+, %, s) |

### forms.js — Webhook-Integration

| Funktion | Beschreibung |
|---|---|
| Webhook-Submit | Sendet Formulardaten an n8n |
| Honeypot | Verstecktes Feld fuer Bot-Erkennung |
| Timestamp | Mindestens 3s zwischen Laden und Absenden |
| Feedback | Erfolgs-/Fehlermeldung nach Submit |
| DSGVO | Checkbox-Validierung vor Submit |

### pricing-toggle.js — Preisumschalter

| Funktion | Beschreibung |
|---|---|
| Billing-Switch | Wechselt zwischen monatlicher und jaehrlicher Anzeige |
| Preis-Update | Berechnet Monatspreis aus Jahrespreis |
| Perioden-Text | Aktualisiert "/ Monat" bzw. "/ Monat · jaehrlich X €/Jahr" |
| Data-Attribute | Liest `data-monthly` und `data-annual` von Pricing-Cards |

---

## 6. Formular & Webhook-Integration

### Formular-Felder (Website-Check)

```
┌──────────────────────────────────────┐
│  Name*            [________________] │
│  E-Mail*          [________________] │
│  Website-URL*     [________________] │
│  Herausforderung  [▼ Dropdown_____] │
│  ☐ DSGVO-Einwilligung*              │
│                                      │
│  [→ Website kostenlos prüfen lassen] │
│  (Honeypot: hidden field)            │
│  (Timestamp: hidden, auto-set)       │
└──────────────────────────────────────┘
```

### Dropdown-Optionen (Herausforderung)

1. Keine Website vorhanden
2. Website veraltet
3. Zu wenig Kundenanfragen
4. Keine Zeit fuer Online-Marketing
5. Sonstiges

### Webhook-Flow

```
Browser                    n8n                         E-Mail
  │                         │                            │
  │  POST /webhook/lead     │                            │
  │ ───────────────────────>│                            │
  │  {name, email, url,     │                            │
  │   challenge, timestamp} │                            │
  │                         │  Validierung               │
  │                         │  + Lead-Scoring            │
  │                         │                            │
  │                         │  Benachrichtigung ─────────>│
  │                         │  an kontakt@handwerker.vision
  │                         │                            │
  │                         │  Auto-Reply ──────────────>│
  │                         │  an Absender (Danke-Mail)  │
  │                         │                            │
  │  200 OK + Danke-Msg     │                            │
  │ <───────────────────────│                            │
```

### Spam-Schutz

| Methode | Implementierung |
|---|---|
| Honeypot | Unsichtbares `<input name="website2">` — wenn ausgefuellt = Bot |
| Timestamp | `Date.now()` beim Laden gespeichert; Differenz < 3s = Bot |
| DSGVO-Checkbox | Muss aktiv angehakt werden |
| Kein CAPTCHA | Bessere UX, Honeypot + Timestamp reichen fuer Spam-Level |

---

## 7. SEO-Implementierung

### Schema.org JSON-LD

Zwei strukturierte Daten-Bloecke im `<head>`:

#### LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "handwerker.vision",
  "description": "Professionelle Websites fuer Handwerksbetriebe...",
  "url": "https://handwerker.vision",
  "telephone": "+4976159414747",
  "email": "kontakt@handwerker.vision",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freiburg im Breisgau",
    "addressRegion": "Baden-Wuerttemberg",
    "addressCountry": "DE"
  },
  "areaServed": ["Freiburg im Breisgau", "Loerrach", "Basel"],
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$"
}
```

#### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet eine Handwerker-Website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ab 159 EUR/Monat..."
      }
    }
    // ... 5 weitere Fragen
  ]
}
```

### Meta-Tags

| Tag | Inhalt |
|---|---|
| `<title>` | Handwerker Website erstellen lassen · handwerker.vision |
| `<meta description>` | Professionelle Websites fuer Handwerksbetriebe... |
| `<link canonical>` | https://handwerker.vision/ |
| `<meta og:title>` | Handwerker Website erstellen... |
| `<meta og:image>` | /img/og-image.png (1200x630) |
| `<meta twitter:card>` | summary_large_image |

### Heading-Hierarchie

```
H1: Websites fuer Handwerker, die Auftraege sichern.    (1x, Hero)
  H2: Leistungen                                          (Sektion)
  H2: So laeuft's ab                                      (Sektion)
  H2: Unsere Pakete                                       (Sektion)
  H2: Erfolgsgeschichten                                   (Sektion)
  H2: Haeufige Fragen                                     (Sektion)
  H2: Website-Check                                        (Sektion)
  H2: Ihr naechster Schritt                                (Sektion)
```

---

## 8. Performance

### Aktuelle Architektur

| Aspekt | Wert | Optimierung |
|---|---|---|
| HTML | ~620 Zeilen | Semantisch, kein Bloat |
| CSS | ~1500 Zeilen | Einzige Datei, cacheable |
| JS | 6 Dateien | Modular, ES5-kompatibel |
| Fonts | 3 Google Fonts | Preconnect + font-display: swap |
| Bilder | Keine (reines Text-Design) | Kein Bildlade-Overhead |
| Externe Ressourcen | Google Fonts, n8n Webhook | Minimal |

### Empfohlene Optimierungen

| Massnahme | Impact | Aufwand |
|---|---|---|
| `defer` auf alle `<script>`-Tags | Hoch | Niedrig |
| CSS minifizieren (Build) | Niedrig | Niedrig |
| JS minifizieren + bundlen | Niedrig | Mittel |
| Google Fonts lokal hosten | Mittel | Mittel |
| Service Worker (Offline) | Niedrig | Hoch |

---

## 9. Responsive Design

### Breakpoints

| Breakpoint | Bezeichnung | Aenderungen |
|---|---|---|
| > 1200px | Desktop | Volle Layouts, 2-3 Spalten |
| 960px | Tablet | 2 Spalten, angepasste Schriftgroessen |
| 768px | Tablet (klein) | Hamburger-Menu aktiv |
| 600px | Mobile | 1 Spalte, gestapelte Layouts |
| 400px | Mobile (klein) | Minimale Paddings, kompakte Typografie |

### Responsive Verhalten

| Komponente | Desktop | Mobile |
|---|---|---|
| Navigation | Horizontale Links | Hamburger + Overlay |
| Feature-Grid | 2x3 | 1x6 (gestapelt) |
| Pricing-Grid | 3 nebeneinander | 1x3 (gestapelt) |
| Hero-Headline | 5-7rem | 2.5-3rem |
| Stats-Grid | 4 nebeneinander | 2x2 |
| Prozess-Grid | 4 nebeneinander | 1x4 |

---

## 10. Deployment

### GitHub Pages

```bash
# Repository
git remote -v
# origin  git@github.com:regmetisweb-png/handwerker.vision.git

# Deployment-Branch
main

# Custom Domain
handwerker.vision (CNAME konfiguriert)
```

### Deployment-Prozess

```
1. Aenderungen lokal testen (python -m http.server 8080)
2. git add + git commit
3. git push origin main
4. GitHub Pages baut automatisch (kein Build noetig)
5. Live unter https://handwerker.vision
```

### DNS-Konfiguration

| Record | Typ | Wert |
|---|---|---|
| handwerker.vision | A | 185.199.108.153 (GitHub Pages) |
| handwerker.vision | A | 185.199.109.153 |
| handwerker.vision | A | 185.199.110.153 |
| handwerker.vision | A | 185.199.111.153 |
| www.handwerker.vision | CNAME | regmetisweb-png.github.io |

### HTTPS

- Automatisch durch GitHub Pages (Let's Encrypt)
- HSTS aktiviert
- Enforce HTTPS in Repository-Settings
