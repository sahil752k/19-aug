import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

line_items_html = """
                <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-5 mb-8 mt-16 bg-gray-50/50 p-4 rounded-r-xl">
                  <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg text-xl shadow-sm">📦</span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Product Line Items</h3>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                  {(data.invoiceItems || []).map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white border border-gray-100 shadow-xl shadow-gray-200/30 p-6 sm:p-8 rounded-[2rem] flex flex-wrap xl:flex-nowrap gap-6 items-end relative group hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute top-6 left-6 font-black text-5xl text-gray-50 opacity-50 z-0 pointer-events-none transition-transform group-hover:scale-110">0{index + 1}</div>
                      <div className="flex-1 min-w-[250px] relative z-10 w-full">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">🔧 Description</label>
                        <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-32 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📦 Qty</label>
                        <input type="number" value={item.qty === 0 ? 0 : (item.qty || '')} onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-48 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">💰 Rate (₹)</label>
                        <input type="number" value={item.rate === 0 ? 0 : (item.rate || '')} onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-36 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📊 Tax %</label>
                        <input type="number" value={item.tax === 0 ? 0 : (item.tax || '')} onChange={(e) => handleItemChange(index, 'tax', Number(e.target.value))} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center" />
                      </div>
                      <button onClick={() => removeItem(index)} className="absolute -top-4 -right-4 bg-white border border-red-200 shadow-lg text-red-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 font-bold text-xl z-20">
                        ×
                      </button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>

                <motion.button whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.2)" }} whileTap={{ scale: 0.98 }} onClick={addItem} className="w-full py-5 mt-8 bg-[#00b46b] text-white rounded-[1rem] hover:bg-[#009b5a] transition-colors shadow-lg shadow-green-500/30 font-bold text-[15px] flex items-center justify-center gap-2 group border border-[#009b5a]">
                     <span className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors text-xl leading-none w-7 h-7 flex items-center justify-center">＋</span>
                     Add Another Item
                </motion.button>
"""

# The Master form Invoice Details block looks like this
master_invoice_target = """                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">7</span> Invoice Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Invoice Number', 'invoiceNo', 'text', '', 0)}
                      {renderField('Invoice Date', 'invoiceDate', 'date', '', 1)}
                      {renderField('Solar Panel Price (₹)', 'solarPanelPrice', 'number', '', 2)}
                      {renderField('Inverter Price (₹)', 'inverterPrice', 'number', '', 3)}
                      {renderField('CGST (%)', 'cgst', 'number', '', 4)}
                      {renderField('SGST (%)', 'sgst', 'number', '', 5)}
                   </div>
                </div>"""

# Replace it with the same target + line_items_html
new_content = content.replace(master_invoice_target, master_invoice_target + "\n" + line_items_html)

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(new_content)
