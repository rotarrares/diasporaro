import { CountryCode, TopicId, WorkSituation } from './types';

// ============================================
// OFFICIAL RESOURCES DATA
// ============================================

export interface OfficialResource {
  id: string;
  title: string;
  description: string;
  url: string;
  authority: string;
  language: 'ro' | 'en' | 'de' | 'es' | 'it' | 'fr' | 'multi';
  type: 'portal' | 'form' | 'guide' | 'calculator' | 'contact';
}

export interface StepByStepGuide {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: GuideStep[];
  relatedResources: string[]; // IDs of OfficialResource
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  tips?: string[];
  warnings?: string[];
  requiredDocuments?: string[];
  externalLink?: string;
}

// ============================================
// RESOURCES BY COUNTRY & TOPIC
// ============================================

export const OFFICIAL_RESOURCES: Record<CountryCode, Record<TopicId, OfficialResource[]>> = {
  RO: {
    'social-security': [
      {
        id: 'cnpp-ro',
        title: 'Casa Națională de Pensii Publice (CNPP)',
        description: 'Portal oficial pentru asigurări sociale și pensii în România',
        url: 'https://www.cnpp.ro',
        authority: 'CNPP România',
        language: 'ro',
        type: 'portal',
      },
      {
        id: 'a1-form-cnpp',
        title: 'Formular A1 - Ghid CNPP',
        description: 'Informații despre obținerea formularului A1 pentru detașați',
        url: 'https://www.cnpp.ro/formulare-ue',
        authority: 'CNPP România',
        language: 'ro',
        type: 'guide',
      },
    ],
    healthcare: [
      {
        id: 'cnas-ro',
        title: 'Casa Națională de Asigurări de Sănătate (CNAS)',
        description: 'Portal oficial pentru asigurări de sănătate în România',
        url: 'https://www.cnas.ro',
        authority: 'CNAS România',
        language: 'ro',
        type: 'portal',
      },
      {
        id: 'ehic-cnas',
        title: 'Card European de Asigurări de Sănătate (EHIC)',
        description: 'Ghid pentru obținerea cardului EHIC',
        url: 'https://www.cnas.ro/ceam',
        authority: 'CNAS România',
        language: 'ro',
        type: 'guide',
      },
    ],
    taxes: [
      {
        id: 'anaf-ro',
        title: 'Agenția Națională de Administrare Fiscală (ANAF)',
        description: 'Portal oficial pentru obligații fiscale în România',
        url: 'https://www.anaf.ro',
        authority: 'ANAF România',
        language: 'ro',
        type: 'portal',
      },
      {
        id: 'spv-anaf',
        title: 'Spațiul Privat Virtual (SPV)',
        description: 'Platformă online pentru depunerea declarațiilor fiscale',
        url: 'https://www.anaf.ro/spv',
        authority: 'ANAF România',
        language: 'ro',
        type: 'portal',
      },
      {
        id: 'declaratie-unica',
        title: 'Declarația Unică - Formular 212',
        description: 'Ghid pentru completarea declarației unice de venituri',
        url: 'https://static.anaf.ro/static/10/Anaf/Declaratii_R/Declaratie_unica_2024.pdf',
        authority: 'ANAF România',
        language: 'ro',
        type: 'form',
      },
    ],
    pension: [
      {
        id: 'cnpp-pensii',
        title: 'Ghid Pensii - CNPP',
        description: 'Informații despre sistemul de pensii din România',
        url: 'https://www.cnpp.ro/pensii',
        authority: 'CNPP România',
        language: 'ro',
        type: 'guide',
      },
    ],
  },
  DE: {
    'social-security': [
      {
        id: 'deutsche-rentenversicherung',
        title: 'Deutsche Rentenversicherung',
        description: 'Portal oficial pentru asigurări sociale și pensii în Germania',
        url: 'https://www.deutsche-rentenversicherung.de',
        authority: 'Deutsche Rentenversicherung',
        language: 'multi',
        type: 'portal',
      },
      {
        id: 'arbeitsagentur-de',
        title: 'Bundesagentur für Arbeit',
        description: 'Portal pentru asigurări de șomaj și piața muncii',
        url: 'https://www.arbeitsagentur.de',
        authority: 'Bundesagentur für Arbeit',
        language: 'multi',
        type: 'portal',
      },
    ],
    healthcare: [
      {
        id: 'gkv-de',
        title: 'GKV-Spitzenverband',
        description: 'Informații despre asigurările de sănătate în Germania',
        url: 'https://www.gkv-spitzenverband.de',
        authority: 'GKV-Spitzenverband',
        language: 'de',
        type: 'portal',
      },
      {
        id: 'krankenkassen-finder',
        title: 'Comparator Case de Asigurări',
        description: 'Găsește și compară casele de asigurări de sănătate',
        url: 'https://www.krankenkassen.de',
        authority: 'Independent',
        language: 'de',
        type: 'calculator',
      },
    ],
    taxes: [
      {
        id: 'finanzamt-de',
        title: 'Bundeszentralamt für Steuern',
        description: 'Portal oficial pentru administrarea fiscală',
        url: 'https://www.bzst.de',
        authority: 'Bundeszentralamt für Steuern',
        language: 'de',
        type: 'portal',
      },
      {
        id: 'elster-de',
        title: 'ELSTER - Declarații online',
        description: 'Platformă online pentru depunerea declarațiilor fiscale',
        url: 'https://www.elster.de',
        authority: 'Finanzamt',
        language: 'de',
        type: 'portal',
      },
    ],
    pension: [
      {
        id: 'rentenrechner-de',
        title: 'Calculator Pensie',
        description: 'Estimează pensia ta în Germania',
        url: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Online-Dienste/online-dienste.html',
        authority: 'Deutsche Rentenversicherung',
        language: 'de',
        type: 'calculator',
      },
    ],
  },
  ES: {
    'social-security': [
      {
        id: 'seg-social-es',
        title: 'Seguridad Social España',
        description: 'Portal oficial pentru asigurări sociale în Spania',
        url: 'https://www.seg-social.es',
        authority: 'Seguridad Social',
        language: 'multi',
        type: 'portal',
      },
    ],
    healthcare: [
      {
        id: 'sns-es',
        title: 'Sistema Nacional de Salud',
        description: 'Informații despre sistemul de sănătate spaniol',
        url: 'https://www.sanidad.gob.es',
        authority: 'Ministerio de Sanidad',
        language: 'es',
        type: 'portal',
      },
    ],
    taxes: [
      {
        id: 'agencia-tributaria',
        title: 'Agencia Tributaria',
        description: 'Portal oficial pentru administrarea fiscală',
        url: 'https://www.agenciatributaria.es',
        authority: 'Agencia Tributaria',
        language: 'es',
        type: 'portal',
      },
      {
        id: 'renta-web',
        title: 'Renta WEB',
        description: 'Platformă online pentru declarații fiscale',
        url: 'https://www.agenciatributaria.es/AEAT.internet/Renta.html',
        authority: 'Agencia Tributaria',
        language: 'es',
        type: 'portal',
      },
    ],
    pension: [
      {
        id: 'pension-es',
        title: 'Pensiones - Seguridad Social',
        description: 'Informații despre sistemul de pensii din Spania',
        url: 'https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores',
        authority: 'Seguridad Social',
        language: 'es',
        type: 'guide',
      },
    ],
  },
  IT: {
    'social-security': [
      {
        id: 'inps-it',
        title: 'INPS - Istituto Nazionale della Previdenza Sociale',
        description: 'Portal oficial pentru asigurări sociale în Italia',
        url: 'https://www.inps.it',
        authority: 'INPS',
        language: 'it',
        type: 'portal',
      },
    ],
    healthcare: [
      {
        id: 'ssn-it',
        title: 'Servizio Sanitario Nazionale',
        description: 'Sistemul național de sănătate italian',
        url: 'https://www.salute.gov.it',
        authority: 'Ministero della Salute',
        language: 'it',
        type: 'portal',
      },
    ],
    taxes: [
      {
        id: 'agenzia-entrate',
        title: 'Agenzia delle Entrate',
        description: 'Portal oficial pentru administrarea fiscală',
        url: 'https://www.agenziaentrate.gov.it',
        authority: 'Agenzia delle Entrate',
        language: 'it',
        type: 'portal',
      },
    ],
    pension: [
      {
        id: 'pension-inps',
        title: 'Pensioni - INPS',
        description: 'Informații despre sistemul de pensii din Italia',
        url: 'https://www.inps.it/it/it/inps-comunica/pensioni.html',
        authority: 'INPS',
        language: 'it',
        type: 'guide',
      },
    ],
  },
  FR: {
    'social-security': [
      {
        id: 'cleiss-fr',
        title: 'CLEISS - Centre des Liaisons Européennes',
        description: 'Informații despre securitate socială pentru lucrători mobili',
        url: 'https://www.cleiss.fr',
        authority: 'CLEISS',
        language: 'multi',
        type: 'portal',
      },
      {
        id: 'urssaf-fr',
        title: 'URSSAF',
        description: 'Portal pentru contribuții sociale în Franța',
        url: 'https://www.urssaf.fr',
        authority: 'URSSAF',
        language: 'fr',
        type: 'portal',
      },
    ],
    healthcare: [
      {
        id: 'ameli-fr',
        title: 'Ameli - Assurance Maladie',
        description: 'Portal pentru asigurări de sănătate în Franța',
        url: 'https://www.ameli.fr',
        authority: 'Assurance Maladie',
        language: 'fr',
        type: 'portal',
      },
    ],
    taxes: [
      {
        id: 'impots-gouv-fr',
        title: 'impots.gouv.fr',
        description: 'Portal oficial pentru administrarea fiscală',
        url: 'https://www.impots.gouv.fr',
        authority: 'Direction générale des Finances publiques',
        language: 'fr',
        type: 'portal',
      },
    ],
    pension: [
      {
        id: 'lassuranceretraite-fr',
        title: "L'Assurance retraite",
        description: 'Informații despre sistemul de pensii din Franța',
        url: 'https://www.lassuranceretraite.fr',
        authority: "L'Assurance retraite",
        language: 'fr',
        type: 'portal',
      },
    ],
  },
  UK: {
    'social-security': [
      {
        id: 'gov-uk-ni',
        title: 'National Insurance - GOV.UK',
        description: 'Informații despre National Insurance în UK',
        url: 'https://www.gov.uk/national-insurance',
        authority: 'GOV.UK',
        language: 'en',
        type: 'portal',
      },
    ],
    healthcare: [
      {
        id: 'nhs-uk',
        title: 'NHS - National Health Service',
        description: 'Sistemul național de sănătate din UK',
        url: 'https://www.nhs.uk',
        authority: 'NHS',
        language: 'en',
        type: 'portal',
      },
    ],
    taxes: [
      {
        id: 'hmrc-uk',
        title: 'HMRC - HM Revenue & Customs',
        description: 'Portal oficial pentru administrarea fiscală',
        url: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
        authority: 'HMRC',
        language: 'en',
        type: 'portal',
      },
      {
        id: 'self-assessment-uk',
        title: 'Self Assessment',
        description: 'Ghid pentru declarații fiscale personale',
        url: 'https://www.gov.uk/self-assessment-tax-returns',
        authority: 'HMRC',
        language: 'en',
        type: 'guide',
      },
    ],
    pension: [
      {
        id: 'state-pension-uk',
        title: 'State Pension - GOV.UK',
        description: 'Informații despre pensia de stat din UK',
        url: 'https://www.gov.uk/state-pension',
        authority: 'GOV.UK',
        language: 'en',
        type: 'guide',
      },
    ],
  },
};

