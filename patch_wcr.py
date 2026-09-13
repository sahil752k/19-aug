with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()
    
# We want to replace the whole WCR tab content.
start_str = "{activeTab === 'WCR' && ("
end_str = "          {activeTab === 'Invoice' && ("

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_wcr = """{activeTab === 'WCR' && (
            <motion.div 
               key="wcr"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-rose-600 font-bold text-2xl drop-shadow-sm">🏠</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">WCR (Work Completion) Data</h3>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    CUSTOMER INFO
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', 'Hariom Ingle', 0)}
                    {renderField('Consumer number', 'consumerNumber', 'text', '101', 1)}
                    {renderField('Site/Location With Complete Address', 'address', 'text', 'Deo peth washim', 2)}
                    {renderField('Category: Govt/Private Sector', 'wcrCategory', 'text', 'Private', 3)}
                    {renderField('Sanction number', 'wcrSanctionNumber', 'text', 'NP-MHSED25', 4)}
                    {renderField('Sanctioned Capacity of solar PV system (KW)', 'sanctionedCapacity', 'number', '90', 5)}
                    {renderField('Capacity of solar PV system (KW)', 'installedCapacity', 'number', '890', 6)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Specification of the Modules
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Make of Module', 'moduleMake', 'text', 'MODULE', 0)}
                    {renderField('ALMM Model Number', 'moduleModel', 'text', 'almm', 1)}
                    {renderField('Wattage per module', 'moduleWattage', 'text', '56', 2)}
                    {renderField('No. of Module', 'numberOfModules', 'number', '890', 3)}
                    {renderField('Total Capacity (Kwp)', 'installedCapacity', 'number', '890', 4)}
                    {renderField('Warranty Details (Product + Performance)', 'wcrModuleWarranty', 'text', '10 Years & 25 Years', 5)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Specifications of PCU
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Make & Model Number of Inverter', 'wcrInverterMakeModel', 'text', 'JHK 790897', 0)}
                    {renderField('Rating', 'wcrPcuRating', 'text', '', 1)}
                    {renderField('Type of charge controller/ MPPT', 'wcrPcuChargeController', 'text', '', 2)}
                    {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '890', 3)}
                    {renderField('HPD', 'wcrPcuHpd', 'text', '-', 4)}
                    {renderField('Year of manufacturing', 'wcrPcuYearOfManufacturing', 'text', '2024', 5)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Earthing & Protections
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('No. of Separate Earthing with earth resistance', 'wcrEarthingNo', 'text', '3', 0)}
                    <div className="md:col-span-2">
                       {renderField('It is certified that the earth Resistance measure in presence of Licensed Electrical Contractor/Supervisor and found in order i.e. <5 Ohms as per MNRE OM Dtd. 07.06.24 for CFA component.', 'wcrEarthingCertificate', 'text', '', 1)}
                    </div>
                    {renderField('Lightening Arrester', 'wcrLighteningArrester', 'text', 'Separate Earthing Provided', 2)}
                  </div>
               </div>
            </motion.div>
          )}

"""
    with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
        f.write(before + new_wcr + after)
else:
    print("Not found")

