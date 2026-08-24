import { jsPDF } from "jspdf";
const pdf = new jsPDF();
try {
  const canvas = document.createElement('canvas');
  canvas.width = 100; canvas.height = 100;
  const data = canvas.toDataURL('image/webp', 0.8);
  pdf.addImage(data, 'WEBP', 0, 0, 100, 100);
  console.log("WEBP supported!");
} catch (e) {
  console.log("WEBP not supported: " + e.message);
}
