// components/RecipeForm.tsx
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

// RecipeForm component that takes an onGenerate function as a prop
const RecipeForm = ({ onGenerate }: { onGenerate: (ingredients: string[]) => void }) => {
  // State for storing the ingredients input
  const [ingredients, setIngredients] = useState<string>('');
  // State for storing any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to clear the ingredients input and reset the error
  const clearIngredients = () => {
    setIngredients('');
    setError(null);
  };

  // Function to validate the input
  const validateInput = (input: string): boolean => {
    if (input.trim() === '') {
      setError('Please enter at least one ingredient');
      return false;
    }
    setError(null);
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(ingredients)) {
      // If input is valid, split ingredients and pass to onGenerate
      onGenerate(ingredients.split(',').map(ing => ing.trim()));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container w-full flex flex-col gap-3">
      <div className="flex flex-col w-full sm:flex-row gap-3 justify-center">
        <div className="flex w-full sm:w-[60%]">
          {/* Hidden label for accessibility */}
          <label htmlFor="ingredients" className="sr-only">Ingredients</label>
          {/* Input field for ingredients */}
          <Input
            id="ingredients"
            name="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter recipe idea or ingredients separated by commas"
            className="border p-2 w-full text-black"
          />
        </div>
        <div className="flex gap-2">
          {/* Submit button to generate recipe */}
          <Button type="submit" className="flex-1 bg-blue-500 text-white p-2 rounded">Generate Recipe</Button>
          {/* Clear button to reset the form */}
          <Button type="button" onClick={clearIngredients} className="flex-1 bg-gray-300 text-black p-2 rounded">Clear</Button>
        </div>
      </div>
      {/* Error message display */}
      {error && <p className="text-red-500" role="alert">{error}</p>}
    </form>
  );
};

export default RecipeForm;
