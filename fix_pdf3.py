import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

# Make sure html2canvas is imported
if "import html2canvas from 'html2canvas';" not in content:
    content = content.replace("import domtoimage from 'dom-to-image';", "import domtoimage from 'dom-to-image';\nimport html2canvas from 'html2canvas';")

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
            
            const canvas = await html2canvas(pageEl, {
              scale: 2, // High resolution but manageable
              useCORS: true,
              logging: false,
              backgroundColor: '#f8f9fa'
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            
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
