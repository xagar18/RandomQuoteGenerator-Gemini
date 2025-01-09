import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface QuoteCardProps {
  quote: string;
  author: string;
  isLoading?: boolean;
}

export const QuoteCard = ({ quote, author, isLoading }: QuoteCardProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" - ${author}`);
      toast.success("Quote copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy quote");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Inspiring Quote",
          text: `"${quote}" - ${author}`,
        });
      } else {
        handleCopy();
      }
    } catch (error) {
      toast.error("Failed to share quote");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="quote-card w-full max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
        <CardContent className="pt-10 px-4 sm:px-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <>
              <blockquote className="text-xl sm:text-4xl font-light text-center mb-4 sm:mb-8 leading-relaxed text-gray-700">
                "{quote}"
              </blockquote>
              <p className="text-right text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 font-medium text-lg sm:text-xl italic">
                - {author}
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-end space-x-3 p-4 sm:p-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            disabled={isLoading}
            className="hover:bg-purple-50/50 transition-colors duration-200"
          >
            <Copy className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            disabled={isLoading}
            className="hover:bg-purple-50/50 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
