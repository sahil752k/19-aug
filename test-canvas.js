import { createCanvas } from 'canvas';
const canvas = createCanvas(800, 1100);
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0,0,800,1100);
ctx.fillStyle = 'black';
for(let i=0; i<100; i++) {
  ctx.fillText("This is some text " + i, 50, 50 + i*10);
}
const jpeg = canvas.toDataURL('image/jpeg', 0.2);
console.log(jpeg.length);
