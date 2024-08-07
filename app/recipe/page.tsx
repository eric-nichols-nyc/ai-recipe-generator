"use client";
// Import necessary dependencies and components
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { readStreamableValue } from "ai/rsc";
import RecipeForm from "@/components/RecipeForm";
import RecipeDisplay from "@/components/RecipeDisplay";
import ImageDisplay from "@/components/ImageDisplay";
import { generateRecipe, getRateLimit } from "@/actions/index";
import { generateImage } from "@/utils/imageGeneration";

// Main component
const Home = () => {
  // State variables
  const [recipe, setRecipe] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle recipe generation
  const handleGenerateRecipe = async (ingredients: string[]) => {
    setError(null);
    setLoading(true);

    try {
      // Check rate limit before proceeding
      await checkRateLimit();
      // Generate recipe and image concurrently
      const [recipeStream, imageUrl] = await Promise.all([
        generateRecipe(ingredients),
        generateImage(ingredients),
      ]);
      
      setImageUrl(imageUrl);
      await processRecipeStream(recipeStream);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to check user's rate limit
  const checkRateLimit = async () => {
    try {
      const userRateLimit = await getRateLimit();
      console.log('userRateLimit', userRateLimit);
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while getting user rate limit.");
    }
  };

  // Function to process the recipe stream
  const processRecipeStream = async (recipeStream: any) => {
    for await (const delta of readStreamableValue(recipeStream)) {
          setRecipe(delta?.toString());
    }
  };

  // Function to handle errors
  const handleError = (error: any) => {
    console.error("Error generating recipe or image:", error);
    setError(error.message || "An error occurred while generating the recipe.");
  };

  // Render the component
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-screen mx-auto flex flex-col items-center max-w-3xl"
    >
      <h1 className="text-3xl font-bold mb-4 mt-7 py-10 px-5 text-center">
        List up to five ingredients you&apos;d like to use up in the recipe,
        separated by commas.
      </h1>
      <RecipeForm onGenerate={handleGenerateRecipe} />
      {error && <ErrorMessage error={error} />}
      {loading ? <LoadingIndicator /> : <RecipeContent recipe={recipe} imageUrl={imageUrl} />}
    </motion.div>
  );
};

// Component to display error messages
const ErrorMessage = ({ error }: { error: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-10 text-red-500"
  >
    {error}
  </motion.div>
);

// Component to display loading indicator
const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mt-10 relative"
  >
    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
    <span className="relative z-10">Thinking...</span>
  </motion.div>
);

// Component to display recipe content and image
const RecipeContent = ({ recipe, imageUrl }: { recipe: string | undefined, imageUrl: string | null }) => (
  <AnimatePresence>
    {recipe && (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse w-full items-center gap-8 px-4 py-12 md:px-6 lg:px-8 lg:py-20 text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full p-8 rounded"
        >
          <RecipeDisplay recipe={recipe} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full flex justify-center"
        >
          {imageUrl && <ImageDisplay imageUrl={imageUrl} />}
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
);

export default Home;
