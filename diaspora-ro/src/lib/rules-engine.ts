import {
  Profile,
  QuizAnswers,
  CountryCode,
  WorkSituation,
  Duration,
  FamilyStatus,
  ApplicableRules,
  SocialSecurityRules,
  HealthcareRules,
  TaxRules,
  PensionRules,
  DocumentId,
  DashboardCard,
  WORK_SITUATIONS,
  DURATIONS,
} from './types';
import { PENSION_VESTING, INFO_LAST_UPDATED, INFO_VERSION } from './constants';

// Generate unique ID for client-side profiles
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// MAIN FUNCTION: Create profile from quiz answers
// ============================================

export function createProfileFromQuiz(answers: QuizAnswers): Profile {
  const {
    residenceCountry,
    workSituation,
    duration,
    familyStatus,
  } = answers;

  if (!residenceCountry || !workSituation || !duration || !familyStatus) {
    throw new Error('Incomplete quiz answers');
  }

  // Determine destination country (where they work)
  const destinationCountry = determineDestinationCountry(residenceCountry, workSituation);

  // Calculate all applicable rules
  const applicableRules = calculateRules({
    residenceCountry,
    workSituation,
    duration,
    familyStatus,
    destinationCountry,
  });

  const now = new Date().toISOString();

  return {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    residenceCountry,
    workSituation,
    duration,
    familyStatus,
    destinationCountry,
    applicableRules,
    rulesVersion: INFO_VERSION,
    rulesLastUpdated: INFO_LAST_UPDATED,
  };
}

// ============================================
// DESTINATION COUNTRY LOGIC
// ============================================

function determineDestinationCountry(
  residenceCountry: CountryCode,
  workSituation: WorkSituation
): CountryCode {
  // For returning migrants, destination is Romania
  if (workSituation === 'returning') {
    return 'RO';
  }

  // For others living abroad, that's their destination
  if (residenceCountry !== 'RO') {
    return residenceCountry;
  }

  // Living in Romania but working elsewhere (posted/remote)
  // This would need additional info, but for MVP we'll flag it
  return 'RO';
}

// ============================================
// CALCULATE ALL RULES
// ============================================

interface RulesInput {
  residenceCountry: CountryCode;
  workSituation: WorkSituation;
  duration: Duration;
  familyStatus: FamilyStatus[];
  destinationCountry: CountryCode;
}

function calculateRules(input: RulesInput): ApplicableRules {
  const socialSecurity = calculateSocialSecurity(input);
  const healthcare = calculateHealthcare(input);
  const taxes = calculateTaxes(input);
  const pension = calculatePension(input);

  // Collect all required and recommended documents
  const requiredDocuments = collectRequiredDocuments(socialSecurity, healthcare);
  const recommendedDocuments = collectRecommendedDocuments(input);

  // Consolidate all next steps from different rules
  const consolidatedNextSteps = consolidateNextSteps(socialSecurity, taxes);

  return {
    socialSecurity,
    healthcare,
    taxes,
    pension,
    requiredDocuments,
    recommendedDocuments,
    consolidatedNextSteps,
  };
}

// ============================================
// CONSOLIDATE NEXT STEPS
// ============================================

function consolidateNextSteps(
  socialSecurity: SocialSecurityRules,
  taxes: TaxRules
): import('./types').ActionableStep[] {
  const allSteps: import('./types').ActionableStep[] = [];

  // Add social security next steps
  if (socialSecurity.nextSteps) {
    allSteps.push(...socialSecurity.nextSteps);
  }

  // Add tax next steps
  if (taxes.nextSteps) {
    allSteps.push(...taxes.nextSteps);
  }

  // Sort by priority: urgent > high > medium > low
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  allSteps.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return allSteps;
}

// ============================================
// SOCIAL SECURITY RULES
// ============================================

