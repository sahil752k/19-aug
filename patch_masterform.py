import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# 1. Update initial state
content = content.replace("useState<string>('Master Form')", "useState<string>('Draft Info')")

# 2. Update tabs array
content = content.replace("    'Master Form',\n", "")

# 3. Remove Master Form section
start_str = "{activeTab === 'Master Form' && ("
end_str = "          {activeTab === 'Draft Info' && ("

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]
    print("Successfully removed Master Form block.")
else:
    print("Could not find block boundaries.")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
