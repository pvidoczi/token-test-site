# 📖 Új IDS Design System Dokumentáció

Az akp-frontend projektből felépítve az IDS design systemet egy új Angular projektben!

## 🚀 Gyorsstartolás

**Leggyorsabb megoldás (ajánlott):**

👉 **[`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)** - *5-10 perc alatt kész!*
- Tailwind nélkül, tiszta megoldás
- Csak az IDS komponensek és tokenok
- Minimális függőségek

```bash
# Ez az ÖSSZes, ami szükséges:
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58
```

## 📚 Összes Dokumentum

### ⭐ Ajánlott Sorrend

1. **[`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)** (5-10 perc)
   - Minimális, Tailwind nélküli beállítás
   - **KEZDJ INNEN!**

2. **[`CHECKLIST_HU.md`](./CHECKLIST_HU.md)** (15 perc)
   - Ha csapatmunka: ellenőrzőlista
   - Setup validálása

3. **[`ARCHITECTURE_AND_INTEGRATION.md`](./ARCHITECTURE_AND_INTEGRATION.md)** (25-30 perc)
   - Mélyebb megértés az akp-frontend architektúrájáról
   - Best practices

### Alternatívák

- **[`DESIGN_SYSTEM_SETUP.md`](./DESIGN_SYSTEM_SETUP.md)** - Teljes útmutató Tailwind CSS-sel (30-40 perc)
- **[`QUICK_START_HU.md`](./QUICK_START_HU.md)** - Gyors indítás (5 perc)
- **[`IDS_TOKENS_HANDLING.md`](./IDS_TOKENS_HANDLING.md)** - Tokenok kezelési stratégiái (20 perc)
- **[`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)** - Teljes dokumentációs index

## 🎯 Válassz Szinted

### 🚀 I. Gyors Indítás
**Percekben szükséges, működő projekttel**

```bash
ng new my-app --package-manager=pnpm
cd my-app
```

Kövesd: **[`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)** ✅

### 🔧 II. Teljes Beállítás
**Mindent szeretnél tudni**

1. **[`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)** - Orientáció
2. **[`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)** - Alapok
3. **[`ARCHITECTURE_AND_INTEGRATION.md`](./ARCHITECTURE_AND_INTEGRATION.md)** - Részletek

### 👥 III. Csapat/Enterprise
**Sok projekttel dolgozol**

1. **[`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md)** - Alapok
2. **[`CHECKLIST_HU.md`](./CHECKLIST_HU.md)** - Standardizálás
3. **[`IDS_TOKENS_HANDLING.md`](./IDS_TOKENS_HANDLING.md)** - Tokenok stratégia
4. **[`ARCHITECTURE_AND_INTEGRATION.md`](./ARCHITECTURE_AND_INTEGRATION.md)** - Best practices

## ✨ Minimális Setup - 5 Perc

Szükséges csomágok:
```bash
pnpm install @i-cell/ids-angular@^0.2.20 @i-cell/ids-styles@^0.0.58
```

Szükséges másolás:
```bash
cp -r /path/to/akp-frontend/ids_css ./ids_css
cp -r /path/to/akp-frontend/public/fonts ./public/fonts/
```

Szükséges konfiguráció: **angular.json** csak a styles section.

Szükséges fájl: **src/styles.css** (egyszerű globális stílusok).

Kész! IDS komponensek azonnal használhatóak.

## 🎨 CSS Tokenok Közvetlen Használata

Tailwind nélkül is működnek az IDS CSS tokenok:

```html
<!-- Inline stílusok (ajánlott: komponens module CSS) -->
<div style="padding: var(--ids-container-padding-24); background-color: var(--ids-smc-reference-container-color-bg-brand-default);">
  Tartalom
</div>
```

```css
/* CSS-ben -->
.card {
  background-color: var(--ids-smc-reference-container-color-bg-light-default);
  padding: var(--ids-container-padding-24);
  border-radius: var(--ids-container-radius-md);
  color: var(--ids-smc-reference-container-color-fg-default);
}
```

## 🔗 IDS Komponensek

Közvetlenül használhatók Web Components-ként:

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <ids-button appearance="primary">Kattints</ids-button>
    <ids-input placeholder="Szöveg"></ids-input>
    <ids-badge appearance="success">Jó</ids-badge>
  `
})
export class MyComponent {}
```

## 🔀 Tailwind vs Minimális

| Szempont | Minimális | Tailwind |
|----------|-----------|----------|
| Sebesség | ⚡⚡⚡ | ⚡ |
| Komplexitás | Egyszerű | Közepeset |
| Telepítés | 1 csomag | 5+ csomag |
| Config fájlok | 1 | 3+ |
| Rugalmasság | Korlátozott | Maximális |
| IDS komponensek | ✅ | ✅ |
| CSS tokenok | ✅ | ✅ |

## ❓ Gyakori Kérdések

**Q: Tudom-e később Tailwind-et hozzáadni?**  
A: Igen! Az ids_css CSS fájlok és a Tailwind config teljesen független, könnyen integrálható később.

**Q: Milyen tokenok érhetőek el?**  
A: Szín, térköz, határköz, tipográfia. Lásd az `ids_css/smc/` mappát.

**Q: Hogyan váltok light/dark mód között?**  
A: `document.documentElement.setAttribute('theme', 'dark');`

**Q: Mi a különbség az akp-frontend-ben?**  
A: Az akp-frontend Tailwind CSS-t és SCSS-t használ, de az IDS komponensek és tokenok ugyanúgy működnek minimális beállítással is.

## 🆘 Problémamegoldás

### Az IDS komponensek nem jelennek meg
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm start
```

### A CSS tokenok nem működnek
- Ellenőrizd az `ids_css/` mappát
- Ellenőrizd az `angular.json` assets/styles szakaszát
- DevTools > Inspector > Styles (CSS variális meglétét)

### Browser cache probléma
```bash
rm -rf .angular
pnpm start --poll=2000
```

## 📞 További Segítség

| Szint | Dokumentum |
|------|-----------|
| 🚀 Gyors start | [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md) |
| 📖 Részletes | [`DESIGN_SYSTEM_SETUP.md`](./DESIGN_SYSTEM_SETUP.md) |
| 🏗️ Architektúra | [`ARCHITECTURE_AND_INTEGRATION.md`](./ARCHITECTURE_AND_INTEGRATION.md) |
| ✅ Ellenőrzés | [`CHECKLIST_HU.md`](./CHECKLIST_HU.md) |
| 🎨 Tokenok | [`IDS_TOKENS_HANDLING.md`](./IDS_TOKENS_HANDLING.md) |
| 📇 Index | [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md) |

## 🎉 Kész!

Ha követed a [`MINIMAL_SETUP_NO_TAILWIND.md`](./MINIMAL_SETUP_NO_TAILWIND.md) dokumentumot, **5-10 perc alatt** működő Angular projektd lesz az IDS design systemmel!

---

**Legyen sikeres a projektednek!** 🚀

Kérdéseid vannak? Kezdj a dokumentációval, vagy ellenőrizd a [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)-et útmutatásért.

