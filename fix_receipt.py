import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add Globe to imports
    if 'Globe' not in content:
        content = content.replace("Mail,", "Mail, Globe,")

    # The header has a div with contact text and a div with icons.
    # Text part:
    old_text_part = """                    <p className="tracking-tight">sumyabhandari15@gmail.com</p>
                </div>"""
    new_text_part = """                    <p className="tracking-tight">sumyabhandari15@gmail.com</p>
                    <p className="tracking-tight font-semibold mt-0.5">www.rsbhandari.in</p>
                </div>"""
                
    if old_text_part in content:
        content = content.replace(old_text_part, new_text_part)

    # Icon part:
    old_icon_part = """                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Mail size={11} fill="currentColor" strokeWidth={1} />
                    </div>
                </div>"""
    new_icon_part = """                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Mail size={11} fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="w-5 border-b-[1.5px] border-white my-1 opacity-90"></div>
                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Globe size={11} strokeWidth={2} />
                    </div>
                </div>"""

    if old_icon_part in content:
        content = content.replace(old_icon_part, new_icon_part)

    with open(filepath, 'w') as f:
        f.write(content)

fix_file("src/templates/Receipt.tsx")
