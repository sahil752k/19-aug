import re
with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'framer-motion';")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
