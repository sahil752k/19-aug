import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

patch = """      const canvas = await html2canvas(element, {
        scale: baseScale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const firstPageHeight = (pages.length > 0 && pages[0] ? pages[0].end - pages[0].start : height) * 210 / width;
      const pdfWidth = 210; // Fixed A4 width in mm"""

content = re.sub(r'      const imgData = await domtoimage\.toPng\(element, \{.*?\n      if \(ctx\) \{\n        ctx\.drawImage\(img, 0, 0\);\n      \}\n\n      const firstPageHeight = \(pages\[0\]\.end - pages\[0\]\.start\) \* 210 / width;\n      const pdfWidth = 210; // Fixed A4 width in mm', patch, content, flags=re.DOTALL)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
