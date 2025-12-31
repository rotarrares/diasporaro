# DiasporaRO - Ghidul tău pentru munca în UE

Progressive Web App (PWA) care ajută lucrătorii români din UE să înțeleagă obligațiile lor fiscale și de asigurări sociale.

## 🎯 Stare Curentă - MVP Funcțional

### ✅ Implementat Complet

1. **Infrastructure & Core Logic**
   - ✓ Next.js 15 cu App Router și TypeScript strict
   - ✓ Tailwind CSS cu temă personalizată
   - ✓ Sistem complet de tipuri (types.ts)
   - ✓ Rules Engine - logica de business pentru toate scenariile
   - ✓ Zustand store cu persistență în localStorage
   - ✓ shadcn/ui components (Button, Card, Accordion, Badge, Progress)

2. **User Flows**
   - ✓ Landing page cu hero section și CTA
   - ✓ Quiz complet în 4 pași (țară, situație, durată, familie)
   - ✓ Dashboard personalizat cu carduri pentru fiecare topic
   - ✓ Bottom navigation (Acasă, Acte, FAQ, Setări)
   - ✓ Pagină de documente
   - ✓ Pagină de setări cu reset profile

3. **Business Logic (Rules Engine)**
   - ✓ Calculează asigurări sociale pentru 4 situații de muncă
   - ✓ Determină acoperirea medicală
   - ✓ Calculează rezidența fiscală
   - ✓ Determină contribuțiile la pensie
   - ✓ Identifică documentele necesare (A1, U1, EHIC, etc.)
   - ✓ Generează warnings personalizate

### 📋 De Implementat (Pentru MVP Complet)

1. **Content System** (Prioritate: ÎNALTĂ)
   - MDX loader pentru conținut dinamic
   - Template-uri pentru pagini de topic
   - Template-uri pentru pagini de documente
   - 48 fișiere MDX de conținut (3 țări × 4 situații × 4 topicuri)
   - 5 ghiduri pentru documente (A1, S1, U1, EHIC, Tax Certificate)

2. **FAQ System** (Prioritate: MEDIE)
   - Integrare Fuse.js pentru search
   - JSON cu 20-30 întrebări frecvente
   - UI pentru căutare și filtrare

3. **PWA Configuration** (Prioritate: JOASĂ)
   - manifest.json
   - Service worker
   - Icons (192x192, 512x512)
   - Offline support

## 🚀 Cum să Rulezi Aplicația

### Instalare

```bash
cd diaspora-ro
npm install
```

### Development

```bash
npm run dev
```

