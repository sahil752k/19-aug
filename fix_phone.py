import re

with open('src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '| rsbenergys@gmail.com | 9226372787',
    '| rsbenergys@gmail.com | 9422939036'
)

with open('src/templates/Proposal.tsx', 'w') as f:
    f.write(content)
