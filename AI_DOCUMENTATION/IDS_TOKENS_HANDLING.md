# IDS CSS Tokenok Kezelési Alternatívái

Ez a dokumentum ismerteti, hogyan lehet az IDS CSS tokenokat máskülönbözőféle módon kezelni és másik projektekbe integrálni.

## 1. IDS CSS Tokenok Forrása

Az `ids_css` mappában tárolt tokenok az `@i-cell/ids-styles` csomag alapján jöttek létre. Az akp-frontend projektben statikus másolatként vannak tárolva, hogy gyorsabb hozzáférést biztosítsanak.

### Fájl szerkezet

```
ids_css/
├── base/
│   └── base.css                  # Alap stílusok
├── component/
│   ├── component.css             # Console komponensek
│   ├── ids-badge.css
│   ├── ids-button.css
│   ├── ids-card.css
│   ├── ids-checkbox.css
│   ├── ids-dialog.css
│   ├── ids-table.css
│   └── ... (további komponensek)
├── smc/
│   ├── smc-colors.css           # Szín definíciók
│   ├── smc-layout.css           # Elrendezés tokenok
│   └── smc-reference.css        # Referencia tokenok
├── styles.min.css               # Fő stílusok (minifikált)
├── styles.css                   # Fő stílusok (nem minifikált)
├── tokens.min.css               # Tokenok (minifikált)
├── tokens.css                   # Tokenok (nem minifikált)
└── tailwind-tokens.js           # Tailwind konfiguráció
```

## 2. Tokenok Másolása Új Projektbe - Módszer A (Statikus Másolat)

Ez a legegyszerűbb megközelítés, amit az akp-frontend is használ.

### 2.1 Fájlok Másolása

```bash
# Az akp-frontend projektből másolja az ids_css mappát
cp -r /path/to/akp-frontend/ids_css /path/to/new-project/

# Alternatívaként szűrés csak a szükséges fájlokra
cp -r /path/to/akp-frontend/ids_css/{*.min.css,*.js,smc,base} /path/to/new-project/ids_css/
```

### 2.2 Package.json Frissítése

```json
{
  "devDependencies": {
    "@i-cell/ids-styles": "^0.0.58"
  }
}
```

