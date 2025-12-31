# DiasporaRO - AI Implementation Guide

> **Purpose**: This document provides complete specifications for an AI to implement the DiasporaRO application - a Progressive Web App helping Romanian workers in the EU understand their rights and obligations.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Setup](#2-tech-stack--setup)
3. [Project Structure](#3-project-structure)
4. [Database Schema](#4-database-schema)
5. [Core Types & Interfaces](#5-core-types--interfaces)
6. [Rules Engine](#6-rules-engine)
7. [User Flows & Screens](#7-user-flows--screens)
8. [Component Specifications](#8-component-specifications)
9. [API Endpoints](#9-api-endpoints)
10. [Content Structure](#10-content-structure)
11. [Styling & Design System](#11-styling--design-system)
12. [Implementation Checklist](#12-implementation-checklist)
13. [Sample Content](#13-sample-content)

---

## 1. Project Overview

### 1.1 What We're Building

**DiasporaRO** is a mobile-first Progressive Web App (PWA) that helps Romanian workers in the EU understand:
- Where they pay taxes
- Where they're covered for social security
- How to access healthcare when visiting Romania
- How pension contributions from multiple countries combine
- What official documents (A1, S1, U1, EHIC) they need

### 1.2 Problem Statement

Over 3 million Romanians work in other EU countries. They face confusion about cross-border rules because:
- Government websites use dense legal language
- Information is siloed by topic (taxes separate from healthcare separate from pension)
- No personalization based on individual situation
- Poor mobile experience

### 1.3 Solution

A simple quiz (4 questions) determines the user's situation, then shows a personalized dashboard with:
- Clear answers in plain Romanian
- Relevant documents they need
- Links to official sources

### 1.4 MVP Scope

**Countries (5):** Germany, Spain, Italy, France, UK

**Work Situations (4):**
- Local employee (contract in destination country)
- Posted worker (sent by Romanian employer)
- Remote worker (lives abroad, works for Romanian company)
- Returning migrant (coming back to Romania)

**Topics (4):** Social Security, Healthcare, Taxes, Pension

**Excluded from MVP:** Self-employed, students, retirees, seasonal workers, other EU countries

---

## 2. Tech Stack & Setup

### 2.1 Technology Choices

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | Next.js 14+ (App Router) | SSR, API routes, great DX |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Rapid UI development |
| Components | shadcn/ui | Accessible, customizable |
| Database | Supabase | PostgreSQL + Auth + easy setup |
| Content | MDX files | Version controlled, easy to edit |
| Search | Fuse.js | Client-side, no external dependency |
| Hosting | Vercel | Zero-config Next.js hosting |
| Analytics | Plausible | Privacy-friendly |
| PWA | next-pwa | Service worker, offline support |

### 2.2 Initial Setup Commands

```bash
# Create Next.js project
npx create-next-app@latest diaspora-ro --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd diaspora-ro

# Install dependencies
npm install @supabase/supabase-js
npm install next-pwa
npm install fuse.js
npm install lucide-react
npm install next-mdx-remote gray-matter
npm install zustand  # For state management

# Install shadcn/ui
npx shadcn-ui@latest init

# Add shadcn components
npx shadcn-ui@latest add button card accordion tabs badge progress
npx shadcn-ui@latest add form input label radio-group checkbox
npx shadcn-ui@latest add sheet dialog alert

# Create Supabase project at supabase.com and get credentials
# Add to .env.local:
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 2.3 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Project Structure

```
diaspora-ro/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                 # Landing page
│   │   │   ├── despre/page.tsx          # About page
│   │   │   └── layout.tsx
│   │   ├── (app)/
│   │   │   ├── dashboard/page.tsx       # Main dashboard
│   │   │   ├── topic/[slug]/page.tsx    # Topic detail pages
│   │   │   ├── document/[slug]/page.tsx # Document guides
│   │   │   ├── faq/page.tsx             # FAQ with search
│   │   │   ├── setari/page.tsx          # Settings
│   │   │   └── layout.tsx               # App layout with nav
│   │   ├── onboarding/
│   │   │   ├── page.tsx                 # Quiz flow
│   │   │   └── complete/page.tsx        # Redirect after quiz
│   │   ├── api/
│   │   │   ├── profile/route.ts
│   │   │   ├── content/route.ts
│   │   │   └── feedback/route.ts
│   │   ├── layout.tsx                   # Root layout
│   │   ├── globals.css
│   │   └── manifest.ts                  # PWA manifest
│   ├── components/
│   │   ├── ui/                          # shadcn components
│   │   ├── quiz/
│   │   │   ├── QuizContainer.tsx
│   │   │   ├── QuizStep.tsx
│   │   │   ├── CountrySelector.tsx
│   │   │   ├── SituationSelector.tsx
│   │   │   ├── DurationSelector.tsx
│   │   │   └── FamilySelector.tsx
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── TopicCard.tsx
│   │   │   ├── DocumentsList.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── content/
│   │   │   ├── TopicContent.tsx
│   │   │   ├── DocumentContent.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   └── SourceLink.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── BottomNav.tsx
│   │       ├── Footer.tsx
│   │       └── Logo.tsx
│   ├── content/
│   │   ├── topics/
│   │   │   ├── social-security/
│   │   │   │   ├── de-local-employee.mdx
│   │   │   │   ├── de-posted-worker.mdx
│   │   │   │   ├── de-remote-worker.mdx
│   │   │   │   └── de-returning.mdx
│   │   │   ├── healthcare/
│   │   │   ├── taxes/
│   │   │   └── pension/
│   │   ├── documents/
│   │   │   ├── a1-form.mdx
│   │   │   ├── s1-form.mdx
│   │   │   ├── u1-form.mdx
│   │   │   ├── ehic-card.mdx
│   │   │   └── tax-certificate.mdx
│   │   └── faqs/
│   │       └── all-faqs.json
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── content/
│   │   │   ├── loader.ts               # MDX loading utilities
│   │   │   └── search.ts               # Fuse.js search setup
│   │   ├── rules-engine.ts             # Core business logic
│   │   ├── types.ts                    # TypeScript types
│   │   └── constants.ts                # Countries, situations, etc.
│   ├── hooks/
│   │   ├── useProfile.ts
│   │   ├── useContent.ts
│   │   └── useRules.ts
│   └── stores/
│       └── profileStore.ts             # Zustand store
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── flags/
│       ├── ro.svg
│       ├── de.svg
│       ├── es.svg
│       ├── it.svg
│       ├── fr.svg
│       └── uk.svg
├── next.config.js                       # With PWA config
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. Database Schema

### 4.1 Supabase SQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (stores quiz answers and computed rules)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Quiz answers
  residence_country TEXT NOT NULL CHECK (residence_country IN ('RO', 'DE', 'ES', 'IT', 'FR', 'UK')),
  work_situation TEXT NOT NULL CHECK (work_situation IN ('local_employee', 'posted_worker', 'remote_worker', 'returning')),
  duration TEXT NOT NULL CHECK (duration IN ('under_6m', '6m_to_2y', 'over_2y', 'not_yet')),
  family_status TEXT[] NOT NULL DEFAULT '{}',
  
  -- Computed
  destination_country TEXT,
  
  -- Optional user account link
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Cached rules (JSONB for flexibility)
  applicable_rules JSONB
);

-- Index for faster lookups
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Analytics: content views
CREATE TABLE content_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content_slug TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('topic', 'document', 'faq')),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_content_views_slug ON content_views(content_slug);
CREATE INDEX idx_content_views_date ON content_views(viewed_at);

-- User feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content_slug TEXT,
  page_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policies: anyone can insert (anonymous profiles allowed)
CREATE POLICY "Anyone can create profile" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (true);

CREATE POLICY "Anyone can log views" ON content_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit feedback" ON feedback FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### 4.2 Local Storage Schema (for anonymous users)

```typescript
// Stored in localStorage as 'diaspora-profile'
interface LocalProfile {
  id: string;                          // UUID generated client-side
  createdAt: string;                   // ISO date
  updatedAt: string;                   // ISO date
  residenceCountry: CountryCode;
  workSituation: WorkSituation;
  duration: Duration;
  familyStatus: FamilyStatus[];
  destinationCountry: CountryCode;
  applicableRules: ApplicableRules;
}
```

---

## 5. Core Types & Interfaces

Create this file at `src/lib/types.ts`:

```typescript
// ============================================
// ENUMS & CONSTANTS
// ============================================

export const COUNTRIES = {
  RO: { code: 'RO', name: 'România', flag: '🇷🇴' },
  DE: { code: 'DE', name: 'Germania', flag: '🇩🇪' },
  ES: { code: 'ES', name: 'Spania', flag: '🇪🇸' },
  IT: { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  FR: { code: 'FR', name: 'Franța', flag: '🇫🇷' },
  UK: { code: 'UK', name: 'Marea Britanie', flag: '🇬🇧' },
} as const;

export type CountryCode = keyof typeof COUNTRIES;

export const WORK_SITUATIONS = {
  local_employee: {
    id: 'local_employee',
    title: 'Angajat cu contract local',
    description: 'Firma e în țara unde muncesc',
    icon: '💼',
  },
  posted_worker: {
    id: 'posted_worker',
    title: 'Detașat de firmă românească',
    description: 'Trimis temporar în altă țară',
    icon: '📤',
  },
  remote_worker: {
    id: 'remote_worker',
    title: 'Lucrez remote din străinătate',
    description: 'Pentru firmă din România',
    icon: '🏠',
  },
  returning: {
    id: 'returning',
    title: 'Mă întorc în România',
    description: 'După ce am muncit afară',
    icon: '🔙',
  },
} as const;

export type WorkSituation = keyof typeof WORK_SITUATIONS;

export const DURATIONS = {
  under_6m: { id: 'under_6m', label: 'Sub 6 luni' },
  '6m_to_2y': { id: '6m_to_2y', label: '6 luni - 2 ani' },
  over_2y: { id: 'over_2y', label: 'Peste 2 ani' },
  not_yet: { id: 'not_yet', label: 'Nu m-am mutat încă' },
} as const;

export type Duration = keyof typeof DURATIONS;

export const FAMILY_STATUSES = {
  spouse_with: { id: 'spouse_with', label: 'Soț/soție (vine cu mine)' },
  children_with: { id: 'children_with', label: 'Copii (vin cu mine)' },
  family_in_romania: { id: 'family_in_romania', label: 'Familie rămasă în România' },
  single: { id: 'single', label: 'Sunt singur/ă' },
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
  faqs: FAQ[];
  relatedDocuments: DocumentId[];
  sources: Source[];
  lastUpdated: string;
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
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  answers: QuizAnswers;
  isComplete: boolean;
}
```

---

## 6. Rules Engine

Create this file at `src/lib/rules-engine.ts`:

```typescript
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
} from './types';
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    residenceCountry,
    workSituation,
    duration,
    familyStatus,
    destinationCountry,
    applicableRules,
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

  return {
    socialSecurity,
    healthcare,
    taxes,
    pension,
    requiredDocuments,
    recommendedDocuments,
  };
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
    
    return {
      payIn: 'RO',
      status: isOverLimit ? 'transitioning' : 'posted_coverage',
      coversPension: true,
      coversUnemployment: true,
      coversHealthcare: true,
      coversAccidents: true,
      requiredForms: ['a1-form'],
      warnings: isOverLimit 
        ? ['Detașarea peste 24 luni necesită tranziție la sistemul local']
        : [],
    };
  }

  // REMOTE WORKER: Complex - usually pays where they live
  if (workSituation === 'remote_worker') {
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
        'Situația muncii remote e complexă',
        'Verifică cu autoritățile din ambele țări',
        'Regula 25%: dacă lucrezi >25% în țara de reședință, plătești acolo',
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
  const hasFamily = familyStatus.includes('spouse_with') || familyStatus.includes('children_with');

  // LOCAL EMPLOYEE abroad
  if (workSituation === 'local_employee' && residenceCountry !== 'RO') {
    return {
      primaryCountry: residenceCountry,
      hasEHIC: true,
      canUseInRomania: true,  // Via EHIC for temporary stays
      needsS1: false,
      familyCovered: hasFamily,  // Usually covered as dependents
      warnings: [],
    };
  }

  // POSTED WORKER: Covered by Romania, needs EHIC abroad
  if (workSituation === 'posted_worker') {
    return {
      primaryCountry: 'RO',
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings: [
        'Folosește cardul EHIC pentru tratament în țara de detașare',
      ],
    };
  }

  // REMOTE WORKER: Depends on where insured
  if (workSituation === 'remote_worker') {
    return {
      primaryCountry: residenceCountry,
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings: [
        'Verifică unde ești asigurat pentru a ști ce card să folosești',
      ],
    };
  }

  // RETURNING: Transitions to Romanian healthcare
  if (workSituation === 'returning') {
    return {
      primaryCountry: 'RO',
      hasEHIC: true,
      canUseInRomania: true,
      needsS1: false,
      familyCovered: hasFamily,
      warnings: [
        'Înregistrează-te la CNAS după întoarcere',
        'Perioada de tranziție: max 3 luni',
      ],
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
    const longPosting = duration === 'over_2y';
    return {
      residentCountry: 'RO',
      hasDualObligations: longPosting,
      mustFileIn: longPosting ? ['RO', residenceCountry] : ['RO'],
      warnings: longPosting 
        ? ['Detașare lungă poate crea obligații fiscale duale']
        : [],
    };
  }

  // REMOTE WORKER: Complex!
  if (workSituation === 'remote_worker') {
    return {
      residentCountry: residenceCountry,
      hasDualObligations: true,
      mustFileIn: ['RO', residenceCountry],
      warnings: [
        'Munca remote creează aproape întotdeauna obligații fiscale duale',
        'Consultă un specialist în fiscalitate internațională',
        'Verifică tratatul de evitare a dublei impuneri',
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
    return {
      ...basePension,
      contributingTo: residenceCountry,
      warnings: [
        'Contribuțiile din Germania se vor cumula cu cele din România',
        'La pensionare, primești pensie din fiecare țară',
      ],
    };
  }

  if (workSituation === 'posted_worker') {
    return {
      ...basePension,
      contributingTo: 'RO',
      warnings: [
        'Contribui în continuare la pensia românească',
        'Perioada de detașare contează pentru stagiu',
      ],
    };
  }

  if (workSituation === 'remote_worker') {
    return {
      ...basePension,
      contributingTo: residenceCountry,
      warnings: [
        'Verifică unde contribui efectiv',
        'Contribuțiile se cumulează indiferent de țară',
      ],
    };
  }

  if (workSituation === 'returning') {
    return {
      ...basePension,
      contributingTo: 'RO',
      warnings: [
        'Obține confirmarea perioadelor lucrate în străinătate',
        'Cere formularul P1 pentru consolidarea perioadelor',
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
  const docs: DocumentId[] = ['ehic-card'];  // Everyone should have EHIC
  
  if (input.workSituation === 'remote_worker') {
    docs.push('tax-certificate');
  }
  
  return docs;
}

// ============================================
// HELPER: Get dashboard card data
// ============================================

export function getDashboardCards(profile: Profile): DashboardCard[] {
  const { applicableRules, destinationCountry } = profile;
  const flag = destinationCountry === 'RO' ? '🇷🇴' : 
    destinationCountry === 'DE' ? '🇩🇪' :
    destinationCountry === 'ES' ? '🇪🇸' :
    destinationCountry === 'IT' ? '🇮🇹' :
    destinationCountry === 'FR' ? '🇫🇷' : '🇬🇧';

  return [
    {
      topic: 'social-security',
      title: 'Asigurări Sociale',
      summary: `Plătești în ${applicableRules.socialSecurity.payIn === 'RO' ? 'România' : applicableRules.socialSecurity.payIn}`,
      status: applicableRules.socialSecurity.status === 'full_coverage' ? 'ok' : 
              applicableRules.socialSecurity.status === 'needs_verification' ? 'warning' : 'action_needed',
      countryFlag: flag,
      details: [
        applicableRules.socialSecurity.coversPension ? '✓ Pensie' : '✗ Pensie',
        applicableRules.socialSecurity.coversUnemployment ? '✓ Șomaj' : '✗ Șomaj',
        applicableRules.socialSecurity.coversHealthcare ? '✓ Sănătate' : '✗ Sănătate',
      ],
      link: `/topic/social-security-${profile.destinationCountry.toLowerCase()}-${profile.workSituation}`,
    },
    {
      topic: 'healthcare',
      title: 'Sănătate',
      summary: `Asigurat în ${applicableRules.healthcare.primaryCountry === 'RO' ? 'România' : applicableRules.healthcare.primaryCountry}`,
      status: 'ok',
      countryFlag: flag,
      details: [
        applicableRules.healthcare.hasEHIC ? '✓ Card EHIC' : '✗ Card EHIC',
        applicableRules.healthcare.canUseInRomania ? '✓ Poți folosi în RO' : '✗ Nu poți folosi în RO',
      ],
      link: `/topic/healthcare-${profile.destinationCountry.toLowerCase()}-${profile.workSituation}`,
    },
    {
      topic: 'taxes',
      title: 'Taxe',
      summary: `Rezident fiscal în ${applicableRules.taxes.residentCountry === 'RO' ? 'România' : applicableRules.taxes.residentCountry}`,
      status: applicableRules.taxes.hasDualObligations ? 'warning' : 'ok',
      countryFlag: flag,
      details: applicableRules.taxes.warnings.length > 0 
        ? applicableRules.taxes.warnings 
        : ['Fără obligații suplimentare'],
      link: `/topic/taxes-${profile.destinationCountry.toLowerCase()}-${profile.workSituation}`,
    },
    {
      topic: 'pension',
      title: 'Pensie',
      summary: applicableRules.pension.willCumulate 
        ? 'Contribuțiile se cumulează' 
        : 'Verifică situația',
      status: 'ok',
      countryFlag: flag,
      details: applicableRules.pension.warnings.length > 0
        ? applicableRules.pension.warnings.slice(0, 2)
        : ['Perioadele lucrate se cumulează din toate țările UE'],
      link: `/topic/pension-${profile.destinationCountry.toLowerCase()}-${profile.workSituation}`,
    },
  ];
}
```

---

## 7. User Flows & Screens

### 7.1 Quiz Flow

```
[Landing Page]
     │
     ▼ Click "Începe" button
[Quiz Step 1: Country]
     │ Select country
     ▼
[Quiz Step 2: Situation]
     │ Select work situation
     ▼
[Quiz Step 3: Duration]
     │ Select duration
     ▼
[Quiz Step 4: Family]
     │ Select family status
     ▼
[Processing] Calculate rules
     │
     ▼
[Dashboard] Show personalized results
```

### 7.2 Screen Specifications

#### Landing Page (`/`)

```
┌─────────────────────────────────────────┐
│  [Logo] DiasporaRO                      │
├─────────────────────────────────────────┤
│                                         │
│      Ghidul tău pentru                  │
│      munca în UE                        │
│                                         │
│  Află în 2 minute unde plătești taxe,  │
│  unde ești asigurat și ce acte ai       │
│  nevoie.                                │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │         Începe acum →           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ✓ Gratuit                              │
│  ✓ Fără cont                            │
│  ✓ Informații oficiale                  │
│                                         │
├─────────────────────────────────────────┤
│  [How it works section]                 │
│  1. Răspunzi la 4 întrebări             │
│  2. Primești informații personalizate   │
│  3. Afli ce documente ai nevoie         │
├─────────────────────────────────────────┤
│  [Countries we cover]                   │
│  🇩🇪 🇪🇸 🇮🇹 🇫🇷 🇬🇧                         │
├─────────────────────────────────────────┤
│  [Footer]                               │
└─────────────────────────────────────────┘
```

#### Quiz Screen (`/onboarding`)

```
┌─────────────────────────────────────────┐
│  ← Înapoi              Pas 1 din 4      │
├─────────────────────────────────────────┤
│                                         │
│  Unde locuiești?                        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🇷🇴  România                   │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  🇩🇪  Germania          [●]     │    │  ← Selected
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  🇪🇸  Spania                    │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  🇮🇹  Italia                    │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  🇫🇷  Franța                    │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  🇬🇧  Marea Britanie            │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │         Continuă →              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Progress bar: 25%]                    │
└─────────────────────────────────────────┘
```

#### Dashboard (`/dashboard`)

```
┌─────────────────────────────────────────┐
│  DiasporaRO                    ⚙️       │
├─────────────────────────────────────────┤
│  👤 Situația ta                         │
│  Germania 🇩🇪 · Angajat local · 2+ ani  │
│                          [Modifică]     │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🛡️ ASIGURĂRI SOCIALE      🇩🇪   │    │
│  │                                 │    │
│  │ Plătești în Germania            │    │
│  │ ✓ Pensie  ✓ Șomaj  ✓ Sănătate  │    │
│  │                          →      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏥 SĂNĂTATE               ✓     │    │
│  │                                 │    │
│  │ Asigurat în Germania            │    │
│  │ Card EHIC: Poți folosi în RO    │    │
│  │                          →      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 💰 TAXE                   ⚠️    │    │
│  │                                 │    │
│  │ Rezident fiscal în Germania     │    │
│  │ Verifică venituri din RO        │    │
│  │                          →      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 👴 PENSIE                 ℹ️    │    │
│  │                                 │    │
│  │ Contribuțiile se cumulează      │    │
│  │ Primești pensie din ambele țări │    │
│  │                          →      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 📄 DOCUMENTE NECESARE           │    │
│  │ • Card EHIC (recomandat)        │    │
│  │                          →      │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  🏠      📄      ❓      ⚙️            │
│  Acasă  Acte    FAQ   Setări           │
└─────────────────────────────────────────┘
```

---

## 8. Component Specifications

### 8.1 Quiz Components

#### QuizContainer.tsx

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizAnswers, CountryCode, WorkSituation, Duration, FamilyStatus } from '@/lib/types';
import { createProfileFromQuiz } from '@/lib/rules-engine';
import { useProfileStore } from '@/stores/profileStore';
import CountrySelector from './CountrySelector';
import SituationSelector from './SituationSelector';
import DurationSelector from './DurationSelector';
import FamilySelector from './FamilySelector';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 4;

export default function QuizContainer() {
  const router = useRouter();
  const { setProfile } = useProfileStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const updateAnswer = <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!answers.residenceCountry;
      case 2: return !!answers.workSituation;
      case 3: return !!answers.duration;
      case 4: return answers.familyStatus && answers.familyStatus.length > 0;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Complete quiz
      setIsProcessing(true);
      try {
        const profile = createProfileFromQuiz(answers);
        setProfile(profile);
        
        // Save to localStorage
        localStorage.setItem('diaspora-profile', JSON.stringify(profile));
        
        router.push('/dashboard');
      } catch (error) {
        console.error('Error creating profile:', error);
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-500">
          Pas {step} din {TOTAL_STEPS}
        </span>
        <div className="w-9" /> {/* Spacer */}
      </header>

      {/* Progress */}
      <Progress value={(step / TOTAL_STEPS) * 100} className="h-1" />

      {/* Content */}
      <main className="flex-1 p-4">
        {step === 1 && (
          <CountrySelector
            selected={answers.residenceCountry}
            onSelect={(country) => updateAnswer('residenceCountry', country)}
          />
        )}
        {step === 2 && (
          <SituationSelector
            selected={answers.workSituation}
            onSelect={(situation) => updateAnswer('workSituation', situation)}
          />
        )}
        {step === 3 && (
          <DurationSelector
            selected={answers.duration}
            onSelect={(duration) => updateAnswer('duration', duration)}
          />
        )}
        {step === 4 && (
          <FamilySelector
            selected={answers.familyStatus || []}
            onSelect={(status) => updateAnswer('familyStatus', status)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t">
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? 'Se procesează...' : 
           step === TOTAL_STEPS ? 'Vezi rezultatele' : 'Continuă'}
        </Button>
      </footer>
    </div>
  );
}
```

#### CountrySelector.tsx

```tsx
import { CountryCode, COUNTRIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  selected?: CountryCode;
  onSelect: (country: CountryCode) => void;
}

export default function CountrySelector({ selected, onSelect }: Props) {
  const countries = Object.values(COUNTRIES);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Unde locuiești?</h1>
      <p className="text-gray-500 mb-6">Selectează țara în care locuiești în prezent</p>
      
      <div className="space-y-3">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onSelect(country.code as CountryCode)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
              selected === country.code
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <span className="text-3xl">{country.flag}</span>
            <span className="font-medium">{country.name}</span>
            {selected === country.code && (
              <span className="ml-auto text-primary">●</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### 8.2 Dashboard Components

#### TopicCard.tsx

```tsx
import Link from 'next/link';
import { DashboardCard } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  card: DashboardCard;
}

const statusColors = {
  ok: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  action_needed: 'bg-red-100 text-red-800',
};

const statusIcons = {
  ok: '✓',
  warning: '⚠️',
  action_needed: '❗',
};

const topicIcons = {
  'social-security': '🛡️',
  healthcare: '🏥',
  taxes: '💰',
  pension: '👴',
};

export default function TopicCard({ card }: Props) {
  return (
    <Link href={card.link}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{topicIcons[card.topic]}</span>
              <h3 className="font-semibold uppercase text-sm tracking-wide">
                {card.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{card.countryFlag}</span>
              <Badge className={cn('text-xs', statusColors[card.status])}>
                {statusIcons[card.status]}
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-900 font-medium mb-2">{card.summary}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {card.details.slice(0, 3).map((detail, i) => (
              <span key={i} className="text-sm text-gray-600">
                {detail}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-primary text-sm font-medium">
            Vezi detalii
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

---

## 9. API Endpoints

### 9.1 Profile API

#### `src/app/api/profile/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createProfileFromQuiz } from '@/lib/rules-engine';
import { QuizAnswers } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: QuizAnswers = await request.json();
    
    // Validate required fields
    if (!body.residenceCountry || !body.workSituation || 
        !body.duration || !body.familyStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create profile with computed rules
    const profile = createProfileFromQuiz(body);

    // Optionally save to Supabase
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: profile.id,
        residence_country: profile.residenceCountry,
        work_situation: profile.workSituation,
        duration: profile.duration,
        family_status: profile.familyStatus,
        destination_country: profile.destinationCountry,
        applicable_rules: profile.applicableRules,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // Still return profile even if DB save fails
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('id');

  if (!profileId) {
    return NextResponse.json(
      { error: 'Profile ID required' },
      { status: 400 }
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: 'Profile not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
```

### 9.2 Feedback API

#### `src/app/api/feedback/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { profileId, contentSlug, pageUrl, rating, comment } = await request.json();

    const supabase = createClient();
    const { error } = await supabase
      .from('feedback')
      .insert({
        profile_id: profileId || null,
        content_slug: contentSlug,
        page_url: pageUrl,
        rating,
        comment,
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
```

---

## 10. Content Structure

### 10.1 MDX Content Files

#### Example: `src/content/topics/social-security/de-local-employee.mdx`

```mdx
---
slug: social-security-de-local-employee
title: Asigurări sociale în Germania
topic: social-security
countries: ['DE']
situations: ['local_employee']
summary: Ca angajat cu contract german, plătești contribuții sociale în Germania. Acestea acoperă pensie, șomaj, sănătate și accidente de muncă.
lastUpdated: 2024-12-01
---

## Ce contribuții plătești

În Germania, contribuțiile sociale sunt împărțite aproximativ în mod egal între tine și angajator. Din salariul tău brut se rețin:

- **Asigurare de pensie (Rentenversicherung):** ~9.3%
- **Asigurare de șomaj (Arbeitslosenversicherung):** ~1.2%
- **Asigurare de sănătate (Krankenversicherung):** ~7.3% + contribuție suplimentară
- **Asigurare de îngrijire (Pflegeversicherung):** ~1.7%

Angajatorul plătește aproximativ aceeași sumă.

## Ce înseamnă pentru tine

### Pensie
Contribuțiile tale germane se vor **cumula** cu cele din România când te vei pensiona. Vei primi pensie atât din Germania, cât și din România, proporțional cu anii lucrați în fiecare țară.

### Șomaj
Dacă pierzi locul de muncă în Germania, ai dreptul la **șomaj german** (Arbeitslosengeld I) dacă ai contribuit minim 12 luni în ultimii 30 de luni.

### Sănătate
Ești **automat asigurat** în sistemul german de sănătate. Poți merge la orice medic care acceptă asigurare publică.

## Ce trebuie să faci

**Nimic!** Angajatorul tău gestionează totul automat. Contribuțiile sunt reținute din salariu și virate direct la autoritățile germane.

## Întrebări frecvente

<FAQ question="Contribuțiile din Germania contează pentru pensia românească?">
Da! Când te vei pensiona, toate perioadele lucrate în UE se cumulează. Vei depune cererea în țara unde locuiești, iar autoritățile vor calcula pensia totală.
</FAQ>

<FAQ question="Pot să continui să plătesc și în România?">
Nu în mod obligatoriu. Poți fi asigurat doar într-o singură țară UE la un moment dat. Dacă lucrezi în Germania cu contract german, plătești doar în Germania.
</FAQ>

## Surse oficiale

- [Deutsche Rentenversicherung](https://www.deutsche-rentenversicherung.de/)
- [Your Europe - Social Security](https://europa.eu/youreurope/citizens/work/social-security-forms/)
```

### 10.2 Document Content

#### Example: `src/content/documents/a1-form.mdx`

```mdx
---
slug: a1-form
title: Formularul A1
officialName: Portable Document A1
purpose: Dovedește în ce țară plătești contribuții sociale
processingTime: 5-10 zile lucrătoare
cost: Gratuit
validityPeriod: Perioada de detașare (max. 24 luni)
officialLink: https://europa.eu/youreurope/citizens/work/social-security-forms/index_en.htm
---

## Ce este formularul A1?

Formularul A1 (sau "Documentul Portabil A1") este un certificat care dovedește că **plătești contribuții sociale într-o anumită țară UE**, chiar dacă lucrezi temporar în alta.

Este emis de autoritățile din țara unde ești asigurat și trebuie prezentat angajatorului sau autorităților din țara unde lucrezi temporar.

## Ai nevoie de A1 dacă:

- ✓ Ești **detașat** de o firmă românească să lucrezi temporar în altă țară UE
- ✓ Lucrezi **simultan** în mai multe țări UE
- ✓ Ești **self-employed** și prestezi servicii temporar în altă țară UE

## NU ai nevoie de A1 dacă:

- ✗ Ai **contract local** cu o firmă din țara unde lucrezi
- ✗ Te-ai **mutat definitiv** în altă țară
- ✗ Lucrezi **doar în România**

## Cum obții formularul A1

### Dacă ești angajat (detașat):

1. **Angajatorul** face cererea la Casa Națională de Pensii Publice (CNPP)
2. Se completează formularul de cerere cu datele detașării
3. CNPP verifică și emite A1 în 5-10 zile lucrătoare
4. Primești A1 și îl prezinți în țara de destinație

### Dacă ești self-employed:

1. **Tu** faci cererea direct la CNPP
2. Aduci dovezi ale activității (contracte, facturi)
3. CNPP verifică și emite A1

## Unde depui cererea

**Casa Națională de Pensii Publice (CNPP)**

- Online: [www.cnpp.ro](https://www.cnpp.ro)
- Sau la casa teritorială de pensii din județul tău

## Documente necesare

- Copie CI/pașaport
- Contractul de muncă
- Actul de detașare de la angajator
- Dovada sediului firmei în România

## Important de știut

⚠️ **Valabilitate:** A1 este valabil doar pentru perioada specificată, maxim 24 luni.

⚠️ **Prelungire:** Dacă detașarea depășește 24 luni, trebuie să treci la sistemul de asigurări sociale din țara gazdă.

⚠️ **Control:** Autoritățile din țara gazdă pot cere să prezinți A1 oricând. Păstrează-l la tine!
```

### 10.3 FAQ JSON Structure

#### `src/content/faqs/all-faqs.json`

```json
{
  "faqs": [
    {
      "id": "pension-cumulation",
      "question": "Cum se calculează pensia dacă am muncit în mai multe țări UE?",
      "answer": "Când te pensionezi, fiecare țară UE în care ai lucrat îți va calcula pensia proporțional cu anii contribuiți acolo. Vei primi mai multe pensii mici, nu una mare. Depui cererea în țara unde locuiești, iar autoritățile contactează celelalte țări automat.",
      "topics": ["pension"],
      "countries": ["DE", "ES", "IT", "FR", "UK"],
      "situations": ["local_employee", "posted_worker", "remote_worker", "returning"]
    },
    {
      "id": "ehic-romania-use",
      "question": "Pot folosi cardul EHIC când vizitez România?",
      "answer": "Da! Dacă ești asigurat în altă țară UE, poți folosi cardul EHIC pentru tratament medical necesar când vizitezi România. Acoperă tratamentul de urgență și tratamentul necesar în spitale publice.",
      "topics": ["healthcare"],
      "countries": ["DE", "ES", "IT", "FR", "UK"],
      "situations": ["local_employee", "posted_worker", "remote_worker"]
    },
    {
      "id": "remote-work-taxes",
      "question": "Unde plătesc taxe dacă lucrez remote pentru o firmă din România dar locuiesc în Germania?",
      "answer": "Situația e complexă. De regulă, ești rezident fiscal în țara unde locuiești (Germania). Dar firma românească tot trebuie să rețină contribuții. Cel mai probabil vei avea obligații în ambele țări și vei folosi tratatul de evitare a dublei impuneri. Recomandăm consultarea unui specialist.",
      "topics": ["taxes"],
      "countries": ["DE", "ES", "IT", "FR", "UK"],
      "situations": ["remote_worker"]
    }
  ]
}
```

---

## 11. Styling & Design System

### 11.1 Tailwind Configuration

#### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A87',
          50: '#E8F0F7',
          100: '#D1E1EF',
          200: '#A3C3DF',
          300: '#75A5CF',
          400: '#4787BF',
          500: '#2D5A87',
          600: '#24486C',
          700: '#1B3651',
          800: '#122436',
          900: '#09121B',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 11.2 Global Styles

#### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 209 50% 35%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 209 50% 35%;
    --radius: 0.75rem;
  }
}

@layer base {
  body {
    @apply bg-gray-50 text-foreground;
  }
}

/* Custom scrollbar for mobile feel */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

/* Safe area padding for mobile */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## 12. Implementation Checklist

### Phase 1: Setup (Day 1-2)

- [ ] Create Next.js project with TypeScript
- [ ] Install and configure Tailwind CSS
- [ ] Install shadcn/ui components
- [ ] Set up Supabase project and create tables
- [ ] Configure environment variables
- [ ] Set up PWA with next-pwa
- [ ] Deploy initial version to Vercel
- [ ] Set up Git repository

### Phase 2: Core Types & Logic (Day 3-4)

- [ ] Create `types.ts` with all TypeScript types
- [ ] Create `constants.ts` with countries, situations, etc.
- [ ] Implement `rules-engine.ts` with all business logic
- [ ] Write unit tests for rules engine
- [ ] Create Zustand store for profile state
- [ ] Create localStorage utilities

### Phase 3: Quiz Flow (Day 5-7)

- [ ] Create quiz container component
- [ ] Create country selector
- [ ] Create situation selector
- [ ] Create duration selector
- [ ] Create family selector
- [ ] Add progress indicator
- [ ] Add navigation (back/next)
- [ ] Save profile on completion
- [ ] Redirect to dashboard

### Phase 4: Dashboard (Day 8-10)

- [ ] Create dashboard layout
- [ ] Create header with profile summary
- [ ] Create TopicCard component
- [ ] Create DocumentsList component
- [ ] Create StatusBadge component
- [ ] Implement getDashboardCards function
- [ ] Add bottom navigation
- [ ] Link cards to topic pages

### Phase 5: Content Pages (Day 11-14)

- [ ] Set up MDX loading utilities
- [ ] Create topic detail page template
- [ ] Create document guide page template
- [ ] Build FAQ page with search
- [ ] Create settings page
- [ ] Add feedback component
- [ ] Style all content pages

### Phase 6: Content Writing (Day 15-21)

- [ ] Write Germany - Local Employee (4 topics)
- [ ] Write Germany - Posted Worker (4 topics)
- [ ] Write Germany - Remote Worker (4 topics)
- [ ] Write Germany - Returning (4 topics)
- [ ] Write document guides (5 documents)
- [ ] Write FAQs (20 questions)
- [ ] Review and edit all content

### Phase 7: Landing Page (Day 22-23)

- [ ] Design and build landing page
- [ ] Add value proposition section
- [ ] Add "how it works" section
- [ ] Add country flags/badges
- [ ] Add footer with links
- [ ] Optimize for mobile

### Phase 8: Polish & Testing (Day 24-28)

- [ ] Test all quiz combinations
- [ ] Test on real mobile devices
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Fix bugs and edge cases
- [ ] Add loading states
- [ ] Add error states
- [ ] Performance optimization
- [ ] SEO optimization

### Phase 9: Launch Prep (Day 29-30)

- [ ] Set up custom domain
- [ ] Configure SSL
- [ ] Set up analytics (Plausible)
- [ ] Set up error tracking (Sentry)
- [ ] Create social media accounts
- [ ] Prepare launch posts for Facebook groups
- [ ] Final testing
- [ ] Launch! 🚀

---

## 13. Sample Content

### 13.1 Landing Page Copy

```
# Headline
Ghidul tău pentru munca în UE

# Subheadline  
Află în 2 minute unde plătești taxe, unde ești asigurat și ce acte ai nevoie.

# CTA Button
Începe acum →

# Trust indicators
✓ Gratuit și fără cont
✓ Bazat pe informații oficiale UE
✓ Disponibil în română

# How it works
1. Răspunzi la 4 întrebări simple
2. Primești informații personalizate pentru situația ta
3. Afli exact ce documente ai nevoie și de unde le obții

# Countries
Acoperim: Germania 🇩🇪, Spania 🇪🇸, Italia 🇮🇹, Franța 🇫🇷, Marea Britanie 🇬🇧

# Footer disclaimer
Informațiile din această aplicație sunt cu caracter informativ și nu constituie 
consiliere juridică. Pentru situații complexe, consultați un specialist.
```

### 13.2 Error Messages (Romanian)

```typescript
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
```

### 13.3 Success Messages (Romanian)

```typescript
export const SUCCESS_MESSAGES = {
  PROFILE_SAVED: 'Profilul tău a fost salvat!',
  FEEDBACK_SENT: 'Mulțumim pentru feedback!',
  SETTINGS_UPDATED: 'Setările au fost actualizate.',
};
```

---

## Final Notes for AI Implementation

1. **Start with the rules engine** - This is the core logic. Test it thoroughly before building UI.

2. **Use TypeScript strictly** - All types are defined; use them everywhere.

3. **Mobile-first development** - Test on mobile screen sizes throughout development.

4. **Content is king** - The app is only as good as its content. Spend time on clear, accurate, helpful Romanian text.

5. **Offline-first** - Users may have spotty internet. LocalStorage profile and PWA caching are essential.

6. **Iterate on the quiz** - The quiz UX makes or breaks the app. Make it feel effortless.

7. **Link to official sources** - Always provide links to europa.eu and government sites for credibility.

8. **Don't over-engineer** - This is an MVP. Simple solutions are better than complex ones.

9. **Romanian language** - All user-facing text should be in Romanian. Use informal "tu" form, not formal "dumneavoastră".

10. **Test with real users** - Find Romanians working abroad and get their feedback early.

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Author:** Claude (Anthropic)  
**For:** AI-Assisted Implementation
