import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

patch = """    try {
      // Ensure all images are fully loaded and layout has settled
      await waitImagesLoaded(element);
      // Adding a small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));

      if (elementId.includes('Proposal')) {
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
            
            // Generate canvas using html2canvas directly on the page wrapper
            const canvas = await html2canvas(pageEl, {
              scale: 2, // High resolution
              useCORS: true,
              logging: false,
              backgroundColor: '#f8f9fa'
            });
            
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            if (i > 0) pdf.addPage('a4', 'portrait');
            
            const pdfWidth = 210;
            const pdfHeight = 297; // A4 size
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
          }
          return pdf;
        }
      }

      const baseScale = isCompressedDoc ? 2.5 : 3;"""

content = re.sub(r'    try \{\n\s*// Ensure all images.*?\n\s*await waitImagesLoaded\(element\);\n\s*// Adding a small.*?\n\s*await new Promise\(resolve => setTimeout\(resolve, 300\)\);\n\s*const baseScale = isCompressedDoc \? 2\.5 : 3;', patch, content, flags=re.DOTALL)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
