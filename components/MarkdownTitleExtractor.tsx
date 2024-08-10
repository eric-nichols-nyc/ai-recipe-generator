import React, { useState, useEffect } from "react";
type ComponentProps = {
  markdown: string;
};
const MarkdownTitleExtractor = ({ markdown }: ComponentProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const extractTitle = (text: string) => {
      const titleMatch = text.match(/Title: (.+)/);
      return titleMatch ? titleMatch[1] : "No title found";
    };

    const extraceDescription = (text: string) => {
      const descriptionMatch = text.match(/Description: (.+)/);
      return descriptionMatch ? descriptionMatch[1] : "No description found";
    }

    setTitle(extractTitle(markdown));
    setDescription(extraceDescription(markdown));
  }, [markdown]);

  return (
    <div className="mb-5 w-full text-left">
      <p className="mt-2 text-3xl font-semibold">{title}</p>
      <p className="mt-2 text-lg">{description}</p>
    </div>
  );
};

export default MarkdownTitleExtractor;
