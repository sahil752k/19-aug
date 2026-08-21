import re
with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

old_print = '''  const handlePrint = async () => {
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
  };'''

new_print = '''  const handlePrint = () => {
    // We use native window.print() as the CSS is already optimized for printing
    // This is significantly faster and more reliable across all browsers
    window.print();
  };'''

content = content.replace(old_print, new_print)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)

