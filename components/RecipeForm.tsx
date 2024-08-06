// components/RecipeForm.tsx
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const RecipeForm = ({ onGenerate }: { onGenerate: (ingredients: string[]) => void }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const clearIngredients = () => {
    setIngredients('');
    setError(null);
  };

  const validateInput = (input: string): boolean => {
    if (input.trim() === '') {
      setError('Please enter at least one ingredient');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(ingredients)) {
      onGenerate(ingredients.split(',').map(ing => ing.trim()));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container flex flex-col gap-3">
      <div className="flex gap-3">
        <Input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
          className="border p-2 w-[80%] text-black"
        />
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate Recipe</Button>
        <Button type="button" onClick={clearIngredients} className="bg-gray-300 text-black p-2 rounded">Clear</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default RecipeForm;
