import re

with open('src/templates/shared.tsx', 'r') as f:
    content = f.read()

# Make the logo a bit smaller in lg size
old_lg = 'lg: { img: "w-[100px] h-[100px]", title: "text-[36px]", subtitle: "text-[26px]", tagline: "text-[15px]" }'
new_lg = 'lg: { img: "w-[85px] h-[85px]", title: "text-[32px]", subtitle: "text-[22px]", tagline: "text-[13px]" }'
content = content.replace(old_lg, new_lg)

with open('src/templates/shared.tsx', 'w') as f:
    f.write(content)
