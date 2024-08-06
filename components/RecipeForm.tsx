// components/RecipeForm.tsx
import { useState } from 'react';

const RecipeForm = ({ onGenerate }: { onGenerate: (ingredients: string[]) => void }) => {
  const [ingredients, setIngredients] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(ingredients.split(',').map(ing => ing.trim()));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        className="border p-2 w-full text-black"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate Recipe</button>
    </form>
  );
};

export default RecipeForm;
