const loadImage = (path: string): Promise<HTMLImageElement> => {
  const image = new Image();

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    try {
      image.onload = () => resolve(image);
    } catch (error) {
      image.onerror = () =>
        reject(new Error(`Problem with image file: ${path}`));
    }
  });

  image.src = path;

  return promise;
};

const getImageOrientation = (image: HTMLImageElement): string => {
  const { height } = image;
  const { width } = image;

  const shouldBeLandscape = width > height;

  switch (shouldBeLandscape) {
    case true:
      return 'landscape';
    default:
      return 'portrait';
  }
};

export { getImageOrientation, loadImage };
