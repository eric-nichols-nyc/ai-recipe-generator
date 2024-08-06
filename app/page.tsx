import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
  
      <div className="z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl">
          Discover personalized culinary creations with AI-powered recipe
          generation
        </h1>
        <div className="flex flex-col justify-center w-full sm:flex-row gap-4">
          <Button className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition">
            <Link href="/recipe">Get recipes</Link>
          </Button>
        </div>
      </div>
  );
}
