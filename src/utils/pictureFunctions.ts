const calculateSize = (img: HTMLImageElement, maxWidth: number, maxHeight: number) => {
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
};

const getFileSizeFromCanvas = (canvas: HTMLCanvasElement, quality: number): Promise<number> => {
  const FILE_TYPE = 'image/jpeg';
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], 'product_image.jpg', { type: 'image/jpg', lastModified: new Date().getTime() });
          resolve(file.size);
        }
      },
      FILE_TYPE,
      quality
    );
  });
};

export const compressImage = (file: File, saveImgFile: (file: File) => void) => {
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 600;
  const FILE_TYPE = 'image/jpeg';
  let quality = 1;

  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  img.onerror = () => {
    URL.revokeObjectURL(img.src);
    console.log('Cannot load image');
  };
  img.onload = () => {
    URL.revokeObjectURL(img.src);
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, newWidth, newHeight);

    let stopped = false;
    const loop = async () => {
      while (!stopped) {
        let fileSize = await getFileSizeFromCanvas(canvas, quality);
        if (fileSize < 100000) {
          stopped = true;
        } else {
          quality -= 0.1;
        }
      }
    };

    loop().then(() => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], 'product_image.jpg', {
              type: 'image/jpg',
              lastModified: new Date().getTime(),
            });
            saveImgFile(file);
          }
        },
        FILE_TYPE,
        quality
      );
    });
  };
};
