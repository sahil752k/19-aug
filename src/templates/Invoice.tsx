import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format, isValid } from 'date-fns';

const safeFormatDate = (dateStr: string | undefined | null, formatStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isValid(d) ? format(d, formatStr) : '';
};
import { Stamp, Logo } from './shared';
import { FileText, Phone, MapPin } from 'lucide-react';

export const Invoice: React.FC = () => {
  const { data } = useAppContext();

  const finalInvoiceAmount = Number(data.finalInvoiceAmount) || 0;
  
  const solarAmount = finalInvoiceAmount * 0.70;
  const installationAmount = finalInvoiceAmount * 0.30;
  
  const solarTaxableAmount = solarAmount / 1.05;
  const solarCGST = solarTaxableAmount * 0.025;
  const solarSGST = solarTaxableAmount * 0.025;
  const solarTaxAmt = solarCGST + solarSGST;
  
  const installationTaxableAmount = installationAmount / 1.18;
  const installationCGST = installationTaxableAmount * 0.09;
  const installationSGST = installationTaxableAmount * 0.09;
  const installationTaxAmt = installationCGST + installationSGST;
  
  const totalTaxableAmount = solarTaxableAmount + installationTaxableAmount;
  const totalCGST = solarCGST + installationCGST;
  const totalSGST = solarSGST + installationSGST;
  const totalTax = totalCGST + totalSGST;

  const subtotalFinal = solarAmount + installationAmount; // Should equal finalInvoiceAmount
  const receivedAmount = Number(data.receivedAmount) || 0;
  const balance = Math.max(0, subtotalFinal - receivedAmount);

  // Simple number to words function
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  const toWordsHelper = (n: number): string => {
      let str = '';
      str += (n >= 100000) ? toWordsHelper(Math.floor(n / 100000)) + ' Lakh ' : '';
      n %= 100000;
      str += (n >= 1000) ? toWordsHelper(Math.floor(n / 1000)) + ' Thousand ' : '';
      n %= 1000;
      str += (n >= 100) ? toWordsHelper(Math.floor(n / 100)) + ' Hundred ' : '';
      n %= 100;
      if (n > 0) {
          if (str !== '') str += 'and ';
          if (n < 20) str += a[n];
          else {
              str += b[Math.floor(n / 10)];
              str += (n % 10 > 0) ? '-' + a[n % 10] : '';
          }
      }
      return str.trim();
  };
  const toWords = (num: number) => {
      const numStr = num.toString().replace(/[\, ]/g,'');
      if (numStr !== String(num)) return '';
      let n = Math.floor(Number(numStr));
      if (n === 0) return 'Zero Rupees Only';
      return toWordsHelper(n) + ' Rupees Only';
  };

  return (
    <div className="p-6 bg-white font-times text-sm text-gray-900 border max-w-full">
      {/* Header */}
      <div className="w-full flex flex-row items-center justify-between border-b-[4px] border-[#e27d28] pb-3 mb-3">
        {/* Left side: Logo */}
        <div className="flex-1">
            <Logo size="lg" />
        </div>
        
        {/* Separator line */}
        <div className="w-[1px] h-20 bg-gray-300 mx-4"></div>

        {/* Right side: Contact Info */}
        <div className="flex-1 flex flex-col gap-2 text-[13px] text-gray-800 ml-4">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-gray-500 fill-gray-500 stroke-gray-500" />
                </div>
                <div className="leading-snug flex items-center gap-2">
                    <div className="text-gray-600">GSTIN</div>
                    <div className="font-bold text-gray-900">27BXPBP1277F1ZG</div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-700 fill-gray-700 stroke-gray-700" />
                </div>
                <div className="font-bold text-gray-900 leading-snug">9422939036</div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-500 fill-red-500 stroke-white stroke-2" />
                </div>
                <div className="leading-snug text-gray-900">
                    Chhatrapati Shivaji Maharaj Chowk Road Washim, 444505
                </div>
            </div>
        </div>
      </div>

      {/* Invoice Meta */}
      <div className="flex justify-between bg-gray-50 py-1.5 px-3 font-bold text-base mb-4 border-y border-gray-200">
          <div>Invoice No: {data.invoiceNo}</div>
          <div>Date: {safeFormatDate(data.invoiceDate, 'dd-MM-yyyy')}</div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm">
             <div className="flex items-center gap-2 font-bold mb-2">
                 <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center">👤</span>
                 BILL TO
             </div>
             <p className="font-bold text-base mb-1">R.S. Bhandari Solar Energy Solutions</p>
             <p className="text-gray-600 mb-2">Chhatrapati Shivaji Maharaj Chowk Road<br/>Washim, 444505.</p>
             <div className="space-y-1 text-xs">
                 <p><strong>Phone No:</strong> 9422939036</p>
                 <p><strong>GSTIN:</strong> 27BXPPB1277F1ZG</p>
                 <p><strong>Pan Number:</strong> BXPPB1277F</p>
                 <p><strong>Place of Supply:</strong> MAHARASHTRA</p>
             </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm">
             <div className="flex items-center gap-2 font-bold mb-2">
                 <span className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center">🚚</span>
                 SHIP TO / CUSTOMER
             </div>
             <p className="font-bold text-base mb-1 uppercase">{data.name}</p>
             <p className="text-gray-600 mb-2 leading-tight">{data.address}</p>
             <div className="space-y-1 text-xs mt-2">
                 <p><strong>Mobile:</strong> {data.mobileNumber}</p>
             </div>
          </div>
      </div>

      {/* Table */}
      <table className="w-full mb-4 border-collapse text-[10px]">
          <thead>
              <tr className="bg-[#e27d28] text-white">
                  <th className="py-2 px-2 text-left border border-[#cc6c1f] font-bold">#</th>
                  <th className="py-2 px-2 text-left border border-[#cc6c1f] font-bold">Item name</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">Quantity</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">Price/ unit</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">Taxable amount</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">CGST</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">SGST</th>
                  <th className="py-2 px-2 text-right border border-[#cc6c1f] font-bold">Amount</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td className="py-2 px-2 border border-gray-300 text-left align-top">1</td>
                  <td className="py-2 px-2 border border-gray-300 font-bold align-top w-[35%] uppercase">SOLAR POWER GENERATING SYSTEM</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">1</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">₹ {solarTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top font-bold">₹ {solarTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">
                      ₹ {solarCGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <div className="text-gray-600 mt-1">(2.5%)</div>
                  </td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">
                      ₹ {solarSGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <div className="text-gray-600 mt-1">(2.5%)</div>
                  </td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top font-bold">₹ {solarAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
              <tr>
                  <td className="py-2 px-2 border border-gray-300 text-left align-top">2</td>
                  <td className="py-2 px-2 border border-gray-300 font-bold align-top uppercase">INSTALLATION ,ERECTION,SERVICES,AMC CHARGES</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">1</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">₹ {installationTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top font-bold">₹ {installationTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">
                      ₹ {installationCGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <div className="text-gray-600 mt-1">(9.0%)</div>
                  </td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top">
                      ₹ {installationSGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <div className="text-gray-600 mt-1">(9.0%)</div>
                  </td>
                  <td className="py-2 px-2 border border-gray-300 text-right align-top font-bold">₹ {installationAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
              <tr className="bg-gray-50 font-bold">
                  <td className="py-2 px-2 border border-gray-300 text-left" colSpan={2}>Total</td>
                  <td className="py-2 px-2 border border-gray-300 text-right">2</td>
                  <td className="py-2 px-2 border border-gray-300 bg-white"></td>
                  <td className="py-2 px-2 border border-gray-300 text-right">₹ {totalTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right">₹ {totalCGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right">₹ {totalSGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="py-2 px-2 border border-gray-300 text-right">₹ {subtotalFinal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
          </tbody>
      </table>

      {/* Footer Grid */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-0">
          <div className="border border-gray-300 border-r-0 border-t-0 text-[10px]">
              <table className="w-full">
                  <thead>
                      <tr className="bg-[#e27d28] text-white">
                          <th className="py-1 px-2 text-left font-bold border-r border-[#cc6c1f]">Tax type</th>
                          <th className="py-1 px-2 text-right font-bold border-r border-[#cc6c1f]">Taxable amount</th>
                          <th className="py-1 px-2 text-right font-bold border-r border-[#cc6c1f]">Rate</th>
                          <th className="py-1 px-2 text-right font-bold border-r border-[#cc6c1f]">Tax amount</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td className="py-1 px-2">SGST</td>
                          <td className="py-1 px-2 text-right">₹ {installationTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="py-1 px-2 text-right">9.0%</td>
                          <td className="py-1 px-2 text-right border-r border-gray-300">₹ {installationSGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                      <tr>
                          <td className="py-1 px-2">CGST</td>
                          <td className="py-1 px-2 text-right">₹ {installationTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="py-1 px-2 text-right">9.0%</td>
                          <td className="py-1 px-2 text-right border-r border-gray-300">₹ {installationCGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                      <tr>
                          <td className="py-1 px-2">SGST</td>
                          <td className="py-1 px-2 text-right">₹ {solarTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="py-1 px-2 text-right">2.5%</td>
                          <td className="py-1 px-2 text-right border-r border-gray-300">₹ {solarSGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                      <tr>
                          <td className="py-1 px-2 border-b border-gray-300">CGST</td>
                          <td className="py-1 px-2 text-right border-b border-gray-300">₹ {solarTaxableAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="py-1 px-2 text-right border-b border-gray-300">2.5%</td>
                          <td className="py-1 px-2 text-right border-r border-b border-gray-300">₹ {solarCGST.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                  </tbody>
              </table>
              <div className="p-3">
                  <div className="font-bold text-gray-700 mb-1">TERMS & CONDITIONS</div>
                  <ol className="list-decimal pl-4 text-[10px] text-gray-700 space-y-0.5">
                      <li>Goods once sold not returnable.</li>
                      <li>ALL dispute are subject to Washim Jurisdiction Only.</li>
                  </ol>
                  <div className="font-bold text-gray-700 mt-3 mb-1">AMOUNT IN WORDS:</div>
                  <p className="text-gray-700 italic font-medium">{toWords(subtotalFinal)}</p>
              </div>
          </div>

          <div className="border border-gray-300 border-t-0 text-[11px] flex flex-col">
              <div className="bg-[#e27d28] text-white py-1 px-2 font-bold border-b border-[#cc6c1f]">
                  Amounts
              </div>
              <div className="flex-1 bg-white">
                  <div className="flex justify-between items-center py-2 px-3 border-b border-gray-200">
                      <span>Sub Total</span>
                      <span>₹ {subtotalFinal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 border-b border-gray-200 font-bold text-[12px]">
                      <span>Total</span>
                      <span>₹ {subtotalFinal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 border-b border-gray-200">
                      <span>Received</span>
                      <span>₹ {receivedAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3">
                      <span>Balance</span>
                      <span>₹ {balance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
              </div>
          </div>
      </div>

       <div className="flex justify-end mt-4 pr-8">
          <div className="text-center flex flex-col items-center scale-90 origin-bottom-right transform">
            <Stamp />
            <p className="font-bold mt-2 text-xs z-20 relative bg-white/50 px-2 rounded">Authorized Signatory</p>
            <p className="text-gray-600 font-medium text-[10px]">R.S. Bhandari Solar Energy</p>
          </div>
        </div>

    </div>
  );
};
