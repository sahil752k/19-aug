import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# Replace activeTab default
content = content.replace("useState<string>('Draft Info')", "useState<string>('Master Form')")

# Add 'Master Form' to tabs
content = content.replace(
"""  const tabs = [
    'Draft Info',""",
"""  const tabs = [
    'Master Form',
    'Draft Info',""")

# Inject the Master Form section
master_form_content = """          {activeTab === 'Master Form' && (
            <motion.div 
              key="masterForm"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 h-[75vh] overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="flex items-center gap-4 border-b border-gray-100 pb-5 mb-8 sticky top-0 bg-white/95 backdrop-blur z-10 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/50 flex items-center justify-center shadow-inner shrink-0">
                  <span className="text-indigo-500 font-bold text-2xl drop-shadow-sm">⭐</span>
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-800 tracking-tight">Master Form</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">Fill this once, and all documents will be generated automatically.</p>
                </div>
              </div>
              
              <div className="space-y-8 pb-10">
                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span> Customer & General Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Draft / Project Name', 'draftName', 'text', 'e.g. Sahil Home 3kW', 0)}
                      {renderField('Customer Name', 'name', 'text', '', 1)}
                      {renderField('Mobile number', 'mobileNumber', 'text', '', 2)}
                      {renderField('Email ID', 'emailId', 'text', '', 3)}
                      {renderField('Installation Address', 'address', 'text', '', 4)}
                      {renderField('Consumer Number', 'consumerNumber', 'text', '', 5)}
                      {renderField('Aadhar Number', 'aadhaarNumber', 'text', '', 6)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span> Project Specifications</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Proposal Type', 'proposalType', 'text', '', 0)}
                      {renderField('Project Type', 'projectType', 'text', '', 1)}
                      {renderField('Sanctioned Capacity (KW)', 'sanctionedCapacity', 'number', '', 2)}
                      {renderField('Installed Capacity (KW)', 'installedCapacity', 'number', '', 3)}
                      {renderField('Area Available', 'areaAvailable', 'text', '', 4)}
                      {renderField('Contract Load', 'contractLoad', 'text', '', 5)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span> Hardware (Modules & Inverter)</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                      {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                      {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                      {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                      {renderField('Module Type / Specs', 'moduleType', 'text', '', 4)}
                      {renderField('Module Warranty', 'moduleWarranty', 'text', '', 5)}
                      
                      {renderField('Make of Inverter', 'inverterMake', 'text', '', 6)}
                      {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 7)}
                      {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 8)}
                      {renderField('Inverter Quantity', 'inverterQuantity', 'number', '', 9)}
                      {renderField('Inverter Phases', 'inverterPhases', 'number', '', 10)}
                      {renderField('Inverter Warranty', 'inverterWarranty', 'text', '', 11)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span> Technical Specs & Generation</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Structure Type', 'structure', 'text', '', 0)}
                      {renderField('Earthing', 'earthing', 'text', '', 1)}
                      {renderField('AC / DC Cables', 'acDcCables', 'text', '', 2)}
                      {renderField('AC / DC Protection', 'acDcProtection', 'text', '', 3)}
                      {renderField('Net Metering', 'netMetering', 'text', '', 4)}
                      
                      {renderField('Daily Generation (Units)', 'dailyGeneration', 'text', '', 5)}
                      {renderField('Monthly Generation (Units)', 'monthlyGeneration', 'text', '', 6)}
                      {renderField('Yearly Generation (Units)', 'yearlyGeneration', 'text', '', 7)}
                      {renderField('Savings 1 Year (₹)', 'savings1Year', 'text', '', 8)}
                      {renderField('Savings 5 Years (₹)', 'savings5Years', 'text', '', 9)}
                      {renderField('Savings 10 Years (₹)', 'savings10Years', 'text', '', 10)}
                      {renderField('Savings 25 Years (₹)', 'savings25Years', 'text', '', 11)}
                      {renderField('Payback Period', 'paybackPeriod', 'text', '', 12)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">5</span> Cost & Payments</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Total System Cost (₹)', 'totalCost', 'number', '', 0)}
                      {renderField('Cost of RTS System (₹)', 'rtsSystemCost', 'number', '', 1)}
                      {renderField('Subsidy Amount (₹)', 'subsidyAmount', 'number', '', 2)}
                      {renderField('Customer Investment (₹)', 'customerInvestment', 'number', '', 3)}
                      {renderField('AMC Cost (₹)', 'amcCost', 'number', '', 4)}
                      
                      {renderField('Advance (%)', 'paymentAdvance', 'number', '', 5)}
                      {renderField('On Delivery (%)', 'paymentDelivery', 'number', '', 6)}
                      {renderField('On Installation (%)', 'paymentInstallation', 'number', '', 7)}
                      {renderField('On Commissioning (%)', 'paymentCommissioning', 'number', '', 8)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">6</span> Key Dates</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Proposal Date', 'proposalDate', 'date', '', 0)}
                      {renderField('Quote Validity (Days)', 'quoteValidity', 'text', '', 1)}
                      {renderField('Agreement Date', 'agreementDate', 'date', '', 2)}
                      {renderField('Installation Date', 'installationDate', 'date', '', 3)}
                   </div>
                </div>
              </div>
            </motion.div>
          )}
"""

content = content.replace("<AnimatePresence mode=\"wait\">\n          {activeTab === 'Draft Info' && (", "<AnimatePresence mode=\"wait\">\n" + master_form_content + "\n          {activeTab === 'Draft Info' && (")

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
