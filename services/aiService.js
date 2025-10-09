import { GoogleGenerativeAI } from "@google/generative-ai";

// You'll need to get your API key from https://makersuite.google.com/app/apikey
const API_KEY = "AIzaSyBuFPhqupa4iY6x6ZfUZcrS2vZNaUshtoI";

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  }

  // Create topic-specific system prompt
  createSystemPrompt(topicTitle, topicDescription) {
    return `You are an expert educational AI assistant specializing in science education. 

STRICT TOPIC RESTRICTION: You must ONLY answer questions related to "${topicTitle}".

Topic Context: ${topicDescription}

RULES:
1. ONLY provide answers related to "${topicTitle}" and closely related scientific concepts
2. If asked about anything unrelated to this topic, politely redirect: "I can only help with questions about ${topicTitle}. Please ask me something related to this topic!"
3. Keep answers educational, clear, and suitable for students
4. Use simple language but maintain scientific accuracy
5. Provide practical examples when possible
6. If asked about other scientific topics not related to "${topicTitle}", redirect back to the current topic
7. Maximum response length: 200 words

Current Topic: ${topicTitle}
Stay focused on this topic and related concepts only.`;
  }

  async askQuestion(question, topicTitle, topicDescription) {
    try {
      if (API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        return {
          success: false,
          error: "Please set up your Gemini API key in services/aiService.js",
        };
      }

      const systemPrompt = this.createSystemPrompt(
        topicTitle,
        topicDescription
      );
      const fullPrompt = `${systemPrompt}\n\nStudent Question: ${question}\n\nAnswer:`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        answer: text.trim(),
      };
    } catch (error) {
      console.error("AI Service Error:", error);
      return {
        success: false,
        error: "Sorry, I encountered an error. Please try again.",
      };
    }
  }

  // Validate if question is topic-related (additional client-side check)
  isQuestionTopicRelated(question, topicTitle) {
    const questionLower = question.toLowerCase();
    const topicWords = topicTitle.toLowerCase().split(" ");

    // Check if question contains topic-related keywords
    const hasTopicKeywords = topicWords.some(
      (word) => word.length > 2 && questionLower.includes(word)
    );

    // List of general science terms that might be acceptable
    const scienceTerms = [
      "what",
      "how",
      "why",
      "explain",
      "definition",
      "example",
      "property",
      "structure",
      "function",
      "process",
      "reaction",
    ];

    const hasScienceTerms = scienceTerms.some((term) =>
      questionLower.includes(term)
    );

    return hasTopicKeywords || hasScienceTerms;
  }
}

export default new AIService();
