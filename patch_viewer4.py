import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

old_css = """        [id^="hidden-doc-"] .a4-page,
        [id^="hidden-doc-"] .page {
          margin-bottom: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }"""

new_css = """        [id^="hidden-doc-"] .a4-page,
        [id^="hidden-doc-"] .page {
          margin-bottom: 0 !important;
          box-shadow: none !important;
          border: none !important;
          height: 297mm !important;
          max-height: 297mm !important;
          overflow: hidden !important;
        }"""

content = content.replace(old_css, new_css)

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
