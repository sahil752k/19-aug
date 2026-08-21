import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Logo, Stamp } from './shared';
import { Phone, Home, Mail } from 'lucide-react';
import { numberToWords } from '../utils/numberToWords';

export const Receipt: React.FC = () => {
  const { data } = useAppContext();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="bg-white flex flex-col items-center justify-start h-[1123px] w-[794px] mx-auto overflow-hidden p-8">
      <div className="w-full max-w-[730px] border-[5px] border-[#1d1d1b] bg-white text-[#1d1d1b] font-times relative mt-4">
        <div className="flex flex-col items-stretch min-h-[380px] pb-4">
          
          {/* Header */}
          <div className="flex border-b-[3px] border-[#1d1d1b] items-stretch h-[105px]">
            <div className="flex items-center pl-4 shrink-0">
                <Logo />
            </div>
            <div className="flex-1 flex items-center justify-center min-w-0 pr-4">
                <h2 className="text-[28px] font-bold text-[#e13226] tracking-widest mt-1 shrink-0">RECEIPT</h2>
            </div>
            <div className="flex justify-end items-stretch shrink-0">
                <div className="flex flex-col justify-center items-end pr-3 py-2 text-[11px] leading-[1.3] font-medium text-[#1d1d1b] whitespace-nowrap">
                    <p className="font-bold text-[14px] mb-1.5 text-black tracking-widest leading-none block">9422939036</p>
                    <p>"SAMAYSAR" Jain Colony</p>
                    <p>Pusad Naka, Washim- 444505. (MS)</p>
                    <p className="tracking-tight">sumyabhandari15@gmail.com</p>
                </div>
                <div className="w-[42px] bg-[#1d1d1b] flex flex-col items-center justify-center py-2 shrink-0">
                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Phone size={11} fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="w-5 border-b-[1.5px] border-white my-1 opacity-90"></div>
                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Home size={11} fill="currentColor" strokeWidth={1} />
                    </div>
                    <div className="w-5 border-b-[1.5px] border-white my-1 opacity-90"></div>
                    <div className="bg-[#df8534] max-w-fit p-[5px] rounded-full text-white">
                        <Mail size={11} fill="currentColor" strokeWidth={1} />
                    </div>
                </div>
            </div>
          </div>

          {/* Body */}
          <div className="py-6 px-10 text-[17px] text-[#1d1d1b] flex-1 flex flex-col justify-between">
             <div className="flex justify-between items-end">
                 <div className="flex items-end flex-1 mr-8">
                     <span className="mr-2">Receipt No.</span>
                     <span className="border-b border-black border-dotted flex-1 inline-block pb-1 text-center font-bold font-mono">{data.receiptNo}</span>
                 </div>
                 <div className="flex items-end w-64">
                     <span className="mr-2">Dated</span>
                     <span className="border-b border-black border-dotted flex-1 inline-block pb-1 text-center font-mono">{formatDate(data.receiptDate)}</span>
                 </div>
             </div>

             <div className="flex items-end pt-2">
                 <span className="mr-2">Received with thanks from</span>
                 <span className="border-b border-black flex-1 font-bold pb-0.5 uppercase px-4 text-center">{data.name}</span>
             </div>

             <div className="flex items-end">
                 <span className="mr-2">the sum of Rupees</span>
                 <span className="border-b border-black flex-1 font-bold pb-0.5 px-4 text-center capitalize">{numberToWords(data.receivedAmount)}</span>
             </div>

             <div className="w-full border-b-[1.5px] border-[#1d1d1b]"></div>

             <div className="flex items-end">
                 <span className="mr-2">by Cash / Cheque / Draft No.</span>
                 <span className="border-b border-black flex-1 font-bold pb-0.5 px-4 text-center">{data.paymentMethod === 'Cash' ? 'N/A' : data.chequeNo}</span>
                 <span className="mx-3">Dt:</span>
                 <span className="border-b border-black w-48 font-bold pb-0.5 text-center">{formatDate(data.receiptDate)}</span>
             </div>

             <div className="flex items-end">
                 <span className="mr-2">Drawn on (Bank & Branch)</span>
                 <span className="border-b border-black flex-1 font-bold pb-0.5 px-4 text-center">{data.bankName ? data.bankName : ''}</span>
             </div>

             <div className="w-full border-b-[1.5px] border-[#1d1d1b] mb-4"></div>

             <div className="flex justify-between items-end relative pb-1">
                 <div className="flex flex-col items-start w-64">
                     <div className="border-[3px] border-[#1d1d1b] p-[2px] w-full bg-white relative z-10">
                         <div className="border border-[#1d1d1b] py-1 px-4 flex items-center h-10">
                             <span className="text-[22px] italic font-times text-[#1d1d1b]">Rs.</span>
                             <span className="text-xl font-bold font-mono tracking-wider">{data.receivedAmount ? `${data.receivedAmount}/-` : ''}</span>
                         </div>
                     </div>
                     <p className="text-[10px] text-[#1d1d1b] font-medium mt-1 pb-0.5 absolute -bottom-4">Receipt valid subject to encashment of cheque</p>
                 </div>
                 
                 <div className="flex-1 text-right flex flex-col items-end pt-8 relative z-10">
                     <div className="absolute -top-8 right-0 transform scale-[0.85] origin-right pointer-events-none">
                         <Stamp />
                     </div>
                     {data.vendorSignature && (
                       <img src={data.vendorSignature} alt="Vendor" className="z-10 w-32 h-16 object-contain mix-blend-multiply mb-2 relative" />
                     )}
                     <p className="font-bold text-[15px] text-[#1d1d1b] relative z-10">FOR r. s. bhandari Solar Energy Solutions</p>
                 </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};
