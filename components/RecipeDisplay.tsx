// components/RecipeDisplay.tsx
import { motion } from 'framer-motion';
import Markdown from "react-markdown";
const RecipeDisplay = ({ recipe }: { recipe: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <h2 className="text-xl font-bold">Generated Recipe</h2>
      <Markdown>{recipe}</Markdown>
      </motion.div>
  );
};

export default RecipeDisplay;
