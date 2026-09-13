import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Proposal & Receipt & shared specific fixes
    # 1. "R.S. Bhandari" -> "r.s. Bhandari"
    content = content.replace("R.S. Bhandari", "r.s. Bhandari")
    content = content.replace("R.S.Bhandari", "r.s.Bhandari")
    content = content.replace("R.S Bhandari", "r.s. Bhandari")
    
    # 2. "r. s. bhandari" or "r. s. Bhandari"
    content = content.replace("r. s. bhandari", "r.s. Bhandari")
    content = content.replace("r. s. Bhandari", "r.s. Bhandari")
    
    # 3. "R. S. BHANDARI SOLAR" -> "r.s. BHANDARI SOLAR"
    content = content.replace("R. S. BHANDARI SOLAR", "r.s. BHANDARI SOLAR")

    # 4. Remove uppercase class from the specific span elements that wrap "r.s. Bhandari"
    # Example: className="text-[#e27d28] font-bold text-[15px] tracking-widest uppercase leading-none font-times"
    content = re.sub(r'(className="[^"]*)uppercase([^"]*")(\s*(?:style=[^>]+)?>\s*r\.s\. Bhandari)', r'\1\2\3', content)

    # 5. For Proposal.tsx footer line: className="font-bold text-[15px] uppercase tracking-widest text-[#1e3a5f] border-t-2 border-[#1e3a5f] pt-4 px-4 whitespace-nowrap mt-2"
    # We will just replace uppercase in that specific line:
    if 'border-t-2 border-[#1e3a5f]' in content and 'uppercase' in content:
        content = re.sub(r'className="([^"]*)uppercase([^"]*border-t-2 border-\[#1e3a5f\][^"]*")(\s*>\s*r\.s\. Bhandari)', r'className="\1\2\3', content)

    # For Receipt.tsx:
    # <p className="font-bold text-[15px] text-[#1d1d1b] relative z-10">FOR r.s. Bhandari Solar Energy Solutions</p>
    content = content.replace("FOR r.s. Bhandari Solar Energy Solutions", "For r.s. Bhandari Solar Energy Solutions")
    
    with open(filepath, 'w') as f:
        f.write(content)

for file in ["src/templates/Proposal.tsx", "src/templates/Invoice.tsx", "src/templates/Receipt.tsx", "src/templates/shared.tsx", "src/templates/WCR.tsx", "src/templates/AnnexureI.tsx", "src/templates/ModelAgreement.tsx"]:
    fix_file(file)