function calculateSocialSecurity(input: RulesInput): SocialSecurityRules {
  const { residenceCountry, workSituation, duration } = input;

  // LOCAL EMPLOYEE: Pays in work country
  if (workSituation === 'local_employee') {
    return {
      payIn: residenceCountry,
      status: 'full_coverage',
      coversPension: true,
      coversUnemployment: true,
      coversHealthcare: true,
      coversAccidents: true,
      requiredForms: [],
      warnings: [],
    };
  }

  // POSTED WORKER: Stays in Romanian system (with A1)
  if (workSituation === 'posted_worker') {
    const isOverLimit = duration === 'over_2y';
    const isApproachingLimit = duration === '1y_to_2y';
    const isShortPosting = duration === 'under_3m' || duration === '3m_to_6m';

    const warnings: string[] = [];
    const nextSteps: import('./types').ActionableStep[] = [];

    if (isOverLimit) {
      warnings.push('Detașarea peste 24 luni necesită tranziție la sistemul local');
      warnings.push('Formularul A1 expiră după 24 luni');
      nextSteps.push({
        id: 'transition-to-local-system',
        title: 'Tranzițiază la sistemul de asigurări locale',
        description: 'Detașarea ta a depășit 24 luni. Trebuie să începi să plătești contribuții în țara gazdă.',
        priority: 'urgent',
        category: 'social-security',
        link: '/document/a1-form',
      });
    } else if (isApproachingLimit) {
      warnings.push('Dacă detașarea depășește 24 luni, vei trece la sistemul local');
      nextSteps.push({
        id: 'monitor-posting-duration',
        title: 'Monitorizează durata detașării',
        description: 'Dacă detașarea va depăși 24 luni, va trebui să aplici pentru prelungirea A1 sau să tranzițiezi la sistemul local.',
        priority: 'medium',
        category: 'social-security',
      });
    }

    // Always need to obtain A1 form - make it urgent for short postings
    const a1Priority = isShortPosting ? 'urgent' :
                       isOverLimit ? 'medium' : 'high';

    nextSteps.push({
      id: 'obtain-a1-form',
      title: 'Obține formularul A1',
      description: 'Solicită formularul A1 de la CNPP înainte de plecare sau imediat după sosire. Acest document dovedește că plătești contribuții în România și previne dublarea contribuțiilor.',
      priority: a1Priority,
      category: 'documents',
      link: '/guides/obtain-a1-form',
    });

    return {
      payIn: 'RO',
      status: isOverLimit ? 'transitioning' : 'posted_coverage',
      coversPension: true,
      coversUnemployment: true,
      coversHealthcare: true,
      coversAccidents: true,
      requiredForms: ['a1-form'],
      warnings,
      nextSteps,
    };
  }

  // REMOTE WORKER: Complex - usually pays where they live
  if (workSituation === 'remote_worker') {
    const countrySSGuidance: Record<CountryCode, string> = {
      RO: 'Contactează CNPP (Casa Națională de Pensii) pentru determinarea legislației aplicabile',
      DE: 'Contactează Deutsche Rentenversicherung pentru A1/aplicabilitate',
      ES: 'Contactează Seguridad Social pentru determinarea cotizațiilor',
      IT: 'Contactează INPS (Istituto Nazionale della Previdenza Sociale)',
      FR: 'Contactează CLEISS pentru legislația de securitate socială aplicabilă',
      UK: 'Contactează HMRC National Insurance pentru determinarea contribuțiilor',
    };

    // If working >25% in residence country, usually insured there
    return {
      payIn: residenceCountry,
      status: 'needs_verification',
      coversPension: true,
      coversUnemployment: true,
      coversHealthcare: true,
      coversAccidents: true,
      requiredForms: ['a1-form'],
      warnings: [
        'Regula 25%: dacă lucrezi >25% din timp în țara de reședință, de obicei plătești contribuții acolo',
        countrySSGuidance[residenceCountry] || 'Contactează autoritatea de asigurări sociale',
        'Solicită formularul A1 pentru a clarifica unde plătești contribuții',
      ],
    };
  }

  // RETURNING: Transitioning to Romanian system
  if (workSituation === 'returning') {
    return {
      payIn: 'RO',
      status: 'transitioning',
      coversPension: true,
      coversUnemployment: true,
      coversHealthcare: true,
      coversAccidents: true,
      requiredForms: ['u1-form'],
      warnings: [
        'Obține formularul U1 înainte de plecare pentru transfer șomaj',
      ],
    };
  }

  // Default fallback
  return {
    payIn: residenceCountry,
    status: 'needs_verification',
    coversPension: true,
    coversUnemployment: true,
    coversHealthcare: true,
    coversAccidents: true,
    requiredForms: [],
    warnings: ['Situație necunoscută - consultă un specialist'],
  };
}

