import { useState } from "react";
import { motion } from "framer-motion";
import { QuoteCard } from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateQuote } from "@/lib/gemini";
import { toast } from "sonner";

const categories = [
  "Success",
  "Motivation",
  "Leadership",
  "Happiness",
  "Life",
  "Love",
  "Wisdom",
];

const Index = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("Motivation");

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await generateQuote(category);
      setQuote(response.quote);
      setAuthor(response.author);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-purple-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto space-y-12"
      >
        <div className="text-center space-y-6">
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Wisdom Generator
          </motion.h1>
          <p className="text-gray-600 text-base sm:text-xl font-light">
            Discover inspiring quotes tailored to your interests
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white/70 backdrop-blur-sm border-none ring-offset-purple-100 shadow-md hover:shadow-lg transition-shadow duration-200">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm sm:text-lg font-medium"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              "Generate Quote"
            )}
          </Button>
        </div>

        {(quote || isLoading) && (
          <QuoteCard quote={quote} author={author} isLoading={isLoading} />
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          Made with 💖 by Sagar
        </footer>
      </motion.div>
    </div>
  );
};

export default Index;
