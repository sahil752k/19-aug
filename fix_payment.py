import re

with open('src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# I want to remove the light PAYMENT RECEIVED section
payment_html = """                <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 mt-8">
                 <h4 className="text-xs tracking-[0.25em] font-black text-[#f5a623] mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center border border-yellow-200"><div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308]"></div></span> 
                    PAYMENT RECEIVED
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                    <div className="group">
                      <label className="block text-[13px] font-semibold text-gray-700 mb-2 uppercase tracking-wide group-hover:text-yellow-600 transition-colors">Amount Received (₹)</label>
                      <input type="number" name="receivedAmount" value={data.receivedAmount === 0 ? 0 : (data.receivedAmount || '')} onChange={handleChange} className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 font-black text-2xl text-gray-800 hover:border-gray-300 transition-all shadow-sm" />
                    </div>
                  </div>
                </div>

"""

content = content.replace(payment_html, "")

with open('src/components/DataForm.tsx', 'w') as f:
    f.write(content)
