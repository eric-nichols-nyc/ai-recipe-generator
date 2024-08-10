import React, { useState, useEffect } from "react";
type ComponentProps = {
  markdown: string;
};
const MarkdownTitleExtractor = ({ markdown }: ComponentProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const extractTitle = (text: string) => {
      const titleMatch = text.match(/Title: (.+)/);
      return titleMatch ? titleMatch[1] : "No title found";
    };

    setTitle(extractTitle(markdown));
  }, [markdown]);

  return (
    <div className="mb-5 w-full text-center">
      <p className="mt-2 text-3xl font-semibold">{title}</p>
    </div>
  );
};

export default MarkdownTitleExtractor;
