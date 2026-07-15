# IDS Design System Integrálása - Részletes Útmutató

> ⚠️ **Tailwind nélküli, minimális megoldást keresél?**  
> Lásd a [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md) dokumentumot az egyszerűbb verziót, amely csak az IDS komponenseket és tokenokat használja.

Ez a dokumentum lépésről-lépésre ismerteti, hogyan lehet az I-DS (I-Cell Design System) design systemet **Tailwind CSS-sel** felépíteni egy új Angular projektben, mint ahogy az akp-frontend projektben is használjuk.

Ha **Tailwind nélkül** szeretnéd, ugass a [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md) dokumentumra!

## Előfeltételek

- Node.js 18+ (ajánlott: 20.x vagy újabb)
- pnpm vagy npm csomagkezelő (a projekt pnpm-t használ)
- Angular CLI 20.x
- TypeScript 5.9+

## 1. Projekt Inicializálása

### 1.1 Új Angular projekt létrehozása

```bash
ng new my-project --package-manager=pnpm
cd my-project
```

### 1.2 Angular verzió megadása

A projekt az alábbi verziókkal működik optimálisan:

```bash
pnpm install --save @angular/common@^20.2.4 @angular/core@^20.2.4 @angular/platform-browser@^20.2.4 @angular/platform-browser-dynamic@^20.2.4 @angular/router@^20.2.4 @angular/forms@^20.2.4 @angular/animations@^20.2.4 @angular/cdk@^20.2.2 @angular/build@^20.2.2 @angular/cli@^20.2.2 @angular/compiler-cli@^20.2.4
```

## 2. IDS Design System Csomagok Telepítése

### 2.1 Szükséges IDS csomagok

```bash
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58
```

### 2.2 CSS/SCSS feldolgozáshoz szükséges csomagok

```bash
pnpm install -D tailwindcss@^3.4.17 postcss@^8.5.6 autoprefixer@^10.4.21 postcss-safe-parser@^7.0.1
```

## 3. Stilusok és Tokenok Konfigurálása

### 3.1 IDS CSS Tokenok Másolása

Az akp-frontend projektből másolja az `ids_css` mappát a projektek gyökerébe:

```bash
cp -r /path/to/akp-frontend/ids_css ./ids_css
```

Az `ids_css` mappa az alábbi fájlokat tartalmazza:
- `styles.min.css` - Fő IDS stílusok
- `tokens.min.css` - CSS tokenok
- `tokens.css` - Nem minifikált tokenok (fejlesztéshez)
- `tailwind-tokens.js` - Tailwind konfigurációhoz szükséges tokenok
- `base/base.css` - Alap stílusok
- `component/` - Komponens-specifikus CSS fájlok
- `smc/` - SMC (Semantic Material Color) tokenok

### 3.2 PostCSS Konfiguráció

Hozzon létre egy `postcss.config.js` fájlt a projektek gyökerében:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 3.3 Tailwind CSS Konfiguráció

Hozzon létre egy `tailwind.config.js` fájlt a projektek gyökerében:

```javascript
const plugin = require('tailwindcss/plugin');
const tailwindTokens = require('./ids_css/tailwind-tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ...tailwindTokens.colors,
      },
      spacing: {
        ...tailwindTokens.spacing,
      },
      borderRadius: {
        ...tailwindTokens.borderRadius,
      }
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      const types = ['display', 'headline', 'title', 'body', 'caption'];
      const sizes = ['xlarge', 'large', 'medium', 'small'];

      const typographyConfig = (type, fontFamily, fontSize, lineHeight) => {
        return {
          [`.${type}`]: {
            '&-regular': {
              fontFamily: fontFamily,
              fontWeight: 'var(--ids-smc-reference-typography-font-weight-regular)',
              textTransform: 'none',
              textDecoration: 'none',
              fontSize: fontSize,
              lineHeight: lineHeight,
              letterSpacing: 0,
            },
            '&-semibold': {
              fontFamily: fontFamily,
              fontWeight: 'var(--ids-smc-reference-typography-font-weight-semibold)',
              textTransform: 'none',
              textDecoration: 'none',
              fontSize: fontSize || '1rem',
              lineHeight: lineHeight || '1rem',
              letterSpacing: 0,
            },
            '&-bold': {
              fontFamily: fontFamily,
              fontWeight: 'var(--ids-smc-reference-typography-font-weight-bold)',
              textTransform: 'none',
              textDecoration: 'none',
              fontSize: fontSize,
              lineHeight: lineHeight,
              letterSpacing: 0,
            },
          },
        };
      };

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

### 3.4 SCSS Fájlok Létrehozása

#### Témamegadás (`src/theme.scss`)

```scss
// Fontok
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

/* Montserrat betűtípus */
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

// Színséma mixin
@mixin color-scheme-specific-variables($color-scheme) {
  @if $color-scheme == light {
    // Világos téma CSS változók
    --custom-bg-image: url('../public/images/light-bg.svg');
    // Szükség szerint hozzáadhatóak további témavariációs CSS változók
  } @else if $color-scheme == dark {
    // Sötét téma CSS változók
    --custom-bg-image: url('../public/images/dark-bg.svg');
  }
}

// Rendszeres CSS-ben a @media-nak és attribútumoknak megfelelő megadása
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

[theme='light'] {
  color-scheme: light;
  @include color-scheme-specific-variables(light);
}

[theme='dark'] {
  color-scheme: dark;
  @include color-scheme-specific-variables(dark);
}
```

#### Globális Stílusok (`src/styles.scss`)

```scss
@use './theme' as *;
@use '@angular/cdk';

@include cdk.a11y-visually-hidden();

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  overflow: hidden;
}

body {
  font-family:
    Roboto,
    Montserrat,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  margin: 0;
}

