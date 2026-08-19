import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

patch = """      if (elementId.includes('Proposal')) {
        const pageElements = Array.from(element.querySelectorAll('.w-\\\\[794px\\\\]')) as HTMLElement[];
        if (pageElements.length > 0) {
          const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true
          });

          for (let i = 0; i < pageElements.length; i++) {
            const pageEl = pageElements[i];
            
            // Generate canvas using domtoimage on each page wrapper
            const imgData = await domtoimage.toJpeg(pageEl, {
              quality: 1.0,
              bgcolor: '#f8f9fa',
              width: 794 * 3,
              height: 1123 * 3,
              style: {
                transform: 'scale(3)',
                transformOrigin: 'top left',
                width: '794px',
                height: '1123px'
              }
            });
            
            if (i > 0) pdf.addPage('a4', 'portrait');
            
            const pdfWidth = 210;
            const pdfHeight = 297; // A4 size
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
          }
          return pdf;
        }
      }"""

content = re.sub(r'      if \(elementId\.includes\(\'Proposal\'\)\) \{.*?return pdf;\n        \}\n      \}', patch, content, flags=re.DOTALL)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
