import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// You'll need to set RESEND_API_KEY in your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, type, data } = body;

    if (!to || !to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    let subject = '';
    let htmlContent = '';

    if (type === 'dashboard') {
      subject = 'Rezumatul tău de pe Diaspora RO';
      htmlContent = generateDashboardEmail(data);
    } else if (type === 'document') {
      subject = `${data.title} - Diaspora RO`;
      htmlContent = generateDocumentEmail(data);
    } else {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'Diaspora RO <onboarding@resend.dev>', // Using Resend test domain - update with your verified domain later
      to,
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

function generateDashboardEmail(data: any): string {
  const { profile, nextSteps, requiredDocuments, taxDeadlines } = data;

  const countryName = getCountryName(profile.residenceCountry);
  const situationName = getSituationName(profile.workSituation);
  const durationText = getDurationText(profile.duration);

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezumatul tău de pe Diaspora RO</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .header {
      background-color: #2D5A87;
      color: white;
      padding: 30px 20px;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .header p {
      margin: 0;
      opacity: 0.9;
    }
    .content {
      background: white;
      padding: 30px 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      color: #2D5A87;
      font-size: 18px;
      margin-bottom: 15px;
      border-bottom: 2px solid #2D5A87;
      padding-bottom: 5px;
    }
    .info-item {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f3f4f6;
      border-radius: 4px;
    }
    .info-label {
      font-weight: 600;
      color: #4b5563;
    }
    .step {
      padding: 15px;
      margin-bottom: 10px;
      background-color: #eff6ff;
      border-left: 4px solid #2D5A87;
      border-radius: 4px;
    }
    .step-number {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #2D5A87;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      margin-right: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .document {
      padding: 8px 12px;
      margin-bottom: 8px;
      background-color: #f0fdf4;
      border-left: 3px solid #22c55e;
      border-radius: 4px;
    }
    .deadline {
      padding: 12px;
      margin-bottom: 10px;
      background-color: #fef3c7;
      border-left: 3px solid #f59e0b;
      border-radius: 4px;
    }
    .deadline-date {
      font-weight: 600;
      color: #92400e;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 12px;
    }
    .disclaimer {
      background-color: #fef3c7;
      border: 1px solid #fcd34d;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
      font-size: 14px;
    }
    .disclaimer strong {
      color: #92400e;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Diaspora RO</h1>
    <p>Rezumatul tău personalizat</p>
  </div>

  <div class="content">
    <div class="section">
      <h2>Situația Ta</h2>
      <div class="info-item">
        <span class="info-label">Țara de rezidență:</span> ${countryName}
      </div>
      <div class="info-item">
        <span class="info-label">Situație de lucru:</span> ${situationName}
      </div>
      ${durationText ? `
      <div class="info-item">
        <span class="info-label">Durată:</span> ${durationText}
      </div>
      ` : ''}
    </div>

    ${nextSteps && nextSteps.length > 0 ? `
    <div class="section">
      <h2>Pași Următori</h2>
      ${nextSteps.slice(0, 10).map((step: any, index: number) => `
        <div class="step">
          <span class="step-number">${index + 1}</span>
          ${step.action}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${taxDeadlines && taxDeadlines.length > 0 ? `
    <div class="section">
      <h2>Termene Fiscale</h2>
      ${taxDeadlines.slice(0, 5).map((deadline: any) => `
        <div class="deadline">
          <div class="deadline-date">${deadline.date}</div>
          <div>${deadline.description}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${requiredDocuments && requiredDocuments.length > 0 ? `
    <div class="section">
      <h2>Documente Necesare</h2>
      ${requiredDocuments.map((doc: string) => `
        <div class="document">✓ ${getDocumentName(doc)}</div>
      `).join('')}
    </div>
    ` : ''}

    <div class="disclaimer">
      <strong>⚠️ Notă importantă:</strong> Informațiile din acest email sunt cu caracter informativ.
      Pentru situații complexe sau incerte, te rugăm să consulți autoritățile competente sau un specialist.
    </div>
  </div>

  <div class="footer">
    <p>Generat la ${new Date().toLocaleDateString('ro-RO')}</p>
    <p>Diaspora RO - Ghidul tău pentru lucrul în UE</p>
  </div>
</body>
</html>
  `;
}

function generateDocumentEmail(data: any): string {
  const { title, officialName, purpose, processingTime, cost, validityPeriod, whoNeeds, howToObtain, officialLink } = data;

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Diaspora RO</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .header {
      background-color: #2D5A87;
      color: white;
      padding: 30px 20px;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 24px;
    }
    .header p {
      margin: 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      background: white;
      padding: 30px 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .section {
      margin-bottom: 25px;
    }
    .section h2 {
      color: #2D5A87;
      font-size: 18px;
      margin-bottom: 12px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    .info-item {
      padding: 12px;
      background-color: #f3f4f6;
      border-radius: 4px;
    }
    .info-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .info-value {
      font-weight: 600;
      color: #1f2937;
    }
    .list-item {
      padding: 10px 10px 10px 30px;
      margin-bottom: 8px;
      background-color: #f0fdf4;
      border-radius: 4px;
      position: relative;
    }
    .list-item::before {
      content: "✓";
      position: absolute;
      left: 10px;
      color: #22c55e;
      font-weight: 600;
    }
    .step {
      padding: 12px 12px 12px 35px;
      margin-bottom: 10px;
      background-color: #eff6ff;
      border-radius: 4px;
      position: relative;
    }
    .step::before {
      content: attr(data-number);
      position: absolute;
      left: 10px;
      top: 12px;
      width: 20px;
      height: 20px;
      background-color: #2D5A87;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .link-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2D5A87;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 10px;
      font-weight: 600;
    }
    .disclaimer {
      background-color: #fef3c7;
      border: 1px solid #fcd34d;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
      font-size: 14px;
    }
    .disclaimer strong {
      color: #92400e;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    <p>${officialName}</p>
  </div>

  <div class="content">
    <div class="section">
      <h2>Informații Rapide</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Timp procesare</div>
          <div class="info-value">${processingTime}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Cost</div>
          <div class="info-value">${cost}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Valabilitate</div>
          <div class="info-value">${validityPeriod}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Scop</div>
          <div class="info-value">${purpose}</div>
        </div>
      </div>
    </div>

    ${whoNeeds && whoNeeds.length > 0 ? `
    <div class="section">
      <h2>Ai nevoie de acest document dacă:</h2>
      ${whoNeeds.map((item: string) => `
        <div class="list-item">${item}</div>
      `).join('')}
    </div>
    ` : ''}

    ${howToObtain && howToObtain.length > 0 ? `
    <div class="section">
      <h2>Cum obții documentul:</h2>
      ${howToObtain.map((step: string, index: number) => `
        <div class="step" data-number="${index + 1}">${step}</div>
      `).join('')}
    </div>
    ` : ''}

    ${officialLink ? `
    <div class="section">
      <h2>Link-uri Oficiale</h2>
      <a href="${officialLink}" class="link-button">Informații oficiale</a>
    </div>
    ` : ''}

    <div class="disclaimer">
      <strong>⚠️ Notă importantă:</strong> Informațiile din acest email sunt cu caracter informativ.
      Pentru situații complexe sau incerte, te rugăm să consulți autoritățile competente sau un specialist.
    </div>
  </div>

  <div class="footer">
    <p>Generat la ${new Date().toLocaleDateString('ro-RO')}</p>
    <p>Diaspora RO - Ghidul tău pentru lucrul în UE</p>
  </div>
</body>
</html>
  `;
}

function getCountryName(countryCode: string): string {
  const names: Record<string, string> = {
    RO: 'România', DE: 'Germania', ES: 'Spania',
    IT: 'Italia', FR: 'Franța', UK: 'Marea Britanie'
  };
  return names[countryCode] || countryCode;
}

function getSituationName(situation: string): string {
  const names: Record<string, string> = {
    local_employee: 'Angajat local',
    posted_worker: 'Lucrător detașat',
    remote_worker: 'Lucrător remote',
    returning: 'Revenire în România'
  };
  return names[situation] || situation;
}

function getDurationText(duration?: string): string {
  if (!duration) return '';
  const durations: Record<string, string> = {
    under_6m: 'Sub 6 luni',
    '6m_to_2y': '6 luni - 2 ani',
    over_2y: 'Peste 2 ani',
    not_yet: 'În planificare'
  };
  return durations[duration] || '';
}

function getDocumentName(docType: string): string {
  const docNames: Record<string, string> = {
    'A1-form': 'Formular A1 (Certificat de asigurări sociale)',
    'S1-form': 'Formular S1 (Drept la asistență medicală)',
    'U1-form': 'Formular U1 (Asigurare de șomaj)',
    'EHIC-card': 'Cardul European de Asigurări de Sănătate',
    'tax-certificate': 'Certificat de rezidență fiscală'
  };
  return docNames[docType] || docType;
}
