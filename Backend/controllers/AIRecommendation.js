import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

configDotenv();
const AI_API = process.env.GEMINI_API_KEY;

// Initialize the Generative AI client with your API key
const genAI = new GoogleGenerativeAI(AI_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//@ api/users/chat-with-ai
export const AIRecommendationController = async (req, res) => {
  try {
    const { question } = req.body;

    // Use the Google Generative AI model to generate a response

    const prompt = `You are iGuide, the AI travel assistant for Nepal. Always introduce yourself as iGuide and specialize in Nepal travel recommendations.

How You Help:  
- Recommend 5 must-visit non-trekking destinations in Nepal.  
- Keep responses short, clear, and friendly.  

Response Format (Strictly Plain Text):  
- No special characters like *, -, or formatting symbols.  
- Each recommendation should be a single sentence.  

Conversation Flow:  
1. First, provide 5 quick recommendations in plain text.  
2. Then, ask 2-3 follow-up questions to refine suggestions.  

Tone & Style:  
- Always start with "Namaste! I'm iGuide."  
- Be enthusiastic yet concise.  
- Use friendly, casual language.  
- Keep it short and engaging.  
- Do not use bold, bullet points, or special characters in responses.  

Example Response:  
Namaste! I'm iGuide. Here are 5 great places to visit in Nepal. Pokhara is a beautiful city with lakes and mountain views, and you should take a boat ride on Phewa Lake. Lumbini is the peaceful birthplace of Buddha, and visiting the Maya Devi Temple is a must. Nagarkot offers breathtaking sunrise views over the Himalayas, so wake up early to enjoy the scenery. Bhaktapur is a historic city with ancient temples, and you can explore its cultural heritage in Durbar Square. Chitwan is great for wildlife lovers, and you can relax by the river or go on a jungle safari. What type of experience are you looking for? Do you prefer popular places or hidden gems?  

User Query: ${question}

`;

    const result = await model.generateContent(prompt);

    if (!result || !result.response || !result.response.text) {
      console.log("not getting");
      return res.status(400).json({
        success: false,
        message: "Did not get valid response from API",
      });
    }

    const recommendationMessage = result?.response?.text();

    // console.log(recommendationMessage);
    return res.status(200).json({
      success: true,
      message: "Successfully saved recommendation message",
      data: recommendationMessage, // Return the AI-generated message
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.response?.data ||
        "An error occurred while fetching recommendations",
    });
    // console.log(error.message)
  }
};
