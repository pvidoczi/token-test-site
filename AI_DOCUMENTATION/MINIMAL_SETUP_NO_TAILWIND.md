# IDS Design System - Minimális Telepítés (Tailwind Nélkül)

Ez az útmutató egy **minimális, Tailwind nélküli** beállítást mutat az IDS komponensek és tokenok használatához.

## 1. Projekt Létrehozása

```bash
ng new my-app --package-manager=pnpm
cd my-app
```

## 2. Szükséges Csomagok Telepítése - CSAK IDS

```bash
# Csak ez kell!
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58
```

**Ennyi!** Nincs Tailwind, PostCSS, vagy autoprefixer szükséges.

## 3. Erőforrások Másolása

### ids_css mappa másolása
```bash
cp -r /path/to/akp-frontend/ids_css ./ids_css
```

### Fontok másolása
```bash
mkdir -p public/fonts
cp /path/to/akp-frontend/public/fonts/* ./public/fonts/
```

## 4. Angular.json Frissítése

Az egyetlen konfigurációs változtatás:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "ids_css"
              }
            ],
            "styles": [
              "ids_css/styles.min.css",
              "ids_css/tokens.min.css",
              "node_modules/@i-cell/ids-styles/dist/accessibility.min.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

## 5. Globális Stílusok (Minimális)

Hozz létre egy **src/styles.css** fájlt:

```css
/* Alap beállítások */
html {
  overflow: hidden;
}

body {
  font-family: Roboto, Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  background-color: var(--ids-smc-reference-container-color-bg-light-default);
  color: var(--ids-smc-reference-container-color-fg-default);
}

:root {
  color-scheme: light dark;
}

/* Light mode */
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}

/* Témaváltás támogatása */
[theme='light'] {
  color-scheme: light;
}

[theme='dark'] {
  color-scheme: dark;
}
```

## 6. Fontok Hozzáadása (SCSS opcionális)

Ha szeretnéd a custom fontokat használni, hozz létre egy **src/fonts.css** fájlt:

```css
@font-face {
  font-family: "I-DS-font-icon-hero";
  src: url("../public/fonts/I-DS-font-icon-hero.eot");
  src:
    local("IDS Icons"),
    local("I-DS-font-icon-hero"),
    url(../public/fonts/I-DS-font-icon-hero.woff2) format("woff2"),
    url(../public/fonts/I-DS-font-icon-hero.woff) format("woff"),
    url(../public/fonts/I-DS-font-icon-hero.ttf) format("truetype");
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('../public/fonts/Montserrat-italic-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('../public/fonts/Montserrat-italic-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('../public/fonts/Montserrat-normal-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('../public/fonts/Montserrat-normal-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Majd add hozzá az angular.json-hez:

```json
"styles": [
  "ids_css/styles.min.css",
  "ids_css/tokens.min.css",
  "src/fonts.css",
  "node_modules/@i-cell/ids-styles/dist/accessibility.min.css",
  "src/styles.css"
]
```

## 7. Első Komponens

Módosítsd az **src/app/app.component.ts**-t:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="padding: var(--ids-container-padding-24);">
      <h1>Üdvözöljük az IDS Design Systemben!</h1>
      
      <ids-button appearance="primary" (click)="handleClick()">
        Kattints rám
      </ids-button>
      
      <ids-input placeholder="Írj valamit..."></ids-input>
      
      <ids-badge appearance="success">Aktív</ids-badge>
    </div>
  `
})
export class AppComponent {
  handleClick() {
    alert('IDS működik!');
  }
}
```

## 8. Indítás

```bash
pnpm start
```

Nyisd meg: `http://localhost:4200`

## ✅ Ellenőrzés

- [ ] Az alkalmazás betöltődik hiba nélkül
- [ ] Az IDS komponensek (button, input, badge) megjelennek
- [ ] A CSS tokenok érvényesülnek (padding, stílusok)
- [ ] A betűtípus (Montserrat, IDS Icons) betöltődik

## 🎨 CSS Tokenok Használata

Az ids_css-ben definiált tokenok közvetlenül elérhetők CSS-ben:

### Szín Tokenok
```css
background-color: var(--ids-smc-reference-container-color-bg-brand-default);
color: var(--ids-smc-reference-container-color-fg-default);
border-color: var(--ids-smc-reference-container-color-border-default);
```

