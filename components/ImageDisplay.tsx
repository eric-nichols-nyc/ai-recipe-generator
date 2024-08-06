// components/ImageDisplay.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
const ImageDisplay = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 border rounded"
    >
      <h2 className="text-xl font-bold">Generated Image</h2>
      <Image
            src={imageUrl}
            alt="Sample image"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
    </motion.div>
  );
};

export default ImageDisplay;
