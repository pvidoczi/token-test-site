# Az akp-frontend Projektstructúra és IDS Integráció

> ⚠️ **Tailwind nélküli, minimális megoldást keresél?**  
> Lásd a [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md) dokumentumot az egyszerűbb verziót.

Ez a dokumentum részletezi, hogy az akp-frontend projekt hogyan integrálja az IDS design systemet **Tailwind CSS-sel** és melyik fájlok felelősek az integrációért.

## 1. Projekts Szerkezet - IDS-vel Kapcsolatos Fájlok

```
akp-frontend/
├── ids_css/                          # ← IDS CSS Tokenok (KRITIKUS)
│   ├── styles.min.css                # Fő stílusok
│   ├── tokens.min.css                # CSS Change Tokenok
│   ├── tailwind-tokens.js            # Tailwind konfiguráció
│   ├── base/                         # Alap stílusok
│   ├── component/                    # Komponens stílusok
│   └── smc/                          # SMC tokenok
│
├── public/
│   ├── fonts/                        # ← IDS Ikonok és betűtípusok
│   │   ├── I-DS-font-icon-hero.*     # IDS Ikonok
│   │   └── Montserrat-*.woff2        # Betűtípus
│   └── images/                       # App specifikus imagek
│
├── src/
│   ├── styles.scss                   # ← Globális stílusok
│   ├── theme.scss                    # ← Témamódok, fontok
│   ├── app/
│   │   ├── app.config.ts             # ← Angular konfiguráció
│   │   ├── app.component.ts          # Root komponens
│   │   └── components/               # App komponensek
│   └── main.ts                       # Bootstrapping
│
├── angular.json                      # ← Assets, stílusok config
├── tailwind.config.js                # ← Tailwind beállítások
├── postcss.config.js                 # ← PostCSS beállítások
├── tsconfig.json                     # TypeScript config
└── package.json                      # Függőségek
```

## 2. Kritikus Fájlok és Szerepük

### 2.1 angular.json - Stilusok és Assets Konfigurálása

```json
{
  "projects": {
    "akp-frontend": {
      "architect": {
        "build": {
          "options": {
            // ← FONTOS: Assets konfigurálás
            "assets": [
              {
                "glob": "**/*",
                "input": "ids_css"  // IDS CSS fájlok publikálása
              },
              {
                "glob": "**/*",
                "input": "public"   // Fontok és imagek
              }
            ],
            // ← FONTOS: Stilusok betöltési sorrendje
            "styles": [
              "ids_css/styles.min.css",           // 1. IDS alapvagy stílusok
              "ids_css/tokens.min.css",           // 2. IDS tokenok
              "src/styles.scss",                  // 3. App szerint stílusok
              "src/theme.scss",                   // 4. Témamódok
              "node_modules/@i-cell/ids-styles/dist/accessibility.min.css"  // 5. Accessibility
            ]
          }
        }
      }
    }
  }
}
```

**Miért ez a sorrend?**
- IDS alapok először (nincs felüldefiniálás)
- Tokenok azután (CSS variáblák)
- App stílusok később (app specifikus override-ok)
- Accessibility utoljára (a11y felülbírálatok)

### 2.2 tailwind.config.js - Tokenok Tailwind-be Integrálása

```javascript
const plugin = require('tailwindcss/plugin');
const tailwindTokens = require('./ids_css/tailwind-tokens');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // ← IDS tokenok Tailwind-be injektálása
      colors: tailwindTokens.colors,        // 200+ szín token
      spacing: tailwindTokens.spacing,      // Térköz tokenok
      borderRadius: tailwindTokens.borderRadius,  // Határköz tokenok
    },
  },
  plugins: [
    // ← Tipográfiai tokenok regisztrálása
    plugin(({ addBase }) => {
      const types = ['display', 'headline', 'title', 'body', 'caption'];
      const sizes = ['xlarge', 'large', 'medium', 'small'];

      // Tipográfiai osztályok generálása pl. .headline-large-semibold
      const typographyConfig = (type, fontFamily, fontSize, lineHeight) => {
        return {
          [`.${type}`]: {
            '&-regular': { /* stílusok */ },
            '&-semibold': { /* stílusok */ },
            '&-bold': { /* stílusok */ },
          },
        };
      };

      // Összes kombinációs loop
      let config = {};
      types.forEach((type) =>
        sizes.forEach((size) => {
          config = {
            ...config,
            ...typographyConfig(
              `${type}-${size}`,
              `var(--ids-smc-layout-typography-${type}-font-family-${size})`,
              `var(--ids-smc-layout-typography-${type}-font-size-${size})`,
              `var(--ids-smc-layout-typography-${type}-line-height-${size})`
            ),
          };
        })
      );
      addBase(config);
    }),
  ],
};
```

**Főbb funkciók:**
- 200+ szín token elérhetővé tétele: `bg-ids-container-bg-brand-default`
- Térköz tokenok: `p-ids-container-padding-16`
- Tipográfiai osztályok: `headline-large-semibold`

### 2.3 src/styles.scss - Globális Stílusok

