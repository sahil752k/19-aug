import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

old_query = """'.page-break, [style*="break-after"], [style*="page-break-after"], [style*="break-before"], [style*="page-break-before"]'"""
new_query = """'.page-break, .a4-page, .page, [style*="break-after"], [style*="page-break-after"], [style*="break-before"], [style*="page-break-before"]'"""

content = content.replace(old_query, new_query)

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
