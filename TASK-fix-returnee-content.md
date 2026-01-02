# Task: Fix Returnee Content Gap - Enable Country-Specific Guidance

## Problem Statement

Currently, when users return to Romania from abroad, they **cannot specify which country they worked in**. This causes a critical content gap:

- Users select: `residenceCountry: 'RO'` + `workSituation: 'returning'`
- System hardcodes: `destinationCountry: 'RO'`
- Content matching looks for: `countries: ['RO']`
- **Result**: Only finds generic `ro-returning.mdx` files

**But country-specific files exist and are NOT being shown:**
- ✅ `pension/de-returning.mdx` (countries: ['DE']) - NOT matched!
- ✅ `pension/es-returning.mdx` (countries: ['ES']) - NOT matched!
- ✅ `pension/fr-returning.mdx` (countries: ['FR']) - NOT matched!
- ✅ `pension/it-returning.mdx` (countries: ['IT']) - NOT matched!
- ❌ `pension/uk-returning.mdx` - **Missing entirely**

**Impact**: Returnees don't get critical information like:
- They'll receive **separate pensions** from both countries
- How to claim UK State Pension + Workplace Pension from HMRC
- Country-specific documents to preserve (Rentenversicherungsnummer for DE, NI number for UK, etc.)
- The difference between "contribution aggregation for eligibility" vs "receiving actual pension payments from two systems"

## Current State Analysis

### Existing Content Files

**Pension files for returning:**
```
✅ pension/de-returning.mdx (16KB) - Explains dual DE/RO pensions
✅ pension/es-returning.mdx (19KB) - Explains dual ES/RO pensions
✅ pension/fr-returning.mdx (24KB) - Explains dual FR/RO pensions
✅ pension/it-returning.mdx (14KB) - Explains dual IT/RO pensions
❌ pension/uk-returning.mdx - MISSING
```

**Healthcare files for returning:**
```
✅ healthcare/de-returning.mdx
✅ healthcare/es-returning.mdx
✅ healthcare/fr-returning.mdx
✅ healthcare/it-returning.mdx
✅ healthcare/ro-returning.mdx (generic)
❌ healthcare/uk-returning.mdx - MISSING
```

**Social Security files:**
```
✅ social-security/de-returning.mdx
✅ social-security/es-returning.mdx
✅ social-security/fr-returning.mdx
✅ social-security/it-returning.mdx
✅ social-security/uk-returning.mdx - EXISTS!
```

**Taxes files:**
```
✅ taxes/de-returning.mdx
✅ taxes/es-returning.mdx
✅ taxes/fr-returning.mdx
✅ taxes/it-returning.mdx
❌ taxes/uk-returning.mdx - MISSING
```

### Current Quiz Flow

```
Step 1: Country Selection (CountrySelector.tsx)
  ↓ "Unde locuiești?" → Single selection (RO, DE, ES, IT, FR, UK)

Step 2: Situation (SituationSelector.tsx)
  ↓ "Care e situația ta?" → Single selection
  ↓ Options: local_employee, posted_worker, remote_worker, returning
  ↓ If residence=RO: excludes posted_worker and remote_worker

Step 3: Duration (DurationSelector.tsx)
  ↓ "De cât timp?" → Single selection

Step 4: Family Status (FamilySelector.tsx)
  ↓ "Situația familiei" → Multi-select

Result: Profile created → Dashboard
```

**Missing**: No step asks "From which country are you returning?"

### Current Data Model

**File**: `src/lib/types.ts`

```typescript
export interface Profile {
  id: string;
  residenceCountry: CountryCode;      // Where they live NOW
  workSituation: WorkSituation;
  duration: Duration;
  familyStatus: FamilyStatus[];
  destinationCountry: CountryCode;    // Calculated by rules-engine
  // MISSING: sourceCountry for returnees
}

export interface QuizAnswers {
  residenceCountry?: CountryCode;
  workSituation?: WorkSituation;
  duration?: Duration;
  familyStatus?: FamilyStatus[];
  // MISSING: sourceCountry for returnees
}
```

### Current Rules Engine Logic

**File**: `src/lib/rules-engine.ts` (lines 74-91)

```typescript
function determineDestinationCountry(
  residenceCountry: CountryCode,
  workSituation: WorkSituation
): CountryCode {
  // For returning migrants, destination is Romania
  if (workSituation === 'returning') {
    return 'RO';  // ← HARDCODED! This is the problem
  }

  // For others living abroad, that's their destination
  if (residenceCountry !== 'RO') {
    return residenceCountry;
  }

  return 'RO';
}
```

