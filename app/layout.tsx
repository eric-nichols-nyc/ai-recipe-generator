import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Generator",
  description: "Discover personalized culinary creations with AI-powered recipe generation",
  icons: [
    {
      url: "/images/logo.svg",
      href: "/Images/logo.svg",
    },
  ],
  openGraph: {
    url: "https://ai-recipe-generator-nine.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://github.com/eric-nichols-nyc/ai-recipe-generator/blob/main/public/Screenshot.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-full text-white"
        style={{ backgroundImage: "url('/images/recipe-bg.webp')" }}
      >
        <div className="min-h-screen flex flex-col">
          <Head>
            <title>watchthis.dev - Movie Recommendations</title>
            <meta
              name="description"
              content="Get curated show and movie recommendations with Open AI"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, max-scale=1, min-scale=1, user-scalable=yes" />

            <link rel="icon" href="/images/icon.svg" type="image/svg+xml" />
          </Head>

          <header className="flex justify-between items-center p-4 md:p-6 z-10">
            <div className="text-xl font-bold flex items-center">
              <Link href="/"><Image src="/images/logo.svg" alt="Logo" width={32} height={32} /></Link>
            </div>
          </header>
          <main className="h-full relative flex-grow flex flex-col justify-center items-center text-center p-4 md:p-8 bg-cover bg-center">
            <div className="fixed h-screen w-screen top-0 flex flex-col items-center justify-center min-h-screen w-full h-full bg-gradient-to-br from-slate-900/80 to-black/90"></div>
            <div className="z-10">{children}</div>
          </main>
          <footer className="flex justify-between items-center p-4 md:p-6 bg-black bg-opacity-50 z-10">
            <span className="text-sm">
              Powered by OpenAI and Vercel Edge Functions.
            </span>
            <Button className="flex items-center gap-2 bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Star on GitHub
            </Button>
          </footer>
        </div>
      </body>
    </html>
  );
}
