import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Profile, DocumentContent } from './types';
import { COUNTRY_FLAGS, SITUATION_NAMES } from './constants';

export async function exportDashboardToPDF(profile: Profile): Promise<void> {
  // Create HTML content that will be converted to PDF
  const htmlContent = createDashboardHTML(profile);

  // Create a temporary container
  const container = window.document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm'; // A4 width
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.backgroundColor = 'white';
  window.document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `diaspora-ro-${profile.residenceCountry.toLowerCase()}-${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } finally {
    // Clean up
    window.document.body.removeChild(container);
  }
}

function createDashboardHTML(profile: Profile): string {
  const countryName = getCountryName(profile.residenceCountry);
  const durationText = getDurationText(profile.duration);
  const familyText = profile.familyStatus && profile.familyStatus.length > 0
    ? getFamilyStatusText(profile.familyStatus)
    : '';

  const topics = ['socialSecurity', 'healthcare', 'taxes', 'pension'] as const;
  const topicTitles = {
    socialSecurity: 'Securitate Socială',
    healthcare: 'Asistență Medicală',
    taxes: 'Impozite',
    pension: 'Pensii'
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <!-- Header -->
      <div style="background-color: #2D5A87; color: white; padding: 20px; margin: -20px -20px 20px -20px;">
        <h1 style="margin: 0; font-size: 24px;">Diaspora RO</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Rezumat Personalizat</p>
      </div>

      <!-- Profile Section -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Situația Ta</h2>
        <p style="margin: 5px 0;"><strong>Țara de rezidență:</strong> ${countryName}</p>
        <p style="margin: 5px 0;"><strong>Situație de lucru:</strong> ${SITUATION_NAMES[profile.workSituation]}</p>
        ${durationText ? `<p style="margin: 5px 0;"><strong>Durată:</strong> ${durationText}</p>` : ''}
        ${familyText ? `<p style="margin: 5px 0;"><strong>Familie:</strong> ${familyText}</p>` : ''}
      </div>

      <!-- Next Steps Section -->
      ${profile.applicableRules.consolidatedNextSteps.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Pași Următori</h2>
          <ol style="margin: 0; padding-left: 20px;">
            ${profile.applicableRules.consolidatedNextSteps.slice(0, 10).map((step, index) => `
              <li style="margin-bottom: 8px;">${step.description}</li>
            `).join('')}
          </ol>
        </div>
      ` : ''}

      <!-- Tax Deadlines Section -->
      ${profile.applicableRules.taxes.deadlines && profile.applicableRules.taxes.deadlines.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Termene Fiscale</h2>
          ${profile.applicableRules.taxes.deadlines.slice(0, 5).map(deadline => `
            <p style="margin: 5px 0;"><strong>${deadline.date}:</strong> ${deadline.description}</p>
          `).join('')}
        </div>
      ` : ''}

      <!-- Required Documents Section -->
      ${profile.applicableRules.requiredDocuments.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Documente Necesare</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${profile.applicableRules.requiredDocuments.map(docType => `
              <li style="margin-bottom: 5px;">${getDocumentName(docType)}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Recommended Documents Section -->
      ${profile.applicableRules.recommendedDocuments.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Documente Recomandate</h2>
          <ul style="margin: 0; padding-left: 20px; list-style-type: circle;">
            ${profile.applicableRules.recommendedDocuments.map(docType => `
              <li style="margin-bottom: 5px;">${getDocumentName(docType)}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Social Security Section -->
      ${(() => {
        const socialRules = profile.applicableRules.socialSecurity as any;
        if (!socialRules || Object.keys(socialRules).length === 0) return '';

        return `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 12px; border-bottom: 2px solid #2D5A87; padding-bottom: 5px;">
              Asigurări Sociale
            </h2>
            <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin-bottom: 10px;">
              ${socialRules.contributions ? `
                <p style="margin: 8px 0;"><strong>Contribuții sociale:</strong> ${socialRules.contributions}</p>
              ` : ''}
              ${socialRules.coverage ? `
                <p style="margin: 8px 0;"><strong>Acoperire:</strong> ${socialRules.coverage}</p>
              ` : ''}
              ${socialRules.required ? `
                <p style="margin: 8px 0;"><strong>Cerințe:</strong> ${socialRules.required}</p>
              ` : ''}
              ${socialRules.benefits ? `
                <p style="margin: 8px 0;"><strong>Beneficii:</strong> ${socialRules.benefits}</p>
              ` : ''}
            </div>
            <div style="background-color: #EFF6FF; padding: 12px; border-left: 4px solid #3B82F6; margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;">
                <strong>Important:</strong> Formularul A1 certifică legislația de asigurări sociale aplicabilă.
                Asigură-te că deții acest formular dacă lucrezi în mai multe țări UE sau ești detașat.
              </p>
            </div>
          </div>
        `;
      })()}

      <!-- Healthcare Access Section -->
      ${(() => {
        const healthRules = profile.applicableRules.healthcare as any;
        if (!healthRules || Object.keys(healthRules).length === 0) return '';

        return `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 12px; border-bottom: 2px solid #2D5A87; padding-bottom: 5px;">
              Acces la Servicii Medicale
            </h2>
            <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin-bottom: 10px;">
              ${healthRules.coverage ? `
                <p style="margin: 8px 0;"><strong>Acoperire medicală:</strong> ${healthRules.coverage}</p>
              ` : ''}
              ${healthRules.card ? `
                <p style="margin: 8px 0;"><strong>Card necesar:</strong> ${healthRules.card}</p>
              ` : ''}
              ${healthRules.registration ? `
                <p style="margin: 8px 0;"><strong>Înregistrare:</strong> ${healthRules.registration}</p>
              ` : ''}
              ${healthRules.emergency ? `
                <p style="margin: 8px 0;"><strong>Urgențe:</strong> ${healthRules.emergency}</p>
              ` : ''}
            </div>
            <div style="background-color: #FEF3C7; padding: 12px; border-left: 4px solid #F59E0B; margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;">
                <strong>Cardul European de Asigurări de Sănătate (CEAS):</strong> Oferă acces la servicii medicale
                necesare în timpul șederii temporare în UE/SEE. Pentru șederi permanente, înregistrează-te
                la sistemul medical local.
              </p>
            </div>
            <div style="margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;"><strong>Servicii acoperite:</strong></p>
              <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
                <li>Consultații la medicul de familie</li>
                <li>Tratamente spitalicești</li>
                <li>Medicamente pe rețetă</li>
                <li>Îngrijiri de urgență</li>
              </ul>
            </div>
          </div>
        `;
      })()}

      <!-- Taxes Section -->
      ${(() => {
        const taxRules = profile.applicableRules.taxes as any;
        if (!taxRules || Object.keys(taxRules).length === 0) return '';

        return `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 12px; border-bottom: 2px solid #2D5A87; padding-bottom: 5px;">
              Taxe și Impozite
            </h2>
            <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin-bottom: 10px;">
              ${taxRules.residency ? `
                <p style="margin: 8px 0;"><strong>Rezidență fiscală:</strong> ${taxRules.residency}</p>
              ` : ''}
              ${taxRules.income ? `
                <p style="margin: 8px 0;"><strong>Impozit pe venit:</strong> ${taxRules.income}</p>
              ` : ''}
              ${taxRules.declaration ? `
                <p style="margin: 8px 0;"><strong>Declarație:</strong> ${taxRules.declaration}</p>
              ` : ''}
              ${taxRules.avoidance ? `
                <p style="margin: 8px 0;"><strong>Evitarea dublei impuneri:</strong> ${taxRules.avoidance}</p>
              ` : ''}
            </div>
            <div style="background-color: #DBEAFE; padding: 12px; border-left: 4px solid #2563EB; margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;">
                <strong>Certificat de rezidență fiscală:</strong> Acest document dovedește unde ești rezident fiscal
                și este esențial pentru a evita dubla impunere. Solicită-l de la autoritățile fiscale din țara
                de rezidență.
              </p>
            </div>
            <div style="margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;"><strong>Aspecte importante:</strong></p>
              <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
                <li>Rezidența fiscală se determină după regula celor 183 de zile</li>
                <li>Veniturile pot fi impozitate în una sau ambele țări</li>
                <li>Convențiile de evitare a dublei impuneri protejează contribuabilii</li>
                <li>Păstrează evidența tuturor veniturilor și taxelor plătite</li>
              </ul>
            </div>
          </div>
        `;
      })()}

      <!-- Pension Section -->
      ${(() => {
        const pensionRules = profile.applicableRules.pension as any;
        if (!pensionRules || Object.keys(pensionRules).length === 0) return '';

        return `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 12px; border-bottom: 2px solid #2D5A87; padding-bottom: 5px;">
              Pensie și Drepturi de Pensie
            </h2>
            <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin-bottom: 10px;">
              ${pensionRules.system ? `
                <p style="margin: 8px 0;"><strong>Sistem de pensii:</strong> ${pensionRules.system}</p>
              ` : ''}
              ${pensionRules.contributions ? `
                <p style="margin: 8px 0;"><strong>Contribuții:</strong> ${pensionRules.contributions}</p>
              ` : ''}
              ${pensionRules.aggregation ? `
                <p style="margin: 8px 0;"><strong>Cumul perioade:</strong> ${pensionRules.aggregation}</p>
              ` : ''}
              ${pensionRules.claiming ? `
                <p style="margin: 8px 0;"><strong>Solicitare pensie:</strong> ${pensionRules.claiming}</p>
              ` : ''}
            </div>
            <div style="background-color: #F0FDF4; padding: 12px; border-left: 4px solid #10B981; margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;">
                <strong>Cumulul perioadelor de asigurare:</strong> Perioadele lucrate în diferite țări UE/SEE
                se pot cumula pentru a îndeplinii condițiile de pensionare. Fiecare țară va plăti pensia
                corespunzătoare perioadei lucrate pe teritoriul său.
              </p>
            </div>
            <div style="margin-top: 10px;">
              <p style="margin: 5px 0; font-size: 13px;"><strong>Informații esențiale:</strong></p>
              <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px;">
                <li>Păstrează documentele care dovedesc toate perioadele de muncă</li>
                <li>Solicită pensie cu 6 luni înainte de vârsta de pensionare</li>
                <li>Poți primi pensie din mai multe țări simultan</li>
                <li>Pensia este plătită în țara de rezidență, indiferent unde ai lucrat</li>
              </ul>
            </div>
          </div>
        `;
      })()}

      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #6B7280; font-size: 12px;">
        <p style="margin: 5px 0;">Generat la ${new Date().toLocaleDateString('ro-RO')}</p>
        <p style="margin: 5px 0;">Diaspora RO - Informații cu caracter informativ</p>
      </div>
    </div>
  `;
}

export async function exportDocumentToPDF(documentData: DocumentContent): Promise<void> {
  // Create HTML content that will be converted to PDF
  const htmlContent = createDocumentHTML(documentData);

  // Create a temporary container
  const container = window.document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm'; // A4 width
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.backgroundColor = 'white';
  window.document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `diaspora-ro-${documentData.slug}-${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } finally {
    // Clean up
    window.document.body.removeChild(container);
  }
}

function createDocumentHTML(document: DocumentContent): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <!-- Header -->
      <div style="background-color: #2D5A87; color: white; padding: 20px; margin: -20px -20px 20px -20px;">
        <h1 style="margin: 0; font-size: 20px;">${document.title}</h1>
        <p style="margin: 5px 0 0 0; font-size: 12px;">${document.officialName}</p>
      </div>

      <!-- Quick Info Section -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Informații Rapide</h2>
        <p style="margin: 5px 0;"><strong>Timp procesare:</strong> ${document.processingTime}</p>
        <p style="margin: 5px 0;"><strong>Cost:</strong> ${document.cost}</p>
        <p style="margin: 5px 0;"><strong>Valabilitate:</strong> ${document.validityPeriod}</p>
        <p style="margin: 5px 0;"><strong>Scop:</strong> ${document.purpose}</p>
      </div>

      <!-- Who Needs It Section -->
      ${document.whoNeeds.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Ai nevoie de acest document dacă:</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${document.whoNeeds.map(item => `
              <li style="margin-bottom: 5px;">${item}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Who Doesn't Need It Section -->
      ${document.whoDoesntNeed.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">NU ai nevoie de acest document dacă:</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${document.whoDoesntNeed.map(item => `
              <li style="margin-bottom: 5px;">${item}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- How to Obtain Section -->
      ${document.howToObtain.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Cum obții documentul:</h2>
          <ol style="margin: 0; padding-left: 20px;">
            ${document.howToObtain.map(step => `
              <li style="margin-bottom: 8px;">${step}</li>
            `).join('')}
          </ol>
        </div>
      ` : ''}

      <!-- Official Links Section -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #2D5A87; font-size: 18px; margin-bottom: 10px;">Link-uri Oficiale:</h2>
        ${document.officialLink ? `
          <p style="margin: 5px 0;"><strong>Informații oficiale:</strong></p>
          <p style="margin: 5px 0 10px 0; color: #2D5A87; font-size: 12px; word-break: break-all;">${document.officialLink}</p>
        ` : ''}
        ${document.templateLink ? `
          <p style="margin: 5px 0;"><strong>Descarcă formular:</strong></p>
          <p style="margin: 5px 0; color: #2D5A87; font-size: 12px; word-break: break-all;">${document.templateLink}</p>
        ` : ''}
      </div>

      <!-- Disclaimer -->
      <div style="background-color: #FEF3C7; border: 2px solid #FBB936; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <p style="margin: 0; color: #92400E; font-size: 14px;">
          <strong>Notă importantă:</strong> Informațiile din acest document sunt cu caracter informativ.
          Pentru situații complexe, consultați autoritățile competente.
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #6B7280; font-size: 12px;">
        <p style="margin: 5px 0;">Generat la ${new Date().toLocaleDateString('ro-RO')}</p>
        <p style="margin: 5px 0;">Diaspora RO - Informații cu caracter informativ</p>
      </div>
    </div>
  `;
}

// Helper functions
function getCountryName(countryCode: string): string {
  const countryNames: Record<string, string> = {
    RO: 'România',
    DE: 'Germania',
    ES: 'Spania',
    IT: 'Italia',
    FR: 'Franța',
    UK: 'Marea Britanie'
  };
  return countryNames[countryCode] || countryCode;
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

function getFamilyStatusText(familyStatus: string[]): string {
  const statusMap: Record<string, string> = {
    spouse_with: 'Partener în țara de destinație',
    children_with: 'Copii în țara de destinație',
    family_in_romania: 'Familie în România',
    single: 'Fără familie'
  };
  return familyStatus.map(s => statusMap[s] || s).join(', ');
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
