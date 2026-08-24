import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# The string to remove is exactly:
str_to_remove = """
                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">7</span> Invoice Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Invoice Number', 'invoiceNo', 'text', '', 0)}
                      {renderField('Invoice Date', 'invoiceDate', 'date', '', 1)}
                      {renderField('Solar Panel Price (₹)', 'solarPanelPrice', 'number', '', 2)}
                      {renderField('Inverter Price (₹)', 'inverterPrice', 'number', '', 3)}
                      {renderField('CGST (%)', 'cgst', 'number', '', 4)}
                      {renderField('SGST (%)', 'sgst', 'number', '', 5)}
                   </div>
                </div>"""

# Remove all instances of it
content = content.replace(str_to_remove, "")

# Add it back ONLY to the Master Form (which is the first one)
# We can find the Master form block by searching for "Key Dates" section
target = """                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">6</span> Key Dates</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Proposal Date', 'proposalDate', 'date', '', 0)}
                      {renderField('Quote Validity (Days)', 'quoteValidity', 'text', '', 1)}
                      {renderField('Agreement Date', 'agreementDate', 'date', '', 2)}
                      {renderField('Installation Date', 'installationDate', 'date', '', 3)}
                   </div>
                </div>"""

new_target = target + str_to_remove

content = content.replace(target, new_target)

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