### Content Matching Logic

**File**: `src/lib/content/loader.ts`

```typescript
export async function getTopicsForProfile(
  country: CountryCode,
  situation: WorkSituation
): Promise<TopicContent[]> {
  return allTopics.filter(
    topic =>
      topic.countries.includes(country) &&
      topic.situations.includes(situation)
  );
}
```

**Problem**: For returnees, `country` is always 'RO', so it can never match files with `countries: ['DE']`, `countries: ['UK']`, etc.

## Solution Design

### Approach: Add Source Country Tracking

We'll add a new field to capture where returnees worked abroad, then use it for content matching.

### Changes Required

#### 1. Update Type Definitions

**File**: `src/lib/types.ts`

```typescript
export interface Profile {
  // ... existing fields
  sourceCountry?: CountryCode;  // NEW: For returning situation - where they worked abroad
}

export interface QuizAnswers {
  // ... existing fields
  sourceCountry?: CountryCode;  // NEW: For returning situation
}
```

#### 2. Create Source Country Selector Component

**New file**: `src/components/quiz/SourceCountrySelector.tsx`

Similar to `CountrySelector.tsx`, but:
- Only shown when `workSituation === 'returning'`
- Question: "Din ce țară te întorci?" (From which country are you returning?)
- Excludes Romania from options
- Stores answer in `sourceCountry` field

#### 3. Update Quiz Container

**File**: `src/components/quiz/QuizContainer.tsx`

Add new step between "Situation" and "Duration":
```
Step 1: Country (residence) → RO
Step 2: Situation → returning
Step 2.5: Source Country (NEW!) → UK, DE, ES, etc.  ← Only if situation=returning
Step 3: Duration
Step 4: Family Status
```

#### 4. Update Rules Engine

**File**: `src/lib/rules-engine.ts`

```typescript
export function createProfileFromQuiz(answers: QuizAnswers): Profile {
  const {
    residenceCountry,
    workSituation,
    duration,
    familyStatus,
    sourceCountry,  // NEW
  } = answers;

  // ... validation

  const destinationCountry = determineDestinationCountry(
    residenceCountry,
    workSituation,
    sourceCountry  // NEW parameter
  );

  return {
    // ... existing fields
    sourceCountry,  // NEW: Store it in profile
  };
}

function determineDestinationCountry(
  residenceCountry: CountryCode,
  workSituation: WorkSituation,
  sourceCountry?: CountryCode  // NEW parameter
): CountryCode {
  if (workSituation === 'returning') {
    // Use sourceCountry for content matching if available
    return sourceCountry || 'RO';  // Fallback to RO for backward compatibility
  }

  if (residenceCountry !== 'RO') {
    return residenceCountry;
  }

  return 'RO';
}
```

**Key insight**: By setting `destinationCountry = sourceCountry` for returnees, existing content matching logic will automatically work!

#### 5. Create Missing UK Content Files

**New files to create** (based on existing DE/ES/FR/IT templates):

1. **`pension/uk-returning.mdx`** - CRITICAL
   - Explain UK State Pension (separate from Romanian pension)
   - Explain UK Workplace Pension
   - How to claim from HMRC
   - Preserve NI number and pension statements
   - Link to GOV.UK PensionWise
   - Clear examples of receiving two pension payments

2. **`healthcare/uk-returning.mdx`**
   - Leaving NHS, joining CNAS
   - EHIC for UK visits
   - Transferring medical records

3. **`taxes/uk-returning.mdx`**
   - Final UK tax return
   - P45 document
   - Claiming UK tax refunds
   - Romanian tax obligations

**Content template structure** (from existing files):

