import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const Annexure3: React.FC = () => {
  const { data } = useAppContext();
  
  return (
    <div className="p-10 font-times text-[13px] text-gray-900 bg-white leading-snug">
      
      {/* PAGE 1 */}
      <h2 className="text-center text-[15px] uppercase mb-4 tracking-wide">ANNEXURE &ndash; 3</h2>
      
      <h3 className="text-center text-[13px] font-bold mb-6">
        Net Metering Connection<br/>
        Agreement(On Rs.200/- Stamp<br/>
        paper)
      </h3>
      
      <p className="mb-3 text-justify">
        This Agreement is made and entered into at Washim on this <strong>{data.date}</strong> between the Eligible Consumer <strong>{data.name}</strong> having premises at <strong>{data.address}</strong> and Consumer No <strong>{data.consumerNumber}</strong> as the first Party, AND The Distribution Licensee MSEDCL (hereinafter referred to as 'the Licensee') and having its Registered Office at Washim
        <br/>
        - as second Party of this Agreement;
      </p>
      
      <p className="mb-3 text-justify">
        Whereas, the Eligible Consumer has applied to the Licensee for approval of a NetMetering Arrangement under the provisions of the Maharashtra Electricity Regulatory Commission (Net Metering for Roof-top Solar Photo Voltaic Systems) Regulations, 2015('the Net Metering Regulations') and subsequent amendments and sought its connectivity to the Licensee's Distribution Network :
      </p>
      
      <p className="mb-4 text-justify">
        And whereas, the Licensee has agreed to provide Network connectivity to the Eligible Consumer for injection of electricity generated from its <strong>Roof-top Renewable Energy Generating System of {data.installedCapacity} kilowatt;</strong> Both Parties hereby agree as follows:-
      </p>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>1.</strong> Eligibility:</p>
        <p className="pl-6 text-justify">
          The Roof-top Renewable Energy Generating System meets the applicable norms for being integrated into the Distribution Network, and that the Eligible Consumer shall maintain the System accordingly for the duration of this Agreement.
        </p>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>2.</strong> Technical and Inter-connection Requirements:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">2.1.</span><span className="flex-1">The metering arrangement and the inter-connection of the Roof-top Renewable Energy Generating System with the Network of the Licensee shall be as per the provisions of the Net Metering Regulations and the technical standards and norms specified by the Central Electricity Authority for connectivity of distributed generation resources and for the installation and operation of meters.</span></div>
          <div className="flex"><span className="w-10">2.2.</span><span className="flex-1">The Eligible Consumer agrees, that he shall install, prior to connection of the Roof-top Renewable Energy Generating System to the Network of the Licensee, anisolation device (both automatic and in built within inverter and external manualrelays); and the Licensee shall have access to it if required for the repair and maintenance of the Distribution Network.</span></div>
          <div className="flex"><span className="w-10">2.3.</span><span className="flex-1">The Licensee shall specify the interface/inter-connection point and metering point.</span></div>
          <div className="flex"><span className="w-10">2.4.</span><span className="flex-1">The Eligible Consumer shall furnish all relevant data, such as voltage, frequency, circuit breaker, isolator position in his System, as and when required by theLicensee.</span></div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>3.</strong> Safety:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">3.1</span><span className="flex-1">The equipment connected to the Licensee's Distribution System shall be compliant with relevant International (IEEE/IEC) or Indian Standards (BIS), as the case may be, and the installation of electrical equipment shall comply with the requirements specified by the Central Electricity Authority regarding safety and electricitysupply.</span></div>
          <div className="flex"><span className="w-10">3.2</span><span className="flex-1">The design, installation, maintenance and operation of the Roof-top Renewable Energy Generating System shall be undertaken in a manner conducive to the safety of the Roof-top Renewable Energy Generating System as well as the Licensee's Network.</span></div>
          <div className="flex"><span className="w-10">3.3</span><span className="flex-1">If, at any time, the Licensee determines that the Eligible Consumer's Roof-top Renewable Energy Generating System is causing or may cause damage to and/or results in the Licensee's other consumers or its assets, the Eligible Consumer shall disconnect the Roof-top Renewable Energy Generating System from the distribution Network upon direction from the Licensee, and shall undertake corrective measures at his own expense prior to re-connection.</span></div>
          <div className="flex"><span className="w-10">3.4</span><span className="flex-1">The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or damage to property that may occur due to back- feeding fromthe Roof-top Renewable Energy Generating System when the grid supply is off. The Licensee may disconnect the installation at any time in the event of such exigencies to prevent such accident.</span></div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 mb-4">
         <div className="text-center flex flex-col items-center">
            <Stamp />
         </div>
      </div>
      
      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>

      {/* PAGE 2 */}
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>4.</strong> Other Clearances and Approvals:</p>
        <p className="pl-6 text-justify">
          The Eligible Consumer shall obtain any statutory approvals and clearances that may be required, such as from the Electrical Inspector or the municipal or other authorities, before connecting the Roof-top Renewable Energy Generating System to the distribution Network.
        </p>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>5.</strong> Period of Agreement, and Termination:</p>
        <div className="pl-6 text-justify space-y-1">
          <p>This Agreement shall be for a period for 20 years, but may be terminated prematurelyBy mutual consent;</p>
          <p>or</p>
          <p>(a) By the Eligible Consumer, by giving 30 days' notice to the Licensee;</p>
          <p>(b) By the Licensee, by giving 30 days' notice, if the Eligible Consumer breaches any terms of this Agreement or the provisions of the Net Metering Regulations and does not remedy such breach within 30 days, or such other reasonable period as may be provided, of receiving notice of such breach, or for any other valid reason communicated by the Licensee in writing.</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>6.</strong> Access and Disconnection:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">6.1.</span><span className="flex-1">The Eligible Consumer shall provide access to the Licensee to the metering equipment and disconnecting devices of Roof-top Renewable Energy Generating System, both automatic and manual, by the Eligible Consumer.</span></div>
          <div className="flex"><span className="w-10">6.2.</span><span className="flex-1">If, in an emergent or outage situation, the Licensee cannot access thedisconnecting devices of the Roof-top Renewable Energy Generating System, bothautomatic and manual, it may disconnect power supply to the premises.</span></div>
          <div className="flex"><span className="w-10">6.3</span><span className="flex-1">Upon termination of this Agreement under Clause 5, the Eligible Consumer shall disconnect the Roof-top Renewable Energy Generating System forthwith from the Network of the Licensee.</span></div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>7.</strong> Liabilitie s:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">7.1.</span><span className="flex-1">The Parties shall indemnify each other for damages or adverse effects of either Party's negligence or misconduct during the installation of the Roof-top RenewableEnergy Generating System, connectivity with the distribution Network and operation of the System.</span></div>
          <div className="flex"><span className="w-10">7.2.</span><span className="flex-1">The Parties shall not be liable to each other for any loss of profits or revenues, business interruption losses, loss of contract or goodwill, or for indirect, consequential, incidental or special damages including, but not limited to, punitive or exemplary damages, whether any of these liabilities, losses or damages arise in contract, or otherwise.</span></div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2 text-justify"><strong>8.</strong> Commercial Settlement:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">8.1.</span><span className="flex-1">The commercial settlements under this Agreement shall be in accordance with the Net Metering Regulations.</span></div>
          <div className="flex"><span className="w-10">8.2.</span><span className="flex-1">The Licensee shall not be liable to compensate the Eligible Consumer if his Roof- top Renewable Energy Generating System is unable to inject surplus power generated into the Licensee's Network on account of failure of power supply in thegrid/Network.</span></div>
          <div className="flex"><span className="w-10">8.3.</span><span className="flex-1">The existing metering System, if not in accordance with the Net Metering Regulations, shall be replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of meters shall be installed at the inter- connection point to the Licensee's Network forrecording export and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in separate meter boxes in the same proximity.</span></div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 mb-4">
         <div className="text-center flex flex-col items-center">
            <Stamp />
         </div>
      </div>

      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>
      
      {/* PAGE 3 */}

      <div className="mb-4">
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">8.4.</span><span className="flex-1">The Licensee shall issue monthly electricity bill for the net metered energy on the scheduled date of meter reading. If the exported energy exceeds the imported energy, the Licensee shall show the net energy exported as credited Units of electricity as specified in the Net Metering Regulations, 2015. If the exported energy is less than the imported energy, the Eligible Consumer shall pay the Distribution Licensee for the net energy imported at the prevailing tariff approved by the Commission for the consumer category to which he belongs.</span></div>
        </div>
      </div>
      
      <div className="mb-4 mt-6">
        <p className="mb-2 text-justify"><strong>9.</strong> Connection Costs:</p>
        <p className="pl-6 text-justify">
          The Eligible Consumer shall bear all costs related to the setting up of the Roof-top Renewable Energy Generating System, excluding the Net Metering Arrangement costs.
        </p>
      </div>
      
      <div className="mb-4 mt-6">
        <p className="mb-2 text-justify"><strong>10.</strong> Dispute Resolution:</p>
        <div className="space-y-2 text-justify">
          <div className="flex"><span className="w-10">10.1</span><span className="flex-1">Any dispute arising under this Agreement shall be resolved promptly, in good faith and in an equitable manner by both the Parties.</span></div>
          <div className="flex"><span className="w-10">10.2</span><span className="flex-1">The Eligible Consumer shall have recourse to the concerned Consumer Grievance Redressal Forum constituted under the relevant Regulations in respect of any grievance regarding billing which has not been redressed by the Licensee.</span></div>
        </div>
      </div>
      
      <p className="mt-8 mb-6 text-justify">
        The witness where of <span className="border-b border-gray-900 inline-block w-64 mx-2"></span> for and on behalf of Eligible Consumer and <strong>{data.name}</strong> for and on behalf of MSEDCL agree to this agreement.
      </p>
      
      <div className="grid grid-cols-2 gap-x-12 gap-y-12 mt-10">
          <div>
             <div className="h-16 w-48 mb-1 flex flex-col items-center justify-end relative">
                {data.a3CustomerSignature ? (
                  <img src={data.a3CustomerSignature} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-gray-900 text-lg font-bold">Sign</span>
                )}
             </div>
             <p className="text-[13px] font-bold">Shri:</p>
             <p className="text-[13px]">For and on Behalf of Eligible Consumer</p>
          </div>
          <div className="pt-8">
             <div className="h-8 mb-1"></div>
             <p className="text-[13px] font-bold">Shri:</p>
             <p className="text-[13px]">for and on behalf of MSEDCLWitness</p>
          </div>
          
          <div>
             <div className="h-12 w-48 mb-1 flex flex-col items-start justify-end relative">
                {data.a3VendorSignature ? (
                  <img src={data.a3VendorSignature} alt="Vendor Signature" className="w-16 h-8 object-contain mix-blend-multiply" />
                ) : (
                  <img src="https://api.iconify.design/mdi:signature-freehand.svg?color=%23000" alt="sign" className="w-16 h-8 opacity-70" />
                )}
             </div>
             <p className="text-[13px]">Witness 1: SUMIT RAJENDRA BHANDARI</p>
          </div>
          <div className="pt-4">
             <p className="text-[13px]">Witness 1:</p>
          </div>
          
          <div>
             <div className="h-12 w-48 mb-1 flex flex-col items-start justify-end relative">
                {data.a3WitnessSignature ? (
                  <img src={data.a3WitnessSignature} alt="Witness Signature" className="w-12 h-12 object-contain mix-blend-multiply" />
                ) : (
                  <img src="https://api.iconify.design/mdi:signature-freehand.svg?color=%23000" alt="sign" className="w-12 h-12 opacity-70" />
                )}
             </div>
             <p className="text-[13px]">Witness 2: Pavan Gupta</p>
          </div>
          <div className="pt-4">
             <p className="text-[13px]">Witness 2:</p>
          </div>
      </div>
      
      <div className="flex justify-start mt-8 mb-4">
         <div className="text-center flex flex-col items-center">
            <Stamp />
         </div>
      </div>
      
    </div>
  );
};
