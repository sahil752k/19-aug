import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

old_block = """<div className="p-6 flex-1 flex gap-12">
                 <div className="flex-1 space-y-5">
                    <div className="flex gap-3">"""

new_block = """<div className="p-6 flex-1 flex">
                 <div className="flex-1 space-y-5 pr-10 border-r border-gray-200">
                    <div className="flex gap-3">"""

if old_block in content:
    content = content.replace(old_block, new_block)

old_block_2 = """                    </div>
                 </div>
                 <div className="flex-1 space-y-5">
                    <div className="flex gap-3">"""

new_block_2 = """                    </div>
                 </div>
                 <div className="flex-1 space-y-5 pl-10">
                    <div className="flex gap-3">"""

if old_block_2 in content:
    content = content.replace(old_block_2, new_block_2)

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