```markdown
---
slug: pension-uk-returning
title: Pensie - Întoarcerea în România din Marea Britanie
topic: pension
countries: ['UK']  ← This is the key! Not ['RO']
situations: ['returning']
summary: Perioadele lucrate în UK contează pentru pensia ta. Vei primi pensie din ambele țări când te pensionezi. Nu pierzi nimic întorcându-te în România.
lastUpdated: 2025-01-01
sources:
  - title: GOV.UK - State Pension
    url: https://www.gov.uk/state-pension
    authority: UK Government
  - title: Casa Națională de Pensii Publice
    url: https://www.cnpp.ro/
    authority: Romanian Pension Authority
---

## Vestea bună - Nu pierzi nimic!

### Ce se întâmplă cu contribuțiile din UK

**Important de înțeles:**

✅ **Contribuțiile din UK RĂMÂN în sistemul britanic**
✅ **NU se pierd** când te întorci în România
✅ **NU se transferă** în sistemul românesc
✅ **Contează pentru pensia ta** - vei primi pensie de la UK la pensionare

**Principiu:** Fiecare țară UE (+ UK post-Brexit) **păstrează contribuțiile** și **plătește pensie proporțional** cu anii contribuiți acolo.

**Rezultat:** La pensionare, vei primi **pensii separate** din:
- **România** - pentru anii lucrați în RO
- **UK State Pension** - pentru anii lucrați în UK (National Insurance)
- **UK Workplace Pension** - din fondul tău privat UK
- **+ alte țări UE** - dacă ai lucrat și acolo

### Important: Două tipuri de pensie din UK!

**1. State Pension (Pensia de stat):**
- Bazată pe National Insurance contributions
- £221.20/săptămână pentru 35 ani completi
- Minim 10 ani pentru orice pensie
- Plătită de UK Government oriunde în lume

**2. Workplace Pension (Pensia la locul de muncă):**
- Fondul tău privat (tu + angajator au contribuit)
- Poți accesa de la 55 ani (57 din 2028)
- Opțiuni: annuity, drawdown, lump sum
- 25% tax-free la retragere

## Cum funcționează cumularea perioadelor

[Continue with concrete examples like DE/ES files...]
```

#### 6. Update Dashboard/Content Display

**File**: `src/app/(app)/dashboard/page.tsx`

The content matching already uses `destinationCountry` from the profile, so once we fix step 4 (rules engine), this should automatically work.

But verify that dashboard cards link to correct content:
- For returnee from UK: Should show links to `pension-uk-returning`, `healthcare-uk-returning`, etc.
- Not generic `ro-returning` files

#### 7. Handle Backward Compatibility

Existing user profiles don't have `sourceCountry`. Options:

**Option A**: Reset all profiles (simple)
- Clear localStorage
- Force re-onboarding
- Add migration logic in store

**Option B**: Graceful fallback (better UX)
- If `workSituation === 'returning'` and `sourceCountry` is undefined
- Show generic `ro-returning` content OR
- Prompt user to update profile (add source country)

#### 8. Update Settings/Profile Edit

**File**: `src/app/(app)/setari/page.tsx`

Currently only has "Reset Profile". Consider adding:
- "Edit Profile" option
- Allow changing source country without full reset
- Show current source country for returnees

## Implementation Checklist

### Phase 1: Type System & Data Model
- [ ] Add `sourceCountry?: CountryCode` to `Profile` interface in `types.ts`
- [ ] Add `sourceCountry?: CountryCode` to `QuizAnswers` interface in `types.ts`
- [ ] Update `createProfileFromQuiz()` to accept and store `sourceCountry`
- [ ] Update `determineDestinationCountry()` to use `sourceCountry` for returnees

### Phase 2: Quiz UI Components
- [ ] Create `SourceCountrySelector.tsx` component
  - Question: "Din ce țară te întorci?"
  - Show countries: DE, ES, IT, FR, UK (exclude RO)
  - Similar styling to existing CountrySelector
  - Validation required
- [ ] Update `QuizContainer.tsx` to include source country step
  - Show after situation selection
  - Only if `workSituation === 'returning'`
  - Step number: 2.5 (between situation and duration)
- [ ] Update quiz validation to require sourceCountry when returning

### Phase 3: Content Files - UK Returning
- [ ] Create `pension/uk-returning.mdx` (16-20KB expected)
  - Dual pension explanation (State + Workplace)
  - Concrete examples with numbers
  - Documents to preserve (NI number, P60s, pension statements)
  - How to claim from HMRC/pension providers
  - Links to GOV.UK resources
- [ ] Create `healthcare/uk-returning.mdx` (12-15KB expected)
  - NHS → CNAS transition
  - EHIC for UK visits
  - Medical records transfer
- [ ] Create `taxes/uk-returning.mdx` (10-12KB expected)
  - Final UK tax return
  - P45 importance
  - Split-year treatment
  - Claiming refunds

