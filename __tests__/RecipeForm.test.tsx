import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeForm from '@/components/RecipeForm';

describe('RecipeForm', () => {
  it('renders the form correctly', () => {
    render(<RecipeForm onGenerate={() => {}} />);
    expect(screen.getByPlaceholderText('Enter ingredients')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Recipe' })).toBeInTheDocument();
  });

  // it('calls onGenerate with correct ingredients when form is submitted', () => {
  //   const mockOnGenerate = jest.fn();
  //   render(<RecipeForm onGenerate={mockOnGenerate} />);
    
  //   const input = screen.getByPlaceholderText('Enter ingredients');
  //   fireEvent.change(input, { target: { value: 'tomato, cheese, bread' } });
    
  //   const button = screen.getByRole('button', { name: 'Generate Recipe' });
  //   fireEvent.click(button);

  //   expect(mockOnGenerate).toHaveBeenCalledWith(['tomato', 'cheese', 'bread']);
  // });
});
