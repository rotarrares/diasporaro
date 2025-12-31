// ============================================
// ENUMS & CONSTANTS
// ============================================

export const COUNTRIES = {
  RO: { code: 'RO', name: 'România', flag: '🇷🇴', isEU: true },
  DE: { code: 'DE', name: 'Germania', flag: '🇩🇪', isEU: true },
  ES: { code: 'ES', name: 'Spania', flag: '🇪🇸', isEU: true },
  IT: { code: 'IT', name: 'Italia', flag: '🇮🇹', isEU: true },
  FR: { code: 'FR', name: 'Franța', flag: '🇫🇷', isEU: true },
  UK: { code: 'UK', name: 'Marea Britanie', flag: '🇬🇧', isEU: false, note: 'Brexit - reguli diferite din 2021' },
} as const;

export type CountryCode = keyof typeof COUNTRIES;

export const WORK_SITUATIONS = {
  local_employee: {
    id: 'local_employee',
    title: 'Angajat cu contract local',
    description: 'Contract de muncă cu o companie din țara unde lucrez efectiv',
    icon: '💼',
  },
  posted_worker: {
    id: 'posted_worker',
    title: 'Detașat de firmă românească',
    description: 'Trimis temporar în altă țară de angajatorul din România',
    icon: '📤',
  },
  remote_worker: {
    id: 'remote_worker',
    title: 'Lucrez remote din străinătate',
    description: 'Contract românesc, dar lucrez fizic din altă țară',
    icon: '🏠',
  },
  returning: {
    id: 'returning',
    title: 'Mă întorc în România',
    description: 'După ce am lucrat în străinătate',
    icon: '🔙',
  },
} as const;

export type WorkSituation = keyof typeof WORK_SITUATIONS;

export const DURATIONS = {
  under_3m: { id: 'under_3m', label: 'Sub 3 luni', detail: 'Ședere scurtă' },
  '3m_to_6m': { id: '3m_to_6m', label: '3 - 6 luni', detail: 'Câteva luni' },
  '6m_to_1y': { id: '6m_to_1y', label: '6 luni - 1 an', detail: 'Sub un an' },
  '1y_to_2y': { id: '1y_to_2y', label: '1 - 2 ani', detail: 'Câțiva ani' },
  over_2y: { id: 'over_2y', label: 'Peste 2 ani', detail: 'Perioadă lungă' },
  not_yet: { id: 'not_yet', label: 'Nu m-am mutat încă', detail: 'Plănuiesc să mă mut' },
} as const;

export type Duration = keyof typeof DURATIONS;

export const FAMILY_STATUSES = {
  spouse_with: { id: 'spouse_with', label: 'Soț/soție (vine cu mine)' },
  children_with: { id: 'children_with', label: 'Copii (vin cu mine)' },
  family_in_romania: { id: 'family_in_romania', label: 'Familie rămasă în România' },
  single: { id: 'single', label: 'Sunt singur/ă' },
  other: { id: 'other', label: 'Altele' },
} as const;

export type FamilyStatus = keyof typeof FAMILY_STATUSES;

export const TOPICS = {
  'social-security': {
    id: 'social-security',
    title: 'Asigurări Sociale',
    icon: '🛡️',
    color: 'blue',
  },
  healthcare: {
    id: 'healthcare',
    title: 'Sănătate',
    icon: '🏥',
    color: 'green',
  },
  taxes: {
    id: 'taxes',
    title: 'Taxe',
    icon: '💰',
    color: 'amber',
  },
  pension: {
    id: 'pension',
    title: 'Pensie',
    icon: '👴',
    color: 'purple',
  },
} as const;

export type TopicId = keyof typeof TOPICS;

// ============================================
// PROFILE TYPES
// ============================================

