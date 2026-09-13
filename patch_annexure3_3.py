with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

# Fix empty JSX blocks
content = content.replace("""{data.vendorSignature && (
              
            )}""", "")

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)

