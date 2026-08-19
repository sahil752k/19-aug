import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

target = """    try {
      // Ensure all images are fully loaded and layout has settled
      await waitImagesLoaded(element);
      // Adding a small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));
          
      const baseScale = isCompressedDoc ? 2.5 : 3;"""

if target in content:
    print("TARGET FOUND")
else:
    print("TARGET NOT FOUND")
