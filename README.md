# Typing Master

A Typing Master egy böngészőben futó gépelési gyakorló alkalmazás. A felhasználó különböző nyelvű és nehézségű szövegek közül választhat, beállíthatja a teszt időtartamát, majd valós időben követheti a sebességét és a pontosságát.

## Funkciók

- Magyar és angol gyakorlószövegek
- Három nehézségi szint: könnyű, közepes és nehéz
- Választható időtartamok: 15, 30, 60 és 120 másodperc
- Visszaszámláló, amely az első karakter leütésekor indul
- Valós idejű WPM-sebességmérés
- Valós idejű pontosságmérés
- Helyes, hibás és még be nem gépelt karakterek vizuális jelölése
- Backspace támogatás a korábbi karakter javításához
- A következő karaktert jelző virtuális billentyűzet
- Teszt végi eredményablak
- Teszt újraindítása és szöveg- vagy időtartamváltás
- Reszponzív felület Tailwind CSS-sel
- Helyi hálózaton is futtatható fejlesztői szerver

## Technológiák

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- ESLint

## Követelmények

- Node.js 20 vagy újabb
- npm

## Telepítés

1. Klónozd a repository-t:

   ```bash
   git clone https://github.com/dajkagabi/typing-master.git
   cd typing-master
   ```

2. Telepítsd a függőségeket:

   ```bash
   npm install
   ```

## Fejlesztői futtatás

Indítsd el a fejlesztői szervert:

```bash
npm run dev
```

Az alkalmazás alapértelmezett címe:

```text
http://localhost:3000
```

A fejlesztői oldal automatikusan frissül a forrásfájlok módosításakor.

### Elérés helyi hálózatról

Ha az alkalmazást ugyanazon a hálózaton lévő másik eszközről is meg szeretnéd nyitni, indítsd a szervert minden hálózati interfészen:

Ezután a számítógép helyi IP-címével nyithatod meg, például:

```text
http://192.168.0.112:3000
```

Ha a cím nem érhető el, ellenőrizd a Windows tűzfal beállításait, és engedélyezd a Node.js számára a privát hálózati hozzáférést.

## Használat

1. Válassz egy tesztidőtartamot.
2. Válassz egy magyar vagy angol gyakorlószöveget.
3. Kezdd el begépelni a megjelenített szöveget.
4. A visszaszámláló az első karakter leütésekor indul.
5. Figyeld a WPM-et, a pontosságot és a hátralévő időt.
6. Hibás karakter esetén a karakter pirosan jelenik meg.
7. A Backspace billentyűvel visszaléphetsz és javíthatod az előző karaktert.
8. A teszt végén az eredményablak megmutatja a teljesítményedet.
