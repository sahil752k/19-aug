import React, { useState, useEffect } from 'react';
import { Printer, Download, DownloadCloud, Image as ImageIcon } from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { runProposalPhotoPdfEngine } from '../utils/proposalPdfEngine';
import { useAppContext } from '../context/AppContext';
import { AnnexureI } from '../templates/AnnexureI';
import { ModelAgreement } from '../templates/ModelAgreement';
import { Annexure3 } from '../templates/Annexure3';
import { Receipt } from '../templates/Receipt';
import { WCR } from '../templates/WCR';
import { Invoice } from '../templates/Invoice';
import { Proposal } from '../templates/Proposal';

export type DocType = 'AnnexureI' | 'ModelAgreement' | 'Annexure3' | 'Receipt' | 'WCR' | 'Invoice' | 'Proposal';

type LoadingAction = 'single' | 'all' | 'print' | 'photopdf' | null;

const waitImagesLoaded = async (parent: HTMLElement) => {
  const imgs = Array.from(parent.querySelectorAll('img'));
  await Promise.all(
    imgs.map(
      img =>
        new Promise<void>(resolve => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
    )
  );
};

export const DocumentViewer: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<DocType>('Proposal');
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const { data } = useAppContext();
  
  const customerName = data?.name ? data.name : 'Customer';
  
  // Override browser print with our flattened version
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoc, data]);

  const tabs: { id: DocType; label: string }[] = [
    { id: 'AnnexureI', label: 'Annexure-I' },
    { id: 'ModelAgreement', label: 'Model Agreement' },
    { id: 'Annexure3', label: 'Annexure 3' },
    { id: 'Receipt', label: 'Receipt' },
    { id: 'WCR', label: 'WCR' },
    { id: 'Invoice', label: 'Tax Invoice' },
    { id: 'Proposal', label: 'Proposal' },
  ];

  const generatePDF = async (elementId: string): Promise<jsPDF | null> => {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Check if this document should be compressed
    const isCompressedDoc = ['AnnexureI', 'ModelAgreement', 'Annexure3', 'WCR'].some(docId => elementId.includes(docId));
    
    try {
      // Ensure all images are fully loaded and layout has settled
      await waitImagesLoaded(element);
      // Adding a small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generic multi-page logic for other documents
      // High baseScale for sharper HD look across all documents
      const baseScale = isCompressedDoc ? 2.5 : 4.5; 
      const rect = element.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      
      const parentRect = element.getBoundingClientRect();
      const pageBreakNodes = Array.from(element.querySelectorAll(
        '.page-break, [style*="break-after"], [style*="page-break-after"], [style*="break-before"], [style*="page-break-before"]'
      )) as HTMLElement[];
      const breakOffsets: number[] = [];
      
      pageBreakNodes.forEach(node => {
        const r = node.getBoundingClientRect();
        const styleStr = node.getAttribute('style') || '';
        if (styleStr.includes('break-before') || styleStr.includes('page-break-before')) {
          breakOffsets.push(r.top - parentRect.top);
        } else if (styleStr.includes('break-after') || styleStr.includes('page-break-after')) {
          breakOffsets.push(r.bottom - parentRect.top);
        } else {
          breakOffsets.push(r.top - parentRect.top);
        }
      });
      
      breakOffsets.sort((a, b) => a - b);
      
      // Dynamic paragraph/block breaking fallback
      if (breakOffsets.length === 0) {
        const selectors = 'p, h2, h3, h4, tr, ul, ol, li, .break-inside-avoid';
        const nodes = Array.from(element.querySelectorAll(selectors)) as HTMLElement[];
        const a4PageHeight = 1060; 
        let currentBreakPoint = a4PageHeight;
        let lastValidBreakOffset = 0;
        
        const nodeOffsets = nodes
          .map(node => {
            const rn = node.getBoundingClientRect();
            return {
              top: rn.top - parentRect.top,
              bottom: rn.bottom - parentRect.top,
              height: rn.height
            };
          })
          .filter(item => item.height > 0)
          .sort((a, b) => a.top - b.top);
          
        for (const item of nodeOffsets) {
          if (item.bottom > currentBreakPoint) {
            if (lastValidBreakOffset > currentBreakPoint - a4PageHeight) {
              breakOffsets.push(lastValidBreakOffset);
              currentBreakPoint = lastValidBreakOffset + a4PageHeight;
            } else {
              breakOffsets.push(item.top);
              currentBreakPoint = item.top + a4PageHeight;
            }
          }
          lastValidBreakOffset = item.top;
        }
      }
      
      const pages: { start: number; end: number }[] = [];
      let currentStart = 0;
      for (const offset of breakOffsets) {
        if (offset - currentStart > 100) { 
          pages.push({ start: currentStart, end: offset });
          currentStart = offset;
        }
      }
      if (height - currentStart > 50) {
        pages.push({ start: currentStart, end: height });
      }
      
      // Capture whole document as a Canvas first
      const fullCanvas = await htmlToImage.toCanvas(element, {
        backgroundColor: '#ffffff',
        pixelRatio: baseScale,
        skipFonts: false,
        cacheBust: true,
        style: {
          userSelect: 'none',
          webkitUserSelect: 'none'
        }
      });

      const firstPageHeight = (pages.length > 0 && pages[0] ? pages[0].end - pages[0].start : height) * 210 / width;
      const pdfWidth = 210;

      const buildPdf = (renderScale: number, format: 'PNG' | 'JPEG', quality: number, posterize: boolean) => {
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: [210, Math.max(297, firstPageHeight)],
          compress: true
        });
        
        pdf.setProperties({
          title: `${customerName} Document`,
          subject: 'Rasterized Non-Editable Document',
          creator: 'Document Generator'
        });
        
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const sliceHeight = page.end - page.start;
          const pagePdfHeight = (sliceHeight * pdfWidth) / width;
          
          if (i > 0) {
            pdf.addPage([210, Math.max(297, pagePdfHeight)], 'portrait');
          }
          
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = width * renderScale;
          pageCanvas.height = sliceHeight * renderScale;
          
          const pCtx = pageCanvas.getContext('2d');
          if (pCtx) {
            pCtx.fillStyle = '#ffffff';
            pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            pCtx.drawImage(
              fullCanvas,
              0, page.start * baseScale, fullCanvas.width, sliceHeight * baseScale,
              0, 0, pageCanvas.width, pageCanvas.height
            );

            if (posterize) {
              const imgData = pCtx.getImageData(0, 0, pageCanvas.width, pageCanvas.height);
              const data = imgData.data;
              for (let j = 0; j < data.length; j += 4) {
                const r = data[j];
                const g = data[j+1];
                const b = data[j+2];
                const avg = (r + g + b) / 3;
                
                let val = 255;
                if (avg < 80) val = 0;
                else if (avg < 160) val = 128;
                else if (avg < 220) val = 192;
                
                data[j] = val;
                data[j+1] = val;
                data[j+2] = val;
              }
              pCtx.putImageData(imgData, 0, 0);
            }
          }
          
          const pageImgData = pageCanvas.toDataURL(`image/${format.toLowerCase()}`, quality);
          pdf.addImage(pageImgData, format, 0, 0, pdfWidth, pagePdfHeight, undefined, 'FAST');
        }
        return pdf;
      };

      if (!isCompressedDoc) {
        return buildPdf(baseScale, 'JPEG', 0.95, false);
      }

      // Compression strategy for large documents
      const TARGET_SIZE = 295 * 1024;
      let bestPdf: jsPDF | null = null;
      
      const strategies = [
        { scale: baseScale, format: 'JPEG' as const, q: 0.8, posterize: true },
        { scale: baseScale * 0.8, format: 'JPEG' as const, q: 0.7, posterize: true },
        { scale: baseScale * 0.6, format: 'JPEG' as const, q: 0.6, posterize: true },
        { scale: 1.0, format: 'JPEG' as const, q: 0.5, posterize: false },
      ];

      for (const strat of strategies) {
        await new Promise(resolve => setTimeout(resolve, 10));
        const testPdf = buildPdf(strat.scale, strat.format, strat.q, strat.posterize);
        const size = testPdf.output('arraybuffer').byteLength;
        
        if (size <= TARGET_SIZE) {
          bestPdf = testPdf;
          break;
        }
      }

      if (!bestPdf) {
        bestPdf = buildPdf(0.5, 'JPEG', 0.3, false);
      }

      return bestPdf;
    } catch (err) {
      console.error("Failed to generate PDF", err);
      return null;
    }
  };

  const savePdfWithPadding = (pdf: jsPDF, filename: string, padToSize?: number) => {
    try {
      const pdfBuffer = pdf.output('arraybuffer');
      if (padToSize && pdfBuffer.byteLength < padToSize) {
        const paddingSize = padToSize - pdfBuffer.byteLength;
        const padding = new Uint8Array(paddingSize);
        const blob = new Blob([pdfBuffer, padding], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 10000);
      } else {
        pdf.save(filename);
      }
    } catch (err) {
      console.error("Error generating padded PDF, fallback to normal save:", err);
      pdf.save(filename);
    }
  };

  const isCompressedDocType = (docId: string) => {
    return ['AnnexureI', 'ModelAgreement', 'Annexure3', 'WCR'].includes(docId);
  };

  const handleDownloadSingle = async () => {
    setLoadingAction('single');
    const docLabel = tabs.find(t => t.id === activeDoc)?.label || activeDoc;
    const filename = `${customerName} - ${docLabel}.pdf`;
    
    let pdf: jsPDF | null = null;
    if (activeDoc === 'Proposal') {
      pdf = await runProposalPhotoPdfEngine(`hidden-doc-Proposal`, false);
    } else {
      pdf = await generatePDF(`hidden-doc-${activeDoc}`);
    }

    if (pdf) {
      const padToSize = isCompressedDocType(activeDoc) ? 293 * 1024 : undefined;
      savePdfWithPadding(pdf, filename, padToSize);
    }
    setLoadingAction(null);
  };

  const handleDownloadAll = async () => {
    setLoadingAction('all');
    for (const tab of tabs) {
      const filename = `${customerName} - ${tab.label}.pdf`;
      let pdf: jsPDF | null = null;
      if (tab.id === 'Proposal') {
        pdf = await runProposalPhotoPdfEngine(`hidden-doc-Proposal`, true);
      } else {
        pdf = await generatePDF(`hidden-doc-${tab.id}`);
      }

      if (pdf) {
        const padToSize = isCompressedDocType(tab.id) ? 293 * 1024 : undefined;
        savePdfWithPadding(pdf, filename, padToSize);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    setLoadingAction(null);
  };

  const handlePhotoPDF = async () => {
    if (activeDoc !== 'Proposal') return;
    
    setLoadingAction('photopdf');
    const pdf = await runProposalPhotoPdfEngine('preview-container', true);
    if (pdf) {
      pdf.save(`${customerName} - Proposal (Photo HD).pdf`);
    }
    setLoadingAction(null);
  };

  const handlePrint = async () => {
    setLoadingAction('print');
    
    let pdf: jsPDF | null = null;
    if (activeDoc === 'Proposal') {
      pdf = await runProposalPhotoPdfEngine('preview-container', false);
    } else {
      pdf = await generatePDF(`preview-container`);
    }

    if (pdf) {
      // For non-editable printing, we use the flattened PDF blob
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      
      // Use hidden iframe to trigger print dialog for the PDF blob
      // This is more reliable than window.open and bypasses most popup blockers
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.src = url;
      
      document.body.appendChild(iframe);
      
      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        
        // Cleanup after a delay
        setTimeout(() => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        }, 2000);
      };
    } else {
      window.print();
    }
    setLoadingAction(null);
  };


  return (
    <div className="flex flex-col h-full print:h-auto print:block relative bg-[#f8fafc]">
      {/* Top action bar - hidden in print */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden sticky top-0 z-10 shadow-sm">
        <div className="flex bg-gray-100/80 p-1.5 rounded-xl overflow-x-auto max-w-full ring-1 ring-gray-900/5 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDoc(tab.id)}
              disabled={!!loadingAction}
              className={`px-5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-300 ${
                activeDoc === tab.id ? 'bg-white text-gray-900 shadow shadow-gray-200/50 scale-100' : 'text-gray-500 hover:text-gray-800 hover:bg-white/50 scale-95 hover:scale-100'
              } disabled:opacity-50`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {activeDoc === 'Proposal' && (
            <button
              onClick={handlePhotoPDF}
              disabled={!!loadingAction}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5"
            >
              {loadingAction === 'photopdf' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ImageIcon size={18} />
              )}
              Photo PDF (HD)
            </button>
          )}

          <button
            onClick={handleDownloadAll}
            disabled={!!loadingAction}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-md shadow-yellow-500/20 text-gray-900 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5"
          >
            <DownloadCloud size={18} />
            {loadingAction === 'all' ? 'Generating...' : 'Download All'}
          </button>
          
          <button
            onClick={handleDownloadSingle}
            disabled={!!loadingAction}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <Download size={18} />
            {loadingAction === 'single' ? 'Generating...' : 'Download'}
          </button>

          <button
            onClick={handlePrint}
            disabled={!!loadingAction}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-900 hover:bg-black shadow-md shadow-gray-900/20 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5"
          >
            <Printer size={18} />
            {loadingAction === 'print' ? 'Generating...' : 'Print'}
          </button>
        </div>
      </div>

      {/* Document Render Area */}
      <div className="flex-1 overflow-y-auto print:overflow-visible p-6 md:p-10 flex justify-center items-start print:p-0 print:block">
        <div id="preview-container" className="w-full max-w-[210mm] h-fit print:max-w-full print:min-h-0 bg-white shadow-2xl shadow-gray-300/50 ring-1 ring-gray-900/5 print:shadow-none print:ring-0 relative rounded-sm select-none">
          {activeDoc === 'AnnexureI' && <AnnexureI />}
          {activeDoc === 'ModelAgreement' && <ModelAgreement />}
          {activeDoc === 'Annexure3' && <Annexure3 />}
          {activeDoc === 'Receipt'  && <Receipt />}
          {activeDoc === 'WCR' && <WCR />}
          {activeDoc === 'Invoice' && <Invoice />}
          {activeDoc === 'Proposal' && <Proposal />}
        </div>
      </div>

      {/* Hidden Render Area for 'Download All' feature */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0 print:hidden w-[210mm] select-none">
        <div id="hidden-doc-AnnexureI" className="w-[210mm] bg-white"><AnnexureI /></div>
        <div id="hidden-doc-ModelAgreement" className="w-[210mm] bg-white"><ModelAgreement /></div>
        <div id="hidden-doc-Annexure3" className="w-[210mm] bg-white"><Annexure3 /></div>
        <div id="hidden-doc-Receipt" className="w-[210mm] bg-white"><Receipt /></div>
        <div id="hidden-doc-WCR" className="w-[210mm] bg-white"><WCR /></div>
        <div id="hidden-doc-Invoice" className="w-[210mm] bg-white"><Invoice /></div>
        <div id="hidden-doc-Proposal" className="w-[210mm] bg-white"><Proposal /></div>
      </div>
    </div>
  );
};
