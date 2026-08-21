import React from 'react';
import { useAppContext } from '../context/AppContext';

export const ModelAgreement: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div className="p-10 font-times text-sm text-gray-900 bg-white leading-relaxed">
      <h2 className="text-center font-bold text-lg underline mb-4">Model Agreement</h2>
      <h3 className="text-center font-bold text-md mb-6">Between</h3>
      
      <p className="text-center font-bold mb-8">
        Applicant and the registered/empanelled Vendor for installation of rooftop solar system in residential house of the Applicant under simplified procedure of Rooftop Solar Programme Ph-II
      </p>

      <p className="mb-4 text-justify">
        This agreement is executed on <strong>{data.agreementDate}</strong> or design, installation, commissioning and five years comprehensive maintenance of rooftop solar system to be installed under simplified procedure of Rooftop Solar Programme Ph-II.
      </p>

      <h3 className="text-center font-bold text-md mb-4">Between</h3>
      
      <p className="mb-4 text-justify">
        <strong>{data.name}</strong> having residential electricity connection with consumer number <strong>{data.consumerNumber}</strong> from_MSEDCL at {data.address ? data.address.split(/[,\s]+/).filter(Boolean).pop()?.replace(/[^a-zA-Z]/g, '').replace(/^./, str => str.toUpperCase()) : 'Washim'}.
      </p>

      <h3 className="text-center font-bold text-md mb-4">And</h3>
      <p className="mb-6 text-justify">
        R.S. Bhandari Solar Energy Solutions is registered/ empanelled with the MSEDCL and is having registered/functional office at Washim, Maha.
      </p>

      <p className="mb-4">Both Applicant and the Vendor are jointly referred as Parties.</p>
      
      <p className="font-bold mb-2">Whereas</p>
      <ul className="list-disc pl-8 mb-6 space-y-2 text-justify">
        <li>The Applicant intends to install rooftop solar system under simplified procedure of Rooftop Solar Programme Ph-II of the MNRE.</li>
        <li>The Vendor is registered/empanelled vendor with DISCOM for installation of rooftop solar under MNRE Schemes. The Vendor satisfies all the existing regulation pertaining to electrical safety and license in the respective state and it is not debarred or blacklisted from undertaking any such installations by any state/central Government agency.</li>
        <li>Both the parties are mutually agreed and understand their roles and responsibilities and have no liability to any other agency/firm/stakeholder especially to DISCOM and MNRE.</li>
      </ul>

      <h4 className="font-bold mb-2 uppercase">1. General Terms:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>1.1.</strong> The Applicant hereby represents and warrants that the Applicant has the sole legal capacity to enter into this Agreement and authorise the construction, installation and commissioning of the Rooftop Solar System (“RTS System”) which is inclusive of Balance of System (“BoS”) on the Applicant’s premises (“Applicant Site”). The Vendor reserves its right to verify ownership of the Applicant Site and Applicant covenants to co-operate and provide all information and documentation required by the Vendor for the same.</p>
        <p><strong>1.2.</strong> Vendor may propose changes to the scope, nature and or schedule of the services being performed under this Agreement. All proposed changes must be mutually agreed between the Parties. If Parties fail to agree on the variation proposed, either Party may terminate this Agreement by serving notice as per Clause 13.</p>
        <p><strong>1.3.</strong> The Applicant understands and agrees that future changes in load, electricity usage patterns and/or electricity tariffs may affect the economics of the RTS System and these factors have not been and cannot be considered in any analysis or quotation provided by Vendor or its Authorized Persons (defined below).</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">2. RTS System</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>2.1.</strong> Total capacity of RTS System will be minimum 3.3 kWp.</p>
        <p><strong>2.2.</strong> The Solar modules, inverters and BoS will confirm to minimum specifications and DCR requirement of MNRE.</p>
        <p><strong>2.3.</strong> Solar modules <strong>{data.moduleMake}</strong> make, DCR-{data.moduleWattage}W capacity each and 22.29% efficiency will be procured and installed by the Vendor</p>
        <p><strong>2.4.</strong> Solar inverter of <strong>{data.inverterMake}</strong> make, {data.inverterModel} , {data.inverterCapacity} kW rated output capacity will be procured and installed by the Vendor.</p>
        <p><strong>2.5.</strong> Module mounting structure has to withstand minimum wind load pressure as specified by MNRE.</p>
        <p><strong>2.6.</strong> Other BoS installations shall be as per best industry practice with all safety and protection gears installed by the vendor.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">3. Price and Payment Terms</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>3.1.</strong> The cost of RTS System will be Rs.{data.rtsSystemCost}/-(to be decided mutually). The Applicant shall pay the total cost to the Vendor as under:</p>
        <div className="pl-8 space-y-1 my-2">
          <p>(i) 50 % as an advance on confirmation of the order;</p>
          <p>(ii) 30% against Proforma Invoice (PI) before dispatch of solar panels, inverters and otherBoS items to be delivered;</p>
          <p>(iii) 20 % after installation and commissioning of the RTS System.</p>
        </div>
        <p><strong>3.2.</strong> The order value and payment terms are fixed and will not be subject to any adjustment except as approved in writing by Vendor. The payment shall be made only through bankers’ cheque / NEFT / RTGS / online payment portal as intimated by Vendor. No cash payments shall be accepted by Vendor or its Authorised Person.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase mt-8">4. Representations Made by the Applicant:</h4>
      <p className="pl-6 mb-2">The Applicant acknowledges and agrees that:</p>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>4.1.</strong> any timeline or schedule shared by Vendor for the provision of services and delivery of the RTS System is only an estimate and Vendor will not be liable for any delay that is not attributable to Vendor;</p>
        <p><strong>4.2.</strong> all information disclosed by the Applicant to Vendor in connection with the supply of the RTS System (or any part thereof), services and generation estimation (including, without limitation, the load profile and power bill) are true and accurate, and acknowledges that Vendor has relied on the information produced by the Applicant to customise the RTS System layout and BoS design for the purposes of this Agreement;</p>
        <p><strong>4.3.</strong> all descriptive specifications, illustrations, drawings, data, dimensions, quotation, fact sheets, price lists and any advertising material circulated/published/provided by Vendor are approximate only;</p>
        <p><strong>4.4.</strong> any drawings, pre-feasibility report, specifications and plans composed by Vendor shall require the Applicant’s approval within 5 (five) days of its receipt by electronic mail to Vendor and if the Applicant does not respond within this period, the drawings, specifications or plans shall be final and deemed to have been approved by the Applicant;</p>
        <p><strong>4.5.</strong> the Applicant shall not use the RTS System or any part thereof, other than in accordance with the product manufacturer’s specifications, and covenants that any risk arising from misuse or/and misappropriate use shall be to the account of the Applicant alone.</p>
        <p><strong>4.6.</strong> The Applicant represents, warrants and covenants that:</p>
        <div className="pl-8 space-y-1 my-2">
          <p>(i) all electrical and plumbing infrastructure at the Applicant Site are in conformity with applicable laws;</p>
          <p>(ii) the Applicant has the legal capacity to permit unfettered access to Vendor and its Authorized Persons for the purposes of execution and performance of this Agreement;</p>
          <p>(iii) the Applicant has and will provide requisite power, water and other requisite resources and storage facilities for construction, installation, operation and maintenance of the RTS System;</p>
          <p>(iv) the Applicant will provide support for site fabrication of structure, assembly and fitting of module mounting structure at Applicant Site;</p>
          <p>(v) the Applicant will ensure that the Applicant Site is shadow free and free of all encumbrances during the lifetime of the RTS System;</p>
          <p>(vi) Applicant should ensure that the Applicant regularly cleans and ensures accessibility and safety to the RTS System, as required by Vendor and dusting frequency in the premises.</p>
          <p>(vii) Vendor is entitled to permit geo-tagging of the Applicant Site as a Vendor installation site;</p>
          <p>(viii) Unless otherwise intimated by the Applicant in writing, Vendor is entitled to take photographs, videos and testimonials of the Applicant and the Applicant Site, and to create content which will become the property of Vendor and the same can be freely used by Vendor as part of its promotional and marketing activities across all platforms as it deems fit;</p>
          <p>(ix) the Applicant validates the stability of the Applicant Site for the installation of the RTS System.</p>
        </div>
      </div>

      <h4 className="font-bold mb-2 uppercase">5. Maintenance:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>5.1.</strong> Vendor shall provide five-year free workmanship maintenance. Vendor shall visit the Applicant’s premises at least once every quarter after commissioning of the RTS System for maintenance purposes.</p>
        <p><strong>5.2.</strong> During such maintenance visit, Vendor shall check all nuts and bolts, fuses, earth resistance and other consumables in respect of the RTS System to ensure that it is in good working condition.</p>
        <p><strong>5.3.</strong> Cleaning requirement/expectation from the Applicant side – Applicant responsibility, minimum expectation from Applicant that it will be cleaned regularly as per the dusting frequency.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">6. Access and Right of Entry:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>6.1.</strong> The Applicant hereby grants permission to Vendor and its authorized personnel, representatives, associates, officers, employees, financing agents, subcontractors (“Authorized Persons”) to enter the Applicant Site for the purposes of:</p>
        <div className="pl-8 space-y-1 my-2">
          <p>(a) conducting feasibility study;</p>
          <p>(b) storing the RTS System/any part thereof;</p>
          <p>(c) installing the RTS System;</p>
          <p>(d) inspecting the RTS System;</p>
          <p>(e) conducting repairs and maintenance to the RTS System;</p>
          <p>(f) removing the RTS System (or any part thereof), if necessary for any reason whatsoever;</p>
          <p>(g) Such other matters as necessary to execute and perform its rights and obligations under this Agreement.</p>
        </div>
        <p><strong>6.2.</strong> The Applicant shall ensure that third-party consents necessary for the Authorized Persons to access the Applicant Site are obtained prior to commencement of services under this Agreement.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">7. Warranties:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>7.1.</strong> Product Warranty: The Applicant shall be entitled to manufacturers’ warranty. Any warranty in relation to RTS System supplied to the Applicant by Vendor under this Agreement is limited to the warranty given by the manufacturer of the RTS System (or any part thereof) to Vendor.</p>
        <p><strong>7.2.</strong> Installation Warranty: Vendor warrants that all installations shall be free from workmanship defects or BOS defects for a period of five years from the date of installation of the RTS System. The warranty is limited to Vendor rectifying the workmanship or BOS defects at Vendor’s expense in respect of those defects reported by the Applicant, in writing. The Applicant is obliged and liable to report such defects within 15 (fifteen) days of occurrence of such defect.</p>
        <p><strong>7.3.</strong> Subject to manufacturer warranty, Vendor warrants that the solar modules supplied herein shall have tolerance within a five percentage range (+/-5%). The peak-power point voltage and the peak-power point current of any supplied solar module and/or any module string (series connected modules) shall not vary by more than 5% (five percent) from the respective arithmetic means for all modules and/or for all module strings, as the case may be, provided the RTS System is properly maintained and the Applicant Site is free from shadow at the time of operation of the RTS System.</p>
        <p><strong>7.4.</strong> Exceptions for warranty:</p>
        <div className="pl-8 space-y-1 my-2">
          <p>(a) Any attempt by any person other than Vendor or its Authorised Persons to adjust, modify, repair or provide maintenance to the RTS System, shall disentitle the Applicant of the warranty provided by Vendor hereunder.</p>
          <p>(b) Vendor shall not be liable for any degeneration or damage to the RTS System due to any action or inaction on the part of the Applicant.</p>
          <p>(c) Vendor shall not be bound or liable to remedy any damage, fault, failure or malfunction of the RTS System owing to external causes, including but not limited to accidents, misuse, neglect, if usage and/or storage and/or installation are non-confirming toproduct instructions, modifications by the Applicant leading to shading or accessibility issues, failure to perform required maintenance, normal wear and tear, Force Majeure Event, or negligence or default attributable to the Applicant.</p>
          <p>(d) Vendor shall not be liable to repair or remedy any accessories or parts added to the RTS System that were not originally sourced by Vendor to the Applicant.</p>
        </div>
      </div>

      <h4 className="font-bold mb-2 uppercase mt-8">8. Performance Guarantee</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>8.1.</strong> Vendor guarantees minimum system performance ratio of 75% as per performance ratio test carried out in adherence to IEC 61724 or equivalent BIS for a period of five years.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">9. Insurance:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>9.1.</strong> Vendor may, at its sole discretion, obtain insurance covering risks of loss/damage to the RTS System (any part thereof) during transit from Vendor’s warehouse until delivery to the Applicant Site and until installation and commissioning.</p>
        <p><strong>9.2.</strong> Thereafter, all risk shall pass on to the Applicant and the Applicant may accordingly procure relevant insurances.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">10. Cancellation:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>10.1.</strong> The Applicant may cancel the order placed on Vendor within 7 (seven) days from the date of remittance of advance money or the date of order acceptance, whichever is earlier (“<strong>Order Confirmation</strong>”) by serving notice as per Clause 13.</p>
        <p><strong>10.2.</strong> If the Applicant cancels the order after the expiry of 7 (seven) days from the date of Order Form, the Applicant shall be liable to pay Vendor, a cancellation fee of 20% of the total order value <em>plus</em> costs and expenses incurred by Vendor, including, costs for labour, design, return of products, administrative costs, subvention costs.</p>
        <p><strong>10.3.</strong> Notwithstanding the aforesaid, the Applicant shall not be entitled to cancel the Order Form after Vendor has dispatched the RTS System (or any part thereof, including BOS) to the Applicant Site. If Applicant chooses to terminate the Order Form after dispatch, the entire amount paid by the Applicant till date, shall be forfeited by Vendor.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase">11. Limitation of Liability and Indemnity:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>11.1.</strong> To the extent that terms implied by law apply to the RTS System and the services rendered under this Agreement, Vendor’s liability for any breach of those terms is limited to:</p>
        <div className="pl-8 space-y-1 my-2">
          <p>(a) repairing or replacing the RTS System/any part thereof, as applicable; or</p>
          <p>(b) Refund of the moneys paid by the Applicant to Vendor, if Vendor cannot fulfil the order.</p>
        </div>
      </div>

      <h4 className="font-bold mb-2 uppercase">12. Suspension and Termination:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>12.1.</strong> If the Applicant fails to pay any sum due under this Agreement on the due date, Vendor may, in addition to its other rights under this Agreement, suspend its obligations under this Agreement until all outstanding amounts (including interest due) are paid.</p>
      </div>

      <h4 className="font-bold mb-2 uppercase mt-8">13. Notices:</h4>
      <p className="pl-6 mb-6 text-justify">Any notice or other communication under this Agreement to Vendor and or to the Applicant, shall be in writing, in English language and shall be delivered or sent: (a) by electronic mail and/or (b) by hand delivery or registered post/courier, at the registered address of Applicant/Vendor.</p>

      <h4 className="font-bold mb-2 uppercase">14. Force Majeure Event:</h4>
      <div className="pl-6 mb-6 space-y-2 text-justify">
        <p><strong>14.1.</strong> Neither Party shall be in default due to any delay or failure to perform its/his/her/their obligations under this Agreement which arises from or is a consequence of occurrence of an event which is beyond the reasonable control of such Party, and which makes performance of its/his/her/their obligations under this Agreement impossible or so impractical as reasonably to be considered impossible in the circumstances, and includes, but is not limited to, war, riot, civil disorder, earthquake, fire, explosion, storm, flood or other adverse weatherconditions, pandemic, epidemic, embargo, strikes, lockouts, labour difficulties, other industrial action, acts of government, unavailability of equipment from vendor, changes requested by the Applicant (“<strong>Force Majeure Event</strong>”).</p>
      </div>

      <div className="break-inside-avoid">
        <h4 className="font-bold mb-2 uppercase">15. Governing Law and Dispute Resolution:</h4>
        <div className="pl-6 mb-6 space-y-2 text-justify">
          <p><strong>15.1.</strong> The interpretation and enforcement of this Agreement shall be governed by the laws of India</p>
          <p><strong>15.2.</strong> In the event of any dispute, controversy or difference between the Parties arising out of, or relating to this Agreement (“<strong>Dispute</strong>”), both Parties shall make an effort to resolve the Dispute in good faith, failing which, any Party to the Dispute shall be entitled to refer the Dispute to arbitration to resolve the Dispute in the manner set out in this Clause. The rights and obligations of the Parties under this Agreement shall remain in full force and effect pending the award in such arbitration proceeding.</p>
          <p><strong>15.3.</strong> The arbitration proceeding shall be governed by the provisions of the Arbitration and Conciliation Act, 1996 and shall be settled by a sole arbitrator mutually appointed by the Parties.</p>
        </div>

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
      </div>

    </div>
  );
};
