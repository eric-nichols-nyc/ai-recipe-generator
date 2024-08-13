"use client";
// Import necessary dependencies and components
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { readStreamableValue } from "ai/rsc";
import RecipeForm from "@/components/RecipeForm";
import ImageDisplay from "@/components/ImageDisplay";
import { generateRecipe, getRateLimit } from "@/actions/index";
import { generateImage } from "@/utils/imageGeneration";
import MarkdownTitleExtractor from "@/components/MarkdownTitleExtractor";
import RecipeParser from "@/components/RecipeParser";
import Image from "next/image";
import RecipeCycler from "@/components/RecipeCycler";

const recipes = [
  "A high-protein vegan breakfast smoothie with spinach, banana, and chia seeds.",
  "Easy whole-wheat blueberry muffins that I can make in 30 minutes.",
  "A gluten-free, dairy-free chocolate cake with no refined sugar.",
  "Keto-friendly cauliflower rice stir-fry with colorful vegetables and tofu.",
  "Overnight chia seed pudding with almond milk and fresh berries.",
  "Quick and easy lentil soup with turmeric and ginger.",
  "No-bake energy balls made with oats, peanut butter, and honey.",
  "Zucchini noodles with avocado pesto sauce.",
];

// Main component
const Recipe = () => {
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
      console.log("userRateLimit", userRateLimit);
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while getting user rate limit."
      );
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
      className="min-h-screen w-screen mx-auto flex flex-col items-center max-w-6xl"
    >
      <h1 className="text-3xl font-semibold mb-4 mt-7 py-10 px-5 text-center">
        Simply type a recipe idea or some ingredients you have on hand,
        seperated by commas, and AI will instantly generate an all-new recipe on
        demand...
      </h1>
      <RecipeForm onGenerate={handleGenerateRecipe} />
      <div className="mt-5">
        <RecipeCycler recipes={recipes} />
      </div>
      {error && <ErrorMessage error={error} />}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <RecipeContent recipe={recipe} imageUrl={imageUrl} />
      )}
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
    <Image src="/images/loader.svg" width="300" height="300" alt="loader" />
  </motion.div>
);

// Component to display recipe content and image
const RecipeContent = ({
  recipe,
  imageUrl,
}: {
  recipe: string | undefined;
  imageUrl: string | null;
}) => (
  <AnimatePresence>
    {recipe && (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full items-center gap-8 px-4 py-12 md:px-6 lg:px-8 lg:py-20 text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full flex flex-col md:flex-row justify-between gap-4"
        >
          <div className="w-full md:w-1/2">
            {imageUrl ? (
              <ImageDisplay imageUrl={imageUrl} />
            ) : (
              <div className="border">Loading</div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <MarkdownTitleExtractor markdown={recipe} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full px-8 rounded"
        >
          <RecipeParser markdown={recipe} />
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
);

export default Recipe;
