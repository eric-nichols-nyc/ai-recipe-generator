// components/RecipeForm.tsx
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const RecipeForm = ({ onGenerate }: { onGenerate: (ingredients: string[]) => void }) => {
  const [ingredients, setIngredients] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(ingredients.split(',').map(ing => ing.trim()));
  };

  return (
    <form onSubmit={handleSubmit} className="container flex gap-3">
      <Input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        className="border p-2 w-[80%] text-black"
      />
      <Button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate Recipe</Button>
    </form>
  );
};

export default RecipeForm;
