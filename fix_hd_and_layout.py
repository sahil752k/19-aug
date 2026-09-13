import re

# 1. Update Proposal.tsx
with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# Fix the container height cutting off the padding
old_office = '<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[220px] shrink-0">'
new_office = '<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[220px] shrink-0">'
if old_office in content:
    content = content.replace(old_office, new_office)

# Fix PageWrapper antialiasing for "HD" font rendering
old_wrapper = 'className="w-[794px] h-[1123px] bg-[#f8f9fa] relative overflow-hidden flex flex-col mx-auto mb-8 print:mb-0 shadow-lg print:shadow-none"'
new_wrapper = 'className="w-[794px] h-[1123px] bg-[#f8f9fa] relative overflow-hidden flex flex-col mx-auto mb-8 print:mb-0 shadow-lg print:shadow-none antialiased"'
if old_wrapper in content:
    content = content.replace(old_wrapper, new_wrapper)

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

# 2. Update proposalPdfEngine.ts to increase PDF resolution for HD exports
with open('/app/applet/src/utils/proposalPdfEngine.ts', 'r') as f:
    pdf_content = f.read()

# Increase standard ratio from 4.5 to 6.0 and highRes ratio from 5.5 to 8.0
pdf_content = pdf_content.replace('const ratio = isHighRes ? 5.5 : 4.5;', 'const ratio = isHighRes ? 8.0 : 6.0;')

with open('/app/applet/src/utils/proposalPdfEngine.ts', 'w') as f:
    f.write(pdf_content)

print("Files updated successfully")
