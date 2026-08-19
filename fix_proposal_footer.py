import re

with open('src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

old_footer = """        {/* Footer Bar */}
        <div className="bg-[#1e3a5f] text-white flex justify-between h-[120px] px-10 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-32 origin-bottom-right"></div>
          <div className="flex gap-12 items-center relative z-10 w-full">
            <div className="flex flex-col items-center">
              <div className="text-green-400 mb-1"><Leaf size={28} /></div>
              <div className="font-bold text-[11px] tracking-widest text-[#a8c6e6] text-center">CLEAN ENERGY</div>
              <div className="text-[9px] text-white text-center">For a Better Tomorrow</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-yellow-400 mb-1"><TrendingUp size={28} /></div>
              <div className="font-bold text-[11px] tracking-widest text-[#a8c6e6] text-center">LOWER BILLS</div>
              <div className="text-[9px] text-white text-center">Save More Every Month</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white mb-1"><ShieldCheck size={28} /></div>
              <div className="font-bold text-[11px] tracking-widest text-[#a8c6e6] text-center">RELIABLE & SAFE</div>
              <div className="text-[9px] text-white text-center">High Quality Systems</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white mb-1"><Settings size={28} /></div>
              <div className="font-bold text-[11px] tracking-widest text-[#a8c6e6] text-center">EXPERT SUPPORT</div>
              <div className="text-[9px] text-white text-center">End to End Assistance</div>
            </div>
            <div className="ml-auto flex items-end justify-center self-stretch pb-4 pr-10">
               <span className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 1</span>
            </div>
          </div>
        </div>"""

new_footer = """        {/* Footer Bar */}
        <div className="w-full flex flex-row items-center justify-between border-t-[3px] border-[#86a8c6] bg-white pt-6 pb-6 px-10 relative overflow-hidden mt-4">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#e27d28]/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1e3a5f]/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10 pointer-events-none"></div>
           
           <div className="flex-1 flex justify-center border-r-[2px] border-gray-300 pr-6 mr-6 relative z-10 py-2">
              <Logo size="md" className="justify-center" />
           </div>
           
           <div className="flex-[2] flex flex-col gap-2 text-sm text-[#415a77] relative z-10 pl-2">
              <h3 className="text-[20px] font-bold text-[#415a77] italic tracking-wide mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>
                 r. s. bhandari Solar Energy Solutions
              </h3>
              <div className="grid grid-cols-[125px_1fr] gap-x-2 gap-y-2 items-start font-medium">
                 <span className="text-[#415a77]">Corporate office:</span>
                 <span className="text-gray-700">"SAMAYSAR" Jain Colony Pusad Naka, Washim</span>
                 
                 <span className="text-[#415a77]">Branch office:</span>
                 <span className="text-gray-700">"Seren County" B 302 Vadgaon Sinhagad Road, Dhayari Pune 411041</span>
              </div>
              <div className="mt-1 flex items-center gap-2 font-medium text-[#415a77]">
                 | rsbenergys@gmail.com | 9422939036
              </div>
           </div>
           
           <div className="absolute right-4 bottom-4 z-20">
               <span className="bg-[#1e3a5f] text-white font-bold py-1 px-4 rounded-full text-[10px] shadow-sm">Page 1</span>
           </div>
        </div>"""

if old_footer in content:
    content = content.replace(old_footer, new_footer)
else:
    print("Old footer not found")

with open('src/templates/Proposal.tsx', 'w') as f:
    f.write(content)
