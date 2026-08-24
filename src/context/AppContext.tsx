import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerData, defaultCustomerData } from '../types';

interface AppContextType {
  data: CustomerData;
  setData: React.Dispatch<React.SetStateAction<CustomerData>>;
  savedDrafts: CustomerData[];
  saveDraft: () => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  createNew: () => void;
  resetProposalData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CustomerData>(() => {
    const active = localStorage.getItem('activeSolarData');
    return active ? JSON.parse(active) : { ...defaultCustomerData, id: Date.now().toString() };
  });

  const [savedDrafts, setSavedDrafts] = useState<CustomerData[]>(() => {
    const drafts = localStorage.getItem('solarDrafts');
    return drafts ? JSON.parse(drafts) : [];
  });

  useEffect(() => {
    localStorage.setItem('activeSolarData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('solarDrafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  const saveDraft = () => {
    const updatedData = { ...data, updatedAt: new Date().toISOString() };
    setData(updatedData);
    
    setSavedDrafts((prev) => {
      const exists = prev.findIndex((d) => d.id === data.id);
      if (exists >= 0) {
        const newDrafts = [...prev];
        newDrafts[exists] = updatedData;
        return newDrafts;
      }
      return [...prev, updatedData];
    });
    // Remove alert for iframe compatibility
  };

  const loadDraft = (id: string) => {
    const draft = savedDrafts.find((d) => d.id === id);
    if (draft) {
      setData(draft);
    }
  };

  const deleteDraft = (id: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== id));
    if (data.id === id) {
      createNew();
    }
  };

  const createNew = () => {
    setData({ ...defaultCustomerData, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  };

  const resetProposalData = () => {
    setData((prev) => ({
      ...prev,
      projectType: defaultCustomerData.projectType,
      areaAvailable: defaultCustomerData.areaAvailable,
      contractLoad: defaultCustomerData.contractLoad,
      moduleType: defaultCustomerData.moduleType,
      moduleWarranty: defaultCustomerData.moduleWarranty,
      inverterQuantity: defaultCustomerData.inverterQuantity,
      inverterPhases: defaultCustomerData.inverterPhases,
      inverterWarranty: defaultCustomerData.inverterWarranty,
      subsidyAmount: defaultCustomerData.subsidyAmount,
      amcCost: defaultCustomerData.amcCost,
      proposalType: defaultCustomerData.proposalType,
      earthing: defaultCustomerData.earthing,
      acDcCables: defaultCustomerData.acDcCables,
      acDcProtection: defaultCustomerData.acDcProtection,
      netMetering: defaultCustomerData.netMetering,
      dailyGeneration: defaultCustomerData.dailyGeneration,
      monthlyGeneration: defaultCustomerData.monthlyGeneration,
      yearlyGeneration: defaultCustomerData.yearlyGeneration,
      savings1Year: defaultCustomerData.savings1Year,
      savings5Years: defaultCustomerData.savings5Years,
      savings10Years: defaultCustomerData.savings10Years,
      savings25Years: defaultCustomerData.savings25Years,
      paybackPeriod: defaultCustomerData.paybackPeriod,
      paymentAdvance: defaultCustomerData.paymentAdvance,
      paymentDelivery: defaultCustomerData.paymentDelivery,
      paymentInstallation: defaultCustomerData.paymentInstallation,
      paymentCommissioning: defaultCustomerData.paymentCommissioning,
      quoteValidity: defaultCustomerData.quoteValidity,
      proposalDate: defaultCustomerData.proposalDate,
      customerInvestment: defaultCustomerData.customerInvestment,
      structure: defaultCustomerData.structure,
      totalCost: defaultCustomerData.totalCost,
      rtsSystemCost: defaultCustomerData.rtsSystemCost,
    }));
  };

  return (
    <AppContext.Provider value={{ data, setData, savedDrafts, saveDraft, loadDraft, deleteDraft, createNew, resetProposalData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
