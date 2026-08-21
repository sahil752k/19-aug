export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export async function getCroppedImg(
  imageSrc: string,
  percentCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;
  
  const pixelWidth = (percentCrop.width / 100) * naturalWidth;
  const pixelHeight = (percentCrop.height / 100) * naturalHeight;
  const pixelX = (percentCrop.x / 100) * naturalWidth;
  const pixelY = (percentCrop.y / 100) * naturalHeight;

  canvas.width = pixelWidth;
  canvas.height = pixelHeight;

  ctx.drawImage(
    image,
    pixelX,
    pixelY,
    pixelWidth,
    pixelHeight,
    0,
    0,
    pixelWidth,
    pixelHeight
  );

  return canvas.toDataURL('image/png');
}