### 2.3 Angular.json Frissítése

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
                "input": "ids_css"
              }
            ],
            "styles": [
              "ids_css/styles.min.css",
              "ids_css/tokens.min.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### Előnyök
- ✅ Gyors, offline működés
- ✅ Nincs függőség az npm-en
- ✅ Gyorsabb build time

### Hátrányok
- ❌ Manuális frissítés szükséges
- ❌ Verzió-követés bonyolult
- ❌ Nagyobb repo méret

## 3. Tokenok Másolása Új Projektbe - Módszer B (NPM Csomag)

Ha az `@i-cell/ids-styles` közvetlenül szeretné használni.

### 3.1 Telepítés

```bash
pnpm install @i-cell/ids-styles@^0.0.58
```

### 3.2 Angular.json Frissítése

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@i-cell/ids-styles/dist/styles.min.css",
              "node_modules/@i-cell/ids-styles/dist/tokens.min.css",
              "node_modules/@i-cell/ids-styles/dist/accessibility.min.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### 3.3 Tailwind Config frissítése

Az NPM csomag tokenokat közvetlenül betölteni:

```javascript
// tailwind.config.js - OPCIÓ 1: Manuális tokenok definiálása
module.exports = {
  theme: {
    extend: {
      colors: {
        // Manuálisan hozzáadott IDS tokenok
        'ids-brand': 'var(--ids-smc-reference-container-color-bg-brand-default)',
        'ids-success': 'var(--ids-smc-reference-container-color-bg-success-default)',
        'ids-error': 'var(--ids-smc-reference-container-color-bg-error-default)',
      }
    }
  }
};
```

### Előnyök
- ✅ Automatikus frissítések
- ✅ Verzió-kezelés egyszerű
- ✅ Kisebb repo méret

### Hátrányok
- ❌ NPM függőség szükséges
- ❌ Build időben több lépés
- ❌ Token-descoberta bonyolultabb

## 4. Tokenok NPM Csomag Generálása (Haladó)

Ha saját NPM csomagot szeretnél készíteni a tokenokból:

### 4.1 Csomag Szerkezete

```
ids-design-tokens/
├── package.json
├── dist/
│   ├── css/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   └── index.css
│   ├── js/
│   │   ├── colors.js
│   │   ├── spacing.js
│   │   └── tokens.js
│   └── README.md
└── src/
    ├── css/
    └── js/
```

### 4.2 Package.json Konfiguráció

```json
{
  "name": "@mycompany/ids-design-tokens",
  "version": "1.0.0",
  "private": true,
  "main": "dist/js/tokens.js",
  "exports": {
    ".": {
      "import": "./dist/js/tokens.js",
      "require": "./dist/js/tokens.js"
    },
    "./css": "./dist/css/index.css",
    "./colors": "./dist/js/colors.js",
    "./spacing": "./dist/js/spacing.js"
  },
  "files": ["dist"]
}
```

### 4.3 Publish a Private Registry-be

```bash
# NPM private registry-be
npm publish --registry https://npm.mycompany.com

# Vagy GitHub Package Registry
npm config set "@mycompany:registry" "https://npm.pkg.github.com"
npm config set "//npm.pkg.github.com/:_authToken" "YOUR_TOKEN"
npm publish
```

### 4.4 Felhasználás Más Projektben

```bash
pnpm install @mycompany/ids-design-tokens
```

```javascript
// tailwind.config.js
const tailwindTokens = require('@mycompany/ids-design-tokens/spacing');

module.exports = {
  theme: {
    extend: {
      spacing: tailwindTokens,
    }
  }
};
```

## 5. Tokenok Dinamikus Betöltése

### 5.1 CSS-ben Dinamikus Tokenok

```typescript
// token-loader.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenLoaderService {
  loadThemeTokens(theme: 'light' | 'dark') {
    const tokenFile = `/assets/tokens-${theme}.css`;
    
    // Meglévő theme sheet eltávolítása
    const existing = document.getElementById('theme-tokens');
    if (existing) {
      existing.remove();
    }
    
    // Új sheet hozzáadása
    const link = document.createElement('link');
    link.id = 'theme-tokens';
    link.rel = 'stylesheet';
    link.href = tokenFile;
    document.head.appendChild(link);
  }
}
```

### 5.2 JavaScript-ben Dinamikus Tokenok

```typescript
// token.service.ts
import { Injectable } from '@angular/core';
import tokens from '../assets/tokens.json';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokens = tokens;
  
  getToken(path: string): string {
    return this.tokens[path] || '';
  }
  
  setCustomToken(key: string, value: string) {
    document.documentElement.style.setProperty(key, value);
  }
  
  getAllColors() {
    return Object.entries(this.tokens)
      .filter(([key]) => key.includes('color'))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
  }
}
```

### 5.3 CSS Variable Overrides

```scss
// override-tokens.scss
:root {
  // Brand szín felüldefiniálása
  --ids-smc-reference-container-color-bg-brand-default: #FF6B6B;
  
  // Custom tokenok
  --my-custom-primary: var(--ids-smc-reference-container-color-bg-brand-default);
}

// Dark mode
@media (prefers-color-scheme: dark) {
  :root {
    --ids-smc-reference-container-color-bg-brand-default: #BB5555;
  }
}
```

## 6. Tokenok Verziózása és Frissítése

### 6.1 Version Tracking

```bash
# Készítsen snapshot a jelenlegi tokenokról
cp -r ids_css ids_css.v0.0.58

# Frissítés után összehasonlítás
diff -r ids_css.v0.0.58 ids_css/
```

### 6.2 Automatikus Frissítés Script

```bash
#!/bin/bash
# update-ids-tokens.sh

IDS_SOURCE="/path/to/akp-frontend/ids_css"
DEST="./ids_css"

echo "IDS CSS tokenok frissítése..."

# Backup
cp -r "$DEST" "$DEST.backup.$(date +%Y%m%d)"

# Másolás
cp -r "$IDS_SOURCE"/* "$DEST/"

echo "Frissítés kész! Backup: $DEST.backup.$(date +%Y%m%d)"
```

Fájlok módosítása:
```bash
chmod +x update-ids-tokens.sh
./update-ids-tokens.sh
```

## 7. Tokenok Dokumentálása

### 7.1 Token Katalógus Generálása

```typescript
// generate-token-docs.ts
import fs from 'fs';
import path from 'path';

interface TokenInfo {
  name: string;
  value: string;
  category: string;
  description?: string;
}

const tokenDocs: TokenInfo[] = [
  {
    name: 'ids-container-bg-brand-default',
    value: 'var(--ids-smc-reference-container-color-bg-brand-default)',
    category: 'color',
    description: 'Alapértelmezett brand háttérszín'
  },
  // ... további tokenok
];

fs.writeFileSync(
  'TOKENS_CATALOG.json',
  JSON.stringify(tokenDocs, null, 2)
);
```

### 7.2 Markdown Dokumentáció

```markdown
## Elérhető Tokenok

### Szín Tokenok (Color)
| Név | CSS Variable | Kategória |
|-----|-----|----------|
| ids-container-bg-brand-default | `var(--ids-smc-reference-container-color-bg-brand-default)` | Brand |
| ids-container-bg-success-default | `var(--ids-smc-reference-container-color-bg-success-default)` | Success |

### Térköz Tokenok (Spacing)
...
```

## 8. Legjobb Gyakorlatok

### Tegyél
- ✅ Verzió-szintet tartsd nyilván az `ids_css` mappához
- ✅ Készíts backup-ot frissítés előtt
- ✅ Dokumentáld az egyéni token felüldefiniálásokat
- ✅ Tesztelj a light/dark módok között

### Ne tegyél
- ❌ Közvetlenül hex értékeket ne hardcode-olj
- ❌ Ne módosítsd az automatikusan generált tokenokat
- ❌ Ne hagyd el az accessibility.min.css-t
- ❌ Ne publikálj privát tokenokat nyilvánosan

## 9. Összehasonlítás: Módszer A vs B

| Szempont | Statikus Másolat | NPM Csomag |
|----------|-----------------|-----------|
| Telepítés | Egyszerű | Közepes |
| Build sebesség | Gyorsabb | Lassabb |
| Frissítés | Manuális | Automatikus |
| Verzió-kezelés | Bonyolult | Egyszerű |
| Offline | ✅ | ❌ |
| Team közreműködés | ✅ (közvetlen másolás) | ✅ (verzió) |
| Méret | Nagyobb | Kisebb |

## Ajánlás

- **Egyedi projektek**: Módszer A (Statikus Másolat) - egyszerűbb
- **Több projekt**: Módszer B (NPM Csomag) vagy Módszer C (Private Registry) - könnyebb karbantartás
- **Enterprise**: Módszer C (Private NPM Registry) - verziókövetés és automatikus frissítések


