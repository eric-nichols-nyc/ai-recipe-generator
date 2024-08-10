// components/RecipeDisplay.tsx
import { motion } from 'framer-motion';
import Markdown from "react-markdown";
import MarkdownTitleExtractor from "./MarkdownTitleExtractor";
const RecipeDisplay = ({ recipe }: { recipe: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Markdown>{recipe}</Markdown>
      </motion.div>
  );
};

export default RecipeDisplay;
