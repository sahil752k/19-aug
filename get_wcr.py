import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

match = re.search(r'\{activeTab === \'WCR\' && \(.*?\n\s*\)\}', content, re.DOTALL)
if match:
    with open('wcr_content.txt', 'w') as f:
        f.write(match.group(0))
else:
    print("Not found")

