import { CountryCode, WorkSituation, DocumentId } from './types';

// ============================================
// INFORMATION METADATA
// ============================================

export const INFO_LAST_UPDATED = '2025-12-30'; // ISO date format
export const INFO_VERSION = '1.0.0';
export const DISCLAIMER_TEXT = 'Informațiile din această aplicație sunt cu scop informativ general și au fost actualizate la ' + INFO_LAST_UPDATED + '. Regulile fiscale și de asigurări sociale pot să se schimbe. Pentru situații specifice, consultați întotdeauna un specialist sau autoritățile competente.';

// ============================================
// ERROR MESSAGES (Romanian)
// ============================================

export const ERROR_MESSAGES = {
  // Quiz errors
  INCOMPLETE_QUIZ: 'Te rugăm să răspunzi la toate întrebările.',
  INVALID_COUNTRY: 'Te rugăm să selectezi o țară validă.',

  // Profile errors
  PROFILE_NOT_FOUND: 'Nu am găsit profilul tău. Te rugăm să refaci chestionarul.',
  PROFILE_SAVE_FAILED: 'Nu am putut salva profilul. Încearcă din nou.',

  // Content errors
  CONTENT_NOT_FOUND: 'Conținutul nu a fost găsit.',
  CONTENT_LOAD_FAILED: 'Nu am putut încărca conținutul. Încearcă din nou.',

  // Network errors
  NETWORK_ERROR: 'Eroare de conexiune. Verifică internetul și încearcă din nou.',

  // Generic
  GENERIC_ERROR: 'Ceva nu a mers bine. Te rugăm să încerci din nou.',
};

// ============================================
// SUCCESS MESSAGES (Romanian)
// ============================================

export const SUCCESS_MESSAGES = {
  PROFILE_SAVED: 'Profilul tău a fost salvat!',
  FEEDBACK_SENT: 'Mulțumim pentru feedback!',
  SETTINGS_UPDATED: 'Setările au fost actualizate.',
};

// ============================================
// COUNTRY HELPERS
// ============================================

export const COUNTRY_NAMES: Record<CountryCode, string> = {
  RO: 'România',
  DE: 'Germania',
  ES: 'Spania',
  IT: 'Italia',
  FR: 'Franța',
  UK: 'Marea Britanie',
};

export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  RO: '🇷🇴',
  DE: '🇩🇪',
  ES: '🇪🇸',
  IT: '🇮🇹',
  FR: '🇫🇷',
  UK: '🇬🇧',
};

// ============================================
// WORK SITUATION HELPERS
// ============================================

export const SITUATION_NAMES: Record<WorkSituation, string> = {
  local_employee: 'Angajat local',
  posted_worker: 'Detașat',
  remote_worker: 'Remote',
  returning: 'Întoarcere',
};

// ============================================
// DOCUMENT INFO
// ============================================

export const DOCUMENT_INFO: Record<DocumentId, { title: string; icon: string }> = {
  'a1-form': { title: 'Formular A1', icon: '📄' },
  's1-form': { title: 'Formular S1', icon: '📋' },
  'u1-form': { title: 'Formular U1', icon: '📝' },
  'ehic-card': { title: 'Card European de Sănătate (EHIC)', icon: '💳' },
  'tax-certificate': { title: 'Certificat Fiscal', icon: '🧾' },
};

// ============================================
// DOCUMENT EXPLANATIONS (Tooltips & Glossary)
// ============================================

export const DOCUMENT_EXPLANATIONS: Record<DocumentId, string> = {
  'a1-form': 'Certificatul A1 (Formular portabil A1) dovedește că plătești contribuții de asigurări sociale într-o anumită țară UE și te scutește de plata dublă. Necesar pentru detașați și lucrători transfrontalieri.',
  's1-form': 'Formularul S1 oferă dreptul de a te înscrie în sistemul de asigurări de sănătate al unei țări UE când locuiești acolo, dar ești asigurat în altă țară (ex: pensionari, lucrători transfrontalieri).',
  'u1-form': 'Formularul U1 (fostul E301) confirmă perioadele de asigurare pentru șomaj în alte țări UE. Necesar dacă ai lucrat în mai multe țări și vrei să cumulezi perioadele pentru indemnizație de șomaj.',
  'ehic-card': 'Cardul European de Asigurări de Sănătate (EHIC - European Health Insurance Card) îți permite accesul la servicii medicale necesare din punct de vedere medical în timpul șederii temporare în alt stat UE, în aceleași condiții ca și rezidentii acelei țări.',
  'tax-certificate': 'Certificatul de rezidență fiscală dovedește în ce țară ești considerat rezident fiscal. Necesar pentru aplicarea convențiilor de evitare a dublei impuneri între țări.',
};