// ============================================
// HEALTHCARE RULES
// ============================================

function calculateHealthcare(input: RulesInput): HealthcareRules {
  const { residenceCountry, workSituation, familyStatus } = input;
  const hasSpouse = familyStatus.includes('spouse_with');
  const hasChildren = familyStatus.includes('children_with');
  const hasFamily = hasSpouse || hasChildren;
  const hasFamilyInRomania = familyStatus.includes('family_in_romania');

  // LOCAL EMPLOYEE abroad
  if (workSituation === 'local_employee' && residenceCountry !== 'RO') {
    const warnings = [
      'Cardul EHIC acoperă doar urgențe medicale și tratamente necesare în vizite temporare în România',
      'Pentru tratamente planificate în România, solicită autorizare prealabilă',
    ];

    if (hasFamily) {
      warnings.push('Familia ta (soț/soție și copii) ar trebui să fie acoperită ca dependenți în sistemul local');
    }

    if (hasFamilyInRomania) {
      warnings.push('Familie rămasă în România: verifică eligibilitatea lor pentru asigurare medicală în România');
    }

    return {
      primaryCountry: residenceCountry,
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings,
    };
  }

  // POSTED WORKER: Covered by Romania, needs EHIC abroad
  if (workSituation === 'posted_worker') {
    const warnings = [
      'Folosește cardul EHIC pentru urgențe și tratamente necesare în țara de detașare',
      'Cardul EHIC NU acoperă: tratamente planificate, repatriere medicală, servicii private',
      'Pentru consultații de rutină, verifică dacă poți accesa sistemul local cu EHIC',
    ];

    if (hasFamily) {
      warnings.push('Familie cu tine: solicită și pentru ei carduri EHIC din România');
    }

    if (hasFamilyInRomania) {
      warnings.push('Familie rămasă în România: ei rămân asigurați în sistemul românesc (CNAS)');
    }

    return {
      primaryCountry: 'RO',
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings,
    };
  }

  // REMOTE WORKER: Depends on where insured
  if (workSituation === 'remote_worker') {
    const warnings = [
      'Verifică unde ești asigurat pentru a ști ce card să folosești',
    ];

    if (hasFamily) {
      warnings.push('Asigură-te că familia ta este înregistrată corect în sistemul de asigurări din țara de reședință');
    }

    return {
      primaryCountry: residenceCountry,
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings,
    };
  }

  // RETURNING: Transitions to Romanian healthcare
  if (workSituation === 'returning') {
    const warnings = [
      'Înregistrează-te la CNAS după întoarcere',
      'Perioada de tranziție: max 3 luni',
    ];

    if (hasFamily) {
      warnings.push('Înregistrează și familia ta la CNAS pentru asigurare medicală în România');
    }

    return {
      primaryCountry: 'RO',
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings,
    };
  }

  return {
    primaryCountry: residenceCountry,
    hasEHIC: true,
    canUseInRomania: true,
    needsS1: false,
    familyCovered: false,
    warnings: [],
  };
}

// ============================================
// TAX RULES
// ============================================

