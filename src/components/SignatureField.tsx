import React from 'react';
import { CustomerData } from '../types';

interface Props {
  label: string;
  dataKey: keyof CustomerData;
  data: CustomerData;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  onDraw: (key: string) => void;
}

export const SignatureField: React.FC<Props> = ({ label, dataKey, data, onUpload, onDraw }) => {
  const signatureData = data[dataKey] as string | undefined;

  return (
    <div className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm mt-4">
      <h5 className="font-bold text-gray-700 mb-4">{label}</h5>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="file"
            id={`sig-input-${dataKey}`}
            accept="image/*"
            onChange={(e) => onUpload(e, dataKey)}
            className="hidden"
          />
          <button
            onClick={() => document.getElementById(`sig-input-${dataKey}`)?.click()}
            className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-md font-bold transition-all duration-300 text-gray-600"
            type="button"
          >
            {signatureData ? (
              <><span className="text-xl">🔄</span> Change Upload</>
            ) : (
              <><span className="text-xl">📁</span> Upload {label}</>
            )}
          </button>
          <button
            onClick={() => onDraw(dataKey)}
            className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-800 hover:shadow-md font-bold transition-all duration-300 text-indigo-700"
            type="button"
          >
            <span className="text-xl">✍️</span> Draw Signature
          </button>
        </div>
        {signatureData && (
          <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm h-20 w-40 flex items-center justify-center">
            <img src={signatureData} alt="Preview" className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};
