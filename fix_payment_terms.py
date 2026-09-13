import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# Remove the block from DataForm.tsx
# The block is roughly:
#               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
#                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
#                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
#                    PAYMENT TERMS & ACCEPTANCE
#                 </h4>
#                 ...
#               </div>

pattern = re.compile(r'\s*<div className="bg-gradient-to-b[^>]+>\s*<h4[^>]+>\s*<span[^>]+><div[^>]+></div></span>\s*PAYMENT TERMS & ACCEPTANCE\s*</h4>\s*<div[^>]+>(?:\s*\{renderField[^\}]+\})+\s*</div>\s*</div>', re.MULTILINE)
content = pattern.sub('', content)

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    prop_content = f.read()

prop_content = prop_content.replace("{data.quoteValidity} days", "365 days")
prop_content = prop_content.replace("{data.paymentAdvance || 70}%", "70%")
prop_content = prop_content.replace("{data.paymentDelivery || 20}%", "20%")
prop_content = prop_content.replace("{data.paymentInstallation || 5}%", "5%")
prop_content = prop_content.replace("{data.paymentCommissioning || 5}%", "5%")
prop_content = prop_content.replace("{data.amcCost.toLocaleString('en-IN')}/- Year", "3 Year")
# Also handle case if it's rendered differently
prop_content = prop_content.replace("{data.amcCost.toLocaleString('en-IN')}", "3")

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(prop_content)

print("Done")
