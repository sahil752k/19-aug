import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

invoice_section = """
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
                </div>
"""

content = content.replace("              </div>\n            </motion.div>\n          )}", invoice_section + "              </div>\n            </motion.div>\n          )}")

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