export interface Profile {
  id: string;
  createdAt: string;
  updatedAt: string;
  residenceCountry: CountryCode;
  workSituation: WorkSituation;
  duration: Duration;
  familyStatus: FamilyStatus[];
  destinationCountry: CountryCode;
  applicableRules: ApplicableRules;
  rulesVersion?: string;      // Version of rules engine used to calculate applicableRules
  rulesLastUpdated?: string;  // ISO date when rules were last updated
}

export interface QuizAnswers {
  residenceCountry?: CountryCode;
  workSituation?: WorkSituation;
  duration?: Duration;
  familyStatus?: FamilyStatus[];
}

// ============================================
// RULES ENGINE TYPES
// ============================================

export type CoverageStatus =
  | 'full_coverage'      // Fully covered in this country
  | 'posted_coverage'    // Covered via posting arrangement
  | 'transitioning'      // In process of switching
  | 'needs_verification' // Complex case, needs professional advice
  | 'not_covered';       // Not covered (rare)

export interface SocialSecurityRules {
  payIn: CountryCode;
  status: CoverageStatus;
  coversPension: boolean;
  coversUnemployment: boolean;
  coversHealthcare: boolean;
  coversAccidents: boolean;
  requiredForms: DocumentId[];
  warnings: string[];
  nextSteps?: ActionableStep[];
}

export interface HealthcareRules {
  primaryCountry: CountryCode;
  hasEHIC: boolean;
  canUseInRomania: boolean;
  needsS1: boolean;
  familyCovered: boolean;
  warnings: string[];
}

export interface TaxRules {
  residentCountry: CountryCode;
  hasDualObligations: boolean;
  mustFileIn: CountryCode[];
  warnings: string[];
  deadlines?: TaxDeadline[];
  nextSteps?: ActionableStep[];
}

export interface TaxDeadline {
  country: CountryCode;
  description: string;
  date: string;  // e.g., "25 mai" or "31 iulie"
  formName?: string;  // e.g., "Declarația unică"
}

export interface ActionableStep {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  deadline?: string;
  link?: string;
  category: 'tax' | 'social-security' | 'healthcare' | 'documents' | 'registration';
}

export interface PensionRules {
  contributingTo: CountryCode;
  willCumulate: boolean;
  yearsCount: boolean;
  warnings: string[];
}

export interface ApplicableRules {
  socialSecurity: SocialSecurityRules;
  healthcare: HealthcareRules;
  taxes: TaxRules;
  pension: PensionRules;
  requiredDocuments: DocumentId[];
  recommendedDocuments: DocumentId[];
  consolidatedNextSteps: ActionableStep[];
}

// ============================================
// CONTENT TYPES
// ============================================

export type DocumentId = 'a1-form' | 's1-form' | 'u1-form' | 'ehic-card' | 'tax-certificate';

export interface TopicContent {
  slug: string;
  title: string;
  topic: TopicId;
  countries: CountryCode[];
  situations: WorkSituation[];
  summary: string;
  content: string;           // MDX content
  faqs?: FAQ[];
  relatedDocuments: DocumentId[];
  sources?: Source[];
  lastUpdated: string;       // ISO date format (YYYY-MM-DD)
}

export interface DocumentContent {
  slug: DocumentId;
  title: string;
  officialName: string;
  purpose: string;
  whoNeeds: string[];
  whoDoesntNeed: string[];
  howToObtain: string[];     // Step by step
  processingTime: string;
  cost: string;
  validityPeriod: string;
  officialLink: string;
  templateLink?: string;
  content: string;           // MDX content
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  topics: TopicId[];
  countries: CountryCode[];
  situations: WorkSituation[];
}

export interface Source {
  title: string;
  url: string;
  authority: string;         // e.g., "European Commission", "CNPP Romania"
}

// ============================================
// UI STATE TYPES
// ============================================

export interface DashboardCard {
  topic: TopicId;
  title: string;
  summary: string;
  status: 'ok' | 'warning' | 'action_needed';
  countryFlag: string;
  details: string[];
  link: string;
  userContext?: {
    workSituation: string;
    duration: string;
  };
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  answers: QuizAnswers;
  isComplete: boolean;
}
