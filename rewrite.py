import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

# Replace DocType
content = content.replace("export type DocType = 'AnnexureI' | 'ModelAgreement' | 'Annexure3' | 'Receipt' | 'WCR' | 'Invoice' | 'Proposal';", 
                          "export type DocType = 'AnnexureI' | 'ModelAgreement' | 'Annexure3' | 'Receipt' | 'WCR' | 'Invoice' | 'Proposal' | 'All';")

# Delete generatePDF, savePdfWithPadding, isCompressedDocType, waitImagesLoaded
# This is tricky with regex, so we'll just slice the file.

# Find the start of waitImagesLoaded
start_idx = content.find("const waitImagesLoaded = async (parent: HTMLElement) => {")
# Find the start of DocumentViewer
comp_idx = content.find("export const DocumentViewer: React.FC = () => {")

new_content = content[:start_idx] + content[comp_idx:]
content = new_content

# Now remove generatePDF, savePdfWithPadding, isCompressedDocType inside DocumentViewer
# We'll use regex to remove them, or just replace handleDownloadSingle and handleDownloadAll.

start_gen = content.find("const generatePDF = async")
end_is_comp = content.find("const handleDownloadSingle = async")

if start_gen != -1 and end_is_comp != -1:
    content = content[:start_gen] + content[end_is_comp:]

# Rewrite handlers
old_single = """  const handleDownloadSingle = async () => {
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
      const padToSize = undefined;
      savePdfWithPadding(pdf, filename, padToSize);
    }
    setLoadingAction(null);
  };"""

new_single = """  const handleDownloadSingle = () => {
    window.print();
  };"""

content = content.replace(old_single, new_single)

old_all = """  const handleDownloadAll = async () => {
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
        const padToSize = undefined;
        savePdfWithPadding(pdf, filename, padToSize);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    setLoadingAction(null);
  };"""

new_all = """  const handleDownloadAll = () => {
    setLoadingAction('all');
    const previousDoc = activeDoc;
    setActiveDoc('All');
    
    setTimeout(() => {
      window.print();
      setActiveDoc(previousDoc);
      setLoadingAction(null);
    }, 500);
  };"""

content = content.replace(old_all, new_all)

# Replace Render Area
old_render = """      <div className="flex-1 overflow-y-auto print:overflow-visible p-6 md:p-10 flex justify-center items-start print:p-0 print:block">
        <div id="preview-container" className="w-full max-w-[210mm] h-fit print:max-w-full print:min-h-0 bg-white shadow-2xl shadow-gray-300/50 ring-1 ring-gray-900/5 print:shadow-none print:ring-0 relative rounded-sm">
          {activeDoc === 'AnnexureI' && <AnnexureI />}
          {activeDoc === 'ModelAgreement' && <ModelAgreement />}
          {activeDoc === 'Annexure3' && <Annexure3 />}
          {activeDoc === 'Receipt'  && <Receipt />}
          {activeDoc === 'WCR' && <WCR />}
          {activeDoc === 'Invoice' && <Invoice />}
          {activeDoc === 'Proposal' && <Proposal />}
        </div>
      </div>"""

new_render = """      <style>{`
        .print-page-break {
          page-break-after: always;
          break-after: page;
        }
        .print-page-break:last-child {
          page-break-after: auto;
          break-after: auto;
        }
      `}</style>
      <div className="flex-1 overflow-y-auto print:overflow-visible p-6 md:p-10 flex justify-center items-start print:p-0 print:block">
        <div id="preview-container" className="w-full max-w-[210mm] h-fit print:max-w-full print:min-h-0 bg-white shadow-2xl shadow-gray-300/50 ring-1 ring-gray-900/5 print:shadow-none print:ring-0 relative rounded-sm">
          {(activeDoc === 'AnnexureI' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><AnnexureI /></div>}
          {(activeDoc === 'ModelAgreement' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><ModelAgreement /></div>}
          {(activeDoc === 'Annexure3' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><Annexure3 /></div>}
          {(activeDoc === 'Receipt'  || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><Receipt /></div>}
          {(activeDoc === 'WCR' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><WCR /></div>}
          {(activeDoc === 'Invoice' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><Invoice /></div>}
          {(activeDoc === 'Proposal' || activeDoc === 'All') && <div className={activeDoc === 'All' ? 'print-page-break' : ''}><Proposal /></div>}
        </div>
      </div>"""

content = content.replace(old_render, new_render)

# Remove Hidden Render Area
hidden_render_start = content.find("{/* Hidden Render Area for 'Download All' feature */}")
if hidden_render_start != -1:
    content = content[:hidden_render_start] + "    </div>\n  );\n};\n"

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
