import re

with open('src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

sig_block = r'''              <div className="flex gap-6 items-end">
                 <span className="w-40 font-bold text-gray-600 uppercase text-sm tracking-wider">Signature :</span>
                 <span className="flex-1 border-b-2 border-gray-300 pb-2 h-10 relative">
                    \{data\.proposalCustomerSignature && \(
                      <img src=\{data\.proposalCustomerSignature\} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply absolute bottom-0 left-0" />
                    \)\}
                 </span>
              </div>'''

new_content = re.sub(sig_block, '', content)

with open('src/templates/Proposal.tsx', 'w') as f:
    f.write(new_content)