### Phase 4: Testing & Validation
- [ ] Test quiz flow: RO + returning → source country selector appears
- [ ] Test quiz flow: Non-RO residence → source country selector hidden
- [ ] Test content matching: UK returnee sees uk-returning content
- [ ] Test content matching: DE returnee sees de-returning content
- [ ] Test dashboard cards link to correct country-specific content
- [ ] Test backward compatibility with existing profiles
- [ ] Verify all returnee content files are now accessible

### Phase 5: Optional Enhancements
- [ ] Add profile edit capability (change source country without reset)
- [ ] Add migration for existing returnee profiles
- [ ] Update onboarding tooltips to explain source country selection
- [ ] Add analytics to track which return countries are most common

## Files to Modify

### Type Definitions
- `src/lib/types.ts` - Add sourceCountry field

### Rules Engine
- `src/lib/rules-engine.ts` - Use sourceCountry for returnees

### Quiz Components
- `src/components/quiz/QuizContainer.tsx` - Add conditional step
- `src/components/quiz/SourceCountrySelector.tsx` - NEW FILE

### Content Files (NEW)
- `src/content/topics/pension/uk-returning.mdx` - NEW
- `src/content/topics/healthcare/uk-returning.mdx` - NEW
- `src/content/topics/taxes/uk-returning.mdx` - NEW

### Testing
- `src/app/(app)/dashboard/page.tsx` - Verify content links
- `src/lib/store.ts` - May need migration logic

## Testing Scenarios

### Test Case 1: New UK Returnee
1. Start quiz
2. Select: RO (residence) → returning → UK (source) → >2 years → family status
3. Complete quiz
4. **Expected**: Dashboard shows 4 cards with links:
   - `/topic/pension-uk-returning`
   - `/topic/healthcare-uk-returning`
   - `/topic/taxes-uk-returning`
   - `/topic/social-security-uk-returning`
5. Click pension card → See UK-specific dual pension content

### Test Case 2: Existing DE Returnee (Previously Broken)
1. Start quiz
2. Select: RO → returning → DE → >2 years → family status
3. **Expected**: Now sees `/topic/pension-de-returning` (was broken before!)

### Test Case 3: Non-Returnee
1. Start quiz
2. Select: DE (residence) → local_employee
3. **Expected**: Source country selector NOT shown
4. Dashboard shows de-local-employee content

### Test Case 4: Backward Compatibility
1. Load app with old profile (no sourceCountry)
2. **Expected**: Either shows generic content OR prompts to update profile

## Success Criteria

✅ **All returnees can specify source country** - UK, DE, ES, IT, FR
✅ **UK returnees see UK-specific pension content** explaining dual pensions
✅ **DE/ES/IT/FR returnees now see their country-specific content** (previously broken!)
✅ **Generic ro-returning content** still available as fallback
✅ **No breaking changes** for non-returnee users
✅ **Backward compatible** with existing profiles (graceful degradation)

## Risk Assessment

**Low Risk:**
- Adding optional field to types (backward compatible)
- Creating new content files (additive only)
- Updating rules engine (existing users not affected until re-quiz)

**Medium Risk:**
- Quiz flow changes (test thoroughly)
- Content matching logic (verify all scenarios)

**Mitigation:**
- Feature flag for source country selector (can disable if issues)
- Keep generic ro-returning as fallback
- Add comprehensive testing before deployment

## References

### Existing Good Examples
- `pension/de-returning.mdx` - Template for dual pension explanation
- `pension/uk-local-employee.mdx` - UK pension system reference
- `CountrySelector.tsx` - Component pattern to follow

### External Resources for UK Content
- https://www.gov.uk/state-pension
- https://www.gov.uk/check-national-insurance-record
- https://www.pensionwise.gov.uk
- https://www.gov.uk/tax-right-retire-abroad-return-to-uk

## Timeline Estimate

- **Phase 1** (Types & Rules): 1-2 hours
- **Phase 2** (Quiz UI): 2-3 hours
- **Phase 3** (UK Content): 4-6 hours (research + writing)
- **Phase 4** (Testing): 2-3 hours
- **Total**: 9-14 hours of focused work

## Notes

- This fix helps ALL returnees (not just UK), as the content matching was broken for everyone
- The existing country-specific files (DE, ES, IT, FR) are already excellent - they just weren't being shown
- UK is the only country missing content files for returning scenario
- Post-Brexit, UK pension coordination still works via Withdrawal Agreement (important to explain in content)
