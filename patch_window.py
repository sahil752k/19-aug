import re
with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

content = content.replace("window.innerWidth", "(typeof window !== 'undefined' ? window.innerWidth : 1024)")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