// ============================================
// COMMON ABBREVIATIONS GLOSSARY
// ============================================

export const GLOSSARY = {
  EHIC: {
    full: 'European Health Insurance Card',
    ro: 'Card European de Asigurări de Sănătate',
    explanation: 'Card care îți permite accesul la servicii medicale de urgență în țările UE în aceleași condiții ca și rezidentii locali.',
  },
  A1: {
    full: 'Portable Document A1',
    ro: 'Formular portabil A1',
    explanation: 'Certificat care dovedește că plătești contribuții sociale într-o anumită țară UE și te scutește de plata dublă în altă țară.',
  },
  S1: {
    full: 'Entitlement Document S1',
    ro: 'Formular S1',
    explanation: 'Document care îți acordă dreptul de a te înregistra în sistemul de sănătate al unei țări UE când locuiești acolo, dar ești asigurat în alta.',
  },
  U1: {
    full: 'Unemployment Insurance Document U1',
    ro: 'Formular U1 (fostul E301)',
    explanation: 'Confirmă perioadele de asigurare pentru șomaj în alte țări UE pentru a cumula perioadele.',
  },
};

// ============================================
// LOCAL STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  PROFILE: 'diaspora-profile',
  QUIZ_PROGRESS: 'diaspora-quiz-progress',
  LAST_VISIT: 'diaspora-last-visit',
};

// ============================================
// QUIZ CONFIGURATION
// ============================================

export const QUIZ_CONFIG = {
  TOTAL_STEPS: 4,
  STEP_LABELS: [
    'Unde locuiești?',
    'Care e situația ta?',
    'De cât timp?',
    'Familie',
  ],
};

// ============================================
// NAVIGATION ITEMS
// ============================================

export const NAV_ITEMS = [
  { id: 'home', label: 'Acasă', icon: '🏠', href: '/dashboard' },
  { id: 'documents', label: 'Acte', icon: '📄', href: '/documents' },
  { id: 'faq', label: 'FAQ', icon: '❓', href: '/faq' },
  { id: 'settings', label: 'Setări', icon: '⚙️', href: '/setari' },
] as const;

// ============================================
// PENSION VESTING INFORMATION
// ============================================

export const PENSION_VESTING: Record<CountryCode, { minimumYears: number; fullPension: number; note: string }> = {
  RO: {
    minimumYears: 15,
    fullPension: 35,
    note: 'Minim 15 ani stagiu pentru pensie, 35 ani pentru pensie completă',
  },
  DE: {
    minimumYears: 5,
    fullPension: 45,
    note: 'Minim 5 ani pentru pensie de bază, 45 ani pentru pensie completă fără penalizare',
  },
  ES: {
    minimumYears: 15,
    fullPension: 37,
    note: 'Minim 15 ani cotizare (2 ani în ultimii 15), 37 ani pentru 100% pensie',
  },
  IT: {
    minimumYears: 20,
    fullPension: 42,
    note: 'Minim 20 ani contributii, 42 ani pentru pensie anticipată',
  },
  FR: {
    minimumYears: 10,
    fullPension: 43,
    note: 'Minim 10 trimestre pentru pensie, 172 trimestre (43 ani) pentru pensie completă',
  },
  UK: {
    minimumYears: 10,
    fullPension: 35,
    note: 'Minim 10 ani NI pentru pensie de stat, 35 ani pentru pensie completă',
  },
};

// ============================================
// SOCIAL SECURITY CONTRIBUTION RATES
// ============================================

export const CONTRIBUTION_RATES: Record<CountryCode, { pension: string; unemployment: string; health: string }> = {
  RO: {
    pension: '~25% (angajator + angajat)',
    unemployment: '2.25% (0.75% angajat + 1.5% angajator)',
    health: '~10% (angajat)',
  },
  DE: {
    pension: '18.6% (jumătate angajat, jumătate angajator)',
    unemployment: '2.6% (împărțit egal)',
    health: '~14.6% + 1.7% îngrijire pe termen lung (împărțit egal)',
  },
  ES: {
    pension: '~28.3% (23.6% angajator + 4.7% angajat)',
    unemployment: '~7.05% (5.5% angajator + 1.55% angajat)',
    health: 'Inclus în Social Security (~30% total)',
  },
  IT: {
    pension: '33% (23.81% angajator + 9.19% angajat)',
    unemployment: '~1.61% (angajator)',
    health: 'Finanțat din impozite generale',
  },
  FR: {
    pension: '~27.05% total (angajator + angajat)',
    unemployment: '~4.05% (angajator)',
    health: '~13% (angajator) + 0.75% (angajat)',
  },
  UK: {
    pension: '13.8% (angajator) + 12% (angajat până la £50,270)',
    unemployment: 'Inclus în National Insurance',
    health: 'Finanțat din National Insurance',
  },
};
