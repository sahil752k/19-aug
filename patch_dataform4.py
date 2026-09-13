with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

target = """                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200"><div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div></span> 
                    CAPACITIES & DATES
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Agreement Date', 'agreementDate', 'date', '', 3)}
                </div>"""

replacement = """                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200"><div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div></span> 
                    CAPACITIES & DATES
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Sanctioned Capacity (Kw)', 'sanctionedCapacity', 'number', '', 2)}
                  {renderField('Agreement Date', 'agreementDate', 'date', '', 3)}
                </div>"""

if target in content:
    content = content.replace(target, replacement)
else:
    print("Not found")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