```scss
@use './app/core/libs/popover/popover' as popover;  // Custom lib
@use 'theme' as *;  // theme.scss import
@use '@angular/cdk';  // Angular CDK a11y

// Angular CDK a11y helper
@include cdk.a11y-visually-hidden();

// ← FONTOS: Tailwind rétegek
@tailwind base;       // Alap stílusok (reset, etc)
@tailwind components; // Komponens stílusok (buttons, cards)
@tailwind utilities;  // Utility stílusok (padding, color, etc)

// App specifikus stílusok
body {
  font-family: Roboto, Montserrat, system-ui, sans-serif;
  margin: 0;
}

html {
  overflow: hidden;  // Akp specifikus override
}

// Az IDS komponensek felülbírálási logikája
@layer components {
  ids-tab-group.ids-tab-group.ids-tab-group-compact {
    // Akp projekt specifikus tab stílusok
  }
  
  ids-badge.ids-badge {
    @apply z-0;  // Tailwind @apply használat
  }
}

// Dinamikus stílusok
*:has(akp-loading-spinner) {
  @apply relative overflow-hidden !important;
}
```

### 2.4 src/theme.scss - Témavariációk és Fontok

```scss
// ← Font betöltések
@font-face {
  font-family: "I-DS-font-icon-hero";
  src: url("../public/fonts/I-DS-font-icon-hero.eot");
  // ... font definíciók
}

// ← Montserrat betűtípus (több variációban)
@font-face {
  font-family: 'Montserrat';
  // ... font definíciók
}

// ← FONTOS: Téma mixin
@mixin color-scheme-specific-variables($color-scheme) {
  @if $color-scheme == light {
    --home-dashboard-bg-image: url('../public/images/home-dashboard-light.svg');
    --404-bg-image: url('../public/images/404-light.svg');
    // ... további light mode CSS változók
  } @else if $color-scheme == dark {
    --home-dashboard-bg-image: url('../public/images/home-dashboard-dark.svg');
    --404-bg-image: url('../public/images/404-dark.svg');
    // ... további dark mode CSS változók
  }
}

// ← Téma alkalmazása
@media (prefers-color-scheme: light) {
  :root {
    @include color-scheme-specific-variables(light);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    @include color-scheme-specific-variables(dark);
  }
}

// ← Explicit témaváltás támogatása
[theme='light'] {
  color-scheme: light;
  @include color-scheme-specific-variables(light);
}

[theme='dark'] {
  color-scheme: dark;
  @include color-scheme-specific-variables(dark);
}
```

### 2.5 src/main.ts - Bootstrap

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Lokalizáció (nem közvetlenül IDS, de szükséges az app-hoz)
import { registerLocaleData } from '@angular/common';
import hu from '@angular/common/locales/hu';

registerLocaleData(hu);

// Konfiguráció betöltése runtime-ben
fetch('env.config.json')
  .then((response) => response.json())
  .then((config) =>
    bootstrapApplication(AppComponent, appConfig(config))
      .catch((err) => console.error(err)),
  );
```

### 2.6 postcss.config.js - PostCSS Pipeline

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},      // Tailwind CSS feldolgozás
    autoprefixer: {},     // Browser prefix hozzáadása
  },
};
```

**Feldolgozási pipeline:**
1. Input SCSS → Tailwind (utility-k generálása)
2. Tailwind output → Autoprefixer (prefixek hozzáadása)
3. Output CSS (deployment ready)

## 3. IDS CSS Tokenok Típusai és Megtalálása

### 3.1 Szín Tokenok (colors)

```scss
// Lokalizálás: ids_css/smc/smc-colors.css
--ids-smc-reference-container-color-bg-brand-default      // Brand háttér
--ids-smc-reference-container-color-fg-default            // Default szöveg
--ids-smc-reference-container-color-border-default        // Default szegély
--ids-smc-reference-container-color-bg-success-default    // Success háttér
--ids-smc-reference-container-color-bg-error-default      // Error háttér
--ids-smc-reference-container-color-bg-warning-default    // Warning háttér
```

### 3.2 Térköz Tokenok (spacing)

```scss
// Lokalizálás: ids_css/smc/smc-layout.css
--ids-container-padding-4                 // 4px
--ids-container-padding-8                 // 8px
--ids-container-padding-16                // 16px
--ids-container-padding-24                // 24px
--ids-container-padding-32                // 32px

--ids-container-gap-4                     // 4px gap
--ids-container-gap-8                     // 8px gap
--ids-container-gap-16                    // 16px gap
```

### 3.3 Tipográfiai Tokenok (typography)

```scss
// Lokalizálás: ids_css/smc/smc-layout.css
--ids-smc-layout-typography-headline-font-family-large
--ids-smc-layout-typography-headline-font-size-large
--ids-smc-layout-typography-headline-line-height-large

--ids-smc-layout-typography-body-font-weight-regular      // "400"
--ids-smc-layout-typography-body-font-weight-semibold     // "500"
--ids-smc-layout-typography-body-font-weight-bold         // "600"
```

## 4. IDS Komponensek Használata a Projektben

### 4.1 Komponensek Importálása

Az IDS komponensek Web Components, amit az Angular automatikusan felismer:

```bash
# Semmilyen import nem szükséges,
# csak HTML template-ben használható:
<ids-button appearance="primary">Kattints</ids-button>
```

### 4.2 Komponensek E2E

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular';  // Opcionális típus

@Component({
  selector: 'app-root',
  template: `
    <div class="p-ids-container-padding-24">
      <!-- IDS Gomb komponens -->
      <ids-button
        appearance="primary"
        [disabled]="isLoading"
        (click)="onSubmit()">
        Elküldés
      </ids-button>

      <!-- IDS Input komponens -->
      <ids-input
        placeholder="Név"
        [(ngModel)]="name"
        required>
      </ids-input>

      <!-- IDS Badge -->
      <ids-badge appearance="success">Aktív</ids-badge>
    </div>
  `
})
export class AppComponent {
  name = '';
  isLoading = false;

  onSubmit() {
    this.isLoading = true;
    // API hívás, etc
  }
}
```

### 4.3 Tokenok Direktben Használata

```html
<!-- Inline stílusok (nem javasolt) -->
<div style="background-color: var(--ids-smc-reference-container-color-bg-brand-default);">
  Szöveg
</div>

<!-- Tailwind klasszok (javasolt) -->
<div class="bg-ids-container-bg-brand-default text-white p-ids-container-padding-16">
  Szöveg
</div>

<!-- SCSS mixin (komponensben) -->
<div [class]="brandHeaderClass">
  Szöveg
</div>
```

```scss
// component.scss
.brand-header {
  background-color: var(--ids-smc-reference-container-color-bg-brand-default);
  color: var(--ids-smc-reference-container-color-fg-default);
  padding: var(--ids-container-padding-24);
  border-radius: var(--ids-container-radius-md);
}
```

## 5. Problémamegoldás

### Problém: Az IDS stílusok nem betöltődnek

**Diagnózis:**
```bash
# 1. Ellenőrizd az angular.json assets config
grep -A5 '"assets"' angular.json

# 2. Ellenőrizd az ids_css mappát
ls -la ids_css/

# 3. Ellenőrizd a styles config sorrendjét
grep -A5 '"styles"' angular.json
```

**Megoldás:**
1. Győződj meg, hogy az `ids_css` mappa a projekt gyökerében van
2. Frissítsd az `angular.json`-t az assets szakaszban
3. Futtasd újra: `pnpm install && pnpm start`

### Problém: Tailwind tokenok nem működnek

**Diagnózis:**
```bash
# Tailwind konfigurációt ellenőrizd
cat tailwind.config.js | grep tailwindTokens

# Tailwind-tokens.js elérhetőségét ellenőrizd
ls ids_css/tailwind-tokens.js
```

**Megoldás:**
1. Győződj meg, hogy `tailwind-tokens.js` helyesen van importálva
2. Futtasd: `pnpm install tailwindcss`
3. Épj újra: `pnpm build`

### Problém: Fontok nem jelennek meg

**Diagnózis:**
```bash
# CSS-ben ellenőrizd a font URL-eket
grep "@font-face" src/theme.scss

# Fontok meglétét ellenőrizd
ls public/fonts/
```

**Megoldás:**
1. Másolj fontokat: `cp -r /path/to/akp-frontend/public/fonts ./public/`
2. Ellenőrizd az URL-eket a `src/theme.scss`-ben
3. Cache törlés: `rm -rf .angular && pnpm start`

## 6. Best Practices

### Tegyél
- ✅ Tailwind klasszokat használj (pl. `bg-ids-container-bg-brand-default`)
- ✅ CSS variáblokat SCSS mixin-ekben
- ✅ Specifikus tokenokat nem hardcoded érték helyett
- ✅ Dokumentáld az egyéni override-okat

### Ne tegyél
- ❌ Hardcode hex/rgb értékeket
- ❌ Ne módosítsd az ids_css mappát közvetlenül
- ❌ Ne publikálj egyéni komponenseken belüli stílusokat
- ❌ Ne hagyj figyelmen kívül accessibility stílusokat

## 7. Verziókezelés

```bash
# package.json-ben követni az IDS verziókat
{
  "dependencies": {
    "@i-cell/ids-angular": "^0.2.20",     # Major frissítés bejelentés
    "@i-cell/ids-styles": "^0.0.58"       # Minor frissítés bejelentés
  }
}

# ids_css mappa verzióízéhez Git tagas:
git tag ids_css-v0.0.58
git push origin ids_css-v0.0.58
```

## Összefoglalás

Az akp-frontend projekt az IDS design systemet az alábbi manera integrálta:

1. **CSS Tokenok** - `ids_css/` mappában statikus másolatként
2. **Tailwind Integráció** - `tailwind.config.js` tokenok injektálása
3. **SCSS Feldolgozás** - `src/styles.scss` és `src/theme.scss` globális stílusok
4. **Web Components** - `@i-cell/ids-angular` komponensek
5. **Típ-os Támogatás** - A komponensek Angular standalone komponensekként működnek

Ez a szerkezet skálázható, karbantartható és könnyen adaptálható más projektekre!



