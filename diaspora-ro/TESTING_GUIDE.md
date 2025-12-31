# DiasporaRO - Testing Guide

## How to Test the New Features

### Prerequisites
```bash
cd diaspora-ro
npm run dev
```

The app should now be running at `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use).

---

## Test Scenarios

### 1. Complete Quiz Flow → View Topic Content

**Steps:**
1. Open `http://localhost:3000`
2. Click **"Începe acum"** button
3. Complete the quiz with these answers:
   - **Country:** Germania (Germany)
   - **Situation:** Angajat cu contract local (Local Employee)
   - **Duration:** Peste 2 ani (Over 2 years)
   - **Family:** Any option

4. Click through to Dashboard
5. You should see **4 topic cards**:
   - 🛡️ Asigurări Sociale
   - 🏥 Sănătate
   - 💰 Taxe
   - 👴 Pensie

6. **Click** on "Asigurări Sociale" card
   - ✅ Should navigate to `/topic/social-security-de-local-employee`
   - ✅ Should show full content about German social security
   - ✅ Should show related documents
   - ✅ Should show official sources

7. **Click** on "Sănătate" card
   - ✅ Should navigate to `/topic/healthcare-de-local-employee`
   - ✅ Should show comprehensive healthcare guide
   - ✅ Should mention EHIC card
   - ✅ Should have link to EHIC document

8. **Click** on "Taxe" card
   - ✅ Should show tax information
   - ✅ Should explain progressive tax system
   - ✅ Should mention Romanian income declaration

9. **Click** on "Pensie" card
   - ✅ Should show pension information
   - ✅ Should explain cumulation
   - ✅ Should have concrete examples

### 2. Document Guide Pages

**From any topic page:**
1. Look for **"Documente Relevante"** section
2. Click on **"EHIC CARD"**
   - ✅ Should navigate to `/document/ehic-card`
   - ✅ Should show comprehensive EHIC guide
   - ✅ Should display quick info cards:
     - Processing time: 1-2 săptămâni
     - Cost: Gratuit
     - Validity: 1-5 ani
   - ✅ Should show "Who needs it" checklist
   - ✅ Should show "Who doesn't need it" list
   - ✅ Should show step-by-step guide
   - ✅ Should have official links at bottom

**Or directly:**
- Navigate to `http://localhost:3000/document/ehic-card`

### 3. FAQ Search & Filter

**Steps:**
1. Click **"FAQ"** in bottom navigation
2. Should see **15 FAQs** listed

**Test Search:**
3. Type **"pensie"** in search box
   - ✅ Should filter to pension-related questions
   - ✅ Results should update in real-time

4. Type **"EHIC"**
   - ✅ Should show EHIC-related questions

5. Clear search (delete text)
   - ✅ Should show all FAQs again

**Test Profile Filter:**
6. Click **"Filtrează pentru situația mea"** button
   - ✅ Button should turn blue (active)
   - ✅ Should show text: "Afișez întrebări relevante pentru Germania"
   - ✅ FAQs should filter to those relevant for Germany + Local Employee

7. Click button again to toggle off
   - ✅ Should show all FAQs

**Test Accordion:**
8. Click on any FAQ question
   - ✅ Should expand to show answer
   - ✅ Should show topic badges (🛡️, 🏥, etc.)
   - ✅ Should show country flags

9. Click on expanded question again
   - ✅ Should collapse

### 4. Navigation & Back Button

**Test Bottom Navigation:**
1. Click between tabs:
   - 🏠 Acasă (Dashboard)
   - 📄 Acte (Documents - may not be implemented)
   - ❓ FAQ
   - ⚙️ Setări (Settings - may not be implemented)

2. ✅ Active tab should be highlighted
3. ✅ Navigation should be sticky at bottom

**Test Back Navigation:**
1. From a topic page, click **"Înapoi la Dashboard"** link
   - ✅ Should return to dashboard

2. Use browser back button
   - ✅ Should work correctly
   - ✅ Quiz state should be preserved

### 5. Mobile Responsive

**Test on different screen sizes:**

**Desktop (1920px):**
- ✅ Content should be centered
- ✅ Max-width container should be visible
- ✅ Cards should be easy to read

**Tablet (768px):**
- ✅ Layout should adapt
- ✅ Bottom nav should be visible
- ✅ Content should be readable

**Mobile (375px):**
- ✅ Single column layout
- ✅ Touch-friendly buttons
- ✅ Bottom nav should not overlap content
- ✅ Text should be readable without zooming

