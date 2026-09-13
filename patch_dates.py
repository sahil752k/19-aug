import os
import re

template_dir = '/app/applet/src/templates/'
for filename in os.listdir(template_dir):
    if filename.endswith('.tsx'):
        filepath = os.path.join(template_dir, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Don't add import to shared.tsx
        if filename == 'shared.tsx':
            continue

        needs_import = False
        if '{data.installationDate}' in content:
            content = content.replace('{data.installationDate}', '{formatDate(data.installationDate)}')
            needs_import = True
            
        if '{data.agreementDate}' in content:
            content = content.replace('{data.agreementDate}', '{formatDate(data.agreementDate)}')
            needs_import = True
            
        if '{data.invoiceDate}' in content:
            content = content.replace('{data.invoiceDate}', '{formatDate(data.invoiceDate)}')
            needs_import = True
            
        if '{data.receiptDate}' in content:
            content = content.replace('{data.receiptDate}', '{formatDate(data.receiptDate)}')
            needs_import = True
            
        if '{data.proposalDate}' in content:
            content = content.replace('{data.proposalDate}', '{formatDate(data.proposalDate)}')
            needs_import = True

        if needs_import:
            # Check if import already exists
            if 'import { formatDate }' not in content:
                content = content.replace("import React from 'react';", "import React from 'react';\nimport { formatDate } from '../utils/dateFormatter';")
            
        with open(filepath, 'w') as f:
            f.write(content)

# We also need to remove the local formatDate from AnnexureI.tsx
with open('/app/applet/src/templates/AnnexureI.tsx', 'r') as f:
    annexure = f.read()

local_format_pattern = r"const formatDate = \(dateStr\?: string\) => \{.*?\};\n\n"
annexure = re.sub(local_format_pattern, "", annexure, flags=re.DOTALL)

with open('/app/applet/src/templates/AnnexureI.tsx', 'w') as f:
    f.write(annexure)

