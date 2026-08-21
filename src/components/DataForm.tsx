import React, { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { SignatureCropper } from './SignatureCropper';

interface Props {
  onNext: () => void;
}

export const DataForm: React.FC<Props> = ({ onNext }) => {
  const { data, setData, saveDraft, createNew, resetProposalData } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<string>('Master Form');
  const [cropImage, setCropImage] = useState<{ src: string; type: 'customer' | 'vendor' | 'witness' } | null>(null);

  const tabs = [
    'Master Form',
    'Draft Info',
    'Proposal',
    'Model Agreement',
    'Annexure I',
    'Annexure 3',
    'WCR',
    'Invoice',
    'Receipt',
    'Signature'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;

    setData((prev) => {
      const updated = {
        ...prev,
        [name]: parsedValue,
      };

      // Auto calculate Monthly & Yearly Generation when Daily Generation is entered
      if (name === 'dailyGeneration') {
        const dailyVal = parseFloat(String(value).replace(/[^0-9.]/g, ''));
        if (!isNaN(dailyVal) && dailyVal > 0) {
          updated.monthlyGeneration = Math.round(dailyVal * 30).toString();
          updated.yearlyGeneration = Math.round(dailyVal * 365).toString();
        } else if (value === '') {
          updated.monthlyGeneration = '';
          updated.yearlyGeneration = '';
        }
      }

      // Auto calculate 5yr, 10yr, 25yr Savings when 1 Year Savings is entered
      if (name === 'savings1Year') {
        const sav1Val = parseFloat(String(value).replace(/[^0-9.]/g, ''));
        if (!isNaN(sav1Val) && sav1Val > 0) {
          updated.savings5Years = Math.round(sav1Val * 5).toLocaleString('en-IN');
          updated.savings10Years = Math.round(sav1Val * 10).toLocaleString('en-IN');
          updated.savings25Years = Math.round(sav1Val * 25).toLocaleString('en-IN');
        } else if (value === '') {
          updated.savings5Years = '';
          updated.savings10Years = '';
          updated.savings25Years = '';
        }
      }

      return updated;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, aadhaarImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'customer' | 'vendor' | 'witness') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImage({ src: reader.result as string, type });
        // Clear the input value so the same file can be selected again
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    if (cropImage) {
      const field = cropImage.type === 'customer' ? 'customerSignature' : cropImage.type === 'vendor' ? 'vendorSignature' : 'witnessSignature';
      setData((prev) => ({ ...prev, [field]: croppedImage }));
      setCropImage(null);
    }
  };

  const handleCropCancel = () => {
    setCropImage(null);
  };

  const renderField = (label: string, name: string, type: string = 'text', placeholder: string = '', index: number = 0) => {
    const val = (data as any)[name];
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-transparent rounded-xl transition-all duration-500 pointer-events-none -m-2 p-2 z-0"></div>
        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide group-hover:text-yellow-600 transition-colors relative z-10">{label}</label>
        <input 
          type={type} 
          name={name} 
          value={val === 0 ? 0 : (val || '')} 
          onChange={handleChange} 
          onWheel={(e) => (type === 'number' ? e.currentTarget.blur() : undefined)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 focus:bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 shadow-sm relative z-10 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
        />
      </motion.div>
    );
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setData((prev) => {
      const newItems = [...(prev.invoiceItems || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, invoiceItems: newItems };
    });
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      invoiceItems: [
        ...(prev.invoiceItems || []), 
        { id: Date.now().toString(), description: '', qty: '' as unknown as number, rate: '' as unknown as number, tax: '' as unknown as number }
      ]
    }));
  };

  const removeItem = (index: number) => {
    setData((prev) => {
       const newItems = [...(prev.invoiceItems || [])];
       newItems.splice(index, 1);
       return { ...prev, invoiceItems: newItems };
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 max-w-[1400px] w-full mx-auto font-sans"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white gap-6 relative overflow-visible"
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#1e2a4a] to-gray-800 tracking-tight drop-shadow-sm">Data Entry</h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500 rounded-full inline-block"></span>
            Enter project details per document type
          </p>
        </div>
        <div className="flex flex-wrap gap-3 relative z-10">
          <button onClick={() => createNew()} className="px-5 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 hover:bg-red-600 hover:text-white font-semibold whitespace-nowrap transition-all duration-300 shadow-[0_4px_14px_0_rgb(239,68,68,0.1)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] hover:-translate-y-1">
            Reset Data
          </button>
          <button onClick={saveDraft} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-semibold whitespace-nowrap transition-all duration-300 shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1">
            Save Draft
          </button>
          <button onClick={onNext} className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-gray-900 font-bold whitespace-nowrap transition-all duration-300 shadow-[0_4px_14px_0_rgb(234,179,8,0.39)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.4)] hover:-translate-y-1 group flex items-center gap-2 border border-yellow-300/50">
            Preview Docs <span className="group-hover:translate-x-1 transition-transform inline-block">➜</span>
          </button>
        </div>
        
        {/* Subtle decorative background blob */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-300/40 to-yellow-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-gradient-to-br from-blue-100/40 to-indigo-100/20 rounded-full blur-3xl pointer-events-none"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-72 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 shrink-0 custom-scrollbar"
        >
          {tabs.map((tab, idx) => (
            <motion.button
              whileHover={{ scale: 1.02, x: window.innerWidth >= 1024 ? 4 : 0, y: window.innerWidth < 1024 ? -2 : 0 }}
              whileTap={{ scale: 0.98 }}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 text-center lg:text-left px-6 py-4 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden group border ${
                activeTab === tab
                  ? 'text-gray-900 bg-white shadow-xl shadow-yellow-500/5 border-yellow-200 ring-1 ring-yellow-500/10'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/80 bg-white/40 border-gray-100 shadow-sm'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent transform origin-left transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-50'}`}></div>
              {activeTab === tab && <motion.div layoutId="activeTabIndicator" className="absolute left-0 lg:left-0 lg:bottom-0 lg:top-0 bottom-0 top-auto w-full lg:w-1.5 h-1 lg:h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></motion.div>}
              <span className={`relative z-10 transition-transform duration-300 inline-block ${activeTab === tab ? 'lg:translate-x-1' : ''}`}>{tab}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          layout
          className="flex-1 bg-white/90 backdrop-blur-2xl p-6 lg:p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white ring-1 ring-gray-900/5 relative min-h-[600px] overflow-visible"
        >
          <AnimatePresence mode="wait">
          {activeTab === 'Master Form' && (
            <motion.div 
              key="masterForm"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 h-[75vh] overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur pt-2 pb-8 -mx-2 px-2">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/50 flex items-center justify-center shadow-inner shrink-0">
                    <span className="text-indigo-500 font-bold text-2xl drop-shadow-sm">⭐</span>
                  </div>
                  <div>
                      <h3 className="text-3xl font-black text-gray-800 tracking-tight">Master Form</h3>
                      <p className="text-gray-500 text-sm font-medium mt-1">Fill this once, and all documents will be generated automatically.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 pb-10">
                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span> Customer & General Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Draft / Project Name', 'draftName', 'text', 'e.g. Sahil Home 3kW', 0)}
                      {renderField('Customer Name', 'name', 'text', '', 1)}
                      {renderField('Mobile number', 'mobileNumber', 'text', '', 2)}
                      {renderField('Email ID', 'emailId', 'text', '', 3)}
                      {renderField('Installation Address', 'address', 'text', '', 4)}
                      {renderField('Consumer Number', 'consumerNumber', 'text', '', 5)}
                      {renderField('Aadhar Number', 'aadhaarNumber', 'text', '', 6)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span> Project Specifications</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Proposal Type', 'proposalType', 'text', '', 0)}
                      {renderField('Project Type', 'projectType', 'text', '', 1)}
                      {renderField('Sanctioned Capacity (KW)', 'sanctionedCapacity', 'number', '', 2)}
                      {renderField('Installed Capacity (KW)', 'installedCapacity', 'number', '', 3)}
                      {renderField('Area Available', 'areaAvailable', 'text', '', 4)}
                      {renderField('Contract Load', 'contractLoad', 'text', '', 5)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span> Hardware (Modules & Inverter)</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                      {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                      {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                      {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                      {renderField('Module Type / Specs', 'moduleType', 'text', '', 4)}
                      {renderField('Module Warranty', 'moduleWarranty', 'text', '', 5)}
                      
                      {renderField('Make of Inverter', 'inverterMake', 'text', '', 6)}
                      {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 7)}
                      {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 8)}
                      {renderField('Inverter Quantity', 'inverterQuantity', 'number', '', 9)}
                      {renderField('Inverter Phases', 'inverterPhases', 'number', '', 10)}
                      {renderField('Inverter Warranty', 'inverterWarranty', 'text', '', 11)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span> Technical Specs & Generation</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Structure Type', 'structure', 'text', '', 0)}
                      {renderField('Earthing', 'earthing', 'text', '', 1)}
                      {renderField('AC / DC Cables', 'acDcCables', 'text', '', 2)}
                      {renderField('AC / DC Protection', 'acDcProtection', 'text', '', 3)}
                      {renderField('Net Metering', 'netMetering', 'text', '', 4)}
                      
                      {renderField('Daily Generation (Units)', 'dailyGeneration', 'text', '', 5)}
                      {renderField('Monthly Generation (Units)', 'monthlyGeneration', 'text', '', 6)}
                      {renderField('Yearly Generation (Units)', 'yearlyGeneration', 'text', '', 7)}
                      {renderField('Savings 1 Year (₹)', 'savings1Year', 'text', '', 8)}
                      {renderField('Savings 5 Years (₹)', 'savings5Years', 'text', '', 9)}
                      {renderField('Savings 10 Years (₹)', 'savings10Years', 'text', '', 10)}
                      {renderField('Savings 25 Years (₹)', 'savings25Years', 'text', '', 11)}
                      {renderField('Payback Period', 'paybackPeriod', 'text', '', 12)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">5</span> Cost & Payments</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Total System Cost (₹)', 'totalCost', 'number', '', 0)}
                      {renderField('Cost of RTS System (₹)', 'rtsSystemCost', 'number', '', 1)}
                      {renderField('Subsidy Amount (₹)', 'subsidyAmount', 'number', '', 2)}
                      {renderField('Customer Investment (₹)', 'customerInvestment', 'number', '', 3)}
                      {renderField('AMC Cost (₹)', 'amcCost', 'number', '', 4)}
                      
                      {renderField('Advance (%)', 'paymentAdvance', 'number', '', 5)}
                      {renderField('On Delivery (%)', 'paymentDelivery', 'number', '', 6)}
                      {renderField('On Installation (%)', 'paymentInstallation', 'number', '', 7)}
                      {renderField('On Commissioning (%)', 'paymentCommissioning', 'number', '', 8)}
                   </div>
                </div>

                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">6</span> Key Dates</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Proposal Date', 'proposalDate', 'date', '', 0)}
                      {renderField('Quote Validity (Days)', 'quoteValidity', 'text', '', 1)}
                      {renderField('Agreement Date', 'agreementDate', 'date', '', 2)}
                      {renderField('Installation Date', 'installationDate', 'date', '', 3)}
                   </div>
                </div>
                <div className="bg-gray-50/70 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">7</span> Invoice Details</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('Invoice Number', 'invoiceNo', 'text', '', 0)}
                      {renderField('Invoice Date', 'invoiceDate', 'date', '', 1)}
                      {renderField('Solar Panel Price (₹)', 'solarPanelPrice', 'number', '', 2)}
                      {renderField('Inverter Price (₹)', 'inverterPrice', 'number', '', 3)}
                      {renderField('CGST (%)', 'cgst', 'number', '', 4)}
                      {renderField('SGST (%)', 'sgst', 'number', '', 5)}
                   </div>
                </div>

                <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-5 mb-8 mt-16 bg-gray-50/50 p-4 rounded-r-xl">
                  <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg text-xl shadow-sm">📦</span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Product Line Items</h3>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                  {(data.invoiceItems || []).map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white border border-gray-100 shadow-xl shadow-gray-200/30 p-6 sm:p-8 rounded-[2rem] flex flex-wrap xl:flex-nowrap gap-6 items-end relative group hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute top-6 left-6 font-black text-5xl text-gray-50 opacity-50 z-0 pointer-events-none transition-transform group-hover:scale-110">0{index + 1}</div>
                      <div className="flex-1 min-w-[250px] relative z-10 w-full">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">🔧 Description</label>
                        <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-32 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📦 Qty</label>
                        <input type="number" value={item.qty === 0 ? 0 : (item.qty || '')} onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-48 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">💰 Rate (₹)</label>
                        <input type="number" value={item.rate === 0 ? 0 : (item.rate || '')} onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-36 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📊 Tax %</label>
                        <input type="number" value={item.tax === 0 ? 0 : (item.tax || '')} onChange={(e) => handleItemChange(index, 'tax', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <button onClick={() => removeItem(index)} className="absolute -top-4 -right-4 bg-white border border-red-200 shadow-lg text-red-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 font-bold text-xl z-20">
                        ×
                      </button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>

                <motion.button whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.2)" }} whileTap={{ scale: 0.98 }} onClick={addItem} className="w-full py-5 mt-8 bg-[#00b46b] text-white rounded-[1rem] hover:bg-[#009b5a] transition-colors shadow-lg shadow-green-500/30 font-bold text-[15px] flex items-center justify-center gap-2 group border border-[#009b5a]">
                     <span className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors text-xl leading-none w-7 h-7 flex items-center justify-center">＋</span>
                     Add Another Item
                </motion.button>


              </div>
            </motion.div>
          )}

          {activeTab === 'Draft Info' && (
            <motion.div 
              key="draftInfo"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 border-b border-gray-100 pb-5 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 flex items-center justify-center shadow-inner">
                  <span className="text-blue-500 font-bold text-2xl drop-shadow-sm">ℹ️</span>
                </div>
                <h3 className="text-3xl font-black text-gray-800 tracking-tight">Draft Project Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderField('Draft / Project Name', 'draftName', 'text', 'e.g. Sahil Home 3kW', 0)}

              </div>
            </motion.div>
          )}

          {activeTab === 'Proposal' && (
             <motion.div 
               key="proposal"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-8"
             >
               <div className="flex flex-wrap gap-4 justify-between items-center pb-5 mb-2 border-b border-gray-100">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50 flex items-center justify-center shadow-inner">
                     <span className="text-[#e27d28] font-bold text-2xl drop-shadow-sm">📑</span>
                   </div>
                   <div>
                     <h3 className="text-3xl font-black text-gray-800 tracking-tight">Solar Proposal Data</h3>
                     <p className="text-gray-500 text-sm font-medium mt-1">Section headings match exactly with the 9-Page Proposal PDF document.</p>
                   </div>
                 </div>
                 <button type="button" onClick={() => resetProposalData()} className="px-4 py-2.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl font-bold transition-all shadow-sm text-sm hover:bg-yellow-500 hover:text-white hover:border-yellow-500 hover:-translate-y-0.5 hover:shadow-yellow-500/20">
                   Reset Section
                 </button>
               </div>
               
               {/* 1. Page 1: Cover Page */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold shadow-sm">1</span> 
                      PAGE 1: COVER PAGE & PREPARED FOR
                   </h4>
                   <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold px-3 py-1 rounded-full text-xs">Page 1</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Customer Name (Prepared For)', 'name', 'text', 'e.g. Sahil Kapse', 0)}
                    {renderField('Address / Location', 'address', 'text', 'e.g. Washim - 444 505', 1)}
                    {renderField('System Capacity (kW)', 'installedCapacity', 'number', 'e.g. 3', 2)}
                    {renderField('Proposal Type', 'proposalType', 'text', 'e.g. On-Grid Rooftop Solar', 3)}
                    {renderField('Proposal Date', 'proposalDate', 'date', '', 4)}
                 </div>
               </div>

               {/* 2A. Page 3: Design Inputs */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold shadow-sm">3A</span> 
                      PAGE 3: DESIGN INPUTS
                   </h4>
                   <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold px-3 py-1 rounded-full text-xs">Page 3 (Left Card)</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Project Type', 'projectType', 'text', 'e.g. Residential Rooftop / Commercial', 0)}
                    {renderField('Area Available', 'areaAvailable', 'text', 'e.g. 890 Sq.Ft', 1)}
                    {renderField('Load / Contract Load', 'contractLoad', 'text', 'e.g. 3 KW / 890 KW', 2)}
                    {renderField('System Capacity (kW) for Note', 'installedCapacity', 'number', 'e.g. 78', 3)}
                 </div>
                 <div className="mt-4 p-3 bg-orange-50/70 border border-orange-100 rounded-xl text-xs text-gray-600 italic">
                    <span className="font-bold text-[#e27d28]">Note Output Preview:</span> {data.installedCapacity || 0} KW requirement of empty shadow free flat space will be approx {data.areaAvailable || '...'}.
                 </div>
               </div>

               {/* 2B. Page 3: System Summary (A quick overview of system project and price) */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#39a0c6] text-white flex items-center justify-center text-xs font-bold shadow-sm">3B</span> 
                      PAGE 3: SYSTEM SUMMARY (A quick overview of system project and price)
                   </h4>
                   <span className="bg-[#39a0c6]/10 text-[#39a0c6] font-bold px-3 py-1 rounded-full text-xs">Page 3 (Right Card)</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Product Classification', 'proposalType', 'text', 'e.g. Commercial / On-Grid Solar', 0)}
                    {renderField('System Size (kW)', 'installedCapacity', 'number', 'e.g. 78', 1)}
                    {renderField('Solar Module Wattage (Wp)', 'moduleWattage', 'number', 'e.g. 540', 2)}
                    {renderField('Solar Module Quantity (Nos)', 'numberOfModules', 'number', 'e.g. 6', 3)}
                    {renderField('Inverter Capacity (kW)', 'inverterCapacity', 'number', 'e.g. 3', 4)}
                    {renderField('Inverter Phase', 'inverterPhases', 'number', 'e.g. 23 or 3', 5)}
                    {renderField('Earthing', 'earthing', 'text', 'e.g. 3 / Chemical Earthing', 6)}
                    {renderField('AC/DC Cables', 'acDcCables', 'text', 'e.g. 98 / Polycab Solar', 7)}
                    {renderField('Subsidy (₹)', 'subsidyAmount', 'number', 'e.g. 879 / 78000', 8)}
                    {renderField('Total Price / Cost (₹)', 'totalCost', 'number', 'e.g. 449121 / 210000', 9)}
                    {renderField('Quote Validity (Days)', 'quoteValidity', 'text', 'e.g. 90 / 7 Days', 10)}
                    {renderField('Proposal Date', 'proposalDate', 'date', '', 11)}
                 </div>
               </div>

               {/* 3. Page 4: Technical Proposal - Solar PV Module Details */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#e27d28] text-white flex items-center justify-center text-xs font-bold shadow-sm">4A</span> 
                      PAGE 4: SOLAR PV MODULE DETAILS
                   </h4>
                   <span className="bg-[#e27d28]/10 text-[#e27d28] font-bold px-3 py-1 rounded-full text-xs">Page 4</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Manufacturer (Module Make)', 'moduleMake', 'text', 'e.g. Waaree / Vikram', 0)}
                    {renderField('Wattage of Each Module (Wp)', 'moduleWattage', 'number', 'e.g. 540', 1)}
                    {renderField('No. of Modules (Quantity)', 'numberOfModules', 'number', 'e.g. 6', 2)}
                    {renderField('Module Type / Specification', 'moduleType', 'text', 'e.g. Mono Perc Half Cut DCR', 3)}
                    {renderField('Module Warranty', 'moduleWarranty', 'text', 'e.g. 10 Years Product / 25 Years Performance', 4)}
                 </div>
               </div>

               {/* 4. Page 4: Technical Proposal - Inverter Details */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#e27d28] text-white flex items-center justify-center text-xs font-bold shadow-sm">4B</span> 
                      PAGE 4: INVERTER DETAILS
                   </h4>
                   <span className="bg-[#e27d28]/10 text-[#e27d28] font-bold px-3 py-1 rounded-full text-xs">Page 4</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Manufacturer (Inverter Make)', 'inverterMake', 'text', 'e.g. Growatt / Solis', 0)}
                    {renderField('Rating KW Per Inverter (Capacity)', 'inverterCapacity', 'number', 'e.g. 3', 1)}
                    {renderField('Inverter Quantity (Nos)', 'inverterQuantity', 'number', 'e.g. 1', 2)}
                    {renderField('No. of Phases', 'inverterPhases', 'number', 'e.g. 1 or 3', 3)}
                    {renderField('Inverter Warranty', 'inverterWarranty', 'text', 'e.g. 5 Years', 4)}
                 </div>
               </div>

               {/* 5. Page 4: Technical Proposal - Balance of System */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#e27d28] text-white flex items-center justify-center text-xs font-bold shadow-sm">4C</span> 
                      PAGE 4: BALANCE OF SYSTEM (BOS)
                   </h4>
                   <span className="bg-[#e27d28]/10 text-[#e27d28] font-bold px-3 py-1 rounded-full text-xs">Page 4</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Mounting Structure', 'structure', 'text', 'e.g. Hot Dip GI (3x3/2x2)', 0)}
                    {renderField('Earthing', 'earthing', 'text', 'e.g. Chemical Earthing Copper Bonded', 1)}
                    {renderField('AC / DC Cables', 'acDcCables', 'text', 'e.g. Polycab / Havells Solar Cables', 2)}
                    {renderField('AC / DC Protection', 'acDcProtection', 'text', 'e.g. IP65 SPD + MCB Box', 3)}
                    {renderField('Net Metering', 'netMetering', 'text', 'e.g. Bidirectional Net Metering', 4)}
                 </div>
               </div>

               {/* 6. Page 5: Financial Benefits */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-green-700 uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">5</span> 
                      PAGE 5: FINANCIAL BENEFITS & GENERATION
                   </h4>
                   <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">Page 5</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Daily Expected Generation (Units)', 'dailyGeneration', 'text', 'e.g. 12', 0)}
                    {renderField('Monthly Expected Generation (Units)', 'monthlyGeneration', 'text', 'e.g. 360', 1)}
                    {renderField('Yearly Expected Generation (Units)', 'yearlyGeneration', 'text', 'e.g. 4380', 2)}
                    {renderField('Return on Investment / Payback Period', 'paybackPeriod', 'text', 'e.g. 3.5 Years', 3)}
                    {renderField('Estimated Savings 1 Year (₹)', 'savings1Year', 'text', 'e.g. 35,000', 4)}
                    {renderField('Estimated Savings 5 Years (₹)', 'savings5Years', 'text', 'e.g. 1,75,000', 5)}
                    {renderField('Estimated Savings 10 Years (₹)', 'savings10Years', 'text', 'e.g. 3,50,000', 6)}
                    {renderField('Estimated Savings 25 Years (₹)', 'savings25Years', 'text', 'e.g. 8,75,000', 7)}
                 </div>
               </div>

               {/* 7. Page 6: Price Quotation */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold shadow-sm">6</span> 
                      PAGE 6: PRICE QUOTATION & PROJECT COST SUMMARY
                   </h4>
                   <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold px-3 py-1 rounded-full text-xs">Page 6</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Total System Cost (₹)', 'totalCost', 'number', 'e.g. 210000', 0)}
                    {renderField('Less: Government Subsidy (₹)', 'subsidyAmount', 'number', 'e.g. 78000', 1)}
                    {renderField('Customer Investment / Net Price (₹)', 'customerInvestment', 'number', 'e.g. 132000', 2)}
                 </div>
               </div>

               {/* 8. Page 7: Terms & Conditions - Payment Terms */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold shadow-sm">7</span> 
                      PAGE 7: PAYMENT TERMS & KEY POINTS
                   </h4>
                   <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold px-3 py-1 rounded-full text-xs">Page 7</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-8">
                    {renderField('Purchase Order Advance (%)', 'paymentAdvance', 'number', 'e.g. 70', 0)}
                    {renderField('On Material Supply / Delivery (%)', 'paymentDelivery', 'number', 'e.g. 20', 1)}
                    {renderField('On Installation (%)', 'paymentInstallation', 'number', 'e.g. 5', 2)}
                    {renderField('On Commissioning (%)', 'paymentCommissioning', 'number', 'e.g. 5', 3)}
                    {renderField('AMC Contract Cost (₹/Year)', 'amcCost', 'number', 'e.g. 3500', 4)}
                 </div>
               </div>

               {/* 9. Page 9: Acceptance */}
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <div className="flex justify-between items-center mb-6">
                   <h4 className="text-xs tracking-[0.2em] font-black text-[#1e3a5f] uppercase flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold shadow-sm">9</span> 
                      PAGE 9: ACCEPTANCE & SIGNATURE
                   </h4>
                   <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] font-bold px-3 py-1 rounded-full text-xs">Page 9</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Customer Signature</label>
                      <div className="flex items-center gap-4">
                        <label className="px-5 py-3 bg-[#1e3a5f] text-white rounded-xl font-bold cursor-pointer hover:bg-[#2a4d7d] transition-colors shadow-sm text-sm flex items-center gap-2">
                          <span>✍️ Upload / Draw Signature</span>
                          <input type="file" accept="image/*" onChange={(e) => handleSignatureUpload(e, 'customer')} className="hidden" />
                        </label>
                        {data.customerSignature && (
                          <div className="h-12 w-28 bg-white border border-gray-300 rounded-lg p-1 flex items-center justify-center shadow-inner">
                            <img src={data.customerSignature} alt="Signature" className="max-h-full object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                 </div>
               </div>

             </motion.div>
          )}

          {activeTab === 'Model Agreement' && (
            <motion.div 
               key="modelAgreement"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-purple-600 font-bold text-2xl drop-shadow-sm">📜</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Model Agreement Data</h3>
               </div>
              
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200"><div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div></span> 
                    CUSTOMER DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Name', 'name', 'text', '', 0)}
                  {renderField('Consumer number', 'consumerNumber', 'text', '', 1)}
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200"><div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div></span> 
                    CAPACITIES & DATES
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Agreement Date', 'agreementDate', 'date', '', 3)}
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200"><div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div></span> 
                    COSTS & COMMERCIALS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Cost of RTS System', 'rtsSystemCost', 'number', '', 1)}
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'Annexure I' && (
            <motion.div 
               key="annexureI"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-emerald-600 font-bold text-2xl drop-shadow-sm">📄</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Annexure I Data</h3>
               </div>
              
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    CUSTOMER DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                  {renderField('Name', 'name', 'text', '', 0)}
                  {renderField('Consumer number', 'consumerNumber', 'text', '', 1)}
                  <div className="md:col-span-2">
                     {renderField('Installation Address', 'address', 'text', '', 2)}
                  </div>
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SYSTEM SETUP
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                  {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                  {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                  {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                  
                  {renderField('Make of Inverter', 'inverterMake', 'text', '', 4)}
                  {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 5)}
                  {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 6)}
                  {renderField('Structure Type', 'structure', 'text', '', 7)}
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'Annexure 3' && (
            <motion.div 
               key="annexure3"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-blue-600 font-bold text-2xl drop-shadow-sm">📘</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Annexure 3 Data</h3>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200"><div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div></span> 
                    CUSTOMER DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address', 'address', 'text', '', 1)}
                    {renderField('Consumer Number', 'consumerNumber', 'text', '', 2)}
                    {renderField('Agreement Date', 'installationDate', 'date', '', 3)}
                    {renderField('Installed Capacity (kW)', 'installedCapacity', 'number', '', 4)}
                  </div>
  
              </div>
            </motion.div>
          )}
          {activeTab === 'WCR' && (
            <motion.div 
               key="wcr"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-rose-600 font-bold text-2xl drop-shadow-sm">🏠</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">WCR (Work Completion) Data</h3>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    CUSTOMER INFO
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Consumer number', 'consumerNumber', 'text', '', 1)}
                    {renderField('Site/Location With Complete Address', 'address', 'text', '', 2)}
                    {renderField('Email ID', 'emailId', 'text', '', 3)}
                    {renderField('Mobile number', 'mobileNumber', 'text', '', 4)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    KYC
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end gap-y-10">
                    {renderField('Aadhar Number', 'aadhaarNumber', 'text', '', 0)}
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="group"
                    >
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide group-hover:text-yellow-600 transition-colors">Aadhaar Image (PNG/JPG)</label>
                      <div className="flex items-center gap-4 mt-2">
                        <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-700 hover:shadow-md font-bold transition-all duration-300 text-gray-600">
                          {data.aadhaarImage ? <><span className="text-xl">🔄</span> Change File</> : <><span className="text-xl">📎</span> Drop Image Here</>}
                        </button>
                        {data.aadhaarImage && <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] inline-block animate-pulse"></span> Uploaded</span>}
                      </div>
                    </motion.div>
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    CAPACITIES & DATES
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Sanctioned Capacity of solar PV system (KW)', 'sanctionedCapacity', 'number', '', 0)}
                    {renderField('Capacity of solar PV system (KW)', 'installedCapacity', 'number', '', 1)}
                    {renderField('Installation Date', 'installationDate', 'date', '', 2)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    EQUIPMENT
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                    {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                    {renderField('Wattage per module', 'moduleWattage', 'number', '', 2)}
                    {renderField('No. of Module', 'numberOfModules', 'number', '', 3)}
                    {renderField('Make of Inverter', 'inverterMake', 'text', '', 4)}
                    {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 5)}
                    {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '', 6)}
                  </div>
 
              </div>
            </motion.div>
          )}

          {activeTab === 'Invoice' && (
            <motion.div 
               key="invoice"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-cyan-600 font-bold text-2xl drop-shadow-sm">💳</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Invoice Data</h3>
               </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white border border-gray-200 shadow-xl shadow-gray-200/40 p-8 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform"><span className="text-8xl">📄</span></div>
                    <h4 className="text-xs tracking-[0.2em] font-black text-gray-400 mb-6">INVOICE DETAILS</h4>
                    {renderField('Invoice Number', 'invoiceNo')}
                    <div className="h-6"></div>
                    {renderField('Invoice Date', 'invoiceDate', 'date')}
                  </motion.div>

                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 shadow-xl shadow-gray-200/40 p-8 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 transform group-hover:scale-110 transition-transform"><span className="text-8xl">👤</span></div>
                    <h4 className="text-xs tracking-[0.2em] font-black text-gray-400 mb-6">CUSTOMER INFO</h4>
                    {renderField('Customer Name', 'name')}
                    <div className="h-4"></div>
                    {renderField('Address', 'address')}
                    <div className="h-4"></div>
                    {renderField('WhatsApp No', 'mobileNumber')}
                  </motion.div>

                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-gray-900 to-[#1e2a4a] border border-gray-800 p-8 rounded-[2rem] relative overflow-hidden group text-white shadow-2xl shadow-gray-900/30">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700"></div>
                    <h4 className="text-xs tracking-[0.2em] font-black text-[#f5a623] mb-6 whitespace-nowrap">PAYMENT RECEIVED</h4>
                    <div className="my-4 group">
                      <label className="block text-[13px] font-semibold text-gray-300 mb-2 uppercase tracking-wide group-hover:text-white transition-colors">Amount Received (₹)</label>
                      <input type="number" name="receivedAmount" value={data.receivedAmount === 0 ? 0 : (data.receivedAmount || '')} onChange={handleChange} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl focus:ring-4 focus:ring-yellow-500/40 text-white font-black text-2xl focus:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-yellow-400/90 font-bold bg-yellow-400/10 border border-yellow-400/20 px-4 py-2.5 rounded-xl w-full shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Auto-calculates Balance
                    </div>
                  </motion.div>
                </div>


                <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-5 mb-8 mt-16 bg-gray-50/50 p-4 rounded-r-xl">
                  <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg text-xl shadow-sm">📦</span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Product Line Items</h3>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                  {(data.invoiceItems || []).map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white border border-gray-100 shadow-xl shadow-gray-200/30 p-6 sm:p-8 rounded-[2rem] flex flex-wrap xl:flex-nowrap gap-6 items-end relative group hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute top-6 left-6 font-black text-5xl text-gray-50 opacity-50 z-0 pointer-events-none transition-transform group-hover:scale-110">0{index + 1}</div>
                      <div className="flex-1 min-w-[250px] relative z-10 w-full">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">🔧 Description</label>
                        <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-32 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📦 Qty</label>
                        <input type="number" value={item.qty === 0 ? 0 : (item.qty || '')} onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-48 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">💰 Rate (₹)</label>
                        <input type="number" value={item.rate === 0 ? 0 : (item.rate || '')} onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <div className="w-full sm:w-[30%] xl:w-36 relative z-10">
                        <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1.5 group-hover:text-gray-600 transition-colors">📊 Tax %</label>
                        <input type="number" value={item.tax === 0 ? 0 : (item.tax || '')} onChange={(e) => handleItemChange(index, 'tax', Number(e.target.value))} onWheel={(e) => e.currentTarget.blur()} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[1rem] focus:ring-4 focus:ring-yellow-500/20 focus:bg-white focus:border-yellow-400 font-bold text-gray-800 shadow-sm transition-all text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <button onClick={() => removeItem(index)} className="absolute -top-4 -right-4 bg-white border border-red-200 shadow-lg text-red-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 font-bold text-xl z-20">
                        ×
                      </button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>

                <motion.button whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.2)" }} whileTap={{ scale: 0.98 }} onClick={addItem} className="w-full py-5 mt-8 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 shadow-xl shadow-emerald-600/30 text-white font-black text-lg tracking-wide rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-3">
                  <span className="bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center text-2xl shadow-inner">+</span> Add Another Item
                </motion.button>
            </motion.div>
          )}

          {activeTab === 'Receipt' && (
            <motion.div 
               key="receipt"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-orange-600 font-bold text-2xl drop-shadow-sm">🧾</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Receipt Data</h3>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center border border-orange-200"><div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div></span> 
                    CUSTOMER INFO
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address', 'address', 'text', '', 1)}
                  </div>
                </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center border border-orange-200"><div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div></span> 
                    PAYMENT DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Receipt No.', 'receiptNo', 'text', '', 0)}
                    {renderField('Received Amount (₹)', 'receivedAmount', 'number', '', 0)}
                    
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="group">
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide group-hover:text-yellow-600 transition-colors">Payment Method</label>
                      <select name="paymentMethod" value={data.paymentMethod} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 focus:bg-white hover:border-gray-400 transition-all shadow-sm font-black text-gray-800">
                        <option value="">Select Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Draft">Draft</option>
                        <option value="Online">Online / NEFT</option>
                      </select>
                    </motion.div>
                    
                    {renderField('Cheque/Draft No.', 'chequeNo', 'text', '', 1)}
                    {renderField('Bank Name', 'bankName', 'text', '', 2)}
                    {renderField('Receipt Date', 'receiptDate', 'date', '', 3)}
                  </div>
  
              </div>
            </motion.div>
          )}
          {activeTab === 'Signature' && (
            <motion.div
                key="signature"
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-10"
             >
               <div className="flex items-center gap-4 pb-5 mb-6 border-b border-gray-100">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200/50 flex items-center justify-center shadow-inner">
                   <span className="text-indigo-600 font-bold text-2xl drop-shadow-sm">✍️</span>
                 </div>
                 <h3 className="text-3xl font-black text-gray-800 tracking-tight">Customer Signature</h3>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center border border-indigo-200"><div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]"></div></span> 
                    SIGNATURE UPLOAD
                 </h4>
                 
                 <div className="max-w-2xl grid gap-8">
                   <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                     Upload the signatures. These will be automatically placed across all necessary documents including the Proposal, Model Agreement, Annexure I, Annexure 3, and WCR.
                   </p>
                   
                   {/* Customer Signature */}
                   <motion.div 
                     initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                     className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
                   >
                     <h5 className="font-bold text-gray-700 mb-4">1. Customer Signature</h5>
                     <div className="flex items-center gap-4">
                       <input type="file" id="customer-sig-input" accept="image/*" onChange={(e) => handleSignatureUpload(e, 'customer')} className="hidden" />
                       <button onClick={() => document.getElementById('customer-sig-input')?.click()} className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-md font-bold transition-all duration-300 text-gray-600">
                         {data.customerSignature ? <><span className="text-xl">🔄</span> Change</> : <><span className="text-xl">✍️</span> Upload Customer</>}
                       </button>
                       {data.customerSignature && (
                           <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm ml-4 h-16 w-32 flex items-center justify-center">
                             <img src={data.customerSignature} alt="Preview" className="max-h-full max-w-full object-contain" />
                           </div>
                       )}
                     </div>
                   </motion.div>

                   {/* Vendor Signature */}
                   <motion.div 
                     initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                     className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
                   >
                     <h5 className="font-bold text-gray-700 mb-4">2. Vendor Signature (e.g. Sumit Bhandari)</h5>
                     <div className="flex items-center gap-4">
                       <input type="file" id="vendor-sig-input" accept="image/*" onChange={(e) => handleSignatureUpload(e, 'vendor')} className="hidden" />
                       <button onClick={() => document.getElementById('vendor-sig-input')?.click()} className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-md font-bold transition-all duration-300 text-gray-600">
                         {data.vendorSignature ? <><span className="text-xl">🔄</span> Change</> : <><span className="text-xl">✍️</span> Upload Vendor</>}
                       </button>
                       {data.vendorSignature && (
                           <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm ml-4 h-16 w-32 flex items-center justify-center">
                             <img src={data.vendorSignature} alt="Preview" className="max-h-full max-w-full object-contain" />
                           </div>
                       )}
                     </div>
                   </motion.div>

                   {/* Witness Signature */}
                   <motion.div 
                     initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                     className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm"
                   >
                     <h5 className="font-bold text-gray-700 mb-4">3. Witness Signature (e.g. Pavan Gupta)</h5>
                     <div className="flex items-center gap-4">
                       <input type="file" id="witness-sig-input" accept="image/*" onChange={(e) => handleSignatureUpload(e, 'witness')} className="hidden" />
                       <button onClick={() => document.getElementById('witness-sig-input')?.click()} className="flex items-center gap-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-md font-bold transition-all duration-300 text-gray-600">
                         {data.witnessSignature ? <><span className="text-xl">🔄</span> Change</> : <><span className="text-xl">✍️</span> Upload Witness</>}
                       </button>
                       {data.witnessSignature && (
                           <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm ml-4 h-16 w-32 flex items-center justify-center">
                             <img src={data.witnessSignature} alt="Preview" className="max-h-full max-w-full object-contain" />
                           </div>
                       )}
                     </div>
                   </motion.div>
                   
                 </div>
 
              </div>
            </motion.div>
          )}
          </AnimatePresence>

        </motion.div>
      </div>
      
      {cropImage && (
        <SignatureCropper
          imageSrc={cropImage.src}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end mt-12 pb-12 relative z-20"
      >
        <button onClick={onNext} className="group px-12 py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-[2rem] text-white font-black text-xl hover:shadow-[0_15px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-500 flex items-center gap-4 relative overflow-hidden border border-gray-800">
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          <span className="relative z-10 tracking-wide drop-shadow-md">Compile & Generate Documents</span>
          <span className="relative z-10 bg-white/20 p-2 rounded-full group-hover:translate-x-2 shadow-inner transition-transform duration-300 inline-flex">➜</span>
        </button>
      </motion.div>

    </motion.div>
  );
};
