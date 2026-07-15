# IDS Design System - Gyorsindítás (Minimális, 5 perc)

Ezt az útmutatót kövesd, ha gyorsan szeretnél az IDS design systemhez egy új projektben. **Tailwind nélkül, csak a szükséges minimális telepítés!**

## 1. Projekt Létrehozása (1 perc)

```bash
ng new my-app --package-manager=pnpm
cd my-app
```

## 2. IDS Csomag Telepítése (1 perc)

```bash
# Csak ez kell! Nincs Tailwind, nincs PostCSS
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58
```

## 3. Erőforrások Másolása (1 perc)

```bash
# ids_css mappa
cp -r /path/to/akp-frontend/ids_css ./ids_css

# Fontok
mkdir -p public/fonts
cp /path/to/akp-frontend/public/fonts/* ./public/fonts/
```

## 4. Angular.json Frissítése (1 perc)

A `build` → `options` szakaszban:

```json
"styles": [
  "ids_css/styles.min.css",
  "ids_css/tokens.min.css",
  "node_modules/@i-cell/ids-styles/dist/accessibility.min.css",
  "src/styles.css"
],
"assets": [
  { "glob": "**/*", "input": "public" },
  { "glob": "**/*", "input": "ids_css" }
]
```

## 5. Stílusok (src/styles.css) - 1 perc

```css
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

[theme='light'] {
  color-scheme: light;
}

[theme='dark'] {
  color-scheme: dark;
}
```

## 6. Első Komponens

Az `src/app/app.component.ts` módosítása:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="padding: var(--ids-container-padding-24);">
      <h1>Üdvözöljük az IDS Design Systemben!</h1>
      
      <ids-button appearance="primary" (click)="onClick()">
        Kattints rám
      </ids-button>
      
      <ids-input placeholder="Írj valamit..."></ids-input>
      
      <ids-badge appearance="success">Aktív</ids-badge>
    </div>
  `,
  styles: []
})
export class AppComponent {
  onClick() {
    alert('IDS működik!');
  }
}
```

## 7. Indítás

```bash
pnpm start
```

Nyisd meg a böngésződet: `http://localhost:4200`

## Kész!

Most már van egy működő Angular projektd az IDS design systemmel, **minimális beállítással!**

---

## Hasznos Parancsok

```bash
# Build
pnpm build

# Tesztelés
pnpm test

# Lint
pnpm lint
```

## Gyakori IDS Komponensek

```html
<!-- Gomb -->
<ids-button appearance="primary">Kattints</ids-button>

<!-- Input -->
<ids-input placeholder="Írj valamit..."></ids-input>

<!-- Card -->
<ids-card>
  <p>Tartalom</p>
</ids-card>

<!-- Badge -->
<ids-badge appearance="success">Sikeres</ids-badge>

<!-- Checkbox -->
<ids-checkbox label="Elfogadom"></ids-checkbox>

<!-- Select -->
<ids-select>
  <option>Option 1</option>
  <option>Option 2</option>
</ids-select>
```

## Tailwind Klasszok

```html
<!-- Szín -->
<div class="bg-ids-container-bg-brand-default text-ids-container-fg-default">
  Szöveg
</div>

<!-- Térköz -->
<div class="p-ids-container-padding-16 gap-ids-container-gap-8">
  Térköz
</div>

<!-- Határköz -->
<div class="rounded-ids-container-md">
  Lekerekített sarkú elem
</div>

<!-- Tipográfia -->
<p class="headline-large-semibold">Főcím</p>
<p class="body-medium-regular">Szöveg</p>
```

## Témamódok

```html
<!-- Light theme (alapértelmezett) -->
<html theme="light">

<!-- Dark theme -->
<html theme="dark">
```

```typescript
// TypeScript-ben
document.documentElement.setAttribute('theme', 'dark');
```

## Dokumentáció

- [Teljes Beállítási Útmutató](./DESIGN_SYSTEM_SETUP.md)
- [Tokenok Kezelése](./IDS_TOKENS_HANDLING.md)
- [@i-cell/ids-angular](https://www.npmjs.com/package/@i-cell/ids-angular)
- [@i-cell/ids-styles](https://www.npmjs.com/package/@i-cell/ids-styles)

## Problémák?

### A stílusok nem betöltődnek

```bash
# Konfigurációkat ellenőrizd
cat angular.json | grep styles

# Fontokat ellenőrizd
ls public/fonts/
```

### IDS komponensek nem működnek

```bash
# Csomag újratelepítés
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm start
```

Sok sikert az IDS design system-mel! 🚀


