import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

start_marker = "{/* Page 8: Bank Details */}"
end_marker = "{/* Page 9: Acceptance */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_page_8 = """{/* Page 8: Bank Details */}
      <PageWrapper>
         <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white uppercase">BANK DETAILS</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1.5 px-5 rounded-full text-[13px] shadow-md tracking-wider">Page 8</div>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col gap-6 bg-[#f8f9fa]">
           {/* Row 1: Bank Account & Scan to Pay */}
           <div className="flex gap-6 h-[400px]">
              {/* Left Column - Official Bank Account */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                 <div className="bg-[#1e3a5f] text-white px-6 py-4 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                       <Landmark size={20} className="text-[#e27d28]" />
                       <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICIAL BANK ACCOUNT</h3>
                    </div>
                    <Banknote size={20} className="text-white/30" />
                 </div>
                 <div className="px-8 py-6 flex flex-col justify-between flex-1 text-[13px]">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">ACCOUNT NAME</span>
                       <span className="font-bold text-[#1e3a5f]">r. s. bhandari Solar Energy Solutions</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">BANK NAME</span>
                       <span className="font-bold text-gray-900">State Bank of India (SBI)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">ACCOUNT NUMBER</span>
                       <span className="font-black text-gray-900 text-[16px] tracking-wider">37748474127</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">IFSC CODE</span>
                       <span className="font-bold text-gray-900 tracking-wider">SBIN0000503</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">BRANCH NAME</span>
                       <span className="font-bold text-gray-900">Patni Chowk, Washim - 444 505</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">ACCOUNT TYPE</span>
                       <span className="font-bold text-gray-900">Current Account</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">PAN CARD</span>
                       <span className="font-bold text-gray-900 tracking-wider">BXPPB1277F</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-500 tracking-wider uppercase text-[11px]">GSTIN NO.</span>
                       <span className="font-bold text-gray-900 tracking-wider">27BXPPB1277F1ZG</span>
                    </div>
                 </div>
              </div>

              {/* Right Column - Scan to Pay */}
              <div className="w-[300px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col shrink-0">
                 <div className="bg-[#e27d28] text-white px-6 py-4 flex justify-center items-center shrink-0">
                    <div className="flex items-center gap-3">
                       <QrCode size={20} />
                       <h3 className="font-bold tracking-widest uppercase text-[13px]">SCAN TO PAY</h3>
                    </div>
                 </div>
                 <div className="p-6 flex flex-col items-center flex-1 justify-center">
                    <div className="border border-gray-200 rounded-xl p-2.5 mb-4 shadow-sm bg-white">
                       <img crossOrigin="anonymous" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9422939036@ybl&pn=R.S.Bhandari%20Solar%20Energy%20Solutions&cu=INR" alt="QR Code" className="w-[140px] h-[140px]" />
                    </div>
                    <div className="bg-[#1e3a5f] text-white text-[11px] font-bold px-6 py-1.5 rounded-full tracking-wider mb-2">
                       INSTANT BANK / UPI
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium tracking-wide mb-2">
                       GPay | PhonePe | Paytm | BHIM
                    </div>
                    <div className="font-black text-gray-900 text-[15px] tracking-wider mb-4 border-b border-gray-100 w-full text-center pb-4">
                       9422939036@ybl
                    </div>
                    
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                       Accepted Payment Modes
                    </div>
                    <div className="text-[10.5px] font-bold text-[#e27d28] tracking-widest flex gap-1.5 flex-wrap justify-center">
                       <span>NEFT</span><span className="text-gray-300">&bull;</span><span>RTGS</span><span className="text-gray-300">&bull;</span><span>IMPS</span><span className="text-gray-300">&bull;</span><span>UPI</span><span className="text-gray-300">&bull;</span><span>CHEQUE</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Office Locations */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[220px] shrink-0">
              <div className="bg-[#1e3a5f] text-white px-6 py-3 flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-3">
                    <HeadphonesIcon size={18} className="text-[#e27d28]" />
                    <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICE LOCATIONS & SUPPORT DIRECTORY</h3>
                 </div>
                 <div className="text-[10px] font-bold tracking-wider text-gray-300">
                    SUPPORT: MON - SAT (9:30 AM - 6:30 PM)
                 </div>
              </div>
              <div className="flex divide-x divide-gray-100 flex-1">
                 <div className="flex-1 p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#e27d28]/10 flex items-center justify-center shrink-0">
                       <Building size={20} className="text-[#e27d28]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                       <div>
                          <h4 className="font-bold text-[#1e3a5f] tracking-widest uppercase text-[12.5px] mb-1.5">CORPORATE & HEAD OFFICE</h4>
                          <p className="text-[12.5px] text-gray-600 mb-3 leading-relaxed">
                             "SAMAYSAR" Jain Colony, Pusad Naka,<br/>Washim, Maharashtra - 444 505
                          </p>
                       </div>
                       <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2.5 text-[12.5px]">
                          <div className="flex items-center gap-3">
                             <Phone size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">+91 942 293 9036 / +91 922 637 2787</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <Mail size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">rsbenergys@gmail.com</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center shrink-0">
                       <MapPin size={20} className="text-[#1e3a5f]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full">
                       <div>
                          <h4 className="font-bold text-[#1e3a5f] tracking-widest uppercase text-[12.5px] mb-1.5">BRANCH OFFICE (PUNE REGION)</h4>
                          <p className="text-[12.5px] text-gray-600 mb-3 leading-relaxed">
                             A11, 304, Saffron, Meghapolic Rajiv Gandhi<br/>Infotech Park Phase 3,<br/>Village:Maan, Tehsil Mulashi Pune 411057
                          </p>
                       </div>
                       <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2.5 text-[12.5px]">
                          <div className="flex items-center gap-3">
                             <Phone size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">+91 942 293 9036</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <Mail size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">rsbenergys@gmail.com</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Payment Instructions */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
              <div className="bg-[#1e3a5f] text-white px-6 py-3 flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-[#e27d28]" />
                    <h3 className="font-bold tracking-widest uppercase text-[13px]">PAYMENT INSTRUCTIONS & GUIDELINES</h3>
                 </div>
                 <div className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">
                    Important Notice
                 </div>
              </div>
              <div className="flex divide-x divide-gray-100 flex-1 items-center">
                 <div className="flex-1 p-6 space-y-4">
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#e27d28] mt-2 shrink-0"></div>
                       <p className="text-[12.5px] text-gray-600 leading-relaxed">
                          <strong className="text-gray-800">Reference Narration:</strong> Please mention Customer Name (<strong className="text-gray-800">{data.name || 'Customer'}</strong>) and Consumer Number in payment remarks while transferring.
                       </p>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#e27d28] mt-2 shrink-0"></div>
                       <p className="text-[12.5px] text-gray-600 leading-relaxed">
                          <strong className="text-gray-800">Beneficiary Name:</strong> Ensure the beneficiary is strictly named <strong className="text-gray-800">"r. s. bhandari Solar Energy Solutions"</strong> before approving RTGS/NEFT.
                       </p>
                    </div>
                 </div>
                 <div className="flex-1 p-6 space-y-4">
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] mt-2 shrink-0"></div>
                       <p className="text-[12.5px] text-gray-600 leading-relaxed">
                          <strong className="text-gray-800">Payment Confirmation:</strong> Share payment screenshot / UTR number via WhatsApp at <strong className="text-gray-800">+91 942 293 9036</strong> for immediate receipt acknowledgment.
                       </p>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] mt-2 shrink-0"></div>
                       <p className="text-[12.5px] text-gray-600 leading-relaxed">
                          <strong className="text-gray-800">Official Receipt:</strong> Computerized tax invoice & official receipt will be issued within 24 hours of bank clearance.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </PageWrapper>
      \n"""
    
    content = content[:start_idx] + new_page_8 + content[end_idx:]

    with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
        f.write(content)
else:
    print("Could not find start or end markers.")

