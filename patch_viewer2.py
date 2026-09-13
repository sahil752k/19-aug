import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

content = content.replace("const padToSize = isCompressedDocType(activeDoc) ? 293 * 1024 : undefined;", "const padToSize = undefined;")
content = content.replace("const padToSize = isCompressedDocType(tab.id) ? 293 * 1024 : undefined;", "const padToSize = undefined;")

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
