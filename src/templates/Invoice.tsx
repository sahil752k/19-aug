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

  const items = data.invoiceItems || [];
  
  let subtotalQty = 0;
  let taxableAmountForCalc = 0;
  let subtotalTax = 0;
  let subtotalFinal = 0;

  // Let's assume the Tax % applies to (qty * rate)
  // or we can calculate the tax per item and add it to final.
  
  items.forEach(item => {
    subtotalQty += Number(item.qty);
    const itemTaxable = Number(item.qty) * Number(item.rate);
    const itemTaxAmt = itemTaxable * (Number(item.tax) / 100);
    const itemTotal = itemTaxable + itemTaxAmt;
    
    taxableAmountForCalc += itemTaxable;
    subtotalTax += itemTaxAmt;
    subtotalFinal += itemTotal;
  });

  // Calculate generic CGST/SGST by splitting the tax amount in half.
  // This assumes intrastate transaction (CGST+SGST). 
  // We can just represent them in the total block.
  const cgstVal = subtotalTax / 2;
  const sgstVal = subtotalTax / 2;

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
      <table className="w-full mb-4 border-collapse text-xs">
          <thead>
              <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-3 text-left w-12 border border-gray-700">#</th>
                  <th className="py-2 px-3 text-left border border-gray-700">Particulars</th>
                  <th className="py-2 px-3 text-center border border-gray-700">Qty</th>
                  <th className="py-2 px-3 text-right border border-gray-700">Rate (₹)</th>
                  <th className="py-2 px-3 text-right border border-gray-700">Tax Amt</th>
                  <th className="py-2 px-3 text-right border border-gray-700">Total (₹)</th>
              </tr>
          </thead>
          <tbody>
              {items.map((item, index) => {
                const itemTaxable = Number(item.qty) * Number(item.rate);
                const taxAmt = itemTaxable * (Number(item.tax) / 100);
                const itemTotal = itemTaxable + taxAmt;
                return (
                  <tr key={item.id || index}>
                      <td className="py-1.5 px-3 border border-gray-200 text-center">{index + 1}</td>
                      <td className="py-1.5 px-3 border border-gray-200 font-medium">{item.description}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-center">{item.qty}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-right">{Number(item.rate).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-right">{taxAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})} ({item.tax}%)</td>
                      <td className="py-1.5 px-3 border border-gray-200 text-right">{itemTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-bold">
                  <td className="py-1.5 px-3 border border-gray-200" colSpan={2}>Subtotal</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-center">{subtotalQty}</td>
                  <td className="py-1.5 px-3 border border-gray-200 bg-white border-b-white border-t-gray-200 border-l-white border-r-gray-200"></td>
                  <td className="py-1.5 px-3 border border-gray-200 text-right">₹ {subtotalTax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="py-1.5 px-3 border border-gray-200 text-right">₹ {subtotalFinal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
              </tr>
          </tbody>
      </table>

      {/* Footer Grid */}
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm h-28">
                  <div className="flex items-center gap-2 font-bold mb-2">
                       <span className="bg-yellow-500 text-white w-6 h-6 rounded flex items-center justify-center">📋</span>
                       TERMS & CONDITIONS
                  </div>
                  <ol className="list-decimal pl-5 text-xs text-gray-700 space-y-1">
                      <li>Goods once sold not returnable.</li>
                      <li>ALL dispute are subject to Washim Jurisdiction Only.</li>
                  </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm pb-4">
                  <div className="flex items-center gap-2 font-bold text-yellow-600 mb-2">
                       <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">₹</span>
                       AMOUNT IN WORDS:
                  </div>
                  <p className="text-gray-700 italic text-xs font-medium">{toWords(subtotalFinal)}</p>
              </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm text-xs">
              <div className="p-3 space-y-2 bg-white">
                  <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded">
                      <span className="text-gray-600 font-medium">💰 Taxable Amount</span>
                      <span className="font-medium">₹ {taxableAmountForCalc.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                  </div>
                  {items.map((item, index) => {
                    const itemTaxable = Number(item.qty) * Number(item.rate);
                    const itemTaxAmt = itemTaxable * (Number(item.tax) / 100);
                    const cgst = itemTaxAmt / 2;
                    const sgst = itemTaxAmt / 2;
                    const halfTaxRate = (Number(item.tax) / 2).toFixed(2);
                    return (
                      <React.Fragment key={`tax-${index}`}>
                        <div className="flex justify-between items-center px-1 text-gray-600">
                            <span>💸 CGST @ {halfTaxRate}% ({item.description || `Item ${index + 1}`})</span>
                            <span>₹ {cgst.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex justify-between items-center px-1 text-gray-600">
                            <span>💸 SGST @ {halfTaxRate}% ({item.description || `Item ${index + 1}`})</span>
                            <span>₹ {sgst.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
              
              <div className="bg-gray-800 text-white p-3 flex justify-between items-center font-bold text-base">
                  <div className="flex items-center gap-2">
                      <div className="bg-yellow-500 text-gray-900 w-5 h-5 rounded-full flex items-center justify-center text-xs">₹</div>
                      TOTAL AMOUNT
                  </div>
                  <span>₹ {subtotalFinal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
              </div>

              <div className="p-3 bg-white space-y-2 font-bold text-base">
                  <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                          <span>⬇️</span> Received
                      </div>
                      <span>₹ {data.receivedAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-900">
                          <span>⚙️</span> Balance Due
                      </div>
                      <span>₹ {(subtotalFinal - data.receivedAmount).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
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
