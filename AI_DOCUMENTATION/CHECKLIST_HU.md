# IDS Design System Setup - Ellenőrzőlista (Checklist)

**Válassz szintet:**

## 🚀 MINIMÁLIS ELLENŐRZŐLISTA (Tailwind nélkül)

Követsd ezt, ha gyorsan szeretnél az IDS komponensekhez. Lásd: [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)

- [ ] Node.js 18+ és pnpm telepítve van
- [ ] Új Angular projekt létrehozva: `ng new`
- [ ] IDS csomag telepítve: `@i-cell/ids-angular`, `@i-cell/ids-styles`
- [ ] `ids_css` mappa másolva az akp-frontend-ből
- [ ] `public/fonts` mappa másolva az akp-frontend-től
- [ ] `angular.json` frissítve: assets és styles
- [ ] `src/styles.css` létrehozva mininál stílusokkal
- [ ] `pnpm start` sikeresen elindul
- [ ] IDS komponensek (button, input, badge) megjelennek
- [ ] CSS tokenok működnek (padding, szín, etc)
- [ ] Nincsenek konzolos hibák

✅ **Kész! Ez az összes szükséges minimum.**

---

## 📖 TELJES ELLENŐRZŐLISTA (Tailwind-del)

## ✅ 1. Projekt Előfeltételei

- [ ] Node.js 18+ telepítve van (`node --version`)
- [ ] pnpm telepítve van (`pnpm --version`)
- [ ] Angular CLI 20.x telepítve van (`ng version`)
- [ ] Git inicializálva van a projektben
- [ ] A working copy friss és clean (`git status`)

## ✅ 2. Projekt Alapítása

- [ ] Új Angular projekt létrehozva: `ng new my-project --package-manager=pnpm`
- [ ] Projektmappába navigálva: `cd my-project`
- [ ] `package.json` kontrollálva az Angular verziók

## ✅ 3. Szükséges Csomagok Telepítése

**Production függőségek:**
- [ ] `@i-cell/ids-angular@^0.2.20` telepítve
- [ ] `@i-cell/ids-styles@^0.0.58` telepítve
- [ ] `@angular/cdk@^20.2.2` telepítve (IDS zárásához szükséges)
- [ ] `lodash-es@^4.17.21` (opcionális, de gyakran szükséges)

```bash
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58 @angular/cdk@^20.2.2
```

**Dev függőségek:**
- [ ] `tailwindcss@^3.4.17` telepítve
- [ ] `postcss@^8.5.6` telepítve
- [ ] `autoprefixer@^10.4.21` telepítve
- [ ] `postcss-safe-parser@^7.0.1` telepítve

```bash
pnpm install -D tailwindcss@^3.4.17 postcss@^8.5.6 autoprefixer@^10.4.21 postcss-safe-parser@^7.0.1
```

## ✅ 4. Erőforrások Másolása

### IDS CSS Tokenok
- [ ] Az `ids_css` mappa a projekt gyökeréből másolva az akp-frontend projektből
- [ ] Az `ids_css/styles.min.css` megy
- [ ] Az `ids_css/tokens.min.css` meglétele ellenőrizve
- [ ] Az `ids_css/tailwind-tokens.js` meglétele ellenőrizve
- [ ] Az `ids_css/base/` mappa meglétele ellenőrizve
- [ ] Az `ids_css/component/` mappa meglétele ellenőrizve
- [ ] Az `ids_css/smc/` mappa meglétele ellenőrizve

```bash
cp -r /path/to/akp-frontend/ids_css ./ids_css
```

### Fontok
- [ ] A `public/fonts` mappa létrehozva
- [ ] Az IDS ikonok másolva: `I-DS-font-icon-hero.*`
- [ ] A Montserrat betűtípusok másolva: `Montserrat-*.woff2`

```bash
mkdir -p public/fonts
cp /path/to/akp-frontend/public/fonts/* ./public/fonts/
```

## ✅ 5. Konfigurációs Fájlok Létrehozása

