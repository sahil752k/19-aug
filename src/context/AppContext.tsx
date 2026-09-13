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
    const active = (() => { try { return localStorage.getItem('activeSolarData'); } catch (e) { return null; } })()
    return active ? JSON.parse(active) : { ...defaultCustomerData, id: Date.now().toString() };
  });

  const [savedDrafts, setSavedDrafts] = useState<CustomerData[]>(() => {
    const drafts = (() => { try { return localStorage.getItem('solarDrafts'); } catch (e) { return null; } })()
    return drafts ? JSON.parse(drafts) : [];
  });

  useEffect(() => {
    try { localStorage.setItem('activeSolarData', JSON.stringify(data)); } catch (e) {}
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem('solarDrafts', JSON.stringify(savedDrafts)); } catch (e) {}
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
      dailyGeneration: defaultCustomerData.dailyGeneration,
      monthlyGeneration: defaultCustomerData.monthlyGeneration,
      yearlyGeneration: defaultCustomerData.yearlyGeneration,
      paymentAdvance: defaultCustomerData.paymentAdvance,
      paymentDelivery: defaultCustomerData.paymentDelivery,
      paymentInstallation: defaultCustomerData.paymentInstallation,
      paymentCommissioning: defaultCustomerData.paymentCommissioning,
      quoteValidity: defaultCustomerData.quoteValidity,
      proposalDate: defaultCustomerData.proposalDate,
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
