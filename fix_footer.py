import re

with open('src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

old_footer = '''        {/* Footer Bar */}
        <div className="w-full flex flex-row items-center justify-between border-t-[3px] border-[#86a8c6] bg-white pt-2 pb-2 px-10 relative overflow-hidden mt-1">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#e27d28]/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1e3a5f]/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10 pointer-events-none"></div>
           
           <div className="flex-[0.8] flex flex-col items-center justify-center border-r-[2px] border-gray-300 pr-4 mr-4 relative z-10 py-1">
              <div className="w-[35px] h-[35px] border-2 border-gray-500 rounded-[8px] p-0.5 mb-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                 <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/ChatGPT_Image_Jun_13__2026__03_30_24_PM-removebg-preview.png" alt="Logo" className="w-[120%] h-[120%] object-contain mix-blend-multiply max-w-none" />
              </div>
              <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <span className="text-[#e27d28] font-bold text-[13px] tracking-widest uppercase leading-none font-times" style={{fontFamily: 'Montserrat, sans-serif'}}>r. s. bhandari</span>
                  <span className="text-[#415a77] font-bold text-[8px] tracking-tight leading-none mt-0.5">Solar Energy Solutions</span>
              </div>
           </div>
           
           <div className="flex-[2] flex flex-col gap-0.5 text-[9px] text-[#5b728b] relative z-10 pl-2">
              <h3 className="text-[13px] font-bold text-[#5b728b] italic tracking-wide mb-0.5" style={{fontFamily: 'Montserrat, sans-serif'}}>
                 r. s. bhandari Solar Energy Solutions
              </h3>
              <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-0.5 items-start font-medium leading-tight text-[9.5px]">
                 <span className="text-[#5b728b]">Corporate office:</span>
                 <span className="text-[#5b728b]">“SAMAYSAR” Jain Colony Pusad Naka, Washim</span>
                 
                 <span className="text-[#5b728b]">Branch office:</span>
                 <span className="text-[#5b728b]">A11, 304, Saffron, Meghapolic Rajiv Gandhi Infotech Park Phase 3, Village:Maan, Tehsil Mulashi Pune 411057</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 font-medium text-[#5b728b] text-[9.5px]">
                 | rsbenergys@gmail.com | 9422939036
              </div>
           </div>
           
           <div className="absolute right-6 bottom-3.5 z-20">
               <span className="bg-[#1e3a5f] text-white font-bold py-1 px-4 rounded-full text-xs shadow-md border border-white/20">Page 1</span>
           </div>
        </div>'''

new_footer = '''        {/* Footer Bar */}
        <div className="w-full flex flex-row items-center justify-between border-t-[3px] border-[#86a8c6] bg-white pt-4 pb-4 px-10 relative overflow-hidden mt-2">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#e27d28]/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1e3a5f]/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10 pointer-events-none"></div>
           
           <div className="flex-[0.8] flex flex-col items-center justify-center border-r-[2px] border-gray-300 pr-4 mr-4 relative z-10 py-1">
              <div className="w-[45px] h-[45px] border-2 border-gray-500 rounded-[8px] p-0.5 mb-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                 <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/ChatGPT_Image_Jun_13__2026__03_30_24_PM-removebg-preview.png" alt="Logo" className="w-[120%] h-[120%] object-contain mix-blend-multiply max-w-none" />
              </div>
              <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <span className="text-[#e27d28] font-bold text-[14px] tracking-widest uppercase leading-none font-times" style={{fontFamily: 'Montserrat, sans-serif'}}>r. s. bhandari</span>
                  <span className="text-[#415a77] font-bold text-[9px] tracking-tight leading-none mt-1">Solar Energy Solutions</span>
              </div>
           </div>
           
           <div className="flex-[2] flex flex-col gap-1 text-[10px] text-[#5b728b] relative z-10 pl-2 pr-16">
              <h3 className="text-[14px] font-bold text-[#5b728b] italic tracking-wide mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>
                 r. s. bhandari Solar Energy Solutions
              </h3>
              <div className="grid grid-cols-[90px_1fr] gap-x-2 gap-y-1 items-start font-medium leading-tight text-[10px]">
                 <span className="text-[#5b728b]">Corporate office:</span>
                 <span className="text-[#5b728b]">“SAMAYSAR” Jain Colony Pusad Naka, Washim</span>
                 
                 <span className="text-[#5b728b]">Branch office:</span>
                 <span className="text-[#5b728b]">A11, 304, Saffron, Meghapolic Rajiv Gandhi Infotech Park Phase 3, Village:Maan, Tehsil Mulashi Pune 411057</span>
              </div>
              <div className="mt-1 flex items-center gap-2 font-medium text-[#5b728b] text-[10px]">
                 | rsbenergys@gmail.com | 9422939036
              </div>
           </div>
           
           <div className="absolute right-10 bottom-6 z-20">
               <span className="bg-[#1e3a5f] text-white font-bold py-1 px-4 rounded-full text-xs shadow-md border border-white/20 whitespace-nowrap">Page 1</span>
           </div>
        </div>'''

content = content.replace(old_footer, new_footer)

with open('src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

