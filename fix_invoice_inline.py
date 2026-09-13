import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the Phone block
    phone_block = """            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-700 fill-gray-700 stroke-gray-700" />
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>"""
            
    # We want to change the Phone block to include the website next to it, keeping the vertical height the same
    # The container holding these blocks is a flex column.
    
    # We will modify the Phone block to be a flex row that contains BOTH Phone and Website
    new_phone_web_block = """            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-gray-700 fill-gray-700 stroke-gray-700" />
                    </div>
                    <div className="font-bold text-gray-900 leading-snug">9422939036</div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4 text-gray-700 stroke-gray-700" />
                    </div>
                    <div className="font-bold text-gray-900 leading-snug">www.rsbhandari.in</div>
                </div>
            </div>"""

    if phone_block in content:
        content = content.replace(phone_block, new_phone_web_block)
        
    with open(filepath, 'w') as f:
        f.write(content)

fix_file("src/templates/Invoice.tsx")