### Térköz Tokenok
```css
padding: var(--ids-container-padding-24);
margin: var(--ids-container-gap-16);
gap: var(--ids-container-gap-8);
```

### Határköz Tokenok
```css
border-radius: var(--ids-container-radius-md);
```

### Tipográfiai Tokenok
```css
font-family: var(--ids-smc-layout-typography-body-font-family-medium);
font-size: var(--ids-smc-layout-typography-body-font-size-medium);
font-weight: var(--ids-smc-reference-typography-font-weight-semibold);
line-height: var(--ids-smc-layout-typography-body-line-height-medium);
```

## 📝 Komponens-ben Inline Stílusok

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div [style]="cardStyle">
      <h2>Kártya</h2>
      <p>Tartalom</p>
    </div>
  `
})
export class CardComponent {
  cardStyle = {
    'background-color': 'var(--ids-smc-reference-container-color-bg-light-default)',
    'padding': 'var(--ids-container-padding-24)',
    'border-radius': 'var(--ids-container-radius-md)',
    'color': 'var(--ids-smc-reference-container-color-fg-default)',
  };
}
```

## 🎯 Minimális vs Teljes Beállítás

| Szempont | Minimális | Teljes (akp-frontend) |
|----------|-----------|---------------------|
| Telepítés | 1 csomag | 5+ csomag |
| Config fájlok | 1 (angular.json) | 3+ |
| CSS fájlok | Statikus | Tailwind feldolgozás |
| Build sebesség | Gyorsabb | Lassabb |
| Rugalmasság | Korlátozott | Maximális |
| Komponensek | ✅ Működnek | ✅ Működnek |
| Tokenok | ✅ Működnek | ✅ Működnek |

## 🚀 Projekt Indítása

```bash
# Csomag telepítés
pnpm install

# Fejlesztési server indítása
pnpm start

# Production build
pnpm build
```

## 🆘 Problémamegoldás

### Az IDS komponensek nem jelennek meg
```bash
# 1. Csomag újratelepítés
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 2. Cache törlés
rm -rf .angular

# 3. Indítás újra
pnpm start
```

### A CSS tokenok nem működnek
```bash
# 1. Ellenőrizd az ids_css mappát
ls ids_css/tokens.min.css

# 2. Ellenőrizd az angular.json styles szakaszát
cat angular.json | grep -A 5 "styles"

# 3. DevTools-ban ellenőrizd (Inspector > Styles)
```

### A betűtípusok nem betöltődnek
```bash
# 1. Ellenőrizd a public/fonts mappát
ls public/fonts/

# 2. Ellenőrizd az URL-eket a fonts.css-ben
# Az elérési út relatív kell legyen: ../public/fonts/
```

## 📚 Hasznos CSS Referencia

```css
/* Alapvető szín */
--ids-smc-reference-container-color-bg-light-default
--ids-smc-reference-container-color-bg-dark-default
--ids-smc-reference-container-color-fg-default

/* Brand szín */
--ids-smc-reference-container-color-bg-brand-default

/* Státusz színek */
--ids-smc-reference-container-color-bg-success-default
--ids-smc-reference-container-color-bg-error-default
--ids-smc-reference-container-color-bg-warning-default

/* Térköz */
--ids-container-padding-4  (4px)
--ids-container-padding-8  (8px)
--ids-container-padding-16 (16px)
--ids-container-padding-24 (24px)
--ids-container-gap-8
--ids-container-gap-16

/* Határköz */
--ids-container-radius-sm
--ids-container-radius-md
--ids-container-radius-lg
```

## ✨ Összes fájl

### Szükséges fájlok:
- `angular.json` - ✅ módosítva
- `public/fonts/*` - ✅ másolva
- `ids_css/*` - ✅ másolva
- `src/styles.css` - ✅ létrehozva
- `src/fonts.css` - ✅ opcionális

### NEM szükséges:
- ❌ postcss.config.js
- ❌ tailwind.config.js
- ❌ SCSS feldolgozás

## 🎉 Kész!

Most már van egy **minimális, Tailwind nélküli** Angular projektd az IDS design systemmel!

Az IDS komponensek és CSS tokenok teljes mértékben működnek, csak a szükséges minimális beállítással.


