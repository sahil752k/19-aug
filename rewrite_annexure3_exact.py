import re

new_content = """import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const Annexure3: React.FC = () => {
  const { data } = useAppContext();
  
  return (
    <div className="bg-gray-100 flex justify-center py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .annexure3-document {
          font-family: 'Times New Roman', Times, serif;
          font-size: 15px;
          line-height: 1.25;
          color: #000;
        }

        .annexure3-page {
          background-color: white;
          width: 210mm;
          min-height: 297mm;
          padding: 20mm 20mm 20mm 20mm;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: relative;
          box-sizing: border-box;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background-color: white;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-gray-100 {
            background-color: transparent !important;
            padding: 0 !important;
            display: block !important;
          }
          .annexure3-document {
            font-size: 14.5px;
            line-height: 1.25;
          }
          .annexure3-page {
            width: 210mm;
            height: 297mm;
            min-height: 297mm;
            padding: 15mm 15mm 15mm 15mm;
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: hidden;
          }
          .annexure3-page:last-child {
            page-break-after: auto;
          }
        }
        
        p { margin-bottom: 0; }
      `}</style>
      
      <div className="annexure3-document">
        
        {/* PAGE 1 */}
        <div className="annexure3-page">
          <h2 className="text-center text-[19px] mb-8 mt-2 tracking-wide font-normal">ANNEXURE &ndash; 3</h2>
          <h3 className="text-center font-bold mb-6 leading-snug text-[15px]">
            Net Metering Connection<br/>
            Agreement(On Rs.200/- Stamp<br/>
            paper)
          </h3>
          
          <p className="text-justify indent-10">
            This Agreement is made and entered into at Washim on this <strong>{data.agreementDate ? formatDate(data.agreementDate) : '2025-12-11'}</strong> between the<br/>Eligible Consumer <strong>{data.name}</strong> having premises at <strong>{data.address}</strong> and Consumer No<br/><strong>{data.consumerNumber}</strong> as the first Party, AND The Distribution Licensee <u>MSEDCL</u> (hereinafter referred to as 'the Licensee')<br/>and having its Registered Office at Washim
          </p>
          <p className="text-justify pl-4">
            -&nbsp;&nbsp;&nbsp;&nbsp; as second Party of this Agreement;
          </p>
          
          <p className="text-justify mt-1">
            Whereas, the Eligible Consumer has applied to the Licensee for approval of a NetMetering Arrangement under the
            provisions of the Maharashtra Electricity Regulatory Commission (Net Metering for Roof-top Solar Photo Voltaic
            Systems) Regulations, 2015('the Net Metering Regulations') and subsequent amendments and sought its
            connectivity to the Licensee's Distribution Network ;
          </p>
          
          <p className="text-justify mt-3">
            And whereas, the Licensee has agreed to provide Network connectivity to the Eligible Consumer for injection of
            electricity generated from its <strong>Roof-top Renewable Energy Generating System</strong> of {data.installedCapacity} kilowatt;
          </p>
          <p className="text-justify">
            Both Parties hereby agree as follows:-
          </p>
          
          <div className="mt-1"><strong className="text-[16px] tracking-wide">1.</strong> Eligibility:</div>
          <p className="pl-10 text-justify">
            The Roof-top <strong>Renewable Energy Generating System</strong> meets the applicable norms for being integrated into
            the Distribution Network, and that the Eligible Consumer shall maintain the System accordingly for the
            duration of this Agreement.
          </p>
          
          <div className="mt-1"><strong className="text-[16px] tracking-wide">2.</strong> Technical and Inter-connection Requirements:</div>
          <div className="space-y-1 text-justify">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">2.1.</span>
              <p>The metering arrangement and the inter-connection of the Roof-top <strong>Renewable Energy Generating<br/>System</strong> with the Network of the Licensee shall be as per the provisions of the Net Metering Regulations
              and the technical standards and norms specified by the Central Electricity Authority for connectivity of
              distributed generation resources and for the installation and operation of meters.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">2.2.</span>
              <p>The Eligible Consumer agrees, that he shall install, prior to connection of the Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> to the Network of the Licensee, anisolation device (both automatic and in built within
              inverter and external manualrelays); and the Licensee shall have access to it if required for the repair and
              maintenance of the Distribution Network.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">2.3.</span>
              <p>The Licensee shall specify the interface/inter-connection point and metering point.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">2.4.</span>
              <p>The Eligible Consumer shall furnish all relevant data, such as voltage, frequency, circuit breaker,
              isolator position in his System, as and when required by theLicensee.</p>
            </div>
          </div>

          <div className="mt-1"><strong className="text-[16px] tracking-wide">3.</strong> Safety:</div>
          <div className="space-y-1 text-justify relative">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">3.1</span>
              <p>The equipment connected to the Licensee's Distribution System shall be compliant with relevant
              International (IEEE/IEC) or Indian Standards (BIS), as the case may be, and the installation of electrical
              equipment shall comply with the requirements specified by the Central Electricity Authority regarding
              safety and electricitysupply.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">3.2</span>
              <p>The design, installation, maintenance and operation of the Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> shall be undertaken in a manner conducive to the safety of the Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> as well as the Licensee's Network.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">3.3</span>
              <p>If, at any time, the Licensee determines that the Eligible Consumer's Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> is causing or may cause damage to and/or results in the Licensee's other consumers
              or its assets, the Eligible Consumer shall disconnect the Roof-top <strong>Renewable Energy Generating System</strong>
              from the distribution Network upon direction from the Licensee, and shall undertake corrective measures
              at his own expense prior to re-connection.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">3.4</span>
              <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
              damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
              of such exigencies to prevent such accident.</p>
            </div>
            {/* ABSOLUTE BOTTOM RIGHT STAMP FOR PAGE 1 */}
            <div className="absolute -bottom-6 right-8 scale-[0.6] origin-bottom-right opacity-90 mix-blend-multiply pointer-events-none z-10"><Stamp /></div>
          </div>

        </div>

        {/* PAGE 2 */}
        <div className="annexure3-page">
          <div className="mt-8"><strong className="text-[16px] tracking-wide">4.</strong> Other Clearances and Approvals:</div>
          <p className="pl-8 text-justify">
            The Eligible Consumer shall obtain any statutory approvals and clearances that may be required, such as
            from the Electrical Inspector or the municipal or other authorities, before connecting the Roof-top
            <strong>Renewable Energy Generating System</strong> to the distribution Network.
          </p>

          <div className="mt-6"><strong className="text-[16px] tracking-wide">5.</strong> Period of Agreement, and Termination:</div>
          <div className="pl-8 space-y-1 text-justify">
            <p>This Agreement shall be for a period for 20 years, but may be terminated prematurelyBy mutual consent;
            <br/>or</p>
            <div className="flex gap-2">
              <span className="text-[16px] tracking-wide shrink-0">(a)</span>
              <p>By the Eligible Consumer, by giving 30 days' notice to the Licensee;</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[16px] tracking-wide shrink-0">(b)</span>
              <p>By the Licensee, by giving 30 days' notice, if the Eligible Consumer breaches any terms of this
              Agreement or the provisions of the Net Metering Regulations and does not remedy such breach
              within 30 days, or such other reasonable period as may be provided, of receiving notice of such
              breach, or for any other valid reason communicated by the Licensee in writing.</p>
            </div>
          </div>

          <div className="mt-6"><strong className="text-[16px] tracking-wide">6.</strong> Access and Disconnection:</div>
          <div className="space-y-1 text-justify">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">6.1.</span>
              <p>The Eligible Consumer shall provide access to the Licensee to the metering equipment and disconnecting
              devices of Roof-top <strong>Renewable Energy Generating System</strong>, both automatic and manual, by the Eligible
              Consumer.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">6.2.</span>
              <p>If, in an emergent or outage situation, the Licensee cannot access thedisconnecting devices of the Roof-
              top <strong>Renewable Energy Generating System</strong>, bothautomatic and manual, it may disconnect power supply
              to the premises.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">6.3</span>
              <p>Upon termination of this Agreement under Clause 5, the Eligible Consumer shall disconnect the Roof-top
              <strong>Renewable Energy Generating System</strong> forthwith from the Network of the Licensee.</p>
            </div>
          </div>

          <div className="mt-6"><strong className="text-[16px] tracking-wide">7.</strong> Liabilitie s:</div>
          <div className="space-y-1 text-justify">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">7.1.</span>
              <p>The Parties shall indemnify each other for damages or adverse effects of either Party's negligence or
              misconduct during the installation of the Roof-top <strong>RenewableEnergy Generating System</strong>, connectivity
              with the distribution Network and operation of the System.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">7.2.</span>
              <p>The Parties shall not be liable to each other for any loss of profits or revenues, business interruption losses,
              loss of contract or goodwill, or for indirect, consequential, incidental or special damages including, but
              not limited to, punitive or exemplary damages, whether any of these liabilities, losses or damages arise in
              contract, or otherwise.</p>
            </div>
          </div>

          <div className="mt-6"><strong className="text-[16px] tracking-wide">8.</strong> Commercial Settlement:</div>
          <div className="space-y-1 text-justify relative">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">8.1.</span>
              <p>The commercial settlements under this Agreement shall be in accordance with the Net Metering
              Regulations.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">8.2.</span>
              <p>The Licensee shall not be liable to compensate the Eligible Consumer if his Roof- top <strong>Renewable
              Energy Generating System</strong> is unable to inject surplus power generated into the Licensee's Network
              on account of failure of power supply in thegrid/Network.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">8.3.</span>
              <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
              replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
              definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
              measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
              meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
              and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
              separate meter boxes in the same proximity.</p>
            </div>
            
            {/* ABSOLUTE BOTTOM RIGHT STAMP FOR PAGE 2 */}
            <div className="absolute -bottom-8 right-12 scale-[0.6] origin-bottom-right opacity-90 mix-blend-multiply pointer-events-none z-10"><Stamp /></div>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="annexure3-page">
          <div className="space-y-1 text-justify mt-8">
            <div className="flex gap-4">
              <span className="text-[16px] tracking-wide shrink-0">8.4.</span>
              <p>The Licensee shall issue monthly electricity bill for the net metered energy on the scheduled date of
              meter reading. If the exported energy exceeds the imported energy, the Licensee shall show the net
              energy exported as credited Units of electricity as specified in the Net Metering Regulations, 2015.
              If the exported energy is less than the imported energy, the Eligible Consumer shall pay the
              Distribution Licensee for the net energy imported at the prevailing tariff approved by the
              Commission for the consumer category to which he belongs.</p>
            </div>
          </div>

          <div className="mt-8"><strong className="text-[16px] tracking-wide">9.</strong> Connection Costs:</div>
          <p className="pl-12 text-justify">
            The Eligible Consumer shall bear all costs related to the setting up of the Roof-top <strong>Renewable
            Energy Generating System</strong>, excluding the Net Metering Arrangement costs.
          </p>

          <div className="mt-8"><strong className="text-[16px] tracking-wide">10.</strong> Dispute Resolution:</div>
          <div className="space-y-1 text-justify">
            <div className="flex gap-2">
              <span className="text-[16px] tracking-wide shrink-0">10.1</span>
              <p>Any dispute arising under this Agreement shall be resolved promptly, in good faith and in an
              equitable manner by both the Parties.</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[16px] tracking-wide shrink-0">10.2</span>
              <p>The Eligible Consumer shall have recourse to the concerned Consumer Grievance Redressal Forum
              constituted under the relevant Regulations in respect of any grievance regarding billing which has
              not been redressed by the Licensee.</p>
            </div>
          </div>

          <p className="mt-8 text-justify pl-4">
            The witness where of <span className="border-b border-gray-900 inline-block w-64 mx-1 translate-y-[2px]"></span> for and on behalf of Eligible<br/>
            Consumer and <strong>{data.name}</strong> for and on behalf of MSEDCL agree to this agreement.
          </p>

          <div className="grid grid-cols-2 gap-y-10 mt-10 pl-4 relative">
            <div>
              <div className="h-16 w-48 mb-1 flex flex-col items-start justify-end">
                {data.customerSignature ? (
                  <img src={data.customerSignature} alt="Signature" className="w-48 h-16 object-contain object-left mix-blend-multiply" />
                ) : (
                  <span className="text-gray-200 italic text-sm">Sign</span>
                )}
              </div>
              <p className="text-[15px] font-bold text-gray-800" style={{fontFamily: 'sans-serif'}}>{data.name ? data.name.split(' ')[0] : 'Jadhv'}</p>
              <p className="text-[14px]">Shri:</p>
              <p className="text-[14px]">For and on Behalf of Eligible Consumer</p>
            </div>
            <div>
              <div className="h-16 mb-1"></div>
              <p className="text-[14px]">Shri:</p>
              <p className="text-[14px]">for and on behalf of MSEDCLWitness</p>
            </div>

            <div>
              <div className="h-16 w-48 mb-1 flex flex-col items-start justify-end">
                 {data.witnessSignature ? (
                  <img src={data.witnessSignature} alt="Witness 1 Signature" className="w-48 h-16 object-contain object-left mix-blend-multiply" />
                 ) : (
                   <span className="text-gray-200 italic text-sm">Sign</span>
                 )}
              </div>
              <p className="text-[14px]">Witness 1: SUMIT RAJENDRA BHANDARI</p>
            </div>
            <div>
              <div className="h-16 mb-1"></div>
              <p className="text-[14px]">Witness 1:</p>
            </div>

            <div>
              <div className="h-16 w-48 mb-1 flex flex-col items-start justify-end">
                 {data.vendorSignature ? (
                  <img src={data.vendorSignature} alt="Witness 2 Signature" className="w-48 h-16 object-contain object-left mix-blend-multiply" />
                 ) : (
                   <span className="text-gray-200 italic text-sm">Sign</span>
                 )}
              </div>
              <p className="text-[14px]">Witness 2: Pavan Gupta</p>
            </div>
            <div>
              <div className="h-16 mb-1"></div>
              <p className="text-[14px]">Witness 2:</p>
            </div>
            
            {/* ABSOLUTE BOTTOM LEFT STAMP FOR PAGE 3 */}
            <div className="absolute -bottom-8 left-4 scale-[0.6] origin-bottom-left opacity-90 mix-blend-multiply pointer-events-none z-10"><Stamp /></div>
          </div>
        </div>

      </div>
    </div>
  );
};
"""

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(new_content)
