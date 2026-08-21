import re

with open('src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# 1. Update line 125 Address
content = content.replace(
    '“Seren County” B 302 Vadgaon Sinhagad Road, Dhayari Pune 411041',
    'A11, 304, Saffron, Meghapolic Rajiv Gandhi Infotech Park Phase 3, Village:Maan, Tehsil Mulashi Pune 411057'
)

# 2. Update line 884-885 Address
old_address_block = '''                      "Seren County" B 302, Vadgaon Sinhagad Road,<br/>
                      Dhayari, Pune, Maharashtra - 411 041'''
new_address_block = '''                      A11, 304, Saffron, Meghapolic Rajiv Gandhi Infotech Park Phase 3,<br/>
                      Village:Maan, Tehsil Mulashi Pune 411057'''
content = content.replace(old_address_block, new_address_block)

# 3. Update UPI ID
content = content.replace(
    '9226372787@sbi',
    '9422939036@ybl'
)

# 4. Remove COMPANY SEAL block
old_seal_block = '''              <div className="flex flex-col items-center">
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">COMPANY SEAL</p>
                 <div className="w-32 h-auto flex flex-col items-center justify-center mix-blend-multiply opacity-50">
                    {/* Placeholder for actual seal if distinct from sign */}
                 </div>
              </div>'''
new_seal_block = '              <div></div>'
content = content.replace(old_seal_block, new_seal_block)

with open('src/templates/Proposal.tsx', 'w') as f:
    f.write(content)
