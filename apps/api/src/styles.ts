export const PDF_STYLES = {
  classic: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
    :root { --accent: #F4A261; --text: #444; --head: #000; }
    body { font-family: 'Inter', sans-serif; color: var(--text); padding: 25px 35px; font-size: 9px; line-height: 1.35; }
    header { margin-bottom: 15px; display: flex; justify-content: space-between; align-items: flex-start; }
    .header-left { border-left: 4px solid var(--accent); padding-left: 12px; }
    h1 { font-size: 18px; font-weight: 800; margin: 0 0 3px 0; color: var(--head); text-transform: uppercase; letter-spacing: 0.5px; }
    .role { font-size: 11px; color: #333; font-weight: 600; margin-bottom: 8px; }
    .contacts { font-size: 9px; color: #666; margin-top: 3px; }
    .contacts a { color: #666; text-decoration: none; margin-right: 8px; }
    .container { display: grid; grid-template-columns: 65% 30%; gap: 5%; }
    h2 { font-size: 13px; text-transform: uppercase; color: #556B2F; border-bottom: 1px solid #eee; padding-bottom: 3px; margin-top: 12px; margin-bottom: 8px; font-weight: 700; }
    h3 { font-size: 11px; font-weight: 700; margin: 8px 0 1px 0; color: #000; }
    p, ul { margin: 2px 0; }
    ul { padding-left: 12px; }
    li { margin-bottom: 1px; }
  `,

  modern: `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    body { font-family: 'Roboto', sans-serif; color: #333; margin: 0; padding: 0; font-size: 9px; line-height: 1.4; }
    
    .page-wrapper { display: grid; grid-template-columns: 32% 68%; min-height: 100vh; }
    
    .sidebar { background-color: #2C3E50; color: #ecf0f1; padding: 30px 20px; }
    .main { padding: 30px 25px; background: #fff; }
    
    .sidebar h1 { font-size: 20px; margin: 0 0 5px 0; color: #fff; font-weight: 700; line-height: 1.2; }
    .sidebar .role { font-size: 11px; color: #bdc3c7; margin-bottom: 20px; font-weight: 500; }
    .sidebar h2 { font-size: 12px; text-transform: uppercase; color: #3498DB; border-bottom: 1px solid #34495E; padding-bottom: 5px; margin-top: 20px; margin-bottom: 10px; }
    .sidebar a { color: #bdc3c7; text-decoration: none; display: block; margin-bottom: 3px; }
    .sidebar h3 { font-size: 10px; color: #fff; margin-top: 10px; margin-bottom: 2px; }
    .sidebar p, .sidebar li { color: #bdc3c7; font-size: 9px; }
    
    .main h2 { font-size: 14px; text-transform: uppercase; color: #2C3E50; border-bottom: 2px solid #ecf0f1; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; letter-spacing: 1px; }
    .main h2:not(:first-of-type) { margin-top: 20px; }
    
    .main h3 { font-size: 12px; font-weight: 700; margin: 12px 0 2px 0; color: #000; }
    .main p { margin-bottom: 5px; }
    .main ul { padding-left: 15px; margin-top: 2px; }
    .main li { margin-bottom: 3px; color: #444; }
  `,

  minimal: `
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Open+Sans:wght@400;600;700&display=swap');
    body { font-family: 'Open Sans', sans-serif; color: #222; padding: 30px 40px; font-size: 9px; line-height: 1.45; }
    
    header { text-align: center; margin-bottom: 25px; border-bottom: 1px solid #ddd; padding-bottom: 20px; }
    h1 { font-family: 'Lora', serif; font-size: 22px; margin: 0 0 5px 0; color: #000; }
    .role { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #666; margin-bottom: 10px; }
    .contacts { font-size: 9px; color: #555; }
    .contacts span { margin: 0 5px; }
    .contacts a { color: #222; text-decoration: none; border-bottom: 1px dotted #999; }
    
    .container { display: grid; grid-template-columns: 70% 25%; gap: 5%; }
    
    h2 { font-family: 'Lora', serif; font-size: 13px; font-weight: 600; color: #000; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; padding-bottom: 3px; border-bottom: 1px solid #000; }
    h3 { font-size: 11px; font-weight: 700; margin: 10px 0 2px 0; color: #000; }
    
    p { margin: 3px 0; text-align: justify; }
    ul { padding-left: 15px; margin: 3px 0; }
    li { margin-bottom: 2px; }
  `
} as const;

export type StyleType = keyof typeof PDF_STYLES;





