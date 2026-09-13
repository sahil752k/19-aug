import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

customer_block = """               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    CUSTOMER DETAILS (COVER PAGE)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address / City', 'address', 'text', '', 1)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50"""

content = content.replace('               <div className="bg-gradient-to-b from-gray-50/50', customer_block, 1)

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)

print("Customer details added.")
