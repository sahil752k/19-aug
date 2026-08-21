import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../utils/cropImage';

interface Props {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export const SignatureCropper: React.FC<Props> = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<PercentCrop | null>(null);

  const handleSave = async () => {
    if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, completedCrop);
        onCropComplete(croppedImage);
      } catch (e) {
        console.error(e);
      }
    } else {
        // If they didn't crop anything, just return the whole image or cancel
        onCropComplete(imageSrc);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
        <h3 className="text-xl font-bold mb-4">Crop Signature</h3>
        
        <div className="flex-1 overflow-auto bg-gray-100 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(_, percentCrop) => setCompletedCrop(percentCrop)}
          >
            <img 
                src={imageSrc} 
                alt="Crop me" 
                className="max-h-[60vh] max-w-full object-contain" 
            />
          </ReactCrop>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">Draw a box around the signature to crop it.</p>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/30"
            >
              Crop & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
