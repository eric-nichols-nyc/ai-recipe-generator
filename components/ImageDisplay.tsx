// components/ImageDisplay.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
const ImageDisplay = ({ imageUrl }: { imageUrl: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
      <Image
            src={imageUrl}
            alt="Sample image"
            width={400}
            height={400}
            className={`
              duration-700 ease-in-out rounded-lg
              ${isLoading 
                ? 'scale-105 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0'}
            `}
            onLoadingComplete={() => setLoading(false)}
          />
  );
};

export default ImageDisplay;
