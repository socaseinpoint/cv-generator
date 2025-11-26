import { marked } from 'marked';
import puppeteer from 'puppeteer';
import { PDF_STYLES, StyleType } from './styles.js';

interface ContactData {
  label: string;
  value: string;
  href: string;
}

export async function generatePDF(markdown: string, style: StyleType): Promise<Buffer> {
  const lines = markdown.split('\n');
  
  // Parse name
  const nameLineIndex = lines.findIndex(l => l.startsWith('# '));
  const name = lines[nameLineIndex]?.replace('# ', '').trim() || 'CV';
  
  // Parse role
  const roleLineIndex = lines.findIndex((l, i) => i > nameLineIndex && l.trim().startsWith('**'));
  const roleLine = lines[roleLineIndex] || '';
  
  // Parse contacts
  const contactStartIndex = lines.findIndex(l => l.includes('**Contact:**'));
  const contactEndIndex = lines.findIndex((l, i) => i > contactStartIndex && l.trim() === '');
  const contactLines = lines.slice(contactStartIndex + 1, contactEndIndex).filter(l => l.trim().startsWith('-'));
  
  const contactsData: ContactData[] = contactLines.map(line => {
    const text = line.replace('-', '').trim();
    const parts = text.split(':');
    const value = parts.slice(1).join(':').trim();
    let href = value;
    if (value.includes('@')) href = `mailto:${value}`;
    else if (!value.startsWith('http')) href = `https://${value}`;
    
    return { label: parts[0], value, href };
  });

  // Split content for layout
  const rawContent = lines.slice(contactEndIndex).join('\n');
  const splitMarker = '## Technical Skills';
  const [leftMarkdown, rightMarkdown] = rawContent.split(splitMarker);

  const leftHtml = marked.parse(leftMarkdown);
  const rightHtml = marked.parse(`## Technical Skills\n${rightMarkdown || ''}`);

  const css = PDF_STYLES[style];
  let html = '';

  // Modern style uses sidebar layout
  if (style === 'modern') {
    const contactsBlock = contactsData.map(c => `<a href="${c.href}">${c.value}</a>`).join('');
    html = `
      <!DOCTYPE html>
      <html>
      <head><style>${css}</style></head>
      <body>
        <div class="page-wrapper">
          <div class="sidebar">
            <h1>${name}</h1>
            <div class="role">${roleLine.replace(/\*\*/g, '')}</div>
            <div class="contacts-list">${contactsBlock}</div>
            ${rightHtml}
          </div>
          <div class="main">
            ${leftHtml}
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    // Classic and Minimal styles
    const separator = style === 'minimal' ? ' • ' : ' ';
    const contactsBlock = contactsData.map(c => `<a href="${c.href}">${c.value}</a>`).join(separator);
    
    html = `
      <!DOCTYPE html>
      <html>
      <head><style>${css}</style></head>
      <body>
        <header>
          <div class="${style === 'classic' ? 'header-left' : ''}">
            <h1>${name}</h1>
            <div class="role">${roleLine.replace(/\*\*/g, '')}</div>
            <div class="contacts">${contactsBlock}</div>
          </div>
        </header>
        <div class="container">
          <div class="left-column">${leftHtml}</div>
          <div class="right-column">${rightHtml}</div>
        </div>
      </body>
      </html>
    `;
  }

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: style === 'modern' 
        ? { top: 0, bottom: 0, left: 0, right: 0 } 
        : { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });
    
    await page.close();
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}





