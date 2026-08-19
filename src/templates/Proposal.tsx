import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format, isValid } from 'date-fns';

const safeFormatDate = (dateStr: string | undefined | null, formatStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isValid(d) ? format(d, formatStr) : '';
};
import { Logo, Stamp } from './shared';
import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote } from 'lucide-react';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-pdf-page="true" className="w-[794px] h-[1123px] bg-[#f8f9fa] relative overflow-hidden flex flex-col mx-auto mb-8 select-none print:mb-0 shadow-lg print:shadow-none" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
    {children}
  </div>
);

export const Proposal: React.FC = () => {
  const { data } = useAppContext();
  
  const yearlyGenerationStr = data.yearlyGeneration ? data.yearlyGeneration.toString().replace(/,/g, '') : '0';
  const yearlyGen = parseInt(yearlyGenerationStr) || 0;
  const lifetimeGen = yearlyGen * 25;
  const co2Tons = (yearlyGen * 0.82 / 1000).toFixed(1); 
  const treesPlanted = Math.round((yearlyGen * 0.82) / 21.77);

  return (
    <div className="font-times text-sm text-gray-900 bg-gray-100 py-8 print:py-0 print:bg-white flex flex-col items-center select-none">
      
      {/* Page 1: Cover */}
      <PageWrapper>
        {/* Background Image - Full Page */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/70 to-transparent"></div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start pt-8 pb-4 px-10">
          <Logo size="lg" />
          <div className="text-right flex flex-col items-end">
            <div className="border-r-4 border-[#e27d28] pr-3 flex flex-col items-end">
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 relative flex flex-col">
          <div className="relative z-10 px-12 pt-16 flex flex-col h-full">
            <h1 className="text-[#1e3a5f] font-bold text-7xl leading-tight mb-2 tracking-tight">SOLAR <br/> ROOFTOP</h1>
            <h2 className="text-[#e27d28] font-bold text-4xl mb-6 tracking-wide">PROPOSAL</h2>
            
            <div className="bg-[#1e3a5f] text-white self-start px-6 py-2 rounded-sm font-bold text-lg mb-12">
              SAVE ELECTRICITY BILLS UP TO 90%
            </div>

            <div className="space-y-6 mt-8">
              <div className="flex items-center gap-4 bg-white/90 p-3 rounded-lg max-w-[400px] shadow-sm">
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shrink-0">
                  <User size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Prepared For</p>
                  <p className="font-bold text-[17px] text-gray-900 leading-tight uppercase">{data.name}</p>
                  <p className="font-medium text-gray-700 text-sm">{data.address.split(',').pop()?.trim() || 'WASHIM - 444 505'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/90 p-3 rounded-lg max-w-[400px] shadow-sm">
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shrink-0">
                  <Zap size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">System Capacity</p>
                  <p className="font-bold text-[17px] text-[#e27d28]">{data.installedCapacity} kW</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/90 p-3 rounded-lg max-w-[400px] shadow-sm">
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Proposal Type</p>
                  <p className="font-bold text-[17px] text-gray-900">{data.proposalType}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/90 p-3 rounded-lg max-w-[400px] shadow-sm">
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shrink-0">
                  <Calendar size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</p>
                  <p className="font-bold text-[17px] text-gray-900">{safeFormatDate(data.proposalDate, 'dd MMMM yyyy')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="w-full flex flex-row items-center justify-between border-t-[3px] border-[#86a8c6] bg-white pt-2 pb-2 px-10 relative overflow-hidden mt-1">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#e27d28]/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1e3a5f]/10 rounded-full blur-3xl transform -translate-x-10 translate-y-10 pointer-events-none"></div>
           
           <div className="flex-[0.8] flex flex-col items-center justify-center border-r-[2px] border-gray-300 pr-4 mr-4 relative z-10 py-1">
              <div className="w-[35px] h-[35px] border-2 border-gray-500 rounded-[8px] p-0.5 mb-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                 <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/ChatGPT_Image_Jun_13__2026__03_30_24_PM-removebg-preview.png" alt="Logo" className="w-[120%] h-[120%] object-contain mix-blend-multiply max-w-none" />
              </div>
              <div className="flex flex-col items-center justify-center whitespace-nowrap">
                  <span className="text-[#e27d28] font-bold text-[13px] tracking-widest uppercase leading-none font-times" style={{fontFamily: 'Montserrat, sans-serif'}}>r. s. bhandari</span>
                  <span className="text-[#415a77] font-bold text-[8px] tracking-tight leading-none mt-0.5">Solar Energy Solutions</span>
              </div>
           </div>
           
           <div className="flex-[2] flex flex-col gap-0.5 text-[9px] text-[#5b728b] relative z-10 pl-2">
              <h3 className="text-[13px] font-bold text-[#5b728b] italic tracking-wide mb-0.5" style={{fontFamily: 'Montserrat, sans-serif'}}>
                 r. s. bhandari Solar Energy Solutions
              </h3>
              <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-0.5 items-start font-medium leading-tight text-[9.5px]">
                 <span className="text-[#5b728b]">Corporate office:</span>
                 <span className="text-[#5b728b]">“SAMAYSAR” Jain Colony Pusad Naka, Washim</span>
                 
                 <span className="text-[#5b728b]">Branch office:</span>
                 <span className="text-[#5b728b]">“Seren County” B 302 Vadgaon Sinhagad Road, Dhayari Pune 411041</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 font-medium text-[#5b728b] text-[9.5px]">
                 | rsbenergys@gmail.com | 9226372787
              </div>
           </div>
           
           <div className="absolute right-4 bottom-4 z-20 hidden">
               <span className="bg-[#1e3a5f] text-white font-bold py-1 px-4 rounded-full text-[10px] shadow-sm">Page 1</span>
           </div>
        </div>
      </PageWrapper>

      {/* PAge 2: About */}
      <PageWrapper>
        <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute left-[80%] -top-10 w-[200px] h-[200px] bg-[#e27d28] rounded-full flex items-center justify-center opacity-100 z-10 border-[8px] border-white/20">
             <div className="bg-white rounded-full p-4">
                 <UsersGroupIcon className="text-[#e27d28] w-12 h-12" />
             </div>
          </div>
          <div className="relative z-10 w-3/4">
            <h2 className="text-4xl font-bold mb-2">ABOUT</h2>
            <h3 className="text-2xl font-bold tracking-widest text-[#a8c6e6]">R. S. BHANDARI SOLAR</h3>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
          <p className="text-[17px] text-gray-700 leading-relaxed text-justify mb-12">
            <span className="font-bold text-[#1e3a5f]">r. s. bhandari Solar Energy Solutions</span> is one of the fastest growing rooftop solar companies in Maharashtra, with footprints in Pune, Aurangabad, Akola, Washim, Amravati, Nagpur, Jalgaon. We have executed over <span className="font-bold text-[#e27d28]">100+ solar projects</span> across 7 District, that include rooftop (residential, commercial, industrial & Government), solar water pumps, solar petrol pumps.
          </p>

          <h3 className="text-[#1e3a5f] text-2xl font-bold tracking-wider mb-8">WHY CHOOSE US?</h3>

          <div className="grid grid-cols-3 gap-8 mb-auto">
             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><ShieldCheck size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">High Quality Material</h4>
                <p className="text-sm text-gray-600 line-clamp-3">We use MNRE approved high quality components.</p>
             </div>
             
             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><Settings size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">Expert Installation Team</h4>
                <p className="text-sm text-gray-600 line-clamp-3">Trained & experienced engineers for safe installation.</p>
             </div>

             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><Banknote size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">Government Subsidy Support</h4>
                <p className="text-sm text-gray-600 line-clamp-3">Complete assistance in subsidy & net metering process.</p>
             </div>

             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><Clock size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">On Time Delivery</h4>
                <p className="text-sm text-gray-600 line-clamp-3">Timely project delivery with best quality assurance.</p>
             </div>

             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><HeadphonesIcon size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">After Sales Service</h4>
                <p className="text-sm text-gray-600 line-clamp-3">Prompt support & maintenance for peace of mind.</p>
             </div>

             <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-[#e27d28] mb-4"><Medal size={50} strokeWidth={1.5} /></div>
                <h4 className="font-bold text-sm text-[#1e3a5f] mb-2 uppercase tracking-wide h-10 flex items-center justify-center">25 Years Performance Warranty</h4>
                <p className="text-sm text-gray-600 line-clamp-3">Long term performance & peace of mind.</p>
             </div>
          </div>
        </div>

        {/* Footer Stats Bar */}
        <div className="bg-[#1e3a5f] text-white flex justify-between h-[100px] px-10 relative overflow-hidden items-center">
            <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
            
            <div className="relative z-10 flex w-full justify-between pr-24">
               <div className="flex items-center gap-4">
                  <div className="border p-2 rounded-md"><LineChartIcon className="w-8 h-8"/></div>
                  <div>
                    <h5 className="font-bold text-2xl leading-none">100+</h5>
                    <p className="text-xs font-semibold tracking-wider text-[#a8c6e6]">PROJECTS COMPLETED</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="border p-2 rounded-md"><MapIcon className="w-8 h-8"/></div>
                  <div>
                    <h5 className="font-bold text-2xl leading-none">7+</h5>
                    <p className="text-xs font-semibold tracking-wider text-[#a8c6e6]">DISTRICTS COVERED</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="border p-2 rounded-md"><SmileIcon className="w-8 h-8"/></div>
                  <div>
                    <h5 className="font-bold text-2xl leading-none">100%</h5>
                    <p className="text-xs font-semibold tracking-wider text-[#a8c6e6]">CUSTOMER SATISFACTION</p>
                  </div>
               </div>
            </div>

            <div className="absolute right-0 bottom-4 z-20 pr-10">
               <span className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 2</span>
            </div>
        </div>
      </PageWrapper>

      {/* Page 3: Design Inputs & Summary */}
      <PageWrapper>
        <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">DESIGN INPUTS</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 3</div>
          </div>
        </div>
        <div className="p-10 flex-1 flex flex-col h-full overflow-hidden">
           <div className="flex gap-8 mb-6 h-[55%]">
              <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full flex items-start justify-end p-4"><Settings className="text-blue-200" size={32} /></div>
                 <h3 className="text-[#1e3a5f] text-lg font-bold tracking-wider mb-4 border-b border-gray-200 pb-2">DESIGN INPUTS</h3>
                 <div className="space-y-4">
                    <div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Project Type :</p>
                       <p className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-1">{data.projectType}</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Area Available :</p>
                       <p className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-1">{data.areaAvailable}</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Load / Contract Load :</p>
                       <p className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-1">{data.contractLoad}</p>
                    </div>
                 </div>
                 <div className="mt-6 bg-orange-50 p-3 border border-orange-100 rounded text-xs text-gray-700 italic">
                    <span className="font-bold text-[#e27d28]">Note:</span> {data.installedCapacity} KW requirement of empty shadow free flat space will be approx {data.areaAvailable}.
                 </div>
              </div>

              <div className="flex-[1.2] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col p-6 relative overflow-hidden">
                 <h2 className="text-3xl font-medium text-[#2d2f2e] leading-none tracking-tight">System summary</h2>
                 <div className="w-[60%] h-[2px] bg-gray-300 mt-3 mb-3"></div>
                 <h4 className="text-[15px] text-[#39a0c6] mb-4 font-medium">A quick overview of system project and price</h4>
                 
                 <div className="border-t-[2px] border-b-[2px] border-[#485b65] flex flex-col text-[13px] flex-1 justify-between py-1">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                       <span className="font-bold text-[#1f6377]">Product classification</span>
                       <span className="text-[#156e80] w-[45%] font-medium">{data.proposalType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                       <span className="font-bold text-[#1f6377]">System size</span>
                       <span className="text-[#156e80] w-[45%] font-medium">{data.installedCapacity} kW</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">Solar module</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.moduleWattage} Wp x {data.numberOfModules.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">Inverter</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.inverterCapacity} kW Phase x {data.inverterPhases}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">Earthing</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.earthing}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">AC/DC Cables</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.acDcCables}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">Structure</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.structure || 'Hot Dip GI (3x3/2x2)'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-bold text-[#1f6377]">Subsidy</span>
                        <span className="text-[#156e80] w-[45%] font-medium">{data.subsidyAmount.toLocaleString('en-IN')}/-</span>
                    </div>
                    <div className="flex justify-between py-2 border-transparent">
                        <span className="font-bold text-[#1f6377]">Price</span>
                        <span className="text-[#156e80] w-[45%] font-medium">INR {(data.totalCost - data.subsidyAmount).toLocaleString('en-IN')} /-</span>
                    </div>
                 </div>
                 
                 <div className="mt-3">
                     <p className="text-[11px] text-[#485b65] font-medium leading-tight"><span className="font-bold italic mr-1">NOTE:</span> T&C apply | GST at actual Approx. Quote valid for {data.quoteValidity} days from {safeFormatDate(data.proposalDate, 'EEE dd MMM yyyy')}</p>
                 </div>
              </div>
           </div>

           <div className="mt-auto flex flex-col gap-4">
               {/* Generation boxes row */}
               <div className="grid grid-cols-4 gap-4">
                   <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4d7d] rounded-xl p-4 text-white shadow-md border-b-4 border-[#e27d28] relative overflow-hidden flex flex-col justify-center items-center text-center">
                       <Zap className="absolute opacity-10 -right-2 -bottom-2" size={60} />
                       <p className="text-[11px] font-bold uppercase tracking-widest text-[#a8c6e6] mb-1">Day 1</p>
                       <p className="text-2xl font-black mb-0 leading-none">{data.dailyGeneration}*</p>
                       <p className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest">kWh</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4d7d] rounded-xl p-4 text-white shadow-md border-b-4 border-[#e27d28] relative overflow-hidden flex flex-col justify-center items-center text-center">
                       <Calendar className="absolute opacity-10 -right-2 -bottom-2" size={60} />
                       <p className="text-[11px] font-bold uppercase tracking-widest text-[#a8c6e6] mb-1">Month 1</p>
                       <p className="text-2xl font-black mb-0 leading-none">{data.monthlyGeneration}*</p>
                       <p className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest">kWh</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4d7d] rounded-xl p-4 text-white shadow-md border-b-4 border-[#e27d28] relative overflow-hidden flex flex-col justify-center items-center text-center">
                       <TrendingUp className="absolute opacity-10 -right-2 -bottom-2" size={60} />
                       <p className="text-[11px] font-bold uppercase tracking-widest text-[#a8c6e6] mb-1">Year 1</p>
                       <p className="text-2xl font-black mb-0 leading-none">{data.yearlyGeneration}*</p>
                       <p className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest">kWh</p>
                   </div>
                   <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4d7d] rounded-xl p-4 text-white shadow-md border-b-4 border-[#e27d28] relative overflow-hidden flex flex-col justify-center items-center text-center">
                       <Medal className="absolute opacity-10 -right-2 -bottom-2" size={60} />
                       <p className="text-[11px] font-bold uppercase tracking-widest text-[#a8c6e6] mb-1">Lifetime (25 Yrs)</p>
                       <p className="text-2xl font-black mb-0 leading-none">{lifetimeGen.toLocaleString('en-IN')}*</p>
                       <p className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-widest">kWh</p>
                   </div>
               </div>

               {/* Environment impact row */}
               <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                   <div className="flex-1 flex items-center p-4 border-r border-gray-100">
                       <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mr-5 border border-orange-100 shrink-0">
                           <svg width="35" height="25" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M 28 42 H 20 C 13.373 42 8 36.627 8 30 C 8 23.373 13.373 18 20 18 C 21.5 13 26 8 33 8 C 41 8 46 13 49 18 C 51 16 54 15 57 15 C 64.732 15 71 21.268 71 29 C 71 36.732 64.732 43 57 43 H 47" stroke="#e27d28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <text x="24" y="47" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="800" fill="#e27d28">CO</text>
                              <text x="58" y="52" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="800" fill="#e27d28">2</text>
                           </svg>
                       </div>
                       <div>
                           <p className="text-gray-500 text-[13px] font-medium leading-snug">
                               Going solar eliminates <br/>
                               <strong className="text-[#1e3a5f] text-xl font-black">{co2Tons} tons</strong> <br/>
                               of greenhouse emissions annually
                           </p>
                       </div>
                   </div>

                   <div className="flex-1 flex items-center p-4">
                       <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mr-5 border border-green-100 shrink-0">
                           <svg width="35" height="25" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M 45 28 V 16" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M 45 22 C 45 22 53 14 60 14 C 60 14 60 22 53 28 C 48 32 45 22 45 22 Z" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M 45 24 C 45 24 39 18 32 18 C 32 18 32 24 37 28 C 41 31 45 24 45 24 Z" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M 12 36 L 24 28 H 40 L 46 32 L 60 26 L 64 30 C 64 30 52 42 42 42 H 28 L 18 48 L 12 36 Z" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M 16 32 L 10 40" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                       </div>
                       <div>
                           <p className="text-gray-500 text-[13px] font-medium leading-snug">
                               Going solar is equivalent to <br/>
                               planting <strong className="text-green-600 text-xl font-black">{treesPlanted.toLocaleString('en-IN')} trees</strong> <br/>
                               annually
                           </p>
                       </div>
                   </div>
               </div>
           </div>
        </div>
      </PageWrapper>

      {/* Page 4: Technical Proposal */}
      <PageWrapper>
        <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">TECHNICAL PROPOSAL</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 4</div>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
          
          <div className="flex gap-6 mb-8">
             <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="bg-[#1e3a5f] text-white p-3 font-bold text-center tracking-wider text-sm">
                   SOLAR PV MODULE DETAILS
                </div>
                <div className="p-5 space-y-4">
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Manufacturer</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.moduleMake}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">No. of Modules</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.numberOfModules} Nos ({data.moduleType})</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Wattage of Each Module*</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.moduleWattage} Wp</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Warranty</p>
                      <p className="font-semibold text-gray-900 text-sm">{data.moduleWarranty}</p>
                   </div>
                </div>
             </div>

             <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="bg-[#1e3a5f] text-white p-3 font-bold text-center tracking-wider text-sm">
                   INVERTER DETAILS
                </div>
                <div className="p-5 space-y-4">
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Manufacturer</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.inverterMake}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rating KW Per Inverter</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.inverterCapacity} KW</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.inverterQuantity} Nos</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Inverter Specification</p>
                      <p className="font-semibold text-gray-900 border-b border-gray-200 pb-1">{data.inverterCapacity} Kw {data.inverterPhases} Phase</p>
                   </div>
                   <div className="flex gap-4">
                       <div className="flex-1">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">No. of Phases</p>
                          <p className="font-semibold text-gray-900">{data.inverterPhases} Phase</p>
                       </div>
                       <div className="flex-1">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Warranty</p>
                          <p className="font-semibold text-gray-900">{data.inverterWarranty}</p>
                       </div>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-auto">
              <div className="bg-[#1e3a5f] text-white p-3 font-bold px-5 tracking-wider text-sm">
                 BALANCE OF SYSTEM
              </div>
              <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">Mounting Structure</span>
                    <span className="text-sm font-semibold text-gray-900">{data.structure || 'Hot Dip GI (3x3/2x2)'}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">Earthing</span>
                    <span className="text-sm font-semibold text-gray-900">{data.earthing}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">AC / DC Cables</span>
                    <span className="text-sm font-semibold text-gray-900">{data.acDcCables}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">AC / DC Protection</span>
                    <span className="text-sm font-semibold text-gray-900">{data.acDcProtection}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-200 pb-2 col-span-2">
                    <span className="text-sm font-bold text-gray-600">Net Metering</span>
                    <span className="text-sm font-semibold text-gray-900">{data.netMetering}</span>
                 </div>
              </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-auto border-t border-gray-200 pt-8">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3"><Medal className="text-[#1e3a5f]" size={32} /></div>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">MNRE APPROVED</p>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">COMPONENTS</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3"><Leaf className="text-[#1e3a5f]" size={32} /></div>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">HIGH EFFICIENCY</p>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">SYSTEM</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3"><ShieldCheck className="text-[#1e3a5f]" size={32} /></div>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">SAFE & RELIABLE</p>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">INSTALLATION</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3"><TrendingUp className="text-[#1e3a5f]" size={32} /></div>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">LONG LASTING</p>
                <p className="font-bold text-xs text-[#1e3a5f] uppercase">PERFORMANCE</p>
             </div>
          </div>
        </div>
      </PageWrapper>

      {/* Page 5: Financial Benefits */}
      <PageWrapper>
        <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">FINANCIAL BENEFITS</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 5</div>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-row gap-8">
           <div className="flex-1 flex flex-col">
              <h3 className="text-green-600 font-bold tracking-wider mb-4 text-[13px]">EXPECTED GENERATION</h3>
              <div className="grid grid-cols-3 gap-4 mb-10">
                 <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center pb-6">
                    <div className="text-orange-400 mb-2"><svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.758a.75.75 0 001.06-1.061l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path></svg></div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">DAILY</p>
                    <p className="text-3xl border-t border-gray-300 w-full text-center pt-2 font-bold text-[#1e3a5f]">{data.dailyGeneration}</p>
                    <p className="text-sm text-gray-500 mt-1">Units</p>
                 </div>
                 <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center pb-6">
                    <div className="text-blue-500 mb-2"><Calendar size={40} /></div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">MONTHLY</p>
                    <p className="text-3xl border-t border-gray-300 w-full text-center pt-2 font-bold text-[#1e3a5f]">{data.monthlyGeneration}</p>
                    <p className="text-sm text-gray-500 mt-1">Units</p>
                 </div>
                 <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center pb-6">
                    <div className="text-green-500 mb-2"><LineChartIcon size={40} /></div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">YEARLY</p>
                    <p className="text-3xl border-t border-gray-300 w-full text-center pt-2 font-bold text-[#1e3a5f]">{data.yearlyGeneration}</p>
                    <p className="text-sm text-gray-500 mt-1">Units</p>
                 </div>
              </div>

              <h3 className="text-green-600 font-bold tracking-wider mb-4 text-[13px]">SAVINGS OVER TIME <span className="text-gray-400 font-medium ml-2">(Estimated)</span></h3>
              <table className="w-full text-center border overflow-hidden rounded-lg mb-auto">
                 <thead className="bg-[#1e3a5f] text-white">
                    <tr>
                       <th className="py-2.5 px-4 font-semibold border-r border-[#2a4d7d]">Duration</th>
                       <th className="py-2.5 px-4 font-semibold">Estimated Savings (₹)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200">
                    <tr>
                       <td className="py-3 px-4 bg-[#1e3a5f] text-white font-medium border-r border-[#2a4d7d]">1 Year</td>
                       <td className="py-3 px-4 font-bold text-gray-800 bg-gray-50">₹ {data.savings1Year}</td>
                    </tr>
                    <tr>
                       <td className="py-3 px-4 bg-[#1e3a5f] text-white font-medium border-r border-[#2a4d7d]">5 Years</td>
                       <td className="py-3 px-4 font-bold text-gray-800 bg-gray-50">₹ {data.savings5Years}</td>
                    </tr>
                    <tr>
                       <td className="py-3 px-4 bg-[#1e3a5f] text-white font-medium border-r border-[#2a4d7d]">10 Years</td>
                       <td className="py-3 px-4 font-bold text-gray-800 bg-gray-50">₹ {data.savings10Years}</td>
                    </tr>
                    <tr>
                       <td className="py-3 px-4 bg-[#1e3a5f] text-white font-medium border-r border-[#2a4d7d]">25 Years</td>
                       <td className="py-3 px-4 font-bold text-gray-800 bg-gray-50">₹ {data.savings25Years}</td>
                    </tr>
                 </tbody>
              </table>

              <div className="flex justify-between items-center mt-12 bg-gray-50 p-6 rounded-xl h-24">
                 <div className="flex flex-col items-center gap-1 w-1/4">
                    <div className="text-green-600"><Banknote size={24} strokeWidth={1.5} /></div>
                    <p className="font-semibold text-[10px] text-center text-gray-600 leading-tight">Increase Property<br/>Value</p>
                 </div>
                 <div className="flex flex-col items-center gap-1 w-1/4">
                    <div className="text-green-600"><ShieldCheck size={24} strokeWidth={1.5} /></div>
                    <p className="font-semibold text-[10px] text-center text-gray-600 leading-tight">Protection Against<br/>Rising Rates</p>
                 </div>
                 <div className="flex flex-col items-center gap-1 w-1/4">
                    <div className="text-green-600"><Leaf size={24} strokeWidth={1.5} /></div>
                    <p className="font-semibold text-[10px] text-center text-gray-600 leading-tight">Clean & Green<br/>Environment</p>
                 </div>
                 <div className="flex flex-col items-center gap-1 w-1/4">
                    <div className="text-green-600"><Zap size={24} strokeWidth={1.5} /></div>
                    <p className="font-semibold text-[10px] text-center text-gray-600 leading-tight">Energy<br/>Independence</p>
                 </div>
              </div>
           </div>

           <div className="w-[30%] bg-green-50/50 rounded-xl border border-green-100 p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-green-700 font-bold uppercase tracking-widest text-sm mb-6">RETURN ON<br/>INVESTMENT</h3>
              <div className="w-32 h-32 border-[12px] border-green-500 rounded-full flex items-center justify-center mb-16 shadow-lg bg-white relative">
                 <Banknote size={40} className="text-green-600" />
                 <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 text-white shadow-md"><TrendingUp size={24}/></div>
              </div>

              <h4 className="font-bold text-gray-800 uppercase tracking-widest mb-4 whitespace-nowrap text-[13px]">PAYBACK PERIOD</h4>
              <p className="text-6xl font-black text-green-600 mb-2">{data.paybackPeriod}</p>
              <p className="text-xl font-bold text-green-600 tracking-widest">YEARS</p>
              <p className="text-sm text-gray-500">(Approx.)</p>
           </div>
        </div>
      </PageWrapper>

      {/* Page 6: Price Quotation */}
      <PageWrapper>
         <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">PRICE QUOTATION</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 6</div>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
           <h3 className="text-[#1e3a5f] text-[15px] font-bold tracking-widest mb-6 uppercase border-b pb-2">PROJECT COST SUMMARY</h3>
           
           <div className="border border-gray-300 rounded-lg overflow-hidden mb-12">
              <table className="w-full text-left text-[15px]">
                 <thead className="bg-[#e27d28] text-white">
                    <tr>
                       <th className="py-4 px-6 font-semibold w-2/3 border-r border-[#c2651b]">Particulars</th>
                       <th className="py-4 px-6 font-semibold text-center">Amount (₹)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200">
                    <tr>
                       <td className="py-5 px-6 font-medium text-gray-800 border-r border-gray-200 bg-gray-50/50">Total System Cost ({data.installedCapacity} kW)</td>
                       <td className="py-5 px-6 text-center font-semibold bg-gray-50/50">₹ {data.totalCost.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                       <td className="py-5 px-6 font-medium text-gray-800 border-r border-gray-200">Less: Government Subsidy (Approx.)</td>
                       <td className="py-5 px-6 text-center font-bold text-green-600">₹ {data.subsidyAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-green-100">
                       <td className="py-6 px-6 font-bold text-green-800 text-lg uppercase border-r border-green-200">Customer Investment</td>
                       <td className="py-6 px-6 text-center font-bold text-green-800 text-lg">₹ {data.customerInvestment?.toLocaleString('en-IN') || (data.totalCost - data.subsidyAmount).toLocaleString('en-IN')}</td>
                    </tr>
                 </tbody>
              </table>
           </div>

           <div className="flex gap-10 mt-auto bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex-[0.6]">
                 <h3 className="text-[#1e3a5f] text-[15px] font-bold tracking-widest mb-6 uppercase">What's Included</h3>
                 <ul className="space-y-4">
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> High Efficiency Solar Panels</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> On Grid Inverter</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> Hot Dip GI Structure</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> AC / DC Cables & Protection</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> Installation & Commissioning</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> Net Metering Assistance</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> Transportation</li>
                    <li className="flex gap-3 items-center text-gray-700 font-medium text-[13px]"><CheckCircle2 className="text-green-500 bg-white rounded-full" size={20}/> Complete Documentation Support</li>
                 </ul>
              </div>
              
              <div className="flex-[0.4] bg-[#1e3a5f] rounded-xl text-center flex flex-col items-center justify-center p-8 text-white relative overflow-hidden shadow-md border border-[#2a4d7d]">
                 <div className="absolute inset-0 bg-[#e27d28]/10"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <Medal size={64} className="text-[#e27d28] mb-6 drop-shadow-md" strokeWidth={1.5} />
                    <p className="font-bold text-xl tracking-widest mb-2 text-white shadow-sm">BEST QUALITY</p>
                    <p className="font-bold text-xl tracking-widest mb-2 text-[#a8c6e6] shadow-sm">BEST PRICE</p>
                    <p className="font-bold text-xl tracking-widest mb-6 text-white shadow-sm">BEST SERVICE</p>
                    <div className="w-16 h-1 bg-[#e27d28] mb-4"></div>
                    <p className="text-[#e27d28] font-bold text-[15px] uppercase tracking-widest">Our Promise</p>
                 </div>
              </div>
           </div>
        </div>
      </PageWrapper>

      {/* Pages 7 & 8 Wrapper to match width/height and pair correctly for print if they were half. 
          Actually wait, the design shows them as full portrait pages. So I will keep them a PageWrapper each! */}
      
      {/* Page 7: Terms & Conditions */}
      <PageWrapper>
         <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">TERMS & CONDITIONS</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 7</div>
          </div>
        </div>
            
        <div className="p-10 flex-1 flex flex-col">
           <h3 className="text-[#1e3a5f] text-[15px] font-bold tracking-widest mb-6 border-b pb-2 uppercase">NEXT STEPS</h3>
           
           <div className="mb-8 pl-4">
              <ol className="list-decimal space-y-4 text-gray-800 font-medium text-[15px] pl-6">
                 <li>Customer reviews data and issues Purchase Order</li>
                 <li>r. s. bhandari Solar Energy Solutions will conduct a detailed project analysis along with 2D drawings</li>
                 <li>Installation as per the project plan</li>
              </ol>
           </div>

           <h3 className="text-[#1e3a5f] text-[15px] font-bold tracking-widest mb-6 border-b pb-2 uppercase">PAYMENT TERMS</h3>
           
           <div className="mb-8 pl-4">
              <ul className="space-y-3 text-gray-800 font-medium text-[15px] pl-2">
                 <li className="flex gap-4 items-center"><div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#e27d28]"></div> {data.paymentAdvance || 70}% advance along with purchase order</li>
                 <li className="flex gap-4 items-center"><div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#e27d28]"></div> {data.paymentDelivery || 20}% on supply of material</li>
                 <li className="flex gap-4 items-center"><div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#e27d28]"></div> {data.paymentInstallation || 5}% on installation</li>
                 <li className="flex gap-4 items-center"><div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#e27d28]"></div> {data.paymentCommissioning || 5}% on commissioning</li>
              </ul>
           </div>

           <h3 className="text-[#1e3a5f] text-[15px] font-bold tracking-widest mb-6 border-b pb-2 uppercase">KEY POINTS</h3>
           <ol className="list-decimal space-y-3 mb-6 pl-10 text-[14px] text-gray-800 font-medium">
              <li className="pl-2">A detailed site survey needs to be done before Analising the proposal.</li>
              <li className="pl-2">Please cross check the contract load at the site before Analising the proposal.</li>
              <li className="pl-2">All Materials, Transport, are use as per Site and Project required T & C Apply</li>
              <li className="pl-2">Local Taxes Extra. Bond paper Charges Extra. Additional Load Charges Extra.</li>
              <li className="pl-2">Time Required for Net meter installation and commissioning depends on the time taken by the MSEB officer.</li>
              <li className="pl-2">AMC Contract {data.amcCost.toLocaleString('en-IN')}/- Year Without Material, cost should be paid by customer. We are Providing only Service. C&T Apply.</li>
              <li className="pl-2">Project Insurance charges should be paid by customer.</li>
              <li className="pl-2">Net metering should be done after receiving full payment.</li>
           </ol>
        </div>
      </PageWrapper>

      {/* Page 8: Acceptance */}
      <PageWrapper>
         <div className="bg-[#1e3a5f] text-white p-10 py-12 relative overflow-hidden flex items-center min-h-[140px]">
          <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-[#e27d28] -skew-x-[35deg] translate-x-[250px] origin-bottom-right"></div>
          <div className="relative z-10 w-full flex justify-between items-center">
            <h2 className="text-4xl font-bold tracking-widest text-white">ACCEPTANCE</h2>
            <div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 8</div>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
           <p className="text-gray-700 mb-12 font-medium text-lg leading-relaxed bg-gray-50 p-6 rounded-lg border border-gray-200">
              I / We hereby confirm acceptance of this proposal and agree to the terms & conditions mentioned above.
           </p>
           
           <div className="space-y-8 mb-16 px-6">
              <div className="flex gap-6 items-end">
                 <span className="w-40 font-bold text-gray-600 uppercase text-sm tracking-wider">Customer Name :</span>
                 <span className="flex-1 font-semibold text-gray-900 border-b-2 border-gray-300 pb-2 text-[17px]">{data.name}</span>
              </div>
              <div className="flex gap-6 items-end">
                 <span className="w-40 font-bold text-gray-600 uppercase text-sm tracking-wider">Signature :</span>
                 <span className="flex-1 border-b-2 border-gray-300 pb-2 h-10 relative">
                    {data.customerSignature && (
                      <img src={data.customerSignature} alt="Signature" className="w-32 h-16 object-contain mix-blend-multiply absolute bottom-0 left-0" />
                    )}
                 </span>
              </div>
              <div className="flex gap-6 items-end">
                 <span className="w-40 font-bold text-gray-600 uppercase text-sm tracking-wider">Date :</span>
                 <span className="flex-1 border-b-2 border-gray-300 pb-2 font-semibold text-gray-900 text-[17px]">{safeFormatDate(data.proposalDate, 'dd-MM-yyyy')}</span>
              </div>
              <div className="flex gap-6 items-end">
                 <span className="w-40 font-bold text-gray-600 uppercase text-sm tracking-wider">Place :</span>
                 <span className="flex-1 border-b-2 border-gray-300 pb-2 font-semibold text-gray-900 text-[17px]">{data.address.split(',').pop()?.trim()}</span>
              </div>
           </div>

           <div className="flex justify-between items-end mb-auto pt-10 px-10">
              <div className="flex flex-col items-center">
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">COMPANY SEAL</p>
                 <div className="w-32 h-auto flex flex-col items-center justify-center mix-blend-multiply opacity-50">
                    {/* Placeholder for actual seal if distinct from sign */}
                 </div>
              </div>
              <div className="flex flex-col items-center text-center -mt-6">
                 <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 whitespace-nowrap">AUTHORIZED SIGNATORY</p>
                 <Stamp />
                 <p className="font-bold text-[13px] uppercase tracking-widest text-[#1e3a5f] border-t-2 border-[#1e3a5f] pt-4 px-4 whitespace-nowrap mt-2">r. s. bhandari Solar Energy Solutions</p>
              </div>
           </div>

           <div className="text-center mt-12 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-4 text-[#e27d28] rounded-full border border-orange-100 shadow-sm h-16 w-16 flex items-center justify-center">
                 <ThumbsUp size={32} />
              </div>
              <h3 className="text-5xl font-black text-[#1e3a5f] mt-4 mb-4" style={{fontFamily: 'Caveat, cursive'}}>Thank You!</h3>
              <p className="text-gray-600 font-medium text-[15px]">We look forward to working with you<br/>towards a brighter & greener future.</p>
           </div>
        </div>
      </PageWrapper>

      {/* Footer / Bank Details / Contact Us block (Page 8 / Bottom Block) */}
      <div className="w-[794px] bg-white border border-gray-200 shadow-lg print:shadow-none mb-8 flex flex-col relative" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
         <div className="flex divide-x divide-gray-200 border-b border-gray-200">
             <div className="flex-1 p-8 bg-gray-50">
                <h3 className="font-bold text-[#1e3a5f] uppercase tracking-wider mb-6 border-b border-gray-300 pb-2">BANK DETAILS</h3>
                <div className="grid grid-cols-[130px_1fr] gap-y-3 text-[14px] text-gray-700">
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase">Account Name</div><div className="font-semibold text-gray-900">: r. s. bhandari Solar Energy Solutions</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase mt-2">Bank Name</div><div className="font-semibold text-gray-900 mt-2">: State Bank of India</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase">Branch</div><div className="font-semibold text-gray-900">: Patni Chowk, Washim 444 505</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase mt-2">A/C Number</div><div className="font-bold text-gray-900 mt-2 text-base tracking-widest">: 37748474127</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase">IFSC Code</div><div className="font-semibold text-gray-900">: SBIN0000503</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase mt-2">PAN Card</div><div className="font-semibold text-gray-900 mt-2">: BXPPB1277F</div>
                   <div className="font-bold text-gray-600 text-xs tracking-widest uppercase">GSTIN No.</div><div className="font-semibold text-gray-900">: 27BXPPB1277F1ZG</div>
                </div>
             </div>
             
             <div className="flex-1 p-8 flex flex-col items-center justify-center bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[#e27d28]/5"></div>
                <div className="relative z-10 w-full mb-6">
                    <Logo size="sm" className="justify-center" />
                </div>
             </div>
         </div>

         <div className="flex p-8 items-center bg-white justify-between">
            <div className="flex-1 pr-6">
               <h3 className="font-bold text-[#1e3a5f] uppercase tracking-wider mb-6 border-b border-gray-300 pb-2">CONTACT US</h3>
               <div className="space-y-4 text-[14px] text-gray-700">
                  <div className="flex items-center gap-4"><div className="bg-[#1e3a5f] p-2 rounded-full text-white"><HeadphonesIcon size={18}/></div> <span className="font-bold text-gray-900 text-base">+91 942 293 9036</span></div>
                  <div className="flex items-center gap-4"><div className="bg-[#1e3a5f] p-2 rounded-full text-white"><FileCheck size={18}/></div> <span className="font-semibold">rsbenergys@gmail.com</span></div>
                  <div className="flex items-start gap-4 mt-6">
                     <div className="bg-[#1e3a5f] p-2 rounded-full text-white shrink-0 mt-1"><MapIcon size={18}/></div> 
                     <div>
                        <p className="font-semibold text-gray-900 mb-1">Head Office:</p>
                        <p className="text-sm text-gray-600 mb-3">"SAMAYSAR" Jain Colony, Pusad Naka, Washim 444505</p>
                        <p className="font-semibold text-gray-900 mb-1">Branch Office:</p>
                        <p className="text-sm text-gray-600">"Seren County" B 302 Vadgaon Sinhagad Road, Dhayari, Pune 411041</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 bg-gray-50 shadow-sm">
               <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-4">
                  {/* Dummy QR Code */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/919422939036" alt="QR Code" className="w-[120px] h-[120px] opacity-90" />
               </div>
               <div className="bg-[#e27d28] text-white text-[12px] font-bold px-8 py-2 rounded-full w-full text-center uppercase tracking-widest shadow-md">SCAN ME</div>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-3">For More Details</p>
            </div>
         </div>
      </div>
    </div>
  );
};

// Extracted dummy icons for layout that lucide might not perfectly map
const UsersGroupIcon = (props:any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const LineChartIcon = (props:any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
const MapIcon = (props:any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
const SmileIcon = (props:any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>

