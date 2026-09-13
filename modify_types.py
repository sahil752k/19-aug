import re

with open('/app/applet/src/types.ts', 'r') as f:
    content = f.read()

content = content.replace("proposalType: string;", "proposalType: string;\n  productClassification?: string;\n  systemSummarySize?: number | string;")
content = content.replace("proposalType: '',", "proposalType: '',\n  productClassification: '',\n  systemSummarySize: '',")

with open('/app/applet/src/types.ts', 'w') as f:
    f.write(content)
