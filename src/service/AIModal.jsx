import { Groq } from "groq-sdk";
import { AI_PROMPT } from "@/constants/options";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateTrip = async (formData) => {
  try {
    const finalPrompt = AI_PROMPT
      .replaceAll("{location}", formData.location)
      .replaceAll("{totalDays}", formData.days)
      .replaceAll("{traveler}", formData.travelers)
      .replaceAll("{budget}", formData.budget);

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a travel planner AI. Return ONLY valid JSON. No explanation. No markdown.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      temperature: 0.5,
    });

    if (!response.choices?.length) return null;

    let text = response.choices[0].message.content;

    // remove markdown formatting
    text = text.replace(/```json|```/g, "").trim();

    // extract JSON safely
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) return null;

    let jsonString = text.substring(firstBrace, lastBrace + 1);

    // 🔥 Fix common JSON mistakes automatically
    jsonString = jsonString
      .replace(/,\s*}/g, "}")   // remove trailing comma objects
      .replace(/,\s*]/g, "]");  // remove trailing comma arrays

    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON Parse Failed:", jsonString);
      return null;
    }

  } catch (error) {
    console.error("Groq AI Error:", error);
    return null;
  }
};