// ============================================
// STEP-BY-STEP GUIDES
// ============================================

export const STEP_BY_STEP_GUIDES: Record<string, StepByStepGuide> = {
  'obtain-a1-form': {
    id: 'obtain-a1-form',
    title: 'Cum obții formularul A1 din România',
    description: 'Ghid pas-cu-pas pentru obținerea certificatului A1 de la CNPP',
    estimatedTime: '2-4 săptămâni',
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        title: 'Verifică dacă ai nevoie de A1',
        description: 'Formularul A1 este necesar dacă: ești detașat temporar în altă țară UE (max 24 luni), lucrezi în mai multe țări UE simultan, sau ești lucrător transfrontalier.',
        tips: [
          'Dacă lucrezi permanent cu contract local în altă țară, NU ai nevoie de A1',
          'Pentru muncă remote, verifică regula 25% (dacă lucrezi >25% din timp în România)',
        ],
      },
      {
        stepNumber: 2,
        title: 'Pregătește documentele necesare',
        description: 'Vei avea nevoie de: contract de muncă sau decizie de detașare, adeverință de salariat, dovada plății contribuțiilor în România (ex: declarații CAS), copie CI/pașaport.',
        requiredDocuments: [
          'Contract de muncă / Decizie de detașare',
          'Adeverință de salariat',
          'Dovada plății contribuțiilor (declarații CAS)',
          'Copie CI sau pașaport',
        ],
        tips: [
          'Asigură-te că toate documentele sunt recente (max 3 luni)',
          'Dacă lucrezi ca PFA/SRL, ai nevoie și de certificat de înregistrare',
        ],
      },
      {
        stepNumber: 3,
        title: 'Depune cererea la CNPP',
        description: 'Poți depune cererea online prin portal CNPP, personal la Casa de Pensii a sectorului/județului, sau prin poștă cu confirmare de primire.',
        externalLink: 'https://www.cnpp.ro/formulare-ue',
        tips: [
          'Varianta online este cea mai rapidă',
          'Păstrează dovada depunerii cererii',
        ],
      },
      {
        stepNumber: 4,
        title: 'Așteaptă procesarea cererii',
        description: 'CNPP are la dispoziție 2 luni pentru a emite certificatul A1. În realitate, de obicei durează 2-4 săptămâni.',
        warnings: [
          'Nu călători în țara de detașare înainte de a primi A1 (riști să plătești contribuții duble)',
          'Dacă e urgent, poți solicita procesare accelerată cu justificare',
        ],
      },
      {
        stepNumber: 5,
        title: 'Primește și verifică certificatul',
        description: 'Vei primi certificatul A1 prin poștă sau îl poți descărca din portal. Verifică că datele sunt corecte: perioada de valabilitate, țara de detașare, datele tale personale.',
        tips: [
          'Fă mai multe copii ale certificatului',
          'Păstrează și versiunea digitală',
          'Verifică data de expirare și prelungește la timp dacă e necesar',
        ],
      },
    ],
    relatedResources: ['cnpp-ro', 'a1-form-cnpp'],
  },
  'register-tax-germany': {
    id: 'register-tax-germany',
    title: 'Înregistrare fiscală în Germania',
    description: 'Ghid pentru înregistrarea la Finanzamt și obținerea Steueridentifikationsnummer',
    estimatedTime: '4-6 săptămâni',
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        title: 'Înregistrează-te la Anmeldung (reședință)',
        description: 'Înainte de înregistrarea fiscală, trebuie să te înregistrezi la primărie (Bürgeramt) cu reședința ta în Germania.',
        requiredDocuments: ['Pașaport/CI', 'Contract de închiriere (Mietvertrag)', 'Formular Anmeldung completat'],
        tips: [
          'Programează-te din timp, termenele pot fi peste 2-3 săptămâni',
          'După Anmeldung, vei primi Steuer-ID automat prin poștă în 2-3 săptămâni',
        ],
      },
      {
        stepNumber: 2,
        title: 'Primește Steueridentifikationsnummer',
        description: 'După înregistrarea reședinței, Finanzamt îți va trimite automat Steuer-ID (numărul de identificare fiscală) prin poștă.',
        warnings: [
          'Dacă nu primești în 4 săptămâni, contactează Bundeszentralamt für Steuern',
        ],
      },
      {
        stepNumber: 3,
        title: 'Completează formular pentru clasa de impozitare',
        description: 'Dacă ești angajat, trebuie să declari clasa de impozitare (Steuerklasse): I pentru necăsătorit, III/V pentru căsătorit, etc.',
        externalLink: 'https://www.elster.de',
        tips: [
          'Poți schimba clasa de impozitare o dată pe an',
          'Pentru cupluri căsătorite, clasa III/V de obicei optimizează impozitul',
        ],
      },
      {
        stepNumber: 4,
        title: 'Comunică Steuer-ID angajatorului',
        description: 'Angajatorul are nevoie de Steuer-ID pentru a calcula corect impozitul și a-l reține din salariu.',
        warnings: [
          'Până primești Steuer-ID, angajatorul va reține impozit la clasa VI (cea mai mare rată)',
        ],
      },
    ],
    relatedResources: ['finanzamt-de', 'elster-de'],
  },
  'register-healthcare-spain': {
    id: 'register-healthcare-spain',
    title: 'Înregistrare în sistemul de sănătate spaniol',
    description: 'Ghid pentru obținerea Tarjeta Sanitaria (card de sănătate) în Spania',
    estimatedTime: '2-4 săptămâni',
    difficulty: 'easy',
    steps: [
      {
        stepNumber: 1,
        title: 'Obține NIE (Número de Identidad de Extranjero)',
        description: 'NIE este numărul de identificare pentru străini, necesar pentru toate procedurile în Spania.',
        requiredDocuments: ['Pașaport', 'Formular EX-15', 'Dovada motivului (contract de muncă)'],
        externalLink: 'https://www.inclusion.gob.es/extranjeria',
      },
      {
        stepNumber: 2,
        title: 'Înregistrează-te în sistemul de Seguridad Social',
        description: 'Dacă ești angajat, angajatorul te va înregistra automat. Dacă ești independent, trebuie să te înregistrezi singur.',
        tips: [
          'Primești numărul de Seguridad Social (NSS) imediat după înregistrare',
        ],
      },
      {
        stepNumber: 3,
        title: 'Solicită Tarjeta Sanitaria',
        description: 'Mergi la Centro de Salud (centrul de sănătate) din zona ta și solicită cardul de sănătate.',
        requiredDocuments: ['NIE', 'Número de Seguridad Social', 'Empadronamiento (dovada reședinței)'],
        tips: [
          'Procesarea durează 7-14 zile',
          'Până primești cardul, poți folosi dovada de înregistrare',
        ],
      },
    ],
    relatedResources: ['seg-social-es', 'sns-es'],
  },
  'file-ro-tax-return': {
    id: 'file-ro-tax-return',
    title: 'Cum depui declarația unică în România',
    description: 'Ghid complet pentru completarea și depunerea Declarației Unice (formular 212) la ANAF',
    estimatedTime: '1-2 ore',
    difficulty: 'medium',
    steps: [
      {
        stepNumber: 1,
        title: 'Creează cont în Spațiul Privat Virtual (SPV)',
        description: 'Dacă nu ai deja cont SPV, trebuie să te înregistrezi pe portalul ANAF. Vei avea nevoie de CNP, adresă de email și telefon.',
        externalLink: 'https://www.anaf.ro/spv',
        tips: [
          'Înregistrarea durează ~5 minute',
          'Vei primi cod de activare prin SMS',
          'Păstrează parola în siguranță - o vei folosi anual',
        ],
      },
      {
        stepNumber: 2,
        title: 'Descarcă formularul 212 (Declarația unică)',
        description: 'Poți completa declarația online în SPV sau poți descărca formularul PDF și să îl completezi manual.',
        externalLink: 'https://static.anaf.ro/static/10/Anaf/Declaratii_R/Declaratie_unica_2024.pdf',
        tips: [
          'Varianta online din SPV este mai simplă - calculează automat',
          'Dacă completezi PDF, verifică versiunea pentru anul corect',
        ],
      },
      {
        stepNumber: 3,
        title: 'Completează secțiunile relevante',
        description: 'Declarația unică are mai multe secțiuni: venituri din salarii, venituri din chirii, dividende, alte venituri. Completează doar ce se aplică în cazul tău.',
        requiredDocuments: [
          'Adeverință de salariat (dacă ai venituri din România)',
          'Certificate de venituri din străinătate',
          'Contracte de închiriere (dacă ai chirii)',
          'Dovezi de plată a impozitelor în străinătate',
        ],
        tips: [
          'Secțiunea I: Date de identificare (CNP, adresă)',
          'Secțiunea II: Venituri din salarii și pensii',
          'Secțiunea III: Venituri din chirii (dacă ai)',
          'Bifează opțiunea pentru deducerea impozitului plătit în străinătate (evitare dublă impunere)',
        ],
        warnings: [
          'Declară TOATE veniturile, inclusiv cele din străinătate',
          'Verifică dacă România are tratat de evitare a dublei impuneri cu țara unde lucrezi',
        ],
      },
      {
        stepNumber: 4,
        title: 'Anexează documente justificative',
        description: 'Pentru veniturile din străinătate, trebuie să anexezi certificate de venituri și dovezi de plată a impozitelor.',
        requiredDocuments: [
          'Certificate de rezidență fiscală din țara străină',
          'Adeverințe de venituri traduse (nu e obligatoriu să fie legalizate)',
          'Dovezi de plată a impozitelor în străinătate',
        ],
        tips: [
          'Traducerile pot fi făcute de tine - nu trebuie să fie legalizate pentru anexe',
          'Scanează documentele clar și în format PDF',
        ],
      },
      {
        stepNumber: 5,
        title: 'Verifică calculele și depune declarația',
        description: 'Revizuiește toate datele, verifică calculele automate, și depune declarația prin SPV sau la ghișeu.',
        warnings: [
          'Deadline: 25 mai pentru anul fiscal precedent',
          'Penalități pentru depunere târzie: 50-500 RON',
          'După depunere, ai 30 zile să plătești impozitul (dacă e cazul)',
        ],
      },
      {
        stepNumber: 6,
        title: 'Plătește impozitul datorat (dacă e cazul)',
        description: 'Dacă după deducerea impozitului plătit în străinătate mai ai de plătit în România, transferă suma până la 25 iulie (60 zile de la depunere).',
        externalLink: 'https://www.anaf.ro/modalitati-de-plata',
        tips: [
          'Plata se poate face online din SPV cu cardul',
          'Sau la ghișeele Trezoreriei Statului',
          'Păstrează dovada plății',
        ],
      },
    ],
    relatedResources: ['anaf-ro', 'spv-anaf', 'declaratie-unica'],
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getResourcesByCountryAndTopic(
  country: CountryCode,
  topic: TopicId
): OfficialResource[] {
  return OFFICIAL_RESOURCES[country]?.[topic] || [];
}

export function getGuideById(guideId: string): StepByStepGuide | undefined {
  return STEP_BY_STEP_GUIDES[guideId];
}

export function getRelatedResources(guideId: string): OfficialResource[] {
  const guide = STEP_BY_STEP_GUIDES[guideId];
  if (!guide) return [];

  const resources: OfficialResource[] = [];
  guide.relatedResources.forEach((resourceId) => {
    // Search through all countries and topics
    Object.values(OFFICIAL_RESOURCES).forEach((countryResources) => {
      Object.values(countryResources).forEach((topicResources) => {
        const found = topicResources.find((r) => r.id === resourceId);
        if (found) resources.push(found);
      });
    });
  });

  return resources;
}
