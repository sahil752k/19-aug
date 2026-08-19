import re

with open('src/templates/Invoice.tsx', 'r') as f:
    content = f.read()

# Replace padding and gaps to reduce header height
old_header = """      {/* Header */}
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
                    <FileText className="w-5 h-5 text-gray-500 fill-gray-500 stroke-gray-500" />
                </div>
                <div className="leading-snug">
                    <div className="text-gray-600">GSTIN</div>
                    <div className="font-bold text-gray-900">27BXPBP1277F1ZG</div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gray-700 fill-gray-700 stroke-gray-700" />
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-red-500 fill-red-500 stroke-white stroke-2" />
                </div>
                <div className="leading-snug text-gray-900">
                    Chhatrapati Shivaji Maharaj Chowk Road Washim,<br/>444505
                </div>
            </div>
        </div>
      </div>"""

new_header = """      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between border-b-[4px] border-[#e27d28] pb-3 mb-3">
        {/* Left side: Logo */}
        <div className="flex-1">
            <Logo size="lg" />
        </div>
        
        {/* Separator line */}
        <div className="w-[1px] h-20 bg-gray-300 mx-4"></div>

        {/* Right side: Contact Info */}
        <div className="flex-1 flex flex-col gap-2 text-[13px] text-gray-800 ml-4">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-gray-500 fill-gray-500 stroke-gray-500" />
                </div>
                <div className="leading-snug flex items-center gap-2">
                    <div className="text-gray-600">GSTIN</div>
                    <div className="font-bold text-gray-900">27BXPBP1277F1ZG</div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-700 fill-gray-700 stroke-gray-700" />
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-500 fill-red-500 stroke-white stroke-2" />
                </div>
                <div className="leading-snug text-gray-900">
                    Chhatrapati Shivaji Maharaj Chowk Road Washim, 444505
                </div>
            </div>
        </div>
      </div>"""

content = content.replace(old_header, new_header)

with open('src/templates/Invoice.tsx', 'w') as f:
    f.write(content)