### postcss.config.js
- [ ] Fájl létrehozva a projekt gyökerében
- [ ] Tailwindcss plugin beállítva
- [ ] Autoprefixer plugin beállítva

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.js
- [ ] Fájl létrehozva a projekt gyökerében
- [ ] `ids_css/tailwind-tokens.js` importálva
- [ ] `colors` kiterjesztés a tokenokkal (tailwindTokens.colors)
- [ ] `spacing` kiterjesztés a tokenokkal (tailwindTokens.spacing)
- [ ] `borderRadius` kiterjesztés a tokenokkal (tailwindTokens.borderRadius)
- [ ] Tipográfiai plugin regisztrálva
- [ ] Content path beállítva: `'./src/**/*.{html,ts}'`

### angular.json
- [ ] `build` → `options` → `assets` frissítve:
  - [ ] `ids_css` bemenet hozzáadva
  - [ ] `public` bemenet már meglévő vagy hozzáadva

```json
"assets": [
  { "glob": "**/*", "input": "ids_css" },
  { "glob": "**/*", "input": "public" }
]
```

- [ ] `build` → `options` → `styles` beállítva az alábbi sorrendben:
  - [ ] 1. `ids_css/styles.min.css`
  - [ ] 2. `ids_css/tokens.min.css`
  - [ ] 3. `src/styles.scss`
  - [ ] 4. `src/theme.scss`
  - [ ] 5. `node_modules/@i-cell/ids-styles/dist/accessibility.min.css`

- [ ] `build` → `options` → `inlineStyleLanguage` beállítva: `"scss"`

## ✅ 6. SCSS Fájlok Létrehozása

### src/theme.scss
- [ ] Fájl létrehozva
- [ ] Font-face definiálások hozzáadva:
  - [ ] `I-DS-font-icon-hero` font
  - [ ] `Montserrat` font (mind a 4 variant)

- [ ] `color-scheme-specific-variables` mixin definiálva
- [ ] Light/dark mode CSS variable-ok beállítva
- [ ] Media query támogatás: `prefers-color-scheme`
- [ ] Explicit témaváltás támogatás: `[theme='light']`, `[theme='dark']`

### src/styles.scss
- [ ] Fájl létrehozva
- [ ] `@use 'theme' as *;` importálva
- [ ] `@use '@angular/cdk';` importálva
- [ ] `@include cdk.a11y-visually-hidden();` hozzáadva
- [ ] Tailwind direktívák hozzáadva:
  - [ ] `@tailwind base;`
  - [ ] `@tailwind components;`
  - [ ] `@tailwind utilities;`

- [ ] Body stílusok beállítva (betűtípus család, margin)
- [ ] HTML overflow beállítva
- [ ] `@layer components` blokk (ha szükséges)

## ✅ 7. TypeScript Konfigurálása

### tsconfig.json
- [ ] `compilerOptions` ellenőrizve:
  - [ ] `target: "ES2022"`
  - [ ] `module: "ES2022"`
  - [ ] `strict: true`
  - [ ] `skipLibCheck: true`
  - [ ] `isolatedModules: true`

### tsconfig.app.json
- [ ] `inlineSourceMap` (ha szükséges dev verzióra)
- [ ] `sourceMap` (ha szükséges dev verzióra)

## ✅ 8. Komponensek és Sablonok

### src/app/app.component.ts
- [ ] Komponens létrehozva vagy frissítve
- [ ] IDS komponensek szimplán használhatók a template-ben (Web Components)
- [ ] Nincs szükséges import az IDS-ből

Péda:
```typescript
@Component({
  template: `<ids-button appearance="primary">Kattints</ids-button>`
})
```

## ✅ 9. Tesztelés és Érvényesítés

### Build és Serve
- [ ] `pnpm start` vagy `ng serve` futtatva
- [ ] Nincsenek build hibák
- [ ] Az alkalmazás betöltődik böngészőben
- [ ] Nincsenek konzolos hibák

### Stílusok Ellenőrzése
- [ ] Az IDS stílusok betöltődnek (DevTools Inspector > Styles)
- [ ] A Montserrat betűtípus jelenik meg
- [ ] Az IDS ikonok font megjelenek
- [ ] Tailwind utility klasszok működnek (pl. `bg-blue-500`)
- [ ] IDS tokenok betöltődnek (pl. `bg-ids-container-bg-brand-default`)

### IDS Komponensek Ellenőrzése
- [ ] Az `<ids-button>` komponens renderelődik
- [ ] Az `<ids-input>` komponens interaktív
- [ ] A témamód váltása működik

