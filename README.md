# handwerker.vision

**Professionelle Websites fuer Handwerksbetriebe** — Onepager mit automatisierter Kundengewinnung.

> Betrieben von [METISWEB VISION](https://metisweb.vision) · Freiburg im Breisgau

---

## Uebersicht

handwerker.vision ist eine spezialisierte Landingpage fuer Handwerksbetriebe in der Region Freiburg, Loerrach und Basel. Die Website dient als digitales Buero: automatische Anfragenbearbeitung, Terminbuchung und Kundenkommunikation — rund um die Uhr.

### Kernfunktionen

- **Website-Check** — Kostenloses Analyse-Tool fuer bestehende Handwerker-Websites
- **Automatisierte Anfragen** — n8n-Webhook-Integration fuer Lead-Verarbeitung
- **FAQ-Assistent** — KI-gestuetzte Beantwortung haeufiger Kundenfragen
- **Terminbuchung** — Kalender-Integration fuer 24/7-Buchungen
- **Drei Pakete** — Fundament (159 EUR/Mo), Faehigkeiten (299 EUR/Mo), Wachstum (499 EUR/Mo)

---

## Tech-Stack

| Komponente | Technologie |
|---|---|
| Frontend | Vanilla HTML5 + CSS3 + JavaScript (kein Framework) |
| Fonts | Bebas Neue (Display), Space Mono (Monospace), DM Sans (Body) |
| Design | Dark Theme (#0D0F14), Hybrid: Premium-Minimalismus + Brutalistische Akzente |
| Backend | n8n (Webhook-Automatisierung) |
| Hosting | GitHub Pages / Custom Hosting |
| Zahlungen | Stripe (Abo-Modell) |
| SEO | Schema.org (LocalBusiness + FAQPage), Canonical, OG/Twitter Cards |

---

## Projektstruktur

```
handwerker.vision/
├── index.html              # Onepager (Hauptseite)
├── impressum.html          # Impressum (noindex)
├── datenschutz.html        # Datenschutzerklaerung (noindex)
├── 404.html                # Fehlerseite (noindex)
├── robots.txt              # Crawler-Anweisungen
├── sitemap.xml             # XML-Sitemap (3 URLs)
├── css/
│   └── style.css           # Einheitliches Design-System (~1500 Zeilen)
├── js/
│   ├── main.js             # Cursor, FAQ-Accordion, Smooth Scroll
│   ├── navigation.js       # Sticky Nav, Hamburger-Menu, Scroll-Effekt
│   ├── animations.js       # IntersectionObserver Scroll-Reveal
│   ├── counter.js           # Animierte Zaehler (Stats-Sektion)
│   ├── forms.js            # n8n Webhook-Integration + Spam-Schutz
│   └── pricing-toggle.js   # Monatlich/Jaehrlich-Umschalter
├── docs/
│   ├── SEO-STRATEGIE.md    # SEO-Strategie (Google Seite 1)
│   └── ARCHITEKTUR.md      # Technische Architektur
└── README.md               # Diese Datei
```

---

## Design-System

### Farben

| Token | Wert | Verwendung |
|---|---|---|
| `--black` | `#0D0F14` | Hintergrund |
| `--white` | `#fff` | Primaertext |
| `--blue` | `#2463EB` | Akzent, CTAs, Links |
| `--red` | `#E8472A` | Urgency/Alerts |
| `--muted` | `rgba(255,255,255,0.35)` | Sekundaertext |
| `--line` | `rgba(255,255,255,0.1)` | Trennlinien |
| `--card` | `rgba(255,255,255,0.03)` | Karten-Hintergrund |

### Typografie

| Font | CSS-Variable | Einsatz |
|---|---|---|
| Bebas Neue | `--display` | Headlines (H1, H2, Pricing) |
| Space Mono | `--mono` | Labels, Eyebrows, Nav, Features |
| DM Sans | `--body` | Fliesstext, Beschreibungen |

### Design-Prinzipien

- **Keine abgerundeten Ecken** — 0px border-radius ueberall (brutalistisch)
- **1px-Linien** als Strukturelemente
- **Grosszuegiger Weissraum** (Volvo-Minimalismus)
- **Uebergrosse Typografie** fuer Headlines
- **Dark Theme** durchgehend

---

## Sektionen (Onepager)

| # | Sektion | Anker-ID | Beschreibung |
|---|---|---|---|
| — | Navigation | `#nav` | Sticky, Logo + Links + CTA |
| — | Hero | — | Headline + CTAs + Alert-Bar |
| — | Ticker | — | Laufende Monospace-Statistiken |
| — | Problem | — | 5 Schmerzpunkte + Kosten-Visualisierung |
| — | Stats | — | 4 Kennzahlen (animiert) |
| 01 | Leistungen | `#leistungen` | 6 Feature-Cards (2x3 Grid) |
| 02 | Prozess | — | 4 Schritte zum Ergebnis |
| 03 | Preise | `#preise` | 3 Pakete + Toggle + Promo |
| 04 | Fallstudien | `#referenzen` | 3 Branchenbeispiele |
| 05 | Testimonials | — | 3 anonymisierte Kundenstimmen |
| 06 | FAQ | `#faq` | 6 Fragen (Accordion) |
| 07 | Website-Check | `#kontakt` | Lead-Formular + E-Mail-Option |
| — | Final CTA | `#final-cta` | Abschluss-Call-to-Action |
| — | Footer | — | Copyright + Links |

---

## Formular & Webhook

Das Kontaktformular (`data-webhook="lead"`) wird durch `js/forms.js` verarbeitet:

1. **Honeypot-Feld** — Verstecktes Feld fuer Bot-Erkennung
2. **Timestamp-Validierung** — Mindestens 3 Sekunden zwischen Laden und Absenden
3. **Webhook-URL** — `https://n8n.handwerker.vision/webhook/{endpoint}`
4. **Felder**: Name, E-Mail, Website-URL, Herausforderung (Dropdown), DSGVO-Checkbox

---

## Lokale Entwicklung

```bash
# Statischen Server starten
python -m http.server 8080

# Oder mit Node
npx serve .
```

Website oeffnen unter `http://localhost:8080`

---

## SEO

Ausfuehrliche SEO-Strategie: **[docs/SEO-STRATEGIE.md](docs/SEO-STRATEGIE.md)**

### Quick-Facts

- Semantisches HTML5 (H1, H2, section, nav, footer)
- JSON-LD Schema.org (LocalBusiness + FAQPage)
- Canonical URL, Open Graph, Twitter Cards
- XML-Sitemap + robots.txt
- Zielregion: Freiburg im Breisgau, Loerrach, Basel

---

## Dokumentation

| Dokument | Inhalt |
|---|---|
| [SEO-STRATEGIE.md](docs/SEO-STRATEGIE.md) | Vollstaendige SEO-Strategie fuer Google Seite 1 |
| [ARCHITEKTUR.md](docs/ARCHITEKTUR.md) | Technische Architektur, Design-System, Komponenten |

---

## Lizenz

Proprietaer — METISWEB VISION, Freiburg im Breisgau. Alle Rechte vorbehalten.
