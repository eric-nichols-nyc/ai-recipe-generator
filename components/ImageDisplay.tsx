// components/ImageDisplay.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ImageDisplay = ({ imageUrl }: { imageUrl: string }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <motion.div
      initial={{ scale: 1.05, filter: 'blur(20px) grayscale(100%)' }}
      animate={{
        scale: isLoading ? 1.05 : 1,
        filter: isLoading ? 'blur(20px) grayscale(100%)' : 'blur(0px) grayscale(0%)',
      }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        aspectRatio: '1/1',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '20px',
      }}
    />
  );
};

export default ImageDisplay;