## ✅ 10. Fejlesztési Workflow

### ESLint és Prettier (Opcionális, de ajánlott)
- [ ] ESLint konfigurálva (`.eslintrc.json` vagy `eslint.config.mjs`)
- [ ] Prettier konfigurálva (`.prettierrc`)
- [ ] Pre-commit hooks beállítva (ha csapatmunka)

## ✅ 11. Build és Deployment

### Production Build
- [ ] `pnpm build` vagy `ng build` futtat sikeresen
- [ ] `dist/` mappa létrehozva
- [ ] Build méret elfogadható (budget warning nélkül)

### Build Konfigurálása (opcional)
- [ ] `angular.json` → `build` → `configurations` → `production`
- [ ] Outputhashing bekapcsolt
- [ ] Optimization bekapcsolt

## ✅ 12. Dokumentáció és Referenciák

- [ ] Lokális dokumentáció mentségre véve:
  - [ ] Az IDS komponensek listája
  - [ ] Az elérhető CSS tokenok katalógusa
  - [ ] Tailwind klasszok referencia

- [ ] Csapat dokumentálása frissítve:
  - [ ] IDS setup útmutató linkelt
  - [ ] Token használati konvenciók dokumentálva
  - [ ] Komponens pattern-ek dokumentálva

## ✅ 13. Verziókezelés

- [ ] `.gitignore` frissítve (ha szükséges)
  - [ ] `node_modules/` ignorálva
  - [ ] `.angular/` ignorálva
  - [ ] `dist/` ignorálva

- [ ] Inicial commit: `git add . && git commit -m "IDS Design System setup"`
- [ ] Git tags beállítva: `git tag v0.0.1`

## ✅ 14. Csapati Beállítások (ha alkalmazható)

- [ ] AI/editor konfigurálva (.editorconfig)
- [ ] Csapati konvenciók dokumentálva
- [ ] Code review checklist frissítve
- [ ] CI/CD pipeline beállítva (GitHub Actions, GitLab CI, etc.)

## ✅ 15. Közös Problémák Ellenőrzése

### Ellenőris
- [ ] Fontok betöltődnek `public/fonts/` helyről
- [ ] Tailwind tokenok betöltődnek `ids_css/tailwind-tokens.js`-ből
- [ ] IDS CSS fájlok betöltődnek az `angular.json` `styles` szakaszból
- [ ] Nincsenek SCSS parse hibák
- [ ] Nincsenek Tailwind konfigurációs hibák

### Diagnózis Parancsok
```bash
# Build outputok ellenőrzése
pnpm build --verbose

# Tesztítés futtatása (ha van)
pnpm test

# Linting
pnpm lint

# Fejlesztési server indítása debug módban
NG_BUILD_STDIO=true ng serve
```

## 📝 Összegzés

Ha az összes pont be van jelölve, az IDS Design System sikeresen integrálva van az új projektbe!

### Végső Lépések
1. [ ] Az alkalmazás lokálisan elindul: `pnpm start`
2. [ ] A DevTools megmutatja az IDS stílusokat
3. [ ] Az IDS komponensek helyesen jelennek meg
4. [ ] A Tailwind klasszok működnek
5. [ ] Nincsenek konzolos vagy build hibák
6. [ ] Az alkalmazás production buildelhető: `pnpm build`

## Segítségre van szükséged?

Tekintsd meg a további dokumentumokat:
- [`DESIGN_SYSTEM_SETUP.md`](./DESIGN_SYSTEM_SETUP.md) - Teljes setup útmutató
- [`QUICK_START_HU.md`](./QUICK_START_HU.md) - 5 perces gyorsindítás
- [`IDS_TOKENS_HANDLING.md`](./IDS_TOKENS_HANDLING.md) - Tokenok kezelési alternatívái
- [`ARCHITECTURE_AND_INTEGRATION.md`](./ARCHITECTURE_AND_INTEGRATION.md) - Akp-frontend arquitectúra

## 🎉 Gratulálunk!

Az IDS Design System sikeresen integrálva van! Kezdd meg a komponensek haszálytát és élvezd a konzisztens design-t az egész alkalmazásban!


