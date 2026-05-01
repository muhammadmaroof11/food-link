/**
 * FoodLink Image Optimization Engine
 * Converts any upload (PNG/JPG) to a compressed WebP signal client-side.
 */
export const optimizeImage = (file, maxWidth = 1000, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maintain Aspect Ratio
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a new File object from the blob
            const optimizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
              type: 'image/webp',
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          } else {
            reject(new Error('Image compression failed'));
          }
        }, 'image/webp', quality);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
};
