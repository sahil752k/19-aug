import re

with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

content = content.replace("{data.agreementDate ? data.agreementDate : '2025-12-11'}", "<strong>{data.agreementDate ? formatDate(data.agreementDate) : '2025-12-11'}</strong>")

# Make the stamp image in the bottom right corner appear correctly.
# Remove opacity-0 from vendor signature, actually the PDF doesn't have signatures on page 1 and 2, just the stamp.
content = content.replace('<img src={data.vendorSignature} alt="Vendor Signature" className="w-24 h-12 object-contain mix-blend-multiply opacity-0" />', '')

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)

