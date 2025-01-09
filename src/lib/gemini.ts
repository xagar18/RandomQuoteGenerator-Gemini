import { toast } from "sonner";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const generateQuote = async (category) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const inspiringKeywords = ["perseverance", "wisdom", "growth", "hope", "strength", "success"];
    const randomKeyword = inspiringKeywords[Math.floor(Math.random() * inspiringKeywords.length)];
    const randomizer = Math.random().toString(36).substring(7); 
    const prompt = `Generate an inspiring quote about ${category}, mentioning ${randomKeyword}. Include a unique identifier ${randomizer}. Return it in the following JSON format: {"quote": "the quote text", "author": "author name"}. Make sure the quote is meaningful and impactful.`;

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate quote");
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    const parsedResponse = JSON.parse(generatedText);

    return {
      quote: parsedResponse.quote,
      author: parsedResponse.author
    };
  } catch (error) {
    console.error("Error generating quote:", error);
    toast.error("Failed to generate quote. Please try again.");
    throw error;
  }
};
