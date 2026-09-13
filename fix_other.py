import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Uppercase replacements for r.s. Bhandari that were missed
    content = content.replace("For r.s. Bhandari Solar Energy Solutions", "For r.s. Bhandari Solar Energy Solutions")
    content = content.replace("r.s. BHANDARI SOLAR", "r.s. BHANDARI SOLAR")

    # In ModelAgreement.tsx
    content = content.replace("BHANDARI", "Bhandari")

    with open(filepath, 'w') as f:
        f.write(content)

for file in ["src/templates/ModelAgreement.tsx"]:
    fix_file(file)

