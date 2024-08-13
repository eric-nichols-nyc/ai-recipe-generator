import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge"

interface RecipeCyclerProps {
  recipes: string[];
  color?: string;
  cycleTime?: number;
}

const RecipeCycler: React.FC<RecipeCyclerProps> = ({
  recipes,
  color = 'red',
  cycleTime = 5000
}) => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cycleRecipe = () => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing recipe
    };

    const intervalId = setInterval(cycleRecipe, cycleTime);

    return () => clearInterval(intervalId);
  }, [recipes, cycleTime]);

  return (
    <div style={{ transition: 'opacity 0.5s ease-in-out', opacity: isVisible ? 1 : 0 }}>
      <Badge style={{ backgroundColor: color, cursor: 'default' }}>
        {recipes[currentRecipeIndex]}
      </Badge>
    </div>
  );
};

export default RecipeCycler;