Accesează aplicația la [http://localhost:3000](http://localhost:3000)

### Build pentru Producție

```bash
npm run build
npm start
```

## 📁 Structura Proiectului

```
diaspora-ro/
├── src/
│   ├── app/
│   │   ├── (app)/                    # App layout cu bottom nav
│   │   │   ├── dashboard/page.tsx    # Dashboard principal
│   │   │   ├── documents/page.tsx    # Lista de documente
│   │   │   ├── faq/page.tsx          # FAQ (placeholder)
│   │   │   ├── setari/page.tsx       # Setări
│   │   │   └── layout.tsx
│   │   ├── onboarding/page.tsx       # Quiz flow
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── quiz/                     # Quiz components
│   │   │   ├── QuizContainer.tsx
│   │   │   ├── CountrySelector.tsx
│   │   │   ├── SituationSelector.tsx
│   │   │   ├── DurationSelector.tsx
│   │   │   └── FamilySelector.tsx
│   │   ├── dashboard/
│   │   │   ├── TopicCard.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── DocumentsList.tsx
│   │   └── layout/
│   │       └── BottomNav.tsx
│   ├── lib/
│   │   ├── types.ts                  # Toate tipurile TypeScript
│   │   ├── constants.ts              # Constante și mesaje
│   │   ├── rules-engine.ts           # Business logic (500+ linii)
│   │   └── utils.ts                  # Utility functions
│   ├── stores/
│   │   └── profileStore.ts           # Zustand store
│   └── hooks/
│       └── useProfile.ts             # Custom hook
├── public/
│   └── ...
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 💡 Workflow Utilizator

1. **Landing Page** → User citește despre aplicație
2. **Click "Începe acum"** → Redirecționare către /onboarding
3. **Quiz (4 pași)**:
   - Pas 1: Selectează țara (DE, ES, IT disponibile acum | RO, FR, UK coming Q1 2026)
   - Pas 2: Selectează situația (Angajat local, Detașat, Remote, Întoarcere)
   - Pas 3: Selectează durata (<6 luni, 6 luni-2 ani, >2 ani, Nu încă)
   - Pas 4: Selectează situația familiei (multi-select)
4. **Rules Engine** → Calculează toate regulile aplicabile
5. **Dashboard** → Afișează:
   - Header cu situația utilizatorului
   - 4 carduri pentru topicuri (Asigurări, Sănătate, Taxe, Pensie)
   - Lista de documente necesare
   - Lista de documente recomandate

## 🧠 Rules Engine - Logica de Business

Fișierul `src/lib/rules-engine.ts` conține toată logica pentru:

### Social Security Rules
- **Local Employee**: Plătește în țara de muncă
- **Posted Worker**: Plătește în România cu A1 (max 24 luni)
- **Remote Worker**: Complex, depinde de regula 25%
- **Returning**: Tranziție către sistemul românesc

### Healthcare Rules
- Determină țara principală de asigurare
- Verifică dacă are drept la EHIC
- Verifică dacă poate folosi servicii în România
- Calculează acoperirea familiei

### Tax Rules
- Determină rezidența fiscală
- Identifică obligațiile duale
- Generează warnings pentru situații complexe

### Pension Rules
- Determină unde contribuie
- Confirmă cumularea perioadelor
- Generează instrucțiuni pentru documente

## 🎨 Design System

### Culori
- **Primary**: #2D5A87 (Albastru profesional)
- **Success**: #22C55E (Verde)
- **Warning**: #F59E0B (Portocaliu)
- **Error**: #EF4444 (Roșu)

### Fonts
- Inter (Latin + Latin Extended pentru diacritice românești)

### Components
- Toate componentele folosesc shadcn/ui
- Mobile-first design
- Responsive pentru desktop

## 📱 Features Implementate

### State Management
- Zustand store cu middleware de persistență
- localStorage pentru profile anonymous
- Sincronizare automată

### Navigation
- Bottom navigation fixat pe mobile
- 4 secțiuni principale
- Active state highlighting

### Profile Management
- Salvare automată după quiz
- Reset profile din setări
- Modificare răspunsuri oricând

## 🔧 Tehnologii

- **Framework**: Next.js 15.1.0 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui
- **State**: Zustand 5.0.2
- **Icons**: Lucide React 0.462.0
- **Content**: next-mdx-remote + gray-matter (pregătit, nu folosit încă)
- **Search**: Fuse.js 7.0.0 (instalat, nu folosit încă)
- **PDF Export**: jsPDF 2.5.2 + html2canvas 1.4.1
- **Email**: Resend 4.0.1

## 📝 Următorii Pași

Pentru a finaliza MVP-ul complet:

1. **Creează sistemul de conținut MDX** (1-2 zile)
   - Implementează MDX loader
   - Creează template-uri pentru topic pages
   - Creează template-uri pentru document pages

2. **Scrie conținutul** (3-4 zile)
   - 48 fișiere MDX pentru topics (Germania, Spania, Italia disponibile acum)
   - Mai multe țări (România, Franța, UK) în Q1 2026
   - 5 ghiduri pentru documente
   - 20-30 FAQs

3. **Implementează FAQ cu search** (1 zi)
   - Integrare Fuse.js
   - UI pentru căutare
   - Filtrare după topic/țară

4. **PWA Configuration** (1 zi)
   - manifest.json
   - Service worker
   - Icons
   - Testing offline

5. **Deploy** (1 zi)
   - Vercel setup
   - Domain configuration
   - Analytics (opțional)

## 🎯 Starea Actuală: ~75% Completat

✅ Core infrastructure: 100%
✅ Business logic: 100%
✅ UI components: 95%
✅ User flows: 90%
✅ Official resources & guides: 100% (NEW!)
⏳ Content: 0%
⏳ FAQ: 0%
⏳ PWA: 0%

**Aplicația este funcțională end-to-end!** Poți completa quiz-ul și primi un dashboard personalizat cu ghiduri pas-cu-pas și resurse oficiale. Lipsește doar conținutul educațional detaliat și PWA features.

### 🆕 Nou Adăugat - Issue #5 Rezolvat
- ✅ 50+ link-uri către resurse oficiale (CNPP, ANAF, Finanzamt, etc.)
- ✅ 4 ghiduri complete pas-cu-pas (A1, Declarație fiscală RO, Înregistrare DE, Sănătate ES)
- ✅ Component UI pentru afișare resurse oficiale
- ✅ Component UI pentru ghiduri interactive
- ✅ Pagini dinamice pentru fiecare ghid
- ✅ Integrare completă în dashboard

**Detalii complete**: Vezi [ISSUE_5_SOLUTION.md](ISSUE_5_SOLUTION.md)

### 🆕 Nou Adăugat - Issue #7 Rezolvat - B2C Features
- ✅ **PDF Export** - Exportă dashboard-ul sau documentele ca PDF profesionale
- ✅ **Web Share API** - Partajează informații via email, SMS, social media (native)
- ✅ **Email Functionality** - Trimite rezumate personalizate via Resend API
- ✅ Butoane compact în dashboard header și pagini de documente
- ✅ Template-uri email HTML responsive cu design profesional
- ✅ Fallback automat la clipboard pentru browsere fără Web Share API

**Detalii complete**: Vezi [EXPORT_SHARE_FEATURES.md](EXPORT_SHARE_FEATURES.md)

## 📄 Licență

MIT License - Folosește liber pentru orice proiect!

## 🤝 Contributing

Pull requests sunt binevenite! Pentru schimbări majore, deschide un issue mai întâi.

---

**Made with ❤️ for Romanian diaspora**
