# Export, Share & Email Features - Issue #7

## Overview

This implementation adds B2C (Business-to-Consumer) features to help users save and share their personalized information from Diaspora RO.

## Features Implemented

### 1. PDF Export
Users can export their dashboard summary or individual document pages as professional PDF files.

**Dashboard PDF includes:**
- Profile summary (country, work situation, duration, family status)
- Next steps with priorities
- Tax deadlines
- Required and recommended documents list
- Topic summaries (social security, healthcare, taxes, pensions)

**Document PDF includes:**
- Document title and official name
- Quick information (processing time, cost, validity)
- Who needs it / Who doesn't need it
- How to obtain the document
- Official links

**Location:**
- [src/lib/pdf-export.ts](src/lib/pdf-export.ts) - PDF generation utilities
- Uses `jspdf` library for PDF generation

### 2. Web Share API Integration
Native sharing functionality that works across all modern browsers and mobile devices.

**Features:**
- Share via email, SMS, social media, messaging apps
- Automatic fallback to clipboard copy on unsupported browsers
- Shares title, description, and current page URL

**Location:**
- [src/components/ui/export-share-buttons.tsx](src/components/ui/export-share-buttons.tsx)

### 3. Email Functionality
Send personalized dashboard summaries or document information via email using Resend.

**Features:**
- Beautiful HTML email templates with Romanian localization
- Professional styling matching the app's design
- Two email types: dashboard summary and document details
- Powered by Resend API (free tier: 100 emails/day)

**Location:**
- [src/app/api/send-email/route.ts](src/app/api/send-email/route.ts) - API route
- Email templates included in the route file

## Components

### ExportShareButtons Component
Reusable component with two variants:
- **default**: Full buttons with text labels
- **compact**: Icon-only buttons (used in headers)

**Props:**
```typescript
interface ExportShareButtonsProps {
  onExportPDF: () => Promise<void>;
  shareData: {
    title: string;
    text: string;
    url?: string;
  };
  emailData?: {
    subject: string;
    body: string;
  };
  onEmailSend?: () => Promise<void>;
  variant?: 'default' | 'compact';
}
```

## Integration Points

### 1. Dashboard Header
- **File:** [src/components/dashboard/DashboardHeader.tsx](src/components/dashboard/DashboardHeader.tsx)
- **Location:** Top-right corner, next to Settings icon
- **Features:** Export PDF, Share, Email (compact variant)

### 2. Document Detail Pages
- **File:** [src/app/(app)/document/[slug]/page.tsx](src/app/(app)/document/[slug]/page.tsx)
- **Location:** Top-right corner, next to back button
- **Features:** Export PDF, Share, Email (compact variant)

## Setup Instructions

### 1. Install Dependencies
Already installed:
```bash
npm install jspdf html2canvas resend
```

### 2. Configure Resend (for Email Feature)

