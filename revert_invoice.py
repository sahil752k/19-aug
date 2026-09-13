import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    web_email_section = """
            <div className="flex items-center gap-3">
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

    content = content.replace(web_email_section, "")

    with open(filepath, 'w') as f:
        f.write(content)

fix_file("src/templates/Invoice.tsx")
