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
                      <button onClick={() => removeInvoiceItem(item.id)} className="w-full xl:w-auto h-12 xl:h-[52px] px-6 bg-red-50 text-red-500 rounded-[1rem] hover:bg-red-500 hover:text-white transition-all shadow-sm font-bold flex items-center justify-center gap-2 relative z-10">
                        <span className="xl:hidden">Remove Item</span>
                        <span className="hidden xl:inline text-xl">×</span>
                      </button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                  
                  <button onClick={addInvoiceItem} className="w-full py-5 bg-[#00b46b] text-white rounded-[1rem] hover:bg-[#009b5a] transition-colors shadow-lg shadow-green-500/30 font-bold text-[15px] flex items-center justify-center gap-2 group border border-[#009b5a]">
                     <span className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors text-xl leading-none w-7 h-7 flex items-center justify-center">＋</span>
                     Add Another Item
                  </button>
                </div>"""

# Find the end of the Master Form which is right before {activeTab === 'Draft Info' && (
master_form_end = """                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Draft Info' && ("""

master_form_replacement = """                   </div>
                </div>

""" + line_items_html + """
              </div>
            </motion.div>
          )}

          {activeTab === 'Draft Info' && ("""

content = content.replace(master_form_end, master_form_replacement)

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
