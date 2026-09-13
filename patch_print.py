import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

# 1. Remove the useEffect that hijacks Cmd+P
effect_pattern = r"// Override browser print with our flattened version\s*useEffect\(\(\) => \{\s*const handleKeyDown.*?\s*\}, \[activeDoc, data\]\);"
content = re.sub(effect_pattern, "", content, flags=re.DOTALL)

# 2. Replace handlePrint with a simple window.print()
handle_print_pattern = r"const handlePrint = async \(\) => \{.*?\n  \};\n"
simple_handle_print = """const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };\n"""

content = re.sub(handle_print_pattern, simple_handle_print, content, flags=re.DOTALL)

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)

