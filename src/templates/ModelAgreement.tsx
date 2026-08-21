import React from 'react';
import { useAppContext } from '../context/AppContext';

export const ModelAgreement: React.FC = () => {
  const { data } = useAppContext();
  
  return (
    <div className="font-['Times_New_Roman',_Times,_serif] text-[16px] text-black bg-white leading-[1.35] p-8 sm:p-12 print:p-0">
      <style>{`
        @media print {
          @page {
            margin: 0.75in 1in 0.8in 1in !important;
            size: A4 portrait;
          }
          .page-break {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>

      {/* PAGE 1 */}
      <div className="text-center font-bold text-[16px] underline mb-6">Model Agreement</div>
      <div className="text-center font-bold text-[16px] mb-6">Between</div>
      
      <div className="text-center font-bold mb-8">
        Applicant and the registered/empanelled Vendor for installation of rooftop solar system in<br/>
        residential house of the Applicant under simplified procedure of Rooftop Solar Programme Ph-<br/>
        II
      </div>
      
      <div className="mb-6 text-justify indent-12">
        This agreement is executed on {data.agreementDate || data.date || "2026-21-5"} or design, installation, commissioning and five years
        comprehensive maintenance of rooftop solar system to be installed under simplified procedure of
        Rooftop Solar Programme Ph-II.
      </div>
      
      <div className="text-center font-bold text-[16px] mb-4">Between</div>
      
      <div className="mb-4 text-justify">
        <strong>{data.name || "Shrikurshna Vasudeo Mahale"}</strong> having residential electricity connection with consumer<br/>
        number <strong>{data.consumerNumber || "326210003846"}</strong> from_MSEDCL at Washim.
      </div>
      
      <div className="text-center font-bold text-[16px] mb-4">And</div>
      
      <div className="mb-6 text-justify">
        R.S. Bhandari Solar Energy Solutions is registered/ empanelled withthe MSEDCL and is having<br/>
        registered/functional office at washim maha.
      </div>
      
      <div className="mb-1">Both Applicant and the Vendor are jointly referred as Parties.</div>
      <div className="font-bold mb-1">Whereas</div>
      <div className="pl-12 mb-6 space-y-1 text-justify">
        <div className="flex"><span className="w-8 shrink-0">-</span><span className="flex-1">The Applicant intends to install rooftop solar system under simplified procedure of Rooftop Solar Programme Ph-II of the MNRE.</span></div>
        <div className="flex"><span className="w-8 shrink-0">-</span><span className="flex-1">The Vendor is registered/empanelled vendor with DISCOM for installation of rooftop solar under MNRE Schemes. The Vendor satisfies all the existing regulation pertaining to electrical safety and license in the respective state and it is not debarred or blacklisted from undertaking any such installations by any state/central Government agency.</span></div>
        <div className="flex"><span className="w-8 shrink-0">-</span><span className="flex-1">Both the parties are mutually agreed and understand their roles and responsibilities and have no liability to any other agency/firm/stakeholder especially to DISCOM and MNRE.</span></div>
      </div>

      <div className="font-bold mb-1">1. GENERAL TERMS:</div>
      <div className="space-y-1 text-justify mb-4">
        <div className="flex"><span className="w-10 font-bold shrink-0">1.1.</span><span className="flex-1">The Applicant hereby represents and warrants that the Applicant has the sole legal capacity to enter into this Agreement and authorise the construction, installation and commissioning of the Rooftop Solar System (“<strong>RTS System</strong>”) which is inclusive of Balance of System (“<strong>BoS</strong>”) on the Applicant’s premises (“<strong>Applicant Site</strong>”). The Vendor reserves its right to verify ownership of the Applicant Site and Applicant covenants to co-operate and provide all information and documentation required by the Vendor for the same.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">1.2.</span><span className="flex-1">Vendor may propose changes to the scope, nature and or schedule of the services being performed under this Agreement. All proposed changes must be mutually agreed between the Parties. If Parties fail to agree on the variation proposed, either Party may terminate this Agreement by serving notice as per Clause 13.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">1.3.</span><span className="flex-1">The Applicant understands and agrees that future changes in load, electricity usage patterns and/or electricity tariffs may affect the economics of the RTS System and these factors have not been and cannot be considered in any analysis or quotation provided by Vendor or its Authorized Persons (<em>defined below</em>).</span></div>
      </div>

      <div className="font-bold mb-1">2. RTS System</div>
      <div className="space-y-1 text-justify">
        <div className="flex"><span className="w-10 font-bold shrink-0">2.1.</span><span className="flex-1">Total capacity of RTS System will be minimum {data.installedCapacity || "3.3"} kWp.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">2.2.</span><span className="flex-1">The Solar modules, inverters and BoS will confirm to minimum specifications and DCR requirement of MNRE.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">2.3.</span><span className="flex-1">Solar modules ADANI make, DCR-620W capacity each and <u>22.29%</u> efficiency will<br/>be procured and installed by the Vendor</span></div>
      </div>
      
      <div className="page-break"></div>

      {/* PAGE 2 */}
      
      <div className="space-y-1 text-justify mb-4">
        <div className="flex"><span className="w-10 font-bold shrink-0">2.4.</span><span className="flex-1">Solar inverter of <u>POLYCAB</u> make, Polycab MIN 3000TL-X , 3.6 kW rated output<br/>capacity will beprocured and installed by the Vendor</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">2.5.</span><span className="flex-1">Module mounting structure has to withstand minimum wind load pressure as specified by MNRE.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">2.6.</span><span className="flex-1">Other BoS installations shall be as per best industry practice with all safety and protection gears installed by the vendor.</span></div>
      </div>

      <div className="font-bold mb-1">3. PRICE AND PAYMENT TERMS</div>
      <div className="space-y-1 text-justify mb-2">
        <div className="flex"><span className="w-10 font-bold shrink-0">3.1.</span><span className="flex-1">The cost of RTS System will be Rs.{data.totalAmount || "210000"}/-(to be decided mutually). The Applicant shall paythe total cost to the Vendor as under:</span></div>
      </div>
      <div className="pl-16 mb-2 space-y-1 text-justify">
          <div className="flex"><span className="w-16 shrink-0 font-bold">(i)</span><span>50 % as an advance on confirmation of the order;</span></div>
          <div className="flex"><span className="w-16 shrink-0 font-bold">(ii)</span><span>30% against Proforma Invoice (PI) before dispatch of solar panels, inverters and<br/>otherBoS items to be delivered;</span></div>
          <div className="flex"><span className="w-16 shrink-0 font-bold">(iii)</span><span>20 % after installation and commissioning of the RTS System.</span></div>
      </div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-10 font-bold shrink-0">3.2.</span><span className="flex-1">The order value and payment terms are fixed and will not be subject to any adjustment except as approved in writing by Vendor. The payment shall be made only through bankers’ cheque / NEFT / RTGS / online payment portal as intimated by Vendor. No cash payments shall be accepted by Vendor or its Authorised Person.</span></div>
      </div>
      
      <div className="font-bold mb-1">4. REPRESENTATIONS MADE BY THE APPLICANT:</div>
      <div className="mb-1 text-justify">The Applicant acknowledges and agrees that:</div>
      <div className="space-y-1 text-justify mb-1">
        <div className="flex"><span className="w-10 font-bold shrink-0">4.1.</span><span className="flex-1">any timeline or schedule shared by Vendor for the provision of services and delivery of the RTS System is only an estimate and Vendor will not be liable for any delay that is not attributable to Vendor;</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">4.2.</span><span className="flex-1">all information disclosed by the Applicant to Vendor in connection with the supply of the RTS System (or any part thereof), services and generation estimation (including, without limitation, the load profile and power bill) are true and accurate, and acknowledges that Vendor has relied on the information produced by the Applicant to customise the RTS System layout and BoS design for the purposes of this Agreement;</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">4.3.</span><span className="flex-1">all descriptive specifications, illustrations, drawings, data, dimensions, quotation, fact sheets, price lists and any advertising material circulated/published/provided by Vendor are approximate only;</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">4.4.</span><span className="flex-1">any drawings, pre-feasibility report, specifications and plans composed by Vendor shall require the Applicant’s approval within 5 (five) days of its receipt by electronic mail to Vendor and if the Applicant does not respond within this period, the drawings, specifications or plans shall be final and deemed to have been approved by the Applicant;</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">4.5.</span><span className="flex-1">the Applicant shall not use the RTS System or any part thereof, other than in accordance with the product manufacturer’s specifications, and covenants that any risk arising from misuse or/and misappropriate use shall be to the account of the Applicant alone.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">4.6.</span><span className="flex-1">The Applicant represents, warrants and covenants that:</span></div>
      </div>
      <div className="pl-12 space-y-1 text-justify">
         <div className="flex"><span className="w-10 font-bold shrink-0">(i)</span><span className="flex-1">all electrical and plumbing infrastructure at the Applicant Site are in conformity with applicable laws;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(ii)</span><span className="flex-1">the Applicant has the legal capacity to permit unfettered access to Vendor and its Authorized Persons for the purposes of execution and performance of this Agreement;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(iii)</span><span className="flex-1">the Applicant has and will provide requisite power, water and other requisite resources and storage facilities for construction, installation, operation and maintenance of the RTS System;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(iv)</span><span className="flex-1">the Applicant will provide support for site fabrication of structure, assembly and fitting of module mounting structure at Applicant Site;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(v)</span><span className="flex-1">the Applicant will ensure that the Applicant Site is shadow free and free of all encumbrances during the lifetime of the RTS System;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(vi)</span><span className="flex-1">Applicant should ensure that the Applicant regularly cleans and ensures accessibility and safety to the RTS System, as required by Vendor and dusting frequency in the premises.</span></div>
      </div>
      
      <div className="page-break"></div>

      {/* PAGE 3 */}

      <div className="pl-12 space-y-1 mb-6 text-justify">
         <div className="flex"><span className="w-10 font-bold shrink-0">(vii)</span><span className="flex-1">Vendor is entitled to permit geo-tagging of the Applicant Site as a Vendor installation site;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(viii)</span><span className="flex-1">Unless otherwise intimated by the Applicant in writing, Vendor is entitled to take photographs, videos and testimonials of the Applicant and the Applicant Site, and to create content which will become the property of Vendor and the same can be freely used by Vendor as part of its promotional and marketing activities across all platforms as it deems fit;</span></div>
         <div className="flex"><span className="w-10 font-bold shrink-0">(ix)</span><span className="flex-1">the Applicant validates the stability of the Applicant Site for the installation of the RTS System.</span></div>
      </div>

      <div className="font-bold mb-1">5. MAINTENANCE:</div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-10 font-bold shrink-0">5.1.</span><span className="flex-1">Vendor shall provide five-year free workmanship maintenance. Vendor shall visit the Applicant’s premises at least once every quarter after commissioning of the RTS System for maintenance purposes.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">5.2.</span><span className="flex-1">During such maintenance visit, Vendor shall check all nuts and bolts, fuses, earth resistance and other consumables in respect of the RTS System to ensure that it is in good working condition.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">5.3.</span><span className="flex-1">Cleaning requirement/expectation from the Applicant side &ndash; Applicant responsibility, minimum expectation from Applicant that it will be cleaned regularly as per the dusting frequency.</span></div>
      </div>

      <div className="font-bold mb-1">6. ACCESS AND RIGHT OF ENTRY:</div>
      <div className="space-y-1 text-justify mb-1">
        <div className="flex"><span className="w-10 font-bold shrink-0">6.1.</span><span className="flex-1">The Applicant hereby grants permission to Vendor and its authorized personnel, representatives, associates, officers, employees, financing agents, subcontractors (“<strong>Authorized Persons</strong>”) to enter the Applicant Site for the purposes of:</span></div>
      </div>
      <div className="pl-12 space-y-1 mb-1 text-justify">
        <div className="flex"><span className="w-10 shrink-0">(a)</span><span>conducting feasibility study;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(b)</span><span>storing the RTS System/any part thereof;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(c)</span><span>installing the RTS System;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(d)</span><span>inspecting the RTS System;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(e)</span><span>conducting repairs and maintenance to the RTS System;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(f)</span><span>removing the RTS System (or any part thereof), if necessary for any reason whatsoever;</span></div>
        <div className="flex"><span className="w-10 shrink-0">(g)</span><span>Such other matters as necessary to execute and perform its rights and obligations under this Agreement.</span></div>
      </div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-10 font-bold shrink-0">6.2.</span><span className="flex-1">The Applicant shall ensure that third-party consents necessary for the Authorized Persons to access the Applicant Site are obtained prior to commencement of services under this Agreement.</span></div>
      </div>
      
      <div className="font-bold mb-1">7. WARRANTIES:</div>
      <div className="space-y-1 text-justify mb-4">
        <div className="flex"><span className="w-10 font-bold shrink-0">7.1.</span><span className="flex-1">Product Warranty: The Applicant shall be entitled to manufacturers’ warranty. Any warranty in relation to RTS System supplied to the Applicant by Vendor under this Agreement is limited to the warranty given by the manufacturer of the RTS System (or any part thereof) to Vendor.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">7.2.</span><span className="flex-1">Installation Warranty: Vendor warrants that all installations shall be free from workmanship defects or BOS defects for a period of five years from the date of installation of the RTS System. The warranty is limited to Vendor rectifying the workmanship or BOS defects at Vendor’s expense in respect of those defects reported by the Applicant, in writing. The Applicant is obliged and liable to report such defects within 15 (fifteen) days of occurrence of such defect.</span></div>
        <div className="flex mt-4"><span className="w-10 font-bold shrink-0">7.3.</span><span className="flex-1">Subject to manufacturer warranty, Vendor warrants that the solar modules supplied herein shall have tolerance within a five percentage range (+/-5%). The peak-power point voltage and the peak-power point current of any supplied solar module and/or any module string (series connected modules) shall not vary by more than 5% (five percent) from the respective arithmetic means for all modules and/or for all module strings, as the case may be, provided</span></div>
      </div>
      
      <div className="page-break"></div>

      {/* PAGE 4 */}

      <div className="space-y-1 text-justify mb-6">
        <div className="pl-[40px]">the RTS System is properly maintained and the Applicant Site is free from shadow at the time of operation of the RTS System.</div>
        <div className="flex"><span className="w-10 font-bold shrink-0">7.4.</span><span className="flex-1">Exceptions for warranty:</span></div>
        <div className="pl-14 space-y-1 text-justify">
          <div className="flex"><span className="w-10 shrink-0">(a)</span><span className="flex-1">Any attempt by any person other than Vendor or its Authorised Persons to adjust, modify, repair or provide maintenance to the RTS System, shall disentitle the Applicant of the warranty provided by Vendor hereunder.</span></div>
          <div className="flex"><span className="w-10 shrink-0">(b)</span><span className="flex-1">Vendor shall not be liable for any degeneration or damage to the RTS System due to any action or inaction on the part of the Applicant.</span></div>
          <div className="flex"><span className="w-10 shrink-0">(c)</span><span className="flex-1">Vendor shall not be bound or liable to remedy any damage, fault, failure or malfunction of the RTS System owing to external causes, including but not limited to accidents, misuse, neglect, if usage and/or storage and/or installation are non-confirming toproduct instructions, modifications by the Applicant leading to shading or accessibility issues, failure to perform required maintenance, normal wear and tear, Force Majeure Event, or negligence or default attributable to the Applicant.</span></div>
          <div className="flex"><span className="w-10 shrink-0">(d)</span><span className="flex-1">Vendor shall not be liable to repair or remedy any accessories or parts added to the RTS System that were not originally sourced by Vendor to the Applicant.</span></div>
        </div>
      </div>

      <div className="font-bold mb-1">8. PERFORMANCE GUARANTEE</div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-10 font-bold shrink-0">8.1.</span><span className="flex-1">Vendor guarantees minimum system performance ratio of 75% as per performance ratio test carried out in adherence to IEC 61724 or equivalent BIS for a period of five years.</span></div>
      </div>
      
      <div className="font-bold mb-1">9. INSURANCE:</div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-10 font-bold shrink-0">9.1.</span><span className="flex-1">Vendor may, at its sole discretion, obtain insurance covering risks of loss/damage to the RTS System (any part thereof) during transit from Vendor’s warehouse until delivery to the Applicant Site and until installation and commissioning.</span></div>
        <div className="flex"><span className="w-10 font-bold shrink-0">9.2.</span><span className="flex-1">Thereafter, all risk shall pass on to the Applicant and the Applicant may accordingly procure relevant insurances.</span></div>
      </div>

      <div className="font-bold mb-1 flex"><span className="w-20 shrink-0">10.</span><span>CANCELLATION:</span></div>
      <div className="space-y-2 text-justify mb-6">
        <div className="flex"><span className="w-20 font-bold shrink-0">10.1.</span><span className="flex-1">The Applicant may cancel the order placed on Vendor within 7 (seven) days from the date of remittance of advance money or the date of order acceptance, whichever is earlier (“<strong>Order Confirmation</strong>”) by serving notice as per Clause 13.</span></div>
        <div className="flex"><span className="w-20 font-bold shrink-0">10.2.</span><span className="flex-1">If the Applicant cancels the order after the expiry of 7 (seven) days from the date of Order Form, the Applicant shall be liable to pay Vendor, a cancellation fee of 20% of the total order value <em>plus</em> costs and expenses incurred by Vendor, including, costs for labour, design, return of products, administrative costs, subvention costs.</span></div>
        <div className="flex mt-4"><span className="w-20 font-bold shrink-0">10.3.</span><span className="flex-1">Notwithstanding the aforesaid, the Applicant shall not be entitled to cancel the Order Form after Vendor has dispatched the RTS System (or any part thereof, including BOS) to the Applicant Site. If Applicant chooses to terminate the Order Form after dispatch, the entire amount paid by the Applicant till date, shall be forfeited by Vendor.</span></div>
      </div>

      <div className="font-bold mb-1 flex"><span className="w-20 shrink-0">11.</span><span>LIMITATION OF LIABILITY AND INDEMNITY:</span></div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex">
          <span className="w-20 font-bold shrink-0">11.1.</span>
          <span className="flex-1">
            To the extent that terms implied by law apply to the RTS System and the services rendered under this Agreement, Vendor’s liability for any breach of those terms is limited to:
            <div className="flex mt-1"><span className="w-8 shrink-0">(a)</span><span className="flex-1">repairing or replacing the RTS System/any part thereof, as applicable; or</span></div>
            <div className="flex"><span className="w-8 shrink-0">(b)</span><span className="flex-1">Refund of the moneys paid by the Applicant to Vendor, if Vendor cannot fulfil the order.</span></div>
          </span>
        </div>
      </div>
      
      <div className="font-bold mb-1 flex"><span className="w-20 shrink-0">12.</span><span>SUSPENSION AND TERMINATION:</span></div>
      <div className="space-y-1 text-justify mb-4">
        <div className="flex"><span className="w-20 font-bold shrink-0">12.1.</span><span className="flex-1">If the Applicant fails to pay any sum due under this Agreement on the due date, Vendor may, in addition to its other rights under this Agreement, suspend its obligations under this Agreement until all outstanding amounts (including interest due) are paid.</span></div>
      </div>
      
      <div className="page-break"></div>
      
      {/* PAGE 5 */}
      
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-12 font-bold shrink-0">13.</span><span className="flex-1"><strong>NOTICES:</strong> Any notice or other communication under this Agreement to Vendor and or to the Applicant, shall be in writing, in English language and shall be delivered or sent: (a) by electronic mail and/or (b) by hand delivery or registered post/courier, at the registered address of Applicant/Vendor.</span></div>
      </div>

      <div className="font-bold mb-1 flex"><span className="w-20 shrink-0">14.</span><span>FORCE MAJEURE EVENT:</span></div>
      <div className="space-y-1 text-justify mb-6">
        <div className="flex"><span className="w-20 font-bold shrink-0">14.1.</span><span className="flex-1">Neither Party shall be in default due to any delay or failure to perform its/his/her/their obligations under this Agreement which arises from or is a consequence of occurrence of an event which is beyond the reasonable control of such Party, and which makes performance of its/his/her/their obligations under this Agreement impossible or so impractical as reasonably to be considered impossible in the circumstances, and includes, but is not limited to, war, riot, civil disorder, earthquake, fire, explosion, storm, flood or other adverse weatherconditions, pandemic, epidemic, embargo, strikes, lockouts, labour difficulties, other industrial action, acts of government, unavailability of equipment from vendor, changes requested by the Applicant (“<strong>Force Majeure Event</strong>”).</span></div>
      </div>

      <div className="font-bold mb-1 flex"><span className="w-20 shrink-0">15.</span><span>GOVERNING LAW AND DISPUTE RESOLUTION:</span></div>
      <div className="space-y-1 text-justify mb-10">
        <div className="flex"><span className="w-20 font-bold shrink-0">15.1.</span><span className="flex-1">The interpretation and enforcement of this Agreement shall be governed by the laws of India</span></div>
        <div className="flex"><span className="w-20 font-bold shrink-0">15.2.</span><span className="flex-1">In the event of any dispute, controversy or difference between the Parties arising out of, or relating to this Agreement (“<strong>Dispute</strong>”), both Parties shall make an effort to resolve the Dispute in good faith, failing which, any Party to the Dispute shall be entitled to refer the Dispute to arbitration to resolve the Dispute in the manner set out in this Clause. The rights and obligations of the Parties under this Agreement shall remain in full force and effect pending the award in such arbitration proceeding.</span></div>
        <div className="flex"><span className="w-20 font-bold shrink-0">15.3.</span><span className="flex-1">The arbitration proceeding shall be governed by the provisions of the Arbitration and Conciliation Act, 1996 and shall be settled by a sole arbitrator mutually appointed by the Parties.</span></div>
      </div>
        
      <div className="mt-20 flex flex-col items-start gap-1 text-[16px]">
         <div className="font-bold mb-2">{data.name || "Shrikurshna Vasudeo Mahale"}</div>
         <div className="h-16 w-48 relative -ml-2 mb-2">
           {data.maCustomerSignature ? (
             <img src={data.maCustomerSignature} alt="Signature" className="h-full w-full object-contain object-left mix-blend-multiply" />
           ) : (
             <img src="https://api.iconify.design/mdi:signature-freehand.svg?color=%23000" alt="sign" className="w-16 h-12 opacity-70 ml-2" />
           )}
         </div>
         
         <div>1.SUMIT</div>
         <div>RAJENDRA</div>
         <div className="mb-2">BHANDARI</div>
         
         <div className="h-12 w-48 relative -ml-2 mb-2">
           {data.maWitnessSignature ? (
             <img src={data.maWitnessSignature} alt="Witness Signature" className="h-full w-full object-contain object-left mix-blend-multiply" />
           ) : (
             <img src="https://api.iconify.design/mdi:signature-freehand.svg?color=%23000" alt="sign" className="w-16 h-8 opacity-70 ml-2" />
           )}
         </div>
         
         <div>2. Pavan Gupta</div>
      </div>
    </div>
  );
};
