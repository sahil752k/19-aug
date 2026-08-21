import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const Annexure3: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div className="p-10 font-times text-sm text-gray-900 bg-white leading-relaxed">
      <h2 className="text-center font-bold text-lg uppercase mb-4 tracking-wide">Annexure - 3</h2>
      <h3 className="text-center font-bold mb-6">
        Net Metering Connection Agreement<br/>
        (On Rs.200/- Stamp paper)
      </h3>
      
      <p className="mb-4 text-justify">
        This Agreement is made and entered into at Washim on this <strong>{data.installationDate}</strong> between the Eligible Consumer <strong>{data.name}</strong> having premises at <strong>{data.address}</strong> and Consumer No <strong>{data.consumerNumber}</strong> as the first Party, AND The Distribution Licensee MSEDCL (hereinafter referred to as 'the Licensee') and having its Registered Office at Washim as second Party of this Agreement;
      </p>

      <p className="mb-4 text-justify">
        Whereas, the Eligible Consumer has applied to the Licensee for approval of a Net Metering Arrangement under the provisions of the Maharashtra Electricity Regulatory Commission (Net Metering for Roof-top Solar Photo Voltaic Systems) Regulations, 2015('the Net Metering Regulations') and subsequent amendments and sought its connectivity to the Licensee's Distribution Network;
      </p>

      <p className="mb-6 text-justify">
        And whereas, the Licensee has agreed to provide Network connectivity to the Eligible Consumer for injection of electricity generated from its Roof-top Renewable Energy Generating System of <strong>{data.installedCapacity} kilowatt</strong>; Both Parties hereby agree as follows:-
      </p>

      <h4 className="font-bold mb-2">1. Eligibility:</h4>
      <p className="pl-6 mb-6 text-justify">
        The Roof-top Renewable Energy Generating System meets the applicable norms for being integrated into the Distribution Network, and that the Eligible Consumer shall maintain the System accordingly for the duration of this Agreement.
      </p>

      <h4 className="font-bold mb-2">2. Technical and Inter-connection Requirements:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
        <p><strong>2.1.</strong> The metering arrangement and the inter-connection of the Roof-top Renewable Energy Generating System with the Network of the Licensee shall be as per the provisions of the Net Metering Regulations and the technical standards and norms specified by the Central Electricity Authority for connectivity of distributed generation resources and for the installation and operation of meters.</p>
        <p><strong>2.2.</strong> The Eligible Consumer agrees, that he shall install, prior to connection of the Roof-top Renewable Energy Generating System to the Network of the Licensee, an isolation device (both automatic and in built within inverter and external manual relays); and the Licensee shall have access to it if required for the repair and maintenance of the Distribution Network.</p>
        <p><strong>2.3.</strong> The Licensee shall specify the interface/inter-connection point and metering point.</p>
        <p><strong>2.4.</strong> The Eligible Consumer shall furnish all relevant data, such as voltage, frequency, circuit breaker, isolator position in his System, as and when required by the Licensee.</p>
      </div>

       <div className="flex justify-end mt-16 mb-8">
          <div className="text-center flex flex-col items-center">
            {data.vendorSignature && (
              <img src={data.vendorSignature} alt="Vendor Signature" className="w-32 h-16 object-contain mix-blend-multiply mb-2" />
            )}
            {data.vendorSignature && ( <img src={data.vendorSignature} alt="Vendor Signature" className="w-32 h-16 object-contain mix-blend-multiply mb-2" /> )}<Stamp />
          </div>
        </div>
      
      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>

      <h4 className="font-bold mb-2 mt-8">3. Safety:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p><strong>3.1.</strong> The equipment connected to the Licensee's Distribution System shall be compliant with relevant International (IEEE/IEC) or Indian Standards (BIS), as the case may be, and the installation of electrical equipment shall comply with the requirements specified by the Central Electricity Authority regarding safety and electricity supply.</p>
         <p><strong>3.2.</strong> The design, installation, maintenance and operation of the Roof-top Renewable Energy Generating System shall be undertaken in a manner conducive to the safety of the Roof-top Renewable Energy Generating System as well as the Licensee's Network.</p>
         <p><strong>3.3</strong> If, at any time, the Licensee determines that the Eligible Consumer's Roof-top Renewable Energy Generating System is causing or may cause damage to and/or results in the Licensee's other consumers or its assets, the Eligible Consumer shall disconnect the Roof-top Renewable Energy Generating System from the distribution Network upon direction from the Licensee, and shall undertake corrective measures at his own expense prior to re-connection.</p>
         <p><strong>3.4</strong> The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or damage to property that may occur due to back-feeding from the Roof-top Renewable Energy Generating System when the grid supply is off. The Licensee may disconnect the installation at any time in the event of such exigencies to prevent such accident.</p>
      </div>

       <div className="flex justify-end mt-16 mb-8">
          <div className="text-center flex flex-col items-center">
             {data.vendorSignature && ( <img src={data.vendorSignature} alt="Vendor Signature" className="w-32 h-16 object-contain mix-blend-multiply mb-2" /> )}<Stamp />
          </div>
       </div>

      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>

      <h4 className="font-bold mb-2 mt-8">4. Other Clearances and Approvals:</h4>
      <p className="pl-6 mb-6 text-justify">
        The Eligible Consumer shall obtain any statutory approvals and clearances that may be required, such as from the Electrical Inspector or the municipal or other authorities, before connecting the Roof-top Renewable Energy Generating System to the distribution Network.
      </p>

      <h4 className="font-bold mb-2">5. Period of Agreement, and Termination:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p>This Agreement shall be for a period for 20 years, but may be terminated prematurely by mutual consent;</p>
         <p>or</p>
         <p>(a) By the Eligible Consumer, by giving 30 days' notice to the Licensee;</p>
         <p>(b) By the Licensee, by giving 30 days' notice, if the Eligible Consumer breaches any terms of this Agreement or the provisions of the Net Metering Regulations and does not remedy such breach within 30 days, or such other reasonable period as may be provided, of receiving notice of such breach, or for any other valid reason communicated by the Licensee in writing.</p>
      </div>

      <h4 className="font-bold mb-2">6. Access and Disconnection:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p><strong>6.1.</strong> The Eligible Consumer shall provide access to the Licensee to the metering equipment and disconnecting devices of Roof-top Renewable Energy Generating System, both automatic and manual, by the Eligible Consumer.</p>
         <p><strong>6.2.</strong> If, in an emergent or outage situation, the Licensee cannot access the disconnecting devices of the Roof-top Renewable Energy Generating System, both automatic and manual, it may disconnect power supply to the premises.</p>
         <p><strong>6.3</strong> Upon termination of this Agreement under Clause 5, the Eligible Consumer shall disconnect the Roof-top Renewable Energy Generating System forthwith from the Network of the Licensee.</p>
      </div>

      <h4 className="font-bold mb-2">7. Liabilities:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p><strong>7.1.</strong> The Parties shall indemnify each other for damages or adverse effects of either Party's negligence or misconduct during the installation of the Roof-top Renewable Energy Generating System, connectivity with the distribution Network and operation of the System.</p>
         <p><strong>7.2.</strong> The Parties shall not be liable to each other for any loss of profits or revenues, business interruption losses, loss of contract or goodwill, or for indirect, consequential, incidental or special damages including, but not limited to, punitive or exemplary damages, whether any of these liabilities, losses or damages arise in contract, or otherwise.</p>
      </div>

      <h4 className="font-bold mb-2">8. Commercial Settlement:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p><strong>8.1.</strong> The commercial settlements under this Agreement shall be in accordance with the Net Metering Regulations.</p>
         <p><strong>8.2.</strong> The Licensee shall not be liable to compensate the Eligible Consumer if his Roof-top Renewable Energy Generating System is unable to inject surplus power generated into the Licensee's Network on account of failure of power supply in the grid/Network.</p>
         <p><strong>8.3.</strong> The existing metering System, if not in accordance with the Net Metering Regulations, shall be replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of meters shall be installed at the inter-connection point to the Licensee's Network for recording export and import of energy. The uni-directional and bi-directional or pair of meters shall be fixed in separate meter boxes in the same proximity.</p>
      </div>

       <div className="flex justify-end mt-16 mb-8">
          <div className="text-center flex flex-col items-center">
             {data.vendorSignature && ( <img src={data.vendorSignature} alt="Vendor Signature" className="w-32 h-16 object-contain mix-blend-multiply mb-2" /> )}<Stamp />
          </div>
       </div>

      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>

      <div className="pl-6 mb-6 mt-8 space-y-3 text-justify">
         <p><strong>8.4.</strong> The Licensee shall issue monthly electricity bill for the net metered energy on the scheduled date of meter reading. If the exported energy exceeds the imported energy, the Licensee shall show the net energy exported as credited Units of electricity as specified in the Net Metering Regulations, 2015. If the exported energy is less than the imported energy, the Eligible Consumer shall pay the Distribution Licensee for the net energy imported at the prevailing tariff approved by the Commission for the consumer category to which he belongs.</p>
      </div>

      <h4 className="font-bold mb-2">9. Connection Costs:</h4>
      <p className="pl-6 mb-6 text-justify">
        The Eligible Consumer shall bear all costs related to the setting up of the Roof-top Renewable Energy Generating System, excluding the Net Metering Arrangement costs.
      </p>

      <h4 className="font-bold mb-2">10. Dispute Resolution:</h4>
      <div className="pl-6 mb-6 space-y-3 text-justify">
         <p><strong>10.1</strong> Any dispute arising under this Agreement shall be resolved promptly, in good faith and in an equitable manner by both the Parties.</p>
         <p><strong>10.2</strong> The Eligible Consumer shall have recourse to the concerned Consumer Grievance Redressal Forum constituted under the relevant Regulations in respect of any grievance regarding billing which has not been redressed by the Licensee.</p>
      </div>

       <p className="mt-8 mb-6 text-justify">The witness where of <span className="border-b border-gray-400 inline-block w-48 mx-2"></span> for and on behalf of Eligible Consumer and <strong className="uppercase">{data.name}</strong> for and on behalf of MSEDCL agree to this agreement.</p>

       <div className="grid grid-cols-2 gap-x-12 gap-y-16 mt-10">
          <div>
             <div className="h-16 w-48 mb-2 flex flex-col items-center justify-end relative border-b border-gray-300">
                {data.customerSignature ? (
                  <img src={data.customerSignature} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-gray-300 italic text-sm">Sign</span>
                )}
             </div>
             <p className="text-sm font-bold">Shri:</p>
             <p className="text-sm">For and on Behalf of Eligible Consumer</p>
          </div>
          <div>
             <div className="h-16 mb-2"></div>
             <p className="text-sm font-bold">Shri:</p>
             <p className="text-sm">for and on behalf of MSEDCL Witness</p>
          </div>

          <div>
             <div className="w-48 mb-2 flex flex-col items-start justify-end relative">
                <div className="w-24 mt-2">
                   <Stamp />
                </div>
             </div>
             <p className="text-sm">Witness 1: SUMIT RAJENDRA BHANDARI</p>
          </div>
          <div>
             <div className="h-16 mb-2"></div>
             <p className="text-sm">Witness 1:</p>
          </div>

          <div>
             <div className="h-16 w-48 mb-2 flex flex-col items-center justify-end relative border-b border-gray-300">
                {data.witnessSignature ? (
                  <img src={data.witnessSignature} alt="Witness Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-gray-300 italic text-sm">Sign</span>
                )}
             </div>
             <p className="text-sm">Witness 2: Pavan Gupta</p>
          </div>
          <div>
             <div className="h-16 mb-2"></div>
             <p className="text-sm">Witness 2:</p>
          </div>
       </div>

    </div>
  );
};
