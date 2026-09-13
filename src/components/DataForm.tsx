import React, { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SignatureCropper } from './SignatureCropper';

interface Props {
  onNext: () => void;
}

export const DataForm: React.FC<Props> = ({ onNext }) => {
  const { data, setData, saveDraft, createNew, resetProposalData } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<string>('Draft Info');
  const [cropImage, setCropImage] = useState<{ src: string; type: 'customer' | 'vendor' | 'witness' } | null>(null);

  const tabs = [
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
    setData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
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
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/30 focus:border-yellow-500 focus:bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 shadow-sm relative z-10 font-medium" 
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
              whileHover={{ scale: 1.02, x: (typeof window !== 'undefined' ? window.innerWidth : 1024) >= 1024 ? 4 : 0, y: (typeof window !== 'undefined' ? window.innerWidth : 1024) < 1024 ? -2 : 0 }}
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
               className="space-y-10"
             >
               <div className="flex flex-wrap gap-4 justify-between items-center pb-5 mb-6 border-b border-gray-100">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200/50 flex items-center justify-center shadow-inner">
                     <span className="text-yellow-600 font-bold text-2xl drop-shadow-sm">📝</span>
                   </div>
                   <h3 className="text-3xl font-black text-gray-800 tracking-tight">Proposal Data</h3>
                 </div>
                 <button type="button" onClick={() => resetProposalData()} className="px-4 py-2.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl font-bold transition-all shadow-sm text-sm hover:bg-yellow-500 hover:text-white hover:border-yellow-500 hover:-translate-y-0.5 hover:shadow-yellow-500/20">
                   Reset Section
                 </button>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    PREPARED FOR (COVER PAGE)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Name', 'name', 'text', '', 0)}
                    {renderField('Address / City', 'address', 'text', '', 1)}
                    {renderField('SYSTEM CAPACITY (kW)', 'installedCapacity', 'number', '', 2)}
                    {renderField('PROPOSAL TYPE', 'proposalType', 'text', '', 3)}
                    {renderField('DATE', 'proposalDate', 'date', '', 4)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    DESIGN INPUTS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('PROJECT TYPE', 'projectType', 'text', '', 0)}
                    {renderField('AREA AVAILABLE', 'areaAvailable', 'text', '', 1)}
                    {renderField('LOAD / CONTRACT LOAD', 'contractLoad', 'text', '', 2)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    System summary
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Product classification', 'productClassification', 'text', '', 0)}
                    {renderField('System size (kW)', 'systemSummarySize', 'number', '', 1)}
                    {renderField('Solar module', 'solarModuleSpecs', 'text', 'e.g. 56 Wp x 890', 2)}
                    {renderField('Inverter', 'inverterSpecification', 'text', 'e.g. 890 kW Phase x', 3)}
                    {renderField('Earthing', 'earthing', 'text', '', 4)}
                    {renderField('AC/DC Cables', 'acDcCables', 'text', '', 5)}
                    {renderField('Structure', 'structure', 'text', '', 6)}
                    {renderField('Subsidy (₹)', 'subsidyAmount', 'number', '', 7)}
                    {renderField('Price (₹)', 'totalCost', 'number', '', 8)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    SOLAR PV MODULE DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('MANUFACTURER', 'moduleMake', 'text', '', 0)}
                    {renderField('NO. OF MODULES', 'numberOfModules', 'number', '', 1)}
                    {renderField('WATTAGE OF EACH MODULE*', 'moduleWattage', 'number', '', 2)}
                    {renderField('WARRANTY', 'moduleWarranty', 'text', '', 3)}
                 </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    INVERTER DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('MANUFACTURER', 'inverterMake', 'text', '', 0)}
                    {renderField('RATING KW PER INVERTER', 'inverterCapacity', 'number', '', 1)}
                    {renderField('QUANTITY', 'inverterQuantity', 'number', '', 2)}
                    {renderField('INVERTER SPECIFICATION', 'inverterSpecification', 'text', 'e.g. 890 Kw Phase', 3)}
                    {renderField('NO. OF PHASES', 'inverterPhases', 'number', '', 4)}
                    {renderField('WARRANTY', 'inverterWarranty', 'text', '', 5)}
                 </div>
               </div>
               
               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e27d28]/10 flex items-center justify-center border border-[#e27d28]/20"><div className="w-2 h-2 bg-[#e27d28] rounded-full shadow-[0_0_8px_#e27d28]"></div></span> 
                    GENERATION EXPECTATION
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Day 1 (Units)', 'dailyGeneration', 'text', '', 0)}
                    {renderField('Month 1 (Units)', 'monthlyGeneration', 'text', '', 1)}
                    {renderField('Year 1 (Units)', 'yearlyGeneration', 'text', '', 2)}
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
                  {renderField('Sanctioned Capacity (Kw)', 'sanctionedCapacity', 'number', '', 2)}
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
                  {renderField('Mobile number', 'mobileNumber', 'text', '', 1)}
                  {renderField('Email ID', 'emailId', 'email', '', 2)}
                  {renderField('Consumer number', 'consumerNumber', 'text', '', 3)}
                  {renderField('Date', 'installationDate', 'date', '', 4)}
                  <div className="md:col-span-2">
                     {renderField('Installation Address', 'address', 'text', '', 5)}
                  </div>
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SOLAR PV DETAILS
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Make of Module', 'moduleMake', 'text', '', 0)}
                  {renderField('ALMM Model Number', 'moduleModel', 'text', '', 1)}
                  {renderField('Module Wattage (Wp)', 'moduleWattage', 'number', '', 2)}
                  {renderField('Total No. Of Modules', 'numberOfModules', 'number', '', 3)}
                </div>
              </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div></span> 
                    SYSTEM SETUP
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                  {renderField('Sanctioned Capacity (Kw)', 'sanctionedCapacity', 'number', '', 0)}
                  {renderField('RE Installed Capacity (Rooftop) (Kw)', 'installedCapacity', 'number', '', 1)}
                  {renderField('Capacity Type', 'setupType', 'text', 'e.g., Rooftop', 2)}
                  
                  {renderField('Make of Inverter', 'inverterMake', 'text', '', 3)}
                  {renderField('Model Number of Inverter', 'inverterModel', 'text', '', 4)}
                  {renderField('Capacity of Inverter (Kw)', 'inverterCapacity', 'number', '', 5)}
                  
                  {renderField('Structure Type', 'structure', 'text', '', 6)}
                  {renderField('Project Model', 'projectModel', 'text', 'e.g., Capex', 7)}
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
                    {renderField('Name', 'name', 'text', 'Hariom Ingle', 0)}
                    {renderField('Consumer number', 'consumerNumber', 'text', '101', 1)}
                    {renderField('Site/Location With Complete Address', 'address', 'text', 'Deo peth washim', 2)}
                    {renderField('Category: Govt/Private Sector', 'wcrCategory', 'text', 'Private', 3)}
                    {renderField('Sanction number', 'wcrSanctionNumber', 'text', 'NP-MHSED25', 4)}
                    {renderField('Sanctioned Capacity of solar PV system (KW)', 'sanctionedCapacity', 'number', '90', 5)}
                    {renderField('Capacity of solar PV system (KW)', 'installedCapacity', 'number', '890', 6)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Specification of the Modules
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Make of Module', 'moduleMake', 'text', 'MODULE', 0)}
                    {renderField('ALMM Model Number', 'moduleModel', 'text', 'almm', 1)}
                    {renderField('Wattage per module', 'moduleWattage', 'text', '56 Wp', 2)}
                    {renderField('No. of Module', 'numberOfModules', 'number', '890', 3)}
                    {renderField('Total Capacity (Kwp)', 'installedCapacity', 'number', '890', 4)}
                    {renderField('Warranty Details (Product + Performance)', 'wcrModuleWarranty', 'text', '10 Years & 25 Years', 5)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Specifications of PCU
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Make & Model Number of Inverter', 'wcrInverterMakeModel', 'text', 'JHK 790897', 0)}
                    {renderField('Rating', 'wcrPcuRating', 'text', '', 1)}
                    {renderField('Type of charge controller/ MPPT', 'wcrPcuChargeController', 'text', '', 2)}
                    {renderField('Capacity of Inverter', 'inverterCapacity', 'number', '890', 3)}
                    {renderField('HPD', 'wcrPcuHpd', 'text', '-', 4)}
                    {renderField('Year of manufacturing', 'wcrPcuYearOfManufacturing', 'text', '2024', 5)}
                  </div>
               </div>

               <div className="bg-gradient-to-b from-gray-50/50 to-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                 <h4 className="text-xs tracking-[0.25em] font-black text-gray-400 mb-8 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center border border-rose-200"><div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"></div></span> 
                    Earthing & Protections
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('No. of Separate Earthing with earth resistance', 'wcrEarthingNo', 'text', '3', 0)}
                    <div className="md:col-span-2">
                       {renderField('It is certified that the earth Resistance measure in presence of Licensed Electrical Contractor/Supervisor and found in order i.e. <5 Ohms as per MNRE OM Dtd. 07.06.24 for CFA component.', 'wcrEarthingCertificate', 'text', '', 1)}
                    </div>
                    {renderField('Lightening Arrester', 'wcrLighteningArrester', 'text', 'Separate Earthing Provided', 2)}
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
                      <input type="number" name="receivedAmount" value={data.receivedAmount === 0 ? 0 : (data.receivedAmount || '')} onChange={handleChange} onWheel={(e) => (e.target as HTMLInputElement).blur()} className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl focus:ring-4 focus:ring-yellow-500/40 text-white font-black text-2xl focus:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-inner" />
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-yellow-400/90 font-bold bg-yellow-400/10 border border-yellow-400/20 px-4 py-2.5 rounded-xl w-full shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span> Auto-calculates Balance
                    </div>
                  </motion.div>
                </div>


                <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-5 mb-8 mt-16 bg-gray-50/50 p-4 rounded-r-xl">
                  <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg text-xl shadow-sm">💰</span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Invoice Auto-Calculation</h3>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl shadow-gray-200/40 p-8 rounded-[2rem]">
                  <div className="mb-8">
                    <label className="block text-[13px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Final Invoice Amount (₹)</label>
                    <input 
                      type="number" 
                      name="finalInvoiceAmount" 
                      value={data.finalInvoiceAmount === 0 ? 0 : (data.finalInvoiceAmount || '')} 
                      onChange={handleChange} 
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      className="w-full px-5 py-4 bg-white border-2 border-yellow-400 rounded-xl focus:ring-4 focus:ring-yellow-500/20 text-gray-900 font-black text-3xl shadow-sm transition-all" 
                      placeholder="e.g. 200000"
                    />
                  </div>

                  {(() => {
                    const finalAmt = Number(data.finalInvoiceAmount) || 0;
                    const solar = finalAmt * 0.70;
                    const install = finalAmt * 0.30;
                    const solarTaxable = solar / 1.05;
                    const installTaxable = install / 1.18;
                    const solarTax = solarTaxable * 0.05;
                    const installTax = installTaxable * 0.18;
                    
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-inner">
                        <div>
                          <div className="text-xs font-bold text-gray-400 mb-1 uppercase">Solar System (70%)</div>
                          <div className="text-xl font-bold text-gray-800">₹ {solar.toLocaleString('en-IN', {maximumFractionDigits: 2})}</div>
                          <div className="text-xs text-gray-500 mt-1">Taxable: ₹{solarTaxable.toLocaleString('en-IN', {maximumFractionDigits: 2})} + 5% GST (₹{solarTax.toLocaleString('en-IN', {maximumFractionDigits: 2})})</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-400 mb-1 uppercase">Installation (30%)</div>
                          <div className="text-xl font-bold text-gray-800">₹ {install.toLocaleString('en-IN', {maximumFractionDigits: 2})}</div>
                          <div className="text-xs text-gray-500 mt-1">Taxable: ₹{installTaxable.toLocaleString('en-IN', {maximumFractionDigits: 2})} + 18% GST (₹{installTax.toLocaleString('en-IN', {maximumFractionDigits: 2})})</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
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
