import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

content = content.replace("'.w-\\[794px\\]'", "'.w-\\\\[794px\\\\]'")

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
