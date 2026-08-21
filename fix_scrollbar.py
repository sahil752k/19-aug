import re
with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'overflow-x-auto pb-2 sm:pb-0 [\\hide-scrollbar::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
    'overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
