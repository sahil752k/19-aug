import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# Fix imports
import_str = "import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote"
new_import_str = "import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote, Building, QrCode, Phone, Mail, MapPin, CheckCircle"
if new_import_str not in content:
    content = content.replace(import_str, new_import_str)

# Change Page 8 Acceptance to Page 9
content = content.replace(
    '{/* Page 8: Acceptance */}',
    '{/* Page 9: Acceptance */}'
)
content = content.replace(
    '<div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 8</div>',
    '<div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 9</div>'
)

new_page_8 = """      {/* Page 8: Bank Details */}
      <PageWrapper>
         <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white uppercase">BANK DETAILS</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 8</div>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col gap-6 bg-[#f9fafb]">
           {/* Top 2 columns */}
           <div className="flex gap-6">
              {/* Left Column - Official Bank Account */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                 <div className="bg-[#1e3a5f] text-white px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Building size={20} className="text-[#e27d28]" />
                       <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICIAL BANK ACCOUNT</h3>
                    </div>
                    <Banknote size={20} className="text-white/30" />
                 </div>
                 <div className="p-8 flex flex-col gap-4 text-[15px]">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">ACCOUNT NAME</span>
                       <span className="font-bold text-[#1e3a5f]">r. s. bhandari Solar Energy Solutions</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">BANK NAME</span>
                       <span className="font-bold text-gray-900">State Bank of India (SBI)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">ACCOUNT NUMBER</span>
                       <span className="font-black text-gray-900 text-lg tracking-wider">37748474127</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">IFSC CODE</span>
                       <span className="font-bold text-gray-900 tracking-wider">SBIN0000503</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">BRANCH NAME</span>
                       <span className="font-bold text-gray-900">Patni Chowk, Washim - 444 505</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">ACCOUNT TYPE</span>
                       <span className="font-bold text-gray-900">Current Account</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">PAN CARD</span>
                       <span className="font-bold text-gray-900 tracking-wider">BXPPB1277F</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-600 tracking-wider uppercase text-xs">GSTIN NO.</span>
                       <span className="font-bold text-gray-900 tracking-wider">27BXPPB1277F1ZG</span>
                    </div>
                 </div>
              </div>

              {/* Right Column - Scan to Pay */}
              <div className="w-[300px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col shrink-0">
                 <div className="bg-[#e27d28] text-white px-6 py-4 flex justify-center items-center">
                    <div className="flex items-center gap-3">
                       <QrCode size={20} />
                       <h3 className="font-bold tracking-widest uppercase text-[13px]">SCAN TO PAY</h3>
                    </div>
                 </div>
                 <div className="p-8 flex flex-col items-center flex-1 justify-center">
                    <div className="border-[4px] border-gray-100 rounded-2xl p-2 mb-6 shadow-sm">
                       <img crossOrigin="anonymous" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9422939036@ybl&pn=R.S.Bhandari%20Solar%20Energy%20Solutions&cu=INR" alt="QR Code" className="w-[160px] h-[160px]" />
                    </div>
                    <div className="bg-[#1e3a5f] text-white text-[11px] font-bold px-6 py-2 rounded-full tracking-wider mb-4 w-full text-center">
                       INSTANT BANK / UPI
                    </div>
                    <div className="text-[10.5px] text-gray-500 font-semibold tracking-wide mb-2">
                       GPay | PhonePe | Paytm | BHIM
                    </div>
                    <div className="font-black text-gray-900 text-[15px] tracking-wider mb-6 border-b border-gray-100 w-full text-center pb-4">
                       9422939036@ybl
                    </div>
                    
                    <div className="text-[9.5px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                       Accepted Payment Modes
                    </div>
                    <div className="text-[11px] font-bold text-[#e27d28] tracking-widest flex gap-2 flex-wrap justify-center">
                       <span>NEFT</span>&bull;<span>RTGS</span>&bull;<span>IMPS</span>&bull;<span>UPI</span>&bull;<span>CHEQUE</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Office Locations */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#1e3a5f] text-white px-6 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <HeadphonesIcon size={18} className="text-[#e27d28]" />
                    <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICE LOCATIONS & SUPPORT DIRECTORY</h3>
                 </div>
                 <div className="text-[11px] font-bold tracking-wider text-gray-300">
                    SUPPORT: MON - SAT (9:30 AM - 6:30 PM)
                 </div>
              </div>
              <div className="flex divide-x divide-gray-100">
                 <div className="flex-1 p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#e27d28]/10 flex items-center justify-center shrink-0">
                       <Building size={20} className="text-[#e27d28]" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-[#1e3a5f] tracking-widest uppercase text-[13px] mb-2">CORPORATE & HEAD OFFICE</h4>
                       <p className="text-[13px] text-gray-600 mb-6 leading-relaxed min-h-[40px]">
                          "SAMAYSAR" Jain Colony, Pusad Naka,<br/>Washim, Maharashtra - 444 505
                       </p>
                       <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                          <div className="flex items-center gap-3 text-[13px]">
                             <Phone size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">+91 942 293 9036 / +91 922 637 2787</span>
                          </div>
                          <div className="flex items-center gap-3 text-[13px]">
                             <Mail size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">rsbenergys@gmail.com</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center shrink-0">
                       <MapPin size={20} className="text-[#1e3a5f]" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-[#1e3a5f] tracking-widest uppercase text-[13px] mb-2">BRANCH OFFICE (PUNE REGION)</h4>
                       <p className="text-[13px] text-gray-600 mb-6 leading-relaxed min-h-[40px]">
                          A11, 304, Saffron, Meghapolic Rajiv Gandhi<br/>Infotech Park Phase 3,<br/>Village:Maan, Tehsil Mulashi Pune 411057
                       </p>
                       <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                          <div className="flex items-center gap-3 text-[13px]">
                             <Phone size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">+91 942 293 9036</span>
                          </div>
                          <div className="flex items-center gap-3 text-[13px]">
                             <Mail size={14} className="text-[#e27d28]" />
                             <span className="font-bold text-[#1e3a5f]">rsbenergys@gmail.com</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Payment Instructions */}
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="bg-[#1e3a5f] text-white px-6 py-3 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#e27d28]" />
                    <h3 className="font-bold tracking-widest uppercase text-[13px]">PAYMENT INSTRUCTIONS & GUIDELINES</h3>
                 </div>
                 <div className="text-[11px] font-bold tracking-wider text-gray-300 uppercase">
                    Important Notice
                 </div>
              </div>
              <div className="p-6 flex-1 flex gap-8">
                 <div className="flex-1 space-y-5">
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#e27d28] mt-2 shrink-0"></div>
                       <p className="text-[13px] text-gray-700 leading-relaxed">
                          <strong className="text-gray-900">Reference Narration:</strong> Please mention Customer Name (<strong className="text-gray-900">{data.name || 'Customer'}</strong>) and Consumer Number in payment remarks while transferring.
                       </p>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#e27d28] mt-2 shrink-0"></div>
                       <p className="text-[13px] text-gray-700 leading-relaxed">
                          <strong className="text-gray-900">Beneficiary Name:</strong> Ensure the beneficiary is strictly named <strong className="text-gray-900">"r. s. bhandari Solar Energy Solutions"</strong> before approving RTGS/NEFT.
                       </p>
                    </div>
                 </div>
                 <div className="flex-1 space-y-5">
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] mt-2 shrink-0"></div>
                       <p className="text-[13px] text-gray-700 leading-relaxed">
                          <strong className="text-gray-900">Payment Confirmation:</strong> Share payment screenshot / UTR number via WhatsApp at <strong className="text-gray-900">+91 942 293 9036</strong> for immediate receipt acknowledgment.
                       </p>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] mt-2 shrink-0"></div>
                       <p className="text-[13px] text-gray-700 leading-relaxed">
                          <strong className="text-gray-900">Official Receipt:</strong> Computerized tax invoice & official receipt will be issued within 24 hours of bank clearance.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </PageWrapper>

"""

# Insert new page 8 before Page 9 (old 8)
content = content.replace('{/* Page 9: Acceptance */}', new_page_8 + '\n      {/* Page 9: Acceptance */}')

# Remove old bank details at the bottom
start_remove = content.find('{/* Footer / Bank Details / Contact Us block (Page 8 / Bottom Block) */}')
if start_remove != -1:
    end_remove = content.find('</div>', content.find('</div>', content.rfind('</div>')) - 50) 
    # Let's just do a regex or string slice. The old bank details ends the main div of Proposal.
    # It is exactly before `    </div>\n  );\n};\n// Extracted dummy icons`
    end_marker = "    </div>\n  );\n};\n"
    start_main_div_end = content.find(end_marker, start_remove)
    
    if start_main_div_end != -1:
        content = content[:start_remove] + content[start_main_div_end:]

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

