require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function findWorkingModel() {
    console.log("Searching for a working Gemini model...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // List of potential models to try
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
        "gemini-pro",
        "gemini-1.0-pro-latest",
        "gemini-1.5-flash-latest"
    ];

    for (const modelName of candidates) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            const response = await result.response;
            console.log(`✅ SUCCESS!`);
            console.log(`>>> PLEASE UPDATE aiController.js TO USE: "${modelName}" <<<`);
            return;
        } catch (error) {
            // Check for 404 (Not Found) specifically
            if (error.message.includes('404') || error.message.includes('Not Found')) {
                console.log(`❌ Not Found (404)`);
            } else if (error.message.includes('403') || error.message.includes('PERMISSION_DENIED')) {
                console.log(`❌ Permission Denied (Check API Key)`);
            } else {
                console.log(`❌ Error: ${error.message.split('\n')[0]}`);
            }
        }
    }
    console.log("No working models found in the candidate list.");
}

findWorkingModel();
