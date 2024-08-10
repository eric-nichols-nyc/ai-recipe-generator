import React, { useState, useEffect } from "react";

const RecipeParser = ({ markdown }: { markdown: string }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const parseRecipe = (text: any) => {
      const titleMatch = text.match(/Title: (.+)/);
      const ingredientsMatch = text.match(
        /Ingredients:\n([\s\S]*?)(?=\n\nInstructions:)/
      );
      const instructionsMatch = text.match(/Instructions:\n([\s\S]*?)$/);

      setTitle(titleMatch ? titleMatch[1] : "No title found");
      setIngredients(
        ingredientsMatch
          ? ingredientsMatch[1].split("\n").filter((item:string) => item.trim() !== "")
          : []
      );
      setInstructions(
        instructionsMatch
          ? instructionsMatch[1]
              .split("\n")
              .filter((item:string) => item.trim() !== "")
          : []
      );
    };

    parseRecipe(markdown);
  }, [markdown]);

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-3">
        <div className="flex flex-col flex-1 bg-grey-100 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
          <ul className="">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col flex-1 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Instructions:</h2>
          <ul className="list-inside">
            {instructions.map((instruction, index) => (
              <li key={index} className="mb-2">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeParser;
