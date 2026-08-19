#!/bin/bash
cat << 'REPLACE' > pattern.txt
        <div className="mt-16 pt-10 pb-10 border-t border-gray-300">
           <p className="font-bold text-lg mb-2">{data.name}</p>
           <div className="h-16 w-48 mb-6 flex items-start">
             {data.customerSignature && (
               <img src={data.customerSignature} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
             )}
           </div>
           
           <p className="font-bold text-lg">1.SUMIT</p>
           <p className="font-bold text-lg">RAJENDRA</p>
           <p className="font-bold text-lg mb-4">BHANDARI</p>

           <div className="h-16 w-32 mb-4 flex items-start relative">
             {data.witnessSignature ? (
               <img src={data.witnessSignature} alt="Witness Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
             ) : (
               <p className="font-bold text-xl italic text-gray-400 border-b border-gray-400 absolute bottom-0 w-full">Sign</p>
             )}
           </div>
           
           <p className="text-lg mb-1">2. Pavan Gupta</p>
        </div>
REPLACE

sed -i -e '/<div className="mt-16 pt-10 pb-10 border-t border-gray-300">/,/<\/div>      <\/div>/!b' \
    -e '/<div className="mt-16 pt-10 pb-10 border-t border-gray-300">/r pattern.txt' \
    -e '/<div className="mt-16 pt-10 pb-10 border-t border-gray-300">/,/2\. Pavan Gupta<\/p>/d' src/templates/ModelAgreement.tsx
