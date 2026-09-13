with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

target = """        <input 
          type={type} 
          name={name} 
          value={val === 0 ? 0 : (val || '')} 
          onChange={handleChange} 
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 focus:bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 shadow-sm relative z-10 font-medium" 
        />"""

replacement = """        <input 
          type={type} 
          name={name} 
          value={val === 0 ? 0 : (val || '')} 
          onChange={handleChange} 
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 focus:bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 shadow-sm relative z-10 font-medium" 
        />"""

content = content.replace(target, replacement)

target2 = """<input type="number" name="receivedAmount" value={data.receivedAmount === 0 ? 0 : (data.receivedAmount || '')} onChange={handleChange} className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl focus:ring-4 focus:ring-yellow-500/40 text-white font-black text-2xl focus:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-inner" />"""
replacement2 = """<input type="number" name="receivedAmount" value={data.receivedAmount === 0 ? 0 : (data.receivedAmount || '')} onChange={handleChange} onWheel={(e) => (e.target as HTMLInputElement).blur()} className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl focus:ring-4 focus:ring-yellow-500/40 text-white font-black text-2xl focus:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-inner" />"""
content = content.replace(target2, replacement2)

target3 = """                    <input 
                      type="number" 
                      name="finalInvoiceAmount" 
                      value={data.finalInvoiceAmount === 0 ? 0 : (data.finalInvoiceAmount || '')} 
                      onChange={handleChange} 
                      className="w-full px-5 py-4 bg-white border-2 border-yellow-400 rounded-xl focus:ring-4 focus:ring-yellow-500/20 text-gray-900 font-black text-3xl shadow-sm transition-all" 
                      placeholder="e.g. 200000"
                    />"""
replacement3 = """                    <input 
                      type="number" 
                      name="finalInvoiceAmount" 
                      value={data.finalInvoiceAmount === 0 ? 0 : (data.finalInvoiceAmount || '')} 
                      onChange={handleChange} 
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      className="w-full px-5 py-4 bg-white border-2 border-yellow-400 rounded-xl focus:ring-4 focus:ring-yellow-500/20 text-gray-900 font-black text-3xl shadow-sm transition-all" 
                      placeholder="e.g. 200000"
                    />"""
content = content.replace(target3, replacement3)

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
