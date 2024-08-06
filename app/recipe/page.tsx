"use client";
import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import RecipeDisplay from "@/components/RecipeDisplay";
import ImageDisplay from "@/components/ImageDisplay";
import { generateRecipe } from "@/actions/index";
import { readStreamableValue } from "ai/rsc";
const Home = () => {
  const [recipe, setRecipe] = useState<string | any>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateRecipe = async (ingredients: string[]) => {
    try {
      const [recipe, imageUrl] = await Promise.all([
        generateRecipe(ingredients),
        generateImage(ingredients),
      ]);
      setImageUrl(imageUrl);

      for await (const delta of readStreamableValue(recipe!)){
        setRecipe(delta ?? "");

      }
    } catch (error) {
      console.error("Error generating recipe or image:", error);
    }
  };

  const generateImage = async (ingredients: string[]) => {
    try {
      const imageResponse = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Create a visually appealing presentation for a dish that includes ${ingredients.join(", ")} on a serving plate on a rustic wood table, and The lighting should be soft and natural, enhancing the inviting and appetizing display.`,
        }),
      });

      const imageData = await imageResponse.json();
      return imageData.imageUrl;
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen w-screen mx-auto flex flex-col items-center max-w-3xl">
      <h1 className="text-3xl font-bold mb-4 mt-7 py-10 px-5 text-center">List up to five ingredients you&apos;d like to use up in the recipe, separated by commas.</h1>
      <RecipeForm onGenerate={handleGenerateRecipe} />
      <section className="flex flex-col-reverse w-full items-center gap-8 px-4 py-12 md:px-6 lg:px-8 lg:py-20">
        <div className="w-full md:w-1/2 p-8 border rounded">
          {recipe && <RecipeDisplay recipe={recipe} />}
        </div>
        <div className="w-full md:w-1/2 p-8">
          {imageUrl && <ImageDisplay imageUrl={imageUrl} />}
        </div>
      </section>
    </div>
  );
};

export default Home;
