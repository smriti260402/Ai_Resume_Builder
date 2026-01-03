require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAI() {
    console.log("Testing Gemini API...");
    console.log("API Key present:", !!process.env.GEMINI_API_KEY);
    // Print first few chars to verify it's loaded but not full key
    if (process.env.GEMINI_API_KEY) {
        console.log("API Key starts with:", process.env.GEMINI_API_KEY.substring(0, 5) + "...");
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Hello, can you hear me?";
        console.log("Sending prompt:", prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Response received:");
        console.log(text);
        console.log("SUCCESS: API is working.");
    } catch (error) {
        console.error("FAILURE: API connection failed.");
        console.error(error);
    }
}

testAI();
