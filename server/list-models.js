require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    console.log("Listing available models...");
    try {
        // We can't use the SDK's listModels directly as easily in some versions, 
        // but let's try via the raw fetch if needed, or check if the SDK exposes it.
        // Actually, the SDK doesn't always expose listModels directly on the main class in older versions,
        // but let's try to infer or use a known one.

        // Wait, the error message said "Call ListModels".
        // The SDK usually wraps this. Let's try iterating if possible or just try known variants.

        const validModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro", "text-bison-001"];
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        for (const modelName of validModels) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Test");
                console.log(`✅ SUCCESS: ${modelName} is working.`);
                return; // Found a working one
            } catch (e) {
                console.log(`❌ FAILED: ${modelName} - ${e.message.split(':')[0]}`);
            }
        }
        console.log("No working models found in standard list.");

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
