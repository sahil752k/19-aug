import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const WCR: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div className="py-2 px-24 font-times text-[13px] text-gray-900 bg-white leading-tight">
      <h2 className="text-center font-bold text-[15px] uppercase mb-1 tracking-wide">
        WORK COMPLETION REPORT FOR SOLAR POWER PLANT
      </h2>

      <table className="w-full border-collapse border border-gray-900 mb-0 font-times text-[13px]">
        <thead>
          <tr>
            <th className="border border-gray-900 py-[1px] px-2 text-center w-12 font-bold">S/n</th>
            <th className="border border-gray-900 py-[1px] px-2 text-left font-bold">Component</th>
            <th className="border border-gray-900 py-[1px] px-2 text-left font-bold w-1/2">Observation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center">1</td>
            <td className="border border-gray-900 py-[1px] px-2">Name</td>
            <td className="border border-gray-900 py-[1px] px-2 font-bold">{data.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center">2</td>
            <td className="border border-gray-900 py-[1px] px-2">Consumer number</td>
            <td className="border border-gray-900 py-[1px] px-2 font-bold">{data.consumerNumber}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center">3</td>
            <td className="border border-gray-900 py-[1px] px-2">Site/Location With Complete Address</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.address}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center">4</td>
            <td className="border border-gray-900 py-[1px] px-2">Category: Govt/Private Sector</td>
            <td className="border border-gray-900 py-[1px] px-2">Private</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center">5</td>
            <td className="border border-gray-900 py-[1px] px-2">Sanction number</td>
            <td className="border border-gray-900 py-[1px] px-2">NP-MHSED25</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center" rowSpan={2}>6</td>
            <td className="border border-gray-900 py-[1px] px-2">Sanctioned Capacity of solar PV system (KW)</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.sanctionedCapacity} Kw</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Capacity of solar PV system (KW)</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.installedCapacity} Kw</td>
          </tr>
          
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center font-bold" colSpan={3}>Specification of the Modules</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center" rowSpan={6}>7</td>
            <td className="border border-gray-900 py-[1px] px-2">Make of Module</td>
            <td className="border border-gray-900 py-[1px] px-2 uppercase">{data.moduleMake}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">ALMM Model Number</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.moduleModel}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Wattage per module</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.moduleWattage} Wp</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">No. of Module</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.numberOfModules}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Total Capacity (Kwp)</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.installedCapacity}</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Warranty Details (Product + Performance)</td>
            <td className="border border-gray-900 py-[1px] px-2">10 Years & 25 Years</td>
          </tr>

          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center font-bold" colSpan={3}>Specifications of PCU</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center" rowSpan={6}>8</td>
            <td className="border border-gray-900 py-[1px] px-2">Make & Model Number of Inverter</td>
            <td className="border border-gray-900 py-[1px] px-2 uppercase">{data.inverterMake}<br/><span className="capitalize">{data.inverterModel}</span></td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Rating</td>
            <td className="border border-gray-900 py-[1px] px-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Type of charge controller/ MPPT</td>
            <td className="border border-gray-900 py-[1px] px-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Capacity of Inverter</td>
            <td className="border border-gray-900 py-[1px] px-2">{data.inverterCapacity} Kw</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">HPD</td>
            <td className="border border-gray-900 py-[1px] px-2">-</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Year of manufacturing</td>
            <td className="border border-gray-900 py-[1px] px-2">2024</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-center" rowSpan={4}>9</td>
            <td className="border border-gray-900 py-[1px] px-2" colSpan={2}>Earthing & Protections</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">No. of Separate Earthing with earth resistance</td>
            <td className="border border-gray-900 py-[1px] px-2">3</td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2 text-justify" colSpan={2}>
              It is certified that the earth Resistance measure in presence of Licensed Electrical Contractor/Supervisor and found in order i.e. &lt;5 Ohms as per MNRE OM Dtd. 07.06.24 for
              <br/>
              CFA component.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 py-[1px] px-2">Lightening Arrester</td>
            <td className="border border-gray-900 py-[1px] px-2">Separate Earthing Provided</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-1 mb-1 text-justify text-[13px] leading-tight">
        We R.S. Bhandari Solar Energy Solutions & <strong>{data.name}</strong>
      </p>
      
      <p className="mb-0 text-justify text-[13px] leading-tight">
        bearing Consumer Number <strong>{data.consumerNumber}</strong> Ensured structural stability of installed solar power plant and obtained requisite permissions from the concerned authority. If in future, by virtue of any means due to collapsing or damage to installed solar power plant, MSEDCL will not be held responsible for any loss to property or human life, if any.<br/>
        This is to Certified above Installed Solar PV System is working properly with electrical safety & Islanding switch in case of any presence of backup inverter an arrangement should be made in such way the backup inverter supply should never be synchronized with solar inverter to avoid any electrical accident due to back feeding. We will be held responsible for non-working of islanding mechanism and back feed to the de-energized grid.
      </p>

      <div className="flex justify-between items-start mt-0 pb-0 px-2">
        <div className="font-bold pt-4 text-[13px]">
           R.S. Bhandari Solar Energy Solutions
        </div>
        <div className="text-center flex flex-col items-center">
            <div className="h-10 w-64 mb-1 flex flex-col items-center justify-end relative">
               {data.wcrCustomerSignature && (
                 <img src={data.wcrCustomerSignature} alt="Signature" className="w-28 h-10 object-contain mix-blend-multiply" />
               )}
            </div>
            <p className="font-bold text-[13px] m-0 leading-none">{data.name}</p>
            <div className="mt-0 flex justify-center w-full scale-75 origin-top">
               <Stamp />
            </div>
        </div>
      </div>

      <div className="page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}></div>

      {/* Page 2 */}
      <div className="pt-10">
        <h3 className="font-bold text-center text-lg mb-8 uppercase px-10 leading-relaxed">
          GUARANTEE CERTIFICATE UNDERTAKING TO BE SUBMITTED BY VENDOR
        </h3>

        <p className="mb-8 leading-loose text-justify text-base">
          The undersigned will provide the services to the consumers for repairs/maintenance of the RTS plant free of cost for 5 years of the comprehensive Maintenance Contract (CMC) period from the date of commissioning of the plant. Non performing/under-performing system component will be replaced/repaired free of cost in the CMC period
        </p>

        <div className="mb-8 w-48">
            <Stamp />
        </div>

        <p className="font-bold text-base mb-6">For R.S. Bhandari Solar Energy Solutions</p>

        <p className="mb-4">Identity Details of Consumer: -</p>
        
        <p className="mb-6">Aadhar Number: <strong>{data.aadhaarNumber}</strong></p>
        
        <p className="mb-6">Aadhar Card Xerox Copy – Self Attested by Consumer</p>

        <div className="w-[450px] min-h-[300px] border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center my-8 rounded-lg overflow-hidden">
           {data.aadhaarImage ? (
             <img src={data.aadhaarImage} alt="Aadhaar Document" className="max-w-full max-h-full object-contain mix-blend-multiply" />
           ) : (
             <span className="text-gray-400">No Image Uploaded</span>
           )}
        </div>
      </div>
    </div>
  );
};
