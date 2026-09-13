import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

content = content.replace('<p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">COMPANY SEAL</p>', '')
content = content.replace('<p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 whitespace-nowrap">AUTHORIZED SIGNATORY</p>', '')

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

print("Removed labels")
