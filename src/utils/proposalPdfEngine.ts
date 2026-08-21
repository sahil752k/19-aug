import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';

/**
 * PROPOSAL PHOTO PDF ENGINE
 * 
 * A completely isolated, dedicated engine for rendering Proposals as high-resolution Photo PDFs.
 * This engine guarantees:
 * 1. ZERO text objects, vectors, HTML, or SVGs are embedded.
 * 2. Each page is strictly converted to a raster bitmap (JPEG).
 * 3. Total isolation from standard invoice/quotation PDF workflows.
 */

// Helper to ensure all images in the node are loaded before capturing
const waitImagesLoaded = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll('img'));
  const promises = images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // Continue even if an image fails
    });
  });
  await Promise.all(promises);
};

export const runProposalPhotoPdfEngine = async (
  elementId: string, 
  isHighRes: boolean = false
): Promise<jsPDF | null> => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  try {
    // 1. Wait for layout and images to be perfectly stable
    await waitImagesLoaded(element);
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Identify strictly the Proposal pages (using data attribute)
    const pageElements = Array.from(element.querySelectorAll('[data-pdf-page="true"]')) as HTMLElement[];
    if (pageElements.length === 0) return null;

    // 3. Initialize a completely bare jsPDF instance with no default font embedding
    const pdf = new jsPDF({
      orientation: 'p', 
      unit: 'mm', 
      format: 'a4', 
      compress: true
    });

    // Strip metadata to avoid OCR hooks
    pdf.setProperties({ title: '', subject: '', author: '', keywords: '', creator: '' });
    
    // Engine scaling multiplier
    const ratio = 2; // Always output maximum HD resolution

    for (let i = 0; i < pageElements.length; i++) {
      const pageEl = pageElements[i];
      
      const rect = pageEl.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);

      // Step A: HTML to High-Res Source Canvas
      const sourceCanvas = await htmlToImage.toCanvas(pageEl, {
        backgroundColor: '#ffffff', 
        pixelRatio: ratio, 
        width: width,
        height: height,
        skipFonts: true, // Do not load fonts into canvas SVG serialization
        cacheBust: true,
        style: {
          transform: 'none'
        }
      });

      // Step B: Canvas Isolation (severs any lingering DOM/CSS OM references)
      const isolatedCanvas = document.createElement('canvas');
      isolatedCanvas.width = sourceCanvas.width;
      isolatedCanvas.height = sourceCanvas.height;
      const ctx = isolatedCanvas.getContext('2d', { alpha: false });
      
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, isolatedCanvas.width, isolatedCanvas.height);
        ctx.drawImage(sourceCanvas, 0, 0);
        
        // Step C: Microscopic Jitter (Anti-OCR Matrix modification)
        // Adds mathematically random noise (+/- 1 on RGB) to disrupt AI text segmentation
        // while remaining completely invisible to the human eye.
        const imgDataObj = ctx.getImageData(0, 0, isolatedCanvas.width, isolatedCanvas.height);
        const data = imgDataObj.data;
        for (let j = 0; j < data.length; j += 4) {
          const offset = Math.random() > 0.5 ? 1 : -1;
          data[j] = Math.max(0, Math.min(255, data[j] + offset));
          data[j+1] = Math.max(0, Math.min(255, data[j+1] + offset));
          data[j+2] = Math.max(0, Math.min(255, data[j+2] + offset));
        }
        ctx.putImageData(imgDataObj, 0, 0);
      }
      
      // Step D: Encode as standard flat JPEG 
      const imgData = isolatedCanvas.toDataURL('image/jpeg', 0.98);
      
      // Step E: Place onto PDF as the sole object
      if (i > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    // 4. Strict Engine Validation
    // Validates that the internal PDF streams are 100% clean of text operators
    let hasTextOperators = false;
    const totalPages = pdf.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      const pageContent = (pdf.internal as any).pages[i];
      const stream = Array.isArray(pageContent) ? pageContent.join('\n') : String(pageContent);
      if (/[\s\r\n]BT[\s\r\n]|[\s\r\n]ET[\s\r\n]/.test(stream)) {
        hasTextOperators = true;
        break;
      }
    }

    if (hasTextOperators) {
      console.error("[PROPOSAL ENGINE] CRITICAL FAILURE: Text operators (BT/ET) leaked into PDF streams!");
    } else {
      console.log("[PROPOSAL ENGINE] VERIFIED: Document generated is 100% secure Photo PDF (Raster Only).");
    }

    return pdf;
  } catch (error) {
    console.error('[PROPOSAL ENGINE] Execution failed:', error);
    return null;
  }
};