:root {
  color-scheme: light dark;
}

// Egyéni stílusok szükség szerint
@layer components {
  // Komponens-specifikus stíluskészlet
}
```

## 4. Angular.json Konfigurálása

Frissítse az `angular.json` fájlt a stilusokkal:

```json
{
  "projects": {
    "my-project": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
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
              "src/styles.scss",
              "src/theme.scss",
              "node_modules/@i-cell/ids-styles/dist/accessibility.min.css"
            ],
            "inlineStyleLanguage": "scss"
          }
        }
      }
    }
  }
}
```

## 5. TypeScript Konfiguráció

Az általános `tsconfig.json` beállításait egy standard Angular projekt már tartalmazza, de ellenőrizze:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true
  }
}
```

## 6. Fontok és Erőforrások Másolása

Az `ids_css` mappában található fontokat az akp-frontend projektből másolja:

```bash
cp -r /path/to/akp-frontend/public/fonts ./public/
```

A `public/fonts` mappában az alábbiak szükségesek:
- `I-DS-font-icon-hero.eot`
- `I-DS-font-icon-hero.woff2`
- `I-DS-font-icon-hero.woff`
- `I-DS-font-icon-hero.ttf`
- `Montserrat-italic-latin-ext.woff2`
- `Montserrat-italic-latin.woff2`
- `Montserrat-normal-latin-ext.woff2`
- `Montserrat-normal-latin.woff2`

## 7. IDS Angular Komponensek Használata

### 7.1 Komponensek Importálása

Az IDS komponensek Web Components API-val valósulnak meg, így közvetlenül használhatóak:

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ids-button appearance="primary">
      Click me
    </ids-button>
  `,
  styles: []
})
export class AppComponent {}
```

### 7.2 Néhány Kommon IDS Komponens

- `<ids-button>` - Gombkomponens
- `<ids-input>` - Szövegbeviteli mező
- `<ids-select>` - Legördülő lista
- `<ids-checkbox>` - Jelölőnégyzet
- `<ids-radio>` - Rádiógomb
- `<ids-card>` - Kártyakomponens
- `<ids-tab-group>` - Lapozó
- `<ids-table>` - Tábla
- `<ids-dialog>` - Dialógusablak
- `<ids-notification>` - Értesítés

Az összes elérhető komponensről az @i-cell/ids-angular dokumentációjában találhat információkat.

## 8. Tailwind CSS Alternatív Megközelítés

Ha minél több IDS komponenst szeretne használni, az osztályon alapuló megközelítés:

```html
<div class="bg-ids-container-bg-brand-default text-ids-container-fg-default p-ids-container-padding-16">
  <p class="body-large-regular">Szöveg a Tailwind tokenokkal</p>
</div>
```

## 9. Projekt Indítása

Az alapmegadás után indítsa el a fejlesztési szervert:

```bash
pnpm start
# vagy
ng serve
```

## 10. Buildolás

Az éles verziót az alábbival lehet buildolni:

```bash
pnpm build
# vagy
ng build
```

## 11. CSS Tokenok Megértése

Az IDS tokenok az alábbi kategóriákba vannak szervezve:

### Szín Tokenok (Colors)
- `--ids-container-bg-*`: Háttérszínek
- `--ids-container-fg-*`: Előtérszínek (szöveg)
- `--ids-container-border-*`: Szegélyszínek

### Méret/Térköz Tokenok (Spacing)
- `--ids-container-padding-*`: Belső térköz
- `--ids-container-gap-*`: Elemek közötti térköz  
- `--ids-container-size-*`: Méretek

### Határköz Tokenok (Border Radius)
- `--ids-container-*-radius`: Lekerekítések

### Tipográfiai Tokenok (Typography)
- `--ids-smc-layout-typography-[type]-font-family-[size]`
- `--ids-smc-layout-typography-[type]-font-size-[size]`
- `--ids-smc-layout-typography-[type]-line-height-[size]`

Komplett referencia az `ids_css` mappában lévő CSS fájlokban érhető el.

## 12. Темаváltás (Light/Dark Mode)

A témamódok közötti váltás:

```html
<!-- HTML-ben -->
<html theme="light">
  <!-- vagy -->
<html theme="dark">
```

```typescript
// TypeScript-ben
document.documentElement.setAttribute('theme', 'dark');
```

## 13. Csomag Frissítés

Rendszeres frissítésekhez:

```bash
pnpm update @i-cell/ids-angular @i-cell/ids-styles
```

## 14. Hibaelhárítás

### CSS tokenok nem betöltődnek
- Ellenőrizze, hogy az `ids_css` mappa helyesen másolódott-e a gyökérbe
- Ellenőrizze az `angular.json` assets és styles beállításait
- Futtassa újra: `pnpm install`

### IDS komponensek nem jelennek meg
- Ellenőrizze, hogy az `@i-cell/ids-angular` csomag helyesen telepítve van-e
- Frissítse a típus-definíciókat: `pnpm install --save-dev @types/node`

### Tailwind tokenok nem működnek  
- Ellenőrizze a `tailwind.config.js` konfigurációt
- Ellenőrizze, hogy a `tailwind-tokens.js` файл helyesen van-e importálva

## Összefoglalás

A design system felépítéséhez az alábbi lépések szükségesek:

1. ✅ IDS csomagok telepítése
2. ✅ `ids_css` mappa másolása
3. ✅ PostCSS és Tailwind konfigurálása  
4. ✅ SCSS fájlok létrehozása
5. ✅ Angular.json stilusok frissítése
6. ✅ Fontok másolása
7. ✅ Komponensek integrálása

Ezek az alapvető lépések után az IDS design systemet teljes mértékben használni tudja az új projektben.