function calculateTaxes(input: RulesInput): TaxRules {
  const { residenceCountry, workSituation, duration } = input;

  // LOCAL EMPLOYEE abroad: Tax resident in work country
  if (workSituation === 'local_employee' && residenceCountry !== 'RO') {
    return {
      residentCountry: residenceCountry,
      hasDualObligations: false,
      mustFileIn: [residenceCountry],
      warnings: [
        'Dacă ai venituri din România (chirii, dividende), declară-le',
      ],
    };
  }

  // POSTED WORKER: Usually Romanian tax resident
  if (workSituation === 'posted_worker') {
    const longPosting = duration === 'over_2y' || duration === '1y_to_2y';
    const veryLongPosting = duration === 'over_2y';
    const warnings: string[] = longPosting
      ? ['Detașare lungă poate crea obligații fiscale duale']
      : [];

    const deadlines: import('./types').TaxDeadline[] = [
      {
        country: 'RO',
        description: 'Declarația unică pentru venituri din România',
        date: '25 mai',
        formName: 'Declarația unică (formular 212)',
      },
    ];

    // Add host country deadline if very long posting
    if (veryLongPosting && residenceCountry !== 'RO') {
      const countryDeadlines: Record<string, { date: string; form: string }> = {
        DE: { date: '31 iulie', form: 'Einkommensteuererklärung' },
        ES: { date: '30 iunie', form: 'Declaración de la Renta' },
        IT: { date: '30 noiembrie', form: 'Dichiarazione dei Redditi' },
        FR: { date: 'mai-iunie (variabil)', form: 'Déclaration de revenus' },
        UK: { date: '31 ianuarie', form: 'Self Assessment' },
      };

      const hostDeadline = countryDeadlines[residenceCountry];
      if (hostDeadline) {
        deadlines.push({
          country: residenceCountry,
          description: `Declarație fiscală în țara gazdă`,
          date: hostDeadline.date,
          formName: hostDeadline.form,
        });
      }
    }

    const nextSteps: import('./types').ActionableStep[] = [
      {
        id: 'file-ro-tax-return',
        title: 'Depune declarația unică în România',
        description: 'Declară toate veniturile din România până la 25 mai.',
        priority: 'high',
        deadline: '25 mai',
        category: 'tax',
        link: '/guides/file-ro-tax-return',
      },
    ];

    if (longPosting) {
      nextSteps.push({
        id: 'verify-tax-residence',
        title: 'Verifică rezidența fiscală',
        description: 'Detașarea lungă (>2 ani) poate schimba rezidența fiscală. Verifică tratatul de evitare a dublei impuneri.',
        priority: 'high',
        category: 'tax',
      });

      nextSteps.push({
        id: 'file-host-tax-return',
        title: 'Verifică obligațiile fiscale în țara gazdă',
        description: 'Este posibil să ai obligații fiscale și în țara unde lucrezi.',
        priority: 'medium',
        category: 'tax',
      });
    }

    return {
      residentCountry: 'RO',
      hasDualObligations: longPosting,
      mustFileIn: longPosting ? ['RO', residenceCountry] : ['RO'],
      warnings,
      deadlines,
      nextSteps,
    };
  }

  // REMOTE WORKER: Complex!
  if (workSituation === 'remote_worker') {
    const countrySpecificGuidance: Record<CountryCode, string> = {
      RO: 'Înregistrează-te la ANAF cu Declarația unică (formular 212)',
      DE: 'Înregistrează-te la Finanzamt (oficiul fiscal local) în Germania',
      ES: 'Obține NIE și înregistrează-te la Agencia Tributaria',
      IT: 'Obține Codice Fiscale și înregistrează-te la Agenzia delle Entrate',
      FR: 'Înregistrează-te la Service des Impôts des Particuliers',
      UK: 'Înregistrează-te pentru Self Assessment la HMRC',
    };

    return {
      residentCountry: residenceCountry,
      hasDualObligations: true,
      mustFileIn: ['RO', residenceCountry],
      warnings: [
        'Munca remote creează aproape întotdeauna obligații fiscale duale',
        countrySpecificGuidance[residenceCountry] || 'Înregistrează-te la autoritatea fiscală locală',
        'Consultă un specialist în fiscalitate internațională pentru tratatul de evitare a dublei impuneri',
      ],
    };
  }

  // RETURNING: Becomes Romanian tax resident
  if (workSituation === 'returning') {
    return {
      residentCountry: 'RO',
      hasDualObligations: false,
      mustFileIn: ['RO'],
      warnings: [
        'Depune declarație finală în țara de unde pleci',
        'Anul întoarcerii: poate fi necesar să declari în ambele țări',
      ],
    };
  }

  return {
    residentCountry: residenceCountry,
    hasDualObligations: false,
    mustFileIn: [residenceCountry],
    warnings: [],
  };
}

// ============================================
// PENSION RULES
// ============================================

