import React, { useState } from 'react';
import { DataForm } from './DataForm';
import { DocumentViewer } from './DocumentViewer';
import { SavedDrafts } from './SavedDrafts';
import { LayoutDashboard, FileText, Save, Settings, Printer, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'drafts'>('form');
  const { saveDraft } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col md:flex-row print:bg-white print:block">
      {/* Sidebar - hidden when printing */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-gray-900 via-[#1e2a4a] to-gray-900 text-white flex flex-col print:hidden shadow-[8px_0_30px_rgba(0,0,0,0.15)] relative z-20 border-r border-[#ffffff10]">
        <div className="p-6 pb-6 border-b border-gray-800/60 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <a href="https://rsbhandari0.netlify.app/" target="_self" className="flex items-center gap-4 relative z-10 hover:opacity-90 transition-opacity cursor-pointer">
            <div className="w-12 h-12 bg-white/5 backdrop-blur shadow-inner border border-white/10 p-1.5 rounded-[12px] flex items-center justify-center shrink-0 transition-transform hover:scale-105 duration-300">
              <img src="https://cdn.jsdelivr.net/gh/sahil752k/solar-biling-software-sumit-bhandari@main/ChatGPT_Image_Jun_13__2026__03_30_24_PM-removebg-preview.png" alt="Logo" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[19px] font-extrabold tracking-tight text-white leading-none drop-shadow-sm">R. S. Bhandari</h1>
              <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider leading-none mt-1.5">Document Generator</p>
            </div>
          </a>
        </div>

        <nav className="flex-1 p-5 space-y-2.5">
          <button
            onClick={() => setActiveTab('form')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'form' ? 'bg-[#f5a623] text-gray-900 shadow-lg shadow-yellow-500/20 translate-x-1' : 'hover:bg-white/5 text-gray-300 hover:text-white'
            }`}
          >
            <Settings size={20} className={activeTab === 'form' ? 'text-gray-900' : 'text-gray-400'} />
            Data Entry
          </button>
          
          <button
            onClick={() => setActiveTab('preview')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'preview' ? 'bg-[#f5a623] text-gray-900 shadow-lg shadow-yellow-500/20 translate-x-1' : 'hover:bg-white/5 text-gray-300 hover:text-white'
            }`}
          >
            <FileText size={20} className={activeTab === 'preview' ? 'text-gray-900' : 'text-gray-400'} />
            Preview & Print
          </button>
          
          <button
            onClick={() => setActiveTab('drafts')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'drafts' ? 'bg-[#f5a623] text-gray-900 shadow-lg shadow-yellow-500/20 translate-x-1' : 'hover:bg-white/5 text-gray-300 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} className={activeTab === 'drafts' ? 'text-gray-900' : 'text-gray-400'} />
            Saved Drafts
          </button>
        </nav>

        <div className="p-5 border-t border-gray-800/60 bg-gray-900/50">
          <button
            onClick={saveDraft}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-gray-800/80 hover:bg-white hover:text-gray-900 border border-gray-700 hover:border-white text-white rounded-xl transition-all duration-300 shadow-md group font-medium"
          >
            <Save size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            Save Progress
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
        {activeTab === 'form' && (
          <div className="flex-1 overflow-y-auto print:overflow-visible">
            <DataForm onNext={() => setActiveTab('preview')} />
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-hidden flex flex-col print:overflow-visible">
            <DocumentViewer />
          </div>
        )}
        {activeTab === 'drafts' && (
          <div className="flex-1 overflow-y-auto print:overflow-visible">
            <SavedDrafts onSelect={() => setActiveTab('form')} />
          </div>
        )}
      </main>
    </div>
  );
};
