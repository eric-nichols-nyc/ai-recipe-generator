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
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-[60%]">
          <label htmlFor="ingredients" className="sr-only">Ingredients</label>
          <Input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas"
            className="border p-2 w-full text-black"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1 bg-blue-500 text-white p-2 rounded">Generate Recipe</Button>
          <Button type="button" onClick={clearIngredients} className="flex-1 bg-gray-300 text-black p-2 rounded">Clear</Button>
        </div>
      </div>
      {error && <p className="text-red-500" role="alert">{error}</p>}
    </form>
  );
};

export default RecipeForm;
