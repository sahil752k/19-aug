import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    content = content.replace("r.s. Bhandari", "r.s. bhandari")
    content = content.replace("r.s.Bhandari", "r.s.bhandari")
    content = content.replace("r.s. BHANDARI", "r.s. bhandari")
    
    # In ModelAgreement.tsx specifically:
    if "ModelAgreement" in filepath:
        content = content.replace(">Bhandari<", ">bhandari<")

    with open(filepath, 'w') as f:
        f.write(content)

for file in ["src/templates/Proposal.tsx", "src/templates/Invoice.tsx", "src/templates/Receipt.tsx", "src/templates/shared.tsx", "src/templates/WCR.tsx", "src/templates/AnnexureI.tsx", "src/templates/ModelAgreement.tsx", "src/templates/Annexure3.tsx"]:
    fix_file(file)

