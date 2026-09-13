import re
with open('/app/applet/src/components/MainLayout.tsx', 'r') as f:
    content = f.read()
if "motion/react" in content:
    content = content.replace("motion/react", "framer-motion")
    with open('/app/applet/src/components/MainLayout.tsx', 'w') as f:
        f.write(content)
