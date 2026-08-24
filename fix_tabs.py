import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# Add back CUSTOMER INFO to Invoice tab
invoice_details_marker = """                    <h4 className="text-xs tracking-[0.2em] font-black text-gray-400 mb-6">INVOICE DETAILS</h4>
                    {renderField('Invoice Number', 'invoiceNo')}
                    <div className="h-6"></div>
                    {renderField('Invoice Date', 'invoiceDate', 'date')}
                  </motion.div>"""

customer_info_invoice = """

                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-xl shadow-gray-200/40 p-8 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform"><span className="text-8xl">👤</span></div>
                    <h4 className="text-xs tracking-[0.2em] font-black text-gray-400 mb-6">CUSTOMER INFO</h4>
                    {renderField('Customer Name', 'name')}
                    <div className="h-4"></div>
                    {renderField('Address', 'address')}
                    <div className="h-4"></div>
                    {renderField('WhatsApp No', 'mobileNumber')}
                  </motion.div>"""

content = content.replace(invoice_details_marker, invoice_details_marker + customer_info_invoice)

# Add back CUSTOMER INFO to Receipt tab
receipt_marker = """               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center border border-orange-200"><div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div></span> 
                    PAYMENT DETAILS
                 </h4>"""

customer_info_receipt = """               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center border border-orange-200"><div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div></span> 
                    CUSTOMER INFO
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address', 'address', 'text', '', 1)}
                  </div>
                </div>

"""

content = content.replace(receipt_marker, customer_info_receipt + receipt_marker)

# Change Invoice tab grid layout back
grid_marker = """               </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">"""

grid_replacement = """               </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">"""

content = content.replace(grid_marker, grid_replacement)

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