function calculatePension(input: RulesInput): PensionRules {
  const { residenceCountry, workSituation } = input;

  // Key principle: Contributions from ALL EU countries cumulate
  const basePension: PensionRules = {
    contributingTo: residenceCountry,
    willCumulate: true,
    yearsCount: true,
    warnings: [],
  };

  if (workSituation === 'local_employee' && residenceCountry !== 'RO') {
    const countryName = residenceCountry === 'DE' ? 'Germania' :
                       residenceCountry === 'ES' ? 'Spania' :
                       residenceCountry === 'IT' ? 'Italia' :
                       residenceCountry === 'FR' ? 'Franța' : 'Marea Britanie';

    const vestingInfo = PENSION_VESTING[residenceCountry];

    return {
      ...basePension,
      contributingTo: residenceCountry,
      warnings: [
        `Perioadele lucrate în ${countryName} și România se cumulează pentru stagiu`,
        `${countryName}: ${vestingInfo.note}`,
        'La pensionare, trebuie să aplici separat în fiecare țară unde ai lucrat',
        'Vei primi pensie proporțională din fiecare țară, bazată pe anii lucrați acolo',
      ],
    };
  }

  if (workSituation === 'posted_worker') {
    const roVestingInfo = PENSION_VESTING['RO'];

    return {
      ...basePension,
      contributingTo: 'RO',
      warnings: [
        'Contribui în continuare la pensia românească',
        'Perioada de detașare contează pentru stagiu în România',
        `România: ${roVestingInfo.note}`,
      ],
    };
  }

  if (workSituation === 'remote_worker') {
    return {
      ...basePension,
      contributingTo: residenceCountry,
      warnings: [
        'Verifică unde contribui efectiv la pensie',
        'Perioadele lucrate se cumulează indiferent de țară',
        'La pensionare, vei aplica separat în fiecare țară unde ai contribuit',
      ],
    };
  }

  if (workSituation === 'returning') {
    const roVestingInfo = PENSION_VESTING['RO'];

    return {
      ...basePension,
      contributingTo: 'RO',
      warnings: [
        'Obține confirmarea perioadelor lucrate în străinătate de la autoritatea de pensii',
        'Cere formularul U1/P1 pentru consolidarea perioadelor de muncă',
        `România: ${roVestingInfo.note}`,
        'Perioadele din străinătate se cumulează cu cele din România pentru eligibilitate',
      ],
    };
  }

  return basePension;
}

// ============================================
// DOCUMENT HELPERS
// ============================================

function collectRequiredDocuments(
  socialSecurity: SocialSecurityRules,
  healthcare: HealthcareRules
): DocumentId[] {
  const docs = new Set<DocumentId>();

  socialSecurity.requiredForms.forEach(doc => docs.add(doc));

  if (healthcare.needsS1) {
    docs.add('s1-form');
  }

  return Array.from(docs);
}

function collectRecommendedDocuments(input: RulesInput): DocumentId[] {
  const docs: DocumentId[] = [];
  const { workSituation, duration, familyStatus } = input;

  // EHIC card recommended for everyone except returning migrants already in Romania
  if (workSituation !== 'returning') {
    docs.push('ehic-card');
  }

  // Posted workers: Tax certificate recommended for long postings
  if (workSituation === 'posted_worker') {
    if (duration === 'over_2y' || duration === '1y_to_2y' || duration === '6m_to_1y') {
      docs.push('tax-certificate');
    }
  }

  // Remote workers: Always need tax certificate due to dual obligations
  if (workSituation === 'remote_worker') {
    docs.push('tax-certificate');
  }

  // Returning migrants: Need U1 for unemployment transfer
  if (workSituation === 'returning') {
    // U1 is already in required documents, but add S1 if they have family
    const hasFamily = familyStatus.includes('spouse_with') || familyStatus.includes('children_with');
    if (hasFamily) {
      docs.push('s1-form');
    }
  }

  // Local employees with long stays: Tax certificate if they have Romanian income
  if (workSituation === 'local_employee' && (duration === 'over_2y' || duration === '1y_to_2y' || duration === '6m_to_1y')) {
    docs.push('tax-certificate');
  }

  return docs;
}

// ============================================
// HELPER: Get dashboard card data
// ============================================

