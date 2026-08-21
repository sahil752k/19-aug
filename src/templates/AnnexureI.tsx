import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Stamp } from './shared';

export const AnnexureI: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div className="p-8 font-times text-sm text-gray-900 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-300 pb-2 mb-4">
        <div className="w-48 shrink-0">
          <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/mahavitran%20logo.png" alt="Mahavitaran Logo" className="max-w-[160px] h-auto object-contain mix-blend-multiply" />
        </div>
        <div className="text-center flex-1 pr-16 border-r border-gray-300 ml-4">
          <h1 className="font-bold text-lg uppercase">Maharashtra State Electricity Distribution Company Limited</h1>
          <h2 className="text-blue-600 font-bold text-lg mt-1">Renewable Energy Generating System</h2>
          <h3 className="font-bold text-md mt-1">Annexure-I</h3>
          <p className="text-sm">(Commissioning Report for RE System)</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-1.5 px-2 text-center w-16">S/N</th>
            <th className="border border-gray-300 py-1.5 px-2 text-left">Particulars</th>
            <th className="border border-gray-300 py-1.5 px-2 text-left">as Commissioned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center"></td>
            <td className="border border-gray-300 py-1.5 px-2 font-medium">Name of Consume</td>
            <td className="border border-gray-300 py-1.5 px-2 font-bold uppercase">{data.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">1</td>
            <td className="border border-gray-300 py-1.5 px-2">Consumer Number</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.consumerNumber}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">2</td>
            <td className="border border-gray-300 py-1.5 px-2">Mobile Number</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.mobileNumber}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">3</td>
            <td className="border border-gray-300 py-1.5 px-2">Email Id</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.emailId}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">4</td>
            <td className="border border-gray-300 py-1.5 px-2">Address of Installation</td>
            <td className="border border-gray-300 py-1.5 px-2 font-medium">{data.address}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">5</td>
            <td className="border border-gray-300 py-1.5 px-2">RE Arrangement Type</td>
            <td className="border border-gray-300 py-1.5 px-2">Net Metering Arrangement</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">6</td>
            <td className="border border-gray-300 py-1.5 px-2">RE Source</td>
            <td className="border border-gray-300 py-1.5 px-2">Solar</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">7</td>
            <td className="border border-gray-300 py-1.5 px-2">Sanctioned Capacity (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.sanctionedCapacity}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">8</td>
            <td className="border border-gray-300 py-1.5 px-2">Capacity Type</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.setupType}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">9</td>
            <td className="border border-gray-300 py-1.5 px-2">Project Model</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.projectModel}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">10</td>
            <td className="border border-gray-300 py-1.5 px-2">RE Installed Capacity (Rooftop) (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.installedCapacity}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">11</td>
            <td className="border border-gray-300 py-1.5 px-2">RE Installed Capacity (Rooftop + Ground) (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">NA</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">12</td>
            <td className="border border-gray-300 py-1.5 px-2">RE Installed Capacity (Ground) (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">NA</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center">13</td>
            <td className="border border-gray-300 py-1.5 px-2">Installation Date</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.installationDate}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center">14</td>
            <td className="border border-gray-300 py-1.5 px-2">Solar PV Details</td>
            <td className="border border-gray-300 py-1.5 px-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center"></td>
            <td className="border border-gray-300 py-1.5 px-2">Inverter Capacity (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.inverterCapacity}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center"></td>
            <td className="border border-gray-300 py-1.5 px-2">Inverter Make</td>
            <td className="border border-gray-300 py-1.5 px-2 font-medium uppercase">{data.inverterMake}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-1.5 px-2 text-center"></td>
            <td className="border border-gray-300 py-1.5 px-2">No. of PV Modules</td>
            <td className="border border-gray-300 py-1.5 px-2">{data.numberOfModules}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 py-1.5 px-2 text-center"></td>
            <td className="border border-gray-300 py-1.5 px-2">Module Capacity (Kw)</td>
            <td className="border border-gray-300 py-1.5 px-2">{(data.moduleWattage / 1000).toFixed(3)}</td>
          </tr>
        </tbody>
      </table>

      {/* Signatures */}
      <div className="grid grid-cols-2 mt-8 break-inside-avoid">
        <div className="text-center flex flex-col items-center justify-end h-40">
          <div className="h-28 flex items-end justify-center border-b border-gray-400 w-64 mx-auto pb-1 mb-3">
            {data.a1CustomerSignature ? (
              <img src={data.a1CustomerSignature} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply" />
            ) : (
              <span className="text-gray-400 text-sm italic font-signature mb-2">(Signature)</span>
            )}
          </div>
          <p className="font-bold uppercase bg-gray-100 py-1 inline-block px-4">{data.name}</p>
        </div>
        <div className="text-center flex flex-col items-center justify-end h-40">
          <div className="h-28 flex items-end justify-center border-b border-gray-400 w-64 mx-auto pb-1 mb-3">
            <Stamp />
          </div>
          <p className="font-bold uppercase py-1 inline-block px-4">R.S. Bhandari Solar Energy Solutions</p>
        </div>
      </div>

      <div className="page-break" style={{ pageBreakBefore: 'always', breakBefore: 'page' }}></div>

      {/* Proforma A */}
      <div className="pt-8 mt-4">
        <h3 className="font-bold text-center text-lg mb-6">Proforma-A</h3>
        <h4 className="font-bold text-center mb-10 leading-relaxed text-gray-800 px-10">
          COMMISSIONING REPORT (PROVISIONAL) FOR GRID CONNECTED SOLAR PHOTOVOLTAIC POWER PLANT (with Net-metering facility)
        </h4>

        <p className="mb-6 leading-loose text-justify">
          Certified that a Grid Connected SPV Power Plant of <strong>{data.installedCapacity} kWp</strong> capacity has been installed at the site <strong className="uppercase bg-gray-100 px-2 underline">{data.name}</strong>, <strong>{data.address}</strong> which has been installed by M/S R.S. Bhandari Solar Energy Solutions on <strong>{data.installationDate}</strong>. The system is as per BIS/MNRE specifications. The system has been checked for its performance and found in order for further commissioning.
        </p>

        <div className="flex justify-end mt-10 mb-16">
          <div className="text-center flex flex-col items-center">
            <Stamp />
            <p className="font-bold mt-4">R.S. Bhandari Solar Energy Solutions</p>
          </div>
        </div>

        <p className="mb-10 leading-loose text-justify">
          The above RTS installation has been inspected by me for Pre-Commissioning Testing of Roof Top Solar Connection on dt {data.installationDate}. as per guidelines issued by the office of The Chief Engineer vide letter no 21653 on dt.{data.installationDate} and found in order for commissioning.
        </p>

        <div className="flex justify-start mt-10 break-inside-avoid">
          <div className="text-left flex flex-col items-start gap-10">
            <Stamp />
            <div>
              <p className="font-bold">Signature of the MSEDCL Officer</p>
              <p className="font-bold mt-2">(Name, Designation, Date and seal)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
