import React, { useState, useEffect } from "react";

const RecipeParser = ({ markdown }: { markdown: string }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  // add description
  const [description, setDescription] = useState("");

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
          ? ingredientsMatch[1]
              .split("\n")
              .filter((item: string) => item.trim() !== "")
          : []
      );
      setInstructions(
        instructionsMatch
          ? instructionsMatch[1]
              .split("\n")
              .filter((item: string) => item.trim() !== "")
          : []
      );
    };

    parseRecipe(markdown);
  }, [markdown]);

  return (
    <div className="block md:flex h-full gap-3">
      <div className="flex-1 p-4 rounded-lg border">
        <div className="flex flex-col flex-1 bg-grey-100 p-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
          <ul className="">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4 rounded-lg border">
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
  );
};

export default RecipeParser;
