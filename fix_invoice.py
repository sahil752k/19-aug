import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add Globe to imports
    if 'Globe' not in content:
        content = content.replace("Phone, MapPin", "Phone, MapPin, Globe, Mail")

    # The header has a Phone section and a MapPin section. We want to add Website and maybe email.
    # We will insert it after Phone, before MapPin
    phone_section = """            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-700 fill-gray-700 stroke-gray-700" />
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>"""
            
    web_email_section = """            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-gray-700 stroke-gray-700" />
                </div>
                <div className="text-gray-900 leading-snug">www.rsbhandari.in</div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gray-700 stroke-gray-700" />
                </div>
                <div className="text-gray-900 leading-snug">rsbenergys@gmail.com</div>
            </div>"""

    if phone_section in content and "www.rsbhandari.in" not in content:
        content = content.replace(phone_section, phone_section + "\n\n" + web_email_section)

    with open(filepath, 'w') as f:
        f.write(content)

fix_file("src/templates/Invoice.tsx")
