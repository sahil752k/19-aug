import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

# Replace the Proposal specific code
patch1 = """      if (elementId.includes('Proposal')) {
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
            
            const imgData = await domtoimage.toJpeg(pageEl, {
              quality: 0.95,
              bgcolor: '#ffffff',
              width: 794 * 2,
              height: 1123 * 2,
              style: {
                transform: 'scale(2)',
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

content = re.sub(r'      if \(elementId\.includes\(\'Proposal\'\)\) \{.*?return pdf;\n        \}\n      \}', patch1, content, flags=re.DOTALL)

# Replace the fallback generic code
patch2 = """      const imgData = await domtoimage.toPng(element, {
        bgcolor: '#ffffff',
        width: width * baseScale,
        height: height * baseScale,
        style: {
          transform: `scale(${baseScale})`,
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${height}px`
        }
      });

      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create master canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }

      const firstPageHeight = (pages.length > 0 && pages[0] ? pages[0].end - pages[0].start : height) * 210 / width;
      const pdfWidth = 210; // Fixed A4 width in mm"""

content = re.sub(r'      const canvas = await html2canvas\(element, \{.*?\n      const firstPageHeight = \(pages\.length > 0 && pages\[0\] \? pages\[0\]\.end - pages\[0\]\.start : height\) \* 210 / width;\n      const pdfWidth = 210; // Fixed A4 width in mm', patch2, content, flags=re.DOTALL)

# Remove html2canvas import
content = re.sub(r"import html2canvas from 'html2canvas';\n", "", content)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
