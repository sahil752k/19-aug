with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

target = """                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SYSTEM SETUP
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                  {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                  {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                  {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                  
                  {renderField('Make of Inverter', 'inverterMake', 'text', '', 4)}
                  {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 5)}
                  {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 6)}
                  {renderField('Structure Type', 'structure', 'text', '', 7)}
                  {renderField('Capacity Type', 'setupType', 'text', 'e.g., Rooftop', 8)}
                  {renderField('Project Model', 'projectModel', 'text', 'e.g., Capex', 9)}
                </div>"""

replacement = """                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SOLAR PV DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                  {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                  {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                  {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SYSTEM SETUP
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Sanctioned Capacity (Kw)', 'sanctionedCapacity', 'number', '', 0)}
                  {renderField('RE Installed Capacity (Rooftop) (Kw)', 'installedCapacity', 'number', '', 1)}
                  {renderField('Capacity Type', 'setupType', 'text', 'e.g., Rooftop', 2)}
                  
                  {renderField('Make of Inverter', 'inverterMake', 'text', '', 3)}
                  {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 4)}
                  {renderField('Capacity of Inverter (Kw)', 'inverterCapacity', 'number', '', 5)}
                  
                  {renderField('Structure Type', 'structure', 'text', '', 6)}
                  {renderField('Project Model', 'projectModel', 'text', 'e.g., Capex', 7)}
                </div>"""

if target in content:
    content = content.replace(target, replacement)
else:
    print("Not found")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)