export function getDashboardCards(profile: Profile): DashboardCard[] {
  const { applicableRules, destinationCountry, workSituation, duration } = profile;
  const countryName = destinationCountry === 'RO' ? 'România' :
                     destinationCountry === 'DE' ? 'Germania' :
                     destinationCountry === 'ES' ? 'Spania' :
                     destinationCountry === 'IT' ? 'Italia' :
                     destinationCountry === 'FR' ? 'Franța' : 'Marea Britanie';

  const flag = destinationCountry === 'RO' ? '🇷🇴' :
    destinationCountry === 'DE' ? '🇩🇪' :
    destinationCountry === 'ES' ? '🇪🇸' :
    destinationCountry === 'IT' ? '🇮🇹' :
    destinationCountry === 'FR' ? '🇫🇷' : '🇬🇧';

  // Get user context labels
  const workSituationLabel = WORK_SITUATIONS[workSituation]?.title || workSituation;
  const durationLabel = DURATIONS[duration]?.label || duration;

  return [
    {
      topic: 'social-security',
      title: 'Asigurări Sociale',
      summary: `Plătești în ${applicableRules.socialSecurity.payIn === 'RO' ? 'România' : countryName}`,
      status: applicableRules.socialSecurity.status === 'full_coverage' ? 'ok' :
              applicableRules.socialSecurity.status === 'needs_verification' ? 'warning' : 'action_needed',
      countryFlag: flag,
      details: [
        applicableRules.socialSecurity.coversPension ? '✓ Pensie' : '✗ Pensie',
        applicableRules.socialSecurity.coversUnemployment ? '✓ Șomaj' : '✗ Șomaj',
        applicableRules.socialSecurity.coversHealthcare ? '✓ Contribuții medicale' : '✗ Contribuții medicale',
      ],
      link: `/topic/social-security-${profile.destinationCountry.toLowerCase()}-${profile.workSituation.replace(/_/g, '-')}`,
      userContext: {
        workSituation: workSituationLabel,
        duration: durationLabel,
      },
    },
    {
      topic: 'healthcare',
      title: 'Acces la Servicii Medicale',
      summary: `Asigurat în ${applicableRules.healthcare.primaryCountry === 'RO' ? 'România' : countryName}`,
      status: 'ok',
      countryFlag: flag,
      details: [
        applicableRules.healthcare.hasEHIC ? '✓ Card EHIC pentru urgențe' : '✗ Fără card EHIC',
        applicableRules.healthcare.canUseInRomania
          ? '✓ Acces în RO pentru vizite temporare (cu EHIC)'
          : '✗ Acces limitat în RO',
        applicableRules.healthcare.familyCovered
          ? '✓ Familia este acoperită'
          : 'Familie: verifică eligibilitatea',
      ],
      link: `/topic/healthcare-${profile.destinationCountry.toLowerCase()}-${profile.workSituation.replace(/_/g, '-')}`,
      userContext: {
        workSituation: workSituationLabel,
        duration: durationLabel,
      },
    },
    {
      topic: 'taxes',
      title: 'Taxe',
      summary: `Rezident fiscal în ${applicableRules.taxes.residentCountry === 'RO' ? 'România' : countryName}`,
      status: applicableRules.taxes.hasDualObligations ? 'warning' : 'ok',
      countryFlag: flag,
      details: applicableRules.taxes.warnings.length > 0
        ? applicableRules.taxes.warnings.slice(0, 2)
        : ['Fără obligații suplimentare'],
      link: `/topic/taxes-${profile.destinationCountry.toLowerCase()}-${profile.workSituation.replace(/_/g, '-')}`,
      userContext: {
        workSituation: workSituationLabel,
        duration: durationLabel,
      },
    },
    {
      topic: 'pension',
      title: 'Pensie',
      summary: applicableRules.pension.willCumulate
        ? 'Perioadele de muncă se cumulează'
        : 'Verifică situația',
      status: 'ok',
      countryFlag: flag,
      details: applicableRules.pension.warnings.length > 0
        ? applicableRules.pension.warnings.slice(0, 2)
        : ['Perioadele lucrate din toate țările UE contează pentru stagiu', 'Vei primi pensie proporțională din fiecare țară'],
      link: `/topic/pension-${profile.destinationCountry.toLowerCase()}-${profile.workSituation.replace(/_/g, '-')}`,
      userContext: {
        workSituation: workSituationLabel,
        duration: durationLabel,
      },
    },
  ];
}
