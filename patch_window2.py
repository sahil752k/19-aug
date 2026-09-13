import re
with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

content = content.replace("const newWindow = window.open('', '_blank');", "const newWindow = (typeof window !== 'undefined' ? window.open('', '_blank') : null);")

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
