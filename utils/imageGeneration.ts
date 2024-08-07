export const generateImage = async (ingredients: string[]): Promise<string | null> => {
  try {
    const imageResponse = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Create a visually appealing presentation for a dish that includes ${ingredients.join(
          ", "
        )} and The lighting should be soft and natural, enhancing the inviting and appetizing display.`,
      }),
    });

    const imageData = await imageResponse.json();
    return imageData.imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
