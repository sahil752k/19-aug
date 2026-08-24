import re

with open('src/templates/Invoice.tsx', 'r') as f:
    content = f.read()

# Replace the current header with the new one
old_header = """      {/* Header */}
      <div className="flex items-center justify-center border-b-[3px] border-yellow-500 pb-3 mb-3 w-full pr-16">
        <Logo size="lg" className="justify-center" />
      </div>"""

new_header = """      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between border-b-[4px] border-[#e27d28] pb-4 mb-4">
        {/* Left side: Logo */}
        <div className="flex-1">
            <Logo size="lg" />
        </div>
        
        {/* Separator line */}
        <div className="w-[1px] h-24 bg-gray-300 mx-6"></div>

        {/* Right side: Contact Info */}
        <div className="flex-1 flex flex-col gap-3 text-sm text-gray-800">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-500 text-lg">📄</span>
                </div>
                <div className="leading-snug">
                    <div className="text-gray-600">GSTIN</div>
                    <div className="font-bold text-gray-900">27BXPBP1277F1ZG</div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-500 text-lg">📞</span>
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-lg">📍</span>
                </div>
                <div className="leading-snug text-gray-900">
                    Chhatrapati Shivaji Maharaj Chowk Road Washim,<br/>444505
                </div>
            </div>
        </div>
      </div>"""

content = content.replace(old_header, new_header)

with open('src/templates/Invoice.tsx', 'w') as f:
    f.write(content)

