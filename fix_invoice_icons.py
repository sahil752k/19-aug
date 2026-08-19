import re

with open('src/templates/Invoice.tsx', 'r') as f:
    content = f.read()

# Add import
import_str = "import { FileText, Phone, MapPin } from 'lucide-react';"
if import_str not in content:
    content = content.replace("import { Stamp, Logo } from './shared';", f"import {{ Stamp, Logo }} from './shared';\n{import_str}")

# Replace emojis with lucide icons
content = content.replace('<span className="text-gray-500 text-lg">📄</span>', '<FileText className="w-5 h-5 text-gray-500 fill-gray-500 stroke-gray-500" />')
content = content.replace('<span className="text-gray-500 text-lg">📞</span>', '<Phone className="w-5 h-5 text-gray-700 fill-gray-700 stroke-gray-700" />')
content = content.replace('<span className="text-red-500 text-lg">📍</span>', '<MapPin className="w-5 h-5 text-red-500 fill-red-500 stroke-white stroke-2" />')

with open('src/templates/Invoice.tsx', 'w') as f:
    f.write(content)
