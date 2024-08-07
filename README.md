This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview

This project is a Recipe Generator application that uses AI to create unique recipes based on user input. It features a modern, responsive UI built with Next.js and integrates with AI services for recipe and image generation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

The project structure is organized as follows:

- `app/`: Contains the main application pages and API routes
  - `api/`: API routes for recipe and image generation
  - `recipe/`: Recipe page component
- `components/`: Reusable React components
  - `ui/`: UI components like buttons, forms, and inputs
- `actions/`: Action creators for state management
- `lib/`: Utility functions and configurations
- `public/`: Static assets like images
- `utils/`: Utility functions for image generation

## Functionality

1. Recipe Generation: Users can input ingredients or cuisine types to generate unique recipes using AI.
2. Image Generation: The app creates a visual representation of the generated recipe using AI image generation.
3. Responsive UI: The application features a user-friendly interface that adapts to different screen sizes.
4. Form Handling: Utilizes custom form components for efficient user input management.
5. API Integration: Connects with AI services for recipe and image generation through custom API routes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
