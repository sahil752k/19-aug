export interface CustomerData {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  consumerNumber: string;
  mobileNumber: string;
  emailId: string;
  address: string;
  sanctionedCapacity: number;
  installedCapacity: number;
  setupType: string; // Rooftop
  projectModel: string; // Capex
  installationDate: string;
  agreementDate: string;
  inverterCapacity: number;
  inverterMake: string;
  inverterModel: string;
  moduleMake: string;
  moduleModel: string;
  moduleWattage: number; // in Wp
  numberOfModules: number;
  totalCost: number;
  rtsSystemCost: number;
  aadhaarNumber: string;
  aadhaarImage?: string; // base64
  customerSignature?: string; // base64
  vendorSignature?: string; // base64
  witnessSignature?: string; // base64
  draftName?: string; // name to display in saved drafts
  
  wcrCategory?: string;
  wcrSanctionNumber?: string;
  wcrModuleWarranty?: string;
  wcrInverterMakeModel?: string;
  wcrPcuRating?: string;
  wcrPcuChargeController?: string;
  wcrPcuHpd?: string;
  wcrPcuYearOfManufacturing?: string;
  wcrEarthingNo?: string;
  wcrEarthingCertificate?: string;
  wcrLighteningArrester?: string;
  // Invoice / Bill specific
  invoiceNo: string;
  invoiceDate: string;
  invoiceItems: {
    id: string;
    description: string;
    qty: number;
    rate: number;
    tax: number;
  }[];
  finalInvoiceAmount: number; // added for reverse calculation
  receivedAmount: number;
  
  // Receipt specific
  receiptNo: string;
  paymentMethod: string;
  chequeNo: string;
  bankName: string;
  receiptDate: string;
  
  // Proposal specific
  projectType: string;
  areaAvailable: string;
  contractLoad: string;
  moduleType: string;
  moduleWarranty: string;
  inverterQuantity: number;
  inverterPhases: number;
  inverterWarranty: string;
  inverterSpecification?: string;
  solarModuleSpecs?: string;
  subsidyAmount: number;
  amcCost: number;
  proposalType: string;
  productClassification?: string;
  systemSummarySize?: number | string;
  earthing: string;
  structure?: string;
  acDcCables: string;
  dailyGeneration: string;
  monthlyGeneration: string;
  yearlyGeneration: string;
  paymentAdvance: number;
  paymentDelivery: number;
  paymentInstallation: number;
  paymentCommissioning: number;
  quoteValidity: string;
  proposalDate: string;
}

export const defaultCustomerData: CustomerData = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: '',
  consumerNumber: '',
  mobileNumber: '',
  emailId: '',
  address: '',
  sanctionedCapacity: '' as unknown as number,
  installedCapacity: '' as unknown as number,
  setupType: '',
  projectModel: '',
  installationDate: '',
  agreementDate: '',
  inverterCapacity: '' as unknown as number,
  inverterMake: '',
  inverterModel: '',
  moduleMake: '',
  moduleModel: '',
  moduleWattage: '' as unknown as number,
  numberOfModules: '' as unknown as number,
  totalCost: '' as unknown as number,
  rtsSystemCost: '' as unknown as number,
  aadhaarNumber: '',
  
  invoiceNo: '',
  invoiceDate: '',
  invoiceItems: [],
  finalInvoiceAmount: '' as unknown as number,
  receivedAmount: '' as unknown as number,
  
  receiptNo: '',
  paymentMethod: '',
  chequeNo: '',
  bankName: '',
  receiptDate: '',
  
  projectType: '',
  areaAvailable: '',
  contractLoad: '',
  moduleType: '',
  moduleWarranty: '',
  inverterQuantity: '' as unknown as number,
  inverterPhases: '' as unknown as number,
  inverterWarranty: '',
  inverterSpecification: '',
  solarModuleSpecs: '',

  subsidyAmount: '' as unknown as number,
  amcCost: '' as unknown as number,
  proposalType: '',
  productClassification: '',
  systemSummarySize: '',
  earthing: '',
  acDcCables: '',
  dailyGeneration: '',
  monthlyGeneration: '',
  yearlyGeneration: '',
  paymentAdvance: 70,
  paymentDelivery: 20,
  paymentInstallation: 5,
  paymentCommissioning: 5,
  quoteValidity: '',
  proposalDate: '',
};
