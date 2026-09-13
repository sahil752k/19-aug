import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

# 1. Remove isCompressedDoc checks and force high scale
content = content.replace("const isCompressedDoc = ['AnnexureI', 'ModelAgreement', 'Annexure3', 'WCR'].some(docId => elementId.includes(docId));", "const isCompressedDoc = false;")
content = content.replace("const baseScale = isCompressedDoc ? 2.5 : 4.5;", "const baseScale = 4.5;")

# 2. Make buildPdf use PNG or high quality JPEG
# The existing code uses: return buildPdf(baseScale, 'JPEG', 0.95, false);
# We can change it to use PNG for perfect HD quality (no compression artifacts on text)
content = content.replace("return buildPdf(baseScale, 'JPEG', 0.95, false);", "return buildPdf(baseScale, 'PNG', 1.0, false);")

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