**Use Chrome DevTools:**
- Press `F12`
- Click device toolbar icon (or `Ctrl+Shift+M`)
- Test different device sizes

### 6. Content Rendering

**Check MDX formatting:**
1. Open any topic page
2. Content should have:
   - ✅ Proper headings (h2, h3)
   - ✅ Bold text for emphasis
   - ✅ Bulleted lists
   - ✅ Links that are clickable
   - ✅ Tables (in tax page)
   - ✅ Code blocks (in pension page)
   - ✅ Emoji icons
   - ✅ Checkmarks and X marks

3. Check document page:
   - ✅ Numbered steps should have circle badges
   - ✅ Checkmarks should be green
   - ✅ X marks should be red

---

## Expected Issues (Known Limitations)

### Content Not Yet Created
If you test with countries/situations other than Germany + Local Employee:
- Topic pages will return **404** because content doesn't exist yet
- This is expected! Only 4 topics for DE + local_employee are created

### Missing Pages
- Settings page (`/setari`) - Not fully implemented
- Documents list page (`/documents`) - Not fully implemented

These are planned for future iterations.

---

## Quick Visual Checks

### Dashboard Cards Should Show:
- ✅ Topic icon (🛡️, 🏥, 💰, 👴)
- ✅ Country flag (🇩🇪)
- ✅ Status badge (✓, ⚠️, or ❗)
- ✅ Summary text
- ✅ 2-3 details
- ✅ Arrow (→) indicating link

### Topic Pages Should Show:
- ✅ Back button
- ✅ Topic icon + title
- ✅ Country flag + name
- ✅ Summary card
- ✅ Well-formatted content
- ✅ Related documents section
- ✅ Sources with external link icons
- ✅ Last updated date

### Document Pages Should Show:
- ✅ Back button
- ✅ Document icon + title
- ✅ Quick info grid (4 cards)
- ✅ Green checkmarks for "needs"
- ✅ Red X for "doesn't need"
- ✅ Numbered steps with badges
- ✅ Official links with external icon
- ✅ Warning disclaimer at bottom

### FAQ Page Should Show:
- ✅ Search bar with icon
- ✅ Filter toggle button (if profile exists)
- ✅ Results count
- ✅ Accordion items with:
   - Question text
   - Topic badges
   - Country badges
   - Expandable answer

---

## Browser Console Check

Open browser console (`F12` → Console tab):
- ❌ Should have **NO red errors**
- ⚠️ Yellow warnings are okay
- ✅ App should load without JavaScript errors

---

## Performance Check

**Page Load Speed:**
1. Open Network tab in DevTools
2. Reload page
3. Check:
   - ✅ Initial load should be < 2 seconds
   - ✅ No failed requests (404s should only be for missing content)

**Navigation Speed:**
1. Click between pages
2. ✅ Should feel instant (client-side routing)
3. ✅ No full page reload

---

## Testing URLs

Here are direct URLs you can test:

### Working URLs (should load)
- `http://localhost:3000/` - Landing page
- `http://localhost:3000/onboarding` - Quiz
- `http://localhost:3000/dashboard` - Dashboard (after quiz)
- `http://localhost:3000/topic/social-security-de-local-employee`
- `http://localhost:3000/topic/healthcare-de-local-employee`
- `http://localhost:3000/topic/taxes-de-local-employee`
- `http://localhost:3000/topic/pension-de-local-employee`
- `http://localhost:3000/document/ehic-card`
- `http://localhost:3000/faq`

### Expected 404s (content not created yet)
- `http://localhost:3000/topic/social-security-es-local-employee` (Spain)
- `http://localhost:3000/topic/healthcare-de-posted-worker` (Posted worker)
- `http://localhost:3000/document/a1-form` (A1 document)

---

## Reporting Issues

If you find bugs, note:
1. **What you did** (steps to reproduce)
2. **What you expected** to happen
3. **What actually happened**
4. **Browser** and version
5. **Console errors** (if any)

---

## Success Criteria

✅ **This iteration is successful if:**
1. Quiz completes and creates profile
2. Dashboard shows 4 topic cards
3. All 4 topic pages load with content
4. EHIC document page loads with content
5. FAQ page shows 15 questions
6. FAQ search works in real-time
7. FAQ filter works correctly
8. Navigation between pages works
9. Mobile layout is responsive
10. No JavaScript errors in console

---

**Happy Testing! 🚀**
