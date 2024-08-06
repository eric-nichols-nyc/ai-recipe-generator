"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-8 max-w-3xl"
      >
        Discover personalized culinary creations with AI-powered recipe
        generation
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col justify-center w-full sm:flex-row gap-4"
      >
        <Button className="bg-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition">
          <Link href="/recipe">Get recipes</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
