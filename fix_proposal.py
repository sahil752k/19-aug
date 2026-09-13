import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add Globe to imports
    content = content.replace("Mail, MapPin", "Mail, MapPin, Globe")

    # Replace the footer text line
    old_footer = """              <div className="mt-0.5 flex items-center gap-2 font-medium text-[#5b728b] text-[11px]">
                 | rsbenergys@gmail.com | 9226372787
              </div>"""
              
    new_footer = """              <div className="mt-1 flex items-center justify-center gap-3 font-medium text-[#5b728b] text-[11px]">
                 <div className="flex items-center gap-1">
                     <Globe size={12} className="text-[#e27d28]" />
                     <span>www.rsbhandari.in</span>
                 </div>
                 <span>|</span>
                 <div className="flex items-center gap-1">
                     <Mail size={12} className="text-[#e27d28]" />
                     <span>rsbenergys@gmail.com</span>
                 </div>
                 <span>|</span>
                 <div className="flex items-center gap-1">
                     <Phone size={12} className="text-[#e27d28]" />
                     <span>9422939036</span>
                 </div>
              </div>"""
    
    if old_footer in content:
        content = content.replace(old_footer, new_footer)
    else:
        # Fallback if there's slightly different whitespace
        content = re.sub(r'<div className="mt-0\.5 flex items-center gap-2 font-medium text-\[#5b728b\] text-\[11px\]">\s*\| rsbenergys@gmail\.com \| 9226372787\s*</div>', new_footer, content)

    with open(filepath, 'w') as f:
        f.write(content)

fix_file("src/templates/Proposal.tsx")
