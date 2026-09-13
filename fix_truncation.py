with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

css_old = """        .annexure3-container {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14.5px;
          line-height: 1.35;
          color: black;
        }

        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 25.4mm 25.4mm 25.4mm 25.4mm; /* 1 inch margins */
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          box-sizing: border-box;
          position: relative;
        }"""

css_new = """        .annexure3-container {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13.5px;
          line-height: 1.25;
          color: black;
        }

        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 15mm 20mm; /* Reduced padding to fit content */
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          box-sizing: border-box;
          position: relative;
        }"""

content = content.replace(css_old, css_new)

print_css_old = """        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .a4-page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
            min-height: 297mm;
            height: 297mm;
            overflow: hidden;
          }
          .a4-page:last-child {
            page-break-after: auto;
          }
        }"""

print_css_new = """        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .a4-page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
            min-height: 297mm;
            height: 297mm;
            overflow: hidden;
            padding: 15mm 20mm !important;
          }
          .a4-page:last-child {
            page-break-after: auto;
          }
        }"""

content = content.replace(print_css_old, print_css_new)

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)
