import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const Annexure3: React.FC = () => {
  const { data } = useAppContext();
  
  return (
    <div className="bg-gray-200 py-8 print:py-0 print:bg-white flex justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .annexure3-container {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12.5px;
          line-height: 1.2;
          color: black;
        }

        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 10mm 20mm 15mm 20mm; /* Reduced top padding, kept bottom padding */
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          box-sizing: border-box;
          position: relative;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .a4-page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
            min-height: 297mm;
            height: 297mm;
            overflow: hidden;
            padding: 10mm 20mm 15mm 20mm !important;
          }
          .a4-page:last-child {
            page-break-after: auto;
          }
        }
        
        .indent-p {
          text-indent: 40px;
        }
        .section-title {
          font-weight: bold;
          font-size: 15px;
        }
        .flex-list {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }
        .flex-list > span {
          flex-shrink: 0;
          font-size: 15px;
        }
      `}</style>
      
      <div className="annexure3-container">
        
        {/* PAGE 1 */}
        <div className="a4-page">
          <h2 className="text-center text-[19px] mb-4 mt-0">ANNEXURE &ndash; 3</h2>
          <h3 className="text-center font-bold mb-3 leading-snug text-[14.5px]">
            Net Metering Connection<br/>
            Agreement(On Rs.200/- Stamp<br/>
            paper)
          </h3>
          
          <p className="text-justify indent-p mb-2">
            This Agreement is made and entered into at Washim on this <strong>{data.agreementDate ? formatDate(data.agreementDate) : '2025-12-11'}</strong> between the
            Eligible Consumer <strong>{data.name || 'Prakashrao Dagdusing Jadhav'}</strong> having premises at <strong>{data.address || 'WASHIM'}</strong> and Consumer No
            <strong>{data.consumerNumber || '326017744588'}</strong> as the first Party, AND The Distribution Licensee <u>MSEDCL</u> (hereinafter referred to as 'the Licensee')
            and having its Registered Office at Washim
          </p>
          <p className="text-justify pl-10 mb-3">
            -&nbsp;&nbsp;&nbsp;&nbsp; as second Party of this Agreement;
          </p>
          
          <p className="text-justify mb-3">
            Whereas, the Eligible Consumer has applied to the Licensee for approval of a NetMetering Arrangement under the
            provisions of the Maharashtra Electricity Regulatory Commission (Net Metering for Roof-top Solar Photo Voltaic
            Systems) Regulations, 2015('the Net Metering Regulations') and subsequent amendments and sought its
            connectivity to the Licensee's Distribution Network ;
          </p>
          
          <p className="text-justify mb-0">
            And whereas, the Licensee has agreed to provide Network connectivity to the Eligible Consumer for injection of
            electricity generated from its <strong>Roof-top Renewable Energy Generating System of {data.installedCapacity || '5'} kilowatt</strong>;
          </p>
          <p className="text-justify mb-3">
            Both Parties hereby agree as follows:-
          </p>
          
          <div className="mb-1"><strong className="section-title">1.</strong> Eligibility:</div>
          <p className="pl-[34px] text-justify mb-3">
            The <strong>Roof-top Renewable Energy Generating System</strong> meets the applicable norms for being integrated into
            the Distribution Network, and that the Eligible Consumer shall maintain the System accordingly for the
            duration of this Agreement.
          </p>
          
          <div className="mb-2"><strong className="section-title">2.</strong> Technical and Inter-connection Requirements:</div>
          <div className="text-justify mb-3">
            <div className="flex-list">
              <span>2.1.</span>
              <p>The metering arrangement and the inter-connection of the Roof-top <strong>Renewable Energy Generating<br/>System</strong> with the Network of the Licensee shall be as per the provisions of the Net Metering Regulations
              and the technical standards and norms specified by the Central Electricity Authority for connectivity of
              distributed generation resources and for the installation and operation of meters.</p>
            </div>
            <div className="flex-list">
              <span>2.2.</span>
              <p>The Eligible Consumer agrees, that he shall install, prior to connection of the Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> to the Network of the Licensee, anisolation device (both automatic and in built within
              inverter and external manualrelays); and the Licensee shall have access to it if required for the repair and
              maintenance of the Distribution Network.</p>
            </div>
            <div className="flex-list">
              <span>2.3.</span>
              <p>The Licensee shall specify the interface/inter-connection point and metering point.</p>
            </div>
            <div className="flex-list">
              <span>2.4.</span>
              <p>The Eligible Consumer shall furnish all relevant data, such as voltage, frequency, circuit breaker,
              isolator position in his System, as and when required by theLicensee.</p>
            </div>
          </div>

          <div className="mb-2"><strong className="section-title">3.</strong> Safety:</div>
          <div className="text-justify relative">
            <div className="flex-list">
              <span>3.1</span>
              <p>The equipment connected to the Licensee's Distribution System shall be compliant with relevant
              International (IEEE/IEC) or Indian Standards (BIS), as the case may be, and the installation of electrical
              equipment shall comply with the requirements specified by the Central Electricity Authority regarding
              safety and electricitysupply.</p>
            </div>
            <div className="flex-list">
              <span>3.2</span>
              <p>The design, installation, maintenance and operation of the Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> shall be undertaken in a manner conducive to the safety of the Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> as well as the Licensee's Network.</p>
            </div>
            <div className="flex-list">
              <span>3.3</span>
              <p>If, at any time, the Licensee determines that the Eligible Consumer's Roof-top <strong>Renewable Energy<br/>
              Generating System</strong> is causing or may cause damage to and/or results in the Licensee's other consumers
              or its assets, the Eligible Consumer shall disconnect the Roof-top <strong>Renewable Energy Generating System</strong>
              from the distribution Network upon direction from the Licensee, and shall undertake corrective measures
              at his own expense prior to re-connection.</p>
            </div>
            <div className="flex-list">
              <span>3.4</span>
              <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
              damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
              of such exigencies to prevent such accident.</p>
            </div>
            
            {/* PAGE 1 STAMP */}
            <div className="flex justify-end pr-12 mt-1">
              <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center right' }}>
                <Stamp />
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="a4-page">
          <div className="mb-2"><strong className="section-title">4.</strong> Other Clearances and Approvals:</div>
          <p className="pl-[34px] text-justify mb-6">
            The Eligible Consumer shall obtain any statutory approvals and clearances that may be required, such as
            from the Electrical Inspector or the municipal or other authorities, before connecting the Roof-top
            <strong> Renewable Energy Generating System</strong> to the distribution Network.
          </p>

          <div className="mb-2"><strong className="section-title">5.</strong> Period of Agreement, and Termination:</div>
          <div className="pl-[34px] text-justify mb-6">
            <p className="mb-1">This Agreement shall be for a period for 20 years, but may be terminated prematurelyBy mutual consent;
            <br/>or</p>
            <div className="flex gap-3 mb-1">
              <span>(a)</span>
              <p>By the Eligible Consumer, by giving 30 days' notice to the Licensee;</p>
            </div>
            <div className="flex gap-2">
              <span>(b)</span>
              <p>By the Licensee, by giving 30 days' notice, if the Eligible Consumer breaches any terms of this
              Agreement or the provisions of the Net Metering Regulations and does not remedy such breach
              within 30 days, or such other reasonable period as may be provided, of receiving notice of such
              breach, or for any other valid reason communicated by the Licensee in writing.</p>
            </div>
          </div>

          <div className="mb-2"><strong className="section-title">6.</strong> Access and Disconnection:</div>
          <div className="text-justify mb-6">
            <div className="flex-list">
              <span>6.1.</span>
              <p>The Eligible Consumer shall provide access to the Licensee to the metering equipment and disconnecting
              devices of Roof-top <strong>Renewable Energy Generating System</strong>, both automatic and manual, by the Eligible
              Consumer.</p>
            </div>
            <div className="flex-list">
              <span>6.2.</span>
              <p>If, in an emergent or outage situation, the Licensee cannot access thedisconnecting devices of the Roof-
              top <strong>Renewable Energy Generating System</strong>, bothautomatic and manual, it may disconnect power supply
              to the premises.</p>
            </div>
            <div className="flex-list">
              <span>6.3</span>
              <p>Upon termination of this Agreement under Clause 5, the Eligible Consumer shall disconnect the Roof-top
              <strong> Renewable Energy Generating System</strong> forthwith from the Network of the Licensee.</p>
            </div>
          </div>

          <div className="mb-2"><strong className="section-title">7.</strong> Liabilitie s:</div>
          <div className="text-justify mb-6">
            <div className="flex-list">
              <span>7.1.</span>
              <p>The Parties shall indemnify each other for damages or adverse effects of either Party's negligence or
              misconduct during the installation of the Roof-top <strong>RenewableEnergy Generating System</strong>, connectivity
              with the distribution Network and operation of the System.</p>
            </div>
            <div className="flex-list">
              <span>7.2.</span>
              <p>The Parties shall not be liable to each other for any loss of profits or revenues, business interruption losses,
              loss of contract or goodwill, or for indirect, consequential, incidental or special damages including, but
              not limited to, punitive or exemplary damages, whether any of these liabilities, losses or damages arise in
              contract, or otherwise.</p>
            </div>
          </div>

          <div className="mb-2"><strong className="section-title">8.</strong> Commercial Settlement:</div>
          <div className="text-justify relative">
            <div className="flex-list">
              <span>8.1.</span>
              <p>The commercial settlements under this Agreement shall be in accordance with the Net Metering
              Regulations.</p>
            </div>
            <div className="flex-list">
              <span>8.2.</span>
              <p>The Licensee shall not be liable to compensate the Eligible Consumer if his Roof- top <strong>Renewable
              Energy Generating System</strong> is unable to inject surplus power generated into the Licensee's Network
              on account of failure of power supply in thegrid/Network.</p>
            </div>
            <div className="flex-list">
              <span>8.3.</span>
              <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
              replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
              definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
              measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
              meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
              and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
              separate meter boxes in the same proximity.</p>
            </div>
            
            {/* PAGE 2 STAMP */}
            <div className="flex justify-end pr-12 mt-1">
              <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center right' }}>
                <Stamp />
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="a4-page">
          <div className="text-justify mb-8 pt-2">
            <div className="flex-list">
              <span>8.4.</span>
              <p>The Licensee shall issue monthly electricity bill for the net metered energy on the scheduled date of
              meter reading. If the exported energy exceeds the imported energy, the Licensee shall show the net
              energy exported as credited Units of electricity as specified in the Net Metering Regulations, 2015.
              If the exported energy is less than the imported energy, the Eligible Consumer shall pay the
              Distribution Licensee for the net energy imported at the prevailing tariff approved by the
              Commission for the consumer category to which he belongs.</p>
            </div>
          </div>

          <div className="mb-2"><strong className="section-title">9.</strong> Connection Costs:</div>
          <p className="pl-[34px] text-justify mb-6">
            The Eligible Consumer shall bear all costs related to the setting up of the Roof-top <strong>Renewable
            Energy Generating System</strong>, excluding the Net Metering Arrangement costs.
          </p>

          <div className="mb-2"><strong className="section-title">10.</strong> Dispute Resolution:</div>
          <div className="text-justify mb-8">
            <div className="flex-list">
              <span>10.1</span>
              <p>Any dispute arising under this Agreement shall be resolved promptly, in good faith and in an
              equitable manner by both the Parties.</p>
            </div>
            <div className="flex-list">
              <span>10.2</span>
              <p>The Eligible Consumer shall have recourse to the concerned Consumer Grievance Redressal Forum
              constituted under the relevant Regulations in respect of any grievance regarding billing which has
              not been redressed by the Licensee.</p>
            </div>
          </div>

          <p className="text-justify pl-[34px] mb-8">
            The witness where of <span className="border-b border-black inline-block w-64 mx-1 translate-y-[4px]"></span> for and on behalf of Eligible<br/>
            Consumer and <strong>{data.name || 'Prakashrao Dagdusing Jadhav'}</strong> for and on behalf of MSEDCL agree to this agreement.
          </p>

          <div className="grid grid-cols-2 gap-y-12 pl-[34px] relative">
            <div>
              <div className="h-[60px] w-48 mb-1 flex flex-col items-start justify-end">
                {data.customerSignature ? (
                  <img crossOrigin="anonymous" src={data.customerSignature} alt="Signature" className="w-48 h-[60px] object-contain object-left mix-blend-multiply" />
                ) : (
                  <span className="text-gray-400 font-sans text-4xl transform -rotate-12 translate-y-2 translate-x-2">Jadhv</span>
                )}
              </div>
              <p className="mb-0">Shri:</p>
              <p className="mb-0">For and on Behalf of Eligible Consumer</p>
            </div>
            <div>
              <div className="h-[60px] mb-1"></div>
              <p className="mb-0">Shri:</p>
              <p className="mb-0">for and on behalf of MSEDCLWitness</p>
            </div>

            <div>
              <div className="h-[60px] w-48 mb-1 flex flex-col items-start justify-end">
                 {data.witnessSignature ? (
                  <img crossOrigin="anonymous" src={data.witnessSignature} alt="Witness 1 Signature" className="w-48 h-[60px] object-contain object-left mix-blend-multiply" />
                 ) : (
                   <span className="text-gray-500 font-sans text-3xl transform -rotate-6 translate-y-2">Sumit</span>
                 )}
              </div>
              <p className="mb-0">Witness 1: SUMIT RAJENDRA BHANDARI</p>
            </div>
            <div>
              <div className="h-[60px] mb-1"></div>
              <p className="mb-0">Witness 1:</p>
            </div>

            <div>
              <div className="h-[60px] w-48 mb-1 flex flex-col items-start justify-end">
                 {data.vendorSignature ? (
                  <img crossOrigin="anonymous" src={data.vendorSignature} alt="Witness 2 Signature" className="w-48 h-[60px] object-contain object-left mix-blend-multiply" />
                 ) : (
                   <span className="text-gray-500 font-sans text-3xl transform -rotate-6 translate-y-2">Pavan</span>
                 )}
              </div>
              <p className="mb-0">Witness 2: Pavan Gupta</p>
            </div>
            <div>
              <div className="h-[60px] mb-1"></div>
              <p className="mb-0">Witness 2:</p>
            </div>
            
          </div>
          
          {/* PAGE 3 STAMP */}
          <div className="flex justify-start pl-[34px] mt-1">
            <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center left' }}>
              <Stamp />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
