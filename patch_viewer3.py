import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

css_to_add = """
      {/* Global styles for hidden rendering to remove UI gaps/backgrounds */}
      <style>{`
        [id^="hidden-doc-"] > div {
          background-color: white !important;
          padding: 0 !important;
        }
        [id^="hidden-doc-"] .a4-page,
        [id^="hidden-doc-"] .page {
          margin-bottom: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
      `}</style>
"""

content = content.replace("{/* Document Render Area */}", css_to_add + "\n      {/* Document Render Area */}")

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