1. **Sign up for Resend:**
   - Go to [https://resend.com](https://resend.com)
   - Create a free account (100 emails/day, 3,000/month)

2. **Get your API key:**
   - Log in to your Resend dashboard
   - Navigate to API Keys
   - Create a new API key

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Replace the placeholder with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

4. **Domain verification (optional for production):**
   - For development, you can use Resend's test domain
   - For production, verify your own domain in Resend dashboard
   - Update the `from` address in [src/app/api/send-email/route.ts](src/app/api/send-email/route.ts#L38):
   ```typescript
   from: 'Diaspora RO <noreply@your-verified-domain.com>',
   ```

### 3. Testing

The features are now ready to test:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test Dashboard Export:**
   - Complete the onboarding quiz
   - Go to Dashboard
   - Click the download icon (Export PDF)
   - Click the share icon (Share)
   - Click the mail icon (Email) - requires Resend API key

3. **Test Document Export:**
   - Navigate to any document detail page
   - Click the export/share buttons in the header

## Browser Compatibility

### PDF Export
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Web Share API
- ✅ Chrome 89+, Edge 89+, Safari 12.1+
- ✅ Mobile: iOS 12.2+, Android Chrome 75+
- ⚠️ Fallback: Copies to clipboard on unsupported browsers

### Email Feature
- ✅ Server-side API route (works everywhere)
- ⚠️ Requires valid email address input
- ⚠️ Requires Resend API key configuration

## User Flow

### Export PDF Flow
1. User clicks download icon
2. PDF is generated client-side using jsPDF
3. Browser downloads the PDF file automatically
4. Filename: `diaspora-ro-{country/document}-{timestamp}.pdf`

### Share Flow
1. User clicks share icon
2. If Web Share API is available:
   - Native share sheet appears
   - User selects app/method to share
3. If not available (desktop browsers):
   - Content copied to clipboard
   - User sees confirmation alert

### Email Flow
1. User clicks email icon
2. Prompt asks for email address
3. Email address is validated
4. API request sent to `/api/send-email`
5. Resend sends beautiful HTML email
6. User sees success/error confirmation

## File Structure

```
diaspora-ro/
├── src/
│   ├── lib/
│   │   └── pdf-export.ts                    # PDF generation utilities
│   ├── components/
│   │   └── ui/
│   │       └── export-share-buttons.tsx     # Reusable button component
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/
│   │   │       └── route.ts                 # Email API route
│   │   └── (app)/
│   │       └── document/[slug]/
│   │           └── page.tsx                 # Document page (updated)
│   └── components/
│       └── dashboard/
│           └── DashboardHeader.tsx          # Dashboard header (updated)
├── .env.local.example                        # Environment variables example
└── EXPORT_SHARE_FEATURES.md                 # This file
```

## Dependencies Added

```json
{
  "jspdf": "^2.5.2",
  "html2canvas": "^1.4.1",
  "resend": "^4.0.1"
}
```

## Technical Details

### PDF Generation
- Client-side generation using jsPDF
- No external API calls needed
- Supports Romanian characters (UTF-8)
- Professional styling with app's color scheme (#2D5A87)
- Multi-page support with automatic page breaks
- Footer with generation date and page numbers

### Email Templates
- Responsive HTML design
- Inline CSS for email client compatibility
- Romanian localization
- Professional branding
- Mobile-friendly layout

### Security
- Email addresses validated before sending
- API route uses POST method only
- Environment variables for sensitive data (API keys)
- No user data stored (privacy-friendly)

## Future Enhancements (Optional)

1. **Multiple export formats:**
   - CSV export for document lists
   - JSON export for developers

2. **Social media sharing:**
   - Pre-configured sharing for Facebook, LinkedIn
   - Open Graph meta tags

3. **Email customization:**
   - Let users add a custom message
   - CC/BCC support
   - Save email addresses for quick access

4. **Print functionality:**
   - Direct browser print with custom styling
   - Print-optimized CSS

5. **Cloud storage:**
   - Save PDFs to Google Drive, Dropbox
   - Automatic backups

## Troubleshooting

### PDF not downloading
- Check browser console for errors
- Ensure popup blocker is not blocking downloads
- Try a different browser

### Share not working
- Verify you're using HTTPS (required for Web Share API)
- Check browser compatibility
- Fallback should copy to clipboard

### Email not sending
- Verify `RESEND_API_KEY` is set in `.env.local`
- Check API key is valid in Resend dashboard
- Verify you haven't exceeded free tier limits (100/day)
- Check browser console and server logs for errors
- Test with a valid email address

### Email goes to spam
- Verify your domain in Resend
- Add SPF and DKIM records to DNS
- Use a professional "from" address
- Avoid spam trigger words in subject/body

## Support

For issues or questions:
1. Check this documentation first
2. Review browser console for error messages
3. Check Resend dashboard for email delivery status
4. Open an issue on GitHub with details

## Completed - Issue #7

✅ **Export PDF** - Users can download dashboard and document PDFs
✅ **Share functionality** - Native Web Share API with clipboard fallback
✅ **Email feature** - Send information via Resend email service

All B2C features successfully implemented to help users save and share their personalized information.
