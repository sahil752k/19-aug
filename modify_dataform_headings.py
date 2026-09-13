import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# 1. Update CUSTOMER DETAILS -> PREPARED FOR (COVER PAGE)
# We also move Proposal Type and Proposal Date and System Capacity here to match cover page.
content = content.replace('CUSTOMER DETAILS (COVER PAGE)', 'PREPARED FOR (COVER PAGE)')
# Add Proposal Date, System Capacity, Proposal Type to COVER PAGE
# But wait, it's easier to replace the entire proposal block string again safely.

start_marker = "          {activeTab === 'Proposal' && ("
end_marker = "          {activeTab === 'Model Agreement' && ("

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_proposal_block = """          {activeTab === 'Proposal' && (
             <motion.div
                key="proposal"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex flex-wrap gap-4 justify-between items-center pb-5 mb-6 border-b border-gray-100">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200/50 flex items-center justify-center shadow-inner">
                     <span className="text-yellow-600 font-bold text-2xl drop-shadow-sm">📝</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800 tracking-tight">Proposal Data</h3>
                 </div>
                 <button type="button" onClick={() => resetProposalData()} className="px-4 py-2.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl font-bold transition-all shadow-sm text-sm hover:bg-yellow-500 hover:text-white hover:border-yellow-500 hover:-translate-y-0.5 hover:shadow-yellow-500/20">
                   Reset Section
                 </button>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    PREPARED FOR (COVER PAGE)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address / City', 'address', 'text', '', 1)}
                    {renderField('System Capacity (kW)', 'installedCapacity', 'number', '', 2)}
                    {renderField('Proposal Type', 'proposalType', 'text', '', 3)}
                    {renderField('Date', 'proposalDate', 'date', '', 4)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    DESIGN INPUTS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Project Type', 'projectType', 'text', '', 0)}
                    {renderField('Area Available', 'areaAvailable', 'text', '', 1)}
                    {renderField('Contract Load', 'contractLoad', 'text', '', 2)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    System summary
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Earthing', 'earthing', 'text', '', 0)}
                    {renderField('AC/DC Cables', 'acDcCables', 'text', '', 1)}
                    {renderField('Structure', 'structure', 'text', '', 2)}
                    {renderField('Subsidy (₹)', 'subsidyAmount', 'number', '', 3)}
                    {renderField('Price (₹)', 'totalCost', 'number', '', 4)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    SOLAR PV MODULE DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Manufacturer', 'moduleMake', 'text', '', 0)}
                    {renderField('No. of Modules', 'numberOfModules', 'number', '', 1)}
                    {renderField('Wattage of Each Module (Wp)', 'moduleWattage', 'number', '', 2)}
                    {renderField('Warranty', 'moduleWarranty', 'text', '', 3)}
                    {renderField('Type of Module', 'moduleType', 'text', '', 4)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    INVERTER DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Manufacturer', 'inverterMake', 'text', '', 0)}
                    {renderField('Rating KW Per Inverter', 'inverterCapacity', 'number', '', 1)}
                    {renderField('Quantity', 'inverterQuantity', 'number', '', 2)}
                    {renderField('No. of Phases', 'inverterPhases', 'number', '', 3)}
                    {renderField('Warranty', 'inverterWarranty', 'text', '', 4)}
                 </div>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    GENERATION EXPECTATION
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Day 1 (Units)', 'dailyGeneration', 'text', '', 0)}
                    {renderField('Month 1 (Units)', 'monthlyGeneration', 'text', '', 1)}
                    {renderField('Year 1 (Units)', 'yearlyGeneration', 'text', '', 2)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    PAYMENT TERMS & ACCEPTANCE
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Advance (%)', 'paymentAdvance', 'number', '', 0)}
                    {renderField('On Delivery (%)', 'paymentDelivery', 'number', '', 1)}
                    {renderField('On Installation (%)', 'paymentInstallation', 'number', '', 2)}
                    {renderField('On Commissioning (%)', 'paymentCommissioning', 'number', '', 3)}
                    {renderField('AMC Cost (₹)', 'amcCost', 'number', '', 4)}
                    {renderField('Quote Validity (Days)', 'quoteValidity', 'text', '', 5)}
                 </div>
               </div>
             </motion.div>
"""

new_content = content[:start_idx] + new_proposal_block + content[end_idx:]

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(new_content)

print("DataForm updated successfully.